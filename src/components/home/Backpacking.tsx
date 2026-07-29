'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Star, Clock, MapPin } from 'lucide-react';

const regions = ['International', 'Ladakh Zanskar', 'Spiti Valley'];

const data: Record<string, { title: string; loc: string; dur: string; price: number; origPrice: number; rating: string; rev: string; img: string; href: string; badge?: string }[]> = {
  'International': [
    { title: 'Thailand - Phuket Krabi Group Tour with Full Moon Party (6N/7D)', loc: 'Phuket to Phuket', dur: '6N/7D', price: 53500, origPrice: 57000, rating: '4.8', rev: '10k+', img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=420&h=280&fit=crop', href: '/backpacking-trips/international/thailand/full-moon-party-group-tour', badge: 'New' },
    { title: 'Bhutan Bike and Backpacking | 8 Days Bhutan Bike Tour', loc: 'Bagdogra to Bagdogra', dur: '7N/8D', price: 45000, origPrice: 0, rating: '4.8', rev: '10k+', img: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=420&h=280&fit=crop', href: '/backpacking-trips/international/bhutan/bhutan-bike-tour' },
    { title: 'Bali with Gili Island Group Tour - Ubud, Nusa Penida & Kuta (7N/8D)', loc: 'Bali Airport to Bali Airport', dur: '7N/8D', price: 53500, origPrice: 57000, rating: '4.8', rev: '10k+', img: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=420&h=280&fit=crop', href: '/backpacking-trips/international/bali/bali-with-gili-island-group-tour-7n-8d' },
    { title: 'Bhutan Tour with Phobjikha Valley - 8 Days', loc: 'Bagdogra to Siliguri', dur: '7N/8D', price: 45000, origPrice: 0, rating: '4.8', rev: '10k+', img: 'https://images.unsplash.com/photo-1543429257-3eb0b65d9c10?w=420&h=280&fit=crop', href: '/backpacking-trips/international/bhutan/8-days-bhutan-group-tour' },
  ],
  'Ladakh Zanskar': [
    { title: 'Zanskar Valley Backpacking Trip | 8 Days Delhi to Delhi Tour', loc: 'Delhi to Delhi', dur: '7N/8D', price: 25000, origPrice: 28000, rating: '4.8', rev: '10k+', img: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=420&h=280&fit=crop', href: '/backpacking-trips/india/ladakh/zanskar-valley-backpacking-trip-delhi-to-delhi' },
    { title: 'Leh Ladakh Bike Trip From Srinagar with Hanle & Umling La', loc: 'Srinagar to Leh', dur: '11N/12D', price: 45000, origPrice: 0, rating: '4.9', rev: '10k+', img: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=420&h=280&fit=crop', href: '/backpacking-trips/india/ladakh/leh-ladakh-bike-trip-from-srinagar-with-hanle-and-umling-la' },
    { title: 'Zanskar Valley Expedition', loc: 'Leh to Leh', dur: '8N/9D', price: 32000, origPrice: 0, rating: '4.8', rev: '8k+', img: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=420&h=280&fit=crop', href: '/backpacking-trips/india/ladakh/zanskar-valley-expedition' },
  ],
  'Spiti Valley': [
    { title: 'Spiti Valley Bike and Backpacking Trip', loc: 'Delhi to Delhi', dur: '9N/10D', price: 25000, origPrice: 0, rating: '4.8', rev: '8k+', img: 'https://images.unsplash.com/photo-1586350977770-2598f1b6b7c8?w=420&h=280&fit=crop', href: '/backpacking-trips/india/himachal-pradesh/spiti-valley-bike-and-backpacking-trip' },
    { title: 'Road Trip to Spiti Valley', loc: 'Delhi to Delhi', dur: '8N/9D', price: 22000, origPrice: 0, rating: '4.8', rev: '8k+', img: 'https://images.unsplash.com/photo-1586350977770-2598f1b6b7c8?w=420&h=280&fit=crop', href: '/backpacking-trips/india/himachal-pradesh/road-trip-to-spiti-valley' },
    { title: 'All Girls Road Trip to Spiti Valley', loc: 'Delhi to Delhi', dur: '8N/9D', price: 24000, origPrice: 0, rating: '4.8', rev: '6k+', img: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=420&h=280&fit=crop', href: '/backpacking-trips/india/himachal-pradesh/all-girls-road-trip-to-spiti-valley' },
  ],
};

export default function Backpacking() {
  const [region, setRegion] = useState('International');
  const items = data[region] || [];
  return (
    <section className="py-8 lg:py-16 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <p className="text-[#359DFC] font-semibold text-xs lg:text-sm tracking-widest uppercase mb-1">BACKPACKING</p>
            <h2 className="text-xl lg:text-3xl font-bold text-[#1a1a2e]">Backpacking Destinations</h2>
          </div>
          <Link href="/treks" className="text-[#359DFC] text-sm font-semibold hover:text-[#1a7de0] whitespace-nowrap">View All Backpacking &rarr;</Link>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 mb-6">
          {regions.map(r => (
            <button key={r} onClick={() => setRegion(r)}
              className={`shrink-0 px-5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all ${region===r?'bg-[#1a1a2e] text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{r}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {items.map(t => (
            <Link key={t.title} href={t.href} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="relative h-40 lg:h-44 overflow-hidden">
                <img src={t.img} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {t.badge && <span className="absolute top-3 left-3 bg-[#EA5939] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">{t.badge}</span>}
              </div>
              <div className="p-3 lg:p-4">
                <div className="flex items-center gap-1 text-gray-500 text-[10px] lg:text-xs mb-1"><MapPin className="w-3 h-3" />{t.loc}</div>
                <h3 className="font-semibold text-sm lg:text-base text-gray-900 group-hover:text-[#359DFC] transition-colors line-clamp-2">{t.title}</h3>
                <div className="flex items-center gap-2 text-[11px] lg:text-xs text-gray-500 mt-1 mb-2">
                  <Clock className="w-3 h-3" />{t.dur}<span className="text-gray-300">|</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{t.rating} ({t.rev})
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#EA5939] font-bold text-sm lg:text-base">₹{t.price.toLocaleString()}</span>
                  {t.origPrice > 0 && <span className="text-gray-400 text-xs line-through">₹{t.origPrice.toLocaleString()}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
