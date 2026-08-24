import type { Metadata } from 'next';
import Link from 'next/link';
import BlogPostPageView from '@/components/BlogPostPageView';
import SupportHubPageShell from '@/components/support/SupportHubPageShell';
import { blogPosts, getPostBySlug } from '@/lib/blog';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Blog Post Not Found | Indian Treks' };
  return {
    title: post.seoTitle ? `${post.seoTitle} | Indian Treks` : `${post.title} | Indian Treks`,
    description: post.description ?? post.content.slice(0, 155).replace(/\s+/g, ' ').trim(),
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <SupportHubPageShell>
        <div className="pb-20 pt-10 text-center">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">Blog Post Not Found</h1>
            <Link href="/blog" className="text-[#16a34a] hover:underline">
              Back to Blog
            </Link>
          </div>
        </div>
      </SupportHubPageShell>
    );
  }

  /* Same full-bleed layout as /how-to-prepare — no support-hub chrome */
  return <BlogPostPageView post={post} />;
}
