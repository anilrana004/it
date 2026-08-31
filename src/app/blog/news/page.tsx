import type { Metadata } from 'next';
import BlogNewsPageView from '@/components/blog/BlogNewsPageView';
import { fetchPublishedBlogPosts, fetchPublishedTravelNews } from '@/lib/knowledge/adapter';
import { buildPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: 'Travel News & Facts',
    description:
      'Travel policy updates, destination news, visa changes, and Himalayan facts from Indian Treks.',
    path: '/blog/news',
  });
}

export const revalidate = 300;

const PAGE_SIZE = 12;

export default async function BlogNewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam ?? '1') || 1);
  const offset = (page - 1) * PAGE_SIZE;

  const [newsResult, blogResult] = await Promise.all([
    fetchPublishedTravelNews({ limit: PAGE_SIZE, offset }),
    fetchPublishedBlogPosts({ limit: 8, offset: 0 }),
  ]);

  return (
    <BlogNewsPageView
      items={newsResult.items}
      total={newsResult.total}
      page={page}
      pageSize={PAGE_SIZE}
      recentPosts={blogResult.items}
    />
  );
}
