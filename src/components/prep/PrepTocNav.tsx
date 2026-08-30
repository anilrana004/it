'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export type PrepTocItem = { id: string; title: string; live?: boolean };

/**
 * Sticky "On this page" nav with scroll-spy highlighting (prep / blog guides).
 */
export default function PrepTocNav({
  items,
  footer,
  scrollable = false,
}: {
  items: PrepTocItem[];
  footer?: ReactNode;
  /** Long TOCs — scroll the list and keep the active link in view */
  scrollable?: boolean;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const listRef = useRef<HTMLUListElement>(null);

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

  useEffect(() => {
    if (!scrollable || !activeId || !listRef.current) return;
    const activeLink = listRef.current.querySelector<HTMLAnchorElement>(`a[href="#${activeId}"]`);
    activeLink?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeId, scrollable]);

  if (!items.length) return null;

  return (
    <aside
      className={['it-prep__toc', scrollable ? 'it-prep__toc--scrollable' : '']
        .filter(Boolean)
        .join(' ')}
      aria-label="On this page"
    >
      <p className="it-prep__toc-label">On this page</p>
      <ul ref={listRef} className="it-prep__toc-list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={[
                activeId === item.id ? 'is-active' : '',
                item.live ? 'has-live' : '',
              ]
                .filter(Boolean)
                .join(' ') || undefined}
              aria-current={activeId === item.id ? 'location' : undefined}
            >
              <span className="it-prep__toc-text">
                {item.title}
                {item.live ? (
                  <span className="it-prep__toc-live" aria-label="Live store">
                    Live
                  </span>
                ) : null}
              </span>
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
