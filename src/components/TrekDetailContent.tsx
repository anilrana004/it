'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, Clock, Star, ChevronLeft, Check, Shield, Users, TrendingUp, Thermometer, Calendar, Info, Ban, ArrowRight, ChevronDown, Phone, Mail, Navigation, Mountain, ChefHat, Bed, Minus, Plus, Plane, ExternalLink, SunSnow, Tent, Trees, Footprints, Cable, MountainSnow, SunMedium, DollarSign, Luggage, Camera, Image, Truck, Sparkles, Headphones, Award, Shirt, HeartPulse, FileText, type LucideIcon } from 'lucide-react';
import type { Trek } from '@/lib/data';
import { getMonthlyBatches, type TrekBatch } from '@/lib/batches';
import Gallery from '@/components/Gallery';
import SimilarTreks from '@/components/SimilarTreks';
import Banners from '@/components/Banners';
import BatchSection from '@/components/BatchSection';

const navLinks = [
  { id: 'highlight', label: 'Highlight' },
  { id: 'overview', label: 'Overview' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'batches', label: 'Batches' },
  { id: 'in-ex', label: "Inclusion & exclusion" },
  { id: 'best-time', label: 'Best Time' },
  { id: 'things-to-carry', label: 'Things to Carry' },
  { id: 'how-to-reach', label: 'How to Reach' },
  { id: 'policy', label: 'Policy' },
  { id: 'faq', label: "FAQ's" },
  { id: 'rent-gear', label: 'Rent a Gear' },
];

const packingData = {
  clothing: [
    { item: 'Base layer: 2 sets moisture-wicking thermals (top and bottom)' },
    { item: 'Mid layer: Fleece jacket + down insulated jacket (600-fill or higher)' },
    { item: 'Outer shell: Windproof, waterproof rain jacket' },
    { item: 'Trekking trousers: 2 pairs, quick-dry (never jeans)' },
    { item: 'Warm hat/beanie + cap with brim (sun protection)' },
    { item: 'Gloves: Waterproof outer gloves' },
    { item: 'Neck gaiter/buff' },
    { item: 'Trekking socks: 4-5 pairs (merino wool preferred)' },
  ],
  footwear: [
    { item: 'Trekking boots: Mid-to-high ankle, waterproof, broken in before the trek' },
    { item: 'Camp footwear: Light sandals or Crocs for evenings' },
  ],
  gear: [
    { item: 'Trekking poles: Adjustable, essential for steep descents' },
    { item: 'Backpack: 40-50 litres with rain cover' },
    { item: 'Headlamp + spare batteries' },
    { item: 'Sunglasses: UV400 (snow glare near pass)' },
    { item: 'Sunscreen: SPF 50+' },
    { item: 'Lip balm with SPF' },
  ],
  health: [
    { item: 'Personal medicines and small health kit (Paracetamol, ibuprofen, ORS)' },
    { item: 'Blister pads, moleskin, antiseptic cream' },
    { item: 'Hand sanitizer' },
    { item: 'Biodegradable soap' },
    { item: 'Toilet paper (carry all waste out)' },
  ],
  documents: [
    { item: 'Original government photo ID (Aadhaar, Voter ID, Passport)' },
    { item: 'Cash in small denominations (no ATMs beyond base)' },
    { item: 'Trek confirmation and emergency contacts (printed copy)' },
  ],
};

