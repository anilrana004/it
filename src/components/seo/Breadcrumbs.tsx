import Link from 'next/link';
import type { BreadcrumbItem } from '@/lib/seo/json-ld';

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumbs({ items, className = '' }: Props) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={`it-breadcrumbs ${className}`.trim()}>
      <ol className="it-breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.path}-${index}`} className="it-breadcrumbs__item">
              {isLast ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.path}>{item.name}</Link>
              )}
              {!isLast ? (
                <span className="it-breadcrumbs__sep" aria-hidden>
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
