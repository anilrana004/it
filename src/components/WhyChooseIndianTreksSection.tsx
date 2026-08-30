import type { ReactNode } from 'react';
import Link from 'next/link';
import { WHY_CHOOSE_FEATURES, WHY_CHOOSE_HERO_CARDS } from '@/lib/why-choose-content';
import './why-choose-us.css';

type Props = {
  titleId?: string;
  afterContent?: ReactNode;
};

export default function WhyChooseIndianTreksSection({
  titleId = 'it-why-title',
  afterContent,
}: Props) {
  return (
    <section className="it-why" aria-labelledby={titleId}>
      <div className="it-why__wrap">
        <header className="it-why__head">
          <p className="it-why__kicker">Why Choose Us</p>
          <h2 className="it-why__title" id={titleId}>
            Why Choose <span>Indian Treks?</span>
          </h2>
          <p className="it-why__lede">
            Travel has the power to transform perspectives, build meaningful connections, and create stories that
            last a lifetime. At Indian Treks, we&apos;ve dedicated the last decade to making those experiences
            accessible, safe, and unforgettable — with a thriving community of over 80,000 travelers.
          </p>
        </header>

        <div className="it-why__hero-grid">
          {WHY_CHOOSE_HERO_CARDS.map((card) => (
            <article key={card.title} className="it-why__hero-card">
              <div className="it-why__hero-media">
                <img src={card.img} alt={card.title} loading="lazy" referrerPolicy="no-referrer" />
                <span
                  className={`it-why__hero-badge${card.tone === 'gold' ? ' it-why__hero-badge--gold' : ''}`}
                  aria-hidden
                >
                  <i className={card.icon} />
                </span>
              </div>
              <div className="it-why__hero-body">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="it-why__feat-grid">
          {WHY_CHOOSE_FEATURES.map((f) => (
            <article key={f.title} className="it-why__feat">
              <span className="it-why__feat-icon" aria-hidden>
                <i className={f.icon} />
              </span>
              <div className="it-why__feat-copy">
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="it-why__cta">
          <div className="it-why__cta-copy">
            <span className="it-why__cta-logo" aria-hidden>
              <i className="fa-solid fa-mountain-sun" />
            </span>
            <p>Join over 80,000 happy travelers and start your adventure today!</p>
          </div>
          <Link href="/treks" className="it-why__cta-btn">
            Explore Treks
            <i className="fa-solid fa-arrow-right" aria-hidden />
          </Link>
        </div>

        {afterContent}
      </div>
    </section>
  );
}
