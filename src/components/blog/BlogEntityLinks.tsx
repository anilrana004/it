import Link from 'next/link';
import { getTrekById, trekDetailPath } from '@/lib/data';
import type { BlogPost } from '@/lib/blog';
import { PUBLIC_ROUTES } from '@/lib/knowledge/config';
import { regionLabel } from '@/lib/seo/regions';

type LinkItem = { href: string; label: string; kind: 'trek' | 'region' };

function collectEntityLinks(post: BlogPost): LinkItem[] {
  const links: LinkItem[] = [];
  const seen = new Set<string>();

  for (const id of post.treks ?? []) {
    const key = `trek:${id}`;
    if (seen.has(key)) continue;
    const trek = getTrekById(id);
    if (!trek) continue;
    seen.add(key);
    links.push({ href: trekDetailPath(trek), label: trek.title, kind: 'trek' });
  }

  for (const id of post.regions ?? []) {
    const key = `region:${id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    links.push({
      href: `${PUBLIC_ROUTES.blogIndex}?entity=region:${id}`,
      label: regionLabel(id),
      kind: 'region',
    });
  }

  return links;
}

export default function BlogEntityLinks({ post }: { post: BlogPost }) {
  const links = collectEntityLinks(post);
  if (links.length === 0) return null;

  return (
    <aside className="it-blog__entity-links" aria-label="Related destinations and treks">
      <p className="it-blog__entity-links-label">Related on Indian Treks</p>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
              <i
                className={`fa-solid ${link.kind === 'trek' ? 'fa-mountain' : 'fa-map-location-dot'}`}
                aria-hidden
              />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
