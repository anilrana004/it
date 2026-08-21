'use client';

import Link from 'next/link';
import { useEffect, useId, useRef } from 'react';
import { photos } from '@/lib/media';
import PackedJourneysMemories from './PackedJourneysMemories';
import './our-packing-list.css';

/**
 * Our Packing List — journey categories.
 * Vertical page scroll must keep working; horizontal swipe only when intentional.
 */

const PACKED = [
  {
    id: 'treks',
    label: 'Himalayan Treks',
    href: '/treks',
    img: photos.kedarkantha,
    tone: 'green' as const,
  },
  {
    id: 'snow',
    label: 'Snow Trails',
    href: '/treks',
    img: photos.snow,
    tone: 'ink' as const,
  },
  {
    id: 'yatra',
    label: 'Sacred Yatras',
    href: '/yatra',
    img: photos.yatra,
    tone: 'green' as const,
  },
  {
    id: 'flowers',
    label: 'Valley of Flowers',
    href: '/treks/valley-of-flowers',
    img: photos.vof,
    tone: 'ink' as const,
  },
  {
    id: 'nepal',
    label: 'Nepal & Abroad',
    href: '/international-getaways',
    img: photos.ebc,
    tone: 'green' as const,
  },
  {
    id: 'custom',
    label: 'Custom Trips',
    href: '/customized',
    img: photos.chopta,
    tone: 'ink' as const,
  },
  {
    id: 'corporate',
    label: 'Corporate',
    href: '/corporate',
    img: photos.hampta,
    tone: 'green' as const,
  },
  {
    id: 'trending',
    label: 'Trending',
    href: '/trending',
    img: photos.triund,
    tone: 'ink' as const,
  },
] as const;

/** Ignore click after a horizontal drag (swipe), allow real taps. */
function useSwipeSafeClick(threshold = 12) {
  const origin = useRef<{ x: number; y: number } | null>(null);
  const moved = useRef(false);

  return {
    onPointerDown: (e: React.PointerEvent) => {
      origin.current = { x: e.clientX, y: e.clientY };
      moved.current = false;
    },
    onPointerMove: (e: React.PointerEvent) => {
      if (!origin.current) return;
      const dx = Math.abs(e.clientX - origin.current.x);
      const dy = Math.abs(e.clientY - origin.current.y);
      // Only treat as swipe-drag when mostly horizontal
      if (dx > threshold && dx > dy * 1.2) moved.current = true;
    },
    onPointerUp: () => {
      origin.current = null;
    },
    onClickCapture: (e: React.MouseEvent) => {
      if (moved.current) {
        e.preventDefault();
        e.stopPropagation();
        moved.current = false;
      }
    },
  };
}

export default function OurPackingList() {
  const titleId = useId();
  const swipeSafe = useSwipeSafeClick();
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('is-revealed');
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          root.classList.add('is-revealed');
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="packing-list"
      className="it-pack scroll-mt-24 sm:scroll-mt-28"
      aria-labelledby={titleId}
    >
      <div className="it-pack__wrap">
        <header className="it-pack__intro">
          <p className="it-pack__eyebrow">Not gear — journeys</p>
          <h2 id={titleId} className="it-pack__title">
            Our Packing List <em>!!</em>
          </h2>
          <p className="it-pack__lead">
            Everything we pack into an Indian Treks departure. Swipe sideways for more cards — scroll
            the page normally to keep moving through About.
          </p>
        </header>
      </div>

      <div className="it-pack__cats" aria-label="Packed journey categories">
        <div
          className="it-pack__cats-rail"
          onPointerDown={swipeSafe.onPointerDown}
          onPointerMove={swipeSafe.onPointerMove}
          onPointerUp={swipeSafe.onPointerUp}
          onPointerCancel={swipeSafe.onPointerUp}
          onClickCapture={swipeSafe.onClickCapture}
        >
          {PACKED.map((item, i) => (
            <Link
              key={item.id}
              href={item.href}
              className={`it-pack__cat it-pack__cat--${item.tone}`}
              style={{ '--i': i } as React.CSSProperties}
              draggable={false}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.img} alt="" loading="lazy" draggable={false} />
              <span className="it-pack__cat-shine" aria-hidden />
              <span className="it-pack__cat-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <PackedJourneysMemories />
    </section>
  );
}
