import type { MetadataRoute } from 'next';
import { treks, trekDetailPath } from '@/lib/data';
import {
  fetchAllPublishedBlogSlugs,
  fetchAllPublishedTravelNewsSlugs,
} from '@/lib/knowledge/adapter';
import { isAdminOnlyDeploy } from '@/lib/deploy/role';
import { PUBLIC_ROUTES } from '@/lib/knowledge/config';
import { absoluteUrl } from '@/lib/site';

const STATIC_PATHS = [
  '/',
  '/blog',
  '/blog/news',
  '/treks',
  '/yatra',
  '/trips',
  '/contact',
  '/about',
  '/faqs',
  '/safety',
  '/altitude-sickness-guide',
  '/how-to-prepare',
  '/trek-preparation',
  '/fitness-training-plan',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (isAdminOnlyDeploy()) return [];

  const [blogSlugs, newsSlugs] = await Promise.all([
    fetchAllPublishedBlogSlugs(),
    fetchAllPublishedTravelNewsSlugs(),
  ]);

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1 : path === '/blog' ? 0.9 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: absoluteUrl(PUBLIC_ROUTES.blogPost(slug)),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const newsEntries: MetadataRoute.Sitemap = newsSlugs.map((slug) => ({
    url: absoluteUrl(PUBLIC_ROUTES.travelNewsPost(slug)),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.65,
  }));

  const trekEntries: MetadataRoute.Sitemap = treks.map((trek) => ({
    url: absoluteUrl(trekDetailPath(trek)),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries, ...newsEntries, ...trekEntries];
}
