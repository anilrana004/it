import { adminFetch } from '@/lib/admin/admin-fetch';
import { parseApiJson } from '@/lib/api/client';
import {
  mergeTagsWithPlacements,
  parsePlacementSlots,
  PLACEMENT_TAG_PREFIX,
} from '@/lib/knowledge/placement-registry';
import type {
  ContentType,
  ContentHealthStatus,
  CreatePostInput,
  EntityType,
  KeyFact,
  KnowledgeCategory,
  KnowledgePost,
  PostFaqInput,
  PostSection,
  PostSourceInput,
  PostStatus,
  SourceType,
  UpdatePostInput,
} from '@/lib/knowledge/types';

export type RegistryEntity = {
  entityType: EntityType;
  entityId: string;
  title: string;
  canonicalUrl: string;
  region: string | null;
};

export type KnowledgeAuthorOption = {
  id: string;
  slug: string;
  name: string;
};

type ApiError = { error: string; fieldErrors?: Record<string, string> };

async function parseJson<T>(res: Response): Promise<T> {
  try {
    return await parseApiJson<T>(res);
  } catch (error) {
    if (error instanceof Error) {
      const err = error as Error & { fieldErrors?: Record<string, string> };
      throw err;
    }
    throw error;
  }
}

export async function fetchAdminPosts(): Promise<KnowledgePost[]> {
  const res = await adminFetch('/api/admin/posts', { cache: 'no-store' });
  const data = await parseJson<{ posts: KnowledgePost[] }>(res);
  return data.posts;
}

export async function fetchAdminPost(id: string): Promise<KnowledgePost> {
  const res = await adminFetch(`/api/admin/posts/${id}`, { cache: 'no-store' });
  const data = await parseJson<{ post: KnowledgePost }>(res);
  return data.post;
}

export async function fetchCategories(): Promise<KnowledgeCategory[]> {
  const res = await adminFetch('/api/admin/categories', { cache: 'no-store' });
  const data = await parseJson<{ categories: KnowledgeCategory[] }>(res);
  return data.categories;
}

export async function fetchAuthors(): Promise<KnowledgeAuthorOption[]> {
  const res = await adminFetch('/api/admin/authors', { cache: 'no-store' });
  const data = await parseJson<{ authors: KnowledgeAuthorOption[] }>(res);
  return data.authors;
}

export async function searchEntities(
  query: string,
  entityType?: EntityType,
): Promise<RegistryEntity[]> {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  if (entityType) params.set('entityType', entityType);
  params.set('limit', '15');

  const res = await adminFetch(`/api/admin/entities/search?${params.toString()}`, {
    cache: 'no-store',
  });
  const data = await parseJson<{ entities: RegistryEntity[] }>(res);
  return data.entities;
}

