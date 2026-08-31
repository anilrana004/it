/**
 * Travel Knowledge Graph — foundation constants (New Phase 1).
 * Canonical trek IDs remain in `src/lib/data.ts`.
 */

import type { ContentType, EntityType, PostSection, PostStatus } from './types';

/** Post lifecycle states enforced at the data layer. */
export const POST_STATUSES: PostStatus[] = ['draft', 'published', 'archived'];

/** Editorial sections surfaced on the storefront. */
export const POST_SECTIONS: PostSection[] = ['blog', 'travel_news'];

/** Supported content types for Phase 2+ publishing. */
export const CONTENT_TYPES: ContentType[] = [
  'guide',
  'news_update',
  'comparison',
  'seasonal',
  'safety',
  'faq_article',
];

/**
 * Entity types stored in `entity_registry`.
 * `trip` and `yatra` mirror canonical trek IDs with route-specific URLs.
 */
export const ENTITY_TYPES: EntityType[] = [
  'trek',
  'trip',
  'yatra',
  'destination',
  'region',
  'safety_topic',
];

/** When validating links, these types resolve to the same canonical trek ID. */
export const TREK_ALIAS_TYPES: EntityType[] = ['trek', 'trip', 'yatra'];

/** Next.js cache tags — used when revalidating after publish (Phase 4+). */
export const CACHE_TAGS = {
  posts: 'knowledge:posts',
  post: (slug: string) => `knowledge:post:${slug}`,
  entity: (type: string, id: string) => `knowledge:entity:${type}:${id}`,
} as const;

/** Public URL patterns preserved from the existing storefront. */
export const PUBLIC_ROUTES = {
  blogIndex: '/blog',
  blogPost: (slug: string) => `/blog/${slug}`,
  travelNewsIndex: '/blog/news',
  travelNewsPost: (slug: string) => `/blog/news/${slug}`,
  trek: (id: string) => `/treks/${id}`,
  trip: (id: string) => `/trips/${id}`,
  yatra: (id: string) => `/yatra/${id}`,
  destination: (id: string) => `/destinations/${id}`,
  safetyTopic: (id: string) => `/${id}`,
} as const;

/** Slug format for posts and registry IDs referenced in URLs. */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
