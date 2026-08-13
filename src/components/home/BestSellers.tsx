'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Star, Clock, MapPin, Zap } from 'lucide-react';

const tabs = ['Top Treks', 'Yatras & Pilgrimages', 'International Adventures'];

const topTreks = [
  { title: 'Valley of Flowers Trek', loc: 'Joshimath ? Rishikesh', dur: '6D/5N', price: 8999, origPrice: 11999, rating: '4.8', rev: '8k+', img: 'https://res.cloudinary.com/pg8uhzw0/image/upload/f_auto,q_auto,w_420,h_280,c_fill,g_auto/v1785367489/pexels-unaizat97-8673607_anl07u.jpg', href: '/treks/valley-of-flowers', badge: 'Bestseller' },
  { title: 'Kedarkantha Winter Trek', loc: 'Sankri ? Dehradun', dur: '5D/4N', price: 6999, origPrice: 8999, rating: '4.9', rev: '10k+', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/kedarkantha', badge: '' },
  { title: 'Hampta Pass Trek', loc: 'Manali ? Manali', dur: '5D/4N', price: 8499, origPrice: 10999, rating: '4.7', rev: '8k+', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/hampta-pass', badge: '' },
  { title: 'Chopta Tungnath Trek', loc: 'Rishikesh ? Rishikesh', dur: '4D/3N', price: 5999, origPrice: 7999, rating: '4.7', rev: '6k+', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/chopta-tungnath', badge: 'New' },
];

const yatras = [
  { title: 'Kedarnath Yatra', loc: 'Rishikesh ? Rishikesh', dur: '6D/5N', price: 9999, origPrice: 12999, rating: '4.8', rev: '12k+', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/yatra/kedarnath-yatra', badge: 'Popular' },
  { title: 'Do Dham Yatra', loc: 'Rishikesh ? Rishikesh', dur: '7D/6N', price: 14999, origPrice: 18999, rating: '4.8', rev: '8k+', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/yatra/do-dham', badge: 'Pilgrimage' },
  { title: 'Char Dham Yatra', loc: 'Rishikesh ? Rishikesh', dur: '12D/11N', price: 24999, origPrice: 29999, rating: '4.9', rev: '6k+', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/yatra/char-dham', badge: 'Ultimate' },
  { title: 'Panch Kedar Yatra', loc: 'Rishikesh ? Rishikesh', dur: '10D/9N', price: 19999, origPrice: 25999, rating: '4.8', rev: '5k+', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/yatra/panch-kedar', badge: 'Sacred' },
];

const international = [
  { title: 'Everest Base Camp Trek', loc: 'Lukla ? Lukla', dur: '13D/12N', price: 74999, origPrice: 89999, rating: '4.9', rev: '20k+', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/everest-base-camp', badge: 'Bucket List' },
  { title: 'Annapurna Base Camp Trek', loc: 'Pokhara ? Pokhara', dur: '8D/7N', price: 34999, origPrice: 42999, rating: '4.9', rev: '15k+', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/annapurna-base-camp', badge: 'Classic' },
  { title: 'Nepal Backpacking Circuit', loc: 'Kathmandu ? Kathmandu', dur: '10D/9N', price: 34999, origPrice: 42999, rating: '4.8', rev: '6k+', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/nepal-backpacking', badge: '' },
  { title: 'Annapurna Sanctuary Trek', loc: 'Pokhara ? Pokhara', dur: '10D/9N', price: 42999, origPrice: 52999, rating: '4.8', rev: '12k+', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', href: '/treks/annapurna-base-camp', badge: 'Premium' },
];

const data: Record<string, typeof topTreks> = {
  'Top Treks': topTreks,
  'Yatras & Pilgrimages': yatras,
  'International Adventures': international,
};

export default function BestSellers() {
  const [activeTab, setActiveTab] = useState('Top Treks');
  const items = data[activeTab] || [];
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
            <p className="text-[#16a34a] font-semibold text-xs lg:text-sm tracking-widest uppercase mb-1">BEST SELLERS</p>
            <h2 className="text-xl lg:text-3xl font-bold text-[#000000]">Our Best Selling Trips</h2>
          </div>
          <Link href="/treks" className="text-[#16a34a] text-sm font-semibold hover:text-[#15803d] whitespace-nowrap">View All Best Sellers &rarr;</Link>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 mb-6">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`shrink-0 px-5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all ${activeTab===t?'bg-orange-500 text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{t}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          {items.slice(0,4).map(t => (
            <Link key={t.title} href={t.href} className="group rounded-xl overflow-hidden transition-all relative aspect-[4/5]">
              <img src={t.img} alt={t.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {t.badge && <span className="absolute top-2 left-2 bg-[#16a34a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">{t.badge}</span>}
              <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
                <div className="flex items-center gap-1 text-white/70 text-[10px] lg:text-xs mb-1"><MapPin className="w-3 h-3" />{t.loc}</div>
                <h3 className="font-semibold text-xs lg:text-base text-white group-hover:text-[#16a34a] transition-colors line-clamp-2">{t.title}</h3>
                <div className="flex items-center gap-2 text-[11px] lg:text-xs text-white/60 mt-1 mb-2">
                  <Clock className="w-3 h-3" />{t.dur}<span className="text-white/20">|</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{t.rating} ({t.rev})
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#16a34a] font-bold text-sm lg:text-base">₹{t.price.toLocaleString()}</span>
                  {t.origPrice > 0 && <span className="text-white/50 text-xs line-through">₹{t.origPrice.toLocaleString()}</span>}
                </div>
                <span className="inline-block mt-1.5 text-[10px] text-blue-300 font-semibold bg-blue-900/40 backdrop-blur-sm px-2 py-0.5 rounded">Book Now, Pay Later</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
