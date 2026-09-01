import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';
import { blogDateLong, blogExcerpt, blogPath } from '@/lib/blog';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogTopicNav from '@/components/blog/BlogTopicNav';
import type { EntityType } from '@/lib/knowledge/types';
import { getBlogTopic, type BlogTopicId } from '@/lib/blog-taxonomy';
import './blog-page.css';

type Props = {
  posts: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
  entityFilter?: { entityType: EntityType; entityId: string };
  entityHeading?: string;
  activeTopic?: BlogTopicId;
};

function pageHref(
  page: number,
  entityFilter?: Props['entityFilter'],
  topic?: BlogTopicId,
) {
  const params = new URLSearchParams();
  if (entityFilter) params.set('entity', `${entityFilter.entityType}:${entityFilter.entityId}`);
  if (topic && topic !== 'all') params.set('topic', topic);
  if (page > 1) params.set('page', String(page));
  const query = params.toString();
  return query ? `/blog?${query}` : '/blog';
}

function postCategory(post: BlogPost): string {
  return post.categories?.[0] ?? post.types?.[0] ?? 'Trek Guides';
}

function PostMeta({ post }: { post: BlogPost }) {
  return (
    <p className="mono-meta">
      <span>{post.read}</span>
      <span className="mono-meta__dot" aria-hidden>
        ·
      </span>
      <span>{blogDateLong(post.publishedAt)}</span>
    </p>
  );
}

function CompactCard({ post }: { post: BlogPost }) {
  return (
    <Link href={blogPath(post.slug)} className="mono-compact">
      <div className="mono-compact__media">
        <img src={post.image} alt="" loading="lazy" referrerPolicy="no-referrer" />
      </div>
      <div className="mono-compact__body">
        <span className="mono-kicker">{postCategory(post)}</span>
        <h3>{post.title}</h3>
        <PostMeta post={post} />
      </div>
    </Link>
  );
}

function GridCard({ post }: { post: BlogPost }) {
  return (
    <Link href={blogPath(post.slug)} className="mono-card">
      <div className="mono-card__media">
        <img src={post.image} alt="" loading="lazy" referrerPolicy="no-referrer" />
      </div>
      <div className="mono-card__body">
        <span className="mono-kicker">{postCategory(post)}</span>
        <h2>{post.title}</h2>
        <p>{post.description ?? blogExcerpt(post.content)}</p>
        <PostMeta post={post} />
      </div>
    </Link>
  );
}

export default function BlogPageView({
  posts,
  total,
  page,
  pageSize,
  entityFilter,
  entityHeading,
  activeTopic = 'all',
}: Props) {
  const topic = getBlogTopic(activeTopic);
  const [featured, ...rest] = posts;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const showHero = Boolean(featured && page === 1 && !entityFilter);
  const heroAside = showHero ? rest.slice(0, 4) : [];
  const gridPosts = showHero ? rest.slice(4) : posts;

  if (posts.length === 0) {
    return (
      <div className="blog-page">
        <div className="shell">
          <div className="blog-main">
            <div className="mono-empty">
              <h2>No blog posts yet</h2>
              <p>Check back soon for Himalayan trek guides and travel stories.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="shell">
        <div className="blog-main">
          {!entityFilter ? <BlogTopicNav /> : null}

          {entityHeading ? (
            <header className="blog-index__entity-head">
              <h1 className="blog-index__entity-title">{entityHeading}</h1>
              <Link href="/blog" className="blog-index__entity-clear">
                View all blog posts
              </Link>
            </header>
          ) : !entityFilter && page === 1 ? (
            <header className="blog-index__hero">
              <p className="blog-index__eyebrow">Indian Treks Blog</p>
              <h1 className="blog-index__title">{topic.label} guides &amp; stories</h1>
              <p className="blog-index__lead">{topic.description}</p>
            </header>
          ) : null}

          {showHero && featured ? (
            <section className="mono-hero" aria-label="Featured stories">
              <Link href={blogPath(featured.slug)} className="mono-hero__lead">
                <div className="mono-hero__media">
                  <img src={featured.image} alt="" loading="eager" referrerPolicy="no-referrer" />
                </div>
                <div className="mono-hero__body">
                  <span className="mono-kicker">{postCategory(featured)}</span>
                  <h2>{featured.title}</h2>
                  <p>{featured.description ?? blogExcerpt(featured.content, 220)}</p>
                  <PostMeta post={featured} />
                </div>
              </Link>

              {heroAside.length > 0 ? (
                <div className="mono-hero__rail">
                  {heroAside.map((post) => (
                    <CompactCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}

          {gridPosts.length > 0 ? (
            <section className="mono-section" aria-label="More stories">
              {showHero ? (
                <div className="mono-section__head">
                  <h2 className="mono-section__title">More stories</h2>
                </div>
              ) : null}
              <div className="mono-grid">
                {gridPosts.map((post) => (
                  <GridCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          ) : null}

          {totalPages > 1 ? (
            <nav className="mono-pagination" aria-label="Blog pagination">
              {page > 1 ? (
                <Link href={pageHref(page - 1, entityFilter, activeTopic)} className="mono-pagination__btn">
                  Previous
                </Link>
              ) : (
                <span />
              )}
              <span className="mono-pagination__status">
                Page {page} of {totalPages}
              </span>
              {page < totalPages ? (
                <Link href={pageHref(page + 1, entityFilter, activeTopic)} className="mono-pagination__btn">
                  Next
                </Link>
              ) : (
                <span />
              )}
            </nav>
          ) : null}
        </div>

        <BlogSidebar recentPosts={posts} />
      </div>
    </div>
  );
}
