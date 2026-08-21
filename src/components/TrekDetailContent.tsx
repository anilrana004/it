'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { treks, trekDetailPath, type Trek } from '@/lib/data';
import { getDepartureBatches, type TrekBatch } from '@/lib/batches';
import { blogDate, blogPath, blogThumb, getRelatedPosts, type RelatedPost } from '@/lib/blog';
import { safeImage, trekPhoto } from '@/lib/safe-image';
import { photos } from '@/lib/media';
import { whatsappUrl } from '@/lib/contact';
import Banners from '@/components/Banners';
import {
  addOns,
  bookingPolicyRows,
  cancellationPolicyRows,
  detailTestimonials,
  gearRentals,
  getPromoBanners,
  getReachSteps,
  getSeasonGuide,
  packingGroups,
  baseCamp,
  staysLabel,
} from '@/lib/trek-detail-content';
import './trek-detail.css';

const navLinks = [
  { id: 'highlight', label: 'Highlight', icon: 'fa-solid fa-star' },
  { id: 'overview', label: 'Overview', icon: 'fa-regular fa-file-lines' },
  { id: 'itinerary', label: 'Itinerary', icon: 'fa-regular fa-calendar-days' },
  { id: 'inclusion-exclusion', label: 'Inclusion & exclusion', icon: 'fa-solid fa-circle-check' },
  { id: 'best-time', label: 'Best Time', icon: 'fa-regular fa-snowflake' },
  { id: 'things-to-carry', label: 'Things to Carry', icon: 'fa-solid fa-suitcase' },
  { id: 'how-to-reach', label: 'How to Reach', icon: 'fa-solid fa-location-dot' },
  { id: 'policy', label: 'Policy', icon: 'fa-solid fa-shield-halved' },
  { id: 'faqs', label: "FAQ's", icon: 'fa-regular fa-circle-question' },
  { id: 'rent-gear', label: 'Rent a Gear', icon: 'fa-solid fa-suitcase-rolling' },
];

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

/** Maps a difficulty grade onto the level-badge colour classes. */
function levelClass(difficulty: string): 'easy' | 'moderate' | 'difficult' {
  if (/^easy$/i.test(difficulty) || /easy to moderate/i.test(difficulty)) return 'easy';
  if (/difficult/i.test(difficulty)) return 'difficult';
  return 'moderate';
}

const dateTagClass: Record<TrekBatch['status'], string> = {
  available: '',
  'filling-fast': 'bk-tag-filling-fast',
  'almost-full': 'bk-tag-limited',
  'sold-out': 'bk-tag-closed',
};

const dateTagLabel: Record<TrekBatch['status'], string> = {
  available: 'Open',
  'filling-fast': 'Filling',
  'almost-full': 'Limited',
  'sold-out': 'Closed',
};

/** Status badges for the fixed-departures card. */
const departureBadge: Record<TrekBatch['status'], { className: string; label: string }> = {
  available: { className: 'fd-badge--open', label: 'Open' },
  'filling-fast': { className: 'fd-badge--filling', label: 'Filling Fast' },
  'almost-full': { className: 'fd-badge--limited', label: 'Few Seats Left' },
  'sold-out': { className: 'fd-badge--full', label: 'Full' },
};

/** Builds a de-duplicated gallery large enough for the reference grid. */
function galleryImages(trek: Trek): string[] {
  const pool = [
    ...trek.images.map((src) => safeImage(src, trekPhoto(trek.id))),
    safeImage(trek.mapImage, trekPhoto(trek.id)),
    photos.uttarakhand,
    photos.himachal,
    photos.snow,
    photos.nepal,
    photos.chopta,
    photos.triund,
    photos.hampta,
  ];
  return [...new Set(pool)].slice(0, 10);
}

/**
 * Fixed-departures card, ported from the reference detail page: a month
 * accordion over the same batches the booking card uses. Sits above the section
 * nav, so picking a date scrolls down to the booking form.
 */
