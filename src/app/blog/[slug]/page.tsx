import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogPostPageView from '@/components/BlogPostPageView';
import JsonLd from '@/components/seo/JsonLd';
import { blogPath } from '@/lib/blog';
import {
  fetchAllPublishedBlogSlugs,
  fetchPublishedBlogPost,
  fetchPublishedBlogPosts,
  fetchRelatedBlogPostsForArticle,
} from '@/lib/knowledge/adapter';
import { blogPosts } from '@/lib/blog';
import { PUBLIC_ROUTES } from '@/lib/knowledge/config';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqPageJsonLd, type BreadcrumbItem } from '@/lib/seo/json-ld';

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await fetchAllPublishedBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPublishedBlogPost(slug);
  if (!post) return { title: 'Blog Post Not Found' };

  return buildPageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.description ?? post.content.slice(0, 155).replace(/\s+/g, ' ').trim(),
    path: blogPath(post.slug),
    canonicalUrl: post.canonicalUrl,
    robots: post.robots,
    image: post.image || undefined,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    authors: [post.author],
    section: post.categories?.[0],
    tags: post.keywords,
  });
}

function articleBreadcrumbs(post: { slug: string; title: string }): BreadcrumbItem[] {
  return [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: PUBLIC_ROUTES.blogIndex },
    { name: post.title, path: blogPath(post.slug) },
  ];
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchPublishedBlogPost(slug);

  if (!post) {
    const staticExists = blogPosts.some((p) => p.slug === slug);
    if (!staticExists) notFound();

    return (
      <div className="it-blog">
        <div className="it-blog__shell" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
          <div className="it-blog__main">
            <h1 className="text-2xl font-bold">Blog Post Not Found</h1>
            <p style={{ marginTop: '0.75rem' }}>
              <Link href="/blog" style={{ color: '#16a34a', fontWeight: 700 }}>
                Back to Blog
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const [{ items: recentPosts }, relatedPosts] = await Promise.all([
    fetchPublishedBlogPosts({ limit: 8, offset: 0 }),
    fetchRelatedBlogPostsForArticle(slug, 4),
  ]);
  const breadcrumbs = articleBreadcrumbs(post);
  const jsonLd: Record<string, unknown>[] = [
    buildArticleJsonLd({
      headline: post.title,
      description: post.description ?? post.title,
      path: blogPath(post.slug),
      image: post.image,
      datePublished: post.publishedAt.includes('T')
        ? post.publishedAt
        : `${post.publishedAt}T00:00:00+05:30`,
      dateModified: post.updatedAt ?? post.publishedAt,
      authorName: post.author,
      keywords: post.keywords,
    }),
    buildBreadcrumbJsonLd(breadcrumbs),
  ];

  if (post.authority?.faqs?.length) {
    jsonLd.push(buildFaqPageJsonLd(post.authority.faqs));
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogPostPageView
        post={post}
        recentPosts={recentPosts}
        relatedPosts={relatedPosts}
        breadcrumbs={breadcrumbs}
      />
    </>
  );
}
