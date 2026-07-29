'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Star, Clock, MapPin, TrendingUp, Flame } from 'lucide-react';

const filters = ['All Trending', 'Trekking', 'Yatra', 'International', 'Weekend'];

const trending = [
  { title: 'Valley of Flowers Trek', loc: 'Joshimath → Rishikesh', dur: '6D/5N', price: 8999, rating: '4.8', rev: '8k+', img: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=420&h=280&fit=crop', href: '/treks/valley-of-flowers', tag: 'Trekking' },
  { title: 'Kedarkantha Trek', loc: 'Sankri → Dehradun', dur: '5D/4N', price: 6999, rating: '4.9', rev: '10k+', img: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=420&h=280&fit=crop', href: '/treks/kedarkantha', tag: 'Trekking' },
  { title: 'Everest Base Camp', loc: 'Lukla → Lukla', dur: '13D/12N', price: 74999, rating: '4.9', rev: '20k+', img: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=420&h=280&fit=crop', href: '/treks/everest-base-camp', tag: 'International' },
  { title: 'Annapurna Base Camp', loc: 'Pokhara → Pokhara', dur: '8D/7N', price: 34999, rating: '4.9', rev: '15k+', img: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=420&h=280&fit=crop', href: '/treks/annapurna-base-camp', tag: 'International' },
  { title: 'Hampta Pass Trek', loc: 'Manali → Manali', dur: '5D/4N', price: 8499, rating: '4.7', rev: '8k+', img: 'https://images.unsplash.com/photo-1586350977770-2598f1b6b7c8?w=420&h=280&fit=crop', href: '/treks/hampta-pass', tag: 'Trekking' },
  { title: 'Kedarnath Yatra', loc: 'Rishikesh → Rishikesh', dur: '6D/5N', price: 9999, rating: '4.8', rev: '12k+', img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=420&h=280&fit=crop', href: '/yatra/kedarnath-yatra', tag: 'Yatra' },
  { title: 'Triund Trek', loc: 'Mcleodganj → Mcleodganj', dur: '3D/2N', price: 2499, rating: '4.6', rev: '15k+', img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=420&h=280&fit=crop', href: '/treks/mcleodganj-trek', tag: 'Weekend' },
  { title: 'Chopta Tungnath', loc: 'Rishikesh → Rishikesh', dur: '4D/3N', price: 5999, rating: '4.7', rev: '7k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=420&h=280&fit=crop', href: '/treks/chopta-tungnath', tag: 'Trekking' },
  { title: 'Har Ki Dun Trek', loc: 'Dehradun → Dehradun', dur: '6D/5N', price: 8999, rating: '4.8', rev: '5k+', img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=420&h=280&fit=crop', href: '/treks/har-ki-dun', tag: 'Trekking' },
  { title: 'Badrinath Yatra', loc: 'Rishikesh → Rishikesh', dur: '5D/4N', price: 7999, rating: '4.8', rev: '10k+', img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=420&h=280&fit=crop', href: '/yatra/badrinath-yatra', tag: 'Yatra' },
  { title: 'Dayara Bugyal Trek', loc: 'Rishikesh → Rishikesh', dur: '5D/4N', price: 6999, rating: '4.7', rev: '6k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=420&h=280&fit=crop', href: '/treks/dayara-bugyal', tag: 'Trekking' },
  { title: 'Bhrigu Lake Trek', loc: 'Manali → Manali', dur: '3D/2N', price: 4999, rating: '4.6', rev: '6k+', img: 'https://images.unsplash.com/photo-1586350977770-2598f1b6b7c8?w=420&h=280&fit=crop', href: '/treks/bhrigu-lake', tag: 'Weekend' },
];

export default function TrendingPage() {
  const [filter, setFilter] = useState('All Trending');
  const filtered = filter === 'All Trending' ? trending : trending.filter(t => t.tag === filter);
  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#040921] to-[#040921] py-10 lg:py-16 mb-8 lg:mb-12">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Flame className="w-6 h-6 lg:w-8 lg:h-8 text-[#afde1e]" />
            <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white">Trending Destinations</h1>
          </div>
          <p className="text-white/70 text-sm lg:text-lg max-w-xl mx-auto">Discover the most popular adventures our travelers are raving about right now</p>
        </div>
      </section>

      <div className="container mx-auto">
        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 mb-6">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`shrink-0 px-5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all ${filter===f?'bg-[#040921] text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{f}</button>
          ))}
        </div>

        {/* Trending Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filtered.map(t => (
            <Link key={t.title} href={t.href} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="relative h-40 lg:h-44 overflow-hidden">
                <img src={t.img} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-full text-[#afde1e] flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {t.tag}
                </div>
              </div>
              <div className="p-3 lg:p-4">
                <div className="flex items-center gap-1 text-gray-500 text-[10px] lg:text-xs mb-1"><MapPin className="w-3 h-3" />{t.loc}</div>
                <h3 className="font-semibold text-sm lg:text-base text-gray-900 group-hover:text-[#afde1e] transition-colors line-clamp-1">{t.title}</h3>
                <div className="flex items-center gap-2 text-[11px] lg:text-xs text-gray-500 mt-1 mb-2">
                  <Clock className="w-3 h-3" />{t.dur}<span className="text-gray-300">|</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{t.rating} ({t.rev})
                </div>
                <div className="flex items-center">
                  <span className="text-[#afde1e] font-bold text-sm lg:text-base">₹{t.price.toLocaleString()}</span>
                  <span className="ml-auto bg-blue-50 text-[#afde1e] text-[10px] font-semibold px-2 py-0.5 rounded-full">Trending</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && <div className="text-center py-16 text-gray-400">No trending trips in this category right now.</div>}
      </div>
    </div>
  );
}
