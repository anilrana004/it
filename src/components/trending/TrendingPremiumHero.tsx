'use client';

import Image from 'next/image';
import {
  ArrowRight,
  Calendar,
  Layers,
  Megaphone,
  MessageCircle,
  Mountain,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  Users,
  Zap,
} from 'lucide-react';
import { whatsappUrl } from '@/lib/contact';
import type { TrendingLandingConfig } from '@/lib/trending-landing-types';

type Props = {
  config: TrendingLandingConfig;
  onExplore: () => void;
};

const statIcons = [Users, Star, Mountain, ShieldCheck] as const;
const featureIcons = [Layers, ThumbsUp, Zap, Mountain] as const;
const badgeIcons = {
  users: Users,
  calendar: Calendar,
  megaphone: Megaphone,
  sparkles: Sparkles,
} as const;

export default function TrendingPremiumHero({ config, onExplore }: Props) {
  const premium = config.premiumHero;
  if (!premium) return null;

  const BadgeIcon = badgeIcons[premium.badgeIcon ?? 'users'];

  return (
    <section className="it-tr__hero it-tr__hero--premium">
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
      <div className="it-tr__hero-glow" aria-hidden />

      <div className="it-tr__hero-shell">
        <div className="it-tr__hero-top">
          <div className="it-tr__hero-copy">
            <p className="it-tr__hero-badge">
              <BadgeIcon className="h-3.5 w-3.5" aria-hidden />
              {config.heroEyebrow}
            </p>

            <h1 className="it-tr__hero-title">
              <span className="it-tr__hero-title-main">{premium.titleMain}</span>
              <span className="it-tr__hero-title-accent">
                {premium.titleAccent}
                <Sparkles className="it-tr__hero-spark" aria-hidden />
              </span>
            </h1>

            <p className="it-tr__lead">{config.heroLead}</p>

            <div className="it-tr__hero-actions it-tr__hero-actions--premium">
              <button
                type="button"
                className="it-tr__btn it-tr__btn--primary it-tr__btn--premium-primary"
                onClick={onExplore}
              >
                <span>{config.heroPrimaryCta.label}</span>
                <span className="it-tr__btn-icon-circle" aria-hidden>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
              <a
                className="it-tr__btn it-tr__btn--ghost it-tr__btn--premium-ghost"
                href={whatsappUrl(config.heroWhatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
                <span className="it-tr__btn-ghost-copy">
                  <strong>WhatsApp us</strong>
                  <span>{premium.whatsappSub}</span>
                </span>
              </a>
            </div>
          </div>

          <aside className="it-tr__hero-stats-panel" aria-label="Indian Treks at a glance">
            {premium.stats.map((stat, index) => {
              const Icon = statIcons[index] ?? Star;
              return (
                <div key={stat.label} className="it-tr__hero-stats-panel-row">
                  <span className="it-tr__hero-stats-panel-icon">
                    <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden />
                  </span>
                  <div>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </aside>
        </div>

        <div className="it-tr__hero-features">
          {premium.features.map((feature, index) => {
            const Icon = featureIcons[index] ?? Layers;
            return (
              <div key={feature.title} className="it-tr__hero-feature">
                <span className="it-tr__hero-feature-icon">
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
