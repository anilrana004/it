import Link from 'next/link';
import BlogSidebar from '@/components/blog/BlogSidebar';
import type { TravelNewsViewItem } from '@/lib/knowledge/adapter';
import { travelNewsDateLong, travelNewsPath } from '@/lib/knowledge/adapter';
import type { BlogPost } from '@/lib/blog';
import './blog-page.css';

type Props = {
  items: TravelNewsViewItem[];
  total: number;
  page: number;
  pageSize: number;
  recentPosts: BlogPost[];
};

export default function BlogNewsPageView({ items, total, page, pageSize, recentPosts }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="blog-page blog-page--news">
      <div className="shell">
        <div className="blog-main">
          <header className="blog-news__header">
            <p className="blog-news__eyebrow">Indian Treks Blog</p>
            <h1 className="blog-news__title">Travel News &amp; Facts</h1>
            <p className="blog-news__lead">
              Policy updates, destination news, visa changes, and Himalayan travel facts — curated
              for trekkers and explorers.
            </p>
          </header>

          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
              <h2 className="text-lg font-bold text-gray-800 mb-2">No travel news yet</h2>
              <p className="text-sm text-gray-500">
                Check back soon for policy updates and destination news.
              </p>
            </div>
          ) : (
            <div className="blog-news__list">
              {items.map((item) => (
                <article key={item.slug} className="blog-news__item">
                  {item.image ? (
                    <Link href={travelNewsPath(item.slug)} className="blog-news__media">
                      <img src={item.image} alt="" loading="lazy" referrerPolicy="no-referrer" />
                    </Link>
                  ) : null}
                  <div className="blog-news__body">
                    <p className="post-meta">
                      <span>{item.tag}</span>
                      <span>{travelNewsDateLong(item.publishedAt)}</span>
                    </p>
                    <h2>
                      <Link href={travelNewsPath(item.slug)}>{item.title}</Link>
                    </h2>
                    <p>{item.summary}</p>
                    <Link href={travelNewsPath(item.slug)} className="blog-news__read">
                      Read more <i className="fa-solid fa-arrow-right" aria-hidden />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {totalPages > 1 ? (
            <nav className="flex items-center justify-center gap-2 mt-8" aria-label="News pagination">
              {page > 1 ? (
                <Link
                  href={page === 2 ? '/blog/news' : `/blog/news?page=${page - 1}`}
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
                  href={`/blog/news?page=${page + 1}`}
                  className="px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold hover:bg-gray-50"
                >
                  Next
                </Link>
              ) : null}
            </nav>
          ) : null}
        </div>

        <BlogSidebar recentPosts={recentPosts} />
      </div>
    </div>
  );
}
