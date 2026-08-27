'use client';

import Image from 'next/image';
import {
  Heart,
  Leaf,
  MapPin,
  MessageCircle,
  Mountain,
  Phone,
  ShieldCheck,
  Tent,
  Users,
} from 'lucide-react';
import { CONTACT, telUrl, whatsappUrl } from '@/lib/contact';
import type { SplPremiumHero } from '@/lib/special-programs/landing-types';

type Props = {
  image: string;
  hero: SplPremiumHero;
  whatsappMsg: string;
};

const panelIcons = [Tent, Users, Users, ShieldCheck] as const;
const featureIcons = [Mountain, ShieldCheck, Users, Leaf] as const;

export default function SpecialProgramPremiumHero({ image, hero, whatsappMsg }: Props) {
  return (
    <section className="it-spl__hero it-spl__hero--premium">
      <div className="it-spl__hero-media">
        <Image src={image} alt="" fill sizes="100vw" priority className="object-cover" />
      </div>
      <div className="it-spl__hero-overlay" />
      <div className="it-spl__hero-glow" aria-hidden />

      <div className="it-spl__hero-float" aria-hidden>
        <Heart className="it-spl__hero-float-heart h-3 w-3" />
        <p>{hero.pathTagline}</p>
      </div>

      <div className="it-spl__hero-path" aria-hidden>
        <svg viewBox="0 0 420 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M24 228 C110 190, 170 150, 230 118 S340 72, 392 38"
            stroke="rgba(134,239,172,0.55)"
            strokeWidth="2"
            strokeDasharray="6 8"
            strokeLinecap="round"
          />
        </svg>
        <span className="it-spl__hero-path-pin">
          <MapPin className="h-4 w-4" />
        </span>
      </div>

      <div className="it-spl__hero-shell">
        <div className="it-spl__hero-top">
          <div className="it-spl__hero-copy">
            <p className="it-spl__hero-badge">
              <Mountain className="h-3.5 w-3.5" aria-hidden />
              {hero.badge}
            </p>

            <h1 className="it-spl__hero-title">
              <span className="it-spl__hero-title-main">{hero.titleMain}</span>
              <span className="it-spl__hero-title-script">
                {hero.titleAccent}
                <Heart className="it-spl__hero-title-heart" aria-hidden />
              </span>
            </h1>

            <p className="it-spl__hero-tagline">
              {hero.tagline.before}
              <strong>{hero.tagline.highlight}</strong>
              {hero.tagline.after}
            </p>

            <p className="it-spl__lead it-spl__lead--premium">{hero.lead}</p>

            <div className="it-spl__hero-actions it-spl__hero-actions--premium">
              <a
                className="it-spl__btn it-spl__btn--primary it-spl__btn--wa"
                href={whatsappUrl(whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                WhatsApp us
              </a>
              <a className="it-spl__btn it-spl__btn--ghost it-spl__btn--call" href={telUrl()}>
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                {CONTACT.phoneDisplay}
              </a>
            </div>

            <div className="it-spl__hero-trust">
              <div className="it-spl__hero-avatars" aria-hidden>
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
              <p>
                {hero.trustLine}
                <Heart className="it-spl__hero-trust-heart" aria-hidden />
              </p>
            </div>
          </div>

          <aside className="it-spl__hero-panel">
            <p className="it-spl__hero-panel-kicker">{hero.panelKicker}</p>
            {hero.panel.map((item, index) => {
              const Icon = panelIcons[index] ?? ShieldCheck;
              return (
                <div key={item.title} className="it-spl__hero-panel-row">
                  <span className="it-spl__hero-panel-icon">
                    <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.sub}</span>
                  </div>
                </div>
              );
            })}
            <div className="it-spl__hero-panel-promise">
              <Heart className="h-4 w-4 shrink-0" aria-hidden />
              <span>{hero.panelPromise}</span>
            </div>
          </aside>
        </div>

        <div className="it-spl__hero-features it-spl__hero-features--light">
          {hero.features.map((feature, index) => {
            const Icon = featureIcons[index] ?? Mountain;
            return (
              <div key={feature.title} className="it-spl__hero-feature">
                <span className="it-spl__hero-feature-icon">
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