export async function createAdminPost(input: CreatePostInput): Promise<KnowledgePost> {
  const res = await adminFetch('/api/admin/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const data = await parseJson<{ post: KnowledgePost }>(res);
  return data.post;
}

export async function updateAdminPost(input: UpdatePostInput): Promise<KnowledgePost> {
  const res = await adminFetch(`/api/admin/posts/${input.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const data = await parseJson<{ post: KnowledgePost }>(res);
  return data.post;
}

export async function publishAdminPost(id: string): Promise<KnowledgePost> {
  const res = await adminFetch(`/api/admin/posts/${id}/publish`, { method: 'POST' });
  const data = await parseJson<{ post: KnowledgePost }>(res);
  return data.post;
}

export async function archiveAdminPost(id: string): Promise<KnowledgePost> {
  const res = await adminFetch(`/api/admin/posts/${id}/archive`, { method: 'POST' });
  const data = await parseJson<{ post: KnowledgePost }>(res);
  return data.post;
}

export async function deleteAdminPost(id: string): Promise<void> {
  const res = await adminFetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
  await parseJson<{ success: boolean }>(res);
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export type EditorFormState = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  section: PostSection;
  contentType: ContentType;
  authorId: string;
  reviewerId: string;
  featuredImageUrl: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  tags: string;
  placementSlots: string[];
  categoryId: string;
  primaryEntity: RegistryEntity | null;
  relatedEntities: RegistryEntity[];
  healthStatus: ContentHealthStatus;
  contentFreshness: string;
  lastFactCheckedAt: string;
  expertReviewed: boolean;
  quickAnswer: string;
  quickAnswerDisplay: boolean;
  keyFacts: KeyFact[];
  sources: Array<{
    sourceTitle: string;
    sourceUrl: string;
    sourceType: SourceType;
    claim: string;
    verifiedAt: string;
  }>;
  faqs: PostFaqInput[];
};

export function emptyEditorForm(): EditorFormState {
  return {
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    section: 'blog',
    contentType: 'guide',
    authorId: '',
    featuredImageUrl: '',
    seoTitle: '',
    seoDescription: '',
    canonicalUrl: '',
    tags: '',
    placementSlots: [],
    categoryId: '',
    primaryEntity: null,
    relatedEntities: [],
    reviewerId: '',
    healthStatus: 'healthy',
    contentFreshness: 'evergreen',
    lastFactCheckedAt: '',
    expertReviewed: false,
    quickAnswer: '',
    quickAnswerDisplay: true,
    keyFacts: [],
    sources: [],
    faqs: [],
  };
}

export function postToEditorForm(post: KnowledgePost): EditorFormState {
  const primaryLink =
    post.entityLinks.find((link) => link.role === 'primary') ??
    (post.primaryEntityType && post.primaryEntityId
      ? {
          entityType: post.primaryEntityType,
          entityId: post.primaryEntityId,
          role: 'primary' as const,
          sortOrder: 0,
        }
      : null);

  const placementSlots = parsePlacementSlots(post.tags);
  const editorialTags = post.tags.filter((tag) => !tag.startsWith(PLACEMENT_TAG_PREFIX));

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? '',
    content: post.content,
    section: post.section,
    contentType: post.contentType,
    authorId: post.author?.id ?? '',
    featuredImageUrl: post.featuredImageUrl ?? '',
    seoTitle: post.seoTitle ?? '',
    seoDescription: post.seoDescription ?? '',
    canonicalUrl: post.canonicalUrl ?? '',
    tags: editorialTags.join(', '),
    placementSlots,
    categoryId: post.categories[0]?.id ?? '',
    primaryEntity: primaryLink
      ? {
          entityType: primaryLink.entityType,
          entityId: primaryLink.entityId,
          title: primaryLink.entityId,
          canonicalUrl: '',
          region: null,
        }
      : null,
    relatedEntities: post.entityLinks
      .filter((link) => link.role === 'related')
      .map((link) => ({
        entityType: link.entityType,
        entityId: link.entityId,
        title: link.entityId,
        canonicalUrl: '',
        region: null,
      })),
    reviewerId: post.reviewer?.id ?? '',
    healthStatus: post.healthStatus ?? 'healthy',
    contentFreshness: post.contentFreshness ?? 'evergreen',
    lastFactCheckedAt: post.lastFactCheckedAt?.slice(0, 10) ?? '',
    expertReviewed: post.expertReviewed ?? false,
    quickAnswer: post.quickAnswer?.quickAnswer ?? '',
    quickAnswerDisplay: post.quickAnswer?.display ?? true,
    keyFacts: post.quickAnswer?.keyFacts ?? [],
    sources: post.sources.map((source) => ({
      sourceTitle: source.sourceTitle,
      sourceUrl: source.sourceUrl ?? '',
      sourceType: source.sourceType,
      claim: source.claim ?? '',
      verifiedAt: source.verifiedAt ?? '',
    })),
    faqs: post.faqs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
      sortOrder: faq.sortOrder,
    })),
  };
}

export function editorFormToPayload(
  form: EditorFormState,
  status: PostStatus,
): CreatePostInput {
  const entityLinks = [
    ...(form.primaryEntity
      ? [{ entityType: form.primaryEntity.entityType, entityId: form.primaryEntity.entityId, role: 'primary' as const }]
      : []),
    ...form.relatedEntities.map((entity) => ({
      entityType: entity.entityType,
      entityId: entity.entityId,
      role: 'related' as const,
    })),
  ];

  return {
    slug: form.slug.trim(),
    title: form.title.trim(),
    excerpt: form.excerpt.trim() || undefined,
    content: form.content,
    contentFormat: 'markdown',
    status,
    contentType: form.contentType,
    section: form.section,
    authorId: form.authorId || undefined,
    reviewerId: form.reviewerId || undefined,
    featuredImageUrl: form.featuredImageUrl.trim() || undefined,
    primaryEntityType: form.primaryEntity?.entityType,
    primaryEntityId: form.primaryEntity?.entityId,
    seoTitle: form.seoTitle.trim() || undefined,
    seoDescription: form.seoDescription.trim() || undefined,
    canonicalUrl: form.canonicalUrl.trim() || undefined,
    healthStatus: form.healthStatus,
    contentFreshness: form.contentFreshness,
    lastFactCheckedAt: form.lastFactCheckedAt || undefined,
    expertReviewed: form.expertReviewed,
    quickAnswer: {
      quickAnswer: form.quickAnswer.trim() || null,
      keyFacts: form.keyFacts.filter((fact) => fact.label.trim() && fact.value.trim()),
      display: form.quickAnswerDisplay,
    },
    sources: form.sources
      .filter((source) => source.sourceTitle.trim())
      .map((source) => ({
        sourceTitle: source.sourceTitle.trim(),
        sourceUrl: source.sourceUrl.trim() || undefined,
        sourceType: source.sourceType,
        claim: source.claim.trim() || undefined,
        verifiedAt: source.verifiedAt || undefined,
      })) as PostSourceInput[],
    faqs: form.faqs
      .filter((faq) => faq.question.trim() && faq.answer.trim())
      .map((faq, index) => ({
        question: faq.question.trim(),
        answer: faq.answer.trim(),
        sortOrder: faq.sortOrder ?? index,
      })),
    tags: mergeTagsWithPlacements(
      form.tags
        .split(',')
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
      form.placementSlots,
    ),
    categoryIds: form.categoryId ? [form.categoryId] : undefined,
    entityLinks,
  };
}
