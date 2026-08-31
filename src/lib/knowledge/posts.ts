import { getDb, schema } from '@/lib/db';
import {
  derivePrimaryEntity,
  entityMatchVariants,
  normalizeEntityLinks,
  type EntityLinkInput,
} from '@/lib/knowledge/entity-links';
import { savePostAuthority, loadAuthorityBatch } from '@/lib/knowledge/authority';
import { placementTag } from '@/lib/knowledge/placement-registry';
import { validateCreatePost, validateUpdatePost } from '@/lib/knowledge/validate';
import type {
  ContentHealthStatus,
  ContentType,
  CreatePostInput,
  EntityLink,
  EntityLinkRole,
  EntityType,
  KnowledgeAuthor,
  KnowledgeCategory,
  KnowledgePost,
  PaginatedPostsResult,
  PostSection,
  PostStatus,
  PostsByEntityFilter,
  PublishedPostsFilter,
  RelatedPostsFilter,
  UpdatePostInput,
} from '@/lib/knowledge/types';
import { and, desc, eq, inArray, or, sql } from 'drizzle-orm';

const { posts, authors, postTags, postEntityLinks, postCategories, categories, postRelatedBlogs } =
  schema;

export function computeReadingTimeMin(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function toIsoDate(value: Date | null | undefined): string | null {
  return value ? value.toISOString() : null;
}

function mapAuthor(row: typeof authors.$inferSelect | null | undefined): KnowledgeAuthor | null {
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    bio: row.bio,
    avatarUrl: row.avatarUrl,
    role: row.role,
  };
}

async function loadTags(postIds: string[]): Promise<Map<string, string[]>> {
  const db = getDb();
  const map = new Map<string, string[]>();
  if (!db || postIds.length === 0) return map;

  const rows = await db.select().from(postTags).where(inArray(postTags.postId, postIds));

  for (const row of rows) {
    const existing = map.get(row.postId) ?? [];
    existing.push(row.tag);
    map.set(row.postId, existing);
  }

  return map;
}

async function loadCategories(postIds: string[]): Promise<Map<string, KnowledgeCategory[]>> {
  const db = getDb();
  const map = new Map<string, KnowledgeCategory[]>();
  if (!db || postIds.length === 0) return map;

  const rows = await db
    .select({
      postId: postCategories.postId,
      id: categories.id,
      slug: categories.slug,
      name: categories.name,
      description: categories.description,
    })
    .from(postCategories)
    .innerJoin(categories, eq(postCategories.categoryId, categories.id))
    .where(inArray(postCategories.postId, postIds));

  for (const row of rows) {
    const existing = map.get(row.postId) ?? [];
    existing.push({
      id: row.id,
      slug: row.slug,
      name: row.name,
      description: row.description,
    });
    map.set(row.postId, existing);
  }

  return map;
}

async function loadEntityLinks(postIds: string[]): Promise<Map<string, EntityLink[]>> {
  const db = getDb();
  const map = new Map<string, EntityLink[]>();
  if (!db || postIds.length === 0) return map;

  const rows = await db
    .select()
    .from(postEntityLinks)
    .where(inArray(postEntityLinks.postId, postIds))
    .orderBy(postEntityLinks.sortOrder);

  for (const row of rows) {
    const existing = map.get(row.postId) ?? [];
    existing.push({
      entityType: row.entityType as EntityType,
      entityId: row.entityId,
      role: row.role as EntityLinkRole,
      sortOrder: row.sortOrder,
    });
    map.set(row.postId, existing);
  }

  return map;
}

async function loadRelatedPostIds(postIds: string[]): Promise<Map<string, string[]>> {
  const db = getDb();
  const map = new Map<string, string[]>();
  if (!db || postIds.length === 0) return map;

  const rows = await db
    .select()
    .from(postRelatedBlogs)
    .where(inArray(postRelatedBlogs.postId, postIds))
    .orderBy(postRelatedBlogs.sortOrder);

  for (const row of rows) {
    const existing = map.get(row.postId) ?? [];
    existing.push(row.relatedPostId);
    map.set(row.postId, existing);
  }

  return map;
}

