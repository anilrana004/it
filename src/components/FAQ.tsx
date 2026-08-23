'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import './home/home-faq.css';

type HomeFaqCategory =
  | 'all'
  | 'basics'
  | 'booking'
  | 'safety'
  | 'support'
  | 'trips';

const CATEGORIES: { id: HomeFaqCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'basics', label: 'Basics' },
  { id: 'booking', label: 'Bookings' },
  { id: 'safety', label: 'Safety' },
  { id: 'trips', label: 'Trips' },
  { id: 'support', label: 'Support' },
];

const FAQS: {
  id: string;
  category: Exclude<HomeFaqCategory, 'all'>;
  q: string;
  a: string;
}[] = [
  {
    id: 'meaning',
    category: 'basics',
    q: 'What does Indian Treks Mean?',
    a: 'Indian Treks stands for authentic Himalayan adventure and offbeat travel across India — a community rooted in treks, yatras, and meaningful journeys. If you are looking for experiences that go beyond ordinary tourism, Indian Treks is your destination.',
  },
  {
    id: 'travelers',
    category: 'basics',
    q: 'Who are the Travelers of Indian Treks?',
    a: 'Indian Treks, as a social travel community, gives more importance to community building and bringing together like-minded people. The travelers you meet will be people of your own age who share the love for exploring new places.',
  },
  {
    id: 'destinations',
    category: 'trips',
    q: 'What Destinations does Indian Treks cover?',
    a: 'Indian Treks covers a wide range of products including group departures to North India and North East India, bike and backpacking trips, weekend getaways, All Girls trips, International Escapes, Himalayan Treks, Corporate Tours, and Customized Tours.',
  },
  {
    id: 'captains',
    category: 'safety',
    q: "How experienced are Indian Treks' Trip Captains?",
    a: 'All of our key trip leaders are certified with AMC or BMC qualifications and are trained in first-aid procedures to ensure traveler safety. They will ensure you have a worry-free journey.',
  },
  {
    id: 'solo',
    category: 'booking',
    q: 'I am a Solo Traveler, can I join a Group Departure?',
    a: 'Absolutely! Many of our travelers join group departures as solo wanderers and find their tribe during the journey. Carefully curated itineraries and hand-picked stays make Indian Treks the perfect choice for solo travelers.',
  },
  {
    id: 'girls',
    category: 'trips',
    q: 'What do you mean by All Girls Trips?',
    a: 'All Girls Trips are a unique offering where women from different backgrounds come together to explore hidden places. The trip is headed by a female trip lead who is experienced and expert in the field.',
  },
  {
    id: 'intl',
    category: 'trips',
    q: 'Which International Destinations does Indian Treks operate?',
    a: "Indian Treks' International section opens doors to global adventures. Currently, we curate trips to Dubai, Thailand, Maldives, Bali, Vietnam, and Nepal.",
  },
  {
    id: 'booking',
    category: 'booking',
    q: 'What is the booking process for an Indian Treks Trip?',
    a: 'The booking process is simple — explore available trips like Backpacking, Treks, Weekend Getaways, and International packages, select your trip, read the details, and proceed to booking.',
  },
  {
    id: 'reasons',
    category: 'basics',
    q: 'Give me four simple reasons to travel with Indian Treks?',
    a: '1) Experience of more than 9 years. 2) Certifications and industry recognition. 3) Thousands of successful trips with outstanding reviews. 4) A community built on shared love for travel.',
  },
  {
    id: 'achievements',
    category: 'basics',
    q: 'What are some notable achievements of Indian Treks?',
    a: 'Indian Treks has been incubated by IIM Bangalore | NSRCEL, holds membership with tourism boards, won the TripAdvisor Travelers Choice Award, and has been recognized as a top travel enterprise.',
  },
  {
    id: 'community',
    category: 'support',
    q: "What is the 'Indian Treks Community'?",
    a: "Once you travel with Indian Treks, you become part of a trusted travel community. You'll receive the newest travel updates, exclusive offers, and connect with fellow travelers who share your passion.",
  },
  {
    id: 'onground',
    category: 'support',
    q: 'Does Indian Treks have an on-ground team?',
    a: 'Yes! We have a dedicated team with 24-hour local support, ensuring we have all the information about routes and destinations before you travel. Your safety and comfort are our top priorities.',
  },
  {
    id: 'biking',
    category: 'trips',
    q: "How unique are Indian Treks' biking trips?",
    a: "Our biking trips are unmatched! We run trips on India's most iconic routes including Khardungla, Umling La, Spiti Circuit, and the classic Manali to Leh highway. Expert marshals and Royal Enfield bikes come standard.",
  },
  {
    id: 'learn',
    category: 'support',
    q: 'How to learn more about Indian Treks?',
    a: 'Check out our Instagram, Facebook, YouTube, and Twitter channels for daily updates, travel stories, and community highlights. Our blog also features detailed travel guides and destination insights.',
  },
];

function FaqBadge() {
  return (
    <span className="it-home-faq__badge" aria-hidden>
      <span className="b1" />
      <span className="b2" />
      <span className="b3" />
      <span className="b-main">FAQ</span>
    </span>
  );
}

export default function FAQ() {
  const [category, setCategory] = useState<HomeFaqCategory>('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const catsRef = useRef<HTMLDivElement>(null);

  const items = useMemo(() => {
    const base = category === 'all' ? FAQS : FAQS.filter((f) => f.category === category);
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q),
    );
  }, [category, query]);

  const scrollCats = () => {
    const el = catsRef.current;
    if (!el) return;
    const step = Math.min(280, el.clientWidth * 0.55);
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    el.scrollBy({ left: atEnd ? -el.scrollWidth : step, behavior: 'smooth' });
  };

  return (
    <section className="it-home-faq" aria-labelledby="home-faq-title">
      <div className="it-home-faq__inner">
        <div className="it-home-faq__head">
          <div className="it-home-faq__title-row">
            <h2 id="home-faq-title" className="it-home-faq__title">
              Have any <strong>Doubts</strong>
            </h2>
            <FaqBadge />
          </div>
          <button
            type="button"
            className="it-home-faq__scroll"
            onClick={scrollCats}
            aria-label="Scroll FAQ categories"
          >
            <i className="fa-solid fa-chevron-right" aria-hidden />
          </button>
        </div>

        <div
          ref={catsRef}
          className="it-home-faq__cats"
          role="tablist"
          aria-label="FAQ categories"
        >
          {CATEGORIES.map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`it-home-faq__cat${active ? ' is-active' : ''}`}
                onClick={() => {
                  setCategory(cat.id);
                  setOpenId(null);
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="it-home-faq__search">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenId(null);
            }}
            placeholder="Ask your queries...."
            aria-label="Search frequently asked questions"
            autoComplete="off"
          />
        </div>

        <div className="it-home-faq__list" role="list">
          {items.length === 0 ? (
            <div className="it-home-faq__empty">
              No questions matched.{' '}
              <Link href="/faqs">Browse all FAQs</Link> or try another keyword.
            </div>
          ) : (
            items.map((item) => {
              const open = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`it-home-faq__item${open ? ' is-open' : ''}`}
                  role="listitem"
                >
                  <button
                    type="button"
                    className="it-home-faq__q"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    <span className="it-home-faq__q-text">{item.q}</span>
                    <span className="it-home-faq__chev" aria-hidden>
                      <i className="fa-solid fa-chevron-down" />
                    </span>
                  </button>
                  {open && (
                    <div className="it-home-faq__a">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="it-home-faq__more">
          <Link href="/faqs">
            View all FAQs <i className="fa-solid fa-arrow-right" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
