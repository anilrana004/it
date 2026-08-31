import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';
import { PUBLIC_ROUTES } from '@/lib/knowledge/config';

export default function BlogArticleMeta({ post }: { post: BlogPost }) {
  const categories = post.categories ?? [];
  const tags = (post.keywords ?? []).filter(
    (tag) => !tag.startsWith('placement:') && !categories.includes(tag),
  );

  if (categories.length === 0 && tags.length === 0) return null;

  return (
    <div className="it-blog__meta-bar">
      {categories.length > 0 ? (
        <div className="it-blog__meta-group">
          <span className="it-blog__meta-kicker">Category</span>
          <ul className="it-blog__meta-chips">
            {categories.map((category) => (
              <li key={category}>
                <span className="it-blog__meta-chip is-category">{category}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {tags.length > 0 ? (
        <div className="it-blog__meta-group">
          <span className="it-blog__meta-kicker">Tags</span>
          <ul className="it-blog__meta-chips">
            {tags.slice(0, 12).map((tag) => (
              <li key={tag}>
                <Link href={`${PUBLIC_ROUTES.blogIndex}?topic=${encodeURIComponent(tag)}`} className="it-blog__meta-chip">
                  #{tag.replace(/-/g, ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
