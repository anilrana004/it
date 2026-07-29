'use client';
import { heroSlides } from '@/lib/data';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';

const destinations = ['Zanskar', 'Thailand', 'Bali', 'Ladakh', 'Spiti', 'Tawang', 'Bhutan'];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [destSlide, setDestSlide] = useState(0);
  const [dest, setDest] = useState('');
  const [date, setDate] = useState('');
  const [pax, setPax] = useState('');

  useEffect(() => { const t = setInterval(() => setCurrent(p => (p+1)%heroSlides.length), 5000); return () => clearInterval(t); }, []);
  useEffect(() => { const t = setInterval(() => setDestSlide(p => (p+1)%destinations.length), 2500); return () => clearInterval(t); }, []);

  return (
    <section className="relative h-[60vh] min-h-[520px] lg:min-h-screen overflow-hidden mt-14 lg:mt-[72px]">
      {heroSlides.map((s, i) => (
        <div key={s.name} className={`absolute inset-0 transition-opacity duration-1000 ${i===current?'opacity-100':'opacity-0'}`}>
          <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 lg:px-8 h-12 lg:h-14">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 lg:w-9 lg:h-9 bg-gradient-to-br from-[#afde1e] to-[#afde1e] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs lg:text-sm">TR</span>
          </div>
          <span className="font-bold text-white text-sm lg:text-lg hidden sm:block">TrekRoot</span>
        </div>
        <div className="flex items-center gap-3 lg:gap-4 text-white/60 text-xs">
          <a href="tel:+919797972175" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            <span className="hidden lg:inline">+91 97 97 97 21 75</span>
          </a>
          <Link href="/login" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="hidden lg:inline">Login</span>
          </Link>
        </div>
      </div>

      {/* Hero content with rotating destination */}
      <div className="relative z-10 h-[calc(100%-48px)] flex items-center">
        <div className="container mx-auto px-4 lg:px-8 w-full">
          <div className="max-w-2xl">
            <p className="text-white/70 font-semibold text-[10px] lg:text-sm tracking-[0.25em] uppercase mb-2">Wander | Travel | Connect | Repeat</p>
            <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-2">
              Book Your Trip to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#afde1e] to-[#afde1e] transition-all duration-500 block sm:inline text-2xl sm:text-4xl lg:text-6xl xl:text-7xl mt-1 sm:mt-0">
                {destinations[destSlide]}
              </span>
            </h1>
            <p className="text-white/60 text-xs lg:text-lg mb-5 max-w-lg leading-relaxed">Where Adventure meets Community  <span className="hidden lg:inline">— More Than Just Travel</span></p>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 -mt-6 lg:-mt-12">
        <div className="bg-white rounded-xl lg:rounded-2xl p-2.5 lg:p-3 shadow-2xl shadow-black/20">
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="lg:flex-1 flex items-center gap-2 px-3 py-2.5 lg:py-3 bg-gray-50 rounded-lg lg:rounded-xl">
              <MapPin className="w-4 h-4 text-[#afde1e] shrink-0" />
              <input type="text" aria-label="Destination" placeholder="Where do you want to go?" value={dest} onChange={e=>setDest(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400" />
              <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 hidden lg:block" />
            </div>
            <div className="lg:flex-1 flex items-center gap-2 px-3 py-2.5 lg:py-3 bg-gray-50 rounded-lg lg:rounded-xl">
              <Calendar className="w-4 h-4 text-[#afde1e] shrink-0" />
              <input type="text" aria-label="Travel date" placeholder="When — Select Date" value={date} onChange={e=>setDate(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400" />
            </div>
            <div className="lg:flex-1 flex items-center gap-2 px-3 py-2.5 lg:py-3 bg-gray-50 rounded-lg lg:rounded-xl">
              <Users className="w-4 h-4 text-[#afde1e] shrink-0" />
              <input type="text" aria-label="Number of travelers" placeholder="Travelers" value={pax} onChange={e=>setPax(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400" />
            </div>
            <Link href="/treks"
              className="flex items-center justify-center gap-2 bg-[#afde1e] hover:bg-[#8cb818] text-gray-900 font-semibold px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg lg:rounded-xl transition-all shadow-lg shadow-[#afde1e]/30 text-sm whitespace-nowrap shrink-0">
              <Search className="w-4 h-4" />
              Search
            </Link>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${i===current?'bg-white w-6':'bg-white/40 w-1.5'}`} />
        ))}
      </div>

      {/* Hashtag */}
      <div className="absolute bottom-6 right-4 lg:right-8 z-10">
        <span className="text-white/50 text-[10px] lg:text-sm font-medium bg-black/30 backdrop-blur-sm px-3 lg:px-4 py-1 lg:py-2 rounded-full">#wravelerforlife</span>
      </div>
    </section>
  );
}
