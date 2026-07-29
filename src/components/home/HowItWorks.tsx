import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const steps = [
  { n: '01', icon: '🔍', title: 'Choose Your Trip', desc: 'Browse our curated treks, yatras, and adventure tours. Filter by region, difficulty, and season to find your perfect match.', color: 'from-[#359DFC] to-[#1a7de0]' },
  { n: '02', icon: '💳', title: 'Book & Pay Later', desc: 'Reserve your spot with just a ₹799 deposit. Pay the rest in installments or in full — your journey, your pace.', color: 'from-[#29C80F] to-emerald-500' },
  { n: '03', icon: '🎒', title: 'Go on Adventure', desc: 'Meet fellow trekkers, follow expert guides, and make memories for a lifetime. We handle everything — you just explore.', color: 'from-[#EA5939] to-orange-500' },
];

export default function HowItWorks() {
  return (
    <section className="py-8 lg:py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-10 lg:mb-12">
          <p className="text-[#359DFC] font-semibold text-xs lg:text-sm tracking-widest uppercase mb-1">HOW IT WORKS</p>
          <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#1a1a2e] mb-2">3 Steps to Your Next Adventure</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">From choosing to booking to exploring — we make it simple.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((s, i) => (
            <div key={s.n} className="relative bg-gray-50 rounded-2xl p-6 lg:p-8 group hover:shadow-xl transition-all duration-300">
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${s.color} rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="text-5xl mb-4">{s.icon}</div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`bg-gradient-to-r ${s.color} text-white font-bold text-sm w-10 h-10 rounded-full flex items-center justify-center`}>{s.n}</span>
                <h3 className="font-[family-name:var(--font-heading)] font-bold text-lg text-[#1a1a2e]">{s.title}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              <Link href="/treks" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#359DFC] hover:text-[#1a7de0] transition-colors">
                Explore Treks <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