async function hydratePosts(
  rows: (typeof posts.$inferSelect)[],
  authorMap: Map<string, typeof authors.$inferSelect>,
): Promise<KnowledgePost[]> {
  const postIds = rows.map((row) => row.id);
  const [tagMap, linkMap, categoryMap, relatedMap, authorityMap] = await Promise.all([
    loadTags(postIds),
    loadEntityLinks(postIds),
    loadCategories(postIds),
    loadRelatedPostIds(postIds),
    loadAuthorityBatch(postIds),
  ]);

  return rows.map((row) => {
    const authority = authorityMap.get(row.id) ?? {
      quickAnswer: null,
      sources: [],
      faqs: [],
    };

    return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    contentFormat: row.contentFormat,
    status: row.status as PostStatus,
    contentType: row.contentType as ContentType,
    section: row.section as PostSection,
    author: row.authorId ? mapAuthor(authorMap.get(row.authorId)) : null,
    featuredImageUrl: row.featuredImageUrl,
    readingTimeMin: row.readingTimeMin,
    primaryEntityType: row.primaryEntityType as EntityType | null,
    primaryEntityId: row.primaryEntityId,
    publishedAt: toIsoDate(row.publishedAt),
    updatedAt: toIsoDate(row.updatedAt),
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    canonicalUrl: row.canonicalUrl,
    robots: row.robots,
    healthStatus: (row.healthStatus as ContentHealthStatus) ?? 'healthy',
    lastFactCheckedAt: toIsoDate(row.lastFactCheckedAt),
    expertReviewed: row.expertReviewed,
    contentFreshness: row.contentFreshness,
    reviewer: row.reviewerId ? mapAuthor(authorMap.get(row.reviewerId)) : null,
    quickAnswer: authority.quickAnswer,
    sources: authority.sources,
    faqs: authority.faqs,
    tags: tagMap.get(row.id) ?? [],
    categories: categoryMap.get(row.id) ?? [],
    entityLinks: linkMap.get(row.id) ?? [],
    relatedPostIds: relatedMap.get(row.id) ?? [],
  };
  });
}

async function loadAuthorsForPosts(rows: (typeof posts.$inferSelect)[]) {
  const db = getDb();
  const authorMap = new Map<string, typeof authors.$inferSelect>();
  if (!db) return authorMap;

  const authorIds = [
    ...new Set([
      ...rows.map((row) => row.authorId),
      ...rows.map((row) => row.reviewerId),
    ].filter(Boolean)),
  ] as string[];
  if (authorIds.length === 0) return authorMap;

  const authorRows = await db.select().from(authors).where(inArray(authors.id, authorIds));
  for (const author of authorRows) authorMap.set(author.id, author);
  return authorMap;
}

function publishedConditions(filter: PublishedPostsFilter = {}) {
  const conditions = [eq(posts.status, 'published')];
  if (filter.section) conditions.push(eq(posts.section, filter.section));
  if (filter.contentType) conditions.push(eq(posts.contentType, filter.contentType));
  return conditions;
}

async function postIdsForEntityFilter(filter: PostsByEntityFilter): Promise<string[]> {
  const db = getDb();
  if (!db) return [];

  const variants = entityMatchVariants(filter.entityType, filter.entityId);
  const linkConditions = variants.map((variant) =>
    and(
      eq(postEntityLinks.entityType, variant.entityType),
      eq(postEntityLinks.entityId, variant.entityId),
    ),
  );

  const primaryConditions = variants.map((variant) =>
    and(
      eq(posts.primaryEntityType, variant.entityType),
      eq(posts.primaryEntityId, variant.entityId),
    ),
  );

  const linkRows = await db
    .select({ postId: postEntityLinks.postId })
    .from(postEntityLinks)
    .where(or(...linkConditions));

  const primaryRows = await db
    .select({ id: posts.id })
    .from(posts)
    .where(or(...primaryConditions));

  return [...new Set([...linkRows.map((r) => r.postId), ...primaryRows.map((r) => r.id)])];
}

