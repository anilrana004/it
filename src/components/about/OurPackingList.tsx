'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { photos } from '@/lib/media';
import './our-packing-list.css';

/**
 * Our Packing List:
 * 01 Meet the crew (passport cards)
 * 02 What's packed (immersive route lanes — not a filter grid)
 */

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

const ROUTES = [
  {
    id: 'treks',
    pill: 'Treks',
    title: 'Himalayan Treks',
    desc: 'From easy weekends to high passes — guided routes across Uttarakhand, Himachal, and beyond.',
    href: '/treks',
    img: photos.kedarkantha,
    cta: 'Browse treks',
  },
  {
    id: 'snow',
    pill: 'Winter',
    title: 'Snow & Winter Trails',
    desc: 'Frozen lakes, white ridgelines, and cold-season adventures built for first snow and seasoned boots.',
    href: '/treks',
    img: photos.snow,
    cta: 'See snow trips',
  },
  {
    id: 'yatra',
    pill: 'Yatra',
    title: 'Sacred Himalayan Yatras',
    desc: 'Kedarnath, Do Dham, Char Dham — pilgrimage logistics with the same care as our expeditions.',
    href: '/yatra',
    img: photos.yatra,
    cta: 'Explore yatras',
  },
  {
    id: 'flowers',
    pill: 'Seasonal',
    title: 'Valley of Flowers',
    desc: 'A UNESCO bloom season classic — meadows, monsoon colour, and carefully paced itineraries.',
    href: '/treks/valley-of-flowers',
    img: photos.vof,
    cta: 'View itinerary',
  },
  {
    id: 'world',
    pill: 'Abroad',
    title: 'Nepal & International',
    desc: 'Everest, Annapurna, and Nepal circuits with trusted local partners and clear support.',
    href: '/international-getaways',
    img: photos.ebc,
    cta: 'Go international',
  },
  {
    id: 'custom',
    pill: 'Custom',
    title: 'Made-for-you Journeys',
    desc: 'Private groups, corporate offsites, and tailored routes designed around your dates and pace.',
    href: '/customized',
    img: photos.chopta,
    cta: 'Plan a custom trip',
  },
] as const;

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

function RouteLane({
  route,
  index,
}: {
  route: (typeof ROUTES)[number];
  index: number;
}) {
  const { ref, on } = useInViewOnce<HTMLAnchorElement>();
  const flip = index % 2 === 1;

  return (
    <Link
      ref={ref}
      href={route.href}
      className={`it-pack__route${flip ? ' it-pack__route--flip' : ''}${on ? ' is-in' : ''}`}
      style={{ transitionDelay: on ? `${(index % 3) * 70}ms` : '0ms' }}
    >
      <div className="it-pack__route-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={route.img} alt="" loading="lazy" />
      </div>
      <div className="it-pack__route-body">
        <div className="it-pack__route-meta">
          <span className="it-pack__route-index">0{index + 1}</span>
          <span className="it-pack__route-pill">{route.pill}</span>
        </div>
        <h3 className="it-pack__route-title">{route.title}</h3>
        <p className="it-pack__route-desc">{route.desc}</p>
        <span className="it-pack__route-cta">
          {route.cta}
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
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
            Not gear — people and journeys. Meet the crew who built Indian Treks, then walk through
            the routes we pack for every kind of mountain traveler.
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

        <div className="it-pack__chapter">
          <span className="it-pack__chapter-num">02</span>
          <p className="it-pack__chapter-label">What&apos;s packed</p>
        </div>

        <div className="it-pack__routes" aria-label="Packed journeys">
          {ROUTES.map((route, i) => (
            <RouteLane key={route.id} route={route} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
