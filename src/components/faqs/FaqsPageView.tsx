'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  faqsByCategory,
  type FaqCategoryId,
} from '@/lib/faqs-content';
import { CONTACT, mailtoUrl, telUrl, whatsappUrl } from '@/lib/contact';
import './faqs-page.css';

/**
 * FAQ page UX patterned on https://www.exoticamp.com/faqs
 * — horizontal category chips + filtered accordion list.
 */
export default function FaqsPageView() {
  const [category, setCategory] = useState<FaqCategoryId>('all');
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);
  const [query, setQuery] = useState('');

  const items = useMemo(() => {
    const base = faqsByCategory(category);
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (item) =>
        item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q),
    );
  }, [category, query]);

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

      <div className="it-faq__cats-wrap">
        <div className="it-faq__cats" role="tablist" aria-label="FAQ categories">
          {FAQ_CATEGORIES.map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`it-faq__cat${active ? ' is-active' : ''}`}
                onClick={() => {
                  setCategory(cat.id);
                  setOpenId(null);
                }}
              >
                <span className="it-faq__cat-ico" aria-hidden>
                  <i className={`fa-solid ${cat.icon}`} />
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="it-faq__list" role="list">
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
