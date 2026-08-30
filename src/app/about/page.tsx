import Link from 'next/link';
import TeamSection from '@/components/about/TeamSection';
import OurJourney from '@/components/about/OurJourney';
import OurPackingList from '@/components/about/OurPackingList';
import AboutBrand from '@/components/about/AboutBrand';
import AboutVideoHero from '@/components/about/AboutVideoHero';
import WhyTravelWithUs from '@/components/about/WhyTravelWithUs';
import RecognitionCertifications from '@/components/about/RecognitionCertifications';
import AppreciationLetters from '@/components/about/AppreciationLetters';
import SupportHubPageShell from '@/components/support/SupportHubPageShell';
import { ABOUT_STATS } from '@/lib/about-content';

export default function AboutPage() {
  return (
    <SupportHubPageShell>
      <AboutVideoHero />

      <div className="pt-6 sm:pt-10 lg:pt-14">
        <AboutBrand />

        <div className="container mx-auto mt-4 mb-10 max-w-4xl px-4 sm:mt-6 sm:mb-14 lg:mb-16">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-10">
            {ABOUT_STATS.map((s) => (
              <div
                key={s.l}
                className="rounded-xl bg-gray-50 px-2 py-4 text-center sm:rounded-2xl sm:p-6"
              >
                <div className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#16a34a] sm:text-2xl lg:text-4xl">
                  {s.v}
                </div>
                <div className="mt-0.5 text-[10px] leading-snug text-gray-600 sm:text-sm">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <OurJourney />

      <div className="pb-16 lg:pb-20">
        <OurPackingList />
        <WhyTravelWithUs />
        <RecognitionCertifications />
        <AppreciationLetters />

        <div className="container mx-auto max-w-4xl px-4">
          <TeamSection />

          <div className="mt-2 px-2 text-center sm:mt-0 sm:px-0">
            <Link
              href="/contact"
              className="it-retro-pill-cta it-retro-pill-cta--case-normal"
            >
              Get in Touch
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </SupportHubPageShell>
  );
}
