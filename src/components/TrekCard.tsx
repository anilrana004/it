import Link from 'next/link';
import { MapPin, Clock, Star } from 'lucide-react';
import type { Trek } from '@/lib/data';

export default function TrekCard({ trek }: { trek: Trek }) {
  const minPrice = Math.min(...trek.pricing.map(p => p.price));
  const hasDiscount = trek.pricing.some(p => p.originalPrice);
  const eco = trek.pricing.find(p => p.name === 'Economic');
  const originalPrice = eco?.originalPrice;

  return (
    <Link href={`/treks/${trek.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
      {/* Image with badges */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <img src={trek.images[0]} alt={trek.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {/* Gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Ribbon badge - top left diagonal */}
        {trek.badge && (
          <div className="absolute top-0 left-0">
            <div className="relative">
              <div className="bg-[#EA5939] text-white text-[9px] font-bold px-6 py-1 -rotate-45 -translate-x-[18px] translate-y-[14px] text-center w-24 shadow-md">
                {trek.badge}
              </div>
            </div>
          </div>
        )}

        {/* Top right badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          {trek.type === 'yatra' && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EA5939] text-white shadow-sm">Yatra</span>}
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-gray-800 shadow-sm">{trek.duration}</span>
        </div>

        {/* Difficulty badge */}
        <div className="absolute bottom-2 left-2">
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/50 text-white backdrop-blur-sm">{trek.difficulty}</span>
        </div>
      </div>

      {/* Card content */}
      <div className="p-3 lg:p-5">
        <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-1">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{trek.state}</span>
          <span className="mx-1">·</span>
          <Clock className="w-3 h-3" />
          <span>{trek.duration}</span>
        </div>
        <h3 className="font-bold text-sm lg:text-base text-gray-900 leading-snug line-clamp-2 group-hover:text-[#359DFC] transition-colors mb-1.5">{trek.title}</h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(Number(trek.rating)) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
            ))}
          </div>
          <span className="text-[11px] text-gray-500 font-medium">{trek.rating}</span>
          <span className="text-[10px] text-gray-400">({trek.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-base lg:text-lg text-gray-900">₹ {minPrice.toLocaleString()}</span>
            {originalPrice && originalPrice > minPrice && (
              <span className="text-[11px] text-gray-400 line-through">₹{originalPrice.toLocaleString()}</span>
            )}
          </div>
          <span className="text-[10px] text-gray-400">/person</span>
        </div>
      </div>
    </Link>
  );
}
