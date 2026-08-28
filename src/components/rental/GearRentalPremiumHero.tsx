import Image from 'next/image';
import {
  Award,
  ClipboardList,
  MapPin,
  Mountain,
  Package,
  RotateCw,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { GEAR_HERO_IMAGE, GEAR_PAGE_HERO } from '@/lib/gear-rental';

const roadmapIcons = [Package, ClipboardList, MapPin, RotateCw] as const;
const trustIcons = [Package, ShieldCheck, Award] as const;

export default function GearRentalPremiumHero() {
  const hero = GEAR_PAGE_HERO;

  return (
    <header className="it-prep__hero it-prep__hero--premium it-prep__hero--fitness it-prep__hero--rental">
      <div className="it-prep__hero-media" aria-hidden>
        <Image src={GEAR_HERO_IMAGE} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="it-prep__hero-shade" />
      <div className="it-prep__hero-glow" aria-hidden />

      <div className="it-prep__hero-shell">
        <div className="it-prep__hero-top it-prep__hero-top--fitness">
          <div className="it-prep__hero-copy">
            <div className="it-prep__hero-brand-row">
              <span className="it-prep__hero-brand-icon">
                <Mountain className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="it-prep__brand">{hero.brandLabel}</p>
                <p className="it-prep__eyebrow it-prep__eyebrow--premium">
                  <Package className="h-3.5 w-3.5" aria-hidden />
                  {hero.eyebrow}
                </p>
              </div>
            </div>

            <h1 className="it-prep__title it-prep__title--premium">
              <span className="it-prep__title-main">{hero.titleMain}</span>
              <span className="it-prep__title-accent it-prep__title-accent--script">
                {hero.titleAccent}
                <Sparkles className="it-prep__title-spark" aria-hidden />
              </span>
            </h1>

            <p className="it-prep__lead it-prep__lead--premium">{hero.lead}</p>

            <div className="it-prep__meta it-prep__meta--premium">
              <span className="it-prep__meta-chip">
                <ClipboardList className="h-3.5 w-3.5" aria-hidden />
                {hero.readTime}
              </span>
              <span className="it-prep__meta-chip">
                <Package className="h-3.5 w-3.5" aria-hidden />
                {hero.guidanceBadge}
              </span>
            </div>
          </div>

          <aside className="it-prep__hero-quote" aria-label="Rental quote">
            <span className="it-prep__hero-quote-mark" aria-hidden>
              &ldquo;
            </span>
            <p>{hero.quote.text}</p>
            <span className="it-prep__hero-quote-attr">{hero.quote.attribution}</span>
          </aside>
        </div>

        <div className="it-prep__hero-roadmap-wrap">
          {hero.roadmapTitle ? (
            <p className="it-prep__hero-roadmap-title">{hero.roadmapTitle}</p>
          ) : null}

          <div className="it-prep__hero-roadmap" aria-label={hero.roadmapTitle ?? 'Rental roadmap'}>
            {hero.roadmap.map((item, index) => {
              const Icon = roadmapIcons[index] ?? Package;
              return (
                <a
                  key={item.step}
                  href={`#${item.targetId}`}
                  className="it-prep__hero-roadmap-step"
                >
                  <span className="it-prep__hero-roadmap-icon">
                    <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden />
                    <span className="it-prep__hero-roadmap-num">{item.step}</span>
                  </span>
                  <strong>{item.title}</strong>
                  <span>{item.sub}</span>
                </a>
              );
            })}
          </div>

          <div className="it-prep__hero-cta-bar it-prep__hero-cta-bar--fitness">
            <div className="it-prep__hero-cta-ridge" aria-hidden />
            <div className="it-prep__hero-cta-main">
              <div className="it-prep__hero-cta-copy">
                <span className="it-prep__hero-cta-icon">
                  <Zap className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  {hero.ctaKicker ? (
                    <strong className="it-prep__hero-cta-kicker">{hero.ctaKicker}</strong>
                  ) : null}
                  <p>{hero.ctaLead}</p>
                </div>
              </div>
              {hero.ctaLabel && hero.ctaTargetId ? (
                <a className="it-prep__hero-cta-btn" href={`#${hero.ctaTargetId}`}>
                  {hero.ctaLabel}
                  <span aria-hidden>&rsaquo;</span>
                </a>
              ) : null}
            </div>
            {hero.trustPills ? (
              <div className="it-prep__hero-trust-pills">
                {hero.trustPills.map((pill, index) => {
                  const Icon = trustIcons[index] ?? ShieldCheck;
                  return (
                    <div key={pill.title} className="it-prep__hero-trust-pill">
                      <span className="it-prep__hero-trust-pill-icon">
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <div>
                        <strong>{pill.title}</strong>
                        <span>{pill.sub}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
