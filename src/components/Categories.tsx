'use client';
import { useRef, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  { n: 'Bucket List', h: '/bucket-list-sale', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_80,w_300,h_300,c_fill,g_auto/' },
  { n: 'Long Weekend', h: '/treks?difficulty=easy', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_80,w_300,h_300,c_fill,g_auto/' },
  { n: 'International', h: '/treks?region=nepal', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_80,w_300,h_300,c_fill,g_auto/' },
  { n: 'Ladakh', h: '/treks?region=ladakh', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_80,w_300,h_300,c_fill,g_auto/' },
  { n: 'Spiti', h: '/treks?region=himachal', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_80,w_300,h_300,c_fill,g_auto/' },
  { n: 'Treks', h: '/treks', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_80,w_300,h_300,c_fill,g_auto/' },
  { n: 'New Launches', h: '/treks', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_80,w_300,h_300,c_fill,g_auto/' },
  { n: 'India', h: '/treks', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_80,w_300,h_300,c_fill,g_auto/' },
  { n: 'Honeymoon', h: '/treks', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_80,w_300,h_300,c_fill,g_auto/' },
  { n: 'Zanskar', h: '/treks/bali-pass', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_80,w_300,h_300,c_fill,g_auto/' },
  { n: 'Biking', h: '/treks', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_80,w_300,h_300,c_fill,g_auto/' },
  { n: 'All Girls', h: '/treks', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_80,w_300,h_300,c_fill,g_auto/' },
];

export default function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const hasMoved = useRef(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    const onScroll = () => checkScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scrollBy = useCallback((dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const itemW = 72 + 16;
    el.scrollBy({ left: dir * itemW * 3, behavior: 'smooth' });
  }, []);

  const onPointerDown = useCallback((clientX: number) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    hasMoved.current = false;
    startX.current = clientX;
    scrollLeftPos.current = el.scrollLeft;
  }, []);

  const onPointerMove = useCallback((clientX: number) => {
    if (!isDragging || !scrollRef.current) return;
    const dx = clientX - startX.current;
    if (Math.abs(dx) > 5) hasMoved.current = true;
    scrollRef.current.scrollLeft = scrollLeftPos.current - dx;
  }, [isDragging]);

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const delta = e.deltaX || e.deltaY;
      el.scrollLeft += delta;
      e.preventDefault();
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <section className="py-4 lg:py-8 bg-white select-none relative">
      <div className="container mx-auto px-4 relative">
        <div className="relative group/carousel">
          {canScrollLeft && (
            <button type="button" onClick={() => scrollBy(-1)}
              className="hidden lg:flex absolute left-0 top-[30px] z-10 w-9 h-9 items-center justify-center rounded-full bg-white shadow-lg border border-gray-100 text-gray-600 hover:text-[#16a34a] hover:shadow-xl transition-all -translate-x-4 opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canScrollRight && (
            <button type="button" onClick={() => scrollBy(1)}
              className="hidden lg:flex absolute right-0 top-[30px] z-10 w-9 h-9 items-center justify-center rounded-full bg-white shadow-lg border border-gray-100 text-gray-600 hover:text-[#16a34a] hover:shadow-xl transition-all translate-x-4 opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0">
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
          <div ref={scrollRef}
            onMouseDown={e => onPointerDown(e.clientX)}
            onMouseMove={e => onPointerMove(e.clientX)}
            onMouseUp={onPointerUp}
            onMouseLeave={onPointerUp}
            onTouchStart={e => onPointerDown(e.touches[0].clientX)}
            onTouchMove={e => onPointerMove(e.touches[0].clientX)}
            onTouchEnd={onPointerUp}
            className="flex gap-4 lg:gap-6 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map(c => (
              <Link key={c.n} href={c.h}
                onClick={e => { if (hasMoved.current) e.preventDefault(); }}
                className="flex flex-col items-center gap-2 snap-start shrink-0 w-[72px] lg:w-[92px]">
                <div className="w-[72px] h-[72px] lg:w-[92px] lg:h-[92px] rounded-full p-[3px] bg-gradient-to-br from-[#16a34a] via-[#22c55e] to-[#14532d] hover:scale-105 transition-transform duration-200">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                    <img src={c.img} alt={c.n} className="w-full h-full object-cover" />
                  </div>
                </div>
                <span className="text-[11px] lg:text-xs text-gray-700 font-semibold text-center leading-tight max-w-[72px] lg:max-w-[92px]">
                  {c.n}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
