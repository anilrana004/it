import BlogMarkdown, { extractBlogToc } from '@/components/BlogMarkdown';

import BlogEntityLinks from '@/components/blog/BlogEntityLinks';
import BlogAuthorityPanel from '@/components/blog/BlogAuthorityPanel';
import BlogArticleToc from '@/components/blog/BlogArticleToc';
import BlogArticleProgress from '@/components/blog/BlogArticleProgress';
import BlogArticleShare from '@/components/blog/BlogArticleShare';
import BlogRelatedArticles from '@/components/blog/BlogRelatedArticles';
import BlogRelatedTreks from '@/components/blog/BlogRelatedTreks';
import BlogSidebar from '@/components/blog/BlogSidebar';

import Breadcrumbs from '@/components/seo/Breadcrumbs';

import { blogDateLong, blogPath, type BlogPost } from '@/lib/blog';

import type { BreadcrumbItem } from '@/lib/seo/json-ld';

import Link from 'next/link';

import '@/components/prep/prep-guides.css';
import '@/components/blog/blog-page.css';
import '@/components/blog/blog-prose.css';
import '@/components/blog/blog-article.css';

function stripMdLight(text: string) {
  return text.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

function postCategory(post: BlogPost): string {
  return post.categories?.[0] ?? post.types?.[0] ?? 'Trek Guides';
}

export default function BlogPostPageView({
  post,
  recentPosts,
  relatedPosts = [],
  breadcrumbs,
  compact = false,
}: {
  post: BlogPost;
  recentPosts: BlogPost[];
  relatedPosts?: BlogPost[];
  breadcrumbs: BreadcrumbItem[];
  compact?: boolean;
}) {
  const lead = post.description
    ? post.description
    : stripMdLight(
        post.content
          .replace(/\r\n/g, '\n')
          .split('\n')
          .find((l) => l.trim() && !l.startsWith('#'))
          ?.trim() || '',
      );

  const toc = post.markdown ? extractBlogToc(post.content).slice(0, 20) : [];
  const articlePath = blogPath(post.slug);
  const category = postCategory(post);
  const updatedLabel = post.updatedAt ? blogDateLong(post.updatedAt.slice(0, 10)) : null;

  return (
    <article className={`it-blog it-blog--article${compact ? ' it-blog--compact' : ''}`}>
      {compact ? null : <BlogArticleProgress />}

      <header className="mono-article-hero">
        <div className="mono-article-hero__content">
          <div className="mono-article-hero__inner">
            <Breadcrumbs items={breadcrumbs} />

            <div className="mono-article-hero__badges">
              <span className="mono-kicker">{category}</span>
              {post.authority?.expertReviewed ? (
                <span className="mono-article-hero__badge mono-article-hero__badge--verified">
                  <i className="fa-solid fa-shield-check" aria-hidden />
                  Expert reviewed
                </span>
              ) : null}
            </div>

            <h1>{post.title}</h1>
            {lead ? <p className="mono-article-hero__lead">{lead}</p> : null}

            <div className="mono-article-hero__byline">
              <div className="mono-article-hero__meta">
                <span>
                  By <strong>{post.author}</strong>
                </span>
                <span aria-hidden>·</span>
                <span>{blogDateLong(post.publishedAt)}</span>
                <span aria-hidden>·</span>
                <span>{post.read}</span>
                {updatedLabel ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>Updated {updatedLabel}</span>
                  </>
                ) : null}
              </div>
              <div className="mono-article-hero__share">
                <BlogArticleShare title={post.title} path={articlePath} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`it-blog__shell it-blog__shell--article${toc.length > 0 ? ' has-toc' : ''}`}
      >
        {toc.length > 0 ? (
          <aside
            className="it-blog__aside-left it-blog__aside-left--sticky"
            aria-label="Table of contents"
          >
            <BlogArticleToc items={toc} variant="sidebar" defaultOpen />
          </aside>
        ) : null}

        <div className="it-blog__main">
          <BlogEntityLinks post={post} />
          {post.authority ? <BlogAuthorityPanel authority={post.authority} /> : null}

          <div id="article-body" className="it-blog__article">
            {post.markdown ? (
              <BlogMarkdown content={post.content} />
            ) : (
              <div className="it-blog__article-section">
                {post.content.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
          </div>

          <BlogRelatedTreks post={post} />
          {compact ? null : <BlogRelatedArticles posts={relatedPosts} />}

          {compact ? null : (
          <div className="it-blog__trust-bar" aria-label="Editorial trust signals">
            {post.authority?.lastVerified ? (
              <span>
                <i className="fa-solid fa-circle-check" aria-hidden />
                Fact-checked {blogDateLong(post.authority.lastVerified.slice(0, 10))}
              </span>
            ) : null}
            {updatedLabel ? (
              <span>
                <i className="fa-solid fa-pen-nib" aria-hidden />
                Last updated {updatedLabel}
              </span>
            ) : null}
            <span>
              <i className="fa-solid fa-map-location-dot" aria-hidden />
              Written for Indian Himalayan trekkers
            </span>
          </div>
          )}

          {compact ? null : (
          <footer className="it-blog__article-footer">
            <div className="it-blog__cta">
              <div>
                <h2>Ready to plan your next Himalayan journey?</h2>
                <p>
                  Explore family-friendly and beginner treks, or talk to our team — we will help you
                  pick a route that matches your group.
                </p>
              </div>
              <div className="it-blog__cta-actions">
                <Link href="/family-treks">
                  <i className="fa-solid fa-people-roof" aria-hidden />
                  Family treks
                </Link>
                <Link href="/treks">
                  <i className="fa-solid fa-compass" aria-hidden />
                  Explore treks
                </Link>
                <Link href="/contact">
                  <i className="fa-solid fa-comments" aria-hidden />
                  Ask an advisor
                </Link>
              </div>
            </div>
          </footer>
          )}
        </div>

        {compact ? null : (
        <BlogSidebar
          recentPosts={recentPosts}
          activeSlug={post.slug}
          post={post}
          sharePath={articlePath}
        />
        )}
      </div>

      {toc.length > 0 && !compact ? <BlogArticleToc items={toc} variant="mobile" /> : null}
    </article>
  );
}