const gearRentals = [
  { name: 'Trekking Shoes', icon: Footprints, price: '1,000', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80' },
  { name: 'Down Jacket', icon: MountainSnow, price: '1,000', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80' },
  { name: 'Trekking Pole', icon: Trees, price: '250', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80' },
  { name: 'Poncho', icon: SunSnow, price: '250', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80' },
];

const sampleTestimonials = [
  { name: 'Rahul Sharma', city: 'Delhi', platform: 'Google', text: 'Best trekking experience of my life! The team was incredibly supportive and the views from the summit were absolutely breathtaking. Would recommend to everyone.' },
  { name: 'Anjali Patel', city: 'Ahmedabad', platform: 'TripAdvisor', text: 'The organisation was flawless. From the pickup to the drop, everything was handled professionally. The guides knew the terrain like the back of their hand.' },
  { name: 'Vikram Singh', city: 'Jaipur', platform: 'Google', text: 'I was nervous about my first high-altitude trek but the acclimatisation plan was perfect. The camp food was surprisingly delicious and the camaraderie was unmatched.' },
  { name: 'Priya Deshmukh', city: 'Pune', platform: 'TripAdvisor', text: 'Crossing the pass at sunrise was a spiritual experience. The snow-capped peaks, the silence, the crisp air - nothing compares. Indian Treks made it happen seamlessly.' },
  { name: 'Arun Nair', city: 'Kochi', platform: 'Google', text: 'Coming from Kerala, I was worried about the cold but the gear they provided was top-notch. The guides made sure everyone was comfortable and safe throughout.' },
  { name: 'Neha Gupta', city: 'Lucknow', platform: 'TripAdvisor', text: 'The campsites were chosen perfectly - each one had a view that left us speechless. The stargazing at night was the cherry on top. Unforgettable trip!' },
  { name: 'Siddharth Rao', city: 'Hyderabad', platform: 'Google', text: 'I have done multiple treks with Indian Treks and every single time they exceed expectations. The attention to detail, the safety protocols, the energy - superb!' },
  { name: 'Kavita Joshi', city: 'Mumbai', platform: 'TripAdvisor', text: 'The booking process was smooth, the team was responsive, and the trek itself was magical. The waterfalls, the meadows, the lake - it felt like a dream.' },
  { name: 'Amit Thakur', city: 'Chandigarh', platform: 'Google', text: 'As a solo traveller I was a bit anxious, but the group was so welcoming. Made friends for life and the trek leader was amazing. Will definitely book again.' },
  { name: 'Deepa Menon', city: 'Bengaluru', platform: 'TripAdvisor', text: 'The fitness training tips they shared before the trek were incredibly useful. I felt well-prepared and the sense of achievement after summiting was indescribable.' },
  { name: 'Rajesh Patil', city: 'Nashik', platform: 'Google', text: 'Value for money is insane. The quality of tents, sleeping bags, meals, and guidance at this price point is unheard of. Indian Treks is setting new standards.' },
  { name: 'Swati Agarwal', city: 'Kolkata', platform: 'TripAdvisor', text: 'The sunrise from the summit was worth every step. The team captured beautiful photos and videos that we will cherish forever. Thank you Indian Treks for this memory.' },
  { name: 'Manoj Tiwari', city: 'Varanasi', platform: 'Google', text: 'I had never camped before this trek. The team made it so easy and comfortable. The bonfire nights and group singing were absolutely delightful.' },
  { name: 'Pooja Mishra', city: 'Bhopal', platform: 'TripAdvisor', text: 'The eco-conscious approach of Indian Treks impressed me. They genuinely care about the mountains and leave no trace. It feels good to trek responsibly.' },
];

const difficultyColors: Record<string, string> = {
  'Easy': 'bg-green-100 text-green-700',
  'Easy to Moderate': 'bg-emerald-100 text-emerald-700',
  'Moderate': 'bg-yellow-100 text-yellow-700',
  'Moderate-Difficult': 'bg-orange-100 text-orange-700',
  'Difficult': 'bg-red-100 text-red-700',
};

const diffBg: Record<string, string> = {
  'Easy': 'bg-green-500',
  'Easy to Moderate': 'bg-emerald-500',
  'Moderate': 'bg-yellow-500',
  'Moderate-Difficult': 'bg-orange-500',
  'Difficult': 'bg-red-500',
};

/** Detail-page promo strips - same shape as homepage Banners (full-width, one-at-a-time auto) */
const detailBannerSets = [
  [
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks', badge: 'Best Seller', title: 'Bali with Gili Islands', subtitle: '7N/8D ? Beach & Volcano Trek', discount: 'UPTO ?3,500 OFF' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/everest-base-camp', badge: 'Bucket List', title: 'Everest Base Camp', subtitle: '13D/12N ? The trek of a lifetime', discount: 'Starting ?74,999' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/annapurna-base-camp', badge: 'Classic', title: 'Annapurna Base Camp', subtitle: '8D/7N ? Himalayan sanctuary trek', discount: 'From ?34,999' },
  ],
  [
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/bucket-list-sale', badge: 'Winter Sale', title: 'Bucket List Sale', subtitle: 'Handpicked treks at best prices', discount: 'UPTO 40% OFF' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks', badge: 'New Launch', title: 'Thailand - Phuket Krabi', subtitle: 'Full Moon Party Edition', discount: 'UPTO ?3,500 OFF' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/kedarkantha', badge: 'Winter Special', title: 'Kedarkantha Winter Trek', subtitle: 'India\'s #1 winter trek - 5D/4N', discount: 'From ?6,999' },
  ],
  [
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/bucket-list-sale', badge: 'Expedition', title: 'Tawang Bike Expedition', subtitle: 'North East India ? 8N/9D', discount: 'Bestseller' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks', badge: 'Squad Goals', title: 'All Girls Trip', subtitle: 'Travel with your soul squad', discount: 'Safe & Fun' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/honeymoon', badge: 'Honeymoon', title: 'Romantic Getaways', subtitle: 'Curated couples packages', discount: 'View Packages' },
  ],
  [
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/travel-gift-cards', badge: 'Gift Cards', title: 'Give the Gift of Adventure', subtitle: 'Valid on all treks & yatras', discount: 'Perfect for loved ones' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/corporate', badge: 'Group Offer', title: 'Group Discounts Up to 20%', subtitle: 'Groups of 4+ save big', discount: 'Bigger Group = Bigger Savings' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/customized', badge: 'Tailor-Made', title: 'Customize Your Himalayan Trek', subtitle: 'Uttarakhand ? Himachal ? Nepal', discount: 'Plan Your Trip' },
  ],
];

export default function TrekDetailContent({ trek, type }: { trek: Trek; type: 'trek' | 'yatra' }) {
  const isTrek = type === 'trek';
  const accent = '#16a34a';
  const badgeText = isTrek ? 'Trek' : 'Yatra';
  const backHref = isTrek ? '/treks' : '/yatra';
  const similarType = isTrek ? 'trek' : 'yatra';

  const [activeSection, setActiveSection] = useState('highlight');
  const [expandedOverview, setExpandedOverview] = useState(false);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());
  const [prepTab, setPrepTab] = useState<'clothing' | 'footwear' | 'gear' | 'health' | 'documents'>('clothing');
  const [policyTab, setPolicyTab] = useState('booking');
  const [men, setMen] = useState(1);
  const [women, setWomen] = useState(0);
  const [pickup, setPickup] = useState('Dehradun');
  const [navVisible, setNavVisible] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const router = useRouter();

  const batches = getMonthlyBatches(trek, 5);
  const selectedBatch = batches.find((b) => b.id === selectedBatchId) || null;
  const minPrice = Math.min(...trek.pricing.map(p => p.price));

  useEffect(() => {
    const firstOpen = getMonthlyBatches(trek, 5).find((b) => b.status !== 'sold-out');
    setSelectedBatchId(firstOpen?.id ?? null);
  }, [trek.id]);

  const scrollToBatches = () => {
    document.getElementById('batches')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const bookNow = (pkg?: string, batch?: TrekBatch | null) => {
    const params = new URLSearchParams();
    if (pkg) params.set('pkg', pkg);
    const departure = batch || selectedBatch || batches.find((b) => b.status !== 'sold-out') || null;
    if (departure) {
      if (!selectedBatchId) setSelectedBatchId(departure.id);
      params.set('date', departure.startDate);
    }
    const q = params.toString();
    router.push(`/booking/${trek.id}${q ? `?${q}` : ''}`);
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
      const el = document.getElementById('sticky-nav');
      if (el) {
        const hero = document.querySelector('[data-hero]');
        if (hero) setNavVisible(hero.getBoundingClientRect().bottom < 0);
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

  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el || el.matches(':hover')) return;
      const maxScroll = el.scrollWidth / 2;
      el.scrollLeft += 0.5;
      if (el.scrollLeft >= maxScroll - 1) {
        el.scrollLeft = 0;
      }
    }, 16);
  }, []);
  useEffect(() => {
    startAutoScroll();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAutoScroll]);

  const toggleDay = (day: number) => {
    setExpandedDays(prev => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  const highlights = [
    { icon: MapPin, label: 'Trek Region', value: trek.state },
    { icon: TrendingUp, label: 'Highest Altitude', value: trek.maxAltitude },
    { icon: Calendar, label: 'Best Season', value: trek.bestSeason },
    { icon: Clock, label: 'Trek Duration', value: trek.duration },
    { icon: Navigation, label: 'Trekking Distance', value: trek.distance },
    { icon: Bed, label: 'Stays', value: 'Camping' },
    { icon: Truck, label: 'Transport', value: trek.location.split(' to ')[0] },
    { icon: ChefHat, label: 'Meals', value: 'Veg Meals' },
  ];

  const prepTabs: { id: typeof prepTab; label: string; icon: LucideIcon }[] = [
    { id: 'clothing', label: 'Clothing', icon: Shirt },
    { id: 'footwear', label: 'Footwear', icon: Footprints },
    { id: 'gear', label: 'Gear', icon: Luggage },
    { id: 'health', label: 'Health', icon: HeartPulse },
    { id: 'documents', label: 'Documents', icon: FileText },
  ];

  const policyData = [
    {
      id: 'booking', label: 'Booking Policy',
      items: [
        'Your seat is considered confirmed only after the required advance payment is received.',
        'The remaining amount must be cleared before departure or as per the instructions shared by the team.',
        'Every participant should carry a valid government photo ID for verification and trek administration.',
        'In case of weather, road, or safety concerns, the itinerary may be adjusted for the well-being of the group.',
      ],
    },
    {
      id: 'cancellation', label: 'Cancellation Policy',
      items: [
        'More than 30 days before departure: Minimal processing deduction may apply; remaining amount can be refunded or adjusted.',
        '15 to 30 days before departure: Partial cancellation charge applicable; remaining balance may be refunded or transferred.',
        '7 to 14 days before departure: Higher cancellation charge applies due to transport, permits, and staffing commitments.',
        'Less than 7 days before departure: Booking is generally non-refundable due to final operational commitments.',
        'No show / trek departure missed: No refund is usually applicable once reporting is missed without prior written coordination.',
      ],
    },
  ];

  const seasons = [
    {
      period: 'June to Early July', title: 'Snow Season',
      temps: { day: '12?C - 18?C', night: '0?C - 5?C', high: '5?C - 12?C' },
      desc: 'Best time to experience snow on the trail. Snow still covers the pass and upper sections. Lower sections are green with early-season wildflowers.',
      highlights: ['Snowfields on the pass crossing', 'Panoramic white peaks and glaciers', 'Early wildflowers in lower meadows'],
      gear: ['Microspikes essential', 'Gaiters recommended'],
      crowd: 'Moderate',
    },
    {
      period: 'July to August', title: 'Green Season & Peak Bloom',
      temps: { day: '15?C - 20?C', night: '3?C - 8?C', high: '8?C - 15?C' },
      desc: 'Best time for wildflowers and lush green meadows. Meadows explode into bloom. The Kullu side is at its greenest with dramatic contrast to the Lahaul side.',
      highlights: ['Peak wildflower season', 'Lush green valleys on Kullu side', 'Dramatic landscape contrast'],
      gear: ['Rain jacket for occasional showers', 'Waterproof backpack cover'],
      crowd: 'High - peak season',
    },
    {
      period: 'September', title: 'Clear Skies & Autumn Colors',
      temps: { day: '10?C - 15?C', night: '-2?C - 3?C', high: '5?C - 10?C' },
      desc: 'Best time for mountain views and photography. Monsoon clears, skies are crisp. Meadows turn golden-brown. Nights are colder with frost common.',
      highlights: ['Crystal clear mountain views', 'Golden autumn landscapes', 'Best photography conditions'],
      gear: ['Full layering essential', 'Down jacket mandatory'],
      crowd: 'Moderate to Low',
    },
  ];

  return (
    <div className="pt-16 lg:pt-20 bg-[#f8fafb] pb-[88px] lg:pb-0 overflow-x-clip max-w-full">
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
                        <span className="text-white/40 text-sm line-through">?{(trek.pricing[0]?.originalPrice || minPrice + 2000).toLocaleString()}</span>
                      </div>
                      <p className="text-white/40 text-[11px] mt-0.5">per person + 5% GST</p>
                    </div>
                    <div className="bg-[#16a34a]/20 rounded-full px-3 py-1.5">
                      <p className="text-[11px] text-[#16a34a] font-bold">Save ?{((trek.pricing[0]?.originalPrice || minPrice + 2000) - minPrice).toLocaleString()}</p>
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

      {/* ========== QUICK INFO BAR ========== */}
      <div className="relative -mt-8 lg:-mt-12 z-20 container mx-auto px-4 lg:px-6 mb-8 lg:mb-12">
        {/* Mobile: 2-col cards — no cramped 4-col squeeze under FABs */}
        <div className="grid grid-cols-2 gap-2.5 lg:hidden">
          {highlights.slice(0, 8).map((h, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-3.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#f0fdf4] flex items-center justify-center mb-2">
                <h.icon className="w-4 h-4" style={{ color: accent }} />
              </div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium truncate">{h.label}</p>
              <p className="font-bold text-sm text-gray-900 mt-0.5 leading-snug break-words">{h.value}</p>
            </div>
          ))}
        </div>
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg shadow-black/5 border border-gray-100/80 p-5">
          <div className="grid grid-cols-8 gap-6">
            {highlights.slice(0, 8).map((h, i) => (
              <div key={i} className="text-center min-w-0">
                <h.icon className="w-4 h-4 mx-auto mb-1.5" style={{ color: accent }} />
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">{h.label}</p>
                <p className="font-bold text-sm text-gray-900 mt-0.5">{h.value}</p>
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
                className={`shrink-0 text-[11px] lg:text-sm font-medium px-2.5 lg:px-5 py-3 lg:py-4 border-b-2 transition-all whitespace-nowrap ${activeSection === l.id ? '' : 'border-transparent text-gray-400 hover:text-gray-700'}`}
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

            {/* --- Photo Gallery --- */}
            <section id="highlight">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Photos</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">Trip Gallery</h2>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm overflow-hidden">
                <div className="relative cursor-pointer" onClick={() => setLightboxIdx(0)}>
                  <img src={trek.images[0]} alt={trek.title} className="w-full h-56 lg:h-72 object-cover hover:opacity-95 transition-opacity" />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity bg-black/50 text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2">
                      <Camera className="w-4 h-4" /> View Photos
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 p-1">
                  {trek.images.slice(0, 8).map((img, i) => (
                    <div key={i} className="relative cursor-pointer aspect-square overflow-hidden rounded-lg" onClick={() => setLightboxIdx(i)}>
                      <img src={img} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                      {i === 7 && trek.images.length > 8 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-sm" onClick={() => setShowAllPhotos(true)}>
                          +{trek.images.length - 7} More
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* --- Lightbox --- */}
            {lightboxIdx !== null && (
              <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightboxIdx(null)}>
                <button className="absolute top-4 right-4 text-white/60 hover:text-white z-10 p-2" onClick={() => setLightboxIdx(null)}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
                <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2 disabled:opacity-20" disabled={lightboxIdx === 0} onClick={e => { e.stopPropagation(); setLightboxIdx(i => Math.max(0, i! - 1)); }}>
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <img src={trek.images[lightboxIdx]} alt="" className="max-w-full max-h-[90vh] object-contain px-16" onClick={e => e.stopPropagation()} />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2 disabled:opacity-20" disabled={lightboxIdx === trek.images.length - 1} onClick={e => { e.stopPropagation(); setLightboxIdx(i => Math.min(trek.images.length - 1, i! + 1)); }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
                <div className="absolute bottom-4 text-white/40 text-sm">{lightboxIdx + 1} / {trek.images.length}</div>
              </div>
            )}

            {/* --- Trek Highlights --- */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Trek Highlights</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">Highlight</h2>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {highlights.map((h, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100/80 shadow-sm p-4 text-center hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2.5" style={{ backgroundColor: `${accent}15` }}>
                      <h.icon className="w-5 h-5" style={{ color: accent }} />
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">{h.label}</p>
                    <p className="font-bold text-sm lg:text-base text-gray-900 mt-0.5">{h.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <Banners embedded items={detailBannerSets[0]} />

            {/* --- OVERVIEW --- */}
            <section id="overview">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Trek Overview</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">About {trek.title}</h2>
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
                {trek.highlights.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="font-bold text-base text-gray-900 mb-3">Why Trekkers Love It</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {trek.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: accent }} />
                          {h}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            <Banners embedded items={detailBannerSets[1]} />

            {/* --- ITINERARY --- */}
            <section id="itinerary">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Itinerary</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">Day wise plan</h2>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-gray-100/80 shadow-sm mb-6">
                <img src={trek.mapImage} alt="Route map" className="w-full h-48 lg:h-56 object-cover" />
              </div>

              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                A detailed day-by-day breakdown covering forest trails, glacial valleys, river crossings, campsite experiences, summit day, and the complete journey.
              </p>

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
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <h3 className="font-bold text-base lg:text-lg text-gray-900">{day.title}</h3>
                              {day.altitude && <p className="text-xs text-gray-400 mt-0.5">Max Altitude: {day.altitude}</p>}
                            </div>
                            {idx === 0 && <span className="shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700">Start</span>}
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

            {/* --- BATCHES (5 monthly departures) --- */}
            <BatchSection
              batches={batches}
              selectedId={selectedBatchId}
              onSelect={(batch) => setSelectedBatchId(batch.id)}
              onBook={(batch) => bookNow(undefined, batch)}
              accent={accent}
              tripLabel={isTrek ? 'trek' : 'yatra'}
            />

            {/* --- INCLUSIONS & EXCLUSIONS --- */}
            <section id="in-ex">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>What's Covered</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">Inclusion & exclusion</h2>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                A complete overview of all inclusions and exclusions covering camping accommodation, meals, trek support, permits, safety equipment, and important expenses trekkers should know before booking.
              </p>
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
                        <span className="w-4 h-4 text-red-400 shrink-0 mt-0.5 text-center leading-4 text-xs">?</span>
                        {exc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <Banners embedded items={detailBannerSets[2]} />

            {/* --- BEST TIME TO VISIT --- */}
            <section id="best-time">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Seasonal Guide</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">Best Time to Visit</h2>
                </div>
              </div>
              <div className="space-y-4">
                {seasons.map((s, i) => (
                  <details key={i} className="bg-white rounded-xl border border-gray-100/80 shadow-sm overflow-hidden group" open={i === 0}>
                    <summary className="p-5 lg:p-6 cursor-pointer list-none flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-blue-400' : i === 1 ? 'bg-green-400' : 'bg-amber-400'}`} />
                        <div>
                          <h3 className="font-bold text-base lg:text-lg text-gray-900">{s.period}</h3>
                          <p className="text-xs text-gray-400 font-medium">{s.title}</p>
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform duration-300 shrink-0" />
                    </summary>
                    <div className="px-5 lg:px-6 pb-5 lg:pb-6 border-t border-gray-50 pt-4 space-y-4">
                      <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-blue-50/60 rounded-xl p-3 text-center">
                          <SunMedium className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                          <p className="text-[10px] text-gray-400">Day Temp</p>
                          <p className="text-xs font-bold text-gray-800">{s.temps.day}</p>
                        </div>
                        <div className="bg-indigo-50/60 rounded-xl p-3 text-center">
                          <MountainSnow className="w-4 h-4 mx-auto mb-1 text-indigo-500" />
                          <p className="text-[10px] text-gray-400">High Camp</p>
                          <p className="text-xs font-bold text-gray-800">{s.temps.high}</p>
                        </div>
                        <div className="bg-purple-50/60 rounded-xl p-3 text-center">
                          <Moon className="w-4 h-4 mx-auto mb-1 text-purple-500" />
                          <p className="text-[10px] text-gray-400">Night Temp</p>
                          <p className="text-xs font-bold text-gray-800">{s.temps.night}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-2">Highlights:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {s.highlights.map((h, j) => (
                            <span key={j} className="text-[11px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{h}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Crowd: <span className="font-semibold text-gray-700">{s.crowd}</span></span>
                        <span className="text-gray-500">Gear: <span className="font-semibold text-gray-700">{s.gear.join(', ')}</span></span>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* --- THINGS TO CARRY --- */}
            <section id="things-to-carry">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Packing Guide</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">Things to Carry</h2>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Pack for two realities: warm sunshine at lower camps and sub-zero frost at higher altitudes. Keep your pack under 10 kg.
              </p>
              <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm overflow-hidden">
                <div className="flex overflow-x-auto scrollbar-none border-b border-gray-100">
                  {prepTabs.map(tab => (
                    <button key={tab.id} onClick={() => setPrepTab(tab.id)}
                      className={`shrink-0 flex items-center gap-1.5 px-4 py-3.5 text-xs lg:text-sm font-medium border-b-2 transition-all ${prepTab === tab.id ? '' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                      style={prepTab === tab.id ? { color: accent, borderColor: accent, backgroundColor: `${accent}06` } : {}}>
                      <tab.icon className="w-4 h-4" /> {tab.label}
                    </button>
                  ))}
                </div>
                <div className="p-6 lg:p-7">
                  <ul className="space-y-3">
                    {packingData[prepTab].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: accent }} />
                        {item.item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* --- HOW TO REACH --- */}
            <section id="how-to-reach">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Travel Plan</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">How to Reach</h2>
                </div>
              </div>
              <div className="space-y-5">
                <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-6 lg:p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: accent }}>
                      <Plane className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-gray-900">Reach Base Camp</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Plan your journey to the trek starting point</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { num: 1, text: `Reach ${trek.location.split(' to ')[0]} by train, bus, or flight. It is well connected to major cities like Delhi.` },
                      { num: 2, text: 'Drive to the base village (approx. 8-10 hours) via scenic mountain roads offering stunning views of rivers, valleys, and forested hills.' },
                      { num: 3, text: 'Arrive and rest at the base village. Proper rest is recommended before starting the trek.' },
                    ].map(step => (
                      <div key={step.num} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg text-white text-xs font-bold shrink-0 mt-0.5" style={{ backgroundColor: accent }}>{step.num}</span>
                        <p className="text-sm text-gray-500 leading-relaxed">{step.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-4 lg:p-5">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <p className="font-semibold mb-0.5">Important Travel Info</p>
                      <p>Last ATM: {trek.location.split(' to ')[0]}. Withdraw enough cash for the full trek. Assume no network connectivity beyond this point.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* --- POLICY --- */}
            <section id="policy">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Terms & Rules</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">Policy</h2>
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
                  {policyTab === 'booking' ? (
                    <ul className="space-y-3">
                      {policyData[0].items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                          <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="space-y-3">
                      {[
                        { period: 'More than 30 days', charge: 'Minimal processing fee', color: 'bg-green-50 border-green-200' },
                        { period: '15 to 30 days', charge: 'Partial cancellation charge', color: 'bg-yellow-50 border-yellow-200' },
                        { period: '7 to 14 days', charge: 'Higher cancellation charge', color: 'bg-orange-50 border-orange-200' },
                        { period: 'Less than 7 days', charge: 'Non-refundable', color: 'bg-red-50 border-red-200' },
                      ].map((row, i) => (
                        <div key={i} className={`flex items-center justify-between p-3 lg:p-4 rounded-xl border ${row.color}`}>
                          <span className="text-sm font-semibold text-gray-800">{row.period}</span>
                          <span className="text-xs text-gray-600">{row.charge}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* --- FAQ --- */}
            <section id="faq">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Helpful Answers</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">FAQ&apos;s</h2>
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

            <Banners embedded items={detailBannerSets[3]} />

            {/* --- RENT A GEAR --- */}
            <section id="rent-gear">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Equipment</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">Rent a Gear</h2>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
                {gearRentals.map((g, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100/80 shadow-sm p-4 lg:p-5 text-center hover:shadow-md transition-all group">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-gray-100 group-hover:border-[#16a34a]/30 transition-colors">
                      <img src={g.img} alt={g.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-semibold text-xs lg:text-sm text-gray-900">{g.name}</h4>
                    <p className="text-[#16a34a] font-bold text-sm lg:text-base mt-1">₹{g.price}<span className="text-gray-400 text-[10px] font-normal">/trek</span></p>
                    <button type="button" onClick={enquireNow} className="mt-2.5 text-[10px] font-semibold text-gray-500 hover:text-[#16a34a] transition-colors">
                      Rent Now ?
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 text-center mt-3">+ 5% GST applicable on all rentals</p>
            </section>

            {/* --- REVIEWS --- */}
            <section>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 lg:mb-10">
                <div className="flex items-start gap-3">
                  <div className="w-1 h-10 rounded-full shrink-0 mt-0.5" style={{ backgroundColor: accent }} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>REVIEWS</p>
                    <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mt-1">What our Clients Say About Us</h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
                      <div className="flex items-center gap-1.5">
                        <div className="flex">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="font-bold text-gray-900 text-base">4.8</span>
                        <span className="text-gray-400 text-xs">Rating</span>
                      </div>
                      <span className="text-gray-200 hidden sm:inline">|</span>
                      <span className="text-gray-500 text-sm font-medium">
                        <span className="font-bold text-gray-700">10,000+</span> Verified Reviews
                      </span>
                    </div>
                  </div>
                </div>
                <Link href="/reviews"
                  className="hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-[#16a34a] transition-colors shrink-0">
                  See all reviews <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Carousel wrapper with edge fade */}
              <div className="relative">
                {/* Gradient edge masks */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 lg:w-24 z-10 bg-gradient-to-r from-[#f8fafb] to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 lg:w-24 z-10 bg-gradient-to-l from-[#f8fafb] to-transparent" />

                <div ref={scrollRef}
                  className="flex gap-4 lg:gap-6 overflow-x-auto overscroll-x-contain touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-2 lg:py-4 cursor-grab active:cursor-grabbing scroll-smooth max-w-full"
                  onMouseEnter={() => { if (intervalRef.current) clearInterval(intervalRef.current) }}
                  onMouseLeave={() => { startAutoScroll() }}>
                  {[...sampleTestimonials, ...sampleTestimonials].map((t, i) => (
                    <div key={i}
                      className="min-w-[280px] lg:min-w-[380px] bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 p-5 lg:p-7 shrink-0 select-none group">
                      {/* Top: avatar + name + platform */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base shadow-sm"
                              style={{ backgroundColor: accent }}>
                              {t.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.12)]">
                              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-blue-500"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-sm lg:text-[15px] text-gray-900 whitespace-nowrap">{t.name}</p>
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3 inline" />
                              {t.city}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="flex items-center gap-0.5 mb-0.5 justify-end">
                            {[1,2,3,4,5].map(s => (
                              <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-[10px] font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{t.platform}</span>
                        </div>
                      </div>
                      {/* Quote text */}
                      <div className="relative">
                        <svg className="absolute -top-1 -left-1 w-6 h-6 lg:w-7 lg:h-7 text-[#16a34a]/10" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z"/></svg>
                        <p className="text-sm lg:text-[15px] text-gray-500 leading-relaxed pl-5 lg:pl-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                          &ldquo;{t.text}&rdquo;
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile "See all reviews" link */}
              <div className="flex justify-center mt-6 lg:hidden">
                <Link href="/reviews"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-[#16a34a] transition-colors">
                  See all reviews <ArrowRight className="w-4 h-4" />
                </Link>
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
                    <div className="inline-flex items-center gap-1.5 mt-2 bg-[#16a34a]/10 text-[#16a34a] text-xs font-bold px-3 py-1 rounded-full">
                      <Sparkles className="w-3 h-3" /> Save ?{((trek.pricing[0]?.originalPrice || minPrice + 2000) - minPrice).toLocaleString()}
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5 tracking-wide">Occupancy</label>
                      <select value={pickup} onChange={e => setPickup(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 bg-white transition-all">
                        <option>Triple Sharing</option>
                        <option>Twin Sharing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5 tracking-wide">Pickup Location</label>
                      <select value={pickup} onChange={e => setPickup(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 bg-white transition-all">
                        <option>{trek.location.split(' to ')[0]}</option>
                        <option>Manali</option>
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

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5 tracking-wide">Add ons</label>
                      <div className="space-y-2">
                        {[
                          { label: 'Backpack Offloading', price: '+ ?1,600' },
                          { label: 'Insurance', price: '+ ?170' },
                          { label: 'Jumbo Bag', price: '+ ?2,500' },
                        ].map((addon, i) => (
                          <label key={i} className="flex items-center justify-between px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50/50 cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-2.5">
                              <input type="checkbox" className="accent-[#16a34a] w-4 h-4" />
                              <span className="text-sm text-gray-600">{addon.label}</span>
                            </div>
                            <span className="text-xs text-gray-400">{addon.price}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 mb-5 border border-gray-100/80 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal ({totalPersons} × ₹{minPrice})</span>
                      <span className="font-semibold text-gray-800">?{(totalPersons * minPrice).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">GST (5%)</span>
                      <span className="font-semibold text-gray-800">₹{Math.ceil(totalPersons * minPrice * 0.05).toLocaleString()}</span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">Total Price</span>
                      <span className="font-bold text-xl" style={{ color: accent }}>?{(totalPersons * minPrice + Math.ceil(totalPersons * minPrice * 0.05)).toLocaleString()}</span>
                    </div>
                  </div>

                  {selectedBatch && (
                    <div className="mb-3 rounded-xl border border-[#16a34a]/20 bg-[#16a34a]/5 px-3.5 py-2.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#16a34a]">Selected batch</p>
                      <p className="text-sm font-bold text-gray-900 mt-0.5">{selectedBatch.label}</p>
                      <button
                        type="button"
                        onClick={scrollToBatches}
                        className="text-[11px] font-semibold text-gray-500 hover:text-[#16a34a] mt-1"
                      >
                        Change batch
                      </button>
                    </div>
                  )}

                  <button type="button" onClick={() => bookNow()} className="w-full flex items-center justify-center gap-2 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:opacity-90" style={{ backgroundColor: accent }}>
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
                    <a href="mailto:info@indiantreks.com" className="flex items-center gap-2.5 text-gray-500 hover:text-gray-700 transition-colors text-xs">
                      <Mail className="w-4 h-4" style={{ color: accent }} /> info@indiantreks.com
                    </a>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                    <Shield className="w-3.5 h-3.5" /> Secure booking &middot; Easy cancellation
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 lg:p-7 text-white shadow-lg">
                <h3 className="font-bold text-base mb-4">Why Indian Treks?</h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { icon: Award, label: 'Curated Himalayan Adventures', desc: 'Thoughtfully planned mountain journeys' },
                    { icon: Shield, label: 'Safety-Led Operations', desc: 'Responsible travel with guided support' },
                    { icon: Users, label: 'Personal Assistance', desc: 'Quick help before and after booking' },
                    { icon: Mountain, label: 'Authentic Access', desc: 'Meaningful routes and real experiences' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4" style={{ color: '#16a34a' }} />
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

      {/* ========== MOBILE PRICING (in-flow) ========== */}
      <div className="lg:hidden bg-[#f3f4f6] -mx-4 px-4 py-6 mt-6 border-t border-gray-200">
        <div className="max-w-lg mx-auto space-y-4">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Offer Price</p>
            <div className="flex items-baseline justify-center gap-2 mt-1">
              <span className="text-3xl font-bold" style={{ color: accent }}>₹{minPrice.toLocaleString()}</span>
              {trek.pricing[0]?.originalPrice && (
                <span className="text-gray-400 line-through">₹{trek.pricing[0].originalPrice.toLocaleString()}</span>
              )}
            </div>
            <p className="text-xs text-gray-400">per person + 5% GST</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-semibold text-gray-500 mb-3">Travelers</p>
            <div className="space-y-2.5">
              {[
                { label: 'Men', val: men, set: setMen },
                { label: 'Women', val: women, set: setWomen },
              ].map(t => (
                <div key={t.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{t.label}</span>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => t.set(Math.max(0, t.val - 1))} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100"><Minus className="w-3.5 h-3.5 text-gray-500" /></button>
                    <span className="text-sm font-bold text-gray-900 w-5 text-center">{t.val}</span>
                    <button type="button" onClick={() => t.set(t.val + 1)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100"><Plus className="w-3.5 h-3.5 text-gray-500" /></button>
                  </div>
                </div>
              ))}
            </div>
            {totalPersons > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Base ({totalPersons} × ₹{minPrice})</span><span className="font-semibold text-gray-800">₹{(totalPersons * minPrice).toLocaleString()}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">GST (5%)</span><span className="font-semibold text-gray-800">₹{Math.ceil(totalPersons * minPrice * 0.05).toLocaleString()}</span></div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-lg" style={{ color: accent }}>₹{(totalPersons * minPrice + Math.ceil(totalPersons * minPrice * 0.05)).toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>

          {selectedBatch && (
            <button type="button" onClick={scrollToBatches} className="w-full text-center text-xs text-gray-500">
              Batch <span className="font-semibold text-gray-800">{selectedBatch.label}</span>
              <span className="text-[#16a34a] font-semibold"> · Change</span>
            </button>
          )}
        </div>
      </div>

      {/* ========== MOBILE STICKY BOOK BAR (replaces tab nav on detail) ========== */}
      <div className="fixed inset-x-0 bottom-0 z-[55] lg:hidden bg-white border-t border-gray-200 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom,0px)]">
        <div className="px-3 pt-2.5 pb-2.5 max-w-lg mx-auto w-full">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={scrollToBatches}
              className="min-w-0 flex-1 text-left rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 active:bg-gray-100"
              aria-label="Choose batch dates"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                {selectedBatch ? 'Selected batch' : 'Choose dates'}
              </p>
              <p className="text-sm font-bold text-gray-900 truncate leading-tight mt-0.5">
                {selectedBatch ? selectedBatch.label : 'Pick from 5 monthly batches'}
              </p>
              <p className="text-[11px] text-[#16a34a] font-semibold mt-0.5">
                ₹{minPrice.toLocaleString()}
                <span className="text-gray-400 font-normal"> /person</span>
              </p>
            </button>
            <button
              type="button"
              onClick={() => bookNow()}
              className="shrink-0 inline-flex items-center justify-center gap-1.5 text-white font-bold text-sm px-5 py-3.5 rounded-xl shadow-md active:opacity-90"
              style={{ backgroundColor: accent }}
            >
              Book Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function Moon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
