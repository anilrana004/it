import Image from 'next/image';
import {
  Award,
  Backpack,
  BookOpen,
  Brain,
  ClipboardList,
  Clock,
  Compass,
  Droplets,
  Dumbbell,
  Flag,
  Footprints,
  Frown,
  Heart,
  HeartPulse,
  Moon,
  Mountain,
  RotateCw,
  ShieldCheck,
  Sparkles,
  Wind,
  Zap,
} from 'lucide-react';
import type { PrepGuide } from '@/lib/prep-guides-content';

const defaultRoadmapIcons = [Mountain, Backpack, ClipboardList, Mountain, Mountain] as const;
const fitnessRoadmapIcons = [Mountain, Wind, Dumbbell, Backpack, Flag] as const;
const trustIcons = [Dumbbell, Award, ShieldCheck] as const;
const earlySignIcons = [Brain, Frown, Moon, RotateCw] as const;
const preventionIcons = [Droplets, Footprints, Backpack, Heart, Moon] as const;

type Props = {
  guide: PrepGuide;
};

function EyebrowIconFor({ kind }: { kind?: 'clipboard' | 'heart' | 'mountain' }) {
  if (kind === 'heart') return <HeartPulse className="h-3.5 w-3.5" aria-hidden />;
  if (kind === 'mountain') return <Mountain className="h-3.5 w-3.5" aria-hidden />;
  return <ClipboardList className="h-3.5 w-3.5" aria-hidden />;
}

