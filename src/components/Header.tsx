'use client';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Phone, Search, ChevronDown, User, Sparkles, Mountain, SunMedium, ArrowRight } from 'lucide-react';
import { treks } from '@/lib/data';

const navItems = [
  {
    label: 'Group Trips', href: '/group-trips',
    dropdown: [
      { l: 'Backpacking Trips', h: '/#backpacking' },
      { l: 'Treks', h: '/treks' },
      { l: 'Biking Trips', h: '/biking' },
      { l: 'Honeymoon Trips', h: '/honeymoon' },
      { l: 'Domestic Tours', h: '/domestic-tours' },
      { l: 'International Getaways', h: '/international-getaways' },
      { l: 'Upcoming Trips', h: '/#upcoming-trips' },
      { l: 'Sale of the Season', h: '/bucket-list-sale' },
      { l: 'Weekend Trips', h: '/treks?difficulty=easy' },
    ],
  },
  {
    label: 'Customized', href: '#',
    dropdown: [
      { l: 'Corporate Tours', h: '/corporate' },
      { l: 'Domestic Tours', h: '/domestic-tours' },
      { l: 'International Getaways', h: '/international-getaways' },
      { l: 'Honeymoon Trips', h: '/honeymoon' },
    ],
  },
  { label: 'Bucket List Sale', href: '/bucket-list-sale', sale: true },
  { label: 'Trending', href: '/trending' },
  { label: 'Corporate', href: '/corporate' },
  {
    label: 'More', href: '#',
    dropdown: [
      { l: 'About Us', h: '/about' },
      { l: 'Contact Us', h: '/contact' },
      { l: 'Career With Us', h: '/careers' },
      { l: 'Campus Ambassador Program', h: '/campus-ambassador' },
      { l: 'Our Blogs', h: '/blog' },
      { l: 'Newsletter', h: '/newsletter' },
      { l: 'Payment Policy', h: '/payment-policy' },
    ],
  },
];

const mobileLinkSections = [
  {
    title: 'Company',
    links: [
      { l: 'About Us', h: '/about' },
      { l: 'Contact Us', h: '/contact' },
      { l: 'Our Blogs', h: '/blog' },
      { l: 'Career With Us', h: '/careers' },
      { l: 'Campus Ambassador Program', h: '/campus-ambassador' },
      { l: 'Newsletter', h: '/newsletter' },
      { l: 'Payment Policy', h: '/payment-policy' },
    ],
  },
  {
    title: 'Group Tours',
    links: [
      { l: 'Backpacking Trips', h: '/#backpacking' },
      { l: 'Treks', h: '/treks' },
      { l: 'Biking Trips', h: '/biking' },
      { l: 'Upcoming Trips', h: '/#upcoming-trips' },
      { l: 'International Trips', h: '/international-getaways' },
      { l: 'Sale of the Season', h: '/bucket-list-sale' },
    ],
  },
  {
    title: 'Customized Trips',
    links: [
      { l: 'Corporate Tours', h: '/corporate' },
      { l: 'Domestic Tours', h: '/domestic-tours' },
      { l: 'International Getaways', h: '/international-getaways' },
      { l: 'Honeymoon Trips', h: '/honeymoon' },
    ],
  },
];

