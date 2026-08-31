import { blogDate, blogPath } from '@/lib/blog';
import type { LandingArticle } from '@/lib/landing-social-content';
import type { HomeFeaturedBlogPost } from '@/lib/content/home-blog';
import { isDbConfigured } from '@/lib/db';
import { isAdminOnlyDeploy } from '@/lib/deploy/role';
import { cldBlogImage } from '@/lib/cloudinary';
import { placementTag } from '@/lib/knowledge/placement-registry';
import { getPostsByPlacementSlot, getPublishedPostsPaginated } from '@/lib/knowledge/posts';
import type { KnowledgePost } from '@/lib/knowledge/types';

const DEFAULT_BLOG_IMAGE = cldBlogImage(
  'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=600&fit=crop',
  'card',
);

function readTimeLabel(post: KnowledgePost): string {
  const minutes =
    post.readingTimeMin ?? Math.max(1, Math.round(post.content.trim().split(/\s+/).length / 200));
  return `${minutes} min read`;
}

export function knowledgePostToLandingArticle(post: KnowledgePost): LandingArticle {
  return {
    href: blogPath(post.slug),
    title: post.title,
    read: readTimeLabel(post),
    excerpt: post.excerpt ?? post.content.slice(0, 140).trim(),
    image: post.featuredImageUrl ? cldBlogImage(post.featuredImageUrl, 'card') : DEFAULT_BLOG_IMAGE,
  };
}

export function knowledgePostToHomeFeatured(post: KnowledgePost): HomeFeaturedBlogPost {
  return {
    id: post.slug,
    title: post.title,
    img: post.featuredImageUrl ? cldBlogImage(post.featuredImageUrl, 'card') : DEFAULT_BLOG_IMAGE,
    date: blogDate(post.publishedAt ?? post.updatedAt ?? new Date().toISOString()),
    read: readTimeLabel(post),
    href: blogPath(post.slug),
  };
}

/** Resolve landing-page blog cards from admin placement slots, with static fallback. */
export async function fetchLandingBlogArticles(
  slotId: string,
  fallback: LandingArticle[],
  limit = 3,
): Promise<LandingArticle[]> {
  if (!isDbConfigured() || isAdminOnlyDeploy()) return fallback.slice(0, limit);

  try {
    const placed = await getPostsByPlacementSlot(slotId, limit);
    if (placed.length === 0) return fallback.slice(0, limit);
    return placed.map(knowledgePostToLandingArticle);
  } catch {
    return fallback.slice(0, limit);
  }
}

/** Homepage featured — pinned posts first, then newest blog posts. */
export async function fetchHomeFeaturedBlogPosts(
  limit = 4,
  fallback: HomeFeaturedBlogPost[] = [],
): Promise<HomeFeaturedBlogPost[]> {
  if (!isDbConfigured() || isAdminOnlyDeploy()) return fallback.slice(0, limit);

  try {
    const pinned = await getPostsByPlacementSlot('home-featured', limit);
    const pinnedSlugs = new Set(pinned.map((post) => post.slug));

    const remaining = limit - pinned.length;
    let latest: KnowledgePost[] = [];
    if (remaining > 0) {
      const result = await getPublishedPostsPaginated({
        section: 'blog',
        limit: limit + pinned.length,
        offset: 0,
      });
      latest = result.posts.filter((post) => !pinnedSlugs.has(post.slug)).slice(0, remaining);
    }

    const combined = [...pinned, ...latest].slice(0, limit);
    if (combined.length === 0) return fallback.slice(0, limit);
    return combined.map(knowledgePostToHomeFeatured);
  } catch {
    return fallback.slice(0, limit);
  }
}

export { placementTag };