export async function getPostBySlug(slug: string): Promise<KnowledgePost | null> {
  const db = getDb();
  if (!db) return null;

  const [row] = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
  if (!row) return null;

  const authorMap = await loadAuthorsForPosts([row]);
  const [hydrated] = await hydratePosts([row], authorMap);
  return hydrated;
}

export async function getPublishedPostBySlug(slug: string): Promise<KnowledgePost | null> {
  const db = getDb();
  if (!db) return null;

  const [row] = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.status, 'published')))
    .limit(1);

  if (!row) return null;

  const authorMap = await loadAuthorsForPosts([row]);
  const [hydrated] = await hydratePosts([row], authorMap);
  return hydrated;
}

export async function getPostById(id: string): Promise<KnowledgePost | null> {
  const db = getDb();
  if (!db) return null;

  const [row] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  if (!row) return null;

  const authorMap = await loadAuthorsForPosts([row]);
  const [hydrated] = await hydratePosts([row], authorMap);
  return hydrated;
}

export async function getPublishedPosts(filter: PublishedPostsFilter = {}): Promise<KnowledgePost[]> {
  const result = await getPublishedPostsPaginated(filter);
  return result.posts;
}

export async function getPublishedPostsPaginated(
  filter: PublishedPostsFilter = {},
): Promise<PaginatedPostsResult> {
  const db = getDb();
  const limit = filter.limit ?? 20;
  const offset = filter.offset ?? 0;

  if (!db) return { posts: [], total: 0, limit, offset };

  const conditions = [...publishedConditions(filter)];

  if (filter.tag) {
    const tagRows = await db
      .select({ postId: postTags.postId })
      .from(postTags)
      .where(eq(postTags.tag, filter.tag.trim().toLowerCase()));
    const tagPostIds = tagRows.map((r) => r.postId);
    if (tagPostIds.length === 0) return { posts: [], total: 0, limit, offset };
    conditions.push(inArray(posts.id, tagPostIds));
  }

  if (filter.categorySlug) {
    const [category] = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.slug, filter.categorySlug))
      .limit(1);
    if (!category) return { posts: [], total: 0, limit, offset };

    const catRows = await db
      .select({ postId: postCategories.postId })
      .from(postCategories)
      .where(eq(postCategories.categoryId, category.id));
    const catPostIds = catRows.map((r) => r.postId);
    if (catPostIds.length === 0) return { posts: [], total: 0, limit, offset };
    conditions.push(inArray(posts.id, catPostIds));
  }

  const whereClause = and(...conditions);

  const [countRow] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(posts)
    .where(whereClause);

  const rows = await db
    .select()
    .from(posts)
    .where(whereClause)
    .orderBy(desc(posts.publishedAt), desc(posts.createdAt))
    .limit(limit)
    .offset(offset);

  const authorMap = await loadAuthorsForPosts(rows);
  const hydrated = await hydratePosts(rows, authorMap);

  return {
    posts: hydrated,
    total: countRow?.count ?? 0,
    limit,
    offset,
  };
}

export async function getPostsByEntity(filter: PostsByEntityFilter): Promise<KnowledgePost[]> {
  const db = getDb();
  if (!db) return [];

  const postIds = await postIdsForEntityFilter(filter);
  if (postIds.length === 0) return [];

  const conditions = [inArray(posts.id, postIds), eq(posts.status, 'published')];
  if (filter.section) conditions.push(eq(posts.section, filter.section));

  let query = db
    .select()
    .from(posts)
    .where(and(...conditions))
    .orderBy(desc(posts.editorialPriority), desc(posts.publishedAt));

  if (filter.limit) query = query.limit(filter.limit) as typeof query;
  if (filter.offset) query = query.offset(filter.offset) as typeof query;

  const rows = await query;
  const authorMap = await loadAuthorsForPosts(rows);
  return hydratePosts(rows, authorMap);
}

