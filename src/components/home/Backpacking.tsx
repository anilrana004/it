'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Star, Clock, MapPin } from 'lucide-react';
import { backpackingDestinations } from '@/lib/backpacking-destinations';

const regions = [
  { key: 'uttarakhand', label: 'Uttarakhand' },
  { key: 'himachal', label: 'Himachal Pradesh' },
];

const trips = (region: string) =>
  backpackingDestinations
    .filter(d => d.region === region)
    .slice(0, 6)
    .map(d => ({
      title: d.title,
      loc: d.location,
      dur: d.duration,
      price: d.price,
      origPrice: Math.round(d.price * 1.35),
      rating: d.rating,
      rev: d.reviewCount,
      type: d.bestSeason.includes('Easy') ? 'Easy' : 'Moderate',
      img: d.images[0],
      href: `/treks?region=${d.region}`,
    }));

const diffColors: Record<string, string> = { Easy: 'bg-green-500', 'Easy to Moderate': 'bg-green-400', Moderate: 'bg-yellow-500', 'Moderate-Difficult': 'bg-orange-500', Difficult: 'bg-red-500' };

export default function Backpacking() {
  const [region, setRegion] = useState('uttarakhand');
  const items = trips(region);
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
            <button key={r.key} onClick={() => setRegion(r.key)}
              className={`shrink-0 px-5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all ${region===r.key?'bg-[#1a1a2e] text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{r.label}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {items.map(t => (
            <Link key={t.title} href={t.href} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="relative h-40 lg:h-44 overflow-hidden">
                <img src={t.img} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${diffColors[t.type] || 'bg-gray-500'}`}>{t.type}</span>
              </div>
              <div className="p-3 lg:p-4">
                <div className="flex items-center gap-1 text-gray-500 text-[10px] lg:text-xs mb-1"><MapPin className="w-3 h-3" />{t.loc}</div>
                <h3 className="font-semibold text-sm lg:text-base text-gray-900 group-hover:text-[#359DFC] transition-colors line-clamp-1">{t.title}</h3>
                <div className="flex items-center gap-2 text-[11px] lg:text-xs text-gray-500 mt-1 mb-2">
                  <Clock className="w-3 h-3" />{t.dur}<span className="text-gray-300">|</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{t.rating} ({t.rev})
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#EA5939] font-bold text-sm lg:text-base">₹{t.price.toLocaleString()}</span>
                  <span className="text-gray-400 text-xs line-through">₹{t.origPrice.toLocaleString()}</span>
                  <span className="ml-auto bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded">{Math.round((1-t.price/t.origPrice)*100)}% OFF</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
