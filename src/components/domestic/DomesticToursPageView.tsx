'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { DESK_HEADER_H, MOBILE_HEADER_H } from '@/lib/layout';
import { whatsappUrl } from '@/lib/contact';
import {
  domesticDestinations,
  domesticFaqs,
  domesticFeaturedMonth,
  domesticMoodCards,
  domesticPackages,
  domesticStickyNav,
  domesticWhyPoints,
  packagesByBudget,
  packagesForDestination,
} from '@/lib/domestic-tours-content';
import { domesticArticles, domesticReviews } from '@/lib/landing-social-content';
import LandingReviewsBlog from '@/components/landing/LandingReviewsBlog';
import LandingTripCard from '@/components/landing/LandingTripCard';
import DomesticHero, { domesticSearchDestinationId } from '@/components/domestic/DomesticHero';
import './domestic-tours.css';

type BudgetTab = 'under-20k' | '20-30k' | '30k-plus';

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function DomesticToursPageView() {
  const [activeId, setActiveId] = useState('explore-india');
  const [stickyStuck, setStickyStuck] = useState(false);
  const [budgetTab, setBudgetTab] = useState<BudgetTab>('under-20k');
  const [openFaq, setOpenFaq] = useState<string | null>(domesticFaqs[0]?.q ?? null);

  useEffect(() => {
    const items = domesticStickyNav;
    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = window.innerWidth >= 1024 ? 200 : 170;
      const checkpoint = window.scrollY + offset;
      let current: string = items[0].id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top + window.scrollY <= checkpoint) current = item.id;
      }
      setActiveId(current);
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

  useEffect(() => {
    const sentinel = document.getElementById('dt-sticky-sentinel');
    if (!sentinel) return;
    let io: IntersectionObserver | null = null;
    const mount = () => {
      io?.disconnect();
      const top = window.innerWidth >= 1024 ? DESK_HEADER_H : MOBILE_HEADER_H;
      io = new IntersectionObserver(
        ([entry]) => setStickyStuck(!entry.isIntersecting),
        { rootMargin: `-${top + 1}px 0px 0px 0px`, threshold: 0 },
      );
      io.observe(sentinel);
    };
    mount();
    window.addEventListener('resize', mount);
    return () => {
      window.removeEventListener('resize', mount);
      io?.disconnect();
    };
  }, []);

  const budgetPackages = useMemo(() => {
    if (budgetTab === 'under-20k') return packagesByBudget(19999);
    if (budgetTab === '20-30k') return packagesByBudget(30000, 20000);
    return packagesByBudget(Number.POSITIVE_INFINITY, 30001);
  }, [budgetTab]);

  const handpicked = domesticPackages.slice(0, 8);
  const pageVars = {
    '--bp-desk-top': `${DESK_HEADER_H}px`,
    '--bp-mob-top': `calc(${MOBILE_HEADER_H}px + env(safe-area-inset-top, 0px))`,
  } as CSSProperties;

  const handleHeroSearch = ({
    where,
    when,
    who,
  }: {
    where: string;
    when: string;
    who: string;
  }) => {
    const destId = domesticSearchDestinationId(where);
    if (destId) scrollToId(`dest-${destId}`);
    else scrollToId('explore-india');
    void when;
    void who;
  };

  return (
    <div className="it-dt" style={pageVars}>
      <DomesticHero
        onBrowse={() => scrollToId('handpicked')}
        onSearch={handleHeroSearch}
      />

      <div id="dt-sticky-sentinel" className="it-dt__sticky-sentinel" aria-hidden />
      <nav className={`it-dt__sticky${stickyStuck ? ' is-stuck' : ''}`} aria-label="Domestic sections">
        <div className="it-dt__sticky-shell">
          <p className="it-dt__sticky-label">Jump to</p>
          <div className="it-dt__sticky-track" role="tablist">
            {domesticStickyNav.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeId === item.id}
                className={activeId === item.id ? 'is-active' : undefined}
                onClick={() => scrollToId(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="it-dt__section it-dt__section--soft">
        <div className="it-dt__container">
          <div className="it-dt__mood-grid">
            {domesticMoodCards.map((card) => (
              <article key={card.id} className="it-dt__mood-card">
                <p className="it-dt__kicker">{card.meta}</p>
                <h3>{card.title}</h3>
                <p>{card.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="explore-india" className="it-dt__section it-dt__section--anchor">
        <div className="it-dt__container">
          <div className="it-dt__heading it-dt__heading--center">
            <p className="it-dt__kicker">Find the Perfect India Tour Package</p>
            <h2>Explore India</h2>
            <p>
              Choose your destination, pick your travel style, and discover an India holiday made for
              you — with packages from the Indian Treks catalog.
            </p>
          </div>

          <div className="it-dt__region-grid">
            {domesticDestinations.map((d) => (
              <button
                key={d.id}
                type="button"
                className="it-dt__region-card"
                onClick={() => scrollToId(`dest-${d.id}`)}
              >
                <img src={d.cover} alt="" referrerPolicy="no-referrer" />
                <div className="it-dt__region-fade" />
                <div className="it-dt__region-copy">
                  <span className="it-dt__region-count">
                    {packagesForDestination(d.id).length} packages
                  </span>
                  <strong>{d.name}</strong>
                  <span>{d.blurb}</span>
                  <span className="it-dt__region-tags">{d.tags.join(' · ')}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="it-dt__section">
        <div className="it-dt__container">
          <div className="it-dt__featured">
            <div className="it-dt__featured-media">
              <Image src={domesticFeaturedMonth.cover} alt="" fill sizes="(max-width:900px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="it-dt__featured-copy">
              <p className="it-dt__kicker">{domesticFeaturedMonth.title}</p>
              <h2>{domesticFeaturedMonth.name}</h2>
              <p>{domesticFeaturedMonth.blurb}</p>
              <a
                className="it-dt__btn it-dt__btn--primary"
                href={whatsappUrl(domesticFeaturedMonth.whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {domesticFeaturedMonth.ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="handpicked" className="it-dt__section it-dt__section--wash it-dt__section--anchor">
        <div className="it-dt__container">
          <div className="it-dt__heading">
            <p className="it-dt__kicker">Traveler Favourites</p>
            <h2>Handpicked Across India</h2>
            <p>
              Every itinerary here has earned its place by creating memories — not promises. All
              packages are from the Indian Treks catalog.
            </p>
          </div>
          <div className="landing-trip-row">
            {handpicked.map((pkg) => (
              <LandingTripCard
                key={pkg.id}
                href={pkg.href}
                cover={pkg.cover}
                title={pkg.title}
                subtitle={pkg.subtitle}
                meta={pkg.tags.slice(0, 3).join(' · ')}
                duration={pkg.duration}
                badge={pkg.badge}
                price={pkg.price}
                priceLabel="From"
                ctaLabel="Explore Package"
                external={pkg.external}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="by-budget" className="it-dt__section it-dt__section--anchor">
        <div className="it-dt__container">
          <div className="it-dt__heading it-dt__heading--center">
            <p className="it-dt__kicker">Find Your Perfect Match</p>
            <h2>Trips That Match Your Budget</h2>
            <p>Choose the budget that feels right. We&apos;ll make every rupee worth the journey.</p>
          </div>

          <div className="it-dt__tabs" role="tablist" aria-label="Budget">
            {(
              [
                ['under-20k', 'Under ₹20K'],
                ['20-30k', '₹20K–30K'],
                ['30k-plus', '₹30K+'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={budgetTab === id}
                className={budgetTab === id ? 'is-active' : undefined}
                onClick={() => setBudgetTab(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="landing-trip-row">
            {budgetPackages.slice(0, 6).map((pkg) => (
              <LandingTripCard
                key={`${budgetTab}-${pkg.id}`}
                href={pkg.href}
                cover={pkg.cover}
                title={pkg.title}
                subtitle={pkg.subtitle}
                meta={pkg.tags.slice(0, 3).join(' · ')}
                duration={pkg.duration}
                badge={pkg.badge}
                price={pkg.price}
                priceLabel="From"
                ctaLabel="Explore Package"
                external={pkg.external}
              />
            ))}
          </div>
        </div>
      </section>

      {domesticDestinations.map((dest, idx) => {
        const pkgs = packagesForDestination(dest.id);
        if (!pkgs.length) return null;
        return (
          <section
            key={dest.id}
            id={`dest-${dest.id}`}
            className={`it-dt__section it-dt__section--anchor${idx % 2 ? ' it-dt__section--soft' : ''}`}
          >
            <div className="it-dt__container">
              <div className="it-dt__heading">
                <p className="it-dt__kicker">
                  <MapPin className="inline h-3.5 w-3.5 -mt-0.5 mr-1" aria-hidden />
                  {dest.name}
                </p>
                <h2>{dest.name} Trips</h2>
                <p>
                  {dest.blurb}. {dest.tags.join(' · ')}.
                </p>
              </div>
              <div
                className="landing-trip-row"
              >
                {pkgs.map((pkg) => (
                  <LandingTripCard
                key={pkg.id}
                href={pkg.href}
                cover={pkg.cover}
                title={pkg.title}
                subtitle={pkg.subtitle}
                meta={pkg.tags.slice(0, 3).join(' · ')}
                duration={pkg.duration}
                badge={pkg.badge}
                price={pkg.price}
                priceLabel="From"
                ctaLabel="Explore Package"
                external={pkg.external}
              />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section id="why-domestic" className="it-dt__section it-dt__section--wash it-dt__section--anchor">
        <div className="it-dt__container">
          <div className="it-dt__heading it-dt__heading--center">
            <p className="it-dt__kicker">Rediscover India</p>
            <h2>Incredible Way</h2>
            <p>
              Whether it&apos;s iconic landmarks or hidden escapes, every journey is designed around
              your travel style, pace and preferences.
            </p>
          </div>
          <div className="it-dt__why-grid">
            {domesticWhyPoints.map((item) => (
              <article key={item.title} className="it-dt__why-card">
                <span className="it-dt__why-icon" aria-hidden>
                  <Check className="h-4 w-4" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className="it-dt__center-cta">
            <a
              className="it-dt__btn it-dt__btn--primary"
              href={whatsappUrl('Hi Indian Treks! Make my domestic India trip plan now.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Make Your Plan Now
              <Sparkles className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <LandingReviewsBlog
        reviews={{
          kicker: 'Reviews',
          title: 'What our clients say about us',
          intro:
            'Notes from travellers who planned customised domestic trips and Himalayan holidays with Indian Treks.',
          items: domesticReviews,
        }}
        articles={{
          kicker: 'Blogs',
          title: 'Our blogs',
          items: domesticArticles,
        }}
      />

      <section className="it-dt__section">
        <div className="it-dt__container it-dt__faq">
          <div className="it-dt__heading">
            <p className="it-dt__kicker">FAQ</p>
            <h2>Have any doubts?</h2>
          </div>
          <ul className="it-dt__faq-list">
            {domesticFaqs.map((item) => {
              const open = openFaq === item.q;
              return (
                <li key={item.q}>
                  <button
                    type="button"
                    className={open ? 'is-open' : undefined}
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : item.q)}
                  >
                    {item.q}
                    <span aria-hidden>{open ? '−' : '+'}</span>
                  </button>
                  {open ? <p>{item.a}</p> : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="it-dt__section it-dt__discover">
        <div className="it-dt__container">
          <div className="it-dt__discover-panel">
            <div className="it-dt__discover-copy">
              <p className="it-dt__kicker it-dt__kicker--on-dark">Ready when you are</p>
              <h2>Plan a domestic trip your way</h2>
              <p>
                Tell us your dates, budget and mood — mountains, backpacking, bike or pilgrimage —
                and we&apos;ll craft the right India itinerary.
              </p>
            </div>
            <a
              className="it-dt__btn it-dt__btn--primary it-dt__discover-cta"
              href={whatsappUrl(
                'Hi Indian Treks! I want a customised domestic India tour package. Please help me plan.',
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Plan Your Trip
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
