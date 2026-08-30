'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  faqsByCategory,
  type FaqCategoryId,
} from '@/lib/faqs-content';
import { FAQ_CATEGORY_LUCIDE_ICONS } from '@/lib/icons/faq-lucide-icons';
import { CONTACT, mailtoUrl, telUrl, whatsappUrl } from '@/lib/contact';
import './faqs-page.css';

/**
 * FAQ page UX — Exoticamp-style square category tiles + filtered accordion list.
 */
export default function FaqsPageView() {
  const [category, setCategory] = useState<FaqCategoryId>('all');
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);
  const [query, setQuery] = useState('');
  const tileRefs = useRef<Partial<Record<FaqCategoryId, HTMLButtonElement>>>({});
  const listRef = useRef<HTMLDivElement>(null);
  const [catsStuck, setCatsStuck] = useState(false);

  const items = useMemo(() => {
    const base = faqsByCategory(category);
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (item) =>
        item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q),
    );
  }, [category, query]);

  useEffect(() => {
    const el = tileRefs.current[category];
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [category]);

  useEffect(() => {
    const sentinel = document.getElementById('it-faq-cats-sentinel');
    if (!sentinel) return;

    let io: IntersectionObserver | null = null;
    const mount = () => {
      io?.disconnect();
      const headerH = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--sh-header-height') || '64',
      );
      io = new IntersectionObserver(
        ([entry]) => setCatsStuck(!entry.isIntersecting),
        { rootMargin: `-${headerH + 1}px 0px 0px 0px`, threshold: 0 },
      );
      io.observe(sentinel);
    };

    mount();
    window.addEventListener('resize', mount);
    return () => {
      window.removeEventListener('resize', mount);
      io?.disconnect();
    };
  }, []);

  const selectCategory = (next: FaqCategoryId) => {
    setCategory(next);
    setOpenId(null);
    requestAnimationFrame(() => {
      listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className="it-faq">
      <header className="it-faq__hero">
        <p className="it-faq__eyebrow">Help Centre</p>
        <h1 className="it-faq__title">Frequently Asked Questions</h1>
        <p className="it-faq__lead">
          Clear answers on booking, safety, gear, yatras, and more — so you can plan your Himalayan
          journey with confidence.
        </p>
      </header>

      <div className="it-faq__toolbar">
        <div className="it-faq__search">
          <i className="fa-solid fa-magnifying-glass" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            aria-label="Search FAQs"
          />
        </div>
      </div>

      <div id="it-faq-cats-sentinel" className="it-faq__cats-sentinel" aria-hidden />

      <div className={`it-faq__cats-wrap${catsStuck ? ' is-stuck' : ''}`}>
        <div
          className="it-faq__cats-shell"
          role="presentation"
        >
          <div
            className="it-faq__cats"
            role="tablist"
            aria-label="FAQ categories"
          >
          {FAQ_CATEGORIES.map((cat) => {
            const Icon = FAQ_CATEGORY_LUCIDE_ICONS[cat.id];
            const active = category === cat.id;
            const displayLabel = cat.shortLabel ?? cat.label;

            return (
              <button
                key={cat.id}
                ref={(node) => {
                  if (node) tileRefs.current[cat.id] = node;
                  else delete tileRefs.current[cat.id];
                }}
                type="button"
                role="tab"
                aria-selected={active}
                className={`it-faq__cat it-faq__cat--${cat.id}${active ? ' is-active' : ''}`}
                onClick={() => selectCategory(cat.id)}
              >
                <span
                  className={`it-faq__cat-ico it-faq__cat-ico--${cat.id}`}
                  aria-hidden
                >
                  <Icon size={28} strokeWidth={2.15} />
                </span>
                <span className="it-faq__cat-label">{displayLabel}</span>
              </button>
            );
          })}
          </div>
        </div>
      </div>

      <div ref={listRef} className="it-faq__list" role="list">
        {items.length === 0 ? (
          <div className="it-faq__empty">
            <i className="fa-regular fa-circle-question" aria-hidden />
            <p>
              No questions matched. Try another keyword or{' '}
              <Link href="/contact">contact us</Link>.
            </p>
          </div>
        ) : (
          items.map((item) => {
            const open = openId === item.id;
            return (
              <div
                key={item.id}
                className={`it-faq__item${open ? ' is-open' : ''}`}
                role="listitem"
              >
                <button
                  type="button"
                  className="it-faq__q"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : item.id)}
                >
                  <span className="it-faq__q-text">{item.question}</span>
                  <span className="it-faq__chev" aria-hidden>
                    <i className="fa-solid fa-chevron-down" />
                  </span>
                </button>
                <div className="it-faq__a" hidden={!open}>
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <section className="it-faq__help">
        <h2>Still need help?</h2>
        <p>
          Our team is available {CONTACT.hoursShort}, {CONTACT.hoursDetail}. Tell us what you are
          planning and we will guide you.
        </p>
        <div className="it-faq__help-actions">
          <a
            className="it-faq__btn it-faq__btn--primary"
            href={whatsappUrl('Hi Indian Treks! I have a question from the FAQ page.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-whatsapp" aria-hidden /> WhatsApp Us
          </a>
          <a className="it-faq__btn it-faq__btn--ghost" href={telUrl()}>
            <i className="fa-solid fa-phone" aria-hidden /> {CONTACT.phoneDisplay}
          </a>
          <a
            className="it-faq__btn it-faq__btn--ghost"
            href={mailtoUrl('FAQ enquiry from Indian Treks website')}
          >
            <i className="fa-solid fa-envelope" aria-hidden /> Email
          </a>
          <Link className="it-faq__btn it-faq__btn--ghost" href="/contact">
            Contact page
          </Link>
        </div>
      </section>
    </div>
  );
}
