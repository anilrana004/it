'use client';

import Link from 'next/link';
import { CalendarDays, Info } from 'lucide-react';
import { difficultyTone, type ListingTrek } from '@/lib/treks-listing';

/** Indiahikes-style trek card for mobile carousels & curated sections. */
export default function TrekInfoCard({
  trek,
  fill = false,
}: {
  trek: ListingTrek;
  /** Stretch to grid cell instead of fixed carousel width */
  fill?: boolean;
}) {
  const meta = `${trek.days} Days · ${trek.difficulty} · ${trek.maxAltitude}`;

  return (
    <article
      className={
        fill
          ? 'flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm'
          : 'flex h-full w-[78vw] max-w-[300px] shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm sm:w-[280px]'
      }
    >
      <Link href={trek.href} className="relative block aspect-[16/11] overflow-hidden bg-gray-100">
        <img
          src={trek.cover}
          alt={trek.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        {trek.badge && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-[#16a34a] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            {trek.badge}
          </span>
        )}
        <div className="absolute bottom-2.5 left-2.5 right-2.5">
          <span
            className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm ${difficultyTone(trek.difficulty)}`}
          >
            {trek.difficulty}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3.5">
        <p className="text-[11px] font-medium leading-snug text-gray-500">{meta}</p>
        <Link href={trek.href} className="mt-1.5 block">
          <h3 className="text-[15px] font-bold leading-snug text-gray-900">{trek.title}</h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 flex-1 text-[12px] leading-relaxed text-gray-500">
          {trek.subtitle}
        </p>

        <div className="mt-3.5 grid grid-cols-2 gap-2">
          <Link
            href={trek.href}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-[#16a34a] px-2 text-[12px] font-semibold text-[#166534] transition-colors hover:bg-[#f0fdf4]"
          >
            <Info className="h-3.5 w-3.5" />
            Get Trek Info
          </Link>
          <Link
            href={`${trek.href}#departures`}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#16a34a] px-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#15803d]"
          >
            <CalendarDays className="h-3.5 w-3.5" />
            View Dates
          </Link>
        </div>
      </div>
    </article>
  );
}
