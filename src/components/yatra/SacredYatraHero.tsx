'use client';

import Image from 'next/image';
import {
  ArrowRight,
  Flower2,
  Landmark,
  Map,
  MessageCircle,
  Mountain,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { photos } from '@/lib/media';
import { whatsappUrl } from '@/lib/contact';
import { sacredYatraHero } from '@/lib/sacred-yatra-content';

type Props = {
  onExplore: () => void;
};

const statIcons = [Users, Sparkles, Map, ShieldCheck] as const;
const featureIcons = [Landmark, Map, Sparkles, ShieldCheck] as const;
const highlightIcons = [Mountain, OmIcon, Flower2] as const;

function OmIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 4c-2.5 0-4 1.8-4 4.2 0 2.2 1.4 3.8 4 3.8s4-1.6 4-3.8C16 5.8 14.5 4 12 4Z" />
      <path d="M12 12v8" />
      <path d="M8.5 20h7" />
      <path d="M9 16c1.2-.8 2.5-1.2 3-1.2s1.8.4 3 1.2" />
    </svg>
  );
}

function TrishulIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v18" />
      <path d="M8 7h8" />
      <path d="M6.5 7V4.5" />
      <path d="M12 7V4.5" />
      <path d="M17.5 7V4.5" />
      <path d="M9.5 21h5" />
    </svg>
  );
}

export default function SacredYatraHero({ onExplore }: Props) {
  const hero = sacredYatraHero;

  return (
    <section className="it-sy__hero it-sy__hero--premium">
      <div className="it-sy__hero-media">
        <Image
          src={photos.kedarnath}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="it-sy__hero-overlay" />
      <div className="it-sy__hero-glow" aria-hidden />

      <div className="it-sy__hero-shell">
        <div className="it-sy__hero-top">
          <div className="it-sy__hero-copy">
            <div className="it-sy__hero-badges">
              <p className="it-sy__hero-badge">
                <Landmark className="it-sy__hero-badge-icon" aria-hidden />
                {hero.badgeMain}
              </p>
              <span className="it-sy__hero-badge-pill">{hero.badgePill}</span>
            </div>

            <h1 className="it-sy__hero-title">
              <span className="it-sy__hero-title-main">{hero.titleMain}</span>
              <span className="it-sy__hero-title-accent">
                {hero.titleAccent}
                <TrishulIcon className="it-sy__hero-trishul" />
              </span>
            </h1>

            <ul className="it-sy__hero-highlights" aria-label="Yatra highlights">
              {hero.highlights.map((item, index) => {
                const Icon = highlightIcons[index] ?? Mountain;
                return (
                  <li key={item.label}>
                    <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {item.label}
                  </li>
                );
              })}
            </ul>

            <p className="it-sy__lead">
              Walk the ancient pilgrimage paths of Uttarakhand — Char Dham, Do Dham, Kedarnath,
              Chopta–Tungnath circuits and Panch Kedar — with guided logistics and devotion-first
              pacing.
            </p>

            <div className="it-sy__hero-actions it-sy__hero-actions--premium">
              <button
                type="button"
                className="it-sy__btn it-sy__btn--primary it-sy__btn--premium-primary"
                onClick={onExplore}
              >
                <span>Explore Yatras</span>
                <span className="it-sy__btn-icon-circle" aria-hidden>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
              <a
                className="it-sy__btn it-sy__btn--ghost it-sy__btn--premium-ghost"
                href={whatsappUrl('Hi Indian Treks! I want to know more about sacred yatras.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
                <span className="it-sy__btn-ghost-copy">
                  <strong>WhatsApp us</strong>
                  <span>{hero.whatsappSub}</span>
                </span>
              </a>
            </div>
          </div>

          <aside className="it-sy__hero-stats-panel" aria-label="Why pilgrims trust Indian Treks">
            {hero.stats.map((stat, index) => {
              const Icon = statIcons[index] ?? Users;
              return (
                <div key={stat.value} className="it-sy__hero-stats-panel-row">
                  <span className="it-sy__hero-stats-panel-icon">
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

        <div className="it-sy__hero-features">
          {hero.features.map((feature, index) => {
            const Icon = featureIcons[index] ?? Landmark;
            return (
              <div key={feature.title} className="it-sy__hero-feature">
                <span className="it-sy__hero-feature-icon">
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

export { TrishulIcon, OmIcon };
