import Image from 'next/image';
import {
  ArrowRight,
  Backpack,
  Bike,
  Calendar,
  Clock,
  Map,
  MessageCircle,
  Mountain,
  Route,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react';
import { whatsappUrl } from '@/lib/contact';
import type { GroupJourneyPremiumHeroConfig } from '@/lib/group-journey-hero-types';
import './group-journey-hero.css';

type FeatureIcon = typeof Users | typeof Map | typeof Backpack | typeof ShieldCheck;

const defaultFeatureIcons = [Users, Map, Backpack, ShieldCheck] as const;

type Props = {
  image: string;
  hero: GroupJourneyPremiumHeroConfig;
  imagePosition?: string;
  featureIcons?: readonly FeatureIcon[];
  featuresAriaLabel?: string;
};

function BadgeIcon({ kind }: { kind?: GroupJourneyPremiumHeroConfig['badgeIcon'] }) {
  if (kind === 'bike') return <Bike className="h-3.5 w-3.5" aria-hidden />;
  if (kind === 'calendar') return <Calendar className="h-3.5 w-3.5" aria-hidden />;
  return <Mountain className="h-3.5 w-3.5" aria-hidden />;
}

export default function GroupJourneyPremiumHero({
  image,
  hero,
  imagePosition = 'center 35%',
  featureIcons = defaultFeatureIcons,
  featuresAriaLabel = 'Trip highlights',
}: Props) {
  return (
    <section className="it-gj__hero">
      <div className="it-gj__hero-media" aria-hidden>
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: imagePosition }}
        />
      </div>
      <div className="it-gj__hero-overlay" />
      <div className="it-gj__hero-glow" aria-hidden />

      <div className="it-gj__hero-shell">
        <div className="it-gj__hero-copy">
          <div className="it-gj__hero-badge-row">
            <span className="it-gj__hero-badge-pill">
              <BadgeIcon kind={hero.badgeIcon} />
              {hero.badgePrimary}
            </span>
            <span className="it-gj__hero-badge-text">
              {hero.badgeSecondary}
              <Star className="h-3 w-3" aria-hidden />
            </span>
          </div>

          <h1 className="it-gj__hero-title">
            <span className="it-gj__hero-title-line">{hero.titleLine1}</span>
            <span className="it-gj__hero-title-line it-gj__hero-title-line--accent">
              {hero.titleLine2}
              <span className="it-gj__hero-title-dashes" aria-hidden>
                <span />
                <span />
                <span />
              </span>
            </span>
          </h1>
          <span className="it-gj__hero-title-rule" aria-hidden />

          <p className="it-gj__hero-lead">
            {hero.leadBefore}
            <strong>{hero.leadHighlight}</strong>
            {hero.leadAfter}
          </p>

          <div className="it-gj__hero-actions">
            <a
              className="it-gj__btn it-gj__btn--primary"
              href={`#${hero.primaryCtaTargetId}`}
            >
              <span>{hero.primaryCtaLabel}</span>
              <span className="it-gj__btn-icon-circle" aria-hidden>
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
            <a
              className="it-gj__btn it-gj__btn--ghost"
              href={whatsappUrl(hero.whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
              WhatsApp us
            </a>
          </div>
        </div>

        <div className="it-gj__hero-features" aria-label={featuresAriaLabel}>
          {hero.features.map((feature, index) => {
            const Icon = featureIcons[index] ?? Mountain;
            return (
              <div key={feature.title} className="it-gj__hero-feature">
                <span className="it-gj__hero-feature-icon">
                  <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden />
                </span>
                <strong>{feature.title}</strong>
                <span>{feature.sub}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const bikingFeatureIcons = [Bike, Route, Mountain, ShieldCheck] as const;
export const weekendFeatureIcons = [Clock, Mountain, Users, ShieldCheck] as const;
