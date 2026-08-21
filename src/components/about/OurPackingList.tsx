'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { photos } from '@/lib/media';
import './our-packing-list.css';

/**
 * Our Packing List — new flow:
 * 01 Meet the crew (passport cards, swipe on phone)
 * 02 What's packed (filterable kit board, no auto-marquee)
 */

type KitGroup = 'All' | 'Treks' | 'Yatra' | 'Travel';

const CREW = [
  {
    id: 'vijay',
    stamp: 'Founder',
    name: 'Mr Vijay Singh Rana',
    role: 'Founder, Indiantreks',
    image: 'https://indiantreks.in/wp-content/uploads/2023/02/Vijay-Singh-Rana-Indian-Treks.jpg',
    quote:
      'Long before Indian Treks was established, I had already been working on the ground in trekking and mountaineering since 2005. With over two decades of Himalayan experience, I prioritized quality, safety, and real mountain experience over numbers alone.',
  },
  {
    id: 'vivek',
    stamp: 'CEO',
    name: 'Mr Vivek Rana',
    role: 'CEO, Indiantreks',
    image:
      'https://indiantreks.in/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-02-at-1.52.36-PM-1024x983.jpeg',
    quote:
      'From Osla village in the Garhwal Himalayas to leading Indiantreks, my focus has always been safe, well-planned journeys. Today we welcome 20,000+ trekkers every year across 200+ routes — smooth, enriching, and unforgettable.',
  },
] as const;

const KIT: {
  label: string;
  href: string;
  img: string;
  group: Exclude<KitGroup, 'All'>;
  tag: string;
}[] = [
  { label: 'Himalayan Treks', href: '/treks', img: photos.kedarkantha, group: 'Treks', tag: 'Core' },
  { label: 'Snow Adventures', href: '/treks', img: photos.snow, group: 'Treks', tag: 'Winter' },
  { label: 'Valley of Flowers', href: '/treks/valley-of-flowers', img: photos.vof, group: 'Treks', tag: 'Seasonal' },
  { label: 'Hampta Pass', href: '/treks/hampta-pass', img: photos.hampta, group: 'Treks', tag: 'Pass' },
  { label: 'Sacred Yatras', href: '/yatra', img: photos.yatra, group: 'Yatra', tag: 'Pilgrimage' },
  { label: 'Kedarnath', href: '/yatra/kedarnath-yatra', img: photos.kedarnath, group: 'Yatra', tag: 'Jyotirlinga' },
  { label: 'Weekend Escapes', href: '/treks?difficulty=easy', img: photos.triund, group: 'Travel', tag: 'Short' },
  { label: 'Uttarakhand', href: '/treks?region=uttarakhand', img: photos.uttarakhand, group: 'Travel', tag: 'Region' },
  { label: 'Himachal Trails', href: '/treks?region=himachal', img: photos.himachal, group: 'Travel', tag: 'Region' },
  { label: 'Nepal Circuits', href: '/treks?region=nepal', img: photos.nepal, group: 'Travel', tag: 'Abroad' },
  { label: 'International', href: '/international-getaways', img: photos.ebc, group: 'Travel', tag: 'Expedition' },
  { label: 'Custom Trips', href: '/customized', img: photos.chopta, group: 'Travel', tag: 'Bespoke' },
];

const FILTERS: KitGroup[] = ['All', 'Treks', 'Yatra', 'Travel'];

function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, on };
}

function PassportCard({
  person,
  index,
}: {
  person: (typeof CREW)[number];
  index: number;
}) {
  const { ref, on } = useInViewOnce<HTMLElement>();
  const [open, setOpen] = useState(false);

  return (
    <article
      ref={ref}
      className={`it-pack__passport${on ? ' is-in' : ''}`}
      style={{ transitionDelay: on ? `${index * 90}ms` : '0ms' }}
    >
      <div className="it-pack__passport-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={person.image} alt={person.name} referrerPolicy="no-referrer" />
        <span className="it-pack__passport-stamp">{person.stamp}</span>
      </div>
      <div className="it-pack__passport-body">
        <h3 className="it-pack__passport-name">{person.name}</h3>
        <p className="it-pack__passport-role">{person.role}</p>
        <p className={`it-pack__passport-quote${open ? '' : ' is-clamped'}`}>{person.quote}</p>
        <button
          type="button"
          className="it-pack__passport-toggle"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Show less' : 'Continue reading'}
        </button>
      </div>
    </article>
  );
}

export default function OurPackingList() {
  const [filter, setFilter] = useState<KitGroup>('All');
  const tileRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [seen, setSeen] = useState<boolean[]>(() => KIT.map(() => false));

  const items = useMemo(
    () => (filter === 'All' ? KIT : KIT.filter((k) => k.group === filter)),
    [filter],
  );

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSeen(KIT.map(() => true));
      return;
    }

    const observers: IntersectionObserver[] = [];
    tileRefs.current.forEach((el, i) => {
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setSeen((prev) => {
              if (prev[i]) return prev;
              const next = [...prev];
              next[i] = true;
              return next;
            });
            io.disconnect();
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -4% 0px' },
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [filter]);

  return (
    <section
      id="packing-list"
      className="it-pack scroll-mt-24 sm:scroll-mt-28"
      aria-labelledby="packing-list-heading"
    >
      <div className="it-pack__band">
        <div className="it-pack__intro">
          <div>
            <p className="it-pack__kicker">
              <span aria-hidden /> About the pack
            </p>
            <h2 id="packing-list-heading" className="it-pack__title">
              Our Packing List <i>!!</i>
            </h2>
          </div>
          <p className="it-pack__lead">
            Not gear — people and journeys. Meet the crew who built Indian Treks, then browse what we
            pack into every season of the mountains.
          </p>
        </div>

        <div className="it-pack__chapter">
          <span className="it-pack__chapter-num">01</span>
          <p className="it-pack__chapter-label">Meet the crew</p>
        </div>

        <div className="it-pack__crew" aria-label="Founders">
          {CREW.map((person, i) => (
            <PassportCard key={person.id} person={person} index={i} />
          ))}
        </div>

        <div className="it-pack__kit">
          <div className="it-pack__chapter">
            <span className="it-pack__chapter-num">02</span>
            <p className="it-pack__chapter-label">What&apos;s packed</p>
          </div>

          <div className="it-pack__filters" role="tablist" aria-label="Filter journeys">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                className={`it-pack__filter${filter === f ? ' is-on' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="it-pack__board">
            {items.length === 0 ? (
              <p className="it-pack__empty">Nothing packed in this filter yet.</p>
            ) : (
              items.map((item) => {
                const idx = KIT.findIndex((k) => k.label === item.label);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    ref={(el) => {
                      if (idx >= 0) tileRefs.current[idx] = el;
                    }}
                    className={`it-pack__tile${seen[idx] ? ' is-in' : ''}`}
                    style={{
                      transitionDelay: seen[idx] ? `${(idx % 4) * 55}ms` : '0ms',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.img} alt="" loading="lazy" />
                    <div className="it-pack__tile-shade" aria-hidden />
                    <div className="it-pack__tile-copy">
                      <p className="it-pack__tile-tag">{item.tag}</p>
                      <p className="it-pack__tile-name">{item.label}</p>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
