'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Star, Clock, MapPin } from 'lucide-react';

const regions = ['Uttarakhand', 'Himachal', 'International'];

const data: Record<string, { title: string; loc: string; dur: string; price: number; origPrice: number; rating: string; rev: string; img: string; href: string; badge?: string }[]> = {
  'Uttarakhand': [
    { title: 'Rishikesh - River Rafting & Yoga Retreat', loc: 'Rishikesh', dur: '4D/3N', price: 4999, origPrice: 6999, rating: '4.7', rev: '10k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks', badge: 'Popular' },
    { title: 'Auli - Skiing & Snow Adventure', loc: 'Auli', dur: '5D/4N', price: 8999, origPrice: 11999, rating: '4.8', rev: '6k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks', badge: 'Winter' },
    { title: 'Munsiyari - Panoramic Himalayan Views', loc: 'Munsiyari', dur: '4D/3N', price: 6999, origPrice: 8999, rating: '4.7', rev: '5k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks', badge: '' },
    { title: 'Jim Corbett - Wildlife Safari', loc: 'Jim Corbett', dur: '3D/2N', price: 5999, origPrice: 7999, rating: '4.6', rev: '8k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks', badge: 'Safari' },
    { title: 'Jageshwar Nainital - Temple Trails', loc: 'Nainital', dur: '3D/2N', price: 3999, origPrice: 5499, rating: '4.5', rev: '6k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks', badge: '' },
    { title: 'Chakrata - Offbeat Weekend Escape', loc: 'Chakrata', dur: '3D/2N', price: 4499, origPrice: 5999, rating: '4.6', rev: '4k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks', badge: 'Offbeat' },
  ],
  'Himachal': [
    { title: 'Manali - Adventures in the Mountains', loc: 'Manali', dur: '4D/3N', price: 5999, origPrice: 7999, rating: '4.7', rev: '12k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/hampta-pass', badge: 'Popular' },
    { title: 'Kasol - Parvati Valley Backpacking', loc: 'Kasol', dur: '4D/3N', price: 4999, origPrice: 6999, rating: '4.6', rev: '8k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/kheerganga', badge: '' },
    { title: 'Dharamshala McLeod Ganj - Tibetan Culture', loc: 'Dharamshala', dur: '4D/3N', price: 5499, origPrice: 7499, rating: '4.7', rev: '8k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/mcleodganj-trek', badge: '' },
    { title: 'Bir Billing - Paragliding Capital', loc: 'Bir', dur: '3D/2N', price: 3999, origPrice: 5499, rating: '4.8', rev: '10k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks', badge: 'Adventure' },
    { title: 'Shimla - Queen of Hills', loc: 'Shimla', dur: '3D/2N', price: 4499, origPrice: 5999, rating: '4.5', rev: '10k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks', badge: '' },
    { title: 'Spiti Valley - Summer Expedition', loc: 'Spiti', dur: '8D/7N', price: 15999, origPrice: 19999, rating: '4.8', rev: '6k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/hampta-pass', badge: 'Expedition' },
  ],
  'International': [
    { title: 'Kathmandu Valley Tour', loc: 'Kathmandu', dur: '5D/4N', price: 18999, origPrice: 23999, rating: '4.7', rev: '8k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/kathmandu-tour', badge: 'Cultural' },
    { title: 'Pokhara - Lakeside Paradise', loc: 'Pokhara', dur: '4D/3N', price: 15999, origPrice: 19999, rating: '4.8', rev: '6k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/pokhara-tour', badge: '' },
    { title: 'Chitwan - Jungle Safari', loc: 'Chitwan', dur: '4D/3N', price: 21999, origPrice: 27999, rating: '4.7', rev: '5k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/chitwan-safari', badge: 'Wildlife' },
    { title: 'Nepal Backpacking Circuit', loc: 'Kathmandu', dur: '10D/9N', price: 34999, origPrice: 42999, rating: '4.8', rev: '6k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/nepal-backpacking', badge: 'Best Value' },
  ],
};

