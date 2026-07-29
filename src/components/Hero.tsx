'use client';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search, Star, ChevronLeft, ChevronRight, Users, Award, Shield,
  ArrowRight, MapPin, Calendar, Heart, ChevronDown, MessageSquare,
  Mountain, Footprints, SunMedium, Quote, X,
} from 'lucide-react';
import { treks } from '@/lib/data';

const mobBanners = [
  { image: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_600,h_350,c_fill,g_auto/&q=80', title: 'Explore the Himalayas', subtitle: "Trek through the world's most breathtaking ranges", cta: 'Explore Treks', cat: 'trek' },
  { image: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_600,h_350,c_fill,g_auto/&q=80', title: 'Sacred Yatras', subtitle: 'Journey to ancient temples in the mountains', cta: 'Explore Yatras', cat: 'yatra' },
  { image: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_600,h_350,c_fill,g_auto/&q=80', title: 'International Adventures', subtitle: 'Nepal, Bali, Thailand, Bhutan & beyond', cta: 'Explore Global', cat: 'international' },
  { image: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_600,h_350,c_fill,g_auto/&q=80', title: 'Winter Wonderland', subtitle: 'Snow treks, frozen lakes & starry nights', cta: 'Winter Treks', cat: 'trek' },
];

const catItems = [
  { n: 'Bucket List', h: '/bucket-list-sale', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_300,h_300,c_fill,g_auto/&q=80' },
  { n: 'Long Weekend', h: '/treks?difficulty=easy', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_300,h_300,c_fill,g_auto/&q=80' },
  { n: 'International', h: '/treks?region=nepal', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_300,h_300,c_fill,g_auto/&q=80' },
  { n: 'Treks', h: '/treks', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_300,h_300,c_fill,g_auto/&q=80' },
  { n: 'Yatras', h: '/yatra', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_300,h_300,c_fill,g_auto/&q=80' },
  { n: 'Ladakh', h: '/treks?region=ladakh', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_300,h_300,c_fill,g_auto/&q=80' },
  { n: 'Biking', h: '/treks', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_300,h_300,c_fill,g_auto/&q=80' },
  { n: 'All Girls', h: '/treks', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_300,h_300,c_fill,g_auto/&q=80' },
  { n: 'Honeymoon', h: '/treks', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_300,h_300,c_fill,g_auto/&q=80' },
  { n: 'Spiti', h: '/treks?region=himachal', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_300,h_300,c_fill,g_auto/&q=80' },
];

const collabItems = [
  { icon: Users, label: '80k+ Travelers', href: '/about', c: 'text-blue-500', bg: 'from-blue-50 to-indigo-50', bd: 'border-blue-200/60' },
  { icon: Award, label: 'ATOAI Recognized', href: '/about', c: 'text-amber-500', bg: 'from-amber-50 to-orange-50', bd: 'border-amber-200/60' },
  { icon: Shield, label: 'Startup India', href: '/corporate', c: 'text-green-500', bg: 'from-green-50 to-emerald-50', bd: 'border-green-200/60' },
  { icon: Heart, label: 'TripAdvisor Choice', href: '/reviews', c: 'text-rose-500', bg: 'from-rose-50 to-pink-50', bd: 'border-rose-200/60' },
  { icon: Calendar, label: '10+ Years Legacy', href: '/about', c: 'text-purple-500', bg: 'from-purple-50 to-violet-50', bd: 'border-purple-200/60' },
];

const deskSlides = [
  { id: 'valley-of-flowers', name: 'Valley of Flowers Trek', sub: 'UNESCO Himalayan Paradise — Alpine meadows, rare flora & stunning snow-capped vistas', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_1920,h_960,c_fill,g_auto/', featureImg: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_800,h_1000,c_fill,g_auto/', t: 'trek', rating: '4.8', duration: '6D/5N', difficulty: 'Moderate', altitude: '14,107 ft', distance: '38 km', reviews: '8k+', season: 'Jul–Sep', group: '6–15' },
  { id: 'kedarkantha', name: 'Kedarkantha Trek', sub: 'Winter Wonderland — Snow-trailed summit with 360° Himalayan panoramas', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_1920,h_960,c_fill,g_auto/', featureImg: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_800,h_1000,c_fill,g_auto/', t: 'trek', rating: '4.9', duration: '5D/4N', difficulty: 'Easy-Moderate', altitude: '12,500 ft', distance: '22 km', reviews: '10k+', season: 'Dec–Apr', group: '6–15' },
  { id: 'kedarnath-yatra', name: 'Kedarnath Yatra', sub: 'Sacred Pilgrimage — One of the 12 Jyotirlingas in the Char Dham circuit', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_1920,h_960,c_fill,g_auto/', featureImg: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_800,h_1000,c_fill,g_auto/', t: 'yatra', rating: '4.8', duration: '6D/5N', difficulty: 'Moderate', altitude: '11,755 ft', distance: '16 km', reviews: '12k+', season: 'May–Oct', group: '10–30' },
  { id: 'annapurna-base-camp', name: 'Annapurna Base Camp', sub: 'Nepal\'s Classic — Trek into the Annapurna Sanctuary amphitheatre', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_1920,h_960,c_fill,g_auto/', featureImg: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_800,h_1000,c_fill,g_auto/', t: 'trek', rating: '4.9', duration: '8D/7N', difficulty: 'Moderate', altitude: '13,550 ft', distance: '90 km', reviews: '15k+', season: 'Mar–May,Sep–Nov', group: '4–12' },
  { id: 'hampta-pass', name: 'Hampta Pass Trek', sub: 'Cross-over Adventure — Lush green Kullu meets barren Spiti valley', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_1920,h_960,c_fill,g_auto/', featureImg: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_800,h_1000,c_fill,g_auto/', t: 'trek', rating: '4.7', duration: '5D/4N', difficulty: 'Moderate', altitude: '14,100 ft', distance: '26 km', reviews: '8k+', season: 'Jun–Oct', group: '6–14' },
];

const destinations = ['Zanskar', 'Thailand', 'Bali', 'Ladakh', 'Spiti', 'Tawang', 'Bhutan'];

export default function Hero() {
  const router = useRouter();
  /* ── shared state ── */
  const [mobSlide, setMobSlide] = useState(0);
  const [collabIdx, setCollabIdx] = useState(0);
  const [collabFade, setCollabFade] = useState(true);
  const [deskSlide, setDeskSlide] = useState(0);
  const [destSlide, setDestSlide] = useState(0);
  const [dest, setDest] = useState('');
  const [date, setDate] = useState('');
  const [pax, setPax] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchIdx, setSearchIdx] = useState(-1);
  const [searchCategory, setSearchCategory] = useState<'all' | 'trek' | 'yatra' | 'international'>('all');
  const searchRef = useRef<HTMLInputElement>(null);
  const searchListRef = useRef<HTMLDivElement>(null);

  const searchItems = useMemo(() =>
    treks.map(t => ({ id: t.id, title: t.title, type: t.type, sub: t.subtitle, region: t.region })), []);

  const searchResults = useMemo(() => {
    let items = searchItems;
    if (searchCategory === 'international') items = items.filter(s => s.region === 'nepal');
    else if (searchCategory !== 'all') items = items.filter(s => s.type === searchCategory);
    const q = searchQuery.toLowerCase().trim();
    if (q) items = items.filter(s => s.title.toLowerCase().includes(q) || s.sub.toLowerCase().includes(q));
    return items.slice(0, 12);
  }, [searchQuery, searchItems, searchCategory]);

  const goSearch = useCallback((id: string, type: string) => {
    setShowSearch(false);
    setSearchQuery('');
    router.push(`/${type === 'yatra' ? 'yatra' : 'treks'}/${id}`);
  }, [router]);

  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSearchIdx(i => Math.min(i + 1, searchResults.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSearchIdx(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && searchResults.length > 0) {
      const idx = searchIdx >= 0 ? searchIdx : 0;
      goSearch(searchResults[idx].id, searchResults[idx].type);
    }
    if (e.key === 'Escape') { setShowSearch(false); setSearchQuery(''); }
  }, [searchResults, searchIdx, goSearch]);

  /* scroll active search result into view */
  useEffect(() => {
    if (searchIdx < 0 || !searchListRef.current) return;
    const el = searchListRef.current.children[searchIdx] as HTMLElement;
    el?.scrollIntoView?.({ block: 'nearest' });
  }, [searchIdx]);

  /* focus input when overlay opens */
  useEffect(() => { if (showSearch) setTimeout(() => searchRef.current?.focus(), 100); }, [showSearch]);

  /* ── cat-scroll refs ── */
  const catRef = useRef<HTMLDivElement>(null);
  const [catL, setCatL] = useState(false);
  const [catR, setCatR] = useState(true);
  const [drag, setDrag] = useState(false);
  const dragX = useRef(0);
  const dragS = useRef(0);
  const moved = useRef(false);

  /* ── timers ── */
  useEffect(() => {
    const t = setInterval(() => setMobSlide(p => (p + 1) % mobBanners.length), 4000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => {
      setCollabFade(false);
      setTimeout(() => { setCollabIdx(p => (p + 1) % collabItems.length); setCollabFade(true); }, 200);
    }, 3000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
      const t = setInterval(() => setDeskSlide(p => (p + 1) % deskSlides.length), 5000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setDestSlide(p => (p + 1) % destinations.length), 2500);
    return () => clearInterval(t);
  }, []);

  /* ── cat-scroll logic ── */
  const checkScroll = useCallback(() => {
    const el = catRef.current; if (!el) return;
    setCatL(el.scrollLeft > 4);
    setCatR(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);
  useEffect(() => {
    const el = catRef.current; if (!el) return;
    checkScroll();
    const h = () => checkScroll();
    el.addEventListener('scroll', h, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => { el.removeEventListener('scroll', h); window.removeEventListener('resize', checkScroll); };
  }, [checkScroll]);
  const catBy = useCallback((d: number) => catRef.current?.scrollBy({ left: d * 88 * 3, behavior: 'smooth' }), []);
  const onPD = useCallback((x: number) => { const el = catRef.current; if (!el) return; setDrag(true); moved.current = false; dragX.current = x; dragS.current = el.scrollLeft; }, []);
  const onPM = useCallback((x: number) => { if (!drag || !catRef.current) return; const dx = x - dragX.current; if (Math.abs(dx) > 5) moved.current = true; catRef.current.scrollLeft = dragS.current - dx; }, [drag]);
  const onPU = useCallback(() => setDrag(false), []);
  useEffect(() => {
    const el = catRef.current; if (!el) return;
    const w = (e: WheelEvent) => { const delta = e.deltaX || e.deltaY; el.scrollLeft += delta; e.preventDefault(); };
    el.addEventListener('wheel', w, { passive: false });
    return () => el.removeEventListener('wheel', w);
  }, []);

  /* ======================== DESKTOP LAYOUT ======================== */
  const Desktop = () => {
    const slide = deskSlides[deskSlide];
    const href = `/${slide.t === 'yatra' ? 'yatra' : 'treks'}/${slide.id}`;
    const diffBadge = (d: string) => {
      const map: Record<string, string> = { 'Easy': 'bg-green-500/20 text-green-300', 'Easy-Moderate': 'bg-emerald-500/20 text-emerald-300', 'Moderate': 'bg-yellow-500/20 text-yellow-300', 'Moderate-Difficult': 'bg-orange-500/20 text-orange-300', 'Difficult': 'bg-red-500/20 text-red-300' };
      return map[d] || 'bg-gray-500/20 text-gray-300';
    };

    return (
    <section className="relative h-[88vh] min-h-[600px] overflow-hidden">
      {/* Background image layer */}
      {deskSlides.map((s, i) => (
        <div key={s.id}
          className={`absolute inset-0 transition-all duration-1000 ${i === deskSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
          <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 h-14">
        <div className="flex items-center gap-2">
          <img src="https://res.cloudinary.com/pg8uhzw0/image/upload/v1785363638/l_kceoj5.png" alt="TrekRoot" className="h-9 w-auto" />
        </div>
        <div className="flex items-center gap-4 text-white/60 text-xs">
          <a href="tel:+919797972175" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            <span>+91 97 97 97 21 75</span>
          </a>
          <Link href="/login" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span>Login</span>
          </Link>
        </div>
      </div>

      {/* Main content area: left info + right photo */}
      <div className="absolute inset-0 z-10 flex items-center" style={{ top: '56px', bottom: '130px' }}>
        <div className="container mx-auto px-10 w-full">
          <div className="flex items-center gap-10 w-full">

            {/* ── LEFT: Trek info ── */}
            <div className="flex-1 max-w-xl" key={slide.id}>
              <span className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase text-[#ffaf21] bg-[#ffaf21]/10 border border-[#ffaf21]/20 px-3 py-1 rounded-full mb-4">
                {slide.t === 'yatra' ? 'Sacred Yatra' : 'Himalayan Trek'}
              </span>

              <h1 className="font-bold text-white text-5xl xl:text-6xl leading-[1.1] mb-3">
                {slide.name}
              </h1>

              <p className="text-white/50 text-base leading-relaxed mb-6 max-w-lg">
                {slide.sub}
              </p>

              {/* Info grid — 2x3 */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-7 max-w-md">
                <InfoRow icon={Star} label="Rating" value={`${slide.rating} (${slide.reviews} reviews)`} accent />
                <InfoRow icon={Calendar} label="Duration" value={slide.duration} />
                <InfoRow icon={Mountain} label="Max Altitude" value={slide.altitude} />
                <InfoRow icon={Footprints} label="Distance" value={slide.distance} />
                <InfoRow icon={SunMedium} label="Best Season" value={slide.season} />
                <InfoRow icon={Users} label="Group Size" value={slide.group} />
              </div>

              <div className="flex items-center gap-2.5 mb-5">
                <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${diffBadge(slide.difficulty)}`}>
                  {slide.difficulty}
                </span>
                <span className="text-white/30 text-xs">|</span>
                <span className="text-white/50 text-xs">{slide.t === 'yatra' ? 'Pilgrimage' : 'Trek'}</span>
              </div>

              <div className="flex items-center gap-3">
                <Link href={href}
                  className="inline-flex items-center gap-2 bg-[#ffaf21] hover:bg-[#d49400] text-gray-900 font-semibold text-sm px-6 py-3 rounded-full transition-all active:scale-95 shadow-lg shadow-[#ffaf21]/30">
                  View Full Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href={`/booking/${slide.id}`}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-sm px-6 py-3 rounded-full border border-white/20 transition-all active:scale-95">
                  Book Now
                </Link>
              </div>
            </div>

            {/* ── RIGHT: Feature photo ── */}
            <div className="hidden xl:block w-[340px] xl:w-[400px] shrink-0">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 group/ph">
                {deskSlides.map((s, i) => (
                  <div key={s.id}
                    className={`absolute inset-0 transition-all duration-1000 ${i === deskSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <img src={s.featureImg} alt={s.name} className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white">
                    <Quote className="w-3.5 h-3.5 text-[#ffaf21]" />
                    <span className="text-xs text-white/70 font-medium leading-tight">
                      {slide.t === 'yatra' ? 'Spiritual journey' : 'Adventure awaits'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="absolute bottom-14 left-0 right-0 z-10 container mx-auto px-10">
        <div className="bg-white rounded-2xl p-3 shadow-2xl shadow-black/20">
          <div className="flex flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-3 bg-gray-50 rounded-xl">
              <MapPin className="w-4 h-4 text-[#ffaf21] shrink-0" />
              <input type="text" aria-label="Destination" placeholder="Where do you want to go?" value={dest}
                onChange={e => { setDest(e.target.value); setSearchQuery(e.target.value); }}
                onKeyDown={e => { if (e.key === 'Enter') { setShowSearch(true); } }}
                className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400" />
              <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
            </div>
            <div className="flex-1 flex items-center gap-2 px-3 py-3 bg-gray-50 rounded-xl">
              <Calendar className="w-4 h-4 text-[#ffaf21] shrink-0" />
              <input type="text" aria-label="Travel date" placeholder="When — Select Date" value={date} onChange={e => setDate(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400" />
            </div>
            <div className="w-40 flex items-center gap-2 px-3 py-3 bg-gray-50 rounded-xl">
              <Users className="w-4 h-4 text-[#ffaf21] shrink-0" />
              <input type="text" aria-label="Travelers" placeholder="Travelers" value={pax} onChange={e => setPax(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400" />
            </div>
            <button type="button" onClick={() => setShowSearch(true)}
              className="flex items-center justify-center gap-2 bg-[#ffaf21] hover:bg-[#d49400] text-gray-900 font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#ffaf21]/30 text-sm whitespace-nowrap shrink-0">
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Dots + hashtag */}
      <div className="absolute bottom-5 left-0 right-0 z-10 flex items-center justify-between px-10">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {deskSlides.map((_, i) => (
              <button key={i} onClick={() => setDeskSlide(i)}
                className={`h-1.5 rounded-full transition-all ${i === deskSlide ? 'bg-[#ffaf21] w-6' : 'bg-white/30 hover:bg-white/50 w-1.5'}`} />
            ))}
          </div>
          <span className="text-white/40 text-xs font-medium tracking-wide hidden xl:block">{slide.name}</span>
        </div>
        <span className="text-white/40 text-xs font-medium bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full">#wravelerforlife</span>
      </div>
    </section>
    );
  };

  const InfoRow = ({ icon: Icon, label, value, accent }: { icon: any; label: string; value: string; accent?: boolean }) => (
    <div className="flex items-center gap-2.5">
      <Icon className={`w-4 h-4 ${accent ? 'text-[#ffaf21]' : 'text-white/40'}`} />
      <div>
        <div className="text-[10px] text-white/40 font-medium uppercase tracking-wider">{label}</div>
        <div className={`text-sm font-semibold ${accent ? 'text-[#ffaf21]' : 'text-white/80'}`}>{value}</div>
      </div>
    </div>
  );

  /* ======================== MOBILE LAYOUT ======================== */
  const Mobile = () => (
    <section className="bg-[#ffaf21] min-h-[50vh]">
      <div className="container mx-auto px-4 pb-3 pt-4">

        {/* 1. Search button */}
        <div>
          <button type="button" onClick={() => setShowSearch(true)}
            className="w-full flex items-center gap-3 bg-white/95 backdrop-blur-sm border border-white/50 rounded-2xl px-5 py-4 shadow-lg shadow-[#d49400]/20 hover:shadow-xl hover:bg-white transition-all active:scale-[0.98]">
            <div className="w-10 h-10 rounded-full bg-[#ffaf21]/20 flex items-center justify-center shrink-0">
              <Search className="w-5 h-5 text-[#d49400]" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="text-sm font-semibold text-gray-900">Where to?</div>
              <div className="text-xs text-gray-500 truncate">Destinations · Treks · Yatras</div>
            </div>
            <div className="text-xs text-gray-600 font-medium bg-[#ffaf21]/30 px-3 py-1.5 rounded-full shrink-0">Search</div>
          </button>
        </div>

        {/* 2. Rating (left) + Rotating collab (right) */}
        <div className="flex items-center gap-2 mt-4">
          <Link href="/reviews"
            className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-white/60 rounded-xl px-3 py-2 active:scale-95 transition-transform shrink-0 shadow-sm">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3.5 fill-[#d49400] text-[#d49400]" />)}
            </div>
            <span className="text-sm font-bold text-gray-800">4.8</span>
            <span className="text-[11px] text-gray-500 font-medium">(10k+)</span>
          </Link>

          <div className="flex-1 min-w-0 flex justify-end">
            {(() => {
              const c = collabItems[collabIdx];
              const Icon = c.icon;
              return (
                <Link key={collabIdx} href={c.href}
                  className={`flex items-center gap-1.5 bg-gradient-to-r ${c.bg} border ${c.bd} rounded-xl px-3 py-2 active:scale-95 transition-all duration-200 ${collabFade ? 'opacity-100' : 'opacity-0'}`}>
                  <Icon className={`w-3.5 h-3.5 ${c.c}`} />
                  <span className="text-[11px] font-semibold text-gray-600">{c.label}</span>
                </Link>
              );
            })()}
          </div>
        </div>

        {/* 3. Banner slider */}
        <div className="relative mt-3 rounded-2xl overflow-hidden group/banner">
          <div className="relative aspect-[21/9]">
            {mobBanners.map((slide, i) => (
              <div key={i}
                className={`absolute inset-0 transition-opacity duration-700 ${i === mobSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="text-white font-bold text-lg leading-tight mb-1">{slide.title}</h2>
                  <p className="text-white/70 text-xs mb-3 max-w-md">{slide.subtitle}</p>
                  <button type="button" onClick={() => { setSearchCategory(slide.cat as any); setSearchQuery(''); setSearchIdx(-1); setShowSearch(true); }}
                    className="inline-flex items-center gap-1.5 bg-[#ffaf21] hover:bg-[#d49400] text-gray-900 font-semibold text-xs px-4 py-2 rounded-full transition-all active:scale-95">
                    {slide.cta}<ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {mobBanners.map((_, i) => (
              <button key={i} type="button" onClick={() => setMobSlide(i)}
                className={`h-1.5 rounded-full transition-all ${i === mobSlide ? 'bg-[#ffaf21] w-5' : 'bg-white/50 w-1.5'}`} />
            ))}
          </div>
        </div>

        {/* 4. Instagram-style categories */}
        <div className="relative mt-4 select-none">
          <div className="relative group/cat">
            {catL && (
              <button type="button" onClick={() => catBy(-1)}
                className="hidden lg:flex absolute left-0 top-[30px] z-10 w-8 h-8 items-center justify-center rounded-full bg-white shadow-lg border border-gray-100 text-gray-500 hover:text-[#ffaf21] transition-all -translate-x-4 opacity-0 group-hover/cat:opacity-100 group-hover/cat:translate-x-0">
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {catR && (
              <button type="button" onClick={() => catBy(1)}
                className="hidden lg:flex absolute right-0 top-[30px] z-10 w-8 h-8 items-center justify-center rounded-full bg-white shadow-lg border border-gray-100 text-gray-500 hover:text-[#ffaf21] transition-all translate-x-4 opacity-0 group-hover/cat:opacity-100 group-hover/cat:translate-x-0">
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <div ref={catRef}
              onMouseDown={e => onPD(e.clientX)} onMouseMove={e => onPM(e.clientX)}
              onMouseUp={onPU} onMouseLeave={onPU}
              onTouchStart={e => onPD(e.touches[0].clientX)} onTouchMove={e => onPM(e.touches[0].clientX)}
              onTouchEnd={onPU}
              className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-none cursor-grab active:cursor-grabbing"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {catItems.map(c => (
                <Link key={c.n} href={c.h} onClick={e => { if (moved.current) e.preventDefault(); }}
                  className="flex flex-col items-center gap-1.5 snap-start shrink-0 w-[68px]">
                  <div className="w-[68px] h-[68px] rounded-full p-[3px] bg-gradient-to-br from-[#ffaf21] via-[#ff7a21] to-[#ff4d6a] hover:scale-105 transition-transform duration-200 shadow-sm">
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                      <img src={c.img} alt={c.n} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-700 font-semibold text-center leading-tight max-w-[68px]">{c.n}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );

  return (
    <>
      <div className="mt-14 lg:mt-[72px] lg:hidden"><Mobile /></div>
      <div className="hidden lg:block"><Desktop /></div>

      {/* ── Search Overlay ── */}
      {showSearch && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm"
          onClick={e => { if (e.target === e.currentTarget) { setShowSearch(false); setSearchQuery(''); } }}>
          <div className="w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl shadow-black/30 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
              <Search className="w-5 h-5 text-[#ffaf21] shrink-0" />
              <input ref={searchRef} type="text" autoComplete="off" aria-label="Search treks & yatras"
                placeholder="Search treks, yatras, destinations..."
                value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setSearchIdx(-1); }}
                onKeyDown={handleSearchKeyDown}
                className="flex-1 bg-transparent outline-none text-base text-gray-800 placeholder:text-gray-400" />
              <button type="button" onClick={() => { setShowSearch(false); setSearchQuery(''); }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-1.5 px-4 py-2 border-b border-gray-100 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {[
                { key: 'all', label: 'All' },
                { key: 'trek', label: 'Treks' },
                { key: 'yatra', label: 'Yatras' },
                { key: 'international', label: 'International' },
              ].map(c => (
                <button key={c.key} type="button" onClick={() => { setSearchCategory(c.key as any); setSearchIdx(-1); }}
                  className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${searchCategory === c.key ? 'bg-[#ffaf21] text-gray-900' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                  {c.label}
                </button>
              ))}
            </div>
            <div ref={searchListRef} className="max-h-[50vh] overflow-y-auto py-2">
              {searchQuery.trim() && searchResults.length === 0 && (
                <div className="px-5 py-8 text-center">
                  <Search className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                  <p className="text-sm text-gray-400">No results found for &ldquo;{searchQuery}&rdquo;</p>
                  <p className="text-xs text-gray-300 mt-1">Try a different search term</p>
                </div>
              )}
              {!searchQuery.trim() && searchCategory === 'all' && (
                <div className="px-5 py-8 text-center">
                  <Mountain className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                  <p className="text-sm text-gray-400">Type to search or select a category</p>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                    {['Valley of Flowers', 'Kedarkantha', 'Everest', 'Hampta Pass', 'Kedarnath', 'Triund'].map(tag => (
                      <button key={tag} type="button" onClick={() => { setSearchQuery(tag); setSearchIdx(-1); searchRef.current?.focus(); }}
                        className="text-xs bg-gray-100 hover:bg-[#ffaf21]/10 hover:text-[#b87800] text-gray-500 px-3 py-1.5 rounded-full transition-colors">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {searchResults.length > 0 && searchResults.map((s, i) => (
                <button key={s.id} type="button" onClick={() => goSearch(s.id, s.type)}
                  onMouseEnter={() => setSearchIdx(i)}
                  className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${i === searchIdx ? 'bg-[#ffaf21]/10' : 'hover:bg-gray-50'}`}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${s.type === 'yatra' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {s.type === 'yatra' ? <SunMedium className="w-5 h-5" /> : <Mountain className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">{s.title}</div>
                    <div className="text-xs text-gray-400 truncate">{s.sub}</div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.type === 'yatra' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {s.type === 'yatra' ? 'Yatra' : 'Trek'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-300" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
