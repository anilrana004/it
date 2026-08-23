'use client';

import TrekInfoCard from '@/components/treks/TrekInfoCard';
import type { ListingTrek } from '@/lib/treks-listing';

export default function TrekCuratedSection({
  title,
  info,
  treks,
}: {
  title: string;
  info: string;
  treks: ListingTrek[];
}) {
  if (treks.length === 0) return null;

  return (
    <section className="py-6 lg:py-8">
      <div className="mb-3 px-0 lg:mb-4">
        <h2 className="text-xl font-bold leading-tight text-gray-900 lg:text-2xl">{title}</h2>
        <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-gray-600 sm:text-sm">
          {info}
        </p>
      </div>

      <div
        className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-none snap-x snap-mandatory lg:mx-0 lg:gap-4 lg:px-0"
        style={{ scrollbarWidth: 'none' }}
      >
        {treks.map((t) => (
          <div key={t.id} className="snap-start">
            <TrekInfoCard trek={t} />
          </div>
        ))}
      </div>
    </section>
  );
}
