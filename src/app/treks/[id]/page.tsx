import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Clock, Calendar, Star, ChevronLeft, Check, Shield, Users, TrendingUp, ArrowRight, Thermometer, Luggage, Info, Ban } from 'lucide-react';
import { treks } from '@/lib/data';
import BookingSection from '@/components/BookingSection';
import ItineraryTimeline from '@/components/ItineraryTimeline';
import PricingCards from '@/components/PricingCards';
import Gallery from '@/components/Gallery';
import DifficultyBadge from '@/components/DifficultyBadge';
import SimilarTreks from '@/components/SimilarTreks';

export default async function TrekDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trek = treks.find(t => t.id === id);
  if (!trek) notFound();

  const minPrice = Math.min(...trek.pricing.map(p => p.price));

  const quickInfo = [
    { icon: MapPin, label: 'Location', value: trek.location },
    { icon: Clock, label: 'Duration', value: trek.duration },
    { icon: TrendingUp, label: 'Max Altitude', value: trek.maxAltitude },
    { icon: Users, label: 'Group Size', value: trek.groupSize },
    { icon: Calendar, label: 'Best Season', value: trek.bestSeason },
    { icon: Thermometer, label: 'Difficulty', value: trek.difficulty },
    { icon: Star, label: 'Rating', value: `${trek.rating} (${trek.reviewCount})` },
  ];

  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      <section className="relative h-[50vh] min-h-[350px] lg:h-[65vh] overflow-hidden">
        <img src={trek.images[0]} alt={trek.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#359DFC] text-white">Trek</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white">{trek.difficulty}</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white">{trek.duration}</span>
              {trek.distance && <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white">{trek.distance}</span>}
            </div>
            <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white mb-2">{trek.title}</h1>
            <p className="text-gray-200 text-lg max-w-2xl">{trek.subtitle}</p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-white/80 text-sm">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#359DFC]" />{trek.state}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#359DFC]" />{trek.duration}</span>
              <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-[#359DFC]" />{trek.maxAltitude}</span>
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />{trek.rating} ({trek.reviewCount})</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto mt-8 lg:mt-10">
        <Link href="/treks" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#359DFC] mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Treks
        </Link>

        <Gallery images={trek.images} title={trek.title} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 mt-8 lg:mt-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#1a1a2e] mb-3">About the Trek</h2>
              <p className="text-gray-600 leading-relaxed">{trek.description}</p>
              {trek.brief && <p className="text-gray-500 text-sm mt-3 italic">{trek.brief}</p>}
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#1a1a2e] mb-4">Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {trek.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                    <div className="w-6 h-6 bg-[#359DFC]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#359DFC]" />
                    </div>
                    <span className="text-sm text-gray-700">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
              {quickInfo.map(i => (
                <div key={i.label} className="bg-gray-50 rounded-xl p-4 text-center">
                  <i.icon className="w-5 h-5 text-[#359DFC] mx-auto mb-1.5" />
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-0.5">{i.label}</p>
                  <p className="font-bold text-sm text-gray-900">{i.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 lg:p-6">
              <h3 className="font-bold text-base text-[#1a1a2e] mb-3">Difficulty Level</h3>
              <DifficultyBadge difficulty={trek.difficulty} />
              <p className="text-xs text-gray-500 mt-2">
                {trek.difficulty === 'Easy' && 'Suitable for beginners. Minimal prior experience needed.'}
                {trek.difficulty === 'Easy to Moderate' && 'Good for beginners with basic fitness. Some uphill sections.'}
                {trek.difficulty === 'Moderate' && 'Requires good fitness. Prior trekking experience recommended.'}
                {trek.difficulty === 'Moderate-Difficult' && 'Requires excellent fitness and some high-altitude experience.'}
                {trek.difficulty === 'Difficult' && 'For experienced trekkers. Requires excellent fitness and high-altitude experience.'}
              </p>
            </div>

            <div id="itinerary">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#1a1a2e] mb-6">Detailed Itinerary</h2>
              <ItineraryTimeline itinerary={trek.itinerary} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-green-800 mb-4">Inclusions</h3>
                <ul className="space-y-2.5">
                  {trek.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-red-800 mb-4">Exclusions</h3>
                <ul className="space-y-2.5">
                  {trek.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span className="w-4 h-4 text-red-500 shrink-0 mt-0.5 text-center leading-4">✕</span>
                      {exc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-[#FFF7ED] rounded-2xl p-6">
              <h3 className="font-bold text-lg text-[#EA5939] mb-4 flex items-center gap-2"><Luggage className="w-5 h-5" />Packing List</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Sturdy trekking shoes with good grip',
                  'Warm layers (fleece, down jacket)',
                  'Waterproof jacket & pants',
                  'Quick-dry t-shirts (3-4)',
                  'Trekking pants (2-3 pairs)',
                  'Warm sleeping bag liner',
                  'Sunscreen SPF 50+, sunglasses, hat',
                  'Headlamp with extra batteries',
                  'Water bottle (1L) with purification',
                  'Personal medical kit & prescribed meds',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-[#EA5939] shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-bold text-lg text-[#359DFC] mb-4 flex items-center gap-2"><Info className="w-5 h-5" />Know Before You Go</h3>
              <ul className="space-y-3">
                {[
                  'Carry a valid government ID (Aadhaar, Passport, or Driving License).',
                  'Mobile networks are limited/absent in high-altitude areas. Inform family beforehand.',
                  'Acclimatization is key — follow the leader\'s instructions for altitude management.',
                  'Avoid alcohol and smoking 24 hours before and during the trek.',
                  'Pack light — your backpack should not exceed 8-10 kg.',
                  'Weather in the mountains is unpredictable. Be prepared for sudden changes.',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className="w-5 h-5 bg-[#359DFC]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[#359DFC] text-xs font-bold">{i + 1}</span>
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-lg text-[#1a1a2e] mb-4 flex items-center gap-2"><Ban className="w-5 h-5" />Cancellation Policy</h3>
              <div className="space-y-3">
                {[
                  { label: '30+ days before departure', value: 'Full refund minus ₹500 processing fee' },
                  { label: '15-29 days before departure', value: '75% refund' },
                  { label: '7-14 days before departure', value: '50% refund' },
                  { label: '3-6 days before departure', value: '25% refund' },
                  { label: 'Less than 48 hours / No-show', value: 'No refund' },
                ].map((p, i) => (
                  <div key={i} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-gray-100">
                    <span className="text-sm text-gray-700">{p.label}</span>
                    <span className="text-sm font-semibold text-[#1a1a2e]">{p.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">Date change requests are subject to availability. Contact us for special cases.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#1a1a2e] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {trek.faq.map((f, i) => (
                  <details key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden group">
                    <summary className="p-4 lg:p-5 font-semibold text-sm lg:text-base text-gray-900 cursor-pointer list-none flex items-center justify-between">
                      {f.q}
                      <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="px-4 lg:px-5 pb-4 lg:pb-5"><p className="text-gray-600 text-sm leading-relaxed">{f.a}</p></div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="text-center mb-6">
                  <p className="text-gray-500 text-sm">Starting from</p>
                  <p className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-[#1a1a2e]">₹ {minPrice.toLocaleString()}</p>
                  <p className="text-gray-500 text-xs">per person</p>
                  <div className="flex items-center justify-center gap-1 mt-2 text-xs text-gray-400">
                    <Users className="w-3 h-3" /> Group of {trek.groupSize}
                  </div>
                </div>
                <div className="space-y-2">
                  <Link href="#pricing" className="w-full flex items-center justify-center gap-2 bg-[#359DFC] hover:bg-[#1a7de0] text-white font-semibold px-6 py-3.5 rounded-full transition-all shadow-sm">
                    Book Now <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="tel:+919999999999" className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-full hover:border-[#359DFC] hover:text-[#359DFC] transition-all">
                    Call to Book
                  </a>
                </div>
              </div>

              <div className="bg-[#1a1a2e] rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-4">Why Book With Us?</h3>
                <ul className="space-y-3">
                  {['Best price guarantee', 'Expert trek leaders', 'Safety first approach', 'Flexible payment options', '24/7 on-ground support'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <Shield className="w-4 h-4 text-[#29C80F] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl overflow-hidden border border-gray-100">
                <img src={trek.mapImage} alt="Route map" className="w-full h-40 object-cover" />
              </div>
            </div>
          </div>
        </div>

        <div id="pricing" className="mt-12 lg:mt-16">
          <div className="text-center mb-8">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#1a1a2e] mb-2">Choose Your Package</h2>
            <p className="text-gray-500 text-sm">Select the experience that suits you best</p>
          </div>
          <PricingCards trekId={trek.id} pricing={trek.pricing} startEndPoint={trek.startEndPoint} groupSize={trek.groupSize} />
        </div>

        <div id="book" className="mt-12 lg:mt-16">
          <BookingSection trek={trek} />
        </div>

        <SimilarTreks currentId={trek.id} type="trek" />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 lg:hidden z-40">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div>
            <p className="text-xs text-gray-500">Starting from</p>
            <p className="font-bold text-lg text-[#1a1a2e]">₹ {minPrice.toLocaleString()}<span className="text-xs text-gray-400 font-normal">/person</span></p>
          </div>
          <Link href="#pricing" className="bg-[#359DFC] hover:bg-[#1a7de0] text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-all shadow-sm">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