async function postIdsForEntityType(entityType: EntityType): Promise<string[]> {
  const db = getDb();
  if (!db) return [];

  const linkRows = await db
    .select({ postId: postEntityLinks.postId })
    .from(postEntityLinks)
    .where(eq(postEntityLinks.entityType, entityType));

  const primaryRows = await db
    .select({ id: posts.id })
    .from(posts)
    .where(eq(posts.primaryEntityType, entityType));

  return [...new Set([...linkRows.map((row) => row.postId), ...primaryRows.map((row) => row.id)])];
}

export async function getPublishedPostsByEntityType(
  entityType: EntityType,
  filter: { section?: PostSection; limit?: number; offset?: number } = {},
): Promise<PaginatedPostsResult> {
  const db = getDb();
  const limit = filter.limit ?? 20;
  const offset = filter.offset ?? 0;
  if (!db) return { posts: [], total: 0, limit, offset };

  const postIds = await postIdsForEntityType(entityType);
  if (postIds.length === 0) return { posts: [], total: 0, limit, offset };

  const conditions = [inArray(posts.id, postIds), eq(posts.status, 'published')];
  if (filter.section) conditions.push(eq(posts.section, filter.section));

  const where = and(...conditions);

  const [countRow] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(posts)
    .where(where);

  const rows = await db
    .select()
    .from(posts)
    .where(where)
    .orderBy(desc(posts.editorialPriority), desc(posts.publishedAt))
    .limit(limit)
    .offset(offset);

  const authorMap = await loadAuthorsForPosts(rows);
  const hydrated = await hydratePosts(rows, authorMap);

  return {
    posts: hydrated,
    total: countRow?.count ?? 0,
    limit,
    offset,
  };
}

export async function getRelatedPosts(filter: RelatedPostsFilter): Promise<KnowledgePost[]> {
  const db = getDb();
  const limit = filter.limit ?? 6;
  if (!db) return [];

  let source: KnowledgePost | null = null;
  if (filter.postId) {
    source = await getPostById(filter.postId);
  } else if (filter.excludeSlug) {
    source = await getPublishedPostBySlug(filter.excludeSlug);
  }

  const excludeIds = new Set<string>();
  if (source) excludeIds.add(source.id);

  const scored = new Map<string, { score: number; publishedAt: string | null }>();

  const addScore = (postId: string, score: number, publishedAt: string | null) => {
    if (excludeIds.has(postId)) return;
    const existing = scored.get(postId);
    if (!existing || score > existing.score) {
      scored.set(postId, { score, publishedAt });
    }
  };

  if (source?.relatedPostIds.length) {
    for (let i = 0; i < source.relatedPostIds.length; i++) {
      addScore(source.relatedPostIds[i], 1000 - i, source.publishedAt);
    }
  }

  const primaryType = source?.primaryEntityType ?? filter.entityType;
  const primaryId = source?.primaryEntityId ?? filter.entityId;

  if (primaryType && primaryId) {
    const samePrimary = await getPostsByEntity({
      entityType: primaryType,
      entityId: primaryId,
      section: filter.section,
      limit: limit * 2,
    });
    for (const post of samePrimary) {
      if (post.id === source?.id) continue;
      const isPrimary =
        post.primaryEntityType === primaryType && post.primaryEntityId === primaryId;
      addScore(post.id, isPrimary ? 500 : 400, post.publishedAt);
    }
  }

  if (source) {
    for (const link of source.entityLinks.filter((l) => l.role === 'related')) {
      const linked = await getPostsByEntity({
        entityType: link.entityType,
        entityId: link.entityId,
        section: filter.section,
        limit,
      });
      for (const post of linked) {
        addScore(post.id, 300, post.publishedAt);
      }
    }

    for (const category of source.categories) {
      const catPosts = await getPublishedPostsPaginated({
        categorySlug: category.slug,
        section: filter.section,
        limit,
      });
      for (const post of catPosts.posts) {
        addScore(post.id, 200, post.publishedAt);
      }
    }

    for (const tag of source.tags.slice(0, 5)) {
      const tagPosts = await getPublishedPostsPaginated({
        tag,
        section: filter.section,
        limit,
      });
      for (const post of tagPosts.posts) {
        addScore(post.id, 100, post.publishedAt);
      }
    }
  }

  if (scored.size === 0 && primaryType && primaryId) {
    return getPostsByEntity({
      entityType: primaryType,
      entityId: primaryId,
      section: filter.section,
      limit,
    });
  }

  if (scored.size === 0) return [];

  const rankedIds = [...scored.entries()]
    .sort(
      (a, b) =>
        b[1].score - a[1].score ||
        (b[1].publishedAt ?? '').localeCompare(a[1].publishedAt ?? ''),
    )
    .slice(0, limit)
    .map(([id]) => id);

  const rows = await db.select().from(posts).where(inArray(posts.id, rankedIds));
  const authorMap = await loadAuthorsForPosts(rows);
  const hydrated = await hydratePosts(rows, authorMap);

  const order = new Map(rankedIds.map((id, index) => [id, index]));
  return hydrated.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
}