function Dropdown({ items, onClose }: { items: { l: string; h: string }[]; onClose: () => void }) {
  return (
    <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[220px] z-50" role="menu">
      {items.map(item => (
        <Link key={item.l} href={item.h} onClick={onClose} role="menuitem"
          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#ffaf21] transition-colors">
          {item.l}
        </Link>
      ))}
    </div>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string[]>([]);
  const [mobileAccordion, setMobileAccordion] = useState<number | null>(null);
  const [mobileYellow, setMobileYellow] = useState(1);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      const y = window.scrollY;
      const intensity = Math.max(0, Math.min(1, 1 - (y - vh * 0.8) / (vh * 0.8)));
      setMobileYellow(intensity);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [mobSearch, setMobSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchIdx, setSearchIdx] = useState(-1);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchListRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const searchItems = useMemo(() =>
    treks.map(t => ({ id: t.id, title: t.title, sub: t.subtitle, type: t.type as 'trek' | 'yatra' })),
  []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return searchItems.filter(s => s.title.toLowerCase().includes(q) || s.sub.toLowerCase().includes(q));
  }, [searchQuery, searchItems]);

  const goSearch = (id: string, type: string) => {
    setMobSearch(false);
    setSearchQuery('');
    router.push(`/${type === 'yatra' ? 'yatra' : 'treks'}/${id}`);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSearchIdx(i => Math.min(i + 1, searchResults.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSearchIdx(i => Math.max(i - 1, -1)); }
    if (e.key === 'Enter' && searchIdx >= 0 && searchResults[searchIdx]) { goSearch(searchResults[searchIdx].id, searchResults[searchIdx].type); }
    if (e.key === 'Escape') { setMobSearch(false); setSearchQuery(''); }
  };

  useEffect(() => {
    if (searchIdx >= 0 && searchListRef.current) {
      const el = searchListRef.current.children[searchIdx] as HTMLElement;
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [searchIdx]);

  const closeDropdown = useCallback(() => setOpenDropdown(null), []);

  const handleMouseEnter = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpenDropdown(null); setIsOpen(false); }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const closeMobile = useCallback(() => { setIsOpen(false); setMobileOpen([]); }, []);

  const toggleMobileSubmenu = useCallback((label: string) => {
    setMobileOpen(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]);
  }, []);

  return (
    <div ref={headerRef}>
      {/* Desktop Header */}
      <header className="fixed left-0 top-0 z-50 hidden w-full bg-white shadow-sm lg:block">
        <div className="flex h-16 items-center justify-between gap-4 px-6 xl:px-10">
          <Link href="/" className="shrink-0">
            <img src="https://res.cloudinary.com/pg8uhzw0/image/upload/v1785363638/l_kceoj5.png" alt="TrekRoot" className="h-9 w-auto" />
          </Link>

          <nav className="flex items-center justify-center gap-0.5">
            {navItems.map((item: any) => (
              <div key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}>
                {item.sale ? (
                  <Link href={item.href}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-rose-500 rounded-full hover:from-orange-600 hover:to-rose-600 transition-all duration-300 shadow-lg shadow-orange-500/25 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5" />
                    {item.label}
                  </Link>
                ) : item.dropdown ? (
                  <button type="button"
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    aria-expanded={openDropdown === item.label} aria-haspopup="true"
                    className="inline-flex items-center gap-1 px-3 xl:px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-[#ffaf21] transition-colors">
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link href={item.href}
                    className="inline-flex items-center gap-1 px-3 xl:px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-[#ffaf21] transition-colors">
                    {item.label}
                  </Link>
                )}
                {item.dropdown && openDropdown === item.label && (
                  <div onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpenDropdown(item.label); }}
                    onMouseLeave={handleMouseLeave}>
                    <Dropdown items={item.dropdown} onClose={() => { closeDropdown(); }} />
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5">
            <a href="tel:+919797972175"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#ffaf21] px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Phone className="w-4 h-4" /> Call Us
            </a>
            <button type="button" aria-label="Search" className="w-9 h-9 flex items-center justify-center bg-[#ffaf21] text-black rounded-full hover:bg-[#d49400] transition-colors shadow-sm">
              <Search className="w-4 h-4" />
            </button>
            <Link href="/login"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#ffaf21] px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className={`fixed left-0 top-0 w-full lg:hidden ${isOpen ? 'z-[70]' : 'z-50'}`}
        style={{
          background: `rgb(${255}, ${Math.round(175 + 80 * (1 - mobileYellow))}, ${Math.round(33 + 222 * (1 - mobileYellow))})`,
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          boxShadow: mobileYellow < 0.5 ? 'none' : '0 1px 3px rgba(0,0,0,0.08)',
        }}>
        <div className="flex items-center justify-between h-14 px-4">
          <Link href="/" className="flex items-center gap-2" onClick={() => { if (isOpen) setIsOpen(false); }}>
            <img src="https://res.cloudinary.com/pg8uhzw0/image/upload/v1785363638/l_kceoj5.png" alt="TrekRoot" className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Search" onClick={() => setMobSearch(true)} className="p-2" style={{ color: `rgb(${100 + 7 * (1 - mobileYellow)}, ${70 + 44 * (1 - mobileYellow)}, ${128 * (1 - mobileYellow)})` }}>
              <Search className="w-5 h-5" />
            </button>
            <button type="button" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen} className="p-2" style={{ color: `rgb(${100 + 7 * (1 - mobileYellow)}, ${70 + 44 * (1 - mobileYellow)}, ${128 * (1 - mobileYellow)})` }}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isOpen && (
        <div role="dialog" aria-modal="true" aria-label="Mobile navigation" className="fixed inset-x-0 top-0 bottom-0 z-[60] bg-white lg:hidden flex flex-col">
          <div className="h-14 flex items-center justify-end px-4 border-b border-gray-100">
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close menu" className="p-2 text-gray-700 hover:text-gray-900">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pb-8">
            <div className="p-4 space-y-0.5">
              {navItems.map((item: any) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <div>
                      <button type="button" onClick={() => toggleMobileSubmenu(item.label)}
                        aria-expanded={mobileOpen.includes(item.label)}
                        className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-gray-800 rounded-xl hover:bg-gray-50 transition-colors">
                        {item.label}
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileOpen.includes(item.label) ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileOpen.includes(item.label) && (
                        <div className="ml-4 pl-3 border-l-2 border-gray-100 space-y-0.5 mb-1">
                          {item.dropdown.map((sub: any) => (
                            <Link key={sub.l} href={sub.h} onClick={closeMobile}
                              className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                              {sub.l}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : item.sale ? (
                    <Link href={item.href} onClick={closeMobile}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-rose-500 rounded-full mx-4 my-2 shadow-lg shadow-orange-500/25">
                      <Sparkles className="w-4 h-4" /> {item.label}
                    </Link>
                  ) : (
                    <Link href={item.href} onClick={closeMobile}
                      className="block px-4 py-3.5 text-sm font-medium text-gray-800 hover:bg-gray-50 rounded-xl transition-colors">
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="px-4 mt-2">
              <div className="bg-blue-50/50 rounded-xl p-4 space-y-3">
                <p className="text-sm font-semibold text-gray-900">Contact Us</p>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <p className="text-xs text-gray-500">B-42, 2nd Floor, Tower-B, The Corenthum, Block A, Sector 62, Noida, UP 201301</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                  <a href="tel:+919797972175" className="text-xs text-gray-600 hover:text-[#ffaf21]">+91 97 97 97 21 75</a>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <a href="mailto:contact@trekroot.com" className="text-xs text-gray-600 hover:text-[#ffaf21]">contact@trekroot.com</a>
                </div>
              </div>
            </div>

            <div className="px-4 mt-4 space-y-0.5">
              {mobileLinkSections.map((s, i) => (
                <div key={s.title} className="border-b border-gray-100">
                  <button type="button" onClick={() => setMobileAccordion(mobileAccordion === i ? null : i)}
                    aria-expanded={mobileAccordion === i}
                    className="w-full flex items-center justify-between py-3.5 px-1 text-sm font-semibold text-gray-800">
                    {s.title}
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileAccordion === i ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileAccordion === i && (
                    <div className="pb-3 space-y-1 px-1">
                      {s.links.map(l => (
                        <Link key={l.l} href={l.h} onClick={closeMobile}
                          className="block text-sm text-gray-500 hover:text-[#ffaf21] py-1.5">
                          {l.l}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="px-4 mt-6 mb-4">
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  { label: 'Facebook', color: '#1877F2', path: 'M24 16c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 4 2.9 7.3 6.7 7.9v-5.6h-2V16h2v-1.8c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V16h2.2l-.4 2.3h-1.9V24c4-.6 6.9-4 6.9-8z' },
                  { label: 'Twitter', color: '#1DA1F2', path: 'M24 11c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-2.1 0-3.7 2-3.2 4-2.7-.1-5.1-1.4-6.8-3.4-.9 1.5-.4 3.4 1 4.4-.5 0-1-.2-1.5-.4 0 1.5 1.1 2.9 2.6 3.3-.5.1-1 .2-1.5.1.4 1.3 1.6 2.3 3.1 2.3-1.2.9-3 1.4-4.7 1.2 1.5.9 3.2 1.5 5 1.5 6.1 0 9.5-5.1 9.3-9.8.7-.4 1.3-1 1.7-1.7z' },
                  { label: 'Instagram', color: '#F00073', path: 'M16 9.2h3.4c.8 0 1.2.2 1.5.3.4.2.7.3 1 .6.3.3.5.6.6 1 .1.3.2.7.3 1.5v6.8c0 .8-.2 1.2-.3 1.5-.2.4-.3.7-.6 1-.3.3-.6.5-1 .6-.3.1-.7.2-1.5.3h-6.8c-.8 0-1.2-.2-1.5-.3-.4-.2-.7-.3-1-.6-.3-.3-.5-.6-.6-1-.1-.3-.2-.7-.3-1.5V16v-3.4c0-.8.2-1.2.3-1.5.2-.4.3-.7.6-1 .3-.3.6-.5 1-.6.3-.1.7-.2 1.5-.3H16zm0-1.5h-3.4c-.9 0-1.5.2-2 .4s-1 .5-1.5 1-.7.9-1 1.5c-.2.5-.3 1.1-.4 2v6.8c0 .9.2 1.5.4 2s.5 1 1 1.5.9.7 1.5 1c.5.2 1.1.3 2 .4h6.8c.9 0 1.5-.2 2-.4s1-.5 1.5-1 .7-.9 1-1.5c.2-.5.3-1.1.4-2V16v-3.4c0-.9-.2-1.5-.4-2s-.5-1-1-1.5-.9-.7-1.5-1c-.5-.2-1.1-.3-2-.4H16zm0 4c-2.4 0-4.3 1.9-4.3 4.3s1.9 4.3 4.3 4.3 4.3-1.9 4.3-4.3-1.9-4.3-4.3-4.3zm0 7.1c-1.5 0-2.8-1.2-2.8-2.8 0-1.5 1.2-2.8 2.8-2.8 1.5 0 2.8 1.2 2.8 2.8 0 1.5-1.3 2.8-2.8 2.8zM20.4 12.6a1 1 0 100-2 1 1 0 000 2z' },
                  { label: 'LinkedIn', color: '#2867B2', path: 'M11.6 24H8.2V13.3h3.4V24zM9.9 11.8C8.8 11.8 8 11 8 9.9 8 8.8 8.9 8 9.9 8c1.1 0 1.9.8 1.9 1.9 0 1.1-.8 1.9-1.9 1.9zM24 24h-3.4v-5.8c0-1.7-.7-2.2-1.7-2.2s-2 .8-2 2.3V24h-3.4V13.3h3.2v1.5c.3-.7 1.5-1.8 3.2-1.8 1.9 0 3.9 1.1 3.9 4.4V24h.2z' },
                  { label: 'YouTube', color: '#FF0000', path: 'M23.6 12.1c-.2-.7-.7-1.2-1.4-1.4-1.2-.3-6.3-.3-6.3-.3s-5 0-6.3.3c-.7.2-1.2.7-1.4 1.4C8 13.4 8 16 8 16s0 2.6.3 3.9c.2.7.7 1.2 1.4 1.4 1.2.3 6.3.3 6.3.3s5 0 6.3-.3c.7-.2 1.2-.7 1.4-1.4.3-1.3.3-3.9.3-3.9s0-2.6-.4-3.9zm-9.2 6.3v-4.8l4.2 2.4-4.2 2.4z' },
                ].map(s => (
                  <a key={s.label} href={`https://${s.label.toLowerCase()}.com/`} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 32 32">
                      <rect width="32" height="32" fill={s.color} rx="6" />
                      <path fill="#fff" d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="px-4 mt-4 space-y-3">
              <Link href="/login" onClick={closeMobile}
                className="flex items-center justify-center gap-2 bg-[#ffaf21] text-black font-semibold px-6 py-3 rounded-full w-full">
                <User className="w-4 h-4" /> Login / Sign Up
              </Link>
              <a href="tel:+919797972175"
                className="flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-full w-full">
                <Phone className="w-4 h-4" /> +91 97 97 97 21 75
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search Overlay */}
      {mobSearch && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={e => { if (e.target === e.currentTarget) { setMobSearch(false); setSearchQuery(''); } }}>
          <div className="w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl shadow-black/30 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
              <Search className="w-5 h-5 text-[#ffaf21] shrink-0" />
              <input ref={searchRef} type="text" autoComplete="off" aria-label="Search treks & yatras"
                placeholder="Search treks, yatras, destinations..."
                value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setSearchIdx(-1); }}
                onKeyDown={handleSearchKeyDown}
                className="flex-1 bg-transparent outline-none text-base text-gray-800 placeholder:text-gray-400" />
              <button type="button" onClick={() => { setMobSearch(false); setSearchQuery(''); }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div ref={searchListRef} className="max-h-[50vh] overflow-y-auto py-2">
              {searchQuery.trim() && searchResults.length === 0 && (
                <div className="px-5 py-8 text-center">
                  <Search className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                  <p className="text-sm text-gray-400">No results found for &ldquo;{searchQuery}&rdquo;</p>
                  <p className="text-xs text-gray-300 mt-1">Try a different search term</p>
                </div>
              )}
              {!searchQuery.trim() && (
                <div className="px-5 py-8 text-center">
                  <Mountain className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                  <p className="text-sm text-gray-400">Type to search treks & yatras</p>
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
              {searchResults.map((s, i) => (
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
    </div>
  );
}
