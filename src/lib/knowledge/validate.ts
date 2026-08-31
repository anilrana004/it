import { getDb, schema } from '@/lib/db';
import { entityExists, resolveEntityReference } from '@/lib/knowledge/entity-registry';
import { SLUG_PATTERN } from '@/lib/knowledge/config';
import { isSafeHttpUrl } from '@/lib/security/urls';
import type { CreatePostInput, EntityLink, KnowledgePost, PostStatus, UpdatePostInput } from '@/lib/knowledge/types';
import { and, eq, ne } from 'drizzle-orm';
import { PostValidationError } from './errors';

const { posts } = schema;

type ValidateInput = CreatePostInput & { id?: string };

async function slugTaken(slug: string, excludeId?: string): Promise<boolean> {
  const db = getDb();
  if (!db) return false;

  const conditions = [eq(posts.slug, slug.trim())];
  if (excludeId) conditions.push(ne(posts.id, excludeId));

  const [row] = await db
    .select({ id: posts.id })
    .from(posts)
    .where(and(...conditions))
    .limit(1);

  return Boolean(row);
}

async function validateEntityRef(
  entityType: ValidateInput['primaryEntityType'],
  entityId: string | undefined,
  field: string,
  errors: Record<string, string>,
  required: boolean,
) {
  if (!entityType && !entityId) {
    if (required) errors[field] = 'Primary entity is required before publishing';
    return;
  }
  if (!entityType || !entityId?.trim()) {
    errors[field] = 'Entity type and ID must both be set';
    return;
  }

  const resolved = resolveEntityReference(entityType, entityId.trim());
  const exists = await entityExists(resolved.entityType, resolved.entityId);
  if (!exists) {
    errors[field] = `Unknown entity: ${entityType}/${entityId}`;
  }
}

async function validateEntityLinks(
  links: EntityLink[] | Omit<EntityLink, 'sortOrder'>[] | undefined,
  errors: Record<string, string>,
) {
  if (!links?.length) return;

  for (const link of links) {
    const resolved = resolveEntityReference(link.entityType, link.entityId);
    const exists = await entityExists(resolved.entityType, resolved.entityId);
    if (!exists) {
      errors.entityLinks = `Unknown related entity: ${link.entityType}/${link.entityId}`;
      return;
    }
  }
}

export async function validatePostInput(
  input: ValidateInput,
  options: { forPublish: boolean; excludeId?: string },
): Promise<void> {
  const errors: Record<string, string> = {};
  const slug = input.slug?.trim();
  const title = input.title?.trim();
  const content = input.content?.trim();
  const status: PostStatus = input.status ?? 'draft';

  if (!slug) {
    errors.slug = 'Slug is required';
  } else if (!SLUG_PATTERN.test(slug)) {
    errors.slug = 'Slug must be lowercase letters, numbers, and hyphens only';
  } else if (await slugTaken(slug, options.excludeId)) {
    errors.slug = 'Slug is already in use';
  }

  if (!title) errors.title = 'Title is required';
  if (!content) errors.content = 'Content is required';
  if (!input.contentType) errors.contentType = 'Content type is required';

  if (input.canonicalUrl?.trim() && !isSafeHttpUrl(input.canonicalUrl)) {
    errors.canonicalUrl = 'Canonical URL must be http(s) or a site-relative path';
  }

  if (input.featuredImageUrl?.trim() && !isSafeHttpUrl(input.featuredImageUrl)) {
    errors.featuredImageUrl = 'Featured image URL must be http(s) or a site-relative path';
  }

  if (input.sources?.length) {
    for (const source of input.sources) {
      if (source.sourceUrl?.trim() && !isSafeHttpUrl(source.sourceUrl)) {
        errors.sources = 'Source URLs must be valid http(s) links';
        break;
      }
    }
  }

  if (options.forPublish || status === 'published') {
    if (!input.authorId) {
      errors.authorId = 'Author is required before publishing';
    }

    await validateEntityRef(
      input.primaryEntityType,
      input.primaryEntityId,
      'primaryEntity',
      errors,
      false,
    );

    await validateEntityLinks(input.entityLinks, errors);

    const seoTitle = input.seoTitle?.trim() || title;
    const seoDescription = input.seoDescription?.trim() || input.excerpt?.trim();
    if (!seoTitle) errors.seoTitle = 'SEO title or title is required before publishing';
    if (!seoDescription) {
      errors.seoDescription = 'SEO description or excerpt is required before publishing';
    }
  }

  if (Object.keys(errors).length > 0) {
    throw new PostValidationError('Post validation failed', errors);
  }
}

export async function validateCreatePost(input: CreatePostInput): Promise<void> {
  await validatePostInput(input, { forPublish: input.status === 'published' });
}

export async function validateUpdatePost(
  existing: KnowledgePost,
  input: UpdatePostInput,
): Promise<void> {
  const nextStatus = input.status ?? existing.status;
  const merged: ValidateInput = {
    slug: input.slug ?? existing.slug,
    title: input.title ?? existing.title,
    excerpt: input.excerpt ?? existing.excerpt ?? undefined,
    content: input.content ?? existing.content,
    contentFormat: input.contentFormat ?? existing.contentFormat,
    status: nextStatus,
    contentType: input.contentType ?? existing.contentType,
    section: input.section ?? existing.section,
    authorId: input.authorId ?? existing.author?.id,
    featuredImageUrl: input.featuredImageUrl ?? existing.featuredImageUrl ?? undefined,
    primaryEntityType: input.primaryEntityType ?? existing.primaryEntityType ?? undefined,
    primaryEntityId: input.primaryEntityId ?? existing.primaryEntityId ?? undefined,
    seoTitle: input.seoTitle ?? existing.seoTitle ?? undefined,
    seoDescription: input.seoDescription ?? existing.seoDescription ?? undefined,
    canonicalUrl: input.canonicalUrl ?? existing.canonicalUrl ?? undefined,
    tags: input.tags ?? existing.tags,
    entityLinks: input.entityLinks ?? existing.entityLinks,
    sources: input.sources,
    id: input.id,
  };

  await validatePostInput(merged, {
    forPublish: nextStatus === 'published',
    excludeId: input.id,
  });
}
