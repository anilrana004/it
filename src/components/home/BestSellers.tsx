'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Star, Clock, MapPin, Zap } from 'lucide-react';

const tabs = ['Bucket List Sale', 'International Treks'];

const domestic = [
  { title: 'Valley of Flowers Trek', loc: 'Joshimath → Rishikesh', dur: '6D/5N', price: 8999, origPrice: 11999, rating: '4.8', rev: '8k+', img: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=420&h=280&fit=crop', href: '/treks/valley-of-flowers' },
  { title: 'Kedarkantha Trek', loc: 'Sankri → Dehradun', dur: '5D/4N', price: 6999, origPrice: 8999, rating: '4.9', rev: '10k+', img: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=420&h=280&fit=crop', href: '/treks/kedarkantha' },
  { title: 'Hampta Pass Trek', loc: 'Manali → Manali', dur: '5D/4N', price: 8499, origPrice: 10999, rating: '4.7', rev: '8k+', img: 'https://images.unsplash.com/photo-1586350977770-2598f1b6b7c8?w=420&h=280&fit=crop', href: '/treks/hampta-pass' },
  { title: 'Kedarnath Yatra', loc: 'Rishikesh → Rishikesh', dur: '6D/5N', price: 9999, origPrice: 12999, rating: '4.8', rev: '12k+', img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=420&h=280&fit=crop', href: '/yatra/kedarnath-yatra' },
];

const international = [
  { title: 'Annapurna Base Camp', loc: 'Pokhara → Pokhara', dur: '8D/7N', price: 34999, origPrice: 42999, rating: '4.9', rev: '15k+', img: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=420&h=280&fit=crop', href: '/treks/annapurna-base-camp' },
  { title: 'Everest Base Camp', loc: 'Lukla → Lukla', dur: '13D/12N', price: 74999, origPrice: 89999, rating: '4.9', rev: '20k+', img: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=420&h=280&fit=crop', href: '/treks/everest-base-camp' },
];

export default function BestSellers() {
  const [activeTab, setActiveTab] = useState('Bucket List Sale');
  const items = activeTab === 'Bucket List Sale' ? domestic : international;
  return (
    <section className="py-8 lg:py-16 bg-white">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 lg:p-6 mb-6 lg:mb-8 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-300" />
            <div>
              <h3 className="font-bold text-sm lg:text-lg">Bucket List Sale Active!</h3>
              <p className="text-white/80 text-xs lg:text-sm">Limited period discounts on handpicked trips</p>
            </div>
          </div>
          <span className="text-2xl lg:text-3xl font-bold">UP TO 40% OFF</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-[#359DFC] font-semibold text-xs lg:text-sm tracking-widest uppercase mb-1">BEST SELLERS</p>
            <h2 className="text-xl lg:text-3xl font-bold text-[#1a1a2e]">Our Best Selling Trips</h2>
          </div>
          <Link href="/treks" className="text-[#359DFC] text-sm font-semibold hover:text-[#1a7de0] whitespace-nowrap">View All Best Sellers &rarr;</Link>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 mb-6">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`shrink-0 px-5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all ${activeTab===t?'bg-orange-500 text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{t}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          {items.slice(0,4).map(t => (
            <Link key={t.title} href={t.href} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="relative h-32 lg:h-44 overflow-hidden">
                <img src={t.img} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3 lg:p-4">
                <div className="flex items-center gap-1 text-gray-500 text-[10px] lg:text-xs mb-1"><MapPin className="w-3 h-3" />{t.loc}</div>
                <h3 className="font-semibold text-xs lg:text-base text-gray-900 group-hover:text-[#359DFC] transition-colors line-clamp-1">{t.title}</h3>
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