export default function PrepPremiumHero({ guide }: Props) {
  const hero = guide.premiumHero;
  if (!hero) return null;

  const isFitness = hero.variant === 'fitness';
  const isAltitude = hero.variant === 'altitude';
  const roadmapIcons = isFitness ? fitnessRoadmapIcons : defaultRoadmapIcons;

  const titleAccentClass =
    hero.titleAccentStyle === 'script'
      ? 'it-prep__title-accent it-prep__title-accent--script'
      : hero.titleAccentStyle === 'inline'
        ? 'it-prep__title-accent it-prep__title-accent--inline'
        : 'it-prep__title-accent';

  const heroClass = [
    'it-prep__hero it-prep__hero--premium',
    isFitness ? 'it-prep__hero--fitness' : '',
    isAltitude ? 'it-prep__hero--altitude' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const topClass = [
    'it-prep__hero-top',
    isFitness ? 'it-prep__hero-top--fitness' : '',
    isAltitude ? 'it-prep__hero-top--altitude' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={heroClass}>
      <div className="it-prep__hero-media" aria-hidden>
        <Image src={guide.heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="it-prep__hero-shade" />
      <div className="it-prep__hero-glow" aria-hidden />
      {isAltitude ? <div className="it-prep__hero-contours" aria-hidden /> : null}

      <div className="it-prep__hero-shell">
        <div className={topClass}>
          <div className="it-prep__hero-copy">
            <div className="it-prep__hero-brand-row">
              <span className="it-prep__hero-brand-icon">
                <Mountain className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="it-prep__brand">{hero.brandLabel}</p>
                <p className="it-prep__eyebrow it-prep__eyebrow--premium">
                  <EyebrowIconFor kind={hero.eyebrowIcon} />
                  {hero.eyebrow}
                </p>
              </div>
            </div>

            <h1
              className={`it-prep__title it-prep__title--premium${
                hero.titleAccentStyle === 'inline' ? ' it-prep__title--inline-accent' : ''
              }`}
            >
              <span className="it-prep__title-main">{hero.titleMain}</span>
              <span className={titleAccentClass}>
                {hero.titleAccent}
                {hero.titleAccentStyle === 'script' ? (
                  <Sparkles className="it-prep__title-spark" aria-hidden />
                ) : null}
              </span>
              {hero.titleSuffix ? (
                <span className="it-prep__title-main">{hero.titleSuffix}</span>
              ) : null}
            </h1>

            {hero.titleAccentStyle === 'inline' ? (
              <span className="it-prep__title-rule" aria-hidden />
            ) : null}

            <p className="it-prep__lead it-prep__lead--premium">{guide.lead}</p>

            <div className="it-prep__meta it-prep__meta--premium">
              <span className="it-prep__meta-chip">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                {guide.readTime}
              </span>
              <span className="it-prep__meta-chip">
                <BookOpen className="h-3.5 w-3.5" aria-hidden />
                {hero.guidanceBadge}
              </span>
            </div>
          </div>

          {hero.earlySigns ? (
            <aside className="it-prep__hero-signs" aria-label={hero.earlySigns.title}>
              <p className="it-prep__hero-signs-title">{hero.earlySigns.title}</p>
              <ul className="it-prep__hero-signs-list">
                {hero.earlySigns.items.map((item, index) => {
                  const Icon = earlySignIcons[index] ?? Brain;
                  const href = item.targetId ? `#${item.targetId}` : undefined;
                  const Tag = href ? 'a' : 'div';
                  return (
                    <li key={item.title}>
                      <Tag
                        {...(href ? { href, className: 'it-prep__hero-signs-item' } : { className: 'it-prep__hero-signs-item' })}
                      >
                        <span className="it-prep__hero-signs-icon">
                          <Icon className="h-3.5 w-3.5" aria-hidden />
                        </span>
                        <div>
                          <strong>{item.title}</strong>
                          <span>{item.sub}</span>
                        </div>
                      </Tag>
                    </li>
                  );
                })}
              </ul>
              <p className="it-prep__hero-signs-warn">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                {hero.earlySigns.warning}
              </p>
            </aside>
          ) : null}

          {hero.quote ? (
            <aside className="it-prep__hero-quote" aria-label="Training quote">
              <span className="it-prep__hero-quote-mark" aria-hidden>
                &ldquo;
              </span>
              <p>{hero.quote.text}</p>
              <span className="it-prep__hero-quote-attr">{hero.quote.attribution}</span>
            </aside>
          ) : null}
        </div>

        {hero.handwritingNote ? (
          <p className="it-prep__hero-handwriting" aria-hidden>
            {hero.handwritingNote}
          </p>
        ) : null}

        {hero.preventionBar ? (
          <div className="it-prep__hero-prevention-wrap">
            <p className="it-prep__hero-prevention-title">{hero.preventionBar.title}</p>
            <div className="it-prep__hero-prevention" aria-label={hero.preventionBar.title}>
              {hero.preventionBar.items.map((item, index) => {
                const Icon = preventionIcons[index] ?? Mountain;
                return (
                  <a
                    key={item.title}
                    href={`#${item.targetId}`}
                    className="it-prep__hero-prevention-item"
                  >
                    <span className="it-prep__hero-prevention-icon">
                      <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden />
                    </span>
                    <strong>{item.title}</strong>
                    <span>{item.sub}</span>
                  </a>
                );
              })}
            </div>
          </div>
        ) : null}

        {hero.roadmap?.length ? (
          <div className="it-prep__hero-roadmap-wrap">
            {hero.roadmapTitle ? (
              <p className="it-prep__hero-roadmap-title">{hero.roadmapTitle}</p>
            ) : null}

            <div
              className="it-prep__hero-roadmap"
              aria-label={hero.roadmapTitle ?? 'Preparation roadmap'}
            >
              {hero.roadmap.map((item, index) => {
                const Icon = roadmapIcons[index] ?? Mountain;
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

            {hero.ctaLead || hero.ctaLabel ? (
              <div
                className={`it-prep__hero-cta-bar${
                  isFitness ? ' it-prep__hero-cta-bar--fitness' : ''
                }`}
              >
                {isFitness ? (
                  <>
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
                          {hero.ctaSubtitle ? (
                            <span className="it-prep__hero-cta-sub">{hero.ctaSubtitle}</span>
                          ) : null}
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
                  </>
                ) : (
                  <>
                    <div className="it-prep__hero-cta-copy">
                      <span className="it-prep__hero-cta-icon">
                        <Compass className="h-4 w-4" aria-hidden />
                      </span>
                      <p>{hero.ctaLead}</p>
                    </div>
                    {hero.ctaLabel && hero.ctaTargetId ? (
                      <a className="it-prep__hero-cta-btn" href={`#${hero.ctaTargetId}`}>
                        {hero.ctaLabel}
                        <span aria-hidden>&rsaquo;</span>
                      </a>
                    ) : null}
                  </>
                )}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
