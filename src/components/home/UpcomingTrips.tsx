'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Star, Clock, MapPin } from 'lucide-react';

const filters = ['Domestic', 'International', 'All Months'];

const trips = [
  { date: '5-10 Sep 2026', origin: 'Delhi', dest: 'Valley of Flowers', title: 'Valley of Flowers Trek', dur: '6D/5N', price: 8999, origPrice: 11999, rating: '4.8', reviews: '8k+', badge: 'New', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/valley-of-flowers', type: 'domestic' },
  { date: '12-16 Sep 2026', origin: 'Dehradun', dest: 'Kedarkantha', title: 'Kedarkantha Trek', dur: '5D/4N', price: 6999, origPrice: 8999, rating: '4.9', reviews: '10k+', badge: '', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/kedarkantha', type: 'domestic' },
  { date: '18-22 Sep 2026', origin: 'Manali', dest: 'Hampta Pass', title: 'Hampta Pass Trek', dur: '5D/4N', price: 8499, origPrice: 10999, rating: '4.7', reviews: '8k+', badge: '', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/hampta-pass', type: 'domestic' },
  { date: '25-30 Sep 2026', origin: 'Pokhara', dest: 'ABC', title: 'Annapurna Base Camp Trek', dur: '8D/7N', price: 34999, origPrice: 42999, rating: '4.9', reviews: '15k+', badge: '', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/annapurna-base-camp', type: 'international' },
  { date: '3-8 Oct 2026', origin: 'Rishikesh', dest: 'Kedarnath', title: 'Kedarnath Yatra', dur: '6D/5N', price: 9999, origPrice: 12999, rating: '4.8', reviews: '12k+', badge: '', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/yatra/kedarnath-yatra', type: 'domestic' },
  { date: '5-17 Oct 2026', origin: 'Kathmandu', dest: 'EBC', title: 'Everest Base Camp Trek', dur: '13D/12N', price: 74999, origPrice: 89999, rating: '4.9', reviews: '20k+', badge: '', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/everest-base-camp', type: 'international' },
  { date: '10-15 Nov 2026', origin: 'Kathmandu', dest: 'ABC', title: 'Annapurna Sanctuary Trek', dur: '10D/9N', price: 42999, origPrice: 52999, rating: '4.8', reviews: '12k+', badge: 'Popular', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/annapurna-base-camp', type: 'international' },
  { date: '20-25 Nov 2026', origin: 'Delhi', dest: 'Chopta', title: 'Tungnath Chandrashila Trek', dur: '4D/3N', price: 5999, origPrice: 7999, rating: '4.7', reviews: '6k+', badge: 'Trending', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/valley-of-flowers', type: 'domestic' },
];

export default function UpcomingTrips() {
  const [activeFilter, setActiveFilter] = useState('Domestic');
  const filteredTrips = activeFilter === 'All Months'
    ? trips
    : trips.filter(t => t.type === activeFilter.toLowerCase());
  return (
    <section className="py-8 lg:py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <p className="text-[#ffaf21] font-semibold text-xs lg:text-sm tracking-[0.25em] uppercase mb-1">UPCOMING TRIPS</p>
            <h2 className="text-xl lg:text-3xl font-bold text-[#000000]">Upcoming Group Trips</h2>
          </div>
          <Link href="/treks" className="text-[#ffaf21] text-sm font-semibold hover:text-[#d49400] transition-colors whitespace-nowrap">View All Upcoming Trips &rarr;</Link>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 mb-6">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all ${activeFilter===f?'bg-[#000000] text-white':'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'}`}>{f}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filteredTrips.map(t => (
            <Link key={t.title} href={t.href} className="group rounded-xl overflow-hidden transition-all">
              <div className="relative h-44 lg:h-48 overflow-hidden">
                <img src={t.img} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {t.badge && <span className="absolute top-3 left-3 bg-[#ffaf21] text-gray-900 text-[10px] lg:text-xs font-bold px-2 py-1 rounded-md uppercase">{t.badge}</span>}
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#000000] text-[10px] lg:text-xs font-semibold px-2 py-1 rounded-md">{t.date}</span>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-medium">
                  <MapPin className="w-3 h-3 text-[#ffaf21]" />{t.origin} → {t.dest}
                </div>
              </div>
              <div className="p-3 lg:p-4">
                <h3 className="font-semibold text-sm lg:text-base text-gray-900 group-hover:text-[#ffaf21] transition-colors line-clamp-1 mb-1">{t.title}</h3>
                <div className="flex items-center gap-2 text-[11px] lg:text-xs text-gray-500 mb-2">
                  <Clock className="w-3 h-3 text-[#ffaf21]" />{t.dur}
                  <span className="text-gray-300">|</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{t.rating} ({t.reviews})
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#ffaf21] font-bold text-sm lg:text-base">₹{t.price.toLocaleString()}</span>
                  <span className="text-gray-400 text-xs line-through">₹{t.origPrice.toLocaleString()}</span>
                  <span className="ml-auto bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded">{Math.round((1-t.price/t.origPrice)*100)}% OFF</span>
                </div>
                <span className="inline-block mt-1.5 text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded">Book Now, Pay Later</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
