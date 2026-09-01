import Link from 'next/link';
import { blogExcerpt, blogPath, type BlogPost } from '@/lib/blog';
import { cldBlogImage } from '@/lib/cloudinary';
import { safeImage } from '@/lib/safe-image';

export default function BlogRelatedArticles({
  posts,
  title = 'Related articles',
}: {
  posts: BlogPost[];
  title?: string;
}) {
  if (posts.length === 0) return null;

  return (
    <section className="it-blog__related" aria-labelledby="blog-related-heading">
      <div className="it-blog__related-head">
        <h2 id="blog-related-heading">{title}</h2>
        <Link href="/blog">See all</Link>
      </div>
      <ul className="it-blog__related-grid">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={blogPath(post.slug)} className="it-blog__related-card">
              <span className="it-blog__related-media">
                {post.image ? (
                  <img
                    src={cldBlogImage(safeImage(post.image), 'card')}
                    alt=""
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : null}
              </span>
              <span className="it-blog__related-body">
                <span className="it-blog__related-meta">
                  {post.categories?.[0] ?? 'Trek Guides'} · {post.read}
                </span>
                <strong>{post.title}</strong>
                <span>{post.description ?? blogExcerpt(post.content, 120)}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
