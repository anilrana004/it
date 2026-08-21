import Link from 'next/link';
import { TEAM_INTRO, TEAM_LEADERS } from '@/lib/about-content';

/** Team content from https://indiantreks.in/about-us/ — Meet Our Team At Indiantreks */
export default function TeamSection() {
  return (
    <section id="team" className="mb-12 scroll-mt-24 sm:mb-16 sm:scroll-mt-28">
      <div className="mb-6 sm:mb-8">
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#000000] sm:text-2xl lg:text-3xl">
          Meet Our Team At Indiantreks
        </h2>
        <div className="mt-2 h-px w-full bg-gray-200" />
        <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:mt-4">{TEAM_INTRO}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3 md:gap-8">
        {TEAM_LEADERS.map((member) => (
          <article
            key={member.id}
            className="flex flex-col items-center text-center sm:items-start sm:text-left"
          >
            <div className="mb-3 h-[120px] w-[120px] overflow-hidden rounded-sm bg-gray-100 sm:mb-4 sm:h-[140px] sm:w-[140px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.image}
                alt={member.name}
                width={140}
                height={140}
                className="h-full w-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="text-base font-bold text-[#000000]">{member.name}</h3>
            <p className="mt-0.5 text-sm text-gray-600">{member.role}</p>
            <p className="mt-3 line-clamp-5 text-sm leading-relaxed text-gray-600 sm:line-clamp-6">
              {member.bio}
            </p>
            <Link
              href={`/team#${encodeURIComponent(member.id)}`}
              title={member.name}
              className="mt-3 text-sm font-medium text-[#16a34a] hover:text-[#15803d] hover:underline"
            >
              Read More...
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-8 flex justify-center sm:mt-10">
        <Link
          href="/team"
          title="our team"
          className="inline-flex w-full max-w-sm items-center justify-center border border-[#16a34a] bg-[#16a34a] px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#15803d] sm:w-auto sm:max-w-none sm:px-9 sm:py-2.5"
        >
          MEET THE REST OF THE TEAM
        </Link>
      </div>
    </section>
  );
}
