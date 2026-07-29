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
            <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000]">Sacred Yatras</h2>
            <p className="text-gray-500 text-sm mt-1">Spiritual journeys to Himalayan shrines</p>
          </div>
          <Link href="/yatra" className="text-sm font-medium text-[#ffaf21] hover:text-[#d49400] hidden lg:inline-flex items-center gap-1">View All Yatras <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {yatras.map(t => (
            <Link key={t.id} href={`/yatra/${t.id}`} className="group block rounded-2xl overflow-hidden transition-all duration-300 relative aspect-[3/4]">
              <img src={t.images[0]} alt={t.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-3 left-3"><span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#ffaf21] text-gray-900">Yatra</span></div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-800 px-2.5 py-1 rounded-full">{t.duration}</div>

              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                <h3 className="font-bold text-sm lg:text-base text-white leading-snug line-clamp-2 group-hover:text-[#ffaf21] transition-colors mb-2">{t.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-white/70 mb-1.5"><MapPin className="w-3.5 h-3.5 shrink-0" /><span className="truncate">{t.state}</span></div>
                <hr className="border-dashed border-white/20 my-2" />
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/70"><Clock className="w-3 h-3 inline mr-0.5" />{t.duration}</span>
                  <span className="text-xs font-medium text-[#ffaf21] bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full">{t.bestSeason}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-lg text-[#ffaf21]">₹ {Math.min(...t.pricing.map(p=>p.price)).toLocaleString()}</span>
                  <span className="flex items-center gap-1 text-xs text-white/70"><Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />{t.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