export async function listAllPosts(): Promise<KnowledgePost[]> {
  const db = getDb();
  if (!db) return [];

  const rows = await db.select().from(posts).orderBy(desc(posts.updatedAt));
  const authorMap = await loadAuthorsForPosts(rows);
  return hydratePosts(rows, authorMap);
}

async function replaceTags(postId: string, tags: string[] = []) {
  const db = getDb();
  if (!db) return;

  await db.delete(postTags).where(eq(postTags.postId, postId));
  const normalized = [...new Set(tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean))];
  if (normalized.length === 0) return;

  await db.insert(postTags).values(normalized.map((tag) => ({ postId, tag })));
}

async function replaceEntityLinks(postId: string, links: EntityLinkInput[] = []) {
  const db = getDb();
  if (!db) return;

  await db.delete(postEntityLinks).where(eq(postEntityLinks.postId, postId));
  if (links.length === 0) return;

  await db.insert(postEntityLinks).values(
    links.map((link, index) => ({
      postId,
      entityType: link.entityType,
      entityId: link.entityId,
      role: link.role,
      sortOrder: index,
    })),
  );
}

async function replaceCategories(postId: string, categoryIds: string[] = []) {
  const db = getDb();
  if (!db) return;

  await db.delete(postCategories).where(eq(postCategories.postId, postId));
  const unique = [...new Set(categoryIds.filter(Boolean))];
  if (unique.length === 0) return;

  await db.insert(postCategories).values(unique.map((categoryId) => ({ postId, categoryId })));
}

async function replaceRelatedPosts(postId: string, relatedPostIds: string[] = []) {
  const db = getDb();
  if (!db) return;

  await db.delete(postRelatedBlogs).where(eq(postRelatedBlogs.postId, postId));
  const unique = [...new Set(relatedPostIds.filter((id) => id && id !== postId))];
  if (unique.length === 0) return;

  await db.insert(postRelatedBlogs).values(
    unique.map((relatedPostId, index) => ({
      postId,
      relatedPostId,
      sortOrder: index,
    })),
  );
}

function resolveWritePayload(input: CreatePostInput | UpdatePostInput, existing?: KnowledgePost) {
  const entityLinks = normalizeEntityLinks(input.entityLinks ?? existing?.entityLinks ?? [], {
    entityType: input.primaryEntityType ?? existing?.primaryEntityType ?? undefined,
    entityId: input.primaryEntityId ?? existing?.primaryEntityId ?? undefined,
  });

  const primary = derivePrimaryEntity(entityLinks, {
    entityType: input.primaryEntityType ?? existing?.primaryEntityType ?? undefined,
    entityId: input.primaryEntityId ?? existing?.primaryEntityId ?? undefined,
  });

  return { entityLinks, primary };
}

