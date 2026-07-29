'use client';
import { useState } from 'react';
import Link from 'next/link';

const international = [
  { name: 'Bali', count: 22, price: 39000, img: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=390&h=500&fit=crop', href: '/customized' },
  { name: 'Thailand', count: 15, price: 25000, img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=390&h=500&fit=crop', href: '/customized' },
  { name: 'Bhutan', count: 9, price: 29000, img: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=390&h=500&fit=crop', href: '/customized' },
  { name: 'Vietnam', count: 16, price: 35500, img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=390&h=500&fit=crop', href: '/customized' },
  { name: 'Dubai', count: 10, price: 26000, img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=390&h=500&fit=crop', href: '/customized' },
  { name: 'Sri Lanka', count: 4, price: 28500, img: 'https://images.unsplash.com/photo-1499393611497-423fa3c5cd50?w=390&h=500&fit=crop', href: '/customized' },
  { name: 'Nepal', count: 4, price: 18500, img: 'https://images.unsplash.com/photo-1543429257-3eb0b65d9c10?w=390&h=500&fit=crop', href: '/customized' },
  { name: 'Maldives', count: 21, price: 75000, img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=390&h=500&fit=crop', href: '/customized' },
];

const india = [
  { name: 'Ladakh', count: 18, price: 15000, img: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=390&h=500&fit=crop', href: '/treks/bali-pass' },
  { name: 'Himachal Pradesh', count: 22, price: 8500, img: 'https://images.unsplash.com/photo-1586350977770-2598f1b6b7c8?w=390&h=500&fit=crop', href: '/treks/hampta-pass' },
  { name: 'Uttarakhand', count: 16, price: 7000, img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=390&h=500&fit=crop', href: '/treks/valley-of-flowers' },
  { name: 'Meghalaya', count: 8, price: 12000, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=390&h=500&fit=crop', href: '/treks' },
  { name: 'Arunachal Pradesh', count: 6, price: 18000, img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=390&h=500&fit=crop', href: '/treks' },
  { name: 'Goa', count: 12, price: 12000, img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=390&h=500&fit=crop', href: '/treks' },
  { name: 'Kerala', count: 14, price: 11000, img: 'https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?w=390&h=500&fit=crop', href: '/treks' },
  { name: 'Rajasthan', count: 10, price: 14000, img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=390&h=500&fit=crop', href: '/treks' },
];

export default function CustomizedTours() {
  const [tab, setTab] = useState('International');
  const items = tab === 'International' ? international : india;
  return (
    <section className="py-8 lg:py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-6 lg:mb-8">
          <p className="text-[#ffaf21] font-semibold text-xs lg:text-sm tracking-widest uppercase mb-1">CUSTOMISED TOURS</p>
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
                className="group relative w-[220px] lg:w-auto rounded-2xl overflow-hidden shrink-0 bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                <div className="relative h-[280px] lg:h-[320px] overflow-hidden">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#ffaf21] text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full">
                    {d.count}+ Packages
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-lg text-white group-hover:text-[#ffaf21] transition-colors">{d.name}</h3>
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
          <Link href="/customized" className="text-[#ffaf21] text-sm font-semibold hover:text-[#d49400] transition-colors">View All Customized Tours &rarr;</Link>
        </div>
      </div>
    </section>
  );
}
