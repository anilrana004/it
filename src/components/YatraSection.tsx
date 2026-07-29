import Link from 'next/link';
import { MapPin, Clock, Star } from 'lucide-react';
import { treks } from '@/lib/data';

const yatras = treks.filter(t => t.type === 'yatra');

export default function YatraSection() {
  return (
    <section className="py-10 lg:py-16">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#1a1a2e]">Sacred Yatras</h2>
            <p className="text-gray-500 text-sm mt-1">Spiritual journeys to Himalayan shrines</p>
          </div>
          <Link href="/yatra" className="text-sm font-medium text-[#359DFC] hover:text-[#1a7de0] hidden lg:inline-flex items-center gap-1">View All Yatras <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {yatras.map(t => (
            <Link key={t.id} href={`/yatra/${t.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden aspect-[3/4]">
                <img src={t.images[0]} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3"><span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#EA5939] text-white">Yatra</span></div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-800 px-2.5 py-1 rounded-full">{t.duration}</div>
              </div>
              <div className="p-4 lg:p-5">
                <h3 className="font-bold text-sm lg:text-base text-gray-900 leading-snug line-clamp-2 group-hover:text-[#359DFC] transition-colors mb-2">{t.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5"><MapPin className="w-3.5 h-3.5 shrink-0" /><span className="truncate">{t.state}</span></div>
                <hr className="border-dashed border-gray-200 my-2" />
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500"><Clock className="w-3 h-3 inline mr-0.5" />{t.duration}</span>
                  <span className="text-xs font-medium text-[#EA5939] bg-[#EA5939]/5 px-2 py-0.5 rounded-full">{t.bestSeason}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-lg text-gray-900">₹ {Math.min(...t.pricing.map(p=>p.price)).toLocaleString()}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-500"><Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />{t.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
