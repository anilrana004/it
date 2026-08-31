import type { Metadata } from 'next';
import { absoluteUrl, ORGANIZATION, SITE_NAME } from '@/lib/site';

export type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  canonicalUrl?: string | null;
  robots?: string | null;
  image?: string | null;
  type?: 'website' | 'article';
  publishedTime?: string | null;
  modifiedTime?: string | null;
  authors?: string[];
  section?: string;
  tags?: string[];
};

function parseRobots(robots?: string | null): Metadata['robots'] | undefined {
  if (!robots) return undefined;
  const value = robots.toLowerCase();
  return {
    index: !value.includes('noindex'),
    follow: !value.includes('nofollow'),
  };
}

export function buildPageMetadata(input: PageSeoInput): Metadata {
  const canonical = input.canonicalUrl ?? absoluteUrl(input.path);
  const image = input.image ? absoluteUrl(input.image) : undefined;
  const fullTitle = input.title.includes(SITE_NAME) ? input.title : `${input.title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description: input.description,
    alternates: { canonical },
    robots: parseRobots(input.robots),
    openGraph: {
      title: fullTitle,
      description: input.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'en_IN',
      type: input.type ?? 'website',
      ...(image ? { images: [{ url: image, alt: input.title }] } : {}),
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
      ...(input.authors?.length ? { authors: input.authors } : {}),
      ...(input.section ? { section: input.section } : {}),
      ...(input.tags?.length ? { tags: input.tags } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description: input.description,
      ...(image ? { images: [image] } : {}),
    },
    authors: input.authors?.map((name) => ({ name })),
    publisher: ORGANIZATION.name,
  };
}
