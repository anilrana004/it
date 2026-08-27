'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Calendar,
  Gift,
  Headphones,
  MessageCircle,
  Mountain,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { whatsappUrl } from '@/lib/contact';
import type { TrendingLandingConfig } from '@/lib/trending-landing-types';

type Props = {
  config: TrendingLandingConfig;
  onExplore: () => void;
};

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const featureIcons = [Tag, ShieldCheck, Calendar, Headphones] as const;

function getCountdown(endIso: string): CountdownParts {
  const diff = Math.max(0, new Date(endIso).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function SalePremiumHero({ config, onExplore }: Props) {
  const sale = config.saleHero;
  const [countdown, setCountdown] = useState<CountdownParts>(() =>
    sale ? getCountdown(sale.countdownEnd) : { days: 0, hours: 0, minutes: 0, seconds: 0 },
  );

  useEffect(() => {
    if (!sale) return;
    const tick = () => setCountdown(getCountdown(sale.countdownEnd));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [sale]);

  const countdownItems = useMemo(
    () => [
      { value: pad(countdown.days), label: 'Days' },
      { value: pad(countdown.hours), label: 'Hrs' },
      { value: pad(countdown.minutes), label: 'Mins' },
      { value: pad(countdown.seconds), label: 'Secs' },
    ],
    [countdown],
  );

  if (!sale) return null;

  return (
    <section className="it-tr__hero it-tr__hero--sale">
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
            <p className="it-tr__hero-badge it-tr__hero-badge--sale">
              <Tag className="h-3.5 w-3.5" aria-hidden />
              {config.heroEyebrow}
            </p>

            <h1 className="it-tr__hero-title it-tr__hero-title--sale">
              <span className="it-tr__hero-title-main">{sale.titleMain}</span>
              <span className="it-tr__hero-title-script">{sale.titleAccent}</span>
            </h1>

            <p className="it-tr__lead">{config.heroLead}</p>

            <div className="it-tr__hero-actions it-tr__hero-actions--sale">
              <button
                type="button"
                className="it-tr__btn it-tr__btn--primary it-tr__btn--sale-primary"
                onClick={onExplore}
              >
                <Gift className="h-4 w-4 shrink-0" aria-hidden />
                <span>{config.heroPrimaryCta.label}</span>
                <span className="it-tr__btn-icon-circle" aria-hidden>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
              <a
                className="it-tr__btn it-tr__btn--ghost it-tr__btn--sale-ghost"
                href={whatsappUrl(config.heroWhatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                WhatsApp us
              </a>
            </div>
          </div>

          <aside className="it-tr__hero-countdown" aria-live="polite">
            <span className="it-tr__hero-countdown-icon">
              <Mountain className="h-5 w-5" aria-hidden />
            </span>
            <p className="it-tr__hero-countdown-kicker">Don&apos;t Miss Out!</p>
            <p className="it-tr__hero-countdown-lead">
              Best adventures. Unbeatable prices. For a limited time only.
            </p>
            <div className="it-tr__hero-countdown-grid">
              {countdownItems.map((item) => (
                <div key={item.label} className="it-tr__hero-countdown-cell">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="it-tr__hero-features it-tr__hero-features--sale">
          {sale.features.map((feature, index) => {
            const Icon = featureIcons[index] ?? Tag;
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