export async function createPost(input: CreatePostInput): Promise<KnowledgePost | null> {
  const db = getDb();
  if (!db) return null;

  const { entityLinks, primary } = resolveWritePayload(input);
  const normalizedInput: CreatePostInput = {
    ...input,
    entityLinks,
    primaryEntityType: primary.primaryEntityType ?? undefined,
    primaryEntityId: primary.primaryEntityId ?? undefined,
  };

  await validateCreatePost(normalizedInput);

  const now = new Date();
  const status = input.status ?? 'draft';
  const publishedAt =
    status === 'published'
      ? input.publishedAt
        ? new Date(input.publishedAt)
        : now
      : input.publishedAt
        ? new Date(input.publishedAt)
        : null;

  const [row] = await db
    .insert(posts)
    .values({
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt ?? null,
      content: input.content,
      contentFormat: input.contentFormat ?? 'markdown',
      status,
      contentType: input.contentType,
      section: input.section ?? 'blog',
      authorId: input.authorId ?? null,
      reviewerId: input.reviewerId ?? null,
      featuredImageUrl: input.featuredImageUrl ?? null,
      readingTimeMin: computeReadingTimeMin(input.content),
      primaryEntityType: primary.primaryEntityType,
      primaryEntityId: primary.primaryEntityId,
      healthStatus: input.healthStatus ?? 'healthy',
      lastFactCheckedAt: input.lastFactCheckedAt ? new Date(input.lastFactCheckedAt) : null,
      expertReviewed: input.expertReviewed ?? false,
      contentFreshness: input.contentFreshness ?? 'evergreen',
      seoTitle: input.seoTitle ?? null,
      seoDescription: input.seoDescription ?? null,
      canonicalUrl: input.canonicalUrl ?? null,
      publishedAt,
      archivedAt: status === 'archived' ? now : null,
      updatedAt: now,
    })
    .returning();

  await Promise.all([
    replaceTags(row.id, input.tags),
    replaceEntityLinks(row.id, entityLinks),
    replaceCategories(row.id, input.categoryIds),
    replaceRelatedPosts(row.id, input.relatedPostIds),
    savePostAuthority(row.id, {
      quickAnswer: input.quickAnswer,
      sources: input.sources,
      faqs: input.faqs,
    }),
  ]);

  return getPostById(row.id);
}

