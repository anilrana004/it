'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Star, Clock, MapPin, TrendingUp, Flame } from 'lucide-react';
import { photos } from '@/lib/media';

const filters = ['All Trending', 'Trekking', 'Yatra', 'International', 'Weekend'];

const trending = [
  { title: 'Valley of Flowers Trek', loc: 'Joshimath – Rishikesh', dur: '6D/5N', price: 8999, rating: '4.8', rev: '8k+', img: photos.vof, href: '/treks/valley-of-flowers', tag: 'Trekking' },
  { title: 'Kedarkantha Trek', loc: 'Sankri – Dehradun', dur: '5D/4N', price: 6999, rating: '4.9', rev: '10k+', img: photos.kedarkantha, href: '/treks/kedarkantha', tag: 'Trekking' },
  { title: 'Everest Base Camp', loc: 'Lukla – Lukla', dur: '13D/12N', price: 74999, rating: '4.9', rev: '20k+', img: photos.ebc, href: '/treks/everest-base-camp', tag: 'International' },
  { title: 'Annapurna Base Camp', loc: 'Pokhara – Pokhara', dur: '8D/7N', price: 34999, rating: '4.9', rev: '15k+', img: photos.nepal, href: '/treks/annapurna-base-camp', tag: 'International' },
  { title: 'Hampta Pass Trek', loc: 'Manali – Manali', dur: '5D/4N', price: 8499, rating: '4.7', rev: '8k+', img: photos.hampta, href: '/treks/hampta-pass', tag: 'Trekking' },
  { title: 'Kedarnath Yatra', loc: 'Rishikesh – Rishikesh', dur: '6D/5N', price: 9999, rating: '4.8', rev: '12k+', img: photos.yatra, href: '/yatra/kedarnath-yatra', tag: 'Yatra' },
  { title: 'Triund Trek', loc: 'Mcleodganj – Mcleodganj', dur: '3D/2N', price: 2499, rating: '4.6', rev: '15k+', img: photos.triund, href: '/treks/mcleodganj-trek', tag: 'Weekend' },
  { title: 'Chopta Tungnath', loc: 'Rishikesh – Rishikesh', dur: '4D/3N', price: 5999, rating: '4.7', rev: '7k+', img: photos.chopta, href: '/treks/chopta-tungnath', tag: 'Trekking' },
  { title: 'Har Ki Dun Trek', loc: 'Dehradun – Dehradun', dur: '6D/5N', price: 8999, rating: '4.8', rev: '5k+', img: photos.uttarakhand, href: '/treks/har-ki-dun', tag: 'Trekking' },
  { title: 'Do Dham Yatra', loc: 'Rishikesh – Rishikesh', dur: '7D/6N', price: 14999, rating: '4.8', rev: '8k+', img: photos.yatra, href: '/yatra/do-dham', tag: 'Yatra' },
  { title: 'Dayara Bugyal Trek', loc: 'Rishikesh – Rishikesh', dur: '5D/4N', price: 6999, rating: '4.7', rev: '6k+', img: photos.uttarakhand, href: '/treks/dayara-bugyal', tag: 'Trekking' },
  { title: 'Bhrigu Lake Trek', loc: 'Manali – Manali', dur: '3D/2N', price: 4999, rating: '4.6', rev: '6k+', img: photos.himachal, href: '/treks/bhrigu-lake', tag: 'Weekend' },
  { title: 'Kheerganga Trek', loc: 'Kasol – Kasol', dur: '3D/2N', price: 3499, rating: '4.5', rev: '8k+', img: photos.himachal, href: '/treks/kheerganga', tag: 'Weekend' },
  { title: 'Nepal Backpacking Circuit', loc: 'Kathmandu – Kathmandu', dur: '10D/9N', price: 34999, rating: '4.8', rev: '6k+', img: photos.nepal, href: '/treks/nepal-backpacking', tag: 'International' },
  { title: 'Char Dham Yatra', loc: 'Rishikesh – Rishikesh', dur: '12D/11N', price: 24999, rating: '4.9', rev: '6k+', img: photos.kedarnath, href: '/yatra/char-dham', tag: 'Yatra' },
  { title: 'Kuari Pass Trek', loc: 'Rishikesh – Rishikesh', dur: '6D/5N', price: 9999, rating: '4.8', rev: '7k+', img: photos.uttarakhand, href: '/treks/kuari-pass', tag: 'Trekking' },
];

export default function TrendingPage() {
  const [filter, setFilter] = useState('All Trending');
  const filtered = filter === 'All Trending' ? trending : trending.filter(t => t.tag === filter);
  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      <section className="bg-gradient-to-r from-[#000000] to-[#000000] py-10 lg:py-16 mb-8 lg:mb-12">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Flame className="w-6 h-6 lg:w-8 lg:h-8 text-[#16a34a]" />
            <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white">Trending Destinations</h1>
          </div>
          <p className="text-white/70 text-sm lg:text-lg max-w-xl mx-auto">Discover the most popular adventures our travelers are raving about right now</p>
        </div>
      </section>

      <div className="container mx-auto">
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 mb-6">
          {filters.map(f => (
            <button key={f} type="button" onClick={() => setFilter(f)}
              className={`shrink-0 px-5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all ${filter === f ? 'bg-[#000000] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{f}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filtered.map(t => (
            <Link key={t.title} href={t.href} className="group rounded-xl overflow-hidden transition-all relative aspect-[4/5]">
              <img src={t.img} alt={t.title} referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-full text-[#16a34a] flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {t.tag}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
                <div className="flex items-center gap-1 text-white/70 text-[10px] lg:text-xs mb-1"><MapPin className="w-3 h-3" />{t.loc}</div>
                <h3 className="font-semibold text-sm lg:text-base text-white group-hover:text-[#16a34a] transition-colors line-clamp-1">{t.title}</h3>
                <div className="flex items-center gap-2 text-[10px] lg:text-xs text-white/60 mt-1">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t.dur}</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{t.rating} ({t.rev})</span>
                </div>
                <div className="mt-2 text-[#86efac] font-bold text-sm">₹{t.price.toLocaleString()}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
