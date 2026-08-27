'use client';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Phone, Search, ChevronDown, User, Sparkles, Star, Mail, Mountain, SunMedium, ArrowRight } from 'lucide-react';
import { treks } from '@/lib/data';
import BrandLogo from '@/components/BrandLogo';
import { CONTACT, mailtoUrl, telUrl, whatsappUrl } from '@/lib/contact';
import { DESK_HEADER_H, DESK_MAIN_H, DESK_TOP_H, CHROME_HIDDEN_CLASS } from '@/lib/layout';
import { isSupportHubPath } from '@/lib/support-hub-nav';
import { isCorporateHubPath } from '@/lib/corporate-hub-nav';
import { isSpecialProgramsHubPath } from '@/lib/special-programs-hub-nav';
import {
  CUSTOMIZED_RICH,
  GROUP_TRIPS_RICH,
  LEARNING_RICH,
  MORE_RICH,
  SPECIAL_RICH,
  TRENDING_RICH,
  YATRA_RICH,
  type RichNavItem,
} from '@/lib/nav-rich-menu';
import RichNavDropdown from '@/components/nav/RichNavDropdown';

/** Desktop top utility strip — contact left, quick links right */
const TOP_STRIP_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'FAQ', href: '/faqs' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Payment Policy', href: '/payment-policy' },
  { label: 'Blogs', href: '/blog' },
] as const;

type NavItem = {
  label: string;
  href: string;
  richMenu?: RichNavItem[];
  sale?: boolean;
  star?: boolean;
  shortLabel?: string;
};

const navItems: NavItem[] = [
  {
    label: 'Group Trips',
    shortLabel: 'Group',
    href: '/group-trips',
    richMenu: GROUP_TRIPS_RICH,
  },
  {
    label: 'Customized',
    href: '#',
    richMenu: CUSTOMIZED_RICH,
  },
  { label: 'Bucket List Sale', shortLabel: 'Sale', href: '/bucket-list-sale', sale: true },
  {
    label: 'Trending',
    href: '/trending',
    richMenu: TRENDING_RICH,
  },
  {
    label: 'Sacred Yatra',
    shortLabel: 'Yatra',
    href: '/yatra',
    richMenu: YATRA_RICH,
  },
  {
    label: 'Learning Programs',
    shortLabel: 'Learning',
    href: '/corporate',
    richMenu: LEARNING_RICH,
  },
  {
    label: 'Special Programs',
    shortLabel: 'Special',
    href: '/special-programs',
    richMenu: SPECIAL_RICH,
    star: true,
  },
  {
    label: 'More',
    href: '#',
    richMenu: MORE_RICH,
  },
];

/** Extra mobile accordion — keep empty of anything already in primary navItems. */
const mobileLinkSections: { title: string; links: { l: string; h: string }[] }[] = [];

const deskNavLink =
  'inline-flex h-7 items-center gap-0.5 whitespace-nowrap rounded-md px-1.5 text-[11px] font-medium text-white/95 transition-colors hover:bg-white/10 hover:text-white xl:gap-0.5 xl:px-2 xl:text-[11.5px] 2xl:px-2.5 2xl:text-[12px]';