function FixedDepartures({
  months,
  openMonth,
  onToggleMonth,
  selectedId,
  onPick,
  kindLabel,
  enquiryHref,
}: {
  months: { label: string; items: TrekBatch[] }[];
  openMonth: string | null;
  onToggleMonth: (label: string) => void;
  selectedId: string | null;
  onPick: (batch: TrekBatch) => void;
  kindLabel: string;
  enquiryHref: string;
}) {
  return (
    <section id="departures" aria-label="Fixed departures">
      <div className="fd-card">
        <div className="fd-header">
          <i className="fa-regular fa-calendar-days" aria-hidden /> Fixed Departures
        </div>

        {months.length === 0 ? (
          <p className="fd-empty">
            Dates for this {kindLabel.toLowerCase()} are being scheduled.{' '}
            <a
              className="fd-empty__link"
              href={enquiryHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask us for upcoming batches
            </a>
            .
          </p>
        ) : (
          <div className="fd-list">
            {months.map((group) => {
              const open = openMonth === group.label;
              const panelId = `fd-${group.label.toLowerCase().replace(/\s+/g, '-')}`;
              return (
                <div className="fd-group" key={group.label}>
                  <button
                    type="button"
                    className={`fd-group__btn${open ? ' fd-group__btn--active' : ''}`}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => onToggleMonth(group.label)}
                  >
                    <span>{group.label}</span>
                    <i
                      className={`fa-solid fa-chevron-down fd-arrow${open ? ' fd-arrow--up' : ''}`}
                      aria-hidden
                    />
                  </button>

                  {open && (
                    <div className="fd-group__body" id={panelId}>
                      {group.items.map((batch) => {
                        const badge = departureBadge[batch.status];
                        const full = batch.status === 'sold-out';
                        return (
                          <button
                            type="button"
                            key={batch.id}
                            className={`fd-date-row${selectedId === batch.id ? ' is-selected' : ''}`}
                            onClick={() => onPick(batch)}
                            disabled={full}
                            aria-label={
                              full ? `${batch.label} — batch full` : `Select departure ${batch.label}`
                            }
                          >
                            <span className="fd-date-row__range">
                              {batch.weekday}, {batch.label}
                            </span>
                            <span className="fd-date-row__right">
                              <span className={`fd-badge ${badge.className}`}>{badge.label}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <p className="fd-footer">
          {kindLabel} today with Indian Treks — pick a date to load it into your booking.
        </p>
      </div>
    </section>
  );
}

/** Latest blog posts, shown beside the departures card on wide screens. */
function BlogSidebar({ posts }: { posts: RelatedPost[] }) {
  if (posts.length === 0) return null;

  return (
    <aside className="bl-card" aria-label="From the blog">
      <div className="bl-header">
        <i className="fa-regular fa-newspaper" aria-hidden /> From the Blog
      </div>

      <div className="bl-list">
        {posts.map((post) => (
          <Link
            className={`bl-item${post.related ? ' is-related' : ''}`}
            href={blogPath(post.slug)}
            key={post.slug}
          >
            <span className="bl-thumb">
              <img
                src={blogThumb(post.image)}
                alt=""
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </span>
            <span className="bl-body">
              <span className="bl-title">{post.title}</span>
              <span className="bl-meta">
                {post.related && <span className="bl-badge">Related</span>}
                <i className="fa-regular fa-calendar" aria-hidden /> {blogDate(post.publishedAt)}
                <span className="bl-dot" aria-hidden />
                <i className="fa-regular fa-clock" aria-hidden /> {post.read}
              </span>
            </span>
          </Link>
        ))}
      </div>

      <Link className="bl-footer" href="/blog">
        Read all stories <i className="fa-solid fa-arrow-right" aria-hidden />
      </Link>
    </aside>
  );
}

function paragraphs(text: string): string[] {
  return text
    .split(/\n{2,}|\.\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (/[.!?]$/.test(s) ? s : `${s}.`));
}

export default function TrekDetailContent({
  trek,
  type,
}: {
  trek: Trek;
  type: 'trek' | 'yatra';
}) {
  const router = useRouter();
  const isYatra = type === 'yatra';
  const kindLabel = isYatra ? 'Yatra' : 'Trek';
  const listHref = isYatra ? '/yatra' : '/treks';

  const images = useMemo(() => galleryImages(trek), [trek]);
  const batches = useMemo(() => getDepartureBatches(trek, 4, 3), [trek]);
  const seasons = useMemo(() => getSeasonGuide(trek), [trek]);
  const reachSteps = useMemo(() => getReachSteps(trek), [trek]);
  const [nearbyPromo, offersPromo, topRatedPromo] = useMemo(() => getPromoBanners(trek), [trek]);
  const relatedPosts = useMemo(() => getRelatedPosts(trek, 3), [trek]);
  const overviewParas = useMemo(
    () => [...paragraphs(trek.brief), ...paragraphs(trek.description)],
    [trek],
  );

  const related = useMemo(
    () =>
      treks
        .filter((t) => t.id !== trek.id && (t.region === trek.region || t.type === trek.type))
        .slice(0, 8),
    [trek],
  );

  // ---- UI state -----------------------------------------------------------
  const [activeSection, setActiveSection] = useState('highlight');
  const [stuck, setStuck] = useState(false);
  const [highlightOpen, setHighlightOpen] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [openDays, setOpenDays] = useState<Set<number>>(() => new Set([1]));
  const [policyTab, setPolicyTab] = useState<'booking' | 'cancellation'>('booking');
  const [faqQuery, setFaqQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [slide, setSlide] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // ---- Booking state ------------------------------------------------------
  const [tierName, setTierName] = useState(trek.pricing[0]?.name ?? 'Economic');
  const pickupOptions = useMemo(() => {
    const start = (trek.startEndPoint || trek.location).split(/\s+to\s+/i)[0].trim();
    const camp = baseCamp(trek);
    return [...new Set([start, camp].filter(Boolean))];
  }, [trek]);
  const [pickup, setPickup] = useState(pickupOptions[0] ?? trek.state);
  const months = useMemo(() => [...new Set(batches.map((b) => b.monthLabel))], [batches]);
  const [month, setMonth] = useState(months[0] ?? '');
  const monthBatches = useMemo(
    () => batches.filter((b) => b.monthLabel === month),
    [batches, month],
  );
  const [batchId, setBatchId] = useState<string | null>(null);
  /** Months grouped for the fixed-departures accordion (same batches as the booking card). */
  const departureMonths = useMemo(
    () => months.map((label) => ({ label, items: batches.filter((b) => b.monthLabel === label) })),
    [batches, months],
  );
  const [openMonth, setOpenMonth] = useState<string | null>(months[0] ?? null);
  const [men, setMen] = useState(1);
  const [women, setWomen] = useState(0);
  const [picked, setPicked] = useState<Set<string>>(() => new Set());

  const tier = trek.pricing.find((p) => p.name === tierName) ?? trek.pricing[0];
  const basePrice = tier?.price ?? 0;
  const persons = Math.max(1, men + women);
  const addOnTotal = addOns
    .filter((a) => picked.has(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  const total = basePrice * persons + addOnTotal * persons;
  const startingPrice = Math.min(...trek.pricing.map((p) => p.price));

  const selectedBatch =
    monthBatches.find((b) => b.id === batchId) ??
    monthBatches.find((b) => b.status !== 'sold-out') ??
    null;

  useEffect(() => {
    setMonth(months[0] ?? '');
    setOpenMonth(months[0] ?? null);
  }, [months]);

  // Default to the first bookable date of the month, but keep an explicit pick
  // (e.g. made from the fixed-departures card) if it is still valid.
  useEffect(() => {
    setBatchId((prev) =>
      prev && monthBatches.some((b) => b.id === prev && b.status !== 'sold-out')
        ? prev
        : (monthBatches.find((b) => b.status !== 'sold-out')?.id ?? null),
    );
  }, [monthBatches]);

  // ---- Sticky section nav -------------------------------------------------
  // Mirrors the reference behaviour: the nav only detaches once the shell it
  // sits in has scrolled past the top of the viewport, and the booking card
  // parks itself just under whatever height the nav ends up being.
  const shellRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const bookingStickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);

    let frame = 0;
    let isStuck = false;

    const update = () => {
      frame = 0;
      const shell = shellRef.current;
      const nav = navRef.current;
      if (!shell || !nav) return;

      const headerOffset = window.innerWidth >= 1024 ? 64 : 0;
      isStuck = shell.getBoundingClientRect().top <= headerOffset;
      setStuck(isStuck);

      const booking = bookingStickyRef.current;
      if (booking) {
        booking.style.top = window.innerWidth <= 767 ? '' : `${headerOffset + nav.offsetHeight + 18}px`;
      }

      if (sections.length) {
        const checkpoint = window.scrollY + (isStuck ? headerOffset + 110 : 150);
        let current = sections[0].id;
        for (const section of sections) {
          if (section.getBoundingClientRect().top + window.scrollY <= checkpoint) {
            current = section.id;
          }
        }
        setActiveSection(current);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Keep the active pill in view whenever the track scrolls horizontally.
  useEffect(() => {
    const track = navRef.current?.querySelector('.kg-sticky-track');
    if (!track || track.scrollWidth <= track.clientWidth + 1) return;
    track
      .querySelector('.kg-sticky-link.is-active')
      ?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeSection]);

  // ---- Lightbox keyboard --------------------------------------------------
  const step = useCallback(
    (delta: number) => {
      setLightbox((cur) => (cur === null ? cur : (cur + delta + images.length) % images.length));
    },
    [images.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, step]);

  // ---- Mobile slider ------------------------------------------------------
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const goToSlide = (index: number) => {
    const track = mobileTrackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
    setSlide(index);
  };

  const onMobileScroll = () => {
    const track = mobileTrackRef.current;
    if (!track || !track.clientWidth) return;
    setSlide(Math.round(track.scrollLeft / track.clientWidth));
  };

  // ---- Gear + testimonial carousels --------------------------------------
  const gearRef = useRef<HTMLDivElement>(null);
  const testiRef = useRef<HTMLDivElement>(null);

  const nudge = (ref: React.RefObject<HTMLDivElement | null>, dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(240, el.clientWidth * 0.8), behavior: 'smooth' });
  };

  // ---- Actions ------------------------------------------------------------
  const goToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /** Fixed-departures row → select that batch in the booking card and reveal it. */
  const pickDeparture = (batch: TrekBatch) => {
    if (batch.status === 'sold-out') return;
    setMonth(batch.monthLabel);
    setBatchId(batch.id);
    goToSection('booking-form');
  };

  const bookingHref = () => {
    const params = new URLSearchParams({ pkg: tierName });
    if (selectedBatch) params.set('date', selectedBatch.startDate);
    params.set('persons', String(persons));
    return `/booking/${trek.id}?${params.toString()}`;
  };

  const enquire = () => {
    const lines = [
      `Hi Indian Treks! I'd like details for ${trek.title} (${trek.duration}).`,
      `Package: ${tierName}`,
      selectedBatch ? `Preferred date: ${selectedBatch.label}` : '',
      `Travellers: ${persons}`,
      `Pickup: ${pickup}`,
    ].filter(Boolean);
    window.open(whatsappUrl(lines.join('\n')), '_blank', 'noopener,noreferrer');
  };

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: trek.title, url: window.location.href });
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      /* dismissed */
    }
  };

  const toggleDay = (day: number) =>
    setOpenDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });

  const toggleAddOn = (id: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const specs = [
    { icon: 'fa-solid fa-person-hiking', label: `${kindLabel} Grade`, value: trek.difficulty },
    { icon: 'fa-solid fa-mountain', label: 'Highest Altitude', value: trek.maxAltitude },
    { icon: 'fa-solid fa-mountain-sun', label: 'Best Season', value: trek.bestSeason },
    { icon: 'fa-solid fa-compass', label: `${kindLabel} Duration`, value: `${trek.nights} Nights / ${trek.days} Days` },
    { icon: 'fa-solid fa-route', label: 'Total Distance', value: trek.distance },
    { icon: 'fa-solid fa-house', label: 'Stays', value: staysLabel(trek) },
    { icon: 'fa-solid fa-bus', label: 'Transport', value: trek.startEndPoint },
    { icon: 'fa-solid fa-map-location-dot', label: `${kindLabel} Region`, value: trek.state },
    { icon: 'fa-solid fa-campground', label: 'Base Camp', value: baseCamp(trek) },
    { icon: 'fa-solid fa-users', label: 'Group Size', value: trek.groupSize },
  ];

  const faqs = trek.faq.filter((f) => {
    const q = faqQuery.trim().toLowerCase();
    if (!q) return true;
    return `${f.q} ${f.a}`.toLowerCase().includes(q);
  });

  const policyRows = policyTab === 'booking' ? bookingPolicyRows : cancellationPolicyRows;
  const policyHead =
    policyTab === 'booking' ? ['Policy Point', 'Details'] : ['Cancellation Window', 'Charge / Refund'];

  return (
    <div className="kg-page">
      <div className="kg-wrap">
        <nav className="kg-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <i className="fa-solid fa-chevron-right" aria-hidden />
          <Link href={listHref}>{isYatra ? 'Yatras' : 'Treks'}</Link>
          <i className="fa-solid fa-chevron-right" aria-hidden />
          <span>{trek.title}</span>
        </nav>

        {/* Desktop gallery */}
        <section className="kg-gallery">
          <button type="button" className="kg-main" onClick={() => setLightbox(0)}>
            <img src={images[0]} alt={trek.title} referrerPolicy="no-referrer" />
            <div className="kg-overlay-top">
              <div className="kg-tags">
                <span className="kg-tag">
                  <i className="fa-regular fa-star" aria-hidden /> {trek.badge || 'Best Rated'}
                </span>
                <span className="kg-tag">{trek.difficulty}</span>
              </div>
              <span
                className="kg-share"
                role="button"
                tabIndex={0}
                aria-label="Share this page"
                onClick={(e) => {
                  e.stopPropagation();
                  void share();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.stopPropagation();
                    void share();
                  }
                }}
              >
                <i className="fa-solid fa-share-from-square" aria-hidden />
              </span>
            </div>
            <div className="kg-overlay-bottom">
              <span className="kg-view-btn">
                <i className="fa-regular fa-images" aria-hidden /> View Photos
              </span>
            </div>
          </button>

          <div className="kg-side">
            <button type="button" className="kg-side-card" onClick={() => setLightbox(1)}>
              <img src={images[1] ?? images[0]} alt={`${trek.title} photo 2`} referrerPolicy="no-referrer" />
            </button>
            <button type="button" className="kg-side-card" onClick={() => setLightbox(2)}>
              <img src={images[2] ?? images[0]} alt={`${trek.title} photo 3`} referrerPolicy="no-referrer" />
              {images.length > 3 && <span className="kg-more-overlay">+{images.length - 3} More</span>}
            </button>
          </div>
        </section>

        {/* Mobile gallery */}
        <div className="kg-mobile">
          <div className="kg-mobile-stage">
            <div className="kg-mobile-track" ref={mobileTrackRef} onScroll={onMobileScroll}>
              {images.map((src, i) => (
                <div className="kg-mobile-slide" key={src}>
                  <button type="button" className="kg-main" onClick={() => setLightbox(i)}>
                    <img src={src} alt={`${trek.title} photo ${i + 1}`} referrerPolicy="no-referrer" />
                  </button>
                </div>
              ))}
            </div>

            <div className="kg-mobile-thumbs">
              {images.slice(0, 4).map((src, i) => (
                <button
                  type="button"
                  key={`thumb-${src}`}
                  className={`kg-mobile-thumb${slide === i ? ' is-active' : ''}`}
                  aria-label={`Go to photo ${i + 1}`}
                  onClick={() => goToSlide(i)}
                >
                  <img src={src} alt="" referrerPolicy="no-referrer" />
                  {i === 3 && images.length > 4 && (
                    <span className="kg-mobile-thumb-more">+{images.length - 4}</span>
                  )}
                </button>
              ))}
            </div>

            <div className="kg-mobile-dots">
              {images.map((src, i) => (
                <button
                  type="button"
                  key={`dot-${src}`}
                  className={`kg-mobile-dot${slide === i ? ' is-active' : ''}`}
                  aria-label={`Photo ${i + 1}`}
                  onClick={() => goToSlide(i)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="kg-departures">
          <FixedDepartures
            months={departureMonths}
            openMonth={openMonth}
            onToggleMonth={(label) => setOpenMonth((cur) => (cur === label ? null : label))}
            selectedId={selectedBatch?.id ?? null}
            onPick={pickDeparture}
            kindLabel={kindLabel}
            enquiryHref={whatsappUrl(`Hi Indian Treks! When is the next ${trek.title} batch?`)}
          />
          <BlogSidebar posts={relatedPosts} />
        </div>
      </div>

      {/* Section nav */}
      <div className="kg-sticky-shell" ref={shellRef}>
        <nav
          className={`kg-sticky-nav${stuck ? ' is-stuck' : ''}`}
          aria-label="Sections"
          ref={navRef}
        >
          <div className="kg-sticky-track">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                className={`kg-sticky-link${activeSection === link.id ? ' is-active' : ''}`}
                onClick={() => goToSection(link.id)}
              >
                <i className={link.icon} aria-hidden />
                <span>{link.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      <div className="kg-main-layout">
        <article className="kg-content">
          {/* Highlight */}
          <section id="highlight" className="kg-section">
            <div className="kg-highlight-card">
              <div className="kg-highlight-head">
                <div>
                  <span className="kg-highlight-kicker">
                    <i className="fa-solid fa-bolt" aria-hidden /> {kindLabel} Highlights
                  </span>
                  <h2>Highlight</h2>
                </div>
              </div>

              <div className="kg-highlight-grid">
                {specs.map((spec) => (
                  <div className="kg-highlight-item" key={spec.label}>
                    <div className="kg-highlight-icon">
                      <i className={spec.icon} aria-hidden />
                    </div>
                    <div className="kg-highlight-meta">
                      <strong>{spec.label}</strong>
                      <span>{spec.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="kg-highlight-more">
                <div className="kg-highlight-more-copy">
                  {(highlightOpen ? trek.highlights : trek.highlights.slice(0, 3)).map((h) => (
                    <p key={h}>{h}</p>
                  ))}
                </div>
                {trek.highlights.length > 3 && (
                  <div className="kg-highlight-more-actions">
                    <button
                      type="button"
                      className="kg-highlight-more-btn"
                      onClick={() => setHighlightOpen((v) => !v)}
                    >
                      {highlightOpen ? 'Read Less' : 'Read More'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Overview */}
          <section id="overview" className="kg-section">
            <div className={`kg-overview-card${overviewOpen ? '' : ' is-collapsed'}`}>
              <div className="kg-overview-head">
                <div>
                  <span className="kg-overview-kicker">
                    <i className="fa-regular fa-file-lines" aria-hidden /> {kindLabel} Overview
                  </span>
                  <h1>{trek.title}</h1>
                  <p>{trek.subtitle}</p>
                </div>
              </div>

              <div className="kg-overview-grid">
                <div className="kg-overview-copy">
                  <div className="kg-overview-text">
                    {overviewParas.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                    <p>
                      The route runs {trek.startEndPoint}, covering {trek.distance} across{' '}
                      {trek.days} days with a highest point of {trek.maxAltitude}. It is graded{' '}
                      {trek.difficulty.toLowerCase()}, which makes it a strong fit for travellers who
                      are comfortable walking a full day but do not need prior technical experience.
                    </p>
                    <p>
                      Departures run in fixed monthly batches of {trek.groupSize}, led by certified
                      trip captains carrying a first-aid kit and oxygen on the high sections. The best
                      window is {trek.bestSeason}.
                    </p>
                  </div>
                </div>

                <div className="kg-overview-points">
                  <h3>Why travellers love it</h3>
                  {trek.highlights.slice(0, 4).map((h) => (
                    <div className="kg-overview-point" key={h}>
                      <i className="fa-solid fa-circle-check" aria-hidden />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="kg-overview-extra">
                <div className="kg-overview-actions">
                  <button
                    type="button"
                    className="kg-overview-btn kg-overview-btn-primary"
                    onClick={() => setOverviewOpen((v) => !v)}
                  >
                    {overviewOpen ? 'View Less' : 'View More'}
                  </button>
                  <button
                    type="button"
                    className="kg-overview-btn kg-overview-btn-soft"
                    onClick={() => goToSection('itinerary')}
                  >
                    See Itinerary
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Itinerary */}
          <section id="itinerary" className="kg-section">
            <div className="kg-itinerary-card">
              <div className="kg-itinerary-head">
                <span className="kg-itinerary-kicker">
                  <i className="fa-solid fa-route" aria-hidden /> Itinerary
                </span>
                <h2>Day wise plan</h2>
                <div>
                  <p>
                    A complete day-wise plan for {trek.title} covering drives, trail sections,
                    altitude gain, meals, and overnight stays from start to finish.
                  </p>
                </div>
              </div>

              <div className="kg-accordion">
                {trek.itinerary.map((day) => {
                  const open = openDays.has(day.day);
                  const facts = [
                    day.distance && { icon: 'fa-solid fa-person-hiking', label: 'Distance', value: day.distance },
                    day.duration && { icon: 'fa-solid fa-compass', label: 'Duration', value: day.duration },
                    day.altitude && { icon: 'fa-solid fa-mountain', label: 'Altitude', value: day.altitude },
                    day.meals && { icon: 'fa-solid fa-utensils', label: 'Meals', value: day.meals },
                  ].filter(Boolean) as { icon: string; label: string; value: string }[];

                  return (
                    <div className={`kg-acc-item${open ? ' is-open' : ''}`} key={day.day}>
                      <button type="button" className="kg-acc-toggle" onClick={() => toggleDay(day.day)}>
                        <span className="kg-acc-day">Day {day.day}</span>
                        <span className="kg-acc-title">
                          <strong>{day.title}</strong>
                        </span>
                        <span className="kg-acc-icon">
                          <i className="fa-solid fa-chevron-down" aria-hidden />
                        </span>
                      </button>
                      <div className="kg-acc-panel">
                        <div className="kg-acc-body">
                          <div className="kg-acc-copy">
                            <div className="kg-acc-facts">
                              {facts.map((fact) => (
                                <div className="kg-acc-fact" key={fact.label}>
                                  <i className={fact.icon} aria-hidden />
                                  <div>
                                    <strong>{fact.label}</strong>
                                    <span>{fact.value}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <p>{day.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <div className="kg-promo">
            <Banners items={nearbyPromo} embedded />
          </div>

          {/* Inclusion & exclusion */}
          <section id="inclusion-exclusion" className="kg-section">
            <div className="kg-inc-card">
              <div className="kg-inc-head">
                <span className="kg-inc-kicker">
                  <i className="fa-solid fa-clipboard-check" aria-hidden /> What&apos;s Covered
                </span>
                <h2>Inclusion &amp; exclusion</h2>
                <div>
                  <p>
                    A detailed overview of everything included in your {trek.title} package —
                    stays, meals, permits, transport, and trek support — along with the costs you
                    should plan for separately.
                  </p>
                </div>
              </div>

              <div className="kg-inc-grid">
                <div className="kg-inc-box kg-inc-included">
                  <h3>
                    <i className="fa-solid fa-circle-check" aria-hidden /> Inclusions
                  </h3>
                  <div className="kg-inc-list">
                    {trek.inclusions.map((item) => (
                      <div className="kg-inc-item" key={item}>
                        <i className="fa-solid fa-check" aria-hidden />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="kg-inc-box kg-inc-excluded">
                  <h3>
                    <i className="fa-solid fa-circle-xmark" aria-hidden /> Exclusions
                  </h3>
                  <div className="kg-inc-list">
                    {trek.exclusions.map((item) => (
                      <div className="kg-inc-item" key={item}>
                        <i className="fa-solid fa-xmark" aria-hidden />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="kg-inc-note">
                <i className="fa-solid fa-circle-info" aria-hidden />
                <div>
                  <ul>
                    <li>Bag offloading is charged at {inr(addOns[0].price)} per bag.</li>
                    <li>Maximum weight per offloaded bag should not exceed 10 kg.</li>
                    <li>All package prices are quoted before 5% GST.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Best time */}
          <section id="best-time" className="kg-section">
            <div className="kg-season-card">
              <div className="kg-season-head">
                <span className="kg-season-kicker">
                  <i className="fa-regular fa-snowflake" aria-hidden /> Seasonal Guide
                </span>
                <h2>Best Time to Visit {trek.title}</h2>
                <div>
                  <p>
                    {trek.title} runs best during {trek.bestSeason}. Timing changes the trail
                    conditions, the views, and how busy the route feels, so here is what to expect
                    across the year.
                  </p>
                </div>
              </div>

              <div className="kg-season-grid">
                {seasons.map((season) => (
                  <div className="kg-season-box" key={season.title}>
                    <h3>{season.title}</h3>
                    <div className="kg-season-text">
                      <p>{season.body}</p>
                      <ul>
                        {season.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Things to carry */}
          <section id="things-to-carry" className="kg-section">
            <div className="kg-carry-card">
              <div className="kg-carry-head">
                <span className="kg-carry-kicker">
                  <i className="fa-solid fa-suitcase" aria-hidden /> Packing Guide
                </span>
                <h2>Things to Carry</h2>
                <div>
                  <p>
                    Pack for two realities — warm sunshine at the base city and near-freezing nights
                    at {trek.maxAltitude}. Keep your pack under 10 kg; anything heavier compounds
                    fatigue on long trail days.
                  </p>
                </div>
              </div>

              <div className="kg-carry-grid">
                {packingGroups.map((group) => (
                  <div className="kg-carry-box" key={group.title}>
                    <h3>
                      <i className={group.icon} aria-hidden /> {group.title}
                    </h3>
                    <div className="kg-carry-list">
                      {group.items.map((item) => (
                        <div className="kg-carry-item" key={item}>
                          <i className="fa-solid fa-check" aria-hidden />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="kg-promo">
            <Banners items={offersPromo} embedded />
          </div>

          {/* How to reach */}
          <section id="how-to-reach" className="kg-section">
            <div className="kg-reach-card">
              <div className="kg-reach-head">
                <span className="kg-reach-kicker">
                  <i className="fa-solid fa-route" aria-hidden /> Travel Plan
                </span>
                <h2>How to Reach {trek.title} Base Camp</h2>
                <div>
                  <p>
                    {trek.title} starts from {baseCamp(trek)}, reached through a multi-stage journey.
                    Plan to arrive a night before your batch reporting time.
                  </p>
                </div>
              </div>

              <div className="kg-reach-flow">
                {reachSteps.map((step, i) => (
                  <div className="kg-reach-step" key={step.title}>
                    <span className="kg-reach-step-badge">{i + 1}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <div className="kg-reach-step-text">
                        <ul>
                          {step.items.map((item) => (
                            <li key={item.label}>
                              <strong>{item.label}:</strong> {item.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Policy */}
          <section id="policy" className="kg-section">
            <div className="kg-policy-card">
              <div className="kg-policy-head">
                <span className="kg-policy-kicker">
                  <i className="fa-solid fa-shield-halved" aria-hidden /> Terms &amp; Rules
                </span>
                <h2>Policy</h2>
                <div>
                  <p>
                    Booking, cancellation, refund, and participation terms so you know exactly where
                    you stand before joining {trek.title}.
                  </p>
                </div>
              </div>

              <div className="kg-policy-tabs">
                <button
                  type="button"
                  className={`kg-policy-tab${policyTab === 'booking' ? ' is-active' : ''}`}
                  onClick={() => setPolicyTab('booking')}
                >
                  Booking Policy
                </button>
                <button
                  type="button"
                  className={`kg-policy-tab${policyTab === 'cancellation' ? ' is-active' : ''}`}
                  onClick={() => setPolicyTab('cancellation')}
                >
                  Cancellation Policy
                </button>
              </div>

              <div className="kg-policy-panel is-active">
                <div className="kg-policy-table-wrap">
                  <table className="kg-policy-table">
                    <thead>
                      <tr>
                        <th>{policyHead[0]}</th>
                        <th>{policyHead[1]}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policyRows.map(([label, detail]) => (
                        <tr key={label}>
                          <td>{label}</td>
                          <td>{detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="kg-policy-note">
                <i className="fa-solid fa-circle-info" aria-hidden />
                <div>
                  <p>
                    Departures and route decisions remain subject to weather, road access, local
                    administration, and safety conditions. Final operational calls are always taken
                    in the interest of the group.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faqs" className="kg-section">
            <div className="kg-faq-card">
              <div className="kg-faq-head">
                <span className="kg-faq-kicker">
                  <i className="fa-regular fa-circle-question" aria-hidden /> Helpful Answers
                </span>
                <h2>FAQ&apos;s</h2>
                <div>
                  <p>
                    Common questions about {trek.title} — difficulty, altitude, fitness, permits,
                    stays, and what to expect on the trail.
                  </p>
                </div>
              </div>

              <div className="kg-faq-search">
                <i className="fa-solid fa-magnifying-glass" aria-hidden />
                <input
                  type="search"
                  value={faqQuery}
                  onChange={(e) => setFaqQuery(e.target.value)}
                  placeholder="Search a question..."
                  aria-label="Search FAQs"
                />
              </div>

              <div className="kg-faq-list">
                {faqs.map((faq, i) => (
                  <div className={`kg-faq-item${openFaq === i ? ' is-open' : ''}`} key={faq.q}>
                    <button
                      type="button"
                      className="kg-faq-toggle"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span>{faq.q}</span>
                      <span className="kg-faq-icon">
                        <i className="fa-solid fa-chevron-down" aria-hidden />
                      </span>
                    </button>
                    <div className="kg-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>

              {faqs.length === 0 && <div className="kg-faq-empty">No matching questions found.</div>}
            </div>
          </section>

          <div className="kg-promo">
            <Banners items={topRatedPromo} embedded />
          </div>

          {/* Rent a gear */}
          <section id="rent-gear" className="kg-section">
            <div className="kg-gear-card">
              <div className="kg-gear-head">
                <div>
                  <span className="kg-gear-kicker">
                    <i className="fa-solid fa-suitcase-rolling" aria-hidden /> Rent a Gear
                  </span>
                  <h2>Rental gear for this {kindLabel.toLowerCase()}</h2>
                </div>
                <div className="kg-gear-nav">
                  <button
                    type="button"
                    className="kg-gear-arrow"
                    aria-label="Previous gear"
                    onClick={() => nudge(gearRef, -1)}
                  >
                    <i className="fa-solid fa-chevron-left" aria-hidden />
                  </button>
                  <button
                    type="button"
                    className="kg-gear-arrow"
                    aria-label="Next gear"
                    onClick={() => nudge(gearRef, 1)}
                  >
                    <i className="fa-solid fa-chevron-right" aria-hidden />
                  </button>
                </div>
              </div>

              <div className="kg-gear-frame">
                <div className="kg-gear-track" ref={gearRef}>
                  {gearRentals.map((item) => (
                    <article className="kg-gear-item" key={item.name}>
                      <div className="kg-gear-photo">
                        <img src={item.img} alt={item.name} referrerPolicy="no-referrer" />
                      </div>
                      <div className="kg-gear-content">
                        <strong>{item.name}</strong>
                        <span className="kg-gear-price">
                          <i className="fa-solid fa-indian-rupee-sign" aria-hidden /> {item.price}/trek
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <p className="kg-gear-note">
                Rentals are collected at the base camp and returned at the end of the trek. Tell us
                what you need while booking so we can reserve your size.
              </p>
            </div>
          </section>
        </article>

        {/* Booking card */}
        <aside className="kg-booking-col">
          <div className="kg-booking-sticky" ref={bookingStickyRef}>
            <div className="bk-wrap" id="booking-form">
              <div className="bk-card">
                <div className="bk-offer-row">
                  <p className="bk-offer-label">Offer Price</p>
                  <span className="bk-gst-badge">+ 5% GST</span>
                </div>

                <div className="bk-price-row">
                  <span className="bk-price-main">{inr(basePrice)}</span>
                  {tier?.originalPrice && (
                    <span className="bk-price-old">{inr(tier.originalPrice)}</span>
                  )}
                  {tier?.badge && <span className="bk-savings-badge">{tier.badge}</span>}
                </div>

                <hr className="bk-dashed" />

                <div className="bk-sec">Package</div>
                <div className="bk-pills">
                  {trek.pricing.map((p) => (
                    <button
                      type="button"
                      key={p.name}
                      className={`bk-pill${tierName === p.name ? ' bk-active' : ''}`}
                      onClick={() => setTierName(p.name)}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>

                <div className="bk-sec">Pickup Location</div>
                <div className="bk-pills">
                  {pickupOptions.map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={`bk-pill${pickup === option ? ' bk-active' : ''}`}
                      onClick={() => setPickup(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="bk-sec">Month-wise Dates</div>
                <div className="bk-dates">
                  <div className="bk-date-row">
                    <div className="bk-date-caption">Choose Month</div>
                    <div className="bk-months">
                      {months.map((m) => (
                        <button
                          type="button"
                          key={m}
                          className={`bk-month-pill${month === m ? ' bk-active' : ''}`}
                          onClick={() => setMonth(m)}
                        >
                          {m.replace(/\s\d{4}$/, '')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bk-date-row">
                    <div className="bk-date-caption">Choose Date</div>
                    <div className="bk-month-dates">
                      {monthBatches.map((b) => {
                        const soldOut = b.status === 'sold-out';
                        return (
                          <button
                            type="button"
                            key={b.id}
                            disabled={soldOut}
                            className={`bk-date-pill${selectedBatch?.id === b.id ? ' bk-active' : ''}${soldOut ? ' bk-closed' : ''}`}
                            onClick={() => !soldOut && setBatchId(b.id)}
                          >
                            <div className="bk-dd">
                              {new Date(b.startDate).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                              })}
                            </div>
                            <span className={`bk-date-tag ${dateTagClass[b.status]}`}>
                              {dateTagLabel[b.status]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="bk-counter-row">
                  <div className="bk-counter-box">
                    <div className="bk-c-label">
                      <i className="fa-regular fa-user" aria-hidden /> Men
                    </div>
                    <div className="bk-c-ctrl">
                      <button type="button" className="bk-c-btn" aria-label="Remove one man" onClick={() => setMen((v) => Math.max(0, v - 1))}>
                        -
                      </button>
                      <span className="bk-c-val">{men}</span>
                      <button type="button" className="bk-c-btn" aria-label="Add one man" onClick={() => setMen((v) => v + 1)}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className="bk-counter-box">
                    <div className="bk-c-label">
                      <i className="fa-regular fa-user" aria-hidden /> Women
                    </div>
                    <div className="bk-c-ctrl">
                      <button type="button" className="bk-c-btn" aria-label="Remove one woman" onClick={() => setWomen((v) => Math.max(0, v - 1))}>
                        -
                      </button>
                      <span className="bk-c-val">{women}</span>
                      <button type="button" className="bk-c-btn" aria-label="Add one woman" onClick={() => setWomen((v) => v + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bk-sec">Add ons</div>
                <div className="bk-addon-strip">
                  {addOns.map((addon) => (
                    <button
                      type="button"
                      key={addon.id}
                      className={`bk-addon-tab${picked.has(addon.id) ? ' bk-active' : ''}`}
                      onClick={() => toggleAddOn(addon.id)}
                      aria-pressed={picked.has(addon.id)}
                    >
                      <span className="bk-addon-tab-top">
                        <span className="bk-addon-tab-ico">
                          <i className={addon.icon} aria-hidden />
                        </span>
                        <span className="bk-addon-tab-check">
                          <i className="fa-solid fa-check" aria-hidden />
                        </span>
                      </span>
                      <span className="bk-addon-name">{addon.name}</span>
                      <span className="bk-addon-price">+ {inr(addon.price)}</span>
                    </button>
                  ))}
                </div>

                <div className="bk-total">
                  <span>Total Price</span>
                  <span>{inr(total)}</span>
                </div>

                <p className="bk-note">
                  {persons} traveller{persons > 1 ? 's' : ''} · {tierName} package
                  {selectedBatch ? ` · ${selectedBatch.label}` : ''}. Deposit of{' '}
                  {inr(tier?.deposit ?? 0)} confirms your seat.
                </p>

                <div className="bk-cta-row">
                  <button type="button" className="bk-btn-book" onClick={() => router.push(bookingHref())}>
                    <i className="fa-solid fa-cart-shopping" aria-hidden /> Book Now
                  </button>
                  <span className="bk-or">or</span>
                  <button type="button" className="bk-btn-enq" onClick={enquire}>
                    <span className="bk-wa">
                      <i className="fa-brands fa-whatsapp" aria-hidden />
                    </span>
                    Enquire Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Testimonials */}
      <section className="kg-testi-shell">
        <div className="kg-testi-card">
          <div className="kg-testi-head">
            <div>
              <span className="kg-testi-kicker">
                <i className="fa-solid fa-award" aria-hidden /> Trusted by Trekkers
              </span>
              <div className="kg-testi-title-row">
                <h2>Guest Testimonials</h2>
              </div>
              <div className="kg-testi-divider" />
              <p>Real feedback from guests who joined this {kindLabel.toLowerCase()}.</p>
            </div>
          </div>

          <div className="kg-testi-track" ref={testiRef}>
            {detailTestimonials.map((t) => (
              <article className="kg-testi-item" key={t.name}>
                <div className="kg-testi-item-top">
                  <div className="kg-testi-user">
                    <span className="kg-testi-avatar">{t.name.slice(0, 2)}</span>
                    <div>
                      <strong>{t.name}</strong>
                      <span>
                        {t.city} • {trek.title}
                      </span>
                    </div>
                  </div>
                  <span className="kg-testi-badge">{t.platform}</span>
                </div>
                <div className="kg-testi-stars">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <i className="fa-solid fa-star" key={s} aria-hidden />
                  ))}
                </div>
                <div>
                  <p>{t.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="kg-testi-nav">
            <button
              type="button"
              className="kg-related-btn"
              aria-label="Previous testimonial"
              onClick={() => nudge(testiRef, -1)}
            >
              <i className="fa-solid fa-chevron-left" aria-hidden />
            </button>
            <button
              type="button"
              className="kg-related-btn"
              aria-label="Next testimonial"
              onClick={() => nudge(testiRef, 1)}
            >
              <i className="fa-solid fa-chevron-right" aria-hidden />
            </button>
          </div>
        </div>
      </section>

      {/* Related tours */}
      <section className="kg-related-shell">
        <div className="kg-related-card">
          <div className="kg-related-head">
            <div>
              <span className="kg-related-kicker">
                <i className="fa-solid fa-compass" aria-hidden /> Explore More
              </span>
              <div className="kg-related-title-row">
                <h2>Related Tours</h2>
              </div>
              <div className="kg-related-divider" />
              <p>Trips that match the same mountain mood and adventure feel.</p>
            </div>
          </div>

          <div className="kg-related-track">
            {related.map((item) => (
              <Link className="kg-r-tour" href={trekDetailPath(item)} key={item.id}>
                <img
                  src={safeImage(item.images[0], trekPhoto(item.id))}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                />
                <div className="kg-r-badges">
                  <span className="kg-r-badge kg-r-badge-days">{item.days} Days</span>
                  <span className={`kg-r-badge kg-r-badge-level ${levelClass(item.difficulty)}`}>
                    {item.difficulty}
                  </span>
                </div>
                <div className="kg-r-content">
                  <div className="kg-r-region">
                    <i className="fa-solid fa-location-dot" aria-hidden /> {item.state}
                  </div>
                  <div className="kg-r-name">{item.title}</div>
                  <div className="kg-r-footer">
                    <div>
                      <span className="kg-r-price-label">Starts from</span>
                      <span className="kg-r-price">
                        {inr(Math.min(...item.pricing.map((p) => p.price)))}
                        <sup>/person</sup>
                      </span>
                    </div>
                    <span className="kg-r-cta">
                      <i className="fa-solid fa-arrow-right" aria-hidden /> Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="kg-lightbox is-open"
          role="dialog"
          aria-modal="true"
          aria-label={`${trek.title} photos`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightbox(null);
          }}
        >
          <button type="button" className="kg-lb-close" aria-label="Close" onClick={() => setLightbox(null)}>
            <i className="fa-solid fa-xmark" aria-hidden />
          </button>
          <button type="button" className="kg-lb-btn kg-lb-prev" aria-label="Previous photo" onClick={() => step(-1)}>
            <i className="fa-solid fa-chevron-left" aria-hidden />
          </button>
          <div className="kg-lightbox-stage">
            <img src={images[lightbox]} alt={`${trek.title} photo ${lightbox + 1}`} referrerPolicy="no-referrer" />
          </div>
          <button type="button" className="kg-lb-btn kg-lb-next" aria-label="Next photo" onClick={() => step(1)}>
            <i className="fa-solid fa-chevron-right" aria-hidden />
          </button>
          <div className="kg-lb-count">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Mobile book bar */}
      <div className="kg-mobile-bookbar">
        <div className="kg-mobile-bookbar-price">
          <strong>{inr(startingPrice)}</strong>
          <span>Starting price</span>
        </div>
        <button type="button" className="kg-mobile-bookbar-book" onClick={() => router.push(bookingHref())}>
          <i className="fa-solid fa-cart-shopping" aria-hidden /> Book Now
        </button>
        <button type="button" className="kg-mobile-bookbar-wa" aria-label="Enquire on WhatsApp" onClick={enquire}>
          <i className="fa-brands fa-whatsapp" aria-hidden />
        </button>
      </div>
    </div>
  );
}
