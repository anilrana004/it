import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      <section className="relative h-[35vh] min-h-[250px] overflow-hidden mb-10">
        <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=600&fit=crop" alt="About" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
          <div className="container mx-auto"><h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white mb-2">About Indian Treks</h1><p className="text-gray-200 text-lg max-w-xl">India&apos;s Premier Himalayan Trek &amp; Yatra Community</p></div>
        </div>
      </section>
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          <div><h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000] mb-4">Our Story</h2><p className="text-gray-600 leading-relaxed mb-4">Indian Treks was born from a simple belief: the Himalayas have the power to transform perspectives, build meaningful connections, and create stories that last a lifetime.</p><p className="text-gray-600 leading-relaxed">Over the past decade, we&apos;ve grown from a small group of trekking enthusiasts into India&apos;s most trusted community for Himalayan treks and sacred yatras, curating thousands of unforgettable journeys across Uttarakhand, Himachal Pradesh, and Nepal.</p></div>
          <div className="rounded-2xl overflow-hidden"><img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=450&fit=crop" alt="Indian Treks community" className="w-full h-full object-cover" /></div>
        </div>
        <div className="grid grid-cols-3 gap-6 lg:gap-10 mb-16">
          {[{v:'80,000+',l:'Happy Travelers'},{v:'15,000+',l:'Curated Trips'},{v:'9+ Years',l:'Experience'}].map(s => <div key={s.l} className="text-center p-6 bg-gray-50 rounded-2xl"><div className="font-[family-name:var(--font-heading)] text-2xl lg:text-4xl font-bold text-[#16a34a] mb-1">{s.v}</div><div className="text-sm text-gray-600">{s.l}</div></div>)}
        </div>
        <div className="text-center"><Link href="/contact" className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-8 py-3.5 rounded-full transition-all">Get in Touch <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link></div>
      </div>
    </div>
  );
}
