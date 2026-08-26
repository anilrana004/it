import Link from 'next/link';
import TrekCard from '@/components/TrekCard';
import type { SpecialProgram } from '@/lib/special-programs-content';
import { treksForProgram } from '@/lib/special-programs-content';
import '@/components/landing/landing-trip-row.css';

export default function SpecialProgramPageView({ program }: { program: SpecialProgram }) {
  const list = treksForProgram(program);

  return (
    <div className="pb-12 lg:pb-20">
      <section className="relative h-[38vh] min-h-[240px] overflow-hidden mb-10">
        <img
          src={program.heroImage}
          alt={program.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/30 flex items-center">
          <div className="container mx-auto px-4">
            <p className="text-[#86efac] text-xs font-semibold tracking-widest uppercase mb-2">
              {program.eyebrow}
            </p>
            <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white mb-2">
              {program.title}
            </h1>
            <p className="text-white/80 text-sm lg:text-lg max-w-2xl">{program.lead}</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl">
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {program.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 text-sm text-gray-600"
            >
              <i className="fa-solid fa-check text-[#16a34a] mt-0.5 text-xs shrink-0" aria-hidden />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-gray-900">
              Recommended treks
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {list.length} hand-picked departures for this program
            </p>
          </div>
          <Link
            href="/special-programs"
            className="text-sm font-semibold text-[#16a34a] hover:text-[#15803d]"
          >
            All special programs →
          </Link>
        </div>

        {list.length > 0 ? (
          <div className="landing-trip-row">
            {list.map((trek) => <TrekCard key={trek.id} trek={trek} />)}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500 bg-white rounded-2xl border border-gray-100">
            New departures coming soon —{' '}
            <Link href="/contact" className="text-[#16a34a] font-semibold">contact us</Link> for
            custom dates.
          </div>
        )}
      </div>
    </div>
  );
}
