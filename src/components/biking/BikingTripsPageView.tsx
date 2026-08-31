'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import {
  ArrowRight,
  Bike,
  Check,
  MapPin,
  Mountain,
} from 'lucide-react';
import { DESK_HEADER_H, MOBILE_HEADER_H } from '@/lib/layout';
import { whatsappUrl } from '@/lib/contact';
import {
  bikingDiscoveryOptions,
  bikingRegions,
  bikingStickyNav,
  bikingTripWhatsappMsg,
  bikingWhyPoints,
  tripsForBikingRegion,
} from '@/lib/biking-trips-content';
import { bikingArticles, bikingReviews, type LandingArticle } from '@/lib/landing-social-content';
import LandingReviewsBlog from '@/components/landing/LandingReviewsBlog';
import LandingTripCard from '@/components/landing/LandingTripCard';
import BikingPremiumHero from '@/components/biking/BikingPremiumHero';
import './biking-trips.css';

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function BikingTripsPageView({ blogArticles }: { blogArticles?: LandingArticle[] }) {
  const [activeId, setActiveId] = useState<string>('explore-biking');
  const [pickedDiscovery, setPickedDiscovery] = useState<string | null>(null);
  const [stickyStuck, setStickyStuck] = useState(false);

  useEffect(() => {
    const items = bikingStickyNav;
    let frame = 0;

    const update = () => {
      frame = 0;
      const offset = window.innerWidth >= 1024 ? 200 : 170;
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
    const sentinel = document.getElementById('bk-sticky-sentinel');
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
    bikingDiscoveryOptions.find((o) => o.id === pickedDiscovery)?.whatsappHint ??
    'looking for help choosing a Himalayan bike trip';

  const stickyTopMobile = `calc(${MOBILE_HEADER_H}px + env(safe-area-inset-top, 0px))`;
  const pageVars = {
    '--bp-desk-top': `${DESK_HEADER_H}px`,
    '--bp-mob-top': stickyTopMobile,
  } as CSSProperties;

  return (
    <div className="it-bk" style={pageVars}>
      <BikingPremiumHero />

      <div id="bk-sticky-sentinel" className="it-bk__sticky-sentinel" aria-hidden />
      <nav
        className={`it-bk__sticky it-bk__sticky--icons${stickyStuck ? ' is-stuck' : ''}`}
        aria-label="Biking regions"
      >
        <div className="it-bk__sticky-shell it-bk__sticky-shell--icons">
          <p className="it-bk__sticky-label">Jump to</p>
          <div className="it-bk__sticky-track" role="tablist" aria-label="Regions">
            {bikingStickyNav.map((item) => {
              const NavIcon = item.icon === 'bike' ? Bike : Mountain;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={activeId === item.id}
                  className={activeId === item.id ? 'is-active' : undefined}
                  onClick={() => scrollToId(item.id)}
                >
                  <NavIcon className="it-bk__sticky-icon" aria-hidden />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <section id="explore-biking" className="it-bk__section it-bk__section--anchor">
        <div className="it-bk__container">
          <div className="it-bk__heading">
            <p className="it-bk__kicker">Destinations</p>
            <h2>Explore Biking by Region</h2>
            <p>
              Choose Ladakh for iconic high passes or Spiti for cold-desert monasteries and remote
              mountain roads — both with full ride support.
            </p>
          </div>

          <div className="it-bk__region-grid">
            {bikingRegions.map((region) => (
              <button
                key={region.id}
                type="button"
                className="it-bk__region-card"
                onClick={() => scrollToId(region.id)}
              >
                <img src={region.cover} alt="" referrerPolicy="no-referrer" />
                <div className="it-bk__region-fade" />
                <div className="it-bk__region-copy">
                  <span className="it-bk__region-count">
                    {tripsForBikingRegion(region.id).length}{' '}
                    {tripsForBikingRegion(region.id).length === 1 ? 'trip' : 'trips'}
                  </span>
                  <strong>{region.cardTitle}</strong>
                  <span>{region.cardBlurb}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="it-bk__section it-bk__section--wash">
        <div className="it-bk__container it-bk__why">
          <div className="it-bk__why-copy">
            <p className="it-bk__kicker">Our approach</p>
            <h2>Why Ride With Us?</h2>
            <p className="it-bk__why-tagline">Serious roads. Supported riding.</p>
            <p>
              High-altitude highways need planning — we handle bikes, backup, briefings and stays so
              you can focus on the ride and the views.
            </p>
          </div>
          <ul className="it-bk__why-list">
            {bikingWhyPoints.map((point) => (
              <li key={point}>
                <span className="it-bk__why-icon" aria-hidden>
                  <Check className="h-4 w-4" />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {bikingRegions.map((region, idx) => {
        const trips = tripsForBikingRegion(region.id);
        return (
          <section
            key={region.id}
            id={region.id}
            className={`it-bk__section it-bk__section--anchor${
              idx % 2 === 1 ? ' it-bk__section--soft' : ''
            }`}
          >
            <div className="it-bk__container">
              <div className="it-bk__heading">
                <div>
                  <p className="it-bk__kicker">
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
                    href={whatsappUrl(bikingTripWhatsappMsg(trip))}
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
          kicker: 'Rider reviews',
          title: 'Stories from the highway',
          intro:
            'Notes from riders who took on Ladakh and Spiti with Indian Treks — passes, deserts and long scenic days.',
          items: bikingReviews,
        }}
        articles={{
          kicker: 'From the blog',
          title: 'Read before you ride',
          items: blogArticles ?? bikingArticles,
        }}
      />

      <section id="find-my-ride" className="it-bk__section it-bk__discover it-bk__section--anchor">
        <div className="it-bk__container">
          <div className="it-bk__discover-panel">
            <div className="it-bk__discover-copy">
              <p className="it-bk__kicker it-bk__kicker--on-dark">Need a nudge?</p>
              <h2>Not Sure Which Ride?</h2>
              <p>
                Tell us your experience level and how many days you have — we&apos;ll help you pick
                the right Ladakh or Spiti bike trip.
              </p>
            </div>

            <div className="it-bk__discover-options" role="group" aria-label="Ride preferences">
              {bikingDiscoveryOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={pickedDiscovery === opt.id ? 'is-active' : undefined}
                  onClick={() => {
                    setPickedDiscovery(opt.id);
                    scrollToId(opt.targetRegionId);
                  }}
                >
                  <Bike className="h-4 w-4 shrink-0" aria-hidden />
                  {opt.label}
                </button>
              ))}
            </div>

            <a
              className="it-bk__btn it-bk__btn--primary it-bk__discover-cta"
              href={whatsappUrl(
                `Hi Indian Treks! I'm ${discoveryHint}. Please help me find the right bike trip.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find My Ride
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
