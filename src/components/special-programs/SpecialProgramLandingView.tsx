'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarDays,
  Mountain,
  Route,
  Sparkles,
  TimerReset,
  Users,
} from 'lucide-react';
import StoryReviewsSection from '@/components/reviews/StoryReviewsSection';
import { CONTACT, telUrl, whatsappUrl } from '@/lib/contact';
import {
  getSpecialProgram,
  treksForProgram,
} from '@/lib/special-programs-content';
import type { SplLandingContent } from '@/lib/special-programs/landing-types';
import { toListingTrek } from '@/lib/treks-listing';
import TrekInfoCard from '@/components/treks/TrekInfoCard';
import WhyChooseVideo from '@/components/WhyChooseVideo';
import SpecialProgramPremiumHero from '@/components/special-programs/SpecialProgramPremiumHero';
import './special-program-landing.css';

export type { SplLandingContent } from '@/lib/special-programs/landing-types';

const categories = [
  { label: 'Treks by Month', href: '/treks', icon: CalendarDays },
  { label: 'Treks by Difficulty', href: '/treks', icon: Mountain },
  { label: 'Treks by Experience', href: '/treks', icon: Sparkles },
  { label: 'Treks by Season', href: '/treks', icon: Route },
  { label: 'Treks by Duration', href: '/treks', icon: TimerReset },
  { label: 'Treks by Region', href: '/treks', icon: Users },
];

