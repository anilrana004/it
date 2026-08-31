import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogMarkdown from '@/components/BlogMarkdown';
import BlogSidebar from '@/components/blog/BlogSidebar';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import {
  fetchAllPublishedTravelNewsSlugs,
  fetchPublishedBlogPosts,
  fetchPublishedTravelNews,
  fetchPublishedTravelNewsPost,
  travelNewsDateLong,
  travelNewsPath,
} from '@/lib/knowledge/adapter';
import { PUBLIC_ROUTES } from '@/lib/knowledge/config';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildArticleJsonLd, buildBreadcrumbJsonLd, type BreadcrumbItem } from '@/lib/seo/json-ld';
import '@/components/blog/blog-page.css';

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await fetchAllPublishedTravelNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchPublishedTravelNewsPost(slug);
  if (!item) return { title: 'Travel News' };

  return buildPageMetadata({
    title: item.seoTitle ?? item.title,
    description: item.seoDescription ?? item.summary,
    path: travelNewsPath(item.slug),
    canonicalUrl: item.canonicalUrl,
    robots: item.robots,
    image: item.image,
    type: 'article',
    publishedTime: item.publishedAt,
    modifiedTime: item.updatedAt ?? item.publishedAt,
    section: item.tag,
  });
}

function newsBreadcrumbs(item: { slug: string; title: string }): BreadcrumbItem[] {
  return [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: PUBLIC_ROUTES.blogIndex },
    { name: 'Travel News', path: PUBLIC_ROUTES.travelNewsIndex },
    { name: item.title, path: travelNewsPath(item.slug) },
  ];
}

export default async function BlogNewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const item = await fetchPublishedTravelNewsPost(slug);
  if (!item) notFound();

  const [{ items: moreNews }, { items: recentPosts }] = await Promise.all([
    fetchPublishedTravelNews({ limit: 5, offset: 0 }),
    fetchPublishedBlogPosts({ limit: 8, offset: 0 }),
  ]);

  const breadcrumbs = newsBreadcrumbs(item);

  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: item.title,
            description: item.summary,
            path: travelNewsPath(item.slug),
            image: item.image,
            datePublished: item.publishedAt.includes('T')
              ? item.publishedAt
              : `${item.publishedAt}T00:00:00+05:30`,
            dateModified: item.updatedAt ?? item.publishedAt,
            authorName: 'Indian Treks Team',
            articleType: 'NewsArticle',
          }),
          buildBreadcrumbJsonLd(breadcrumbs),
        ]}
      />
      <div className="blog-page blog-page--news">
        <div className="shell">
          <div className="blog-main">
            <Breadcrumbs items={breadcrumbs} className="blog-news__breadcrumbs" />

            <article className="blog-news__article">
              <p className="blog-news__back">
                <Link href="/blog/news">
                  <i className="fa-solid fa-arrow-left" aria-hidden /> Travel News &amp; Facts
                </Link>
              </p>

              {item.image ? (
                <div className="blog-news__article-media">
                  <img src={item.image} alt={item.title} referrerPolicy="no-referrer" />
                </div>
              ) : null}

              <header className="blog-news__article-head">
                <p className="post-meta">
                  <span>{item.tag}</span>
                  <span>{travelNewsDateLong(item.publishedAt)}</span>
                </p>
                <h1>{item.title}</h1>
              </header>

              <div className="blog-news__article-body">
                {item.markdown ? (
                  <BlogMarkdown content={item.content} />
                ) : (
                  <>
                    <p>{item.summary}</p>
                    {item.content.split('\n\n').slice(1).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </>
                )}
              </div>
            </article>

            <aside className="blog-news__related" aria-label="More news">
              <h2>More travel news</h2>
              <ul>
                {moreNews
                  .filter((entry) => entry.slug !== item.slug)
                  .slice(0, 4)
                  .map((entry) => (
                    <li key={entry.slug}>
                      <Link href={travelNewsPath(entry.slug)}>{entry.title}</Link>
                    </li>
                  ))}
              </ul>
            </aside>
          </div>

          <BlogSidebar recentPosts={recentPosts} />
        </div>
      </div>
    </>
  );
}
