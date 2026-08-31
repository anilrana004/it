/**
 * Storefront blog/travel-news data — DB first with static fallback.
 */
import {
  blogPosts,
  blogDate,
  blogExcerpt,
  blogPath,
  getPostBySlug as getStaticPostBySlug,
  getRelatedPosts as getStaticRelatedPosts,
  type BlogPost,
  type RelatedPost,
  type RelatedSubject,
} from '@/lib/blog';
import {
  travelNewsDateLong,
  travelNewsItems,
  travelNewsPath,
  type TravelNewsItem,
} from '@/lib/content/travel-news';
import type { HomeFeaturedBlogPost } from '@/lib/content/home-blog';
import { HOME_FEATURED_BLOG_POSTS } from '@/lib/content/home-blog';
import { fetchHomeFeaturedBlogPosts as resolveHomeFeatured } from '@/lib/knowledge/landing-placements';
import { isDbConfigured } from '@/lib/db';
import { CACHE_TAGS } from '@/lib/knowledge/config';
import {
  getPostsByEntity,
  getPublishedPostsPaginated,
  getPublishedPostsByEntityType,
  getPublishedPostBySlug,
  getPublishedPosts,
  getRelatedPosts as getDbRelatedPosts,
} from '@/lib/knowledge/posts';
import type { EntityType, KnowledgePost, PaginatedPostsResult, PostsByEntityFilter } from '@/lib/knowledge/types';
import { cldBlogImage } from '@/lib/cloudinary';
import { getBlogTopic, type BlogTopicId } from '@/lib/blog-taxonomy';
import { unstable_cache } from 'next/cache';

function formatReadTime(minutes: number | null | undefined, content: string): string {
  const min = minutes ?? Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));
  return `${min} min read`;
}

function publishedDateIso(post: KnowledgePost): string {
  if (!post.publishedAt) return new Date().toISOString().slice(0, 10);
  return post.publishedAt.slice(0, 10);
}

function mapPostAuthority(post: KnowledgePost) {
  const qa = post.quickAnswer;
  const hasContent =
    (qa?.display && (qa.quickAnswer?.trim() || qa.keyFacts.length > 0)) ||
    post.faqs.length > 0 ||
    post.sources.length > 0 ||
    post.author?.bio?.trim() ||
    post.lastFactCheckedAt;

  if (!hasContent) return undefined;

  return {
    quickAnswer: qa?.quickAnswer ?? undefined,
    quickAnswerDisplay: qa?.display ?? true,
    keyFacts: qa?.keyFacts?.length ? qa.keyFacts : undefined,
    faqs: post.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
    sources: post.sources.map((source) => ({
      title: source.sourceTitle,
      url: source.sourceUrl ?? undefined,
      type: source.sourceType,
      verifiedAt: source.verifiedAt ?? undefined,
    })),
    authorBio: post.author?.bio ?? undefined,
    authorRole: post.author?.role ?? undefined,
    reviewerName: post.reviewer?.name,
    lastVerified: post.lastFactCheckedAt ?? undefined,
    expertReviewed: post.expertReviewed,
  };
}

export function knowledgePostToBlogPost(post: KnowledgePost): BlogPost {
  const trekLinks = post.entityLinks
    .filter(
      (link) =>
        link.entityType === 'trek' || link.entityType === 'trip' || link.entityType === 'yatra',
    )
    .map((link) => link.entityId);

  const regionLinks = post.entityLinks
    .filter((link) => link.entityType === 'region' || link.entityType === 'destination')
    .map((link) => link.entityId);

  if (post.primaryEntityType === 'trek' && post.primaryEntityId) {
    trekLinks.unshift(post.primaryEntityId);
  }
  if (
    (post.primaryEntityType === 'region' || post.primaryEntityType === 'destination') &&
    post.primaryEntityId
  ) {
    regionLinks.unshift(post.primaryEntityId);
  }

  return {
    slug: post.slug,
    title: post.title,
    publishedAt: publishedDateIso(post),
    read: formatReadTime(post.readingTimeMin, post.content),
    author: post.author?.name ?? 'Indian Treks Team',
    image: post.featuredImageUrl ? cldBlogImage(post.featuredImageUrl, 'card') : '',
    content: post.content,
    description: post.seoDescription ?? post.excerpt ?? blogExcerpt(post.content, 160),
    seoTitle: post.seoTitle ?? undefined,
    canonicalUrl: post.canonicalUrl ?? undefined,
    updatedAt: post.updatedAt ?? undefined,
    robots: post.robots ?? undefined,
    markdown: post.contentFormat === 'markdown',
    treks: [...new Set(trekLinks)],
    regions: [...new Set(regionLinks)],
    types: post.tags.filter((t) => ['trek', 'yatra', 'trip'].includes(t)),
    categories: post.categories.map((category) => category.name),
    keywords: post.tags,
    authority: mapPostAuthority(post),
  };
}

