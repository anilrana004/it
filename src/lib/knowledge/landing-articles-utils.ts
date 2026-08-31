import type { LandingArticle } from '@/lib/landing-social-content';

/** Override static landing article cards when admin placements exist. */
export function mergeLandingArticles<T>(
  content: T,
  articles?: LandingArticle[],
): T {
  if (!articles?.length) return content;

  const base = content as T & { articles: { items: LandingArticle[] } };
  return {
    ...base,
    articles: {
      ...base.articles,
      items: articles,
    },
  };
}
