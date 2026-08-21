'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { photos } from '@/lib/media';
import './our-packing-list.css';

/**
 * Our Packing List — full redesign:
 * expedition dossier: field header → leaders → clickable kit checklist
 */

const CREW = [
  {
    id: 'vijay',
    tag: 'Founder',
    name: 'Mr Vijay Singh Rana',
    role: 'Founder, Indiantreks',
    years: 'Since 2005',
    image: 'https://indiantreks.in/wp-content/uploads/2023/02/Vijay-Singh-Rana-Indian-Treks.jpg',
    quote:
      'Long before Indian Treks was established, I had already been working on the ground in trekking and mountaineering since 2005. With over two decades of Himalayan experience, I prioritized quality, safety, and real mountain experience over numbers alone.',
  },
  {
    id: 'vivek',
    tag: 'CEO',
    name: 'Mr Vivek Rana',
    role: 'CEO, Indiantreks',
    years: '20,000+ trekkers / year',
    image:
      'https://indiantreks.in/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-02-at-1.52.36-PM-1024x983.jpeg',
    quote:
      'From Osla village in the Garhwal Himalayas to leading Indiantreks, my focus has always been safe, well-planned journeys. Today we welcome 20,000+ trekkers every year across 200+ routes — smooth, enriching, and unforgettable.',
  },
] as const;

const KIT = [
  {
    id: 'treks',
    mark: '01',
    title: 'Himalayan Treks',
    note: 'Weekend walks to high passes',
    href: '/treks',
    img: photos.kedarkantha,
  },
  {
    id: 'snow',
    mark: '02',
    title: 'Snow & Winter',
    note: 'Frozen lakes and white ridgelines',
    href: '/treks',
    img: photos.snow,
  },
  {
    id: 'yatra',
    mark: '03',
    title: 'Sacred Yatras',
    note: 'Pilgrim trails with mountain care',
    href: '/yatra',
    img: photos.yatra,
  },
  {
    id: 'flowers',
    mark: '04',
    title: 'Valley of Flowers',
    note: 'UNESCO meadows in bloom',
    href: '/treks/valley-of-flowers',
    img: photos.vof,
  },
  {
    id: 'nepal',
    mark: '05',
    title: 'Nepal & Abroad',
    note: 'Beyond the Indian Himalaya',
    href: '/international-getaways',
    img: photos.ebc,
  },
  {
    id: 'custom',
    mark: '06',
    title: 'Custom Trips',
    note: 'Built around your dates & pace',
    href: '/customized',
    img: photos.chopta,
  },
] as const;

function useInViewOnce<T extends HTMLElement>(delay = 0) {
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
          window.setTimeout(() => setOn(true), delay);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return { ref, on };
}

function LeaderPanel({
  person,
  index,
}: {
  person: (typeof CREW)[number];
  index: number;
}) {
  const { ref, on } = useInViewOnce<HTMLElement>(index * 80);
  const [open, setOpen] = useState(false);

  return (
    <article
      ref={ref}
      className={`it-pack__leader${on ? ' is-in' : ''}${index % 2 ? ' is-flip' : ''}`}
    >
      <div className="it-pack__leader-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={person.image} alt={person.name} referrerPolicy="no-referrer" />
        <span className="it-pack__leader-tag">{person.tag}</span>
      </div>
      <div className="it-pack__leader-copy">
        <p className="it-pack__leader-years">{person.years}</p>
        <h3 className="it-pack__leader-name">{person.name}</h3>
        <p className="it-pack__leader-role">{person.role}</p>
        <p className={`it-pack__leader-quote${open ? ' is-open' : ''}`}>{person.quote}</p>
        <button
          type="button"
          className="it-pack__leader-more"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Show less' : 'Read more'}
        </button>
      </div>
    </article>
  );
}

function KitRow({
  item,
  index,
}: {
  item: (typeof KIT)[number];
  index: number;
}) {
  const { ref, on } = useInViewOnce<HTMLAnchorElement>(index * 50);

  return (
    <Link
      ref={ref}
      href={item.href}
      className={`it-pack__kit-row${on ? ' is-in' : ''}`}
      style={{ transitionDelay: on ? `${index * 45}ms` : '0ms' }}
    >
      <span className="it-pack__kit-mark" aria-hidden>
        {item.mark}
      </span>
      <span className="it-pack__kit-thumb">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.img} alt="" loading="lazy" />
      </span>
      <span className="it-pack__kit-text">
        <span className="it-pack__kit-title">{item.title}</span>
        <span className="it-pack__kit-note">{item.note}</span>
      </span>
      <span className="it-pack__kit-go" aria-hidden>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}

export default function OurPackingList() {
  return (
    <section
      id="packing-list"
      className="it-pack scroll-mt-24 sm:scroll-mt-28"
      aria-labelledby="packing-list-heading"
    >
      <header className="it-pack__mast">
        <div className="it-pack__mast-bg" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos.kedarkantha} alt="" />
        </div>
        <div className="it-pack__mast-inner">
          <p className="it-pack__eyebrow">Field kit · Indian Treks</p>
          <h2 id="packing-list-heading" className="it-pack__title">
            Our Packing List <em>!!</em>
          </h2>
          <p className="it-pack__lede">
            The people who lead the trail — and the journeys we pack for every kind of Himalayan
            trip. Tap any kit item to open it.
          </p>
        </div>
      </header>

      <div className="it-pack__body">
        <div className="it-pack__block">
          <div className="it-pack__block-head">
            <span>Who packs</span>
            <span className="it-pack__rule" aria-hidden />
          </div>
          <div className="it-pack__leaders">
            {CREW.map((person, i) => (
              <LeaderPanel key={person.id} person={person} index={i} />
            ))}
          </div>
        </div>

        <div className="it-pack__block">
          <div className="it-pack__block-head">
            <span>What&apos;s in the bag</span>
            <span className="it-pack__rule" aria-hidden />
          </div>
          <div className="it-pack__kit" role="list">
            {KIT.map((item, i) => (
              <KitRow key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
