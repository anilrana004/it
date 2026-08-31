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

export default function BlogPageView({
  posts,
  total,
  page,
  pageSize,
  entityFilter,
  entityHeading,
  activeTopic = 'all',
}: Props) {
  const topic = getBlogTopic(activeTopic);  const [featured, ...rest] = posts;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const showFeatured = Boolean(featured && page === 1 && !entityFilter);
  const gridPosts = showFeatured ? rest : posts;

  if (posts.length === 0) {
    return (
      <div className="blog-page">
        <div className="shell">
          <div className="blog-main">
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
              <h2 className="text-lg font-bold text-gray-800 mb-2">No blog posts yet</h2>
              <p className="text-sm text-gray-500">
                Check back soon for Himalayan trek guides and travel stories.
              </p>
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
              <h1 className="blog-index__title">{topic.label} guides & stories</h1>
              <p className="blog-index__lead">{topic.description}</p>
            </header>
          ) : null}
          {showFeatured ? (
            <Link href={blogPath(featured.slug)} className="featured-post">
              <div className="featured-post__media">
                <img src={featured.image} alt="" loading="eager" referrerPolicy="no-referrer" />
                <div className="featured-post__shade" aria-hidden />
              </div>
              <div className="featured-post__body">
                <p className="post-meta">
                  <span>{featured.read}</span>
                  <span>on {blogDateLong(featured.publishedAt)}</span>
                </p>
                <h2>{featured.title}</h2>
                <p>{featured.description ?? blogExcerpt(featured.content, 220)}</p>
              </div>
            </Link>
          ) : null}

          <div className="post-grid">
            {gridPosts.map((post) => (
              <Link key={post.slug} href={blogPath(post.slug)} className="post-card">
                <div className="post-card__media">
                  <img src={post.image} alt="" loading="lazy" referrerPolicy="no-referrer" />
                </div>
                <div className="post-card__body">
                  <p className="post-meta">
                    <span>{post.read}</span>
                    <span>on {blogDateLong(post.publishedAt)}</span>
                  </p>
                  <h2>{post.title}</h2>
                  <p>{post.description ?? blogExcerpt(post.content)}</p>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 ? (
            <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Blog pagination">
              {page > 1 ? (
                <Link
                  href={pageHref(page - 1, entityFilter, activeTopic)}
                  className="px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold hover:bg-gray-50"
                >
                  Previous
                </Link>
              ) : null}
              <span className="text-sm text-gray-500 px-2">
                Page {page} of {totalPages}
              </span>
              {page < totalPages ? (
                <Link
                  href={pageHref(page + 1, entityFilter, activeTopic)}
                  className="px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold hover:bg-gray-50"
                >
                  Next
                </Link>
              ) : null}
            </nav>
          ) : null}
        </div>

        <BlogSidebar recentPosts={posts} />
      </div>
    </div>
  );
}
