'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Star, Clock, MapPin } from 'lucide-react';

const seasons = ['Monsoon Treks', 'Autumn Treks', 'Winter Treks'];

const all: Record<string, { title: string; loc: string; dur: string; price: number; origPrice: number; rating: string; rev: string; type: string; img: string; href: string }[]> = {
  'Monsoon Treks': [
    { title: 'Valley of Flowers Trek', loc: 'Joshimath → Rishikesh', dur: '6D/5N', price: 8999, origPrice: 11999, rating: '4.8', rev: '8k+', type: 'Easy', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/valley-of-flowers' },
    { title: 'Hampta Pass Trek', loc: 'Manali → Manali', dur: '5D/4N', price: 8499, origPrice: 10999, rating: '4.7', rev: '8k+', type: 'Moderate', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/hampta-pass' },
    { title: 'Rupin Pass Trek', loc: 'Shimla → Dehradun', dur: '7D/6N', price: 11999, origPrice: 14999, rating: '4.8', rev: '6k+', type: 'Moderate-Difficult', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/rupin-pass' },
  ],
  'Autumn Treks': [
    { title: 'Annapurna Base Camp', loc: 'Pokhara → Pokhara', dur: '8D/7N', price: 34999, origPrice: 42999, rating: '4.9', rev: '15k+', type: 'Moderate', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/annapurna-base-camp' },
    { title: 'Everest Base Camp', loc: 'Lukla → Lukla', dur: '13D/12N', price: 74999, origPrice: 89999, rating: '4.9', rev: '20k+', type: 'Difficult', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/everest-base-camp' },
    { title: 'Har Ki Dun Trek', loc: 'Dehradun → Dehradun', dur: '6D/5N', price: 8999, origPrice: 10999, rating: '4.8', rev: '5k+', type: 'Moderate', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/har-ki-dun' },
  ],
  'Winter Treks': [
    { title: 'Kedarkantha Trek', loc: 'Sankri → Dehradun', dur: '5D/4N', price: 6999, origPrice: 8999, rating: '4.9', rev: '10k+', type: 'Moderate', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/kedarkantha' },
    { title: 'Kuari Pass Trek', loc: 'Rishikesh → Rishikesh', dur: '6D/5N', price: 9999, origPrice: 11999, rating: '4.8', rev: '7k+', type: 'Moderate', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/kuari-pass' },
    { title: 'Dayara Bugyal Trek', loc: 'Rishikesh → Rishikesh', dur: '5D/4N', price: 6999, origPrice: 8999, rating: '4.7', rev: '6k+', type: 'Easy', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/dayara-bugyal' },
  ],
};

const diffColors: Record<string, string> = { 'Easy': 'bg-green-500', 'Easy to Moderate': 'bg-green-400', 'Moderate': 'bg-yellow-500', 'Moderate-Difficult': 'bg-orange-500', 'Difficult': 'bg-red-500' };

export default function HimalayanTreks() {
  const [season, setSeason] = useState('Monsoon Treks');
  const items = all[season] || [];
  return (
    <section className="py-8 lg:py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <p className="text-[#ffaf21] font-semibold text-xs lg:text-sm tracking-widest uppercase mb-1">HIMALAYAN TREKS</p>
            <h2 className="text-xl lg:text-3xl font-bold text-[#000000]">Himalayan Treks</h2>
          </div>
          <Link href="/treks" className="text-[#ffaf21] text-sm font-semibold hover:text-[#d49400] whitespace-nowrap">View All Himalayan Treks &rarr;</Link>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 mb-6">
          {seasons.map(s => (
            <button key={s} onClick={() => setSeason(s)}
              className={`shrink-0 px-5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all ${season===s?'bg-[#000000] text-white':'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'}`}>{s}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {items.map(t => (
            <Link key={t.title} href={t.href} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="relative h-40 lg:h-44 overflow-hidden">
                <img src={t.img} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${diffColors[t.type]||'bg-gray-500'}`}>{t.type}</span>
              </div>
              <div className="p-3 lg:p-4">
                <div className="flex items-center gap-1 text-gray-500 text-[10px] lg:text-xs mb-1"><MapPin className="w-3 h-3" />{t.loc}</div>
                <h3 className="font-semibold text-sm lg:text-base text-gray-900 group-hover:text-[#ffaf21] transition-colors line-clamp-1">{t.title}</h3>
                <div className="flex items-center gap-2 text-[11px] lg:text-xs text-gray-500 mt-1 mb-2">
                  <Clock className="w-3 h-3" />{t.dur}<span className="text-gray-300">|</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{t.rating} ({t.rev})
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
