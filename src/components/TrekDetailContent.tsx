'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, Clock, Star, ChevronLeft, Check, Shield, Users, TrendingUp, Thermometer, Calendar, Info, Ban, ArrowRight, ChevronDown, Phone, Mail, Navigation, Mountain, Heart, Award, ChefHat, Bed, Minus, Plus, Plane, ExternalLink, Dot, Sparkles, SunSnow, Tent, Trees, Footprints, Cable, MountainSnow, SunMedium } from 'lucide-react';
import type { Trek } from '@/lib/data';
import Gallery from '@/components/Gallery';
import SimilarTreks from '@/components/SimilarTreks';

const navLinks = [
  { id: 'overview', label: 'Overview' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'in-ex', label: 'Inclusions' },
  { id: 'preparation', label: 'Preparation' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
];

const packingData = {
  clothing: [
    'Thermal inner layers for upper and lower body',
    'Fleece or padded mid-layer jacket',
    'Water-resistant outer jacket and trekking pants',
    'Woollen cap, sun cap, gloves, and extra socks',
  ],
  gear: [
    'Good trekking shoes with ankle grip and sole traction',
    'Backpack with rain cover and small day pouch if needed',
    'Headlamp / torch with spare batteries',
    'Reusable water bottles / hydration support',
  ],
  personal: [
    'Sunscreen, lip balm, sunglasses, and basic toiletries',
    'Personal medicines and small health kit',
    'Power bank and charging cable',
    'ID proof and cash for small local expenses',
  ],
};

const fitnessData = [
  { focus: 'Cardio Endurance', practice: 'Brisk walking, stair climbing, jogging, cycling, or incline treadmill work', freq: '4-5 days / week' },
  { focus: 'Leg Strength', practice: 'Squats, lunges, step-ups, calf raises, and controlled bodyweight training', freq: '3-4 days / week' },
  { focus: 'Core Stability', practice: 'Planks, side planks, and basic mobility work for better balance on trail', freq: '3 days / week' },
  { focus: 'Loaded Walks', practice: 'Walking with a light backpack to simulate trekking effort', freq: '1-2 days / week' },
];

const medicalData = [
  { point: 'Pre-existing Condition', what: 'Inform the organiser in advance if you have asthma, heart issues, blood pressure concerns, or any major medical history.' },
  { point: 'Personal Medication', what: 'Carry all prescribed medicines in adequate quantity and keep them easily accessible during both road and trek days.' },
  { point: 'Hydration & Nutrition', what: 'Stay hydrated and avoid skipping meals before and during the trek to maintain energy levels and reduce fatigue.' },
  { point: 'Cold Protection', what: 'Layering properly is essential to avoid discomfort, energy loss, and cold-related exhaustion in winter conditions.' },
  { point: 'Doctor Consultation', what: 'If unsure about your fitness or health, take medical advice before booking or before departure.' },
];

const policyData = [
  {
    id: 'booking',
    label: 'Booking',
    items: [
      'Bookings are confirmed only after the required advance payment is received.',
      'Full payment should be completed within the timeline communicated by the organiser.',
      'Participants must provide accurate personal information, emergency contact details, and any relevant health declaration before departure.',
      'The organiser reserves the right to change logistics, stays, transport sequencing, or movement plans due to operational or safety reasons.',
    ],
  },
  {
    id: 'refund',
    label: 'Refund / Cancellation',
    items: [
      'Cancellation charges may apply depending on how close the cancellation is to the departure date.',
      'Any non-refundable bookings, permits, reserved transport, or accommodation advances may be deducted where applicable.',
      'No refund is generally applicable for no-show, voluntary exit, or personal discomfort after the journey has begun.',
      'In case of weather, road, political, or force majeure disruptions, refund decisions depend on actual recoverable costs.',
    ],
  },
  {
    id: 'terms',
    label: 'Terms & Conditions',
    items: [
      'Trekking in the Himalaya involves natural risks, changing weather, uneven terrain, and remote conditions.',
      'All participants are expected to follow the instructions of the trek leader and support team throughout the journey.',
      'The organiser may remove a participant if behaviour risks group safety, discipline, or expedition flow.',
      'Every trekker is responsible for carrying the required clothing, fitness level, and personal medicines suitable for the trek.',
    ],
  },
];

const howToReachData = [
  {
    title: 'From Dehradun',
    desc: 'Dehradun is the primary assembly point and the most convenient gateway.',
    steps: [
      { num: 1, text: 'Reach Dehradun by train, bus, or flight (Jolly Grant Airport). It is well connected to major cities like Delhi.' },
      { num: 2, text: 'Drive to the base village (approx. 8-10 hours) via scenic mountain roads. The route offers stunning views of rivers, valleys, and forested hills.' },
      { num: 3, text: 'Arrive and rest at the base village. Proper rest is recommended before starting the trek.' },
    ],
  },
  {
    title: 'From Base Village',
    desc: 'The base village is where the expedition begins and all preparations are completed.',
    steps: [
      { num: 1, text: 'Reach the designated guesthouse or campsite where groups assemble.' },
      { num: 2, text: 'Attend the trek briefing session, complete gear checks, and understand the route and safety guidelines.' },
      { num: 3, text: 'After settling in and acclimatizing, the trek usually begins the following morning towards the first campsite.' },
    ],
  },
];

export default function TrekDetailContent({ trek, type }: { trek: Trek; type: 'trek' | 'yatra' }) {
  const isTrek = type === 'trek';
  const accent = '#ffaf21';
  const badgeText = isTrek ? 'Trek' : 'Yatra';
  const backHref = isTrek ? '/treks' : '/yatra';
  const similarType = isTrek ? 'trek' : 'yatra';

  const [activeSection, setActiveSection] = useState('overview');
  const [expandedOverview, setExpandedOverview] = useState(false);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());
  const [prepTab, setPrepTab] = useState<'pack' | 'fitness' | 'medical'>('pack');
  const [policyTab, setPolicyTab] = useState('booking');
  const [men, setMen] = useState(1);
  const [women, setWomen] = useState(0);
  const [pickup, setPickup] = useState('Dehradun');
  const [navVisible, setNavVisible] = useState(false);
  const router = useRouter();

  const minPrice = Math.min(...trek.pricing.map(p => p.price));
  const bookNow = (pkg?: string) => {
    const params = pkg ? `?pkg=${encodeURIComponent(pkg)}` : '';
    router.push(`/booking/${trek.id}${params}`);
  };
  const enquireNow = () => {
    const msg = `Hi! I'm interested in ${trek.title} (${trek.duration}). Please share more details.`;
    window.open(`https://wa.me/919999999999?text=${encodeURIComponent(msg)}`, '_blank');
  };
  const totalPersons = men + women;

  useEffect(() => {
    const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = navLinks.find(l => l.id === entry.target.id);
          if (id) setActiveSection(id.id);
        }
      });
    }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sticky = document.getElementById('sticky-nav');
      if (sticky) {
        const hero = document.querySelector('[data-hero]');
        if (hero) {
          setNavVisible(hero.getBoundingClientRect().bottom < 0);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const toggleDay = (day: number) => {
    setExpandedDays(prev => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  const quickInfo = [
    { icon: MapPin, label: 'Location', value: trek.location.split(' to ')[0] },
    { icon: Clock, label: 'Duration', value: trek.duration },
    { icon: TrendingUp, label: 'Max Altitude', value: trek.maxAltitude },
    { icon: Users, label: 'Group Size', value: trek.groupSize },
    { icon: Calendar, label: 'Best Season', value: trek.bestSeason },
    { icon: Thermometer, label: 'Difficulty', value: trek.difficulty },
  ];

  const difficultyColors: Record<string, string> = {
    'Easy': 'bg-green-100 text-green-700',
    'Easy to Moderate': 'bg-emerald-100 text-emerald-700',
    'Moderate': 'bg-yellow-100 text-yellow-700',
    'Moderate-Difficult': 'bg-orange-100 text-orange-700',
    'Difficult': 'bg-red-100 text-red-700',
  };

  return (
    <div className="pt-16 lg:pt-20 bg-[#f8fafb]">
      {/* ========== HERO ========== */}
      <section data-hero className="relative min-h-[65vh] lg:min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={trek.images[0]} alt={trek.title} className="w-full h-full object-cover scale-105 animate-[ken-burns_20s_ease-in-out_infinite_alternate]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/60 via-40% to-[#0a0a1a]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a]/60 to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-8 lg:pb-20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-[11px] font-bold px-3 py-1.5 rounded-full text-gray-900 shadow-lg" style={{ backgroundColor: accent }}>{badgeText}</span>
                  <span className={`text-[11px] font-semibold px-3 py-1.5 rounded-full ${difficultyColors[trek.difficulty] || 'bg-white/20 text-white'} backdrop-blur-sm`}>{trek.difficulty}</span>
                  <span className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-white/15 text-white backdrop-blur-sm">{trek.duration}</span>
                </div>
                <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 leading-[1.1] tracking-tight">{trek.title}</h1>
                <p className="text-white/70 text-base lg:text-lg max-w-xl mb-5 leading-relaxed">{trek.subtitle}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-4 h-4 ${parseInt(trek.rating) >= i ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
                    ))}
                    <span className="text-white/60 text-xs ml-1.5 font-medium">{trek.rating} &middot; {trek.reviewCount} reviews</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/50 text-xs">
                    <MapPin className="w-3 h-3" /> {trek.state}
                  </div>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-5 max-w-sm ml-auto">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-white/50 text-xs font-medium tracking-wide">Starting from</p>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-3xl font-bold text-white">₹{minPrice.toLocaleString()}</span>
                        <span className="text-white/40 text-sm line-through">₹{(trek.pricing[0]?.originalPrice || minPrice + 2000).toLocaleString()}</span>
                      </div>
                      <p className="text-white/40 text-[11px] mt-0.5">per person + 5% GST</p>
                    </div>
                    <div className="bg-[#ffaf21]/20 rounded-full px-3 py-1.5">
                      <p className="text-[11px] text-[#ffaf21] font-bold">Save ₹{((trek.pricing[0]?.originalPrice || minPrice + 2000) - minPrice).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => bookNow()} className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-900 font-bold text-sm py-3 rounded-xl hover:bg-white/90 transition-all shadow-lg">
                      Book Now <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" onClick={enquireNow} className="px-4 py-3 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all">
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <div className="relative -mt-8 lg:-mt-12 z-20 container mx-auto px-4 lg:px-6 mb-8 lg:mb-12">
        <div className="bg-white rounded-2xl shadow-lg shadow-black/5 border border-gray-100/80 p-4 lg:p-5">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 lg:gap-6">
            {quickInfo.map(i => (
              <div key={i.label} className="text-center">
                <i.icon className="w-4 h-4 mx-auto mb-1.5" style={{ color: accent }} />
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">{i.label}</p>
                <p className="font-bold text-xs lg:text-sm text-gray-900 mt-0.5">{i.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== STICKY NAV ========== */}
      <div id="sticky-nav" className={`sticky top-16 lg:top-20 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100/80 shadow-sm transition-all duration-300 ${navVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center gap-0 overflow-x-auto no-scrollbar py-0">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollToSection(l.id)}
                className={`shrink-0 text-xs lg:text-sm font-medium px-3 lg:px-5 py-3 lg:py-4 border-b-2 transition-all whitespace-nowrap ${activeSection === l.id ? '' : 'border-transparent text-gray-400 hover:text-gray-700'}`}
                style={activeSection === l.id ? { color: accent, borderColor: accent } : {}}>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ---------- LEFT COLUMN ---------- */}
          <div className="lg:col-span-8 space-y-16 lg:space-y-20">

            {/* --- OVERVIEW --- */}
            <section id="overview">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Overview</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">About the {badgeText}</h2>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-6 lg:p-8">
                <div className="text-gray-600 leading-[1.8] text-sm lg:text-base space-y-4">
                  <div className={!expandedOverview ? 'line-clamp-6' : ''} dangerouslySetInnerHTML={{ __html: trek.description.replace(/\n/g, '<br/>') }} />
                </div>
                {trek.description.length > 400 && (
                  <button onClick={() => setExpandedOverview(!expandedOverview)} className="inline-flex items-center gap-1.5 text-sm font-semibold mt-4 transition-colors hover:opacity-80" style={{ color: accent }}>
                    {expandedOverview ? 'Show Less' : 'Read Full Overview'} <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedOverview ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
            </section>

            {/* --- ITINERARY (merged Map + Day plan) --- */}
            <section id="itinerary">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Itinerary</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">Day-by-Day Plan</h2>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-gray-100/80 shadow-sm mb-6">
                <img src={trek.mapImage} alt="Route map" className="w-full h-48 lg:h-56 object-cover" />
              </div>

              <div className="relative">
                <div className="absolute left-[17px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-gray-200 via-gray-200 to-transparent" />
                <div className="space-y-5">
                  {trek.itinerary.map((day, idx) => {
                    const isExpanded = expandedDays.has(day.day);
                    const longDesc = day.description.length > 200;
                    return (
                      <div key={day.day} className="relative pl-12">
                        <div className="absolute left-0 top-1 w-[34px] h-[34px] rounded-full flex items-center justify-center text-gray-900 text-xs font-bold shadow-md border-2 border-white" style={{ backgroundColor: accent }}>{day.day}</div>
                        <div className="bg-white rounded-xl border border-gray-100/80 shadow-sm p-5 lg:p-6 hover:shadow-md transition-all duration-300">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-base lg:text-lg text-gray-900">{day.title}</h3>
                            {idx === 0 && <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700">Start</span>}
                          </div>
                          <div className="text-gray-600 text-sm leading-relaxed">
                            <div className={!isExpanded && longDesc ? 'line-clamp-3' : ''}>{day.description}</div>
                            {longDesc && (
                              <button onClick={() => toggleDay(day.day)} className="inline-flex items-center gap-1 text-sm font-semibold mt-2 hover:opacity-80 transition-colors" style={{ color: accent }}>
                                {isExpanded ? 'Read Less' : 'Read More'} <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                              </button>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-50">
                            {day.duration && (
                              <span className="flex items-center gap-1.5 text-[11px] bg-gray-50 text-gray-500 rounded-full px-3 py-1"><Clock className="w-3 h-3" /> {day.duration}</span>
                            )}
                            {day.altitude && (
                              <span className="flex items-center gap-1.5 text-[11px] bg-gray-50 text-gray-500 rounded-full px-3 py-1"><TrendingUp className="w-3 h-3" /> {day.altitude}</span>
                            )}
                            {day.distance && (
                              <span className="flex items-center gap-1.5 text-[11px] bg-gray-50 text-gray-500 rounded-full px-3 py-1"><Navigation className="w-3 h-3" /> {day.distance}</span>
                            )}
                            <span className="flex items-center gap-1.5 text-[11px] bg-gray-50 text-gray-500 rounded-full px-3 py-1"><ChefHat className="w-3 h-3" /> {day.meals}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* --- INCLUSIONS & EXCLUSIONS --- */}
            <section id="in-ex">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Inclusions</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">What&apos;s Included</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl border border-green-100/60 shadow-sm p-6 lg:p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center"><Check className="w-5 h-5 text-green-600" /></div>
                    <h3 className="font-bold text-lg text-gray-900">Inclusions</h3>
                  </div>
                  <ul className="space-y-3">
                    {trek.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-2xl border border-red-100/60 shadow-sm p-6 lg:p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center"><Ban className="w-5 h-5 text-red-500" /></div>
                    <h3 className="font-bold text-lg text-gray-900">Exclusions</h3>
                  </div>
                  <ul className="space-y-3">
                    {trek.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="w-4 h-4 text-red-400 shrink-0 mt-0.5 text-center leading-4 text-xs">✕</span>
                        {exc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* --- PREPARATION --- */}
            <section id="preparation">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Preparation</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">Before You Go</h2>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm overflow-hidden">
                <div className="flex border-b border-gray-100">
                  {([
                    { id: 'pack' as const, label: 'Things to Pack', icon: Tent },
                    { id: 'fitness' as const, label: 'Fitness', icon: Footprints },
                    { id: 'medical' as const, label: 'Medical', icon: Heart },
                  ]).map(tab => (
                    <button key={tab.id} onClick={() => setPrepTab(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 transition-all ${prepTab === tab.id ? '' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                      style={prepTab === tab.id ? { color: accent, borderColor: accent, backgroundColor: `${accent}06` } : {}}>
                      <tab.icon className="w-4 h-4" /> {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-6 lg:p-7">
                  {prepTab === 'pack' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { title: 'Clothing', items: packingData.clothing, icon: '👕' },
                        { title: 'Gear Essentials', items: packingData.gear, icon: '🎒' },
                        { title: 'Personal Items', items: packingData.personal, icon: '🧴' },
                      ].map(section => (
                        <div key={section.title} className="bg-gray-50/80 rounded-xl p-4 lg:p-5 border border-gray-100/50">
                          <h4 className="font-bold text-sm text-gray-900 mb-3">{section.icon} {section.title}</h4>
                          <ul className="space-y-2">
                            {section.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-500 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: accent }} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {prepTab === 'fitness' && (
                    <div>
                      <h4 className="font-bold text-base text-gray-900 mb-4">Recommended Fitness Preparation</h4>
                      <div className="space-y-3">
                        {fitnessData.map((row, i) => (
                          <div key={i} className="flex items-start gap-4 p-4 bg-gray-50/80 rounded-xl border border-gray-100/50">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: accent }}>{i + 1}</div>
                            <div className="min-w-0">
                              <h5 className="font-semibold text-sm text-gray-900">{row.focus}</h5>
                              <p className="text-xs text-gray-500 mt-0.5">{row.practice}</p>
                              <span className="inline-block text-[11px] font-medium mt-1.5 px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500">{row.freq}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {prepTab === 'medical' && (
                    <div>
                      <h4 className="font-bold text-base text-gray-900 mb-4">Medical Readiness Checklist</h4>
                      <div className="space-y-3">
                        {medicalData.map((item, i) => (
                          <div key={i} className="flex items-start gap-4 p-4 bg-gray-50/80 rounded-xl border border-gray-100/50">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: accent }}>{i + 1}</div>
                            <div>
                              <h5 className="font-semibold text-sm text-gray-900">{item.point}</h5>
                              <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.what}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-4 mt-4">
                        <p className="text-xs text-amber-700 flex items-start gap-2">
                          <Info className="w-4 h-4 shrink-0 mt-0.5" />
                          This section is only a general preparation guide. It is not a substitute for professional medical advice. Every trekker should make decisions based on their own health condition and doctor&apos;s recommendation where needed.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* --- GALLERY --- */}
            <section id="gallery">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Gallery</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">Trip Moments</h2>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-1">
                <Gallery images={trek.images} title={trek.title} />
              </div>
            </section>

            {/* --- PRICING --- */}
            <section id="pricing">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Pricing</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">Choose Your Package</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trek.pricing.map((pkg, i) => (
                  <div key={pkg.name} className={`relative bg-white rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md ${i === 1 ? 'border-[#ffaf21]/30 ring-1 ring-[#ffaf21]/20 scale-[1.02]' : 'border-gray-100/80'}`}>
                    {i === 1 && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ffaf21] to-[#ffaf21] text-white text-[10px] font-bold px-4 py-1 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Most Popular
                      </div>
                    )}
                    <div className="p-5 lg:p-6 text-center mt-2">
                      <h3 className="font-bold text-base text-gray-900">{pkg.name}</h3>
                      {pkg.badge && (
                        <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full mt-1.5 text-white" style={{ backgroundColor: accent }}>{pkg.badge}</span>
                      )}
                      <div className="mt-4">
                        {pkg.originalPrice && <span className="text-sm text-gray-400 line-through mr-2">₹{pkg.originalPrice.toLocaleString()}</span>}
                        <div className="text-3xl font-bold text-gray-900">₹{pkg.price.toLocaleString()}</div>
                        <p className="text-xs text-gray-400 mt-1">per person</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-50">
                        <p className="text-sm font-semibold" style={{ color: accent }}>Deposit: ₹{pkg.deposit.toLocaleString()}</p>
                      </div>
                      <button type="button" onClick={() => bookNow(pkg.name)} className="w-full mt-5 flex items-center justify-center gap-2 text-gray-900 font-semibold text-sm py-3 rounded-xl transition-all hover:opacity-90 shadow-sm" style={{ backgroundColor: accent }}>
                        Book Now <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* --- POLICIES --- */}
            <section id="faq">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Policies</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">Booking Terms</h2>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm overflow-hidden">
                <div className="flex border-b border-gray-100">
                  {policyData.map(p => (
                    <button key={p.id} onClick={() => setPolicyTab(p.id)}
                      className={`flex-1 px-4 py-3.5 text-sm font-medium border-b-2 transition-all ${policyTab === p.id ? '' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                      style={policyTab === p.id ? { color: accent, borderColor: accent, backgroundColor: `${accent}06` } : {}}>
                      {p.label}
                    </button>
                  ))}
                </div>
                <div className="p-6 lg:p-7">
                  <ul className="space-y-3">
                    {policyData.find(p => p.id === policyTab)?.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                        <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* --- FAQ --- */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>FAQ</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">Frequently Asked Questions</h2>
                </div>
              </div>
              <div className="space-y-3">
                {trek.faq.map((f, i) => (
                  <details key={i} className="bg-white rounded-xl border border-gray-100/80 shadow-sm overflow-hidden group">
                    <summary className="p-5 lg:p-6 font-semibold text-sm lg:text-base text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                      <span className="flex-1">{f.q}</span>
                      <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform duration-300 shrink-0" />
                    </summary>
                    <div className="px-5 lg:px-6 pb-5 lg:pb-6 border-t border-gray-50 pt-4">
                      <p className="text-gray-500 text-sm leading-relaxed">{f.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* --- HOW TO REACH --- */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Getting There</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">How to Reach</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {howToReachData.map((section, si) => (
                  <div key={si} className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-6 lg:p-7">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: accent }}>
                        {si === 0 ? <Plane className="w-5 h-5" /> : <MountainSnow className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-gray-900">{section.title}</h3>
                        <p className="text-xs text-gray-400">{section.desc}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {section.steps.map(step => (
                        <div key={step.num} className="flex items-start gap-3">
                          <span className="flex items-center justify-center w-7 h-7 rounded-lg text-white text-xs font-bold shrink-0 mt-0.5" style={{ backgroundColor: accent }}>{step.num}</span>
                          <p className="text-sm text-gray-500 leading-relaxed">{step.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* --- SIMILAR TREKS --- */}
            <div className="pt-4">
              <SimilarTreks currentId={trek.id} type={similarType} />
            </div>
          </div>

          {/* ---------- RIGHT SIDEBAR ---------- */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Pricing Widget */}
              <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 lg:p-7">
                  <div className="text-center mb-6">
                    <p className="text-gray-400 text-xs font-medium tracking-wide">Offer Price</p>
                    <div className="flex items-baseline justify-center gap-2 mt-1">
                      <span className="text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: accent }}>₹{minPrice.toLocaleString()}</span>
                      {trek.pricing[0]?.originalPrice && (
                        <span className="text-gray-300 line-through text-lg">₹{trek.pricing[0].originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <p className="text-gray-400 text-xs mt-1">per person + 5% GST</p>
                    <div className="inline-flex items-center gap-1.5 mt-2 bg-[#ffaf21]/10 text-[#ffaf21] text-xs font-bold px-3 py-1 rounded-full">
                      <Sparkles className="w-3 h-3" /> Save ₹{((trek.pricing[0]?.originalPrice || minPrice + 2000) - minPrice).toLocaleString()}
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5 tracking-wide">Pickup Location</label>
                      <select value={pickup} onChange={e => setPickup(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#ffaf21] focus:ring-2 focus:ring-[#ffaf21]/20 bg-white transition-all">
                        <option>Dehradun</option>
                        <option>Sankri</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5 tracking-wide">Travelers</label>
                      <div className="space-y-2.5">
                        {[
                          { label: 'Men', val: men, set: setMen },
                          { label: 'Women', val: women, set: setWomen },
                        ].map(t => (
                          <div key={t.label} className="flex items-center justify-between bg-gray-50/80 rounded-xl px-4 py-2.5 border border-gray-100/50">
                            <span className="text-sm font-medium text-gray-600">{t.label}</span>
                            <div className="flex items-center gap-3">
                              <button type="button" onClick={() => t.set(Math.max(0, t.val - 1))} aria-label={`Decrease ${t.label}`} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-all hover:border-gray-300">
                                <Minus className="w-3 h-3 text-gray-500" />
                              </button>
                              <span className="text-sm font-bold text-gray-900 w-5 text-center" aria-live="polite">{t.val}</span>
                              <button type="button" onClick={() => t.set(t.val + 1)} aria-label={`Increase ${t.label}`} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-all hover:border-gray-300">
                                <Plus className="w-3 h-3 text-gray-500" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {totalPersons > 0 && (
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 mb-5 border border-gray-100/80 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Base Amount ({totalPersons} × ₹{minPrice})</span>
                        <span className="font-semibold text-gray-800">₹{(totalPersons * minPrice).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">GST (5%)</span>
                        <span className="font-semibold text-gray-800">₹{Math.ceil(totalPersons * minPrice * 0.05).toLocaleString()}</span>
                      </div>
                      <hr className="border-gray-200" />
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="font-bold text-xl" style={{ color: accent }}>₹{(totalPersons * minPrice + Math.ceil(totalPersons * minPrice * 0.05)).toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <button type="button" onClick={() => bookNow()} className="w-full flex items-center justify-center gap-2 text-gray-900 font-bold text-sm py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:opacity-90" style={{ backgroundColor: accent }}>
                    Book Now <ArrowRight className="w-4 h-4" />
                  </button>
                  <button type="button" onClick={enquireNow} className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-600 font-semibold text-sm py-3 rounded-xl mt-2.5 hover:border-gray-300 hover:text-gray-800 transition-all">
                    Enquire Now
                  </button>
                </div>

                <div className="border-t border-gray-100/80 p-5 lg:p-6">
                  <p className="text-xs font-semibold text-gray-500 mb-3 flex items-center gap-1.5 tracking-wide"><Phone className="w-3.5 h-3.5" /> Need Help?</p>
                  <div className="space-y-2 text-sm">
                    <a href="tel:+919999999999" className="flex items-center gap-2.5 text-gray-700 hover:text-gray-900 transition-colors font-medium">
                      <Phone className="w-4 h-4" style={{ color: accent }} /> +91 99999 99999
                    </a>
                    <a href="mailto:info@trekroot.com" className="flex items-center gap-2.5 text-gray-500 hover:text-gray-700 transition-colors text-xs">
                      <Mail className="w-4 h-4" style={{ color: accent }} /> info@trekroot.com
                    </a>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                    <Shield className="w-3.5 h-3.5" /> Secure booking &middot; Easy cancellation
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 lg:p-7 text-white shadow-lg">
                <h3 className="font-bold text-base mb-5">Why TrekRoot?</h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { icon: Award, label: 'Best Price Guarantee', desc: 'We match any genuine quote' },
                    { icon: Shield, label: 'Safety First', desc: 'Certified leaders & first-aid equipped' },
                    { icon: Users, label: 'Small Groups', desc: 'Intimate experiences, max 15 per batch' },
                    { icon: Clock, label: '24/7 Support', desc: 'On-ground assistance throughout' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4" style={{ color: '#ffaf21' }} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-white">{item.label}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== MOBILE BOTTOM CTA ========== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200/80 p-3 lg:hidden z-40 shadow-lg shadow-black/5">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div>
            <p className="text-[10px] text-gray-400 font-medium">Starting from</p>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-xl" style={{ color: accent }}>₹{minPrice.toLocaleString()}</span>
              <span className="text-[11px] text-gray-400 font-normal">/person</span>
            </div>
          </div>
          <div className="flex gap-2">
            <a href="tel:+919999999999" className="w-11 h-11 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-300 transition-all">
              <Phone className="w-4 h-4" />
            </a>
            <button type="button" onClick={() => bookNow()} className="flex items-center gap-2 text-gray-900 font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow-md hover:opacity-90" style={{ backgroundColor: accent }}>
              Book Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
