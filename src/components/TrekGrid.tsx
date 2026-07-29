'use client';
import { useState } from 'react';
import Link from 'next/link';
import TrekCard from './TrekCard';
import type { Trek } from '@/lib/data';

export default function TrekGrid({ title, treks: allTreks, viewAll }: { title: string; treks: Trek[]; viewAll?: string }) {
  const tabs = [
    { label: 'All', filter: (t: Trek) => true },
    { label: 'Uttarakhand', filter: (t: Trek) => t.region === 'uttarakhand' },
    { label: 'Himachal', filter: (t: Trek) => t.region === 'himachal' },
    { label: 'Nepal', filter: (t: Trek) => t.region === 'nepal' },
  ];
  const [active, setActive] = useState(0);

  return (
    <section className="py-10 lg:py-16">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000]">{title}</h2>
          <div className="flex gap-1 p-1 bg-gray-100 rounded-xl overflow-x-auto">
            {tabs.map((t, i) => (
              <button key={t.label} onClick={() => setActive(i)}
                className={`px-4 lg:px-5 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${i===active?'bg-white text-[#000000] shadow-sm':'text-gray-500 hover:text-[#000000]'}`}>{t.label}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {allTreks.filter(tabs[active].filter).slice(0, 8).map(t => <TrekCard key={t.id} trek={t} />)}
        </div>
        {viewAll && <div className="mt-8 text-center">
          <Link href={viewAll} className="inline-flex items-center gap-2 text-[#ffaf21] hover:text-white font-semibold border-2 border-[#ffaf21] px-6 lg:px-8 py-3 rounded-full hover:bg-[#ffaf21] transition-all">
            View All {title}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>}
      </div>
    </section>
  );
}
