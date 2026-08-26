'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  Check,
  MapPin,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { DESK_HEADER_H, MOBILE_HEADER_H } from '@/lib/layout';
import { photos } from '@/lib/media';
import { whatsappUrl } from '@/lib/contact';
import {
  sacredYatraDetailHref,
  sacredYatraDiscoveryOptions,
  sacredYatraGroups,
  sacredYatraStickyNav,
  sacredYatraWhyPoints,
  tripsForYatraGroup,
} from '@/lib/sacred-yatra-content';
import {
  sacredYatraArticles,
  sacredYatraReviews,
} from '@/lib/landing-social-content';
import LandingReviewsBlog from '@/components/landing/LandingReviewsBlog';
import LandingTripCard from '@/components/landing/LandingTripCard';
import './sacred-yatra.css';

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function SacredYatraPageView() {
  const [activeId, setActiveId] = useState<string>('explore-yatra');
  const [pickedDiscovery, setPickedDiscovery] = useState<string | null>(null);
  const [stickyStuck, setStickyStuck] = useState(false);

  useEffect(() => {
    const items = sacredYatraStickyNav;
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
    const sentinel = document.getElementById('sy-sticky-sentinel');
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
    sacredYatraDiscoveryOptions.find((o) => o.id === pickedDiscovery)?.whatsappHint ??
    'looking for help choosing a sacred yatra';

  const stickyTopMobile = `calc(${MOBILE_HEADER_H}px + env(safe-area-inset-top, 0px))`;
  const pageVars = {
    '--bp-desk-top': `${DESK_HEADER_H}px`,
    '--bp-mob-top': stickyTopMobile,
  } as CSSProperties;

  return (
    <div className="it-sy" style={pageVars}>
      <section className="it-sy__hero">
        <div className="it-sy__hero-media">
          <Image
            src={photos.yatra}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="it-sy__hero-overlay" />
        <div className="it-sy__hero-inner">
          <p className="it-sy__eyebrow">Spiritual Trips · Himalayan shrines</p>
          <h1>Sacred Yatras</h1>
          <p className="it-sy__lead">
            Walk the ancient pilgrimage paths of Uttarakhand — Char Dham, Do Dham, Kedarnath,
            Chopta–Tungnath circuits and Panch Kedar — with guided logistics and devotion-first
            pacing.
          </p>
          <div className="it-sy__hero-actions">
            <button
              type="button"
              className="it-sy__btn it-sy__btn--primary"
              onClick={() => scrollToId('explore-yatra')}
            >
              Explore Yatras
              <ArrowDown className="h-4 w-4" aria-hidden />
            </button>
            <a
              className="it-sy__btn it-sy__btn--ghost"
              href={whatsappUrl('Hi Indian Treks! I want to know more about sacred yatras.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      <div id="sy-sticky-sentinel" className="it-sy__sticky-sentinel" aria-hidden />
      <nav
        className={`it-sy__sticky${stickyStuck ? ' is-stuck' : ''}`}
        aria-label="Sacred yatra sections"
      >
        <div className="it-sy__sticky-shell">
          <p className="it-sy__sticky-label">Jump to</p>
          <div className="it-sy__sticky-track" role="tablist" aria-label="Yatra groups">
            {sacredYatraStickyNav.map((item) => (
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

      <section id="explore-yatra" className="it-sy__section it-sy__section--anchor">
        <div className="it-sy__container">
          <div className="it-sy__heading">
            <p className="it-sy__kicker">Spiritual Trips</p>
            <h2>Explore Sacred Journeys</h2>
            <p>
              Choose the pilgrimage that matches your time, fitness and devotion — from a focused
              Kedarnath darshan to the complete Char Dham and Panch Kedar circuits.
            </p>
          </div>

          <div className="it-sy__region-grid it-sy__region-grid--3">
            {sacredYatraGroups.map((group) => (
              <button
                key={group.id}
                type="button"
                className="it-sy__region-card"
                onClick={() => scrollToId(group.id)}
              >
                <img src={group.cover} alt="" referrerPolicy="no-referrer" />
                <div className="it-sy__region-fade" />
                <div className="it-sy__region-copy">
                  <span className="it-sy__region-count">
                    {tripsForYatraGroup(group.id).length}{' '}
                    {tripsForYatraGroup(group.id).length === 1 ? 'yatra' : 'yatras'}
                  </span>
                  <strong>{group.cardTitle}</strong>
                  <span>{group.cardBlurb}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="it-sy__section it-sy__section--wash">
        <div className="it-sy__container it-sy__why">
          <div className="it-sy__why-copy">
            <p className="it-sy__kicker">Our approach</p>
            <h2>Why Yatra With Us?</h2>
            <p className="it-sy__why-tagline">Pilgrimage, planned with care.</p>
            <p>
              Temple timings, mountain roads and trek days are handled so you can focus on darshan —
              with experienced leaders and group support throughout.
            </p>
          </div>
          <ul className="it-sy__why-list">
            {sacredYatraWhyPoints.map((point) => (
              <li key={point}>
                <span className="it-sy__why-icon" aria-hidden>
                  <Check className="h-4 w-4" />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {sacredYatraGroups.map((group, idx) => {
        const trips = tripsForYatraGroup(group.id);
        return (
          <section
            key={group.id}
            id={group.id}
            className={`it-sy__section it-sy__section--anchor${
              idx % 2 === 1 ? ' it-sy__section--soft' : ''
            }`}
          >
            <div className="it-sy__container">
              <div className="it-sy__heading">
                <div>
                  <p className="it-sy__kicker">
                    <MapPin className="inline h-3.5 w-3.5 -mt-0.5 mr-1" aria-hidden />
                    {group.name}
                  </p>
                  <h2>{group.sectionTitle}</h2>
                  <p>{group.sectionIntro}</p>
                </div>
              </div>

              <div className="landing-trip-row">
                {trips.map((trip) => (
                  <LandingTripCard
                    key={trip.id}
                    href={sacredYatraDetailHref(trip)}
                    cover={trip.cover}
                    title={trip.title}
                    subtitle={trip.subtitle}
                    meta={[trip.pickup, trip.duration, trip.season].filter(Boolean).join(' · ')}
                    duration={trip.duration}
                    badge={trip.badge}
                    price={trip.price}
                    ctaLabel="View Yatra"
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <LandingReviewsBlog
        reviews={{
          kicker: 'Pilgrim reviews',
          title: 'Blessings from the trail',
          intro:
            'Stories from families and travellers who completed Kedarnath, Char Dham, Chopta circuits and Panch Kedar with us.',
          items: sacredYatraReviews,
        }}
        articles={{
          kicker: 'From the blog',
          title: 'Read before you go',
          items: sacredYatraArticles,
        }}
      />

      <section id="find-my-yatra" className="it-sy__section it-sy__discover it-sy__section--anchor">
        <div className="it-sy__container">
          <div className="it-sy__discover-panel">
            <div className="it-sy__discover-copy">
              <p className="it-sy__kicker it-sy__kicker--on-dark">Need a nudge?</p>
              <h2>Not Sure Which Yatra?</h2>
              <p>
                Tell us how many days you have and what you want to experience — we&apos;ll help you
                pick the right spiritual trip.
              </p>
            </div>

            <div className="it-sy__discover-options" role="group" aria-label="Yatra preferences">
              {sacredYatraDiscoveryOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={pickedDiscovery === opt.id ? 'is-active' : undefined}
                  onClick={() => {
                    setPickedDiscovery(opt.id);
                    scrollToId(opt.targetGroupId);
                  }}
                >
                  <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
                  {opt.label}
                </button>
              ))}
            </div>

            <a
              className="it-sy__btn it-sy__btn--primary it-sy__discover-cta"
              href={whatsappUrl(
                `Hi Indian Treks! I'm ${discoveryHint}. Please help me find the right sacred yatra.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find My Yatra
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
