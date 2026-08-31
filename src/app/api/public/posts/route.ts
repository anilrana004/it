import { NextRequest, NextResponse } from 'next/server';
import { dbUnavailableResponse } from '@/lib/api/responses';
import { isDbConfigured } from '@/lib/db';
import {
  getPostsByEntity,
  getPublishedPostsPaginated,
  getPublishedPostBySlug,
  getRelatedPosts,
} from '@/lib/knowledge/posts';
import { clampPaginationLimit, clampPaginationOffset } from '@/lib/security/urls';
import type { ContentType, EntityType, PostSection } from '@/lib/knowledge/types';

const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
};

export async function GET(req: NextRequest) {
  if (!isDbConfigured()) return dbUnavailableResponse();

  const { searchParams } = req.nextUrl;
  const slug = searchParams.get('slug');
  const entityType = searchParams.get('entityType') as EntityType | null;
  const entityId = searchParams.get('entityId');
  const section = searchParams.get('section') as PostSection | null;
  const contentType = searchParams.get('contentType') as ContentType | null;
  const categorySlug = searchParams.get('categorySlug');
  const tag = searchParams.get('tag');
  const relatedTo = searchParams.get('relatedTo');
  const relatedPostId = searchParams.get('relatedPostId');
  const limit = clampPaginationLimit(Number(searchParams.get('limit') ?? '20'), 50);
  const offset = clampPaginationOffset(Number(searchParams.get('offset') ?? '0'));

  if (slug) {
    const post = await getPublishedPostBySlug(slug);
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    return NextResponse.json({ post }, { headers: CACHE_HEADERS });
  }

  if (relatedTo || relatedPostId) {
    const posts = await getRelatedPosts({
      excludeSlug: relatedTo ?? undefined,
      postId: relatedPostId ?? undefined,
      entityType: entityType ?? undefined,
      entityId: entityId ?? undefined,
      section: section ?? undefined,
      limit: clampPaginationLimit(limit, 12),
    });
    return NextResponse.json({ posts }, { headers: CACHE_HEADERS });
  }

  if (entityType && entityId) {
    const posts = await getPostsByEntity({
      entityType,
      entityId,
      section: section ?? undefined,
      limit,
      offset,
    });
    return NextResponse.json({ posts }, { headers: CACHE_HEADERS });
  }

  const result = await getPublishedPostsPaginated({
    section: section ?? undefined,
    contentType: contentType ?? undefined,
    categorySlug: categorySlug ?? undefined,
    tag: tag ?? undefined,
    limit,
    offset,
  });

  return NextResponse.json(result, { headers: CACHE_HEADERS });
}
