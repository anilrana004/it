'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Star, Clock, MapPin } from 'lucide-react';

const regions = ['International', 'Ladakh Zanskar', 'Spiti Valley'];

const data: Record<string, { title: string; loc: string; dur: string; price: number; origPrice: number; rating: string; rev: string; img: string; href: string; badge?: string }[]> = {
  'International': [
    { title: 'Thailand - Phuket Krabi Group Tour with Full Moon Party (6N/7D)', loc: 'Phuket to Phuket', dur: '6N/7D', price: 53500, origPrice: 57000, rating: '4.8', rev: '10k+', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/nepal-backpacking', badge: 'New' },
    { title: 'Bhutan Bike and Backpacking | 8 Days Bhutan Bike Tour', loc: 'Bagdogra to Bagdogra', dur: '7N/8D', price: 45000, origPrice: 0, rating: '4.8', rev: '10k+', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks' },
    { title: 'Bali with Gili Island Group Tour - Ubud, Nusa Penida & Kuta (7N/8D)', loc: 'Bali Airport to Bali Airport', dur: '7N/8D', price: 53500, origPrice: 57000, rating: '4.8', rev: '10k+', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks' },
    { title: 'Bhutan Tour with Phobjikha Valley - 8 Days', loc: 'Bagdogra to Siliguri', dur: '7N/8D', price: 45000, origPrice: 0, rating: '4.8', rev: '10k+', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks' },
  ],
  'Ladakh Zanskar': [
    { title: 'Zanskar Valley Backpacking Trip | 8 Days Delhi to Delhi Tour', loc: 'Delhi to Delhi', dur: '7N/8D', price: 25000, origPrice: 28000, rating: '4.8', rev: '10k+', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/bali-pass' },
    { title: 'Leh Ladakh Bike Trip From Srinagar with Hanle & Umling La', loc: 'Srinagar to Leh', dur: '11N/12D', price: 45000, origPrice: 0, rating: '4.9', rev: '10k+', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/everest-base-camp' },
    { title: 'Zanskar Valley Expedition', loc: 'Leh to Leh', dur: '8N/9D', price: 32000, origPrice: 0, rating: '4.8', rev: '8k+', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/bali-pass' },
  ],
  'Spiti Valley': [
    { title: 'Spiti Valley Bike and Backpacking Trip', loc: 'Delhi to Delhi', dur: '9N/10D', price: 25000, origPrice: 0, rating: '4.8', rev: '8k+', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/hampta-pass' },
    { title: 'Road Trip to Spiti Valley', loc: 'Delhi to Delhi', dur: '8N/9D', price: 22000, origPrice: 0, rating: '4.8', rev: '8k+', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/hampta-pass' },
    { title: 'All Girls Road Trip to Spiti Valley', loc: 'Delhi to Delhi', dur: '8N/9D', price: 24000, origPrice: 0, rating: '4.8', rev: '6k+', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/hampta-pass' },
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
            <p className="text-[#ffaf21] font-semibold text-xs lg:text-sm tracking-widest uppercase mb-1">BACKPACKING</p>
            <h2 className="text-xl lg:text-3xl font-bold text-[#000000]">Backpacking Destinations</h2>
          </div>
          <Link href="/treks" className="text-[#ffaf21] text-sm font-semibold hover:text-[#d49400] whitespace-nowrap">View All Backpacking &rarr;</Link>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 mb-6">
          {regions.map(r => (
            <button key={r} onClick={() => setRegion(r)}
              className={`shrink-0 px-5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all ${region===r?'bg-[#000000] text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{r}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {items.map(t => (
            <Link key={t.title} href={t.href} className="group rounded-xl overflow-hidden transition-all">
              <div className="relative h-40 lg:h-44 overflow-hidden">
                <img src={t.img} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {t.badge && <span className="absolute top-3 left-3 bg-[#ffaf21] text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase">{t.badge}</span>}
              </div>
              <div className="p-3 lg:p-4">
                <div className="flex items-center gap-1 text-gray-500 text-[10px] lg:text-xs mb-1"><MapPin className="w-3 h-3" />{t.loc}</div>
                <h3 className="font-semibold text-sm lg:text-base text-gray-900 group-hover:text-[#ffaf21] transition-colors line-clamp-2">{t.title}</h3>
                <div className="flex items-center gap-2 text-[11px] lg:text-xs text-gray-500 mt-1 mb-2">
                  <Clock className="w-3 h-3" />{t.dur}<span className="text-gray-300">|</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{t.rating} ({t.rev})
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#ffaf21] font-bold text-sm lg:text-base">₹{t.price.toLocaleString()}</span>
                  {t.origPrice > 0 && <span className="text-gray-400 text-xs line-through">₹{t.origPrice.toLocaleString()}</span>}
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
