import BlogMarkdown, { extractBlogToc } from '@/components/BlogMarkdown';

import BlogEntityLinks from '@/components/blog/BlogEntityLinks';
import BlogAuthorityPanel from '@/components/blog/BlogAuthorityPanel';
import BlogArticleToc from '@/components/blog/BlogArticleToc';
import BlogArticleProgress from '@/components/blog/BlogArticleProgress';
import BlogRelatedArticles from '@/components/blog/BlogRelatedArticles';
import BlogRelatedTreks from '@/components/blog/BlogRelatedTreks';
import BlogSidebar from '@/components/blog/BlogSidebar';

import Breadcrumbs from '@/components/seo/Breadcrumbs';

import { blogDateLong, blogPath, type BlogPost } from '@/lib/blog';
import { cldBlogImage } from '@/lib/cloudinary';
import { safeImage } from '@/lib/safe-image';

import type { BreadcrumbItem } from '@/lib/seo/json-ld';

import Link from 'next/link';

import '@/components/prep/prep-guides.css';

import '@/components/blog/blog-page.css';
import '@/components/blog/blog-prose.css';

function stripMdLight(text: string) {
  return text.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

export default function BlogPostPageView({
  post,
  recentPosts,
  relatedPosts = [],
  breadcrumbs,
}: {
  post: BlogPost;
  recentPosts: BlogPost[];
  relatedPosts?: BlogPost[];
  breadcrumbs: BreadcrumbItem[];
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
  const heroImage = post.image ? cldBlogImage(safeImage(post.image), 'featured') : '';
  const articlePath = blogPath(post.slug);

  const category = post.categories?.[0];
  const updatedLabel = post.updatedAt ? blogDateLong(post.updatedAt.slice(0, 10)) : null;

  return (
    <article className="it-blog it-blog--article">
      <BlogArticleProgress />
      <header className="it-blog__hero it-blog__hero--article it-blog__hero--premium">
        <div className="it-blog__hero-media" aria-hidden={false}>
          {heroImage ? <img src={heroImage} alt={post.title} referrerPolicy="no-referrer" /> : null}
        </div>
        <div className="it-blog__hero-shade" aria-hidden />
        <div className="it-blog__hero-inner">
          <Breadcrumbs items={breadcrumbs} className="it-blog__breadcrumbs" />
          <div className="it-blog__hero-badges">
            {category ? (
              <span className="it-blog__hero-badge it-blog__hero-badge--category">{category}</span>
            ) : null}
            {post.authority?.expertReviewed ? (
              <span className="it-blog__hero-badge it-blog__hero-badge--verified">
                <i className="fa-solid fa-shield-check" aria-hidden />
                Expert reviewed
              </span>
            ) : null}
            <span className="it-blog__hero-badge">
              <i className="fa-solid fa-mountain-sun" aria-hidden />
              Himalayan guide
            </span>
          </div>
          <h1 className="it-blog__title">{post.title}</h1>
          {lead ? <p className="it-blog__lead">{lead}</p> : null}
          <div className="it-blog__chips">
            <span className="it-blog__chip">
              <i className="fa-regular fa-calendar" aria-hidden />
              {blogDateLong(post.publishedAt)}
            </span>
            {updatedLabel ? (
              <span className="it-blog__chip">
                <i className="fa-solid fa-rotate" aria-hidden />
                Updated {updatedLabel}
              </span>
            ) : null}
            <span className="it-blog__chip">
              <i className="fa-regular fa-clock" aria-hidden />
              {post.read}
            </span>
            <span className="it-blog__chip">
              <i className="fa-solid fa-user" aria-hidden />
              {post.author}
            </span>
          </div>
        </div>
      </header>

      <div className={`it-blog__shell it-blog__shell--article${toc.length > 0 ? ' has-toc' : ''}`}>
        {toc.length > 0 ? (
          <aside className="it-blog__aside-left it-blog__aside-left--sticky" aria-label="Table of contents">
            <BlogArticleToc items={toc} variant="sidebar" />
          </aside>
        ) : null}

        <div className="it-blog__main">
          <BlogEntityLinks post={post} />
          {post.authority ? <BlogAuthorityPanel authority={post.authority} /> : null}

          <div id="article-body" className="it-blog__article">
            {toc.length > 0 ? <BlogArticleToc items={toc} variant="inline" /> : null}
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
          <BlogRelatedArticles posts={relatedPosts} />

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
        </div>

        <BlogSidebar
          recentPosts={recentPosts}
          activeSlug={post.slug}
          post={post}
          sharePath={articlePath}
        />
      </div>
    </article>
  );
}
