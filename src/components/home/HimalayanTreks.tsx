'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Star, Clock, MapPin } from 'lucide-react';

const seasons = ['Uttarakhand Treks', 'Himachal Treks', 'Yatras'];

const all: Record<string, { title: string; loc: string; dur: string; price: number; origPrice: number; rating: string; rev: string; type: string; img: string; href: string }[]> = {
  'Uttarakhand Treks': [
    { title: 'Valley of Flowers Trek', loc: 'Joshimath ? Rishikesh', dur: '6D/5N', price: 8999, origPrice: 11999, rating: '4.8', rev: '8k+', type: 'Easy', img: 'https://res.cloudinary.com/pg8uhzw0/image/upload/f_auto,q_auto,w_420,h_280,c_fill,g_auto/v1785367489/pexels-unaizat97-8673607_anl07u.jpg', href: '/treks/valley-of-flowers' },
    { title: 'Kedarkantha Trek', loc: 'Sankri ? Dehradun', dur: '5D/4N', price: 6999, origPrice: 8999, rating: '4.9', rev: '10k+', type: 'Easy to Moderate', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/kedarkantha' },
    { title: 'Chopta Tungnath Trek', loc: 'Rishikesh ? Rishikesh', dur: '4D/3N', price: 5999, origPrice: 7999, rating: '4.7', rev: '6k+', type: 'Easy to Moderate', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/chopta-tungnath' },
    { title: 'Har Ki Dun Trek', loc: 'Dehradun ? Dehradun', dur: '6D/5N', price: 8999, origPrice: 10999, rating: '4.8', rev: '5k+', type: 'Moderate', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/har-ki-dun' },
    { title: 'Kuari Pass Trek', loc: 'Rishikesh ? Rishikesh', dur: '6D/5N', price: 9999, origPrice: 11999, rating: '4.8', rev: '7k+', type: 'Moderate', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/kuari-pass' },
    { title: 'Dayara Bugyal Trek', loc: 'Rishikesh ? Rishikesh', dur: '5D/4N', price: 6999, origPrice: 8999, rating: '4.7', rev: '6k+', type: 'Easy', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/dayara-bugyal' },
  ],
  'Himachal Treks': [
    { title: 'Hampta Pass Trek', loc: 'Manali ? Manali', dur: '5D/4N', price: 8499, origPrice: 10999, rating: '4.7', rev: '8k+', type: 'Moderate', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/hampta-pass' },
    { title: 'Triund Trek', loc: 'Mcleodganj ? Mcleodganj', dur: '3D/2N', price: 2499, origPrice: 3999, rating: '4.6', rev: '15k+', type: 'Easy', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/mcleodganj-trek' },
    { title: 'Bhrigu Lake Trek', loc: 'Manali ? Manali', dur: '3D/2N', price: 4999, origPrice: 6499, rating: '4.6', rev: '6k+', type: 'Easy to Moderate', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/bhrigu-lake' },
    { title: 'Kheerganga Trek', loc: 'Kasol ? Kasol', dur: '3D/2N', price: 3499, origPrice: 4999, rating: '4.5', rev: '8k+', type: 'Easy', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/kheerganga' },
    { title: 'Beas Kund Trek', loc: 'Manali ? Manali', dur: '4D/3N', price: 5999, origPrice: 7999, rating: '4.6', rev: '5k+', type: 'Easy to Moderate', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/beas-kund' },
    { title: 'Sar Pass Trek', loc: 'Kasol ? Kasol', dur: '5D/4N', price: 6999, origPrice: 8999, rating: '4.7', rev: '5k+', type: 'Moderate', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/sar-pass' },
  ],
  'Yatras': [
    { title: 'Kedarnath Yatra', loc: 'Rishikesh ? Rishikesh', dur: '6D/5N', price: 9999, origPrice: 12999, rating: '4.8', rev: '12k+', type: 'Moderate', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/yatra/kedarnath-yatra' },
    { title: 'Do Dham Yatra', loc: 'Rishikesh ? Rishikesh', dur: '7D/6N', price: 14999, origPrice: 18999, rating: '4.8', rev: '8k+', type: 'Moderate', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/yatra/do-dham' },
    { title: 'Char Dham Yatra', loc: 'Rishikesh ? Rishikesh', dur: '12D/11N', price: 24999, origPrice: 29999, rating: '4.9', rev: '6k+', type: 'Difficult', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/yatra/char-dham' },
    { title: 'Panch Kedar Yatra', loc: 'Rishikesh ? Rishikesh', dur: '10D/9N', price: 19999, origPrice: 25999, rating: '4.8', rev: '5k+', type: 'Moderate-Difficult', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/yatra/panch-kedar' },
  ],
};

const diffColors: Record<string, string> = {
  'Easy': 'bg-green-500',
  'Easy to Moderate': 'bg-green-400',
  'Moderate': 'bg-yellow-500',
  'Moderate-Difficult': 'bg-orange-500',
  'Difficult': 'bg-red-500',
};

export default function HimalayanTreks() {
  const [season, setSeason] = useState('Uttarakhand Treks');
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const items = all[season] || [];

  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  }, [season]);

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
  }, [items.length, season]);

  return (
    <section className="py-8 lg:py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 lg:mb-8 px-4 lg:px-0">
          <div>
            <p className="text-[#16a34a] font-semibold text-xs lg:text-sm tracking-widest uppercase mb-1">HIMALAYAN TREKS</p>
            <h2 className="text-xl lg:text-3xl font-bold text-[#000000]">Himalayan Treks</h2>
          </div>
          <Link href="/treks" className="text-[#16a34a] text-sm font-semibold hover:text-[#15803d] whitespace-nowrap">View All Himalayan Treks &rarr;</Link>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 px-4 lg:px-0 mb-6" style={{ scrollbarWidth: 'none' }}>
          {seasons.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setSeason(s)}
              className={`shrink-0 px-5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all ${
                season === s
                  ? 'bg-[#000000] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-3 lg:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-1 px-4 lg:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          aria-label="Himalayan treks carousel"
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
              <span className={`absolute top-3 left-3 text-[10px] lg:text-xs font-bold px-2 py-1 rounded-md text-white ${diffColors[t.type] || 'bg-gray-500'}`}>
                {t.type}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
                <div className="flex items-center gap-1 text-white/80 text-xs font-medium mb-1">
                  <MapPin className="w-3 h-3 text-[#16a34a] shrink-0" />
                  <span className="truncate">{t.loc}</span>
                </div>
                <h3 className="font-semibold text-sm lg:text-base text-white group-hover:text-[#16a34a] transition-colors line-clamp-1 mb-1">
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
                  <span className="text-white/50 text-xs line-through">₹{t.origPrice.toLocaleString()}</span>
                  <span className="ml-auto bg-green-500/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {Math.round((1 - t.price / t.origPrice) * 100)}% OFF
                  </span>
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
