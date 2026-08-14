'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export type CategoryItem = {
  n: string;
  h: string;
  img: string;
};

/** px/sec — continuous category crawl */
const SPEED = 32;
const RESUME_MS = 2800;

function CatAvatar({ src, label }: { src: string; label: string }) {
  const [broken, setBroken] = useState(false);
  const initials = label
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

  return (
    <span
      className="block rounded-full p-[2.5px]"
      style={{
        background: 'linear-gradient(145deg, #16a34a 0%, #4ade80 55%, #86efac 100%)',
        boxShadow: '0 2px 10px rgba(22,163,74,0.28)',
      }}
    >
      <span className="relative block overflow-hidden rounded-full bg-white p-[2px]">
        {broken ? (
          <span className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gradient-to-br from-[#166534] to-[#16a34a] text-[13px] font-bold tracking-wide text-white">
            {initials}
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            width={68}
            height={68}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            draggable={false}
            onError={() => setBroken(true)}
            className="pointer-events-none block h-[68px] w-[68px] rounded-full bg-[#dcfce7] object-cover"
          />
        )}
      </span>
    </span>
  );
}

/**
 * JustWravel-style category row:
 * continuous auto-crawl + finger/mouse scroll + seamless infinite loop.
 */
export default function CategoryScroller({ items }: { items: CategoryItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const lastTs = useRef(0);
  const paused = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const moved = useRef(false);

  const loopItems = [...items, ...items];

  const pause = () => {
    paused.current = true;
    lastTs.current = 0;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      normalizeLoop();
      paused.current = false;
      lastTs.current = 0;
    }, RESUME_MS);
  };

  const normalizeLoop = () => {
    const el = trackRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    if (el.scrollLeft < 0) el.scrollLeft += half;
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el || items.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tick = (ts: number) => {
      if (!lastTs.current) lastTs.current = ts;
      const dt = Math.min(ts - lastTs.current, 48);
      lastTs.current = ts;

      if (!paused.current && !drag.current) {
        el.scrollLeft += (SPEED * dt) / 1000;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onTouchStart = () => pause();
    const onWheel = () => pause();

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('wheel', onWheel);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [items.length]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const el = trackRef.current;
    if (!el) return;
    pause();
    moved.current = false;
    drag.current = { x: e.clientX, left: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = trackRef.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) moved.current = true;
    el.scrollLeft = d.left - dx;
    normalizeLoop();
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    drag.current = null;
    const el = trackRef.current;
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    normalizeLoop();
  };

  return (
    <div className="-mx-4 mt-4">
      <div
        ref={trackRef}
        role="list"
        aria-label="Browse destinations"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="flex cursor-grab gap-3.5 overflow-x-auto overflow-y-hidden overscroll-x-contain px-4 pb-1 select-none active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
      >
        {loopItems.map((item, i) => (
          <Link
            key={`${item.n}-${i}`}
            href={item.h}
            role="listitem"
            tabIndex={i >= items.length ? -1 : 0}
            aria-hidden={i >= items.length}
            draggable={false}
            onDragStart={e => e.preventDefault()}
            onClick={e => {
              if (moved.current) {
                e.preventDefault();
                moved.current = false;
              }
            }}
            className="flex w-[76px] shrink-0 flex-col items-center"
          >
            <CatAvatar src={item.img} label={item.n} />
            <span className="mt-1.5 h-8 w-full text-center text-[10px] font-semibold leading-tight text-gray-900 line-clamp-2">
              {item.n}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