export async function updatePost(input: UpdatePostInput): Promise<KnowledgePost | null> {
  const db = getDb();
  if (!db) return null;

  const existing = await getPostById(input.id);
  if (!existing) return null;

  const { entityLinks, primary } = resolveWritePayload(input, existing);
  const mergedForValidation = {
    ...input,
    slug: input.slug ?? existing.slug,
    title: input.title ?? existing.title,
    content: input.content ?? existing.content,
    contentType: input.contentType ?? existing.contentType,
    entityLinks,
    primaryEntityType: primary.primaryEntityType ?? undefined,
    primaryEntityId: primary.primaryEntityId ?? undefined,
  };

  await validateUpdatePost(existing, mergedForValidation);

  const content = input.content ?? existing.content;
  const status = input.status ?? existing.status;
  const now = new Date();
  const publishedAt =
    input.publishedAt !== undefined
      ? input.publishedAt
        ? new Date(input.publishedAt)
        : null
      : status === 'published' && !existing.publishedAt
        ? now
        : existing.publishedAt
          ? new Date(existing.publishedAt)
          : null;

  await db
    .update(posts)
    .set({
      slug: input.slug ?? existing.slug,
      title: input.title ?? existing.title,
      excerpt: input.excerpt !== undefined ? input.excerpt : existing.excerpt,
      content,
      contentFormat: input.contentFormat ?? existing.contentFormat,
      status,
      contentType: input.contentType ?? existing.contentType,
      section: input.section ?? existing.section,
      authorId: input.authorId ?? existing.author?.id ?? null,
      reviewerId: input.reviewerId ?? existing.reviewer?.id ?? null,
      featuredImageUrl: input.featuredImageUrl ?? existing.featuredImageUrl,
      readingTimeMin: computeReadingTimeMin(content),
      primaryEntityType: primary.primaryEntityType,
      primaryEntityId: primary.primaryEntityId,
      healthStatus: input.healthStatus ?? existing.healthStatus,
      lastFactCheckedAt:
        input.lastFactCheckedAt !== undefined
          ? input.lastFactCheckedAt
            ? new Date(input.lastFactCheckedAt)
            : null
          : existing.lastFactCheckedAt
            ? new Date(existing.lastFactCheckedAt)
            : null,
      expertReviewed: input.expertReviewed ?? existing.expertReviewed,
      contentFreshness: input.contentFreshness ?? existing.contentFreshness,
      seoTitle: input.seoTitle ?? existing.seoTitle,
      seoDescription: input.seoDescription ?? existing.seoDescription,
      canonicalUrl: input.canonicalUrl ?? existing.canonicalUrl,
      publishedAt,
      archivedAt: status === 'archived' ? now : status === 'published' ? null : null,
      updatedAt: now,
    })
    .where(eq(posts.id, input.id));

  if (input.tags) await replaceTags(input.id, input.tags);
  if (
    input.entityLinks !== undefined ||
    input.primaryEntityType !== undefined ||
    input.primaryEntityId !== undefined
  ) {
    await replaceEntityLinks(input.id, entityLinks);
  }
  if (input.categoryIds) await replaceCategories(input.id, input.categoryIds);
  if (input.relatedPostIds) await replaceRelatedPosts(input.id, input.relatedPostIds);

  if (
    input.quickAnswer !== undefined ||
    input.sources !== undefined ||
    input.faqs !== undefined
  ) {
    await savePostAuthority(input.id, {
      quickAnswer: input.quickAnswer,
      sources: input.sources,
      faqs: input.faqs,
    });
  }

  return getPostById(input.id);
}

export async function publishPost(id: string): Promise<KnowledgePost | null> {
  return updatePost({ id, status: 'published' });
}

export async function archivePost(id: string): Promise<KnowledgePost | null> {
  return updatePost({ id, status: 'archived' });
}

export async function deletePost(id: string): Promise<boolean> {
  const db = getDb();
  if (!db) return false;

  const result = await db.delete(posts).where(eq(posts.id, id)).returning({ id: posts.id });
  return result.length > 0;
}

export async function listAuthors(): Promise<KnowledgeAuthor[]> {
  const db = getDb();
  if (!db) return [];

  const rows = await db.select().from(authors).orderBy(authors.name);
  return rows.map((row) => mapAuthor(row)!);
}

export async function upsertAuthor(input: {
  slug: string;
  name: string;
  role?: string;
}): Promise<string> {
  const db = getDb();
  if (!db) throw new Error('DATABASE_URL is not configured');

  const [row] = await db
    .insert(authors)
    .values({
      slug: input.slug,
      name: input.name,
      role: input.role ?? null,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: authors.slug,
      set: {
        name: sql`excluded.name`,
        role: sql`excluded.role`,
        updatedAt: sql`now()`,
      },
    })
    .returning({ id: authors.id });

  return row.id;
}

export async function resolvePostIdsBySlugs(slugs: string[]): Promise<string[]> {
  const db = getDb();
  if (!db || slugs.length === 0) return [];

  const rows = await db
    .select({ id: posts.id, slug: posts.slug })
    .from(posts)
    .where(inArray(posts.slug, slugs));

  const order = new Map(slugs.map((slug, i) => [slug, i]));
  return rows.sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0)).map((r) => r.id);
}

export async function getPostsByPlacementSlot(slotId: string, limit = 3): Promise<KnowledgePost[]> {
  const { posts } = await getPublishedPostsPaginated({
    tag: placementTag(slotId),
    section: 'blog',
    limit,
    offset: 0,
  });
  return posts;
}
