'use client';
import { useState } from 'react';
import { Check } from 'lucide-react';
import type { PricingTier } from '@/lib/data';

export default function PricingCards({ trekId, pricing, startEndPoint, groupSize }: { trekId: string; pricing: PricingTier[]; startEndPoint: string; groupSize: string }) {
  const [selected, setSelected] = useState(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto">
      {pricing.map((pkg, idx) => (
        <div key={pkg.name} onClick={() => setSelected(idx)} className={`relative bg-white rounded-2xl border-2 cursor-pointer transition-all p-6 lg:p-8 ${selected===idx?'border-[#359DFC] shadow-lg shadow-[#359DFC]/10':'border-gray-100 hover:border-gray-200 shadow-sm'}`}>
          {pkg.badge && <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold px-4 py-1.5 rounded-full ${pkg.badge==='Most Popular'?'bg-[#359DFC] text-white shadow-sm':pkg.badge==='Luxury'?'bg-[#1a1a2e] text-white':pkg.badge==='Budget'?'bg-[#29C80F] text-white':pkg.badge==='Budget Friendly'?'bg-[#29C80F] text-white':pkg.badge==='Best Value'?'bg-[#EA5939] text-white':'bg-gray-100 text-gray-800'} whitespace-nowrap`}>{pkg.badge}</div>}
          <div className="text-center mb-6 mt-2">
            <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-[#1a1a2e]">{pkg.name}</h3>
            <div className="mt-3">
              {pkg.originalPrice && <span className="text-sm text-gray-400 line-through mr-2">₹ {pkg.originalPrice.toLocaleString()}</span>}
              <span className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#1a1a2e]">₹ {pkg.price.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">per person</p>
            <p className="text-sm font-semibold text-[#29C80F] mt-2">Deposit: ₹ {pkg.deposit.toLocaleString()}</p>
          </div>

          <hr className="border-dashed border-gray-200 mb-4" />

          <ul className="space-y-2.5 mb-6">
            {pkg.inclusions.map((inc, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-[#29C80F] shrink-0 mt-0.5" />{inc}</li>
            ))}
          </ul>

          {pkg.exclusions.length > 0 && (
            <div className="border-t border-gray-100 pt-4 mb-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Not Included</p>
              <ul className="space-y-1.5">
                {pkg.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-400"><span className="text-red-400 shrink-0">✕</span>{exc}</li>
                ))}
              </ul>
            </div>
          )}

          <button onClick={() => {
            const params = new URLSearchParams({ pkg: pkg.name, trek: trekId, price: pkg.price.toString(), deposit: pkg.deposit.toString() });
            window.location.href = `/booking/${trekId}?${params}`;
          }} className={`w-full py-3 rounded-full font-semibold text-sm transition-all ${selected===idx?'bg-[#359DFC] hover:bg-[#1a7de0] text-white shadow-sm':'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
            Book {pkg.name}
          </button>
        </div>
      ))}
    </div>
  );
}
