import { getDb, schema } from '@/lib/db';
import type {
  KeyFact,
  PostFaq,
  PostFaqInput,
  PostQuickAnswer,
  PostSourceInput,
  PostSourceLink,
  SourceType,
} from '@/lib/knowledge/types';
import { asc, eq, inArray } from 'drizzle-orm';

const { postQuickAnswers, sources, postSources, postFaqs } = schema;

export type AuthorityBundle = {
  quickAnswer: PostQuickAnswer | null;
  sources: PostSourceLink[];
  faqs: PostFaq[];
};

function parseKeyFacts(value: unknown): KeyFact[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is KeyFact => {
      return (
        typeof item === 'object' &&
        item !== null &&
        typeof (item as KeyFact).label === 'string' &&
        typeof (item as KeyFact).value === 'string'
      );
    })
    .map((item) => ({ label: item.label.trim(), value: item.value.trim() }))
    .filter((item) => item.label && item.value);
}

export async function loadAuthorityBatch(postIds: string[]): Promise<Map<string, AuthorityBundle>> {
  const map = new Map<string, AuthorityBundle>();
  const db = getDb();
  if (!db || postIds.length === 0) return map;

  for (const postId of postIds) {
    map.set(postId, { quickAnswer: null, sources: [], faqs: [] });
  }

  const qaRows = await db
    .select()
    .from(postQuickAnswers)
    .where(inArray(postQuickAnswers.postId, postIds));

  for (const row of qaRows) {
    const bundle = map.get(row.postId)!;
    bundle.quickAnswer = {
      quickAnswer: row.quickAnswer,
      keyFacts: parseKeyFacts(row.keyFacts),
      display: row.display,
    };
  }

  const sourceRows = await db
    .select({
      postId: postSources.postId,
      id: sources.id,
      sourceTitle: sources.sourceTitle,
      sourceUrl: sources.sourceUrl,
      sourceType: sources.sourceType,
      accessedAt: sources.accessedAt,
      claim: postSources.claim,
      verifiedAt: postSources.verifiedAt,
    })
    .from(postSources)
    .innerJoin(sources, eq(postSources.sourceId, sources.id))
    .where(inArray(postSources.postId, postIds));

  for (const row of sourceRows) {
    const bundle = map.get(row.postId)!;
    bundle.sources.push({
      id: row.id,
      sourceTitle: row.sourceTitle,
      sourceUrl: row.sourceUrl,
      sourceType: row.sourceType as SourceType,
      claim: row.claim,
      verifiedAt: row.verifiedAt,
      accessedAt: row.accessedAt,
    });
  }

  const faqRows = await db
    .select()
    .from(postFaqs)
    .where(inArray(postFaqs.postId, postIds))
    .orderBy(asc(postFaqs.sortOrder));

  for (const row of faqRows) {
    const bundle = map.get(row.postId)!;
    bundle.faqs.push({
      id: row.id,
      question: row.question,
      answer: row.answer,
      sortOrder: row.sortOrder,
    });
  }

  return map;
}

export async function savePostAuthority(
  postId: string,
  input: {
    quickAnswer?: PostQuickAnswer | null;
    sources?: PostSourceInput[];
    faqs?: PostFaqInput[];
  },
): Promise<void> {
  if (input.quickAnswer !== undefined) {
    await replaceQuickAnswer(postId, input.quickAnswer);
  }
  if (input.sources !== undefined) {
    await replacePostSources(postId, input.sources);
  }
  if (input.faqs !== undefined) {
    await replacePostFaqs(postId, input.faqs);
  }
}

async function replaceQuickAnswer(postId: string, quickAnswer: PostQuickAnswer | null) {
  const db = getDb();
  if (!db) return;

  await db.delete(postQuickAnswers).where(eq(postQuickAnswers.postId, postId));

  if (!quickAnswer) return;

  const hasContent = quickAnswer.quickAnswer?.trim() || quickAnswer.keyFacts.length > 0;
  if (!hasContent) return;

  await db.insert(postQuickAnswers).values({
    postId,
    quickAnswer: quickAnswer.quickAnswer?.trim() || null,
    keyFacts: quickAnswer.keyFacts,
    display: quickAnswer.display,
  });
}

async function replacePostSources(postId: string, links: PostSourceInput[]) {
  const db = getDb();
  if (!db) return;

  await db.delete(postSources).where(eq(postSources.postId, postId));

  const normalized = links.filter((link) => link.sourceTitle.trim());
  for (const link of normalized) {
    const [sourceRow] = await db
      .insert(sources)
      .values({
        sourceTitle: link.sourceTitle.trim(),
        sourceUrl: link.sourceUrl?.trim() || null,
        sourceType: link.sourceType,
        accessedAt: link.accessedAt ?? null,
      })
      .returning();

    await db.insert(postSources).values({
      postId,
      sourceId: sourceRow.id,
      claim: link.claim?.trim() || null,
      verifiedAt: link.verifiedAt ?? null,
    });
  }
}

async function replacePostFaqs(postId: string, faqs: PostFaqInput[]) {
  const db = getDb();
  if (!db) return;

  await db.delete(postFaqs).where(eq(postFaqs.postId, postId));

  const normalized = faqs.filter((faq) => faq.question.trim() && faq.answer.trim());
  if (normalized.length === 0) return;

  await db.insert(postFaqs).values(
    normalized.map((faq, index) => ({
      postId,
      question: faq.question.trim(),
      answer: faq.answer.trim(),
      sortOrder: faq.sortOrder ?? index,
    })),
  );
}

export function hasVisibleAuthority(bundle: AuthorityBundle): boolean {
  const qa = bundle.quickAnswer;
  const showQuickAnswer =
    qa?.display && Boolean(qa.quickAnswer?.trim() || qa.keyFacts.length > 0);
  return showQuickAnswer || bundle.faqs.length > 0 || bundle.sources.length > 0;
}