export default function Backpacking() {
  const [region, setRegion] = useState('International');
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const items = data[region] || [];

  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  }, [region]);

  // Auto-scroll one card at a time; pause on user interaction (same as Upcoming Trips)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || items.length < 2) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const pause = () => {
      pausedRef.current = true;
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(() => { pausedRef.current = false; }, 4000);
    };
    const freeze = () => { pausedRef.current = true; };
    const unfreeze = () => { pausedRef.current = false; };

    el.addEventListener('pointerdown', pause, { passive: true });
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('wheel', pause, { passive: true });
    el.addEventListener('mouseenter', freeze);
    el.addEventListener('mouseleave', unfreeze);

    const tick = () => {
      if (pausedRef.current || !el) return;
      const card = el.querySelector<HTMLElement>(':scope > a');
      if (!card) return;
      const styles = getComputedStyle(el);
      const gap = parseFloat(styles.columnGap || styles.gap) || 12;
      const step = card.offsetWidth + gap;
      const max = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= max - 4) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    };

    const id = window.setInterval(tick, 3200);
    return () => {
      window.clearInterval(id);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      el.removeEventListener('pointerdown', pause);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('wheel', pause);
      el.removeEventListener('mouseenter', freeze);
      el.removeEventListener('mouseleave', unfreeze);
    };
  }, [items.length, region]);

  return (
    <section className="py-8 lg:py-16 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 lg:mb-8 px-4 lg:px-0">
          <div>
            <p className="text-[#16a34a] font-semibold text-xs lg:text-sm tracking-widest uppercase mb-1">BACKPACKING</p>
            <h2 className="text-xl lg:text-3xl font-bold text-[#000000]">Backpacking Destinations</h2>
          </div>
          <Link href="/treks" className="text-[#16a34a] text-sm font-semibold hover:text-[#15803d] whitespace-nowrap">View All Backpacking &rarr;</Link>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 px-4 lg:px-0 mb-6" style={{ scrollbarWidth: 'none' }}>
          {regions.map(r => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={`shrink-0 px-5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all ${
                region === r
                  ? 'bg-[#000000] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Horizontal auto-scrolling snap carousel - same as Upcoming Trips */}
        <div
          ref={scrollerRef}
          className="flex gap-3 lg:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-1 px-4 lg:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          aria-label="Backpacking destinations carousel"
        >
          {items.map(t => (
            <Link
              key={t.title}
              href={t.href}
              className="group relative aspect-[3/4] w-[72vw] max-w-[260px] sm:w-[240px] lg:w-[260px] shrink-0 snap-start rounded-xl overflow-hidden"
            >
              <img
                src={t.img}
                alt={t.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {t.badge && (
                <span className="absolute top-3 left-3 bg-[#16a34a] text-white text-[10px] lg:text-xs font-bold px-2 py-1 rounded-md uppercase">
                  {t.badge}
                </span>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
                <div className="flex items-center gap-1 text-white/80 text-xs font-medium mb-1">
                  <MapPin className="w-3 h-3 text-[#16a34a] shrink-0" />
                  <span className="truncate">{t.loc}</span>
                </div>
                <h3 className="font-semibold text-sm lg:text-base text-white group-hover:text-[#16a34a] transition-colors line-clamp-2 mb-1">
                  {t.title}
                </h3>
                <div className="flex items-center gap-2 text-[11px] lg:text-xs text-white/60 mb-2">
                  <Clock className="w-3 h-3 text-[#16a34a]" />
                  {t.dur}
                  <span className="text-white/20">|</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {t.rating} ({t.rev})
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#16a34a] font-bold text-sm lg:text-base">₹{t.price.toLocaleString()}</span>
                  {t.origPrice > 0 && (
                    <span className="text-white/50 text-xs line-through">₹{t.origPrice.toLocaleString()}</span>
                  )}
                  {t.origPrice > t.price && (
                    <span className="ml-auto bg-green-500/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {Math.round((1 - t.price / t.origPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
                <span className="inline-block mt-1.5 text-[10px] text-blue-300 font-semibold bg-blue-900/40 backdrop-blur-sm px-2 py-0.5 rounded">
                  Book Now, Pay Later
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
