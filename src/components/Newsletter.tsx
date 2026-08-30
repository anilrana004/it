'use client';
import { HOME_NEWSLETTER_SECTION } from '@/lib/content/home-newsletter';

export default function Newsletter() {
  return (
    <section className="py-12 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={HOME_NEWSLETTER_SECTION.backgroundImage} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#000000]/80" />
      </div>
      <div className="container mx-auto relative z-10 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">{HOME_NEWSLETTER_SECTION.title}</h2>
        <p className="text-white/70 text-sm lg:text-base mb-5">{HOME_NEWSLETTER_SECTION.subtitle}</p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder={HOME_NEWSLETTER_SECTION.placeholder} required
            className="flex-1 px-5 py-3.5 rounded-full outline-none text-sm text-gray-800 bg-white/90 backdrop-blur-sm placeholder:text-gray-400 border border-white/10 focus:border-[#16a34a] transition-colors" />
          <button type="submit" className="it-retro-pill-cta it-retro-pill-cta--case-normal">
            {HOME_NEWSLETTER_SECTION.submitLabel}
          </button>
        </form>
        <p className="text-white/40 text-xs mt-3">{HOME_NEWSLETTER_SECTION.disclaimer}</p>
      </div>
    </section>
  );
}
