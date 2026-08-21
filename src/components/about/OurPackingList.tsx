'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { photos } from '@/lib/media';
import PackedJourneysMemories from './PackedJourneysMemories';
import './our-packing-list.css';

/**
 * Our Packing List — journey categories.
 * Center card grows large; side cards stay smaller (all breakpoints).
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
  const railRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [centerId, setCenterId] = useState(PACKED[0]?.id ?? '');
  const raf = useRef(0);

  const syncCenter = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const mid = rail.scrollLeft + rail.clientWidth / 2;
    let bestId = PACKED[0]?.id ?? '';
    let bestDist = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const cardMid = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(cardMid - mid);
      if (dist < bestDist) {
        bestDist = dist;
        bestId = PACKED[i]?.id ?? bestId;
      }
    });

    setCenterId((prev) => (prev === bestId ? prev : bestId));
  }, []);

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

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(syncCenter);
    };

    // Center first card on load so one box starts big
    requestAnimationFrame(() => {
      const first = cardRefs.current[0];
      if (first) {
        const left = first.offsetLeft - (rail.clientWidth - first.offsetWidth) / 2;
        rail.scrollLeft = Math.max(0, left);
      }
      syncCenter();
    });

    rail.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf.current);
      rail.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [syncCenter]);

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
            Swipe to browse — the center card grows. Tap to open that journey.
          </p>
        </header>
      </div>

      <div className="it-pack__cats" aria-label="Packed journey categories">
        <div
          ref={railRef}
          className="it-pack__cats-rail"
          onPointerDown={swipeSafe.onPointerDown}
          onPointerMove={swipeSafe.onPointerMove}
          onPointerUp={swipeSafe.onPointerUp}
          onPointerCancel={swipeSafe.onPointerUp}
          onClickCapture={swipeSafe.onClickCapture}
        >
          {PACKED.map((item, i) => {
            const isCenter = item.id === centerId;
            return (
              <Link
                key={item.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                href={item.href}
                className={`it-pack__cat it-pack__cat--${item.tone}${isCenter ? ' is-center' : ''}`}
                style={{ '--i': i } as React.CSSProperties}
                draggable={false}
                aria-current={isCenter ? 'true' : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt="" loading="lazy" draggable={false} />
                <span className="it-pack__cat-shine" aria-hidden />
                <span className="it-pack__cat-label">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <PackedJourneysMemories />
    </section>
  );
}
