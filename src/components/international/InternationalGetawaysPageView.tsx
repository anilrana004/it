'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Globe,
  MapPin,
} from 'lucide-react';
import { DESK_HEADER_H, MOBILE_HEADER_H } from '@/lib/layout';
import { whatsappUrl } from '@/lib/contact';
import {
  internationalDiscoveryOptions,
  internationalStickyNav,
  internationalTripHref,
  internationalTrips,
  internationalTripWhatsappMsg,
  internationalWhyPoints,
} from '@/lib/international-getaways-content';
import {
  internationalArticles,
  internationalReviews,
} from '@/lib/landing-social-content';
import LandingReviewsBlog from '@/components/landing/LandingReviewsBlog';
import LandingTripCard from '@/components/landing/LandingTripCard';
import InternationalHero, { internationalSearchTripId } from '@/components/international/InternationalHero';
import './international-getaways.css';

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function InternationalGetawaysPageView() {
  const [activeId, setActiveId] = useState<string>('explore-international');
  const [pickedDiscovery, setPickedDiscovery] = useState<string | null>(null);
  const [stickyStuck, setStickyStuck] = useState(false);

  useEffect(() => {
    const items = internationalStickyNav;
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
    const sentinel = document.getElementById('ig-sticky-sentinel');
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
    internationalDiscoveryOptions.find((o) => o.id === pickedDiscovery)?.whatsappHint ??
    'looking for help choosing an international trek in Nepal';

  const stickyTopMobile = `calc(${MOBILE_HEADER_H}px + env(safe-area-inset-top, 0px))`;
  const pageVars = {
    '--bp-desk-top': `${DESK_HEADER_H}px`,
    '--bp-mob-top': stickyTopMobile,
  } as CSSProperties;

  const handleHeroSearch = ({
    trek,
    when,
    who,
  }: {
    trek: string;
    when: string;
    who: string;
  }) => {
    const tripId = internationalSearchTripId(trek);
    if (tripId) scrollToId(tripId);
    else scrollToId('international-treks');
    void when;
    void who;
  };

  return (
    <div className="it-ig" style={pageVars}>
      <InternationalHero
        onBrowse={() => scrollToId('international-treks')}
        onSearch={handleHeroSearch}
      />

      <div id="ig-sticky-sentinel" className="it-ig__sticky-sentinel" aria-hidden />
      <nav
        className={`it-ig__sticky${stickyStuck ? ' is-stuck' : ''}`}
        aria-label="International sections"
      >
        <div className="it-ig__sticky-shell">
          <p className="it-ig__sticky-label">Jump to</p>
          <div className="it-ig__sticky-track" role="tablist" aria-label="Sections">
            {internationalStickyNav.map((item) => (
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

      <section id="explore-international" className="it-ig__section it-ig__section--anchor">
        <div className="it-ig__container">
          <div className="it-ig__heading">
            <p className="it-ig__kicker">Destinations</p>
            <h2>Explore International Treks</h2>
            <p>
              Nepal’s classic Himalayan routes — from the world’s highest peak to the Annapurna
              sanctuary and the full circuit around the massif.
            </p>
          </div>

          <div className="it-ig__region-grid">
            {internationalTrips.map((trip) => (
              <button
                key={trip.id}
                type="button"
                className="it-ig__region-card"
                onClick={() => scrollToId(trip.id)}
              >
                <img src={trip.cover} alt="" referrerPolicy="no-referrer" />
                <div className="it-ig__region-fade" />
                <div className="it-ig__region-copy">
                  <span className="it-ig__region-count">{trip.duration}</span>
                  <strong>{trip.title}</strong>
                  <span>{trip.subtitle}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="it-ig__section it-ig__section--wash">
        <div className="it-ig__container it-ig__why">
          <div className="it-ig__why-copy">
            <p className="it-ig__kicker">Our approach</p>
            <h2>Why Trek Abroad With Us?</h2>
            <p className="it-ig__why-tagline">Nepal made simple from India.</p>
            <p>
              Flights, permits, lodges and acclimatisation are planned so you can focus on the trail
              — with leaders who know these routes season after season.
            </p>
          </div>
          <ul className="it-ig__why-list">
            {internationalWhyPoints.map((point) => (
              <li key={point}>
                <span className="it-ig__why-icon" aria-hidden>
                  <Check className="h-4 w-4" />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="international-treks"
        className="it-ig__section it-ig__section--anchor it-ig__section--soft"
      >
        <div className="it-ig__container">
          <div className="it-ig__heading">
            <p className="it-ig__kicker">
              <MapPin className="inline h-3.5 w-3.5 -mt-0.5 mr-1" aria-hidden />
              Nepal
            </p>
            <h2>International Treks</h2>
            <p>
              Three legendary Himalayan journeys — Everest Base Camp, Annapurna Base Camp and the
              Annapurna Circuit — with clear durations, seasons and starting prices.
            </p>
          </div>

          <div className="landing-trip-row">
            {internationalTrips.map((trip) => (
              <div key={trip.id} id={trip.id} className="it-ig__section--anchor">
                <LandingTripCard
                  key={trip.id}
                  href={internationalTripHref(trip) || whatsappUrl(internationalTripWhatsappMsg(trip))}
                  cover={trip.cover}
                  title={trip.title}
                  subtitle={trip.subtitle}
                  meta={[trip.pickup, trip.duration, trip.season].filter(Boolean).join(' · ')}
                  duration={trip.duration}
                  badge={trip.badge}
                  price={trip.price}
                  ctaLabel="View Trek"
                  external={!trip.slug}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <LandingReviewsBlog
        reviews={{
          kicker: 'Trekker reviews',
          title: 'Stories from Nepal',
          intro:
            'Notes from travellers who walked EBC, ABC and the Annapurna Circuit with Indian Treks.',
          items: internationalReviews,
        }}
        articles={{
          kicker: 'From the blog',
          title: 'Prepare for the Himalayas',
          items: internationalArticles,
        }}
      />

      <section id="find-my-trek" className="it-ig__section it-ig__discover it-ig__section--anchor">
        <div className="it-ig__container">
          <div className="it-ig__discover-panel">
            <div className="it-ig__discover-copy">
              <p className="it-ig__kicker it-ig__kicker--on-dark">Need a nudge?</p>
              <h2>Not Sure Which Trek?</h2>
              <p>
                Tell us your fitness and how many days you have — we&apos;ll help you choose between
                Everest, Annapurna Base Camp and the Circuit.
              </p>
            </div>

            <div className="it-ig__discover-options" role="group" aria-label="Trek preferences">
              {internationalDiscoveryOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={pickedDiscovery === opt.id ? 'is-active' : undefined}
                  onClick={() => {
                    setPickedDiscovery(opt.id);
                    scrollToId(opt.tripId);
                  }}
                >
                  <Globe className="h-4 w-4 shrink-0" aria-hidden />
                  {opt.label}
                </button>
              ))}
            </div>

            <a
              className="it-ig__btn it-ig__btn--primary it-ig__discover-cta"
              href={whatsappUrl(
                `Hi Indian Treks! I'm ${discoveryHint}. Please help me find the right international trek.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find My Trek
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
