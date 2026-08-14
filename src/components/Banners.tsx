'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Tag } from 'lucide-react';
import { photos } from '@/lib/media';

interface BannerItem {
  src: string;
  href: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  discount?: string;
  desktopSrc?: string;
}

const defaultBanners: BannerItem[] = [
  { src: photos.vof, href: '/treks/valley-of-flowers', title: 'Valley of Flowers Trek', subtitle: 'UNESCO Himalayan Paradise - 6D/5N', badge: 'Best Seller', discount: '₹8,999' },
  { src: photos.kedarkantha, href: '/treks/kedarkantha', title: 'Kedarkantha Winter Trek', subtitle: "India's #1 winter trek - 5D/4N", badge: 'Winter Special', discount: '₹6,999' },
  { src: photos.hampta, href: '/treks/hampta-pass', title: 'Hampta Pass - Valley Crossing', subtitle: 'Lush Kullu meets barren Spiti - 5D/4N', badge: 'Adventure', discount: '₹8,499' },
  { src: photos.ebc, href: '/treks/everest-base-camp', title: 'Everest Base Camp', subtitle: 'The trek of a lifetime - 13D/12N', badge: 'Bucket List', discount: '₹74,999' },
  { src: photos.yatra, href: '/yatra/kedarnath-yatra', title: 'Kedarnath Yatra', subtitle: 'Sacred pilgrimage - 6D/5N', badge: 'Yatra', discount: '₹9,999' },
];

function SlideImage({ src, desktopSrc, alt }: { src: string; desktopSrc?: string; alt: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover lg:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={desktopSrc || src}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="absolute inset-0 hidden h-full w-full object-cover lg:block"
      />
    </>
  );
}

export default function Banners({
  items = defaultBanners,
  embedded = false,
}: {
  items?: BannerItem[];
  /** When true, sits inside another page section without outer white band */
  embedded?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const count = items.length;
  const touchX = useRef(0);
  const swiped = useRef(false);

  const goTo = useCallback((i: number) => {
    setIndex(((i % count) + count) % count);
  }, [count]);

  useEffect(() => {
    if (count < 2) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setIndex(i => (i + 1) % count);
    }, 4000);

    return () => window.clearInterval(id);
  }, [count]);

  const pause = () => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { pausedRef.current = false; }, 5000);
  };

  if (!count) return null;

  const slider = (
    <div
      className="relative w-full overflow-hidden rounded-[18px] bg-[#1f2937] shadow-sm"
      onPointerDown={pause}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onTouchStart={e => { touchX.current = e.touches[0].clientX; pause(); }}
      onTouchEnd={e => {
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) < 40) return;
        swiped.current = true;
        if (dx < 0) goTo(index + 1);
        else goTo(index - 1);
      }}
    >
      <div className={`relative w-full ${embedded ? 'h-[140px]' : 'h-[132px] sm:h-[150px] lg:h-[180px]'}`}>
        {items.map((b, i) => {
          const active = i === index;
          return (
            <Link
              key={`${b.href}-${i}`}
              href={b.href}
              aria-hidden={!active}
              tabIndex={active ? 0 : -1}
              onClick={e => {
                if (swiped.current) {
                  e.preventDefault();
                  swiped.current = false;
                }
              }}
              className={`absolute inset-0 block transition-opacity duration-700 ease-out ${
                active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <SlideImage src={b.src} desktopSrc={b.desktopSrc} alt={b.title || 'Promo'} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/42 to-black/15" />

              {b.badge && (
                <div className="absolute top-2.5 left-2.5 lg:top-4 lg:left-4 flex items-center gap-1 bg-[#16a34a]/95 text-white text-[10px] lg:text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                  <Tag className="w-3 h-3" />
                  {b.badge}
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-5 max-w-2xl">
                {b.title && (
                  <h3 className="text-white font-bold text-sm sm:text-base lg:text-xl drop-shadow-sm leading-tight">
                    {b.title}
                  </h3>
                )}
                {b.subtitle && (
                  <p className="text-white/85 text-[10px] sm:text-xs lg:text-sm mt-0.5 leading-relaxed line-clamp-1 sm:line-clamp-2">
                    {b.subtitle}
                  </p>
                )}
                <div className="flex items-center gap-1.5 mt-1.5 lg:mt-2">
                  <span className="text-[#4ade80] text-[11px] lg:text-xs font-semibold">
                    {b.discount}
                  </span>
                  <ArrowRight className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-white/70" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {count > 1 && (
        <div className="absolute bottom-2.5 right-2.5 lg:bottom-3.5 lg:right-3.5 z-20 flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show banner ${i + 1}`}
              onClick={() => { pause(); goTo(i); }}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'bg-[#16a34a] w-5' : 'bg-white/55 w-1.5 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );

  if (embedded) {
    return <div className="w-full">{slider}</div>;
  }

  return (
    <section className="py-4 lg:py-6 bg-white">
      <div className="container mx-auto">
        {slider}
      </div>
    </section>
  );
}
