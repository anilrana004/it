"""Build HeaderTiered.tsx from Header.tsx + ANFM desktop block."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
header = (ROOT / "src" / "components" / "Header.tsx").read_text(encoding="utf-8")

tiered = header.replace(
    "import { Menu, X, Phone, Search, ChevronDown, User, Sparkles, Star, Mail, Mountain, SunMedium, ArrowRight } from 'lucide-react';",
    "import { Menu, X, Phone, Search, ChevronDown, User, Sparkles, Star, Mountain, SunMedium, ArrowRight, Heart } from 'lucide-react';",
)
tiered = tiered.replace(
    "import { CONTACT, mailtoUrl, SOCIAL_LINKS, telUrl, whatsappUrl } from '@/lib/contact';",
    "import { CONTACT, mailtoUrl, SOCIAL_LINKS, telUrl, whatsappUrl } from '@/lib/contact';\nimport { getWishlistIds } from '@/lib/wishlist';",
)
tiered = tiered.replace(
    "import RichNavDropdown from '@/components/nav/RichNavDropdown';",
    "import RichNavDropdown from '@/components/nav/RichNavDropdown';\nimport './header-nav.css';",
)

util_block = """
/** Top utility row — ANFM-style links with vertical dividers */
const UTIL_ROW_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faqs' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Login', href: '/login' },
  { label: 'Sign Up', href: '/login' },
] as const;
"""

tiered = tiered.replace(
    "const deskNavLink =",
    util_block + "\nconst _deskNavLinkUnused =",
)

tiered = tiered.replace("export default function Header()", "export default function HeaderTiered()")

# Inject wishlist + openSearchOverlay after searchListRef
inject = """
  const [wishCount, setWishCount] = useState(0);

  useEffect(() => {
    const syncWishlist = () => setWishCount(getWishlistIds().length);
    syncWishlist();
    window.addEventListener('indiantreks:wishlist', syncWishlist);
    return () => window.removeEventListener('indiantreks:wishlist', syncWishlist);
  }, []);

  const openSearchOverlay = useCallback(() => {
    setOpenDropdown(null);
    setMobSearch(true);
    setSearchIdx(-1);
    requestAnimationFrame(() => searchRef.current?.focus());
  }, []);

"""
tiered = tiered.replace(
    "  const searchListRef = useRef<HTMLDivElement>(null);\n\n  // Hero in-flow",
    "  const searchListRef = useRef<HTMLDivElement>(null);" + inject + "  // Hero in-flow",
)

desktop_old_start = "      {/* Desktop: compact dark-green chrome."
desktop_old_end = "      </header>\n\n      {/* Homepage desktop:"
desktop_new = '''      {/* Desktop: two-tier white navbar (ANFM-style) — see header-nav.css */}
      <header
        className="it-desk-header fixed left-0 top-0 z-50 hidden w-full overflow-visible lg:block"
        style={{
          height: DESK_HEADER_H,
          transform: hidden ? 'translateY(-110%)' : 'translateY(0)',
          transition: 'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform',
        }}
      >
        <div className="it-desk-header__top">
          <Link href="/" className="it-desk-header__logo" aria-label="Indian Treks home">
            <BrandLogo className="h-[1.35rem] w-auto max-w-[148px] object-contain object-left" />
          </Link>
          <nav className="it-desk-header__util" aria-label="Utility">
            <button type="button" className="it-desk-header__util-item" onClick={openSearchOverlay}>
              <Search className="h-3.5 w-3.5" aria-hidden />
              Explore
            </button>
            {UTIL_ROW_LINKS.map((item) => (
              <Link key={item.label} href={item.href} className="it-desk-header__util-item">
                {item.label}
              </Link>
            ))}
            <Link href="/wishlist" className="it-desk-header__util-item it-desk-header__util-item--accent">
              <Heart className="h-3.5 w-3.5" aria-hidden />
              Wishlist ({wishCount})
            </Link>
          </nav>
        </div>
        <div className="it-desk-header__main">
          <nav className={`it-desk-header__primary ${openDropdown ? 'z-30' : 'z-10'}`} aria-label="Primary">
            <div className="it-desk-header__primary-inner">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="it-desk-header__nav-item"
                  onMouseEnter={() => item.richMenu && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.sale ? (
                    <Link href={item.href} className="it-desk-header__nav-link it-desk-header__nav-link--sale" title={item.label}>
                      <Sparkles className="h-3 w-3 shrink-0" aria-hidden />
                      <NavLabel label={item.label} shortLabel={item.shortLabel} />
                    </Link>
                  ) : item.richMenu ? (
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                      className="it-desk-header__nav-link"
                    >
                      <NavLabel label={item.label} shortLabel={item.shortLabel} star={item.star} />
                      <ChevronDown className={`h-3 w-3 shrink-0 opacity-70 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} aria-hidden />
                    </button>
                  ) : (
                    <Link href={item.href} className="it-desk-header__nav-link">
                      <NavLabel label={item.label} shortLabel={item.shortLabel} star={item.star} />
                    </Link>
                  )}
                  {item.richMenu && openDropdown === item.label && (
                    <div
                      className={`absolute top-full z-[100] pt-1 ${item.label === 'More' || item.label === 'Special Programs' ? 'right-0' : 'left-0'}`}
                      onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpenDropdown(item.label); }}
                      onMouseLeave={handleMouseLeave}
                    >
                      <RichNavDropdown items={item.richMenu} onClose={closeDropdown} align={item.label === 'More' || item.label === 'Special Programs' ? 'right' : 'left'} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
          <Link href="/treks" className="it-desk-header__cta">
            Book Now
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </header>

      {/* Homepage desktop:'''

if desktop_old_start not in tiered:
    raise SystemExit("desktop block start not found")
i0 = tiered.index(desktop_old_start)
i1 = tiered.index(desktop_old_end)
tiered = tiered[:i0] + desktop_new + tiered[i1 + len("      </header>\n\n") :]

# Tiered uses 84px — local override for spacer (layout.ts stays 80 for active Header)
tiered = tiered.replace(
    "{isHome && (\n        <div\n          aria-hidden\n          className=\"hidden shrink-0 lg:block\"\n          style={{ height: DESK_HEADER_H }}\n        />\n      )}",
    "<div aria-hidden className=\"hidden shrink-0 lg:block\" style={{ height: 84 }} />",
)

banner = '''/**
 * Two-tier ANFM-style desktop navbar (saved for future use).
 * To enable: in src/app/layout.tsx replace Header with HeaderTiered.
 */

'''
(ROOT / "src" / "components" / "HeaderTiered.tsx").write_text(banner + tiered, encoding="utf-8")
print("HeaderTiered.tsx rebuilt")
