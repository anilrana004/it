'use client';

import Link from 'next/link';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { photos } from '@/lib/media';
import './our-packing-list.css';

/**
 * Our Packing List:
 * 01 Meet the crew
 * 02 What's packed — light beams from one hub to many clickable journeys
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

const BEAMS = [
  { id: 'treks', label: 'Himalayan Treks', href: '/treks', img: photos.kedarkantha },
  { id: 'snow', label: 'Snow Trails', href: '/treks', img: photos.snow },
  { id: 'yatra', label: 'Sacred Yatras', href: '/yatra', img: photos.yatra },
  { id: 'flowers', label: 'Valley of Flowers', href: '/treks/valley-of-flowers', img: photos.vof },
  { id: 'nepal', label: 'Nepal & Abroad', href: '/international-getaways', img: photos.ebc },
  { id: 'custom', label: 'Custom Trips', href: '/customized', img: photos.chopta },
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
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
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

function BeamMap() {
  const uid = useId().replace(/:/g, '');
  const { ref, on } = useInViewOnce<HTMLDivElement>();
  const [active, setActive] = useState<string | null>(null);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 759px)');
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener?.('change', sync);
    return () => mq.removeEventListener?.('change', sync);
  }, []);

  const nodes = useMemo(() => {
    const n = BEAMS.length;
    // Mobile: fan downward from hub (readable + tappable)
    // Desktop: full radial burst
    return BEAMS.map((item, i) => {
      if (narrow) {
        const cols = 2;
        const col = i % cols;
        const row = Math.floor(i / cols);
        const rows = Math.ceil(n / cols);
        const x = 18 + col * 64;
        const y = 28 + (row / Math.max(rows - 1, 1)) * 62;
        return { ...item, x, y };
      }
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const radius = 38;
      return {
        ...item,
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius,
      };
    });
  }, [narrow]);

  const hub = narrow ? { x: 50, y: 10 } : { x: 50, y: 50 };

  return (
    <div
      ref={ref}
      className={`it-pack__beam${on ? ' is-in' : ''}${narrow ? ' is-mobile' : ''}`}
      aria-label="Journeys packed from Indian Treks"
    >
      <svg className="it-pack__beam-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <defs>
          <radialGradient id={`hub-glow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#86efac" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#16a34a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
          </radialGradient>
          {nodes.map((node) => (
            <linearGradient
              key={`g-${node.id}`}
              id={`beam-${uid}-${node.id}`}
              x1={`${hub.x}%`}
              y1={`${hub.y}%`}
              x2={`${node.x}%`}
              y2={`${node.y}%`}
            >
              <stop offset="0%" stopColor="#86efac" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#4ade80" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0.05" />
            </linearGradient>
          ))}
          <filter id={`soft-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>

        <circle cx={hub.x} cy={hub.y} r={narrow ? 14 : 18} fill={`url(#hub-glow-${uid})`} />

        {nodes.map((node) => {
          const lit = active === node.id || active === null;
          return (
            <g key={node.id}>
              <line
                className={`it-pack__beam-ray${active === node.id ? ' is-hot' : ''}${
                  active && active !== node.id ? ' is-dim' : ''
                }`}
                x1={hub.x}
                y1={hub.y}
                x2={node.x}
                y2={node.y}
                stroke={`url(#beam-${uid}-${node.id})`}
                strokeWidth={active === node.id ? 1.35 : 0.7}
                strokeLinecap="round"
                opacity={lit ? 1 : 0.25}
                filter={`url(#soft-${uid})`}
              />
              <line
                className="it-pack__beam-core"
                x1={hub.x}
                y1={hub.y}
                x2={node.x}
                y2={node.y}
                stroke="#bbf7d0"
                strokeWidth={active === node.id ? 0.35 : 0.18}
                strokeLinecap="round"
                opacity={active === node.id ? 0.95 : 0.45}
              />
            </g>
          );
        })}

        <circle cx={hub.x} cy={hub.y} r={narrow ? 3.2 : 4.2} fill="#ecfdf5" />
        <circle cx={hub.x} cy={hub.y} r={narrow ? 1.6 : 2.1} fill="#16a34a" />
      </svg>

      <div className="it-pack__beam-hub" style={{ left: `${hub.x}%`, top: `${hub.y}%` }}>
        <span className="it-pack__beam-hub-label">Indian Treks</span>
        <span className="it-pack__beam-hub-sub">One source</span>
      </div>

      {nodes.map((node) => (
        <Link
          key={node.id}
          href={node.href}
          className={`it-pack__beam-node${active === node.id ? ' is-hot' : ''}`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          onMouseEnter={() => setActive(node.id)}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive(node.id)}
          onBlur={() => setActive(null)}
          onTouchStart={() => setActive(node.id)}
        >
          <span className="it-pack__beam-node-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={node.img} alt="" loading="lazy" />
          </span>
          <span className="it-pack__beam-node-label">{node.label}</span>
        </Link>
      ))}
    </div>
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
            Not gear — people and journeys. Meet the crew, then follow the light from one source to
            every kind of Himalayan trip.
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
        <p className="it-pack__beam-hint">
          One light. Many journeys. Tap a destination to open it.
        </p>

        <BeamMap />
      </div>
    </section>
  );
}
