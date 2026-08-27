'use client';

import Image from 'next/image';
import {
  ArrowRight,
  Building2,
  Calendar,
  Headphones,
  Leaf,
  MapPin,
  Mountain,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { whatsappUrl } from '@/lib/contact';
import type { LpPremiumHero } from '@/lib/corporate/learning-program-types';

type Props = {
  image: string;
  hero: LpPremiumHero;
  primaryCta: string;
  primaryWhatsapp: string;
  primaryHref?: string;
  onPlayVideo?: () => void;
  secondaryCta?: string;
  secondaryHref?: string;
  panelLabel?: string;
};

const panelIcons = [Users, Mountain, ShieldCheck, Sparkles] as const;
const statIcons = [Building2, Star, Mountain, Headphones] as const;
const featureIcons = [Calendar, Users, ShieldCheck, Leaf] as const;

export default function CorporatePremiumHero({
  image,
  hero,
  primaryCta,
  primaryWhatsapp,
  primaryHref,
  onPlayVideo,
  secondaryCta,
  secondaryHref,
  panelLabel = 'Program benefits',
}: Props) {
  const showPlay = Boolean(onPlayVideo && secondaryCta?.toLowerCase().includes('video'));

  return (
    <section className="it-corp__hero it-corp__hero--premium">
      <div className="it-corp__hero-media" aria-hidden>
        <Image src={image} alt="" fill priority sizes="100vw" />
      </div>
      <div className="it-corp__hero-shade" />
      <div className="it-corp__hero-glow" aria-hidden />

      <div className="it-corp__hero-path" aria-hidden>
        <svg viewBox="0 0 420 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M24 228 C110 190, 170 150, 230 118 S340 72, 392 38"
            stroke="rgba(255,255,255,0.42)"
            strokeWidth="2"
            strokeDasharray="6 8"
            strokeLinecap="round"
          />
        </svg>
        <span className="it-corp__hero-path-pin">
          <MapPin className="h-4 w-4" />
        </span>
        <p className="it-corp__hero-path-tagline">{hero.tagline}</p>
      </div>

      <div className="it-corp__hero-shell">
        <div className="it-corp__hero-top">
          <div className="it-corp__hero-copy">
            <p className="it-corp__hero-badge">
              <Mountain className="h-3.5 w-3.5" aria-hidden />
              {hero.badge}
            </p>

            <h1 className="it-corp__hero-title">
              <span className="it-corp__hero-title-main">{hero.titleMain}</span>
              <span className="it-corp__hero-title-script">{hero.titleAccent}</span>
            </h1>

            <p className="it-corp__hero-lead it-corp__hero-lead--premium">{hero.lead}</p>

            <div className="it-corp__hero-actions it-corp__hero-actions--premium">
              {primaryHref ? (
                <a
                  className="it-corp__btn it-corp__btn--primary it-corp__btn--premium-primary"
                  href={primaryHref}
                >
                  <span>{primaryCta}</span>
                  <span className="it-corp__btn-icon-circle" aria-hidden>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              ) : (
                <a
                  className="it-corp__btn it-corp__btn--primary it-corp__btn--premium-primary"
                  href={whatsappUrl(primaryWhatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{primaryCta}</span>
                  <span className="it-corp__btn-icon-circle" aria-hidden>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              )}
              {showPlay ? (
                <button
                  type="button"
                  className="it-corp__btn it-corp__btn--ghost it-corp__btn--premium-ghost"
                  onClick={onPlayVideo}
                >
                  <Play className="h-4 w-4 shrink-0 fill-current" aria-hidden />
                  {secondaryCta}
                </button>
              ) : secondaryHref && secondaryCta ? (
                <a
                  className="it-corp__btn it-corp__btn--ghost it-corp__btn--premium-ghost"
                  href={secondaryHref}
                >
                  {secondaryCta}
                </a>
              ) : null}
            </div>

            <div className="it-corp__hero-trust">
              <div className="it-corp__hero-avatars" aria-hidden>
                {hero.avatars.map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    loading="eager"
                    decoding="async"
                    style={{ zIndex: 4 - index }}
                  />
                ))}
              </div>
              <p>{hero.trustLine}</p>
            </div>
          </div>

          <aside className="it-corp__hero-panel" aria-label={panelLabel}>
            {hero.panel.map((item, index) => {
              const Icon = panelIcons[index] ?? Users;
              return (
                <div key={item.title} className="it-corp__hero-panel-row">
                  <span className="it-corp__hero-panel-icon">
                    <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.sub}</span>
                  </div>
                </div>
              );
            })}
          </aside>
        </div>

        <div className="it-corp__hero-stats">
          {hero.stats.map((stat, index) => {
            const Icon = statIcons[index] ?? Building2;
            return (
              <div key={stat.value} className="it-corp__hero-stat">
                <span className="it-corp__hero-stat-icon">
                  <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden />
                </span>
                <div>
                  <strong>{stat.value}</strong>
                  <span>{stat.sub}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="it-corp__hero-features it-corp__hero-features--light">
          {hero.features.map((feature, index) => {
            const Icon = featureIcons[index] ?? Calendar;
            return (
              <div key={feature.title} className="it-corp__hero-feature">
                <span className="it-corp__hero-feature-icon">
                  <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden />
                </span>
                <div>
                  <strong>{feature.title}</strong>
                  <span>{feature.sub}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
