'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Star, Clock, MapPin, Zap } from 'lucide-react';

const tabs = ['Bucket List Sale', 'Backpacking International', 'Biking Treks'];

const bucketList = [
  { title: 'Tawang Bike Trip and Backpacking Expedition', loc: 'Guwahati to Guwahati', dur: '8N/9D', price: 41000, origPrice: 0, rating: '4.8', rev: '10k+', img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=420&h=280&fit=crop', href: '/treks', badge: 'Bestseller' },
  { title: 'Meghalaya Kaziranga Backpacking Trip - Forests, Falls & Safari (6N/7D)', loc: 'Guwahati to Guwahati', dur: '6N/7D', price: 28000, origPrice: 0, rating: '4.8', rev: '10k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=420&h=280&fit=crop', href: '/treks', badge: '' },
  { title: 'All Girls Meghalaya Kaziranga Backpacking Trip - Scenic Trails (6N/7D)', loc: 'Guwahati to Guwahati', dur: '6N/7D', price: 28000, origPrice: 0, rating: '4.8', rev: '10k+', img: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=420&h=280&fit=crop', href: '/treks', badge: 'Bestseller' },
  { title: 'Kashmir Autumn Trip - 6N/7D Group Tour', loc: 'Srinagar to Srinagar', dur: '6N/7D', price: 30000, origPrice: 0, rating: '4.8', rev: '10k+', img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=420&h=280&fit=crop', href: '/treks', badge: 'New' },
];

const backpackingIntl = [
  { title: 'Thailand - Phuket Krabi Group Tour with Full Moon Party (6N/7D)', loc: 'Phuket to Phuket', dur: '6N/7D', price: 53500, origPrice: 57000, rating: '4.8', rev: '10k+', img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=420&h=280&fit=crop', href: '/treks/nepal-backpacking', badge: 'New' },
  { title: 'Bhutan Bike and Backpacking | 8 Days Bhutan Bike Tour', loc: 'Bagdogra to Bagdogra', dur: '7N/8D', price: 45000, origPrice: 0, rating: '4.8', rev: '10k+', img: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=420&h=280&fit=crop', href: '/treks', badge: '' },
  { title: 'Bali with Gili Island Group Tour - Ubud, Nusa Penida & Kuta (7N/8D)', loc: 'Bali Airport to Bali Airport', dur: '7N/8D', price: 53500, origPrice: 57000, rating: '4.8', rev: '10k+', img: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=420&h=280&fit=crop', href: '/treks', badge: '' },
  { title: 'Bhutan Tour with Phobjikha Valley - 8 Days', loc: 'Bagdogra to Siliguri', dur: '7N/8D', price: 45000, origPrice: 0, rating: '4.8', rev: '10k+', img: 'https://images.unsplash.com/photo-1543429257-3eb0b65d9c10?w=420&h=280&fit=crop', href: '/treks', badge: '' },
];

const bikingTreks = [
  { title: 'Spiti Valley Bike and Backpacking Trip', loc: 'Delhi to Delhi', dur: '9N/10D', price: 25000, origPrice: 0, rating: '4.8', rev: '8k+', img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=420&h=280&fit=crop', href: '/treks/hampta-pass', badge: '' },
  { title: 'Leh Ladakh Bike Trip From Srinagar with Hanle & Umling La', loc: 'Srinagar to Leh', dur: '11N/12D', price: 45000, origPrice: 0, rating: '4.9', rev: '10k+', img: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=420&h=280&fit=crop', href: '/treks/everest-base-camp', badge: '' },
];

const data: Record<string, typeof bucketList> = {
  'Bucket List Sale': bucketList,
  'Backpacking International': backpackingIntl,
  'Biking Treks': bikingTreks,
};

export default function BestSellers() {
  const [activeTab, setActiveTab] = useState('Bucket List Sale');
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
            <p className="text-[#ffaf21] font-semibold text-xs lg:text-sm tracking-widest uppercase mb-1">BEST SELLERS</p>
            <h2 className="text-xl lg:text-3xl font-bold text-[#000000]">Our Best Selling Trips</h2>
          </div>
          <Link href="/treks" className="text-[#ffaf21] text-sm font-semibold hover:text-[#d49400] whitespace-nowrap">View All Best Sellers &rarr;</Link>
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
                {t.badge && <span className="absolute top-2 left-2 bg-[#ffaf21] text-gray-900 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">{t.badge}</span>}
              </div>
              <div className="p-3 lg:p-4">
                <div className="flex items-center gap-1 text-gray-500 text-[10px] lg:text-xs mb-1"><MapPin className="w-3 h-3" />{t.loc}</div>
                <h3 className="font-semibold text-xs lg:text-base text-gray-900 group-hover:text-[#ffaf21] transition-colors line-clamp-2">{t.title}</h3>
                <div className="flex items-center gap-2 text-[11px] lg:text-xs text-gray-500 mt-1 mb-2">
                  <Clock className="w-3 h-3" />{t.dur}<span className="text-gray-300">|</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{t.rating} ({t.rev})
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#ffaf21] font-bold text-sm lg:text-base">₹{t.price.toLocaleString()}</span>
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
