'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import {
  ArrowRight,
  Backpack,
  Check,
  MapPin,
  Mountain,
} from 'lucide-react';
import { DESK_HEADER_H, MOBILE_HEADER_H } from '@/lib/layout';
import { whatsappUrl } from '@/lib/contact';
import {
  backpackingDiscoveryOptions,
  backpackingRegions,
  backpackingStickyNav,
  backpackingTripWhatsappMsg,
  backpackingWhyPoints,
  tripsForRegion,
} from '@/lib/backpacking-trips-content';
import {
  backpackingArticles,
  backpackingReviews,
  type LandingArticle,
} from '@/lib/landing-social-content';
import LandingReviewsBlog from '@/components/landing/LandingReviewsBlog';
import LandingTripCard from '@/components/landing/LandingTripCard';
import BackpackingPremiumHero from '@/components/backpacking/BackpackingPremiumHero';
import './backpacking-trips.css';

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function BackpackingTripsPageView({ blogArticles }: { blogArticles?: LandingArticle[] }) {
  const [activeId, setActiveId] = useState<string>('explore-regions');
  const [pickedDiscovery, setPickedDiscovery] = useState<string | null>(null);
  const [stickyStuck, setStickyStuck] = useState(false);

  useEffect(() => {
    const items = backpackingStickyNav;
    let frame = 0;

    const update = () => {
      frame = 0;
      const offset = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 200 : 170;
      const checkpoint = window.scrollY + offset;
      let current: string = items[0].id;

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top + window.scrollY <= checkpoint) {
          current = item.id;
        }
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
    const sentinel = document.getElementById('bp-sticky-sentinel');
    if (!sentinel) return;

    let io: IntersectionObserver | null = null;

    const mount = () => {
      io?.disconnect();
      const top = window.innerWidth >= 1024 ? DESK_HEADER_H : MOBILE_HEADER_H;
      io = new IntersectionObserver(
        ([entry]) => setStickyStuck(!entry.isIntersecting),
        {
          rootMargin: `-${top + 1}px 0px 0px 0px`,
          threshold: 0,
        },
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

  const discoveryHint =
    backpackingDiscoveryOptions.find((o) => o.id === pickedDiscovery)?.whatsappHint ??
    'looking for help choosing a backpacking trip';

  const stickyTopMobile = `calc(${MOBILE_HEADER_H}px + env(safe-area-inset-top, 0px))`;
  const pageVars = {
    '--bp-desk-top': `${DESK_HEADER_H}px`,
    '--bp-mob-top': stickyTopMobile,
  } as CSSProperties;

  return (
    <div className="it-bp" style={pageVars}>
      {/* Hero */}
      <BackpackingPremiumHero />

      {/* Sticky region nav — floating segmented control under site header */}
      <div id="bp-sticky-sentinel" className="it-bp__sticky-sentinel" aria-hidden />
      <nav
        className={`it-bp__sticky it-bp__sticky--icons${stickyStuck ? ' is-stuck' : ''}`}
        aria-label="Backpacking regions"
      >
        <div className="it-bp__sticky-shell it-bp__sticky-shell--icons">
          <p className="it-bp__sticky-label">Jump to</p>
          <div className="it-bp__sticky-track" role="tablist" aria-label="Regions">
            {backpackingStickyNav.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeId === item.id}
                className={activeId === item.id ? 'is-active' : undefined}
                onClick={() => scrollToId(item.id)}
              >
                <Mountain className="it-bp__sticky-icon" aria-hidden />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Explore by region */}
      <section id="explore-regions" className="it-bp__section it-bp__section--anchor">
        <div className="it-bp__container">
          <div className="it-bp__heading">
            <p className="it-bp__kicker">Destinations</p>
            <h2>Explore Backpacking by Region</h2>
            <p>
              Choose your destination and discover journeys designed around landscapes, local
              experiences and memorable trails.
            </p>
          </div>

          <div className="it-bp__region-grid">
            {backpackingRegions.map((region) => (
              <button
                key={region.id}
                type="button"
                className="it-bp__region-card"
                onClick={() => scrollToId(region.id)}
              >
                <img src={region.cover} alt="" referrerPolicy="no-referrer" />
                <div className="it-bp__region-fade" />
                <div className="it-bp__region-copy">
                  <span className="it-bp__region-count">
                    {tripsForRegion(region.id).length}{' '}
                    {tripsForRegion(region.id).length === 1 ? 'trip' : 'trips'}
                  </span>
                  <strong>{region.cardTitle}</strong>
                  <span>{region.cardBlurb}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why backpack */}
      <section className="it-bp__section it-bp__section--wash">
        <div className="it-bp__container it-bp__why">
          <div className="it-bp__why-copy">
            <p className="it-bp__kicker">Our approach</p>
            <h2>Why Backpack With Us?</h2>
            <p className="it-bp__why-tagline">Backpacking, not just sightseeing.</p>
            <p>
              Small groups, planned routes, and room to wander — so every journey feels social,
              flexible, and rooted in real places.
            </p>
          </div>
          <ul className="it-bp__why-list">
            {backpackingWhyPoints.map((point) => (
              <li key={point}>
                <span className="it-bp__why-icon" aria-hidden>
                  <Check className="h-4 w-4" />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Region trip sections */}
      {backpackingRegions.map((region, idx) => {
        const trips = tripsForRegion(region.id);
        return (
          <section
            key={region.id}
            id={region.id}
            className={`it-bp__section it-bp__section--anchor${
              idx % 2 === 1 ? ' it-bp__section--soft' : ''
            }`}
          >
            <div className="it-bp__container">
              <div className="it-bp__heading it-bp__heading--row">
                <div>
                  <p className="it-bp__kicker">
                    <MapPin className="inline h-3.5 w-3.5 -mt-0.5 mr-1" aria-hidden />
                    {region.name}
                  </p>
                  <h2>{region.sectionTitle}</h2>
                  <p>{region.sectionIntro}</p>
                </div>
              </div>

              <div className="landing-trip-row">
                {trips.map((trip) => (
                  <LandingTripCard
                    key={trip.id}
                    href={whatsappUrl(backpackingTripWhatsappMsg(trip))}
                    cover={trip.cover}
                    title={trip.title}
                    subtitle={trip.subtitle}
                    meta={[trip.pickup, trip.duration, trip.season].filter(Boolean).join(' · ')}
                    duration={trip.duration}
                    badge={trip.badge}
                    price={trip.price}
                    external
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <LandingReviewsBlog
        reviews={{
          kicker: 'Traveller reviews',
          title: 'Stories from the road',
          intro:
            'Notes from backpackers who travelled with us across Himachal, Uttarakhand, Spiti and the Northeast.',
          items: backpackingReviews,
        }}
        articles={{
          kicker: 'From the blog',
          title: 'Guides for your next trip',
          items: blogArticles ?? backpackingArticles,
        }}
      />

      {/* Discovery */}
      <section id="find-my-trip" className="it-bp__section it-bp__discover it-bp__section--anchor">
        <div className="it-bp__container">
          <div className="it-bp__discover-panel">
            <div className="it-bp__discover-copy">
              <p className="it-bp__kicker it-bp__kicker--on-dark">Need a nudge?</p>
              <h2>Not Sure Where to Go?</h2>
              <p>
                Tell us what kind of journey you&apos;re looking for, and we&apos;ll help you find
                the right backpacking trip.
              </p>
            </div>

            <div className="it-bp__discover-options" role="group" aria-label="Trip preferences">
              {backpackingDiscoveryOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={pickedDiscovery === opt.id ? 'is-active' : undefined}
                  onClick={() => {
                    setPickedDiscovery(opt.id);
                    scrollToId(opt.targetRegionId);
                  }}
                >
                  <Backpack className="h-4 w-4 shrink-0" aria-hidden />
                  {opt.label}
                </button>
              ))}
            </div>

            <a
              className="it-bp__btn it-bp__btn--primary it-bp__discover-cta"
              href={whatsappUrl(
                `Hi Indian Treks! I'm ${discoveryHint}. Please help me find the right backpacking trip.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find My Trip
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