function NavLabel({
  label,
  shortLabel,
  star,
}: {
  label: string;
  shortLabel?: string;
  star?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {shortLabel ? (
        <>
          <span className="2xl:hidden">{shortLabel}</span>
          <span className="hidden 2xl:inline">{label}</span>
        </>
      ) : (
        label
      )}
      {star ? (
        <Star className="h-2.5 w-2.5 shrink-0 fill-amber-400 text-amber-400" aria-hidden />
      ) : null}
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isSupportHub = isSupportHubPath(pathname);
  const isCorporateHub = isCorporateHubPath(pathname);
  const isSpecialProgramsHub = isSpecialProgramsHubPath(pathname);

  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string[]>([]);
  const [mobileAccordion, setMobileAccordion] = useState<number | null>(null);
  /** 0 = in-flow green chrome, 1 = sticky bar visible (homepage only) */
  const [navSolid, setNavSolid] = useState(0);
  /** Homepage scroll — drives sticky header wash → white blend */
  const [homeScrollY, setHomeScrollY] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isHome = pathname === '/';

  useEffect(() => {
    if (!isHome) {
      setHomeScrollY(0);
      setNavSolid(1);
      return;
    }

    const CHROME_SHOW = 12;
    const update = () => {
      const y = window.scrollY;
      setHomeScrollY(y);
      setNavSolid(y > CHROME_SHOW ? 1 : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [isHome]);

  /** Sticky mobile header bg tracks scroll — green when over wash, white over white zone */
  const mobileHeaderWash = useMemo(() => {
    if (!isHome) return 1;
    const chrome = 56;
    const fadeEnd = 172;
    return Math.min(1, Math.max(0, (homeScrollY - chrome) / (fadeEnd - chrome)));
  }, [isHome, homeScrollY]);

  /** Hide chrome while scrolling down; reveal on scroll up (Roopkund Heaven pattern). */
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle(CHROME_HIDDEN_CLASS, hidden);
    return () => document.documentElement.classList.remove(CHROME_HIDDEN_CLASS);
  }, [hidden]);

  const [mobSearch, setMobSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchIdx, setSearchIdx] = useState(-1);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchListRef = useRef<HTMLDivElement>(null);

  // Hero in-flow bar dispatches these (IndiaHikes: logo/menu live in the brand wash)
  useEffect(() => {
    const openMenu = () => setIsOpen(true);
    const openSearch = () => setMobSearch(true);
    window.addEventListener('indiantreks:open-menu', openMenu);
    window.addEventListener('indiantreks:open-search', openSearch);
    return () => {
      window.removeEventListener('indiantreks:open-menu', openMenu);
      window.removeEventListener('indiantreks:open-search', openSearch);
    };
  }, []);

  const blockHide = isOpen || mobSearch || openDropdown !== null;

  useEffect(() => {
    if (blockHide) {
      setHidden(false);
      return;
    }

    const HIDE_AFTER = 72;
    let last = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const current = Math.max(0, window.scrollY);
      const delta = current - last;

      // Always show near the top of the page
      if (current <= HIDE_AFTER) {
        setHidden(false);
      } else if (delta > 4) {
        // Scrolling down → hide (Roopkund Heaven / industry standard)
        setHidden(true);
        setOpenDropdown(null);
      } else if (delta < -4) {
        // Scrolling up → show
        setHidden(false);
      }

      last = current;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [blockHide]);

  /** Homepage mobile: hide fixed bar until scroll (green hero chrome shows instead). Other pages: always solid white. */
  const showFixedMobile = !isHome || navSolid > 0 || isOpen;

  const mobileHeaderBg = isHome
    ? `color-mix(in srgb, var(--ih-wash) ${Math.round((1 - mobileHeaderWash) * 100)}%, #ffffff ${Math.round(mobileHeaderWash * 100)}%)`
    : '#ffffff';
  const mobileHeaderShadow =
    mobileHeaderWash > 0.55 ? '0 1px 10px rgba(16, 24, 20, 0.08)' : 'none';
  const mobileHeaderBorder =
    mobileHeaderWash > 0.55 ? '1px solid #e8ece9' : '1px solid transparent';

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

  useEffect(() => {
    if (!mobSearch) return;
    const t = window.setTimeout(() => searchRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [mobSearch]);

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

  /** Support / corporate hub pages use their own dedicated headers */
  if (isSupportHub || isCorporateHub || isSpecialProgramsHub) {
    return null;
  }

  return (
    <div ref={headerRef}>
      {/* Desktop: compact dark-green chrome. Fixed + reserved spacer = no overlap.
          Hide on scroll-down / show on scroll-up (Roopkund Heaven pattern). */}
      <header
        className="fixed left-0 top-0 z-50 hidden w-full lg:block"
        style={{
          height: DESK_HEADER_H,
          transform: hidden ? 'translateY(-110%)' : 'translateY(0)',
          transition: 'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform',
        }}
      >
        {/* Top utility strip — contact left, quick links right */}
        <div
          className="flex items-center justify-between gap-6 px-5 xl:px-8 2xl:px-12"
          style={{ height: DESK_TOP_H, background: '#062816' }}
          aria-label="Utility links"
        >
          <div className="flex min-w-0 items-center gap-2.5 text-[11px] font-medium text-white xl:gap-3 xl:text-[12px]">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-85"
              aria-label={`WhatsApp ${CONTACT.phoneDisplay}`}
            >
              <i className="fa-brands fa-whatsapp text-[13px] text-[#25D366]" aria-hidden />
              <span className="whitespace-nowrap">+{CONTACT.phoneWa}</span>
            </a>
            <span className="text-white/35 select-none" aria-hidden>
              |
            </span>
            <a
              href={mailtoUrl()}
              className="inline-flex min-w-0 items-center gap-1.5 transition-opacity hover:opacity-85"
            >
              <Mail className="h-3 w-3 shrink-0 text-white/90" aria-hidden />
              <span className="truncate">{CONTACT.email}</span>
            </a>
          </div>

          <nav
            className="hidden items-center gap-0 text-[10px] font-semibold uppercase tracking-[0.08em] text-white sm:flex xl:text-[11px]"
            aria-label="Quick links"
          >
            {TOP_STRIP_LINKS.map((item, i) => (
              <span key={item.href} className="inline-flex items-center">
                {i > 0 ? (
                  <span className="mx-2 text-white/35 select-none xl:mx-2.5" aria-hidden>
                    |
                  </span>
                ) : null}
                <Link
                  href={item.href}
                  className="whitespace-nowrap transition-opacity hover:opacity-80"
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>

        {/* Main nav bar */}
        <div
          className="grid items-stretch"
          style={{
            height: DESK_MAIN_H,
            background: 'linear-gradient(180deg, #0b4a28 0%, #0a3d22 100%)',
            gridTemplateColumns: 'auto minmax(0, 1fr) auto',
          }}
        >
          <Link
            href="/"
            className="flex h-full items-center bg-white px-3 shadow-[4px_0_12px_rgba(0,0,0,0.12)] xl:px-4"
            aria-label="Indian Treks home"
          >
            <BrandLogo className="h-6 w-auto max-w-[130px] object-contain object-left xl:h-7 xl:max-w-[160px] 2xl:max-w-[180px]" />
          </Link>

          <nav
            className="flex min-w-0 items-center justify-center gap-0 overflow-x-clip px-1.5 xl:gap-0.5 xl:px-2 2xl:px-3"
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative shrink-0"
                onMouseEnter={() => item.richMenu && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.sale ? (
                  <Link
                    href={item.href}
                    className="mx-0.5 inline-flex h-7 items-center gap-1 whitespace-nowrap rounded-full bg-[#16a34a] px-2.5 text-[11px] font-bold text-white shadow-md shadow-black/20 transition-colors hover:bg-[#15803d] xl:mx-1 xl:px-3 xl:text-[11.5px] 2xl:text-[12px]"
                  >
                    <Sparkles className="h-3 w-3 shrink-0" />
                    <span className="2xl:hidden">{item.shortLabel ?? item.label}</span>
                    <span className="hidden 2xl:inline">{item.label}</span>
                  </Link>
                ) : item.richMenu ? (
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                    className={deskNavLink}
                  >
                    <NavLabel label={item.label} shortLabel={item.shortLabel} star={item.star} />
                    <ChevronDown
                      className={`h-3 w-3 shrink-0 text-white/80 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                ) : (
                  <Link href={item.href} className={deskNavLink}>
                    <NavLabel label={item.label} shortLabel={item.shortLabel} star={item.star} />
                  </Link>
                )}
                {item.richMenu && openDropdown === item.label && (
                  <div
                    onMouseEnter={() => {
                      if (closeTimer.current) clearTimeout(closeTimer.current);
                      setOpenDropdown(item.label);
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <RichNavDropdown
                      items={item.richMenu}
                      onClose={closeDropdown}
                      align={
                        item.label === 'More' || item.label === 'Special Programs'
                          ? 'right'
                          : 'left'
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 px-2 xl:gap-2 xl:px-3 2xl:gap-2.5 2xl:px-4">
            <form
              role="search"
              className="flex h-8 max-w-[min(100%,280px)] items-center rounded-full border border-white/20 bg-white pl-2.5 pr-0.5 shadow-sm"
              onSubmit={(e) => {
                e.preventDefault();
                setOpenDropdown(null);
                setMobSearch(true);
                setSearchIdx(-1);
                requestAnimationFrame(() => searchRef.current?.focus());
              }}
            >
              <Search className="h-3.5 w-3.5 shrink-0 text-gray-400" aria-hidden />
              <input
                type="search"
                name="q"
                autoComplete="off"
                aria-label="Search treks and routes"
                placeholder="Search treks, route"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchIdx(-1);
                }}
                onFocus={() => setOpenDropdown(null)}
                className="min-w-0 flex-1 bg-transparent px-1.5 text-[11px] text-gray-800 outline-none placeholder:text-gray-400 xl:w-[132px] xl:flex-none 2xl:w-[168px] 2xl:text-[12px]"
              />
              <button
                type="submit"
                className="inline-flex h-7 shrink-0 items-center gap-1 rounded-full bg-[#16a34a] px-2.5 text-[11px] font-bold text-white shadow-sm transition-colors hover:bg-[#15803d] xl:px-3"
              >
                Search
                <ArrowRight className="h-3 w-3" aria-hidden />
              </button>
            </form>

            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${CONTACT.phoneDisplay}`}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#bbf7d0] bg-white text-[#25D366] shadow-sm transition-colors hover:bg-[#f0fdf4]"
            >
              <i className="fa-brands fa-whatsapp text-[15px]" aria-hidden />
            </a>

            <Link
              href="/login"
              className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-[#16a34a] bg-white px-2.5 text-[11px] font-bold text-[#16a34a] shadow-sm transition-colors hover:bg-[#f0fdf4] xl:px-3 xl:text-[12px]"
            >
              <User className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Homepage desktop: reserve space under fixed header (no overlap; no jump when chrome hides) */}
      {isHome && (
        <div
          aria-hidden
          className="hidden shrink-0 lg:block"
          style={{ height: DESK_HEADER_H }}
        />
      )}

      {/*
        Mobile header (IndiaHikes flow):
        - Homepage top: hidden — logo/menu live in the green hero wash (document flow)
        - After scroll (and all other pages): solid white sticky bar
      */}
      <header
        className={`fixed left-0 top-0 w-full lg:hidden ${isOpen ? 'z-[70]' : 'z-50'}`}
        style={{
          backgroundColor: showFixedMobile ? mobileHeaderBg : 'transparent',
          boxShadow: showFixedMobile ? mobileHeaderShadow : 'none',
          borderBottom: showFixedMobile ? mobileHeaderBorder : 'none',
          paddingTop: 'env(safe-area-inset-top, 0px)',
          transform: showFixedMobile && !hidden ? 'translateY(0)' : 'translateY(-110%)',
          opacity: showFixedMobile && !hidden ? 1 : 0,
          pointerEvents: showFixedMobile && !hidden ? 'auto' : 'none',
          transition:
            'transform 0.28s cubic-bezier(0.22,1,0.36,1), opacity 0.22s ease, background-color 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease',
        }}
      >
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2" onClick={() => { if (isOpen) setIsOpen(false); }}>
            <BrandLogo className="h-7 w-auto max-w-[156px] object-contain object-left" />
          </Link>
          <div className="flex items-center gap-1">
            <button type="button" aria-label="Search" onClick={() => setMobSearch(true)} className="p-2 text-gray-900">
              <Search className="w-5 h-5" />
            </button>
            <button type="button" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen} className="p-2 text-gray-900">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Non-home pages: reserve space under fixed mobile header */}
      {!isHome && (
        <div
          aria-hidden
          className="lg:hidden"
          style={{ height: 'calc(3.5rem + env(safe-area-inset-top, 0px))' }}
        />
      )}

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
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.richMenu ? (
                    <div>
                      <button type="button" onClick={() => toggleMobileSubmenu(item.label)}
                        aria-expanded={mobileOpen.includes(item.label)}
                        className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-gray-800 rounded-xl hover:bg-gray-50 transition-colors">
                        <NavLabel label={item.label} star={item.star} />
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileOpen.includes(item.label) ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileOpen.includes(item.label) && (
                        <div className="mt-1 mb-2 space-y-0.5 rounded-xl border border-gray-100 bg-white p-1 shadow-sm">
                          {item.richMenu.map((sub) => {
                            const Icon = sub.Icon;
                            return (
                              <Link
                                key={sub.id}
                                href={sub.href}
                                onClick={closeMobile}
                                className="group flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50"
                              >
                                <span
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${sub.iconTile}`}
                                >
                                  <Icon className={`h-3.5 w-3.5 ${sub.iconColor}`} aria-hidden />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="flex flex-wrap items-center gap-1">
                                    <span className="text-[12px] font-semibold leading-tight text-gray-900">
                                      {sub.title}
                                    </span>
                                    {sub.live ? (
                                      <span className="rounded bg-red-500 px-1 py-px text-[7px] font-bold uppercase leading-none tracking-wide text-white">
                                        Live!
                                      </span>
                                    ) : null}
                                  </span>
                                  <span className="mt-px block text-[10px] leading-snug text-gray-500">
                                    {sub.subtitle}
                                  </span>
                                </span>
                                <ChevronDown className="h-3 w-3 shrink-0 -rotate-90 text-gray-400" aria-hidden />
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : item.sale ? (
                    <Link href={item.href} onClick={closeMobile}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-white bg-[#16a34a] rounded-full mx-4 my-2 shadow-lg shadow-[#16a34a]/25">
                      <Sparkles className="w-4 h-4" /> {item.label}
                    </Link>
                  ) : (
                    <Link href={item.href} onClick={closeMobile}
                      className="block px-4 py-3.5 text-sm font-medium text-gray-800 hover:bg-gray-50 rounded-xl transition-colors">
                      <NavLabel label={item.label} star={item.star} />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="px-4 mt-2">
              <div className="bg-[#f0fdf4] rounded-xl p-4 space-y-3">
                <p className="text-sm font-semibold text-gray-900">Contact Us</p>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <p className="text-xs text-gray-500">B-42, 2nd Floor, Tower-B, The Corenthum, Block A, Sector 62, Noida, UP 201301</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                  <a href="tel:+919797972175" className="text-xs text-gray-600 hover:text-[#16a34a]">+91 97 97 97 21 75</a>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <a href="mailto:contact@indiantreks.com" className="text-xs text-gray-600 hover:text-[#16a34a]">contact@indiantreks.com</a>
                </div>
              </div>
            </div>

            {mobileLinkSections.length > 0 ? (
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
                            className="block text-sm text-gray-500 hover:text-[#16a34a] py-1.5">
                            {l.l}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : null}

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
                className="flex items-center justify-center gap-2 bg-[#16a34a] text-white font-semibold px-6 py-3 rounded-full w-full">
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

      {/* Search overlay — desktop + mobile */}
      {mobSearch && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search treks and yatras"
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 pt-[12vh] backdrop-blur-sm lg:pt-[18vh]"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setMobSearch(false);
              setSearchQuery('');
              setSearchIdx(-1);
            }
          }}
        >
          <div className="mx-4 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/30 lg:max-w-xl">
            <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-[#16a34a]" />
              <input
                ref={searchRef}
                type="text"
                autoComplete="off"
                aria-label="Search treks & yatras"
                placeholder="Search treks, yatras, destinations..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchIdx(-1);
                }}
                onKeyDown={handleSearchKeyDown}
                className="flex-1 bg-transparent text-base text-gray-800 outline-none placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => {
                  setMobSearch(false);
                  setSearchQuery('');
                  setSearchIdx(-1);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div ref={searchListRef} className="max-h-[50vh] overflow-y-auto py-2 lg:max-h-[55vh]">
              {searchQuery.trim() && searchResults.length === 0 && (
                <div className="px-5 py-8 text-center">
                  <Search className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                  <p className="text-sm text-gray-400">
                    No results found for &ldquo;{searchQuery}&rdquo;
                  </p>
                  <p className="mt-1 text-xs text-gray-300">Try a different search term</p>
                </div>
              )}
              {!searchQuery.trim() && (
                <div className="px-5 py-8 text-center">
                  <Mountain className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                  <p className="text-sm text-gray-400">Type to search treks &amp; yatras</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                    {[
                      'Valley of Flowers',
                      'Kedarkantha',
                      'Everest',
                      'Hampta Pass',
                      'Kedarnath',
                      'Triund',
                    ].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setSearchQuery(tag);
                          setSearchIdx(-1);
                          searchRef.current?.focus();
                        }}
                        className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-500 transition-colors hover:bg-[#16a34a]/10 hover:text-[#166534]"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {searchResults.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goSearch(s.id, s.type)}
                  onMouseEnter={() => setSearchIdx(i)}
                  className={`flex w-full items-center gap-3 px-5 py-3 text-left transition-colors ${i === searchIdx ? 'bg-[#16a34a]/10' : 'hover:bg-gray-50'}`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${s.type === 'yatra' ? 'bg-[#166534] text-[#dcfce7]' : 'bg-[#dcfce7] text-[#16a34a]'}`}
                  >
                    {s.type === 'yatra' ? (
                      <SunMedium className="h-5 w-5" />
                    ) : (
                      <Mountain className="h-5 w-5" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-gray-900">{s.title}</div>
                    <div className="truncate text-xs text-gray-400">{s.sub}</div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${s.type === 'yatra' ? 'bg-[#166534] text-white' : 'bg-[#dcfce7] text-[#166534]'}`}
                    >
                      {s.type === 'yatra' ? 'Yatra' : 'Trek'}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-300" />
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
