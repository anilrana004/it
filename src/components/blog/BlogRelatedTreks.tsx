import Link from 'next/link';
import { getTrekById, trekDetailPath, type Trek } from '@/lib/data';
import type { BlogPost } from '@/lib/blog';
import { PUBLIC_ROUTES } from '@/lib/knowledge/config';
import { cldBlogImage } from '@/lib/cloudinary';
import { trekPhoto } from '@/lib/safe-image';

export default function BlogRelatedTreks({ post }: { post: BlogPost }) {
  const trekIds = [...new Set(post.treks ?? [])].slice(0, 4);
  const treks = trekIds
    .map((id) => getTrekById(id))
    .filter((trek): trek is Trek => Boolean(trek));

  if (treks.length === 0) return null;

  return (
    <section className="it-blog__treks" aria-labelledby="blog-treks-heading">
      <div className="it-blog__treks-head">
        <h2 id="blog-treks-heading">Treks in this story</h2>
        <Link href="/treks">Browse all</Link>
      </div>
      <ul className="it-blog__treks-grid">
        {treks.map((trek) => (
          <li key={trek.id}>
            <Link href={trekDetailPath(trek)} className="it-blog__trek-card">
              <span className="it-blog__trek-media">
                <img
                  src={cldBlogImage(trekPhoto(trek.id, trek.images[0]), 'card')}
                  alt=""
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </span>
              <span className="it-blog__trek-body">
                <strong>{trek.title}</strong>
                <span>
                  {trek.state} · {trek.duration}
                </span>
                <span className="it-blog__trek-price">
                  From ₹{(trek.pricing[0]?.price ?? 0).toLocaleString('en-IN')}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {trekIds.length === 1 ? (
        <p className="it-blog__treks-more">
          <Link href={`${PUBLIC_ROUTES.blogIndex}?entity=trek:${trekIds[0]}`}>
            More articles about {treks[0]?.title}
          </Link>
        </p>
      ) : null}
    </section>
  );
}
