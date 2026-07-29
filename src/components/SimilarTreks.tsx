import Link from 'next/link';
import { MapPin, Clock, Star, TrendingUp } from 'lucide-react';
import { treks, type Trek } from '@/lib/data';

export default function SimilarTreks({ currentId, type }: { currentId: string; type: 'trek' | 'yatra' }) {
  const similar = treks.filter(t => t.id !== currentId && t.type === type).slice(0, 3);

  if (similar.length === 0) return null;

  const accent = type === 'yatra' ? '#afde1e' : '#afde1e';

  return (
    <section className="mt-16 lg:mt-20">
      <div className="text-center mb-8">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#040921] mb-2">Similar {type === 'yatra' ? 'Yatras' : 'Treks'}</h2>
        <p className="text-gray-500 text-sm">Explore more {type === 'yatra' ? 'spiritual journeys' : 'adventures'} like this one</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {similar.map(t => {
          const minPrice = Math.min(...t.pricing.map(p => p.price));
          return (
            <Link key={t.id} href={`/${type === 'yatra' ? 'yatra' : 'treks'}/${t.id}`} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
              <div className="relative h-48 overflow-hidden">
                <img src={t.images[0]} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-xs font-bold px-2 py-1 rounded-full text-gray-900" style={{ backgroundColor: accent }}>{type === 'yatra' ? 'Yatra' : 'Trek'}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm lg:text-base text-[#040921] group-hover:text-[#afde1e] transition-colors line-clamp-1">{t.title}</h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{t.state}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t.duration}</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" />{t.rating}</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div><span className="text-lg font-bold text-[#040921]">₹{minPrice.toLocaleString()}</span><span className="text-xs text-gray-400 ml-1">/person</span></div>
                  <span className="text-xs font-semibold" style={{ color: accent }}>View Details →</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
