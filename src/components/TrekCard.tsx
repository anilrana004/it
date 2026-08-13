import Link from 'next/link';
import { MapPin, Clock, Star } from 'lucide-react';
import { trekDetailPath, type Trek } from '@/lib/data';

export default function TrekCard({ trek }: { trek: Trek }) {
  const minPrice = Math.min(...trek.pricing.map(p => p.price));
  const hasDiscount = trek.pricing.some(p => p.originalPrice);
  const eco = trek.pricing.find(p => p.name === 'Economic');
  const originalPrice = eco?.originalPrice;

  return (
    <Link href={trekDetailPath(trek)} className="group block rounded-2xl overflow-hidden transition-all duration-300 relative aspect-[3/4]">
      <img src={trek.images[0]} alt={trek.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Ribbon badge - top left diagonal */}
      {trek.badge && (
        <div className="absolute top-0 left-0">
          <div className="relative">
            <div className="bg-[#16a34a] text-white text-[9px] font-bold px-6 py-1 -rotate-45 -translate-x-[18px] translate-y-[14px] text-center w-24 shadow-md">
              {trek.badge}
            </div>
          </div>
        </div>
      )}

      {/* Top right badges */}
      <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
        {trek.type === 'yatra' && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#16a34a] text-white shadow-sm">Yatra</span>}
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-gray-800 shadow-sm">{trek.duration}</span>
        {trek.difficulty && (
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/55 text-white backdrop-blur-sm shadow-sm">
            {trek.difficulty}
          </span>
        )}
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-5">
        <div className="flex items-center gap-1 text-[11px] text-white/70 mb-1">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{trek.state}</span>
          <span className="mx-1">·</span>
          <Clock className="w-3 h-3" />
          <span>{trek.duration}</span>
        </div>
        <h3 className="font-bold text-sm lg:text-base text-white leading-snug line-clamp-2 group-hover:text-[#16a34a] transition-colors mb-1.5">{trek.title}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(Number(trek.rating)) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
            ))}
          </div>
          <span className="text-[11px] text-white/70 font-medium">{trek.rating}</span>
          <span className="text-[10px] text-white/50">({trek.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-base lg:text-lg text-[#16a34a]">₹ {minPrice.toLocaleString()}</span>
            {originalPrice && originalPrice > minPrice && (
              <span className="text-[11px] text-white/50 line-through">₹{originalPrice.toLocaleString()}</span>
            )}
          </div>
          <span className="text-[10px] text-white/50">/person</span>
        </div>
      </div>
    </Link>
  );
}
