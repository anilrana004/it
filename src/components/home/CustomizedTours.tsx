'use client';
import { useState } from 'react';
import Link from 'next/link';

const international = [
  { name: 'Nepal', count: 16, price: 18500, img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_390,h_500,c_fill,g_auto/', href: '/treks/kathmandu-tour' },
  { name: 'Everest Base Camp', count: 8, price: 74999, img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_390,h_500,c_fill,g_auto/', href: '/treks/everest-base-camp' },
  { name: 'Annapurna', count: 10, price: 34999, img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_390,h_500,c_fill,g_auto/', href: '/treks/annapurna-base-camp' },
  { name: 'Pokhara', count: 6, price: 15999, img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_390,h_500,c_fill,g_auto/', href: '/treks/pokhara-tour' },
  { name: 'Chitwan', count: 4, price: 21999, img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_390,h_500,c_fill,g_auto/', href: '/treks/chitwan-safari' },
  { name: 'Nepal Circuit', count: 5, price: 34999, img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_390,h_500,c_fill,g_auto/', href: '/treks/nepal-backpacking' },
  { name: 'Kathmandu Valley', count: 7, price: 18999, img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_390,h_500,c_fill,g_auto/', href: '/treks/kathmandu-tour' },
  { name: 'EBC Premium', count: 3, price: 94999, img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_390,h_500,c_fill,g_auto/', href: '/treks/everest-base-camp' },
];

const india = [
  { name: 'Uttarakhand Treks', count: 22, price: 7000, img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_390,h_500,c_fill,g_auto/', href: '/treks/valley-of-flowers' },
  { name: 'Himachal Treks', count: 18, price: 8500, img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_390,h_500,c_fill,g_auto/', href: '/treks/hampta-pass' },
  { name: 'Kedarnath Yatra', count: 12, price: 9999, img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_390,h_500,c_fill,g_auto/', href: '/yatra/kedarnath-yatra' },
  { name: 'Char Dham Yatra', count: 8, price: 24999, img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_390,h_500,c_fill,g_auto/', href: '/yatra/char-dham' },
  { name: 'Rishikesh', count: 10, price: 4999, img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_390,h_500,c_fill,g_auto/', href: '/treks' },
  { name: 'Manali', count: 14, price: 5999, img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_390,h_500,c_fill,g_auto/', href: '/treks/hampta-pass' },
  { name: 'Do Dham Yatra', count: 6, price: 14999, img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_390,h_500,c_fill,g_auto/', href: '/yatra/do-dham' },
  { name: 'Spiti Valley', count: 5, price: 15999, img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_390,h_500,c_fill,g_auto/', href: '/treks/hampta-pass' },
];

export default function CustomizedTours() {
  const [tab, setTab] = useState('International');
  const items = tab === 'International' ? international : india;
  return (
    <section className="py-8 lg:py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-6 lg:mb-8">
          <p className="text-[#16a34a] font-semibold text-xs lg:text-sm tracking-widest uppercase mb-1">CUSTOMISED TOURS</p>
          <h2 className="text-xl lg:text-3xl font-bold text-[#000000]">Get a Customised Tour Package</h2>
        </div>
        <div className="flex justify-center gap-2 mb-6">
          {['International', 'India'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all ${tab===t?'bg-[#000000] text-white':'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'}`}>{t}</button>
          ))}
        </div>
        <div className="overflow-x-auto scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0">
          <div className="flex gap-4 pb-2 w-max lg:w-full lg:grid lg:grid-cols-4">
            {items.map(d => (
              <Link key={d.name} href={d.href}
                className="group relative w-[220px] lg:w-auto rounded-2xl overflow-hidden shrink-0 transition-all">
                <div className="relative h-[280px] lg:h-[320px] overflow-hidden">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#16a34a] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {d.count}+ Packages
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-lg text-white group-hover:text-[#16a34a] transition-colors">{d.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-white/70 text-xs">Starting Price</span>
                      <span className="text-white font-bold text-base">₹{d.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/customized" className="text-[#16a34a] text-sm font-semibold hover:text-[#15803d] transition-colors">View All Customized Tours &rarr;</Link>
        </div>
      </div>
    </section>
  );
}
