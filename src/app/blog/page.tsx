import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
const blogs = [
  { t: '5 Essential Tips for Your First Himalayan Trek', img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=250&fit=crop', d: '15 Jul', r: '8 min', h: '/blog/first-himalayan-trek' },
  { t: 'Complete Guide to Char Dham Yatra 2026', img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop', d: '10 Jul', r: '12 min', h: '/blog/char-dham-guide' },
  { t: 'Valley of Flowers: A Blooming Paradise', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop', d: '5 Jul', r: '6 min', h: '/blog/valley-of-flowers-guide' },
  { t: 'Why Group Travel is Best for Himalayas', img: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=400&h=250&fit=crop', d: '28 Jun', r: '7 min', h: '/blog/group-travel' },
  { t: 'Everest Base Camp: Complete Preparation Guide', img: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=250&fit=crop', d: '20 Jun', r: '15 min', h: '/blog/ebc-guide' },
  { t: 'Kedarkantha: India\'s Best Winter Trek', img: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&h=250&fit=crop', d: '15 Jun', r: '6 min', h: '/blog/kedarkantha-guide' },
];
export default function BlogPage() {
  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      <section className="relative h-[30vh] min-h-[220px] overflow-hidden mb-10">
        <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&h=500&fit=crop" alt="Blog" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
          <div className="container mx-auto"><h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white mb-2">Our Blog</h1><p className="text-gray-200 text-lg">Travel stories, guides, and inspiration</p></div>
        </div>
      </section>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((b,i) => (
            <Link key={i} href={b.h} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="relative h-48 overflow-hidden"><img src={b.img} alt={b.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <div className="p-5"><div className="flex items-center gap-3 text-xs text-gray-500 mb-2"><span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{b.d}</span><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{b.r}</span></div><h3 className="font-semibold text-gray-900 leading-snug line-clamp-3 group-hover:text-[#359DFC] transition-colors">{b.t}</h3></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
