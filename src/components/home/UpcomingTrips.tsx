'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Star, Clock, MapPin } from 'lucide-react';

const filters = ['Domestic', 'International', 'All Months'];

const trips = [
  { date: '5-10 Sep 2026', origin: 'Delhi', dest: 'Valley of Flowers', title: 'Valley of Flowers Trek', dur: '6D/5N', price: 8999, origPrice: 11999, rating: '4.8', reviews: '8k+', badge: 'New', img: 'https://res.cloudinary.com/pg8uhzw0/image/upload/f_auto,q_auto,w_420,h_280,c_fill,g_auto/v1785367489/pexels-unaizat97-8673607_anl07u.jpg', href: '/treks/valley-of-flowers', type: 'domestic' },
  { date: '12-16 Sep 2026', origin: 'Dehradun', dest: 'Kedarkantha', title: 'Kedarkantha Trek', dur: '5D/4N', price: 6999, origPrice: 8999, rating: '4.9', reviews: '10k+', badge: '', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/kedarkantha', type: 'domestic' },
  { date: '18-22 Sep 2026', origin: 'Manali', dest: 'Hampta Pass', title: 'Hampta Pass Trek', dur: '5D/4N', price: 8499, origPrice: 10999, rating: '4.7', reviews: '8k+', badge: '', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/hampta-pass', type: 'domestic' },
  { date: '20-24 Sep 2026', origin: 'Rishikesh', dest: 'Chopta', title: 'Chopta Tungnath Trek', dur: '4D/3N', price: 5999, origPrice: 7999, rating: '4.7', reviews: '6k+', badge: 'Trending', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/chopta-tungnath', type: 'domestic' },
  { date: '25-30 Sep 2026', origin: 'Pokhara', dest: 'ABC', title: 'Annapurna Base Camp Trek', dur: '8D/7N', price: 34999, origPrice: 42999, rating: '4.9', reviews: '15k+', badge: '', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/annapurna-base-camp', type: 'international' },
  { date: '3-8 Oct 2026', origin: 'Rishikesh', dest: 'Kedarnath', title: 'Kedarnath Yatra', dur: '6D/5N', price: 9999, origPrice: 12999, rating: '4.8', reviews: '12k+', badge: 'Popular', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/yatra/kedarnath-yatra', type: 'domestic' },
  { date: '10-15 Oct 2026', origin: 'Manali', dest: 'Triund', title: 'Triund Trek', dur: '3D/2N', price: 2499, origPrice: 3999, rating: '4.6', reviews: '15k+', badge: 'Weekend', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/mcleodganj-trek', type: 'domestic' },
  { date: '5-17 Oct 2026', origin: 'Kathmandu', dest: 'EBC', title: 'Everest Base Camp Trek', dur: '13D/12N', price: 74999, origPrice: 89999, rating: '4.9', reviews: '20k+', badge: '', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/everest-base-camp', type: 'international' },
  { date: '25-30 Oct 2026', origin: 'Rishikesh', dest: 'Rishikesh', title: 'Do Dham Yatra (Kedarnath+Badrinath)', dur: '7D/6N', price: 14999, origPrice: 18999, rating: '4.8', reviews: '8k+', badge: 'Yatra', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/yatra/do-dham', type: 'domestic' },
  { date: '5-14 Nov 2026', origin: 'Kathmandu', dest: 'Nepal', title: 'Nepal Backpacking Circuit', dur: '10D/9N', price: 34999, origPrice: 42999, rating: '4.8', reviews: '6k+', badge: 'Popular', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/nepal-backpacking', type: 'international' },
];

export default function UpcomingTrips() {
  const [activeFilter, setActiveFilter] = useState('Domestic');
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredTrips = activeFilter === 'All Months'
    ? trips
    : trips.filter(t => t.type === activeFilter.toLowerCase());

  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  }, [activeFilter]);

  // Auto-scroll one card at a time; pause on user interaction
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || filteredTrips.length < 2) return;

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
  }, [filteredTrips.length, activeFilter]);

  return (
    <section className="py-8 lg:py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 lg:mb-8 px-4 lg:px-0">
          <div>
            <p className="text-[#16a34a] font-semibold text-xs lg:text-sm tracking-[0.25em] uppercase mb-1">UPCOMING TRIPS</p>
            <h2 className="text-xl lg:text-3xl font-bold text-[#000000]">Upcoming Group Trips</h2>
          </div>
          <Link href="/treks" className="text-[#16a34a] text-sm font-semibold hover:text-[#15803d] transition-colors whitespace-nowrap">View All Upcoming Trips &rarr;</Link>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 px-4 lg:px-0 mb-6" style={{ scrollbarWidth: 'none' }}>
          {filters.map(f => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all ${
                activeFilter === f
                  ? 'bg-[#000000] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Horizontal auto-scrolling snap carousel */}
        <div
          ref={scrollerRef}
          className="flex gap-3 lg:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-1 px-4 lg:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          aria-label="Upcoming trips carousel"
        >
          {filteredTrips.map(t => (
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
              <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] lg:text-xs font-semibold px-2 py-1 rounded-md">
                {t.date}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
                <div className="flex items-center gap-1 text-white/80 text-xs font-medium mb-1">
                  <MapPin className="w-3 h-3 text-[#16a34a] shrink-0" />
                  <span className="truncate">{t.origin} ? {t.dest}</span>
                </div>
                <h3 className="font-semibold text-sm lg:text-base text-white group-hover:text-[#16a34a] transition-colors line-clamp-1 mb-1">
                  {t.title}
                </h3>
                <div className="flex items-center gap-2 text-[11px] lg:text-xs text-white/60 mb-2">
                  <Clock className="w-3 h-3 text-[#16a34a]" />
                  {t.dur}
                  <span className="text-white/20">|</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {t.rating} ({t.reviews})
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