export type TravelNewsViewItem = TravelNewsItem & {
  content: string;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  updatedAt?: string;
  robots?: string;
  markdown?: boolean;
};

function knowledgePostToTravelNews(post: KnowledgePost): TravelNewsViewItem {
  const tag =
    post.categories[0]?.name ??
    post.tags.find((t) => !t.includes('-')) ??
    post.tags[0] ??
    'Travel News';

  return {
    slug: post.slug,
    title: post.title,
    publishedAt: publishedDateIso(post),
    summary: post.excerpt ?? blogExcerpt(post.content, 220),
    tag,
    image: post.featuredImageUrl ? cldBlogImage(post.featuredImageUrl, 'featured') : undefined,
    content: post.content,
    seoTitle: post.seoTitle ?? undefined,
    seoDescription: post.seoDescription ?? undefined,
    canonicalUrl: post.canonicalUrl ?? undefined,
    updatedAt: post.updatedAt ?? undefined,
    robots: post.robots ?? undefined,
    markdown: post.contentFormat === 'markdown',
  };
}

async function dbPublishedBlogPosts(
  options: { limit?: number; offset?: number } = {},
): Promise<PaginatedPostsResult & { items: BlogPost[] } | null> {
  if (!isDbConfigured()) return null;

  const result = await getPublishedPostsPaginated({
    section: 'blog',
    limit: options.limit ?? 20,
    offset: options.offset ?? 0,
  });

  if (result.posts.length === 0 && result.total === 0) return null;

  return {
    ...result,
    items: result.posts.map(knowledgePostToBlogPost),
  };
}

async function dbPublishedTravelNews(
  options: { limit?: number; offset?: number } = {},
): Promise<{ items: TravelNewsViewItem[]; total: number; limit: number; offset: number } | null> {
  if (!isDbConfigured()) return null;

  const result = await getPublishedPostsPaginated({
    section: 'travel_news',
    limit: options.limit ?? 20,
    offset: options.offset ?? 0,
  });

  if (result.posts.length === 0 && result.total === 0) return null;

  return {
    items: result.posts.map(knowledgePostToTravelNews),
    total: result.total,
    limit: result.limit,
    offset: result.offset,
  };
}

const cachedBlogPosts = unstable_cache(
  async (limit: number, offset: number) => dbPublishedBlogPosts({ limit, offset }),
  ['storefront-blog-posts'],
  { tags: [CACHE_TAGS.posts], revalidate: 300 },
);

const cachedTravelNews = unstable_cache(
  async (limit: number, offset: number) => dbPublishedTravelNews({ limit, offset }),
  ['storefront-travel-news'],
  { tags: [CACHE_TAGS.posts], revalidate: 300 },
);

export async function fetchPublishedBlogPost(slug: string): Promise<BlogPost | null> {
  if (isDbConfigured()) {
    const post = await getPublishedPostBySlug(slug);
    if (post) return knowledgePostToBlogPost(post);
  }
  return getStaticPostBySlug(slug) ?? null;
}

