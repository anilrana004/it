'use client';

import { useEffect, useRef, useState } from 'react';
import type { BlogTocItem } from '@/components/BlogMarkdown';

type Props = {
  items: BlogTocItem[];
  variant?: 'sidebar' | 'inline';
};

export default function BlogArticleToc({ items, variant = 'sidebar' }: Props) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const [open, setOpen] = useState(true);
  const listRef = useRef<HTMLOListElement>(null);
  const isInline = variant === 'inline';

  useEffect(() => {
    if (items.length === 0) return;

    let frame = 0;
    const offset = 140;

    const update = () => {
      frame = 0;
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
    if (!activeId || !listRef.current) return;
    const activeLink = listRef.current.querySelector<HTMLAnchorElement>(`a[href="#${activeId}"]`);
    activeLink?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeId]);

  if (items.length === 0) return null;

  const list = (
    <ol ref={listRef} className="it-blog__toc-list">
      {items.map((item) => (
        <li
          key={item.id}
          className={`it-blog__toc-item it-blog__toc-item--l${item.level}${activeId === item.id ? ' is-active' : ''}`}
        >
          <a
            href={`#${item.id}`}
            onClick={() => setOpen(false)}
            aria-current={activeId === item.id ? 'location' : undefined}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  );

  if (isInline) {
    return (
      <nav className="it-blog__toc it-blog__toc--inline" aria-label="On this page">
        <div className="it-blog__toc-inline-head">
          <span className="it-blog__toc-inline-icon" aria-hidden>
            <i className="fa-solid fa-list-ul" />
          </span>
          <div>
            <p className="it-blog__toc-label">On this page</p>
            <p className="it-blog__toc-inline-sub">
              {items.length} sections · tap to jump
            </p>
          </div>
        </div>
        {list}
      </nav>
    );
  }

  return (
    <nav className="it-blog__toc it-blog__toc--sidebar" aria-label="Table of contents">
      <button
        type="button"
        className="it-blog__toc-toggle"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <i className="fa-solid fa-list-ul" aria-hidden />
        On this page
        <i className={`fa-solid fa-chevron-${open ? 'up' : 'down'}`} aria-hidden />
      </button>

      <div className={`it-blog__toc-panel${open ? ' is-open' : ''}`}>
        <p className="it-blog__toc-label">Jump to section</p>
        {list}
      </div>
    </nav>
  );
}
