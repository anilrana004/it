'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MapPin, Clock, Star, ChevronLeft, Check, Shield, Users, TrendingUp, Thermometer, Calendar, Luggage, Info, Ban, ArrowRight, ChevronDown, Phone, Mail, Navigation, Mountain, Heart, Award, ChefHat, Bed, Minus, Plus, Car, Bus, Plane, ExternalLink } from 'lucide-react';
import type { Trek } from '@/lib/data';
import Gallery from '@/components/Gallery';
import SimilarTreks from '@/components/SimilarTreks';

const navLinks = [
  { id: 'overview', label: 'Overview' },
  { id: 'map', label: 'Map' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'in-ex', label: 'Inclusion & Exclusion' },
  { id: 'preparation', label: 'Preparation' },
  { id: 'how-to-reach', label: 'How to Reach' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'departures', label: 'Departures' },
  { id: 'policies', label: 'Policies' },
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

const profileRatings = [
  { label: 'Scenic Beauty', value: 95, color: '#359DFC' },
  { label: 'Beginner Friendly', value: 88, color: '#29C80F' },
  { label: 'Snow / Trail Experience', value: 92, color: '#EA5939' },
  { label: 'Summit Reward', value: 94, color: '#8B5CF6' },
  { label: 'Value for Money', value: 90, color: '#F59E0B' },
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
  const accent = isTrek ? '#359DFC' : '#EA5939';
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
  const [scope, setScope] = useState<'double' | 'triple'>('double');
  const [pickup, setPickup] = useState('Dehradun');
  const [navVisible, setNavVisible] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const minPrice = Math.min(...trek.pricing.map(p => p.price));
  const totalPersons = men + women;
  const pricePerPerson = minPrice;
  const total = totalPersons * pricePerPerson;

  useEffect(() => {
    const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = navLinks.find(l => l.id === entry.target.id);
          if (id) setActiveSection(id.id);
        }
      });
    }, { rootMargin: '-100px 0px -60% 0px', threshold: 0 });
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sticky = document.getElementById('sticky-nav');
      if (sticky) {
        const hero = document.querySelector('[data-hero]');
        if (hero) {
          const heroBottom = hero.getBoundingClientRect().bottom;
          setNavVisible(heroBottom < 0);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 70;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
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

  return (
    <div className="pt-16 lg:pt-20">
      {/* ========== HERO ========== */}
      <section data-hero className="relative min-h-[60vh] lg:min-h-[75vh] overflow-hidden">
        <img src={trek.images[0]} alt={trek.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 via-50% to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-8 lg:pb-16">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white shadow-sm" style={{ backgroundColor: accent }}>{badgeText}</span>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/20 text-white backdrop-blur-sm">{trek.difficulty}</span>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/20 text-white backdrop-blur-sm">{trek.duration}</span>
                {trek.distance && <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/20 text-white backdrop-blur-sm">{trek.distance}</span>}
              </div>
              <div className="flex items-center gap-1.5 mb-3">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-4 h-4 ${parseInt(trek.rating) >= i ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}`} />
                ))}
                <span className="text-white/70 text-sm ml-1">{trek.rating} ({trek.reviewCount} reviews)</span>
              </div>
              <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 leading-tight">{trek.title}</h1>
              <p className="text-white/80 text-base lg:text-lg max-w-2xl mb-5">{trek.subtitle}</p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-white/70 text-sm bg-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
                  <MapPin className="w-3.5 h-3.5" style={{ color: accent }} /> {trek.state}
                </div>
                <div className="flex items-center gap-1.5 text-white/70 text-sm bg-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
                  <Clock className="w-3.5 h-3.5" style={{ color: accent }} /> {trek.duration}
                </div>
                <div className="flex items-center gap-1.5 text-white/70 text-sm bg-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
                  <TrendingUp className="w-3.5 h-3.5" style={{ color: accent }} /> {trek.maxAltitude}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Price Card */}
          <div className="absolute bottom-8 right-4 lg:right-8 xl:right-16 w-[280px] lg:w-[320px] hidden lg:block">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-5 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-gray-500 text-xs">Starting from</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold" style={{ color: accent }}>₹{minPrice.toLocaleString()}</span>
                    <span className="text-gray-400 text-xs line-through">₹{(trek.pricing[0]?.originalPrice || minPrice + 2000).toLocaleString()}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">per person (+5% GST extra)</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-[#29C80F] font-semibold">Save ₹{((trek.pricing[0]?.originalPrice || minPrice + 2000) - minPrice).toLocaleString()}</p>
                </div>
              </div>
              <button onClick={() => scrollToSection('departures')} className="w-full flex items-center justify-center gap-2 text-white font-semibold text-sm py-3 rounded-full transition-all shadow-lg hover:opacity-90" style={{ backgroundColor: accent }}>
                View Itinerary & Dates <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center justify-center gap-3 mt-2">
                <a href="tel:+919999999999" className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"><Phone className="w-3 h-3" /> Call Now</a>
                <a href="https://wa.me/919999999999" className="text-xs text-gray-500 hover:text-[#29C80F] flex items-center gap-1">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STICKY NAV ========== */}
      <div id="sticky-nav" className={`sticky top-16 lg:top-20 z-30 bg-white border-b border-gray-100 shadow-sm transition-all duration-300 ${navVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center gap-0 overflow-x-auto no-scrollbar py-0">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollToSection(l.id)}
                className={`shrink-0 text-xs lg:text-sm font-medium px-3 lg:px-4 py-3 lg:py-4 border-b-2 transition-all whitespace-nowrap ${activeSection === l.id ? '' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                style={activeSection === l.id ? { color: accent, borderColor: accent } : {}}>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12" ref={mainRef}>
        <div className="mb-4">
          <Link href={backHref} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to {isTrek ? 'Treks' : 'Yatras'}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* ---------- LEFT COLUMN ---------- */}
          <div className="lg:col-span-8 space-y-12 lg:space-y-16">

            {/* --- OVERVIEW --- */}
            <section id="overview">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Trip Overview</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e] mt-1">Why Choose {trek.title}</h2>
              </div>
              <div className="text-gray-600 leading-relaxed text-sm lg:text-base space-y-4">
                <div className={!expandedOverview ? 'line-clamp-6' : ''} dangerouslySetInnerHTML={{ __html: trek.description.replace(/\n/g, '<br/>') }} />
              </div>
              {trek.description.length > 400 && (
                <button onClick={() => setExpandedOverview(!expandedOverview)} className="flex items-center gap-1 text-sm font-semibold mt-3 transition-colors" style={{ color: accent }}>
                  {expandedOverview ? 'Read Less' : 'Read More'} <ChevronDown className={`w-4 h-4 transition-transform ${expandedOverview ? 'rotate-180' : ''}`} />
                </button>
              )}
            </section>

            {/* --- QUICK INFO CARDS --- */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { icon: MapPin, label: 'Location', value: trek.location.split(' to ')[0] },
                { icon: Clock, label: 'Duration', value: trek.duration },
                { icon: TrendingUp, label: 'Max Altitude', value: trek.maxAltitude },
                { icon: Users, label: 'Group Size', value: trek.groupSize },
                { icon: Calendar, label: 'Best Season', value: trek.bestSeason },
                { icon: Thermometer, label: 'Difficulty', value: trek.difficulty },
              ].map(i => (
                <div key={i.label} className="bg-gray-50 rounded-xl p-3 lg:p-4 text-center border border-gray-100/50">
                  <i.icon className="w-5 h-5 mx-auto mb-1.5" style={{ color: accent }} />
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">{i.label}</p>
                  <p className="font-bold text-xs lg:text-sm text-[#1a1a2e]">{i.value}</p>
                </div>
              ))}
            </div>

            {/* --- PROFILE GRAPH / WHY CHOOSE --- */}
            <section id="ratings">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Why Choose</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e] mt-1">Trek Profile Graph</h2>
              </div>
              <div className="space-y-4">
                {profileRatings.map(r => (
                  <div key={r.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{r.label}</span>
                      <span className="font-bold text-gray-900">{r.value}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${r.value}%`, backgroundColor: r.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* --- MAP & PREVIEW --- */}
            <section id="map">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Route & Visuals</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e] mt-1">Map & Preview</h2>
                <p className="text-gray-500 text-sm mt-1">Visualize the route, terrain, and key locations to better understand the journey ahead.</p>
              </div>
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-5">
                <img src={trek.mapImage} alt="Route map" className="w-full h-48 lg:h-64 object-cover" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Region', value: trek.state },
                  { label: 'Best Season', value: trek.bestSeason },
                  { label: 'Pickup Point', value: trek.location.split(' to ')[0] },
                  { label: 'Duration', value: trek.duration },
                  { label: 'Altitude', value: trek.maxAltitude },
                  { label: 'Difficulty', value: trek.difficulty },
                ].map(i => (
                  <div key={i.label} className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100/50">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">{i.label}</p>
                    <p className="font-semibold text-xs text-[#1a1a2e]">{i.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* --- DETAILED ITINERARY --- */}
            <section id="itinerary">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Detailed Itinerary</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e] mt-1">Day by Day Plan</h2>
                <p className="text-gray-500 text-sm mt-1">A day-by-day breakdown of the trek, covering travel, trails, campsites, and summit experience.</p>
              </div>
              <div className="space-y-4">
                {trek.itinerary.map(day => {
                  const isExpanded = expandedDays.has(day.day);
                  const descWords = day.description.split(' ');
                  const longDesc = descWords.length > 40;
                  return (
                    <div key={day.day} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
                      <div className="p-4 lg:p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-9 h-9 rounded-full text-white text-sm font-bold" style={{ backgroundColor: accent }}>{day.day}</span>
                            <h3 className="font-bold text-base lg:text-lg text-[#1a1a2e]">{day.title}</h3>
                          </div>
                        </div>
                        <div className="text-gray-600 text-sm leading-relaxed">
                          <div className={!isExpanded && longDesc ? 'line-clamp-3' : ''}>
                            {day.description}
                          </div>
                          {longDesc && (
                            <button onClick={() => toggleDay(day.day)} className="flex items-center gap-1 text-sm font-semibold mt-2 transition-colors" style={{ color: accent }}>
                              {isExpanded ? 'Read Less' : 'Read More'} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-gray-100">
                          {day.duration && (
                            <span className="flex items-center gap-1.5 text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1">
                              <Clock className="w-3 h-3" /> {day.duration}
                            </span>
                          )}
                          {day.altitude && (
                            <span className="flex items-center gap-1.5 text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1">
                              <TrendingUp className="w-3 h-3" /> Alt: {day.altitude}
                            </span>
                          )}
                          {day.distance && (
                            <span className="flex items-center gap-1.5 text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1">
                              <Navigation className="w-3 h-3" /> {day.distance}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5 text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1">
                            <ChefHat className="w-3 h-3" /> {day.meals}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* --- INCLUSIONS & EXCLUSIONS --- */}
            <section id="in-ex">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Inclusion & Exclusion</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e] mt-1">What&apos;s Included & What&apos;s Not</h2>
                <p className="text-gray-500 text-sm mt-1">Clear and transparent details of what is covered in your package and what you need to arrange separately.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50/70 rounded-2xl p-5 lg:p-6 border border-green-100/50">
                  <h3 className="font-bold text-lg text-green-800 mb-4 flex items-center gap-2"><Check className="w-5 h-5" /> Inclusions</h3>
                  <ul className="space-y-2.5">
                    {trek.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50/70 rounded-2xl p-5 lg:p-6 border border-red-100/50">
                  <h3 className="font-bold text-lg text-red-800 mb-4 flex items-center gap-2"><Ban className="w-5 h-5" /> Exclusions</h3>
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
            </section>

            {/* --- PREPARATION / BEFORE YOU GO --- */}
            <section id="preparation">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Preparation</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e] mt-1">Before You Go</h2>
                <p className="text-gray-500 text-sm mt-1">Essential guidance on fitness, gear, and readiness to help you complete the trek safely and comfortably.</p>
              </div>

              {/* Prep Tabs */}
              <div className="flex gap-2 mb-6 border-b border-gray-100 pb-px">
                {([
                  { id: 'pack' as const, label: 'Things to Pack' },
                  { id: 'fitness' as const, label: 'Physical Fitness' },
                  { id: 'medical' as const, label: 'Medical' },
                ]).map(tab => (
                  <button key={tab.id} onClick={() => setPrepTab(tab.id)}
                    className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${prepTab === tab.id ? '' : 'text-gray-500 border-transparent hover:text-gray-800'}`}
                    style={prepTab === tab.id ? { color: accent, borderColor: accent } : {}}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Packing Tab */}
              {prepTab === 'pack' && (
                <div className="space-y-4">
                  {([
                    { title: 'Clothing', items: packingData.clothing, icon: '👕' },
                    { title: 'Gear Essentials', items: packingData.gear, icon: '🎒' },
                    { title: 'Personal Items', items: packingData.personal, icon: '🧴' },
                  ]).map(section => (
                    <div key={section.title} className="bg-white rounded-xl border border-gray-100 p-4 lg:p-5">
                      <h4 className="font-bold text-sm text-[#1a1a2e] mb-3">{section.icon} {section.title}</h4>
                      <ul className="space-y-2">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                            <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: accent }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Fitness Tab */}
              {prepTab === 'fitness' && (
                <div>
                  <h4 className="font-bold text-base text-[#1a1a2e] mb-4">Recommended Fitness Preparation</h4>
                  <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left px-4 py-3 font-semibold text-gray-700">Focus Area</th>
                          <th className="text-left px-4 py-3 font-semibold text-gray-700">Recommended Practice</th>
                          <th className="text-left px-4 py-3 font-semibold text-gray-700">Frequency</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {fitnessData.map((row, i) => (
                          <tr key={i} className="hover:bg-gray-50/50">
                            <td className="px-4 py-3 font-medium text-gray-800">{row.focus}</td>
                            <td className="px-4 py-3 text-gray-600">{row.practice}</td>
                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{row.freq}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Medical Tab */}
              {prepTab === 'medical' && (
                <div>
                  <h4 className="font-bold text-base text-[#1a1a2e] mb-4">Medical Readiness Checklist</h4>
                  <div className="space-y-3">
                    {medicalData.map((item, i) => (
                      <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 lg:p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold shrink-0 mt-0.5" style={{ backgroundColor: accent }}>{i + 1}</span>
                          <div>
                            <h5 className="font-semibold text-sm text-[#1a1a2e]">{item.point}</h5>
                            <p className="text-gray-600 text-sm mt-1">{item.what}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                    <p className="text-xs text-amber-800 flex items-start gap-2">
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      This section is only a general preparation guide. It is not a substitute for professional medical advice. Every trekker should make decisions based on their own health condition and doctor&apos;s recommendation where needed.
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* --- HOW TO REACH --- */}
            <section id="how-to-reach">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Reach the Base</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e] mt-1">How to Reach</h2>
                <p className="text-gray-500 text-sm mt-1">Most trekkers first reach {trek.location.split(' to ')[0]} and then continue towards the base by road.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {howToReachData.map((section, si) => (
                  <div key={si} className="bg-white rounded-xl border border-gray-100 p-5 lg:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: accent }}>
                        {si === 0 ? <Plane className="w-5 h-5" /> : <Mountain className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-[#1a1a2e]">{section.title}</h3>
                        <p className="text-xs text-gray-500">{section.desc}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {section.steps.map(step => (
                        <div key={step.num} className="flex items-start gap-3">
                          <span className="flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold shrink-0 mt-0.5" style={{ backgroundColor: accent }}>{step.num}</span>
                          <p className="text-sm text-gray-600 leading-relaxed">{step.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* --- GALLERY --- */}
            <section id="gallery">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Gallery</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e] mt-1">Trip Moments</h2>
                <p className="text-gray-500 text-sm mt-1">A visual journey capturing the landscapes, campsites, and unforgettable moments from the trek.</p>
              </div>
              <Gallery images={trek.images} title={trek.title} />
            </section>

            {/* --- DATES & PRICING / DEPARTURES --- */}
            <section id="departures">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Dates & Pricing</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e] mt-1">Upcoming Departures</h2>
                <p className="text-gray-500 text-sm mt-1">Choose your preferred batch and plan your {type} dates based on availability.</p>
              </div>
              <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Package</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Price</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Deposit</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {trek.pricing.map((pkg, i) => (
                      <tr key={i} className="hover:bg-gray-50/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800">{pkg.name}</span>
                            {pkg.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: accent }}>{pkg.badge}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-bold text-gray-900">₹{pkg.price.toLocaleString()}</span>
                          {pkg.originalPrice && <span className="text-gray-400 line-through text-xs ml-1">₹{pkg.originalPrice.toLocaleString()}</span>}
                        </td>
                        <td className="px-4 py-3 text-gray-600">₹{pkg.deposit.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold text-[#29C80F] bg-green-50 px-2.5 py-1 rounded-full">Available</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button className="text-xs font-semibold px-4 py-1.5 rounded-full text-white transition-all hover:opacity-90" style={{ backgroundColor: accent }}>
                            Book Now
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* --- POLICIES --- */}
            <section id="policies">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Policies</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e] mt-1">Booking Terms</h2>
                <p className="text-gray-500 text-sm mt-1">Important booking, cancellation, and participation guidelines to know before confirming your {type}.</p>
              </div>

              <div className="flex gap-2 mb-6 border-b border-gray-100 pb-px">
                {policyData.map(p => (
                  <button key={p.id} onClick={() => setPolicyTab(p.id)}
                    className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${policyTab === p.id ? '' : 'text-gray-500 border-transparent hover:text-gray-800'}`}
                    style={policyTab === p.id ? { color: accent, borderColor: accent } : {}}>
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-5 lg:p-6">
                <ul className="space-y-3">
                  {policyData.find(p => p.id === policyTab)?.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* --- FAQ --- */}
            <section id="faq">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>FAQ</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e] mt-1">Frequently Asked Questions</h2>
                <p className="text-gray-500 text-sm mt-1">Quick answers to common questions to help you prepare and plan with confidence.</p>
              </div>
              <div className="space-y-3">
                {trek.faq.map((f, i) => (
                  <details key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden group">
                    <summary className="p-4 lg:p-5 font-semibold text-sm lg:text-base text-gray-900 cursor-pointer list-none flex items-center justify-between">
                      {f.q}
                      <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform shrink-0" />
                    </summary>
                    <div className="px-4 lg:px-5 pb-4 lg:pb-5">
                      <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
                    </div>
                  </details>
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
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 lg:p-6">
                  <div className="text-center mb-5">
                    <p className="text-gray-500 text-xs">Offer Price (Excl. GST)</p>
                    <div className="flex items-baseline justify-center gap-2 mt-1">
                      <span className="text-3xl lg:text-4xl font-bold" style={{ color: accent }}>₹{minPrice.toLocaleString()}</span>
                      {trek.pricing[0]?.originalPrice && (
                        <span className="text-gray-400 line-through text-lg">₹{trek.pricing[0].originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">+ 5% GST extra</p>
                    <div className="flex items-center justify-center gap-1 text-xs" style={{ color: accent }}>
                      <Award className="w-3 h-3" /> Save ₹{((trek.pricing[0]?.originalPrice || minPrice + 2000) - minPrice).toLocaleString()}
                    </div>
                  </div>

                  <div className="space-y-4 mb-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Occupancy</label>
                      <div className="flex gap-2">
                        {(['double', 'triple'] as const).map(s => (
                          <button key={s} onClick={() => setScope(s)}
                            className={`flex-1 py-2.5 rounded-lg text-xs font-semibold border-2 transition-all ${scope === s ? '' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                            style={scope === s ? { borderColor: accent, color: accent, backgroundColor: `${accent}08` } : {}}>
                            {s === 'double' ? 'Double' : 'Triple'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Pickup Location</label>
                      <select value={pickup} onChange={e => setPickup(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#359DFC] focus:ring-2 focus:ring-[#359DFC]/20 bg-white">
                        <option>Dehradun</option>
                        <option>Sankri</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Travelers</label>
                      <div className="space-y-2">
                        {[
                          { label: 'Men', val: men, set: setMen },
                          { label: 'Women', val: women, set: setWomen },
                        ].map(t => (
                          <div key={t.label} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                            <span className="text-sm text-gray-700">{t.label}</span>
                            <div className="flex items-center gap-3">
                              <button onClick={() => t.set(Math.max(0, t.val - 1))} className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-all">
                                <Minus className="w-3 h-3 text-gray-500" />
                              </button>
                              <span className="text-sm font-bold text-gray-900 w-4 text-center">{t.val}</span>
                              <button onClick={() => t.set(t.val + 1)} className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-all">
                                <Plus className="w-3 h-3 text-gray-500" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {totalPersons > 0 && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-5">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Base Amount</span>
                        <span className="font-semibold">₹{(totalPersons * minPrice).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">5% GST</span>
                        <span className="font-semibold">₹{Math.ceil(totalPersons * minPrice * 0.05).toLocaleString()}</span>
                      </div>
                      <hr className="my-2 border-gray-200" />
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="font-bold text-lg" style={{ color: accent }}>₹{(totalPersons * minPrice + Math.ceil(totalPersons * minPrice * 0.05)).toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <button className="w-full flex items-center justify-center gap-2 text-white font-semibold text-sm py-3.5 rounded-full transition-all shadow-sm hover:opacity-90" style={{ backgroundColor: accent }}>
                    Book Now <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold text-sm py-3 rounded-full mt-2 hover:border-gray-300 transition-all">
                    Enquire Now
                  </button>
                </div>

                <div className="bg-gray-50 border-t border-gray-100 p-4 lg:p-5">
                  <p className="text-xs font-semibold text-gray-500 mb-3 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Call Our Mountain Experts!</p>
                  <div className="space-y-2 text-sm">
                    <a href="tel:+919999999999" className="flex items-center gap-2 text-gray-700 hover:text-[#EA5939] transition-colors">
                      <Phone className="w-4 h-4" style={{ color: accent }} /> +91 99999 99999
                    </a>
                    <a href="mailto:info@trekroot.com" className="flex items-center gap-2 text-gray-700 hover:text-[#EA5939] transition-colors">
                      <Mail className="w-4 h-4" style={{ color: accent }} /> info@trekroot.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Why Book With Us */}
              <div className="bg-[#1a1a2e] rounded-2xl p-5 lg:p-6 text-white">
                <h3 className="font-bold text-base mb-4">Why Book With Us?</h3>
                <ul className="space-y-3">
                  {[
                    { icon: Shield, label: 'Best price guarantee' },
                    { icon: Award, label: 'Expert trek leaders' },
                    { icon: Heart, label: 'Safety first approach' },
                    { icon: Users, label: 'Small group sizes' },
                    { icon: Clock, label: '24/7 on-ground support' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-gray-300">
                      <item.icon className="w-4 h-4 shrink-0" style={{ color: '#29C80F' }} />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== MOBILE BOTTOM CTA ========== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 lg:hidden z-40 shadow-lg">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div>
            <p className="text-xs text-gray-500">Starting from</p>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-lg" style={{ color: accent }}>₹{minPrice.toLocaleString()}</span>
              <span className="text-xs text-gray-400 font-normal">/person</span>
            </div>
          </div>
          <div className="flex gap-2">
            <a href="tel:+919999999999" className="border-2 border-gray-200 text-gray-700 font-semibold px-4 py-2.5 rounded-full text-sm hover:border-gray-300 transition-all">
              <Phone className="w-4 h-4" />
            </a>
            <button onClick={() => scrollToSection('departures')} className="text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-all shadow-sm hover:opacity-90" style={{ backgroundColor: accent }}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
