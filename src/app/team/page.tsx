import Link from 'next/link';
import { TEAM_INTRO, TEAM_ROSTER } from '@/lib/about-content';

/** Full roster content from https://indiantreks.in/about-us/ */
export default function TeamPage() {
  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      <div className="container mx-auto max-w-4xl">
        <Link href="/about#team" className="text-sm font-medium text-[#16a34a] hover:underline">
          ← Back to About
        </Link>
        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-[#000000]">
          Meet Our Team At Indiantreks
        </h1>
        <p className="mt-3 text-sm lg:text-base leading-relaxed text-gray-600">{TEAM_INTRO}</p>

        <section className="mt-10">
          <div className="mt-8 space-y-10">
            {TEAM_ROSTER.map((m) => (
              <article
                key={m.id}
                id={m.id}
                className="scroll-mt-28 grid grid-cols-[120px_1fr] gap-4 sm:gap-6 border-b border-gray-200 pb-10"
              >
                <div className="h-[120px] w-[120px] overflow-hidden rounded-sm bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.image}
                    alt={m.name}
                    width={120}
                    height={120}
                    className="h-full w-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#000000]">{m.name}</h2>
                  <p className="mt-0.5 text-sm text-[#16a34a] font-medium">{m.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{m.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
