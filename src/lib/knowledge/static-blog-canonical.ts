/**
 * Canonical storefront blog posts defined in code (`blogPosts` + content modules).
 * DB/CMS is seeded from these; at read time we merge so structure never drifts.
 */
import {
  getPostBySlug,
  type BlogAuthority,
  type BlogPost,
} from '@/lib/blog';
import { FAMILY_TREKKING_SLUG } from '@/lib/blog-content/family-trekking-in-india';

export const CANONICAL_BLOG_SLUGS = new Set<string>([FAMILY_TREKKING_SLUG]);

export type StaticBlogSeedExtras = {
  expertReviewed?: boolean;
  contentFreshness?: 'evergreen' | 'seasonal' | 'time_sensitive';
  lastFactCheckedAt?: string;
  quickAnswer?: string;
  quickAnswerDisplay?: boolean;
  keyFacts?: { label: string; value: string }[];
};

const SEED_EXTRAS: Record<string, StaticBlogSeedExtras> = {
  [FAMILY_TREKKING_SLUG]: {
    expertReviewed: true,
    contentFreshness: 'evergreen',
    lastFactCheckedAt: '2026-08-24T00:00:00.000Z',
    quickAnswerDisplay: true,
    quickAnswer:
      'Family trekking in India gives parents and children uninterrupted time together on accessible Himalayan trails. Choose a route matched to age, fitness, and altitude — the goal is the shared journey, not the hardest summit.',
    keyFacts: [
      { label: 'Best for', value: 'Families seeking nature, teamwork, and screen-free time' },
      { label: 'Uttarakhand picks', value: 'Nag Tibba, Chopta, Dayara Bugyal — check itinerary & season' },
      { label: 'Preparation', value: 'Regular walking, light packs, hydration, age-appropriate routes' },
      { label: 'Safety', value: 'Professional trek support, weather-aware planning, realistic daily distance' },
    ],
  },
};

export function getStaticBlogSeedExtras(slug: string): StaticBlogSeedExtras | undefined {
  return SEED_EXTRAS[slug];
}

export function getStaticCanonicalBlogPost(slug: string): BlogPost | undefined {
  if (!CANONICAL_BLOG_SLUGS.has(slug)) return undefined;
  return getPostBySlug(slug);
}

function mergeAuthority(
  canonical: BlogAuthority | undefined,
  fromDb: BlogAuthority | undefined,
  extras: StaticBlogSeedExtras | undefined,
): BlogAuthority | undefined {
  const fromExtras: BlogAuthority = {
    quickAnswer: extras?.quickAnswer,
    quickAnswerDisplay: extras?.quickAnswerDisplay ?? true,
    keyFacts: extras?.keyFacts,
    expertReviewed: extras?.expertReviewed,
    lastVerified: extras?.lastFactCheckedAt?.slice(0, 10),
  };

  const merged: BlogAuthority = {
    ...fromExtras,
    ...canonical?.authority,
    ...fromDb,
    keyFacts: [
      ...(fromExtras.keyFacts ?? []),
      ...(canonical?.authority?.keyFacts ?? []),
      ...(fromDb?.keyFacts ?? []),
    ].filter(
      (fact, index, list) => list.findIndex((item) => item.label === fact.label) === index,
    ),
    sources: [...(canonical?.authority?.sources ?? []), ...(fromDb?.sources ?? [])],
    faqs: fromDb?.faqs?.length ? fromDb.faqs : canonical?.authority?.faqs,
    expertReviewed:
      fromDb?.expertReviewed ?? canonical?.authority?.expertReviewed ?? fromExtras.expertReviewed,
    lastVerified:
      fromDb?.lastVerified ?? canonical?.authority?.lastVerified ?? fromExtras.lastVerified,
  };

  const hasPanelContent =
    (merged.quickAnswerDisplay && Boolean(merged.quickAnswer?.trim() || merged.keyFacts?.length)) ||
    Boolean(merged.faqs?.length) ||
    Boolean(merged.sources?.length) ||
    Boolean(merged.authorBio?.trim()) ||
    Boolean(merged.lastVerified) ||
    merged.expertReviewed;

  return hasPanelContent ? merged : undefined;
}

/** Keep storefront output aligned with the in-repo article while preserving CMS additions. */
export function mergeCanonicalBlogPost(post: BlogPost): BlogPost {
  const canonical = getStaticCanonicalBlogPost(post.slug);
  if (!canonical) return post;

  const extras = getStaticBlogSeedExtras(post.slug);
  const authority = mergeAuthority(canonical.authority, post.authority, extras);

  return {
    ...post,
    title: canonical.title,
    content: canonical.content,
    description: canonical.description ?? post.description,
    seoTitle: canonical.seoTitle ?? post.seoTitle,
    canonicalUrl: canonical.canonicalUrl ?? post.canonicalUrl,
    image: canonical.image || post.image,
    read: canonical.read ?? post.read,
    author: canonical.author ?? post.author,
    publishedAt: canonical.publishedAt ?? post.publishedAt,
    markdown: canonical.markdown ?? post.markdown,
    treks: canonical.treks ?? post.treks,
    regions: canonical.regions ?? post.regions,
    types: canonical.types ?? post.types,
    categories: canonical.categories ?? post.categories,
    keywords: canonical.keywords ?? post.keywords,
    authority,
  };
}