export default function SpecialProgramLandingView({ content }: { content: SplLandingContent }) {
  const program = getSpecialProgram(content.programId)!;
  const matched = treksForProgram(program);
  const shown = content.programId === 'beginner' ? matched : matched.slice(0, 6);
  const list = shown.map(toListingTrek);

  return (
    <div className="it-spl">
      {content.premiumHero ? (
        <SpecialProgramPremiumHero
          image={program.heroImage}
          hero={content.premiumHero}
          whatsappMsg={content.hero.whatsappMsg}
        />
      ) : (
        <section className="it-spl__hero">
          <div className="it-spl__hero-media">
            <Image src={program.heroImage} alt={program.title} fill sizes="100vw" priority />
          </div>
          <div className="it-spl__hero-overlay" />

          <div className="it-spl__hero-inner">
            <div className="it-spl__hero-copy">
              <p className="it-spl__eyebrow">Special programmes</p>
              <h1>
                {content.hero.titleBefore} <em>{content.hero.titleEm}</em>
                {content.hero.titleAfter ? ` ${content.hero.titleAfter}` : null}
              </h1>
              <p className="it-spl__tagline">{content.hero.tagline}</p>
              <p className="it-spl__lead">{content.hero.lead}</p>
              <div className="it-spl__hero-actions">
                <a
                  className="it-spl__btn it-spl__btn--primary"
                  href={whatsappUrl(content.hero.whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp us
                </a>
                <a className="it-spl__btn it-spl__btn--ghost" href={telUrl()}>
                  Call {CONTACT.phoneDisplay}
                </a>
              </div>
            </div>

            <aside className="it-spl__hero-card">
              <p className="it-spl__hero-card-kicker">{content.hero.asideKicker}</p>
              <h2>{content.hero.asideTitle}</h2>
              <p>{content.hero.asideBody}</p>
              <ul>
                {content.hero.asideBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      )}

      <section className="it-spl__section">
        <div className="it-spl__container it-spl__story">
          <div className="it-spl__story-copy">
            <p className="it-spl__section-kicker">{content.story.kicker}</p>
            <h2>{content.story.title}</h2>
            {content.story.paragraphs.map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
          </div>
          <div className="it-spl__story-media">
            <WhyChooseVideo className="it-whyvid--flush" />
          </div>
        </div>
      </section>

      <StoryReviewsSection
        kicker={content.reviews.kicker}
        title={content.reviews.title}
        intro={content.reviews.intro}
        items={content.reviews.items.map((review) => ({
          id: review.id,
          name: review.name,
          subtitle: review.batch,
          short: review.short,
          full: review.full,
          avatar: review.avatar,
          trekLink: review.trekLink,
        }))}
        allReviewsHref="/reviews"
      />

      <section className="it-spl__section">
        <div className="it-spl__container it-spl__split">
          <div>
            <p className="it-spl__section-kicker">{content.eligibility.kicker}</p>
            <h2>{content.eligibility.title}</h2>
            <p className="it-spl__intro">{content.eligibility.intro}</p>
          </div>
          <div className="it-spl__panel">
            <ul className="it-spl__eligibility">
              {content.eligibility.items.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong>
                  <span>{item.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="it-spl__promo-wrap">
        <div className="it-spl__container">
          <div className="it-spl__promo">
            <span>{content.promo.text}</span>
            <Link href={content.promo.href}>{content.promo.cta}</Link>
          </div>
        </div>
      </div>

      <section className="it-spl__section it-spl__section--soft">
        <div className="it-spl__container">
          <div className="it-spl__heading">
            <p className="it-spl__section-kicker">{content.treks.kicker}</p>
            <h2>{content.treks.title}</h2>
            <p>{content.treks.intro}</p>
          </div>
          {content.treks.note ? <div className="it-spl__note">{content.treks.note}</div> : null}
          <div className="it-spl__grid">
            {list.map((trek) => (
              <TrekInfoCard key={trek.id} trek={trek} fill />
            ))}
          </div>
        </div>
      </section>

      <section className="it-spl__section">
        <div className="it-spl__container">
          <div className="it-spl__heading it-spl__heading--narrow">
            <p className="it-spl__section-kicker">{content.differences.kicker}</p>
            <h2>{content.differences.title}</h2>
            <p>{content.differences.intro}</p>
          </div>
          <div className="it-spl__features">
            {content.differences.items.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="it-spl__feature">
                  <div className="it-spl__feature-icon">
                    <Icon size={20} strokeWidth={2.1} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="it-spl__section it-spl__section--wash">
        <div className="it-spl__container">
          <div className="it-spl__heading it-spl__heading--narrow">
            <p className="it-spl__section-kicker">{content.safety.kicker}</p>
            <h2>{content.safety.title}</h2>
            <p>{content.safety.intro}</p>
          </div>
          <div className="it-spl__pillars">
            {content.safety.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="it-spl__pillar">
                  <div className="it-spl__pillar-head">
                    <span className="it-spl__pillar-num" aria-hidden>
                      {index + 1}
                    </span>
                    <span className="it-spl__pillar-icon">
                      <Icon size={18} strokeWidth={2.15} />
                    </span>
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="it-spl__section">
        <div className="it-spl__container">
          <div className="it-spl__heading it-spl__heading--center">
            <p className="it-spl__section-kicker">Photo gallery</p>
            <h2>Moments from the mountains</h2>
          </div>
          <div className="it-spl__gallery">
            {content.gallery.map((image) => (
              <figure key={image.alt} className="it-spl__gallery-item">
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 100vw, 25vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="it-spl__section it-spl__section--soft">
        <div className="it-spl__container">
          <div className="it-spl__heading">
            <p className="it-spl__section-kicker">Treks by categories</p>
            <h2>Explore the wider catalogue</h2>
            <p>Compare these departures with the rest of our Himalayan collection.</p>
          </div>
          <div className="it-spl__categories">
            {categories.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.label} href={item.href} className="it-spl__category-card">
                  <span className="it-spl__category-ico" aria-hidden>
                    <Icon size={18} strokeWidth={2.1} />
                  </span>
                  <span className="it-spl__category-label">{item.label}</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="it-spl__section">
        <div className="it-spl__container">
          <div className="it-spl__blog-head">
            <div>
              <p className="it-spl__section-kicker">{content.articles.kicker}</p>
              <h2>{content.articles.title}</h2>
            </div>
            <Link href="/blog" className="it-spl__blog-all">
              View all <i className="fa-solid fa-arrow-right" aria-hidden />
            </Link>
          </div>

          <div className="it-spl__blog-mobile">
            {content.articles.items.map((article) => (
              <Link key={article.href} href={article.href} className="it-spl__blog-mcard">
                <span className="it-spl__blog-mcard-media">
                  <Image src={article.image} alt="" fill sizes="120px" />
                </span>
                <span className="it-spl__blog-mcard-body">
                  <span className="it-spl__blog-meta">
                    <span>{article.read}</span>
                  </span>
                  <strong>{article.title}</strong>
                </span>
              </Link>
            ))}
          </div>

          <div className="it-spl__blog-desk">
            {content.articles.items[0] ? (
              <Link href={content.articles.items[0].href} className="it-spl__blog-feature">
                <span className="it-spl__blog-feature-media">
                  <Image
                    src={content.articles.items[0].image}
                    alt=""
                    fill
                    sizes="(max-width: 1100px) 100vw, 50vw"
                  />
                </span>
                <span className="it-spl__blog-feature-body">
                  <span className="it-spl__blog-meta">{content.articles.items[0].read}</span>
                  <strong>{content.articles.items[0].title}</strong>
                  <span className="it-spl__blog-excerpt">{content.articles.items[0].excerpt}</span>
                </span>
              </Link>
            ) : null}
            {content.articles.items.slice(1).map((article) => (
              <Link key={article.href} href={article.href} className="it-spl__blog-card">
                <span className="it-spl__blog-card-media">
                  <Image src={article.image} alt="" fill sizes="25vw" />
                </span>
                <span className="it-spl__blog-card-body">
                  <span className="it-spl__blog-meta">{article.read}</span>
                  <strong>{article.title}</strong>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="it-spl__section">
        <div className="it-spl__container">
          <div className="it-spl__cta">
            <div>
              <p className="it-spl__section-kicker">{content.cta.kicker}</p>
              <h2>{content.cta.title}</h2>
              <p>{content.cta.body}</p>
            </div>
            <div className="it-spl__cta-actions">
              <a
                className="it-spl__btn it-spl__btn--primary"
                href={whatsappUrl(content.cta.whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get trek advice
              </a>
              <Link className="it-spl__btn it-spl__btn--ghost" href="/contact">
                Contact page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
