import BlogHeader from '@/components/blog/BlogHeader';
import { fetchPublishedBlogPosts } from '@/lib/knowledge/adapter';

export const revalidate = 300;

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const { items } = await fetchPublishedBlogPosts({ limit: 30, offset: 0 });

  return (
    <>
      <BlogHeader searchPosts={items} />
      {children}
    </>
  );
}
