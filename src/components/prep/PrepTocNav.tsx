'use client';

import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';

export type PrepTocItem = { id: string; title: string };

/**
 * Sticky "On this page" nav with scroll-spy highlighting (prep / blog guides).
 */
export default function PrepTocNav({
  items,
  footer,
}: {
  items: PrepTocItem[];
  footer?: ReactNode;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    if (!items.length) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const offset = 140;
      const checkpoint = window.scrollY + offset;
      let current = items[0].id;

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top + window.scrollY <= checkpoint) {
          current = item.id;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items]);

  if (!items.length) return null;

  return (
    <aside className="it-prep__toc" aria-label="On this page">
      <p className="it-prep__toc-label">On this page</p>
      <ul className="it-prep__toc-list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={activeId === item.id ? 'is-active' : undefined}
              aria-current={activeId === item.id ? 'location' : undefined}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      {footer}
    </aside>
  );
}

export function PrepTocBackLink({ href, label }: { href: string; label: string }) {
  return (
    <p className="it-prep__toc-back">
      <Link href={href}>{label}</Link>
    </p>
  );
}
