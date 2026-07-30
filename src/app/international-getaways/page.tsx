import Link from 'next/link';
import { MapPin, Star, Clock, CheckCircle2, ArrowRight, Globe, Plane } from 'lucide-react';

const cloud = 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_600,h_400,c_fill,g_auto/';

const treks = [
  { name: 'Everest Base Camp Trek', loc: 'Nepal', dur: '13D/12N', price: 74999, diff: 'Difficult', img: cloud, href: '/treks/everest-base-camp' },
  { name: 'Annapurna Base Camp Trek', loc: 'Nepal', dur: '8D/7N', price: 34999, diff: 'Moderate', img: cloud, href: '/treks/annapurna-base-camp' },
  { name: 'Annapurna Sanctuary Trek', loc: 'Nepal', dur: '10D/9N', price: 42999, diff: 'Moderate', img: cloud, href: '/treks/annapurna-base-camp' },
  { name: 'Nepal Backpacking Circuit', loc: 'Nepal', dur: '10D/9N', price: 34999, diff: 'Moderate', img: cloud, href: '/treks/nepal-backpacking' },
];

const tours = [
  { name: 'Kathmandu Valley Tour', loc: 'Nepal', dur: '5D/4N', price: 18999, diff: 'Easy', img: cloud, href: '/treks/kathmandu-tour' },
  { name: 'Pokhara Lake City', loc: 'Nepal', dur: '4D/3N', price: 15999, diff: 'Easy', img: cloud, href: '/treks/pokhara-tour' },
  { name: 'Chitwan Jungle Safari', loc: 'Nepal', dur: '4D/3N', price: 21999, diff: 'Easy', img: cloud, href: '/treks/chitwan-safari' },
];

const whyNepal = [
  'Visas on arrival for Indian citizens — no passport hassle',
  'Direct flights from Delhi, Mumbai, Kolkata to Kathmandu',
  'Rich cultural heritage with UNESCO World Heritage sites',
  'Some of the world\'s best trekking trails',
  'Warm Nepali hospitality and affordable luxury',
  'Indian Rupees widely accepted; easy currency exchange',
];

const steps = [
  { step: '01', title: 'Choose Your Adventure', desc: 'Browse our Nepal packages' },
  { step: '02', title: 'Plan with Experts', desc: 'Get personalized itinerary and travel advice' },
  { step: '03', title: 'Book with Ease', desc: 'Secure your spot with easy payment options' },
  { step: '04', title: 'Depart & Explore', desc: 'Experience Nepal with expert local guides' },
];

function DifficultyBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    Easy: 'bg-green-100 text-green-700',
    Moderate: 'bg-orange-100 text-orange-700',
    Difficult: 'bg-red-100 text-red-700',
  };
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors[level] || 'bg-gray-100 text-gray-600'}`}>{level}</span>;
}

export default function InternationalGetawaysPage() {
  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#000000] to-[#000000] py-10 lg:py-16 mb-10 lg:mb-16">
        <div className="container mx-auto text-center">
          <Globe className="inline-block text-[#ffaf21] w-10 h-10 lg:w-12 lg:h-12 mb-2" />
          <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white mb-3">International Getaways — Nepal & Beyond</h1>
          <p className="text-white/70 text-sm lg:text-lg max-w-2xl mx-auto">From the foothills of Everest to the jungles of Chitwan, embark on international adventures that will leave you breathless. Starting from ₹15,999.</p>
        </div>
      </section>

      <div className="container mx-auto">
        {/* Section 1: Trekking Expeditions */}
        <div className="mb-12 lg:mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">🏔️</span>
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000]">Trekking Expeditions</h2>
              <p className="text-gray-500 text-sm">Conquer legendary trails in the heart of the Himalayas</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {treks.map(d => (
              <Link key={d.name} href={d.href} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                <div className="relative h-44 lg:h-48 overflow-hidden">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm lg:text-base text-[#000000] group-hover:text-[#ffaf21] transition-colors">{d.name}</h3>
                    <DifficultyBadge level={d.diff} />
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{d.loc}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{d.dur}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[#ffaf21] font-bold text-sm lg:text-base">₹{d.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 group-hover:text-[#ffaf21] transition-colors flex items-center gap-1">View Details <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 2: Cultural & City Tours */}
        <div className="mb-12 lg:mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">🏛️</span>
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000]">Cultural & City Tours</h2>
              <p className="text-gray-500 text-sm">Explore ancient cities, tranquil lakes, and untamed wilderness</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {tours.map(d => (
              <Link key={d.name} href={d.href} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                <div className="relative h-44 lg:h-48 overflow-hidden">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm lg:text-base text-[#000000] group-hover:text-[#ffaf21] transition-colors">{d.name}</h3>
                    <DifficultyBadge level={d.diff} />
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{d.loc}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{d.dur}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[#ffaf21] font-bold text-sm lg:text-base">₹{d.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 group-hover:text-[#ffaf21] transition-colors flex items-center gap-1">View Details <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 3: Why Nepal? */}
        <div className="mb-12 lg:mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">🇳🇵</span>
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000]">Why Nepal?</h2>
              <p className="text-gray-500 text-sm">Everything you need for an unforgettable international getaway</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6 lg:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {whyNepal.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#ffaf21] mt-0.5 shrink-0" />
                  <span className="text-sm lg:text-base text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Process */}
        <div className="mb-12 lg:mb-20">
          <h2 className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-[#000000] text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(s => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-[#ffaf21] text-gray-900 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">{s.step}</div>
                <h3 className="font-bold text-sm lg:text-base text-[#000000] mb-1.5">{s.title}</h3>
                <p className="text-gray-500 text-xs lg:text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#000000] to-[#1a1a1a] rounded-2xl p-8 lg:p-12 text-center text-white">
          <Plane className="inline-block text-[#ffaf21] w-8 h-8 lg:w-10 lg:h-10 mb-3" />
          <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mb-2">Ready for an International Escape?</h2>
          <p className="text-white/70 text-sm lg:text-base mb-6 max-w-lg mx-auto">Get in touch with our travel experts and start planning your Nepal adventure today.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+919999999999" className="inline-flex items-center gap-2 bg-[#ffaf21] text-[#000000] font-semibold px-8 py-3 rounded-full hover:bg-[#ffaf21]/90 transition-all text-sm">Call +91 99 99 99 99 99</a>
            <a href="mailto:hello@trekroot.com" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/20 transition-all text-sm">Email Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
