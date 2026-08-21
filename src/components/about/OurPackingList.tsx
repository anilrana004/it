'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { photos } from '@/lib/media';
import './our-packing-list.css';

/**
 * “Our Packing List !!” — full UI redesign.
 * Cinematic founder spotlights + premium auto-scrolling category rail.
 */

const FOUNDERS = [
  {
    id: 'vijay',
    name: 'Mr Vijay Singh Rana',
    role: 'Founder, Indiantreks',
    image: 'https://indiantreks.in/wp-content/uploads/2023/02/Vijay-Singh-Rana-Indian-Treks.jpg',
    quote:
      'Long before Indian Treks was established, I had already been working on the ground in trekking and mountaineering since 2005. With over two decades of hands-on Himalayan experience across Uttarakhand, Himachal Pradesh, and Ladakh, I prioritized quality of work, safety, and real mountain experience over numbers alone. Born and raised in a remote Himalayan village, that connection shaped Indian Treks into an organization that is vocal for locals and deeply committed to sustainable tourism.',
  },
  {
    id: 'vivek',
    name: 'Mr Vivek Rana',
    role: 'CEO, Indiantreks',
    image:
      'https://indiantreks.in/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-02-at-1.52.36-PM-1024x983.jpeg',
    quote:
      'Hailing from the remote Osla village in the western Garhwal Himalayas, I bring over 15 years of experience as a mountain guide and now serve as CEO of Indiantreks. From Kalindi Khal, Bali Pass, Borasu Pass, and Rupin Pass to Valley of Flowers and Kedarkantha — my focus has always been safe, well-planned journeys. Today we welcome 20,000+ trekkers every year across 200+ routes.',
  },
] as const;

const CATEGORIES = [
  { label: 'Himalayan Treks', href: '/treks', img: photos.kedarkantha },
  { label: 'Sacred Yatras', href: '/yatra', img: photos.yatra },
  { label: 'Snow Treks', href: '/treks', img: photos.snow },
  { label: 'Valley of Flowers', href: '/treks/valley-of-flowers', img: photos.vof },
  { label: 'Weekend Getaways', href: '/treks?difficulty=easy', img: photos.triund },
  { label: 'International', href: '/international-getaways', img: photos.ebc },
  { label: 'Nepal Circuits', href: '/treks?region=nepal', img: photos.nepal },
  { label: 'Himachal Trails', href: '/treks?region=himachal', img: photos.himachal },
  { label: 'Uttarakhand', href: '/treks?region=uttarakhand', img: photos.uttarakhand },
  { label: 'Customized Trips', href: '/customized', img: photos.hampta },
  { label: 'Group Trips', href: '/group-trips', img: photos.chopta },
  { label: 'Corporate', href: '/corporate', img: photos.kedarnath },
] as const;

function FounderCard({
  founder,
  index,
}: {
  founder: (typeof FOUNDERS)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`it-pack__founder${inView ? ' is-in' : ''}${open ? ' is-open' : ''}`}
      style={{ transitionDelay: inView ? `${index * 100}ms` : '0ms' }}
    >
      <div className="it-pack__founder-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={founder.image} alt={founder.name} referrerPolicy="no-referrer" />
      </div>
      <div className="it-pack__founder-shade" aria-hidden />
      <div className="it-pack__founder-body">
        <p className="it-pack__founder-role">{founder.role}</p>
        <h3 className="it-pack__founder-name">{founder.name}</h3>
        <p className="it-pack__founder-quote">{founder.quote}</p>
        <button
          type="button"
          className="it-pack__founder-more"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Show less' : 'Read full note'}
          <span aria-hidden>{open ? '↑' : '↓'}</span>
        </button>
      </div>
    </article>
  );
}

function CategoryRail() {
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let last = 0;
    const speed = 34;

    const tick = (ts: number) => {
      if (!last) last = ts;
      const dt = Math.min(ts - last, 48);
      last = ts;
      if (!paused.current) {
        el.scrollLeft += (speed * dt) / 1000;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half - 1) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const pause = () => {
      paused.current = true;
    };
    const resume = () => {
      paused.current = false;
      last = 0;
    };

    el.addEventListener('pointerdown', pause);
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerdown', pause);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
    };
  }, []);

  const loop = [...CATEGORIES, ...CATEGORIES];

  return (
    <div className="it-pack__rail-wrap">
      <div className="it-pack__rail-head">
        <h3 className="it-pack__rail-title">Packed for every kind of journey</h3>
        <p className="it-pack__rail-note">Swipe or pause on hover</p>
      </div>

      <div
        ref={trackRef}
        className="it-pack__rail"
        aria-label="Trip categories"
      >
        {loop.map((c, i) => (
          <Link
            key={`${c.label}-${i}`}
            href={c.href}
            className={`it-pack__card${i % 2 ? ' it-pack__card--alt' : ''}`}
            tabIndex={i >= CATEGORIES.length ? -1 : 0}
            aria-hidden={i >= CATEGORIES.length}
          >
            <div className="it-pack__card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt="" loading="lazy" />
              <div className="it-pack__card-shade" aria-hidden />
              <span className="it-pack__card-label">{c.label}</span>
            </div>
          </Link>
        ))}
      </div>
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
      <div className="it-pack__inner">
        <header className="it-pack__head">
          <p className="it-pack__eyebrow">Leadership & Experiences</p>
          <h2 id="packing-list-heading" className="it-pack__title">
            Our Packing List <em>!!</em>
          </h2>
          <p className="it-pack__lead">
            The people who built Indian Treks — and the journeys we pack for every kind of
            Himalayan traveler.
          </p>
        </header>

        <div className="it-pack__founders">
          {FOUNDERS.map((f, i) => (
            <FounderCard key={f.id} founder={f} index={i} />
          ))}
        </div>
      </div>

      <CategoryRail />
    </section>
  );
}