export async function fetchPublishedBlogPosts(
  options: { limit?: number; offset?: number } = {},
): Promise<PaginatedPostsResult & { items: BlogPost[] }> {
  const limit = options.limit ?? 20;
  const offset = options.offset ?? 0;

  const dbResult = await cachedBlogPosts(limit, offset);
  if (dbResult) return dbResult;

  const sorted = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const slice = sorted.slice(offset, offset + limit);

  return {
    posts: [],
    items: slice,
    total: sorted.length,
    limit,
    offset,
  };
}

export async function fetchPublishedTravelNewsPost(slug: string): Promise<TravelNewsViewItem | null> {
  if (isDbConfigured()) {
    const post = await getPublishedPostBySlug(slug);
    if (post && post.section === 'travel_news') return knowledgePostToTravelNews(post);
  }

  const item = travelNewsItems.find((entry) => entry.slug === slug);
  if (!item) return null;

  return {
    ...item,
    content: `${item.summary}\n\nThis update is part of our Travel News & Facts series.`,
    markdown: true,
  };
}

export async function fetchPublishedTravelNews(
  options: { limit?: number; offset?: number } = {},
): Promise<{ items: TravelNewsViewItem[]; total: number; limit: number; offset: number }> {
  const limit = options.limit ?? 20;
  const offset = options.offset ?? 0;

  const dbResult = await cachedTravelNews(limit, offset);
  if (dbResult) return dbResult;

  const sorted = [...travelNewsItems].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const slice = sorted.slice(offset, offset + limit);

  return {
    items: slice.map((item) => ({
      ...item,
      content: `${item.summary}\n\nThis update is part of our Travel News & Facts series.`,
      markdown: true,
    })),
    total: sorted.length,
    limit,
    offset,
  };
}

export async function fetchAllPublishedBlogSlugs(): Promise<string[]> {
  if (isDbConfigured()) {
    const posts = await getPublishedPosts({ section: 'blog', limit: 500 });
    if (posts.length > 0) return posts.map((p) => p.slug);
  }
  return blogPosts.map((p) => p.slug);
}

export async function fetchAllPublishedTravelNewsSlugs(): Promise<string[]> {
  if (isDbConfigured()) {
    const posts = await getPublishedPosts({ section: 'travel_news', limit: 500 });
    if (posts.length > 0) return posts.map((p) => p.slug);
  }
  return travelNewsItems.map((p) => p.slug);
}

export async function fetchRelatedBlogPosts(
  subject: RelatedSubject,
  count = 3,
  pageEntityType: EntityType = 'trek',
): Promise<RelatedPost[]> {
  if (isDbConfigured()) {
    const linked = await getPostsByEntity({
      entityType: pageEntityType,
      entityId: subject.id,
      section: 'blog',
      limit: count,
    });

    if (linked.length > 0) {
      return linked.map((post) => ({
        ...knowledgePostToBlogPost(post),
        related: true,
      }));
    }

    const related = await getDbRelatedPosts({
      entityType: pageEntityType,
      entityId: subject.id,
      section: 'blog',
      limit: count,
    });

    if (related.length > 0) {
      return related.map((post) => {
        const isPrimary =
          post.primaryEntityType === pageEntityType && post.primaryEntityId === subject.id;
        const hasExplicitLink = post.entityLinks.some(
          (link) =>
            (link.entityType === 'trek' || link.entityType === 'trip' || link.entityType === 'yatra') &&
            link.entityId === subject.id,
        );
        return {
          ...knowledgePostToBlogPost(post),
          related: isPrimary || hasExplicitLink,
        };
      });
    }
  }

  return getStaticRelatedPosts(subject, count);
}

export async function fetchBlogsByTrek(trekId: string, limit = 10): Promise<BlogPost[]> {
  return fetchBlogsByEntity({
    entityType: 'trek',
    entityId: trekId,
    section: 'blog',
    limit,
  });
}

export async function fetchBlogsByEntity(filter: PostsByEntityFilter): Promise<BlogPost[]> {
  if (isDbConfigured()) {
    const posts = await getPostsByEntity(filter);
    if (posts.length > 0) return posts.map(knowledgePostToBlogPost);
    return [];
  }

  if (filter.entityType === 'trek') {
    return blogPosts.filter((post) => post.treks?.includes(filter.entityId));
  }

  return [];
}

