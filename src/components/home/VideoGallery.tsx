'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';

const videos = Array.from({length: 22}, (_, i) => ({
  thumb: ['https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b','https://images.unsplash.com/photo-1486911278844-a81c5267e227','https://images.unsplash.com/photo-1586350977770-2598f1b6b7c8','https://images.unsplash.com/photo-1469474968028-56623f02e42e','https://images.unsplash.com/photo-1551632811-561732d1e306','https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9','https://images.unsplash.com/photo-1506905925346-21bda4d32df4','https://images.unsplash.com/photo-1524492412937-b28074a5d7da','https://images.unsplash.com/photo-1454496522488-7a8e488e8606','https://images.unsplash.com/photo-1543429257-3eb0b65d9c10'][i % 10],
  title: ['Valley of Flowers','Kedarkantha Summit','Hampta Pass','Kedarnath Yatra','Triund Trek','Everest Base Camp','Chopta Tungnath','Badrinath Yatra','Spiti Valley','Nepal Yatra'][i % 10],
  id: `v${i}`
}));

const popularTrips = [
  { name: 'Bhutan Bike and Backpacking | 8 Days Bhutan Bike Tour', rating: '4.8', rev: '8k+', img: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=500&h=500&fit=crop', href: '/treks' },
  { name: 'Spiti Valley Bike and Backpacking Trip', rating: '4.8', rev: '8k+', img: 'https://images.unsplash.com/photo-1586350977770-2598f1b6b7c8?w=500&h=500&fit=crop', href: '/treks/hampta-pass' },
  { name: 'Bali with Gili Island Group Tour - Ubud, Nusa Penida & Kuta (7N/8D)', rating: '4.8', rev: '8k+', img: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=500&h=500&fit=crop', href: '/treks' },
  { name: 'Valley of Flowers Trek', rating: '4.8', rev: '8k+', img: 'https://res.cloudinary.com/pg8uhzw0/image/upload/f_auto,q_auto,w_500,h_500,c_fill,g_auto/v1785367489/pexels-unaizat97-8673607_anl07u.jpg', href: '/treks/valley-of-flowers' },
  { name: 'Thailand - Phuket Krabi Group Tour with Full Moon Party (6N/7D)', rating: '4.8', rev: '8k+', img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=500&fit=crop', href: '/treks/nepal-backpacking' },
  { name: 'Leh Ladakh Bike Trip From Srinagar with Hanle & Umling La', rating: '4.8', rev: '8k+', img: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=500&h=500&fit=crop', href: '/treks/everest-base-camp' },
  { name: 'Road Trip to Spiti Valley', rating: '4.8', rev: '8k+', img: 'https://images.unsplash.com/photo-1586350977770-2598f1b6b7c8?w=500&h=500&fit=crop', href: '/treks/hampta-pass' },
  { name: 'Leh to Leh Bike Trip with Hanle Umling La Tso Moriri', rating: '4.8', rev: '8k+', img: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=500&h=500&fit=crop', href: '/treks/everest-base-camp' },
  { name: 'Zanskar Valley Expedition', rating: '4.8', rev: '8k+', img: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=500&h=500&fit=crop', href: '/treks/bali-pass' },
  { name: 'Hampta Pass Trek', rating: '4.8', rev: '8k+', img: 'https://images.unsplash.com/photo-1586350977770-2598f1b6b7c8?w=500&h=500&fit=crop', href: '/treks/hampta-pass' },
];

export default function VideoGallery() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? popularTrips : popularTrips.slice(0, 4);
  return (
    <section className="py-8 lg:py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-6 lg:mb-8">
          <p className="text-[#ffaf21] font-semibold text-xs lg:text-sm tracking-widest uppercase mb-1">VIDEOS</p>
          <h2 className="text-xl lg:text-3xl font-bold text-[#000000]">Memories for Life</h2>
          <p className="text-gray-500 text-xs lg:text-sm mt-1">50+ Videos from our travelers</p>
        </div>
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-3 mb-8 lg:mb-10">
          {videos.map(v => (
            <div key={v.id} className="group relative rounded-lg overflow-hidden cursor-pointer aspect-[3/2]">
              <img src={v.thumb} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-3.5 h-3.5 lg:w-5 lg:h-5 text-[#000000] ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
          {visible.map(t => (
            <Link key={t.name} href={t.href} className="group text-center">
              <div className="aspect-square rounded-xl overflow-hidden mb-2">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-[11px] lg:text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-[#ffaf21] transition-colors">{t.name}</h3>
              <div className="flex items-center justify-center gap-1 text-[10px] lg:text-xs text-gray-500 mt-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{t.rating} Rating
              </div>
            </Link>
          ))}
        </div>
        {!showAll && popularTrips.length > 4 && (
          <div className="text-center mt-5">
            <button onClick={() => setShowAll(true)} className="text-[#ffaf21] text-sm font-semibold hover:text-[#d49400] transition-colors">View All Videos &rarr;</button>
          </div>
        )}
      </div>
    </section>
  );
}
