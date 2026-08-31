'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  BLOG_NAV_ITEMS,
  BLOG_THEME_STORAGE_KEY,
  blogNavActive,
  type BlogNavItem,
} from '@/lib/blog-nav';
import BrandLogo from '@/components/BrandLogo';
import { blogPath, blogPosts, type BlogPost } from '@/lib/blog';
import './blog-header.css';

type BlogTheme = 'light' | 'dark';

function readStoredTheme(): BlogTheme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(BLOG_THEME_STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function NavDropdown({ item, pathname }: { item: BlogNavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const active = blogNavActive(pathname, item);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!('children' in item) || !item.children) {
    return null;
  }

  return (
    <div
      ref={wrapRef}
      className={`it-blog-nav__drop${open ? ' is-open' : ''}${active ? ' is-active' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="it-blog-nav__link it-blog-nav__link--drop"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <i className="fa-solid fa-chevron-down" aria-hidden />
      </button>
      <ul className="it-blog-nav__menu" role="menu">
        {item.children.map((link) => (
          <li key={link.href} role="none">
            <Link href={link.href} className="it-blog-nav__menu-link" role="menuitem" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BlogHeader({ searchPosts }: { searchPosts?: BlogPost[] }) {
  const searchablePosts = searchPosts ?? blogPosts;
  const pathname = usePathname();
  const router = useRouter();
  const searchId = useId();
  const searchRef = useRef<HTMLInputElement>(null);
  const [theme, setTheme] = useState<BlogTheme>('light');
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const initial = readStoredTheme();
    setTheme(initial);
    document.body.classList.add('it-blog-mode');
    document.body.dataset.blogTheme = initial;
    return () => {
      document.body.classList.remove('it-blog-mode');
      delete document.body.dataset.blogTheme;
    };
  }, []);

  const applyTheme = useCallback((next: BlogTheme) => {
    setTheme(next);
    document.body.dataset.blogTheme = next;
    window.localStorage.setItem(BLOG_THEME_STORAGE_KEY, next);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!searchOpen) return;
    searchRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [searchOpen]);

  const results = query.trim()
    ? searchablePosts
        .filter((post) => {
          const q = query.toLowerCase();
          return (
            post.title.toLowerCase().includes(q) ||
            post.content.toLowerCase().includes(q) ||
            post.author.toLowerCase().includes(q)
          );
        })
        .slice(0, 6)
    : [];

  return (
    <header className="it-blog-nav">
      <div className="it-blog-nav__bar">
        <div className="it-blog-nav__inner">
          <div className="it-blog-nav__brand-group">
            <Link href="/" className="it-blog-nav__logo-link" aria-label="Indian Treks home">
              <BrandLogo className="it-blog-nav__logo" />
            </Link>
            <Link href="/blog" className="it-blog-nav__blog-label">
              Blog
            </Link>
          </div>

          <button
            type="button"
            className="it-blog-nav__burger"
            aria-expanded={mobileOpen}
            aria-controls="blog-nav-panel"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'}`} aria-hidden />
            <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
          </button>

          <nav
            id="blog-nav-panel"
            className={`it-blog-nav__links${mobileOpen ? ' is-open' : ''}`}
            aria-label="Blog navigation"
          >
            {BLOG_NAV_ITEMS.map((item) => {
              if ('children' in item && item.children) {
                return <NavDropdown key={item.id} item={item} pathname={pathname} />;
              }
              const active = blogNavActive(pathname, item);
              return (
                <Link
                  key={item.id}
                  href={item.href!}
                  className={`it-blog-nav__link${active ? ' is-active' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="it-blog-nav__tools">
            <button
              type="button"
              className="it-blog-nav__icon-btn"
              aria-label="Search blog"
              aria-expanded={searchOpen}
              aria-controls={searchId}
              onClick={() => setSearchOpen((v) => !v)}
            >
              <i className="fa-solid fa-magnifying-glass" aria-hidden />
            </button>

            <span className="it-blog-nav__divider" aria-hidden />

            <div className="it-blog-nav__theme" role="group" aria-label="Theme">
              <button
                type="button"
                className={`it-blog-nav__theme-btn${theme === 'light' ? ' is-active' : ''}`}
                aria-pressed={theme === 'light'}
                aria-label="Light mode"
                onClick={() => applyTheme('light')}
              >
                <i className="fa-regular fa-sun" aria-hidden />
              </button>
              <button
                type="button"
                className={`it-blog-nav__theme-btn${theme === 'dark' ? ' is-active' : ''}`}
                aria-pressed={theme === 'dark'}
                aria-label="Dark mode"
                onClick={() => applyTheme('dark')}
              >
                <i className="fa-regular fa-moon" aria-hidden />
              </button>
              <span
                className="it-blog-nav__theme-thumb"
                data-theme={theme}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>

      <div
        id={searchId}
        className={`it-blog-nav__search${searchOpen ? ' is-open' : ''}`}
        hidden={!searchOpen}
      >
        <div className="it-blog-nav__search-inner">
          <label className="sr-only" htmlFor={`${searchId}-input`}>
            Search articles
          </label>
          <div className="it-blog-nav__search-field">
            <i className="fa-solid fa-magnifying-glass" aria-hidden />
            <input
              ref={searchRef}
              id={`${searchId}-input`}
              type="search"
              value={query}
              placeholder="Search trek guides, stories, and tips…"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && results[0]) {
                  router.push(blogPath(results[0].slug));
                  setSearchOpen(false);
                }
              }}
            />
            <button type="button" className="it-blog-nav__search-close" onClick={() => setSearchOpen(false)}>
              Esc
            </button>
          </div>
          {results.length > 0 ? (
            <ul className="it-blog-nav__search-results">
              {results.map((post) => (
                <li key={post.slug}>
                  <Link href={blogPath(post.slug)} onClick={() => setSearchOpen(false)}>
                    <strong>{post.title}</strong>
                    <span>{post.read}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : query.trim() ? (
            <p className="it-blog-nav__search-empty">No articles found for &ldquo;{query}&rdquo;.</p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