export async function fetchPublishedBlogPostsByEntity(
  filter: PostsByEntityFilter & { offset?: number },
): Promise<PaginatedPostsResult & { items: BlogPost[] }> {
  const limit = filter.limit ?? 20;
  const offset = filter.offset ?? 0;

  if (isDbConfigured()) {
    const posts = await getPostsByEntity({ ...filter, limit: limit + offset + 50 });
    const slice = posts.slice(offset, offset + limit);
    if (slice.length > 0 || posts.length > 0) {
      return {
        posts: [],
        items: slice.map(knowledgePostToBlogPost),
        total: posts.length,
        limit,
        offset,
      };
    }
  }

  let filtered = blogPosts;
  if (filter.entityType === 'trek' || filter.entityType === 'trip' || filter.entityType === 'yatra') {
    filtered = blogPosts.filter((post) => post.treks?.includes(filter.entityId));
  } else if (filter.entityType === 'region' || filter.entityType === 'destination') {
    filtered = blogPosts.filter((post) => post.regions?.includes(filter.entityId));
  }

  const sorted = [...filtered].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const slice = sorted.slice(offset, offset + limit);

  return {
    posts: [],
    items: slice,
    total: sorted.length,
    limit,
    offset,
  };
}

export async function fetchPublishedBlogPostsByTopic(
  topicId: BlogTopicId,
  options: { limit?: number; offset?: number } = {},
): Promise<PaginatedPostsResult & { items: BlogPost[] }> {
  const limit = options.limit ?? 20;
  const offset = options.offset ?? 0;
  const topic = getBlogTopic(topicId);

  if (topic.id === 'all' || topic.id === 'news') {
    return fetchPublishedBlogPosts(options);
  }

  if (isDbConfigured()) {
    let result: PaginatedPostsResult | null = null;

    if (topic.entityType) {
      result = await getPublishedPostsByEntityType(topic.entityType, {
        section: 'blog',
        limit,
        offset,
      });
    } else if (topic.contentType) {
      result = await getPublishedPostsPaginated({
        section: 'blog',
        contentType: topic.contentType,
        limit,
        offset,
      });
    } else if (topic.tag) {
      result = await getPublishedPostsPaginated({
        section: 'blog',
        tag: topic.tag,
        limit,
        offset,
      });
    }

    if (result && (result.posts.length > 0 || result.total > 0)) {
      return {
        ...result,
        items: result.posts.map(knowledgePostToBlogPost),
      };
    }
  }

  const staticFiltered = blogPosts.filter((post) => {
    if (topic.entityType === 'trek' || topic.entityType === 'trip' || topic.entityType === 'yatra') {
      return (post.treks?.length ?? 0) > 0;
    }
    if (topic.tag) return post.keywords?.includes(topic.tag) || post.categories?.includes(topic.tag);
    return true;
  });
  const sorted = [...staticFiltered].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const slice = sorted.slice(offset, offset + limit);
  return { posts: [], items: slice, total: sorted.length, limit, offset };
}

export async function fetchRelatedBlogPostsForArticle(
  slug: string,
  limit = 4,
): Promise<BlogPost[]> {
  if (isDbConfigured()) {
    const related = await getDbRelatedPosts({ excludeSlug: slug, section: 'blog', limit });
    if (related.length > 0) return related.map(knowledgePostToBlogPost);
  }
  const current = blogPosts.find((post) => post.slug === slug);
  if (!current) return blogPosts.slice(0, limit);
  return getStaticRelatedPosts(
    {
      id: current.treks?.[0] ?? current.slug,
      title: current.title,
      region: current.regions?.[0] ?? '',
      state: '',
      type: 'trek',
      bestSeason: '',
      difficulty: '',
    },
    limit,
  ).map(({ related: _related, ...post }) => post);
}

export async function fetchHomeFeaturedPosts(limit = 4): Promise<HomeFeaturedBlogPost[]> {
  return resolveHomeFeatured(limit, HOME_FEATURED_BLOG_POSTS);
}

export { travelNewsDateLong, travelNewsPath, blogPath, blogExcerpt };
