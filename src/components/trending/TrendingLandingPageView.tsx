'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import {
  ArrowDown,
  ArrowRight,
  Calendar,
  Check,
  MapPin,
  Megaphone,
  MessageCircle,
  Sparkles,
  Star,
} from 'lucide-react';
import { DESK_HEADER_H, MOBILE_HEADER_H } from '@/lib/layout';
import { whatsappUrl } from '@/lib/contact';
import type { TrendingLandingConfig } from '@/lib/trending-landing-types';
import LandingReviewsBlog from '@/components/landing/LandingReviewsBlog';
import LandingTripCard from '@/components/landing/LandingTripCard';
import './trending-landing.css';

const DISCOVERY_ICONS = {
  star: Star,
  calendar: Calendar,
  megaphone: Megaphone,
  sparkles: Sparkles,
} as const;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function TrendingLandingPageView({
  config,
}: {
  config: TrendingLandingConfig;
}) {
  const [activeId, setActiveId] = useState<string>(config.stickyNav[0].id);
  const [pickedDiscovery, setPickedDiscovery] = useState<string | null>(null);
  const [stickyStuck, setStickyStuck] = useState(false);

  const DiscoveryIcon = DISCOVERY_ICONS[config.discoveryIcon];

  useEffect(() => {
    const items = config.stickyNav;
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
  }, [config.stickyNav]);

  useEffect(() => {
    const sentinel = document.getElementById(`${config.slug}-sticky-sentinel`);
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
  }, [config.slug]);

  const discoveryHint =
    config.discovery.options.find((o) => o.id === pickedDiscovery)?.whatsappHint ??
    'looking for help choosing the right trip';

  const stickyTopMobile = `calc(${MOBILE_HEADER_H}px + env(safe-area-inset-top, 0px))`;
  const pageVars = {
    '--tr-desk-top': `${DESK_HEADER_H}px`,
    '--tr-mob-top': stickyTopMobile,
  } as CSSProperties;

  return (
    <div className="it-tr" style={pageVars}>
      <section className="it-tr__hero">
        <div className="it-tr__hero-media">
          <Image
            src={config.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="it-tr__hero-overlay" />
        <div className="it-tr__hero-inner">
          <p className="it-tr__eyebrow">{config.heroEyebrow}</p>
          <h1>{config.heroTitle}</h1>
          <p className="it-tr__lead">{config.heroLead}</p>
          <div className="it-tr__hero-actions">
            <button
              type="button"
              className="it-tr__btn it-tr__btn--primary"
              onClick={() => scrollToId(config.heroPrimaryCta.targetId)}
            >
              {config.heroPrimaryCta.label}
              <ArrowDown className="h-4 w-4" aria-hidden />
            </button>
            <a
              className="it-tr__btn it-tr__btn--ghost"
              href={whatsappUrl(config.heroWhatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      <div
        id={`${config.slug}-sticky-sentinel`}
        className="it-tr__sticky-sentinel"
        aria-hidden
      />
      <nav
        className={`it-tr__sticky${stickyStuck ? ' is-stuck' : ''}`}
        aria-label={`${config.heroTitle} sections`}
      >
        <div className="it-tr__sticky-shell">
          <p className="it-tr__sticky-label">Jump to</p>
          <div className="it-tr__sticky-track" role="tablist">
            {config.stickyNav.map((item) => (
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

      <section
        id={config.exploreSection.id}
        className="it-tr__section it-tr__section--anchor"
      >
        <div className="it-tr__container">
          <div className="it-tr__heading">
            <p className="it-tr__kicker">{config.exploreSection.kicker}</p>
            <h2>{config.exploreSection.title}</h2>
            <p>{config.exploreSection.intro}</p>
          </div>

          <div className="it-tr__region-grid">
            {config.exploreSection.cards.map((card) => (
              <button
                key={card.id}
                type="button"
                className="it-tr__region-card"
                onClick={() => scrollToId(card.id)}
              >
                <img src={card.cover} alt="" referrerPolicy="no-referrer" />
                <div className="it-tr__region-fade" />
                <div className="it-tr__region-copy">
                  <span className="it-tr__region-count">
                    {card.tripCount} {card.tripCount === 1 ? 'trip' : 'trips'}
                  </span>
                  <strong>{card.title}</strong>
                  <span>{card.blurb}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="it-tr__section it-tr__section--wash">
        <div className="it-tr__container it-tr__why">
          <div className="it-tr__why-copy">
            <p className="it-tr__kicker">{config.whySection.kicker}</p>
            <h2>{config.whySection.title}</h2>
            <p className="it-tr__why-tagline">{config.whySection.tagline}</p>
            <p>{config.whySection.intro}</p>
          </div>
          <ul className="it-tr__why-list">
            {config.whySection.points.map((point) => (
              <li key={point}>
                <span className="it-tr__why-icon" aria-hidden>
                  <Check className="h-4 w-4" />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {config.tripSections.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          className={`it-tr__section it-tr__section--anchor${
            idx % 2 === 1 ? ' it-tr__section--soft' : ''
          }`}
        >
          <div className="it-tr__container">
            <div className="it-tr__heading it-tr__heading--row">
              <div>
                <p className="it-tr__kicker">
                  <MapPin className="inline h-3.5 w-3.5 -mt-0.5 mr-1" aria-hidden />
                  {section.kicker}
                </p>
                <h2>{section.title}</h2>
                <p>{section.intro}</p>
              </div>
            </div>

            <div
              className="landing-trip-row"
            >
              {section.trips.map((trip) => (
                <LandingTripCard
                  key={trip.id}
                  href={trip.href}
                  cover={trip.cover}
                  title={trip.title}
                  subtitle={trip.subtitle}
                  meta={trip.meta}
                  duration={trip.duration}
                  badge={trip.badge}
                  price={trip.price}
                  priceLabel={trip.priceLabel}
                  ctaLabel={trip.ctaLabel}
                  external={trip.external}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      <LandingReviewsBlog reviews={config.reviews} articles={config.articles} />

      <section
        id={config.discovery.id}
        className="it-tr__section it-tr__discover it-tr__section--anchor"
      >
        <div className="it-tr__container">
          <div className="it-tr__discover-panel">
            <div className="it-tr__discover-copy">
              <p className="it-tr__kicker it-tr__kicker--on-dark">Need a nudge?</p>
              <h2>{config.discovery.title}</h2>
              <p>{config.discovery.intro}</p>
            </div>

            <div className="it-tr__discover-options" role="group">
              {config.discovery.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={pickedDiscovery === opt.id ? 'is-active' : undefined}
                  onClick={() => {
                    setPickedDiscovery(opt.id);
                    scrollToId(opt.targetSectionId);
                  }}
                >
                  <DiscoveryIcon className="h-4 w-4 shrink-0" aria-hidden />
                  {opt.label}
                </button>
              ))}
            </div>

            <a
              className="it-tr__btn it-tr__btn--primary it-tr__discover-cta"
              href={whatsappUrl(`${config.discovery.whatsappPrefix} ${discoveryHint}.`)}
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
