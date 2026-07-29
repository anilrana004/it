'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Star, Clock, MapPin, Zap, Tag, Timer } from 'lucide-react';

const categories = ['All Deals', 'Domestic', 'International', 'Winter Treks', 'Summer Treks', 'Biking'];

const deals = [
  { title: 'Valley of Flowers Trek', loc: 'Joshimath → Rishikesh', dur: '6D/5N', price: 8999, origPrice: 11999, rating: '4.8', rev: '8k+', img: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=420&h=280&fit=crop', href: '/treks/valley-of-flowers', badge: '25% OFF' },
  { title: 'Kedarkantha Trek', loc: 'Sankri → Dehradun', dur: '5D/4N', price: 6999, origPrice: 8999, rating: '4.9', rev: '10k+', img: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=420&h=280&fit=crop', href: '/treks/kedarkantha', badge: '22% OFF' },
  { title: 'Hampta Pass Trek', loc: 'Manali → Manali', dur: '5D/4N', price: 8499, origPrice: 10999, rating: '4.7', rev: '8k+', img: 'https://images.unsplash.com/photo-1586350977770-2598f1b6b7c8?w=420&h=280&fit=crop', href: '/treks/hampta-pass', badge: '23% OFF' },
  { title: 'Annapurna Base Camp', loc: 'Pokhara → Pokhara', dur: '8D/7N', price: 34999, origPrice: 42999, rating: '4.9', rev: '15k+', img: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=420&h=280&fit=crop', href: '/treks/annapurna-base-camp', badge: '19% OFF' },
  { title: 'Everest Base Camp', loc: 'Lukla → Lukla', dur: '13D/12N', price: 74999, origPrice: 89999, rating: '4.9', rev: '20k+', img: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=420&h=280&fit=crop', href: '/treks/everest-base-camp', badge: '17% OFF' },
  { title: 'Kedarnath Yatra', loc: 'Rishikesh → Rishikesh', dur: '6D/5N', price: 9999, origPrice: 12999, rating: '4.8', rev: '12k+', img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=420&h=280&fit=crop', href: '/yatra/kedarnath-yatra', badge: '23% OFF' },
  { title: 'Chopta Tungnath', loc: 'Rishikesh → Rishikesh', dur: '4D/3N', price: 5999, origPrice: 7999, rating: '4.7', rev: '7k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=420&h=280&fit=crop', href: '/treks/chopta-tungnath', badge: '25% OFF' },
  { title: 'Triund Trek', loc: 'Mcleodganj → Mcleodganj', dur: '3D/2N', price: 2499, origPrice: 3999, rating: '4.6', rev: '15k+', img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=420&h=280&fit=crop', href: '/treks/mcleodganj-trek', badge: '38% OFF' },
  { title: 'Badrinath Yatra', loc: 'Rishikesh → Rishikesh', dur: '5D/4N', price: 7999, origPrice: 9999, rating: '4.8', rev: '10k+', img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=420&h=280&fit=crop', href: '/yatra/badrinath-yatra', badge: '20% OFF' },
  { title: 'Rupin Pass Trek', loc: 'Shimla → Dehradun', dur: '7D/6N', price: 11999, origPrice: 14999, rating: '4.8', rev: '6k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=420&h=280&fit=crop', href: '/treks/rupin-pass', badge: '20% OFF' },
  { title: 'Nepal Backpacking', loc: 'Kathmandu → Kathmandu', dur: '11D/10N', price: 34999, origPrice: 42999, rating: '4.8', rev: '6k+', img: 'https://images.unsplash.com/photo-1543429257-3eb0b65d9c10?w=420&h=280&fit=crop', href: '/treks/nepal-backpacking', badge: '19% OFF' },
  { title: 'Everest Base Camp (Premium)', loc: 'Lukla → Lukla', dur: '13D/12N', price: 94999, origPrice: 114999, rating: '4.9', rev: '20k+', img: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=420&h=280&fit=crop', href: '/treks/everest-base-camp', badge: '17% OFF' },
];

export default function BucketListSalePage() {
  const [cat, setCat] = useState('All Deals');
  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#EA5939] via-[#d4451e] to-[#b83010] py-10 lg:py-16 mb-8 lg:mb-12">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-300" />
            <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white">Bucket List Sale</h1>
          </div>
          <p className="text-white/80 text-sm lg:text-lg mb-2">Limited Period Discounts on Handpicked Trips</p>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 text-white font-bold text-lg lg:text-2xl">
            <Timer className="w-5 h-5" /> UP TO 40% OFF
          </div>
          <p className="text-white/60 text-xs lg:text-sm mt-4">Hurry! These deals won&apos;t last long. Book now and save big on your dream adventure.</p>
        </div>
      </section>

      <div className="container mx-auto">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 mb-6">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`shrink-0 px-5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all ${cat===c?'bg-[#EA5939] text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{c}</button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { v: '12', l: 'Active Deals' },
            { v: '40%', l: 'Max Discount' },
            { v: '₹2,499', l: 'Starting From' },
            { v: '7 Days', l: 'Sale Ends In' },
          ].map(s => (
            <div key={s.l} className="bg-gradient-to-br from-[#EA5939]/10 to-[#EA5939]/5 rounded-xl p-4 text-center border border-[#EA5939]/20">
              <div className="font-bold text-lg lg:text-2xl text-[#EA5939]">{s.v}</div>
              <div className="text-[11px] lg:text-xs text-gray-600">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {deals.map(t => (
            <Link key={t.title} href={t.href} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="relative h-40 lg:h-44 overflow-hidden">
                <img src={t.img} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-[#EA5939] text-white text-[10px] lg:text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Tag className="w-3 h-3" />{t.badge}
                </div>
              </div>
              <div className="p-3 lg:p-4">
                <div className="flex items-center gap-1 text-gray-500 text-[10px] lg:text-xs mb-1"><MapPin className="w-3 h-3" />{t.loc}</div>
                <h3 className="font-semibold text-sm lg:text-base text-gray-900 group-hover:text-[#EA5939] transition-colors line-clamp-1">{t.title}</h3>
                <div className="flex items-center gap-2 text-[11px] lg:text-xs text-gray-500 mt-1 mb-2">
                  <Clock className="w-3 h-3" />{t.dur}<span className="text-gray-300">|</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{t.rating} ({t.rev})
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#EA5939] font-bold text-sm lg:text-base">₹{t.price.toLocaleString()}</span>
                  <span className="text-gray-400 text-xs line-through">₹{t.origPrice.toLocaleString()}</span>
                  <span className="ml-auto bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded animate-pulse">{t.badge}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
