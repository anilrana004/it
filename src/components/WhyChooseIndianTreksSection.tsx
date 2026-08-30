import type { ReactNode } from 'react';
import Link from 'next/link';
import { WHY_CHOOSE_CTA, WHY_CHOOSE_FEATURES, WHY_CHOOSE_HERO_CARDS, WHY_CHOOSE_SECTION } from '@/lib/why-choose-content';
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
          <p className="it-why__kicker">{WHY_CHOOSE_SECTION.kicker}</p>
          <h2 className="it-why__title" id={titleId}>
            {WHY_CHOOSE_SECTION.titleBefore}<span>{WHY_CHOOSE_SECTION.titleAccent}</span>
          </h2>
          <p className="it-why__lede">{WHY_CHOOSE_SECTION.lede}</p>
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
            <p>{WHY_CHOOSE_CTA.copy}</p>
          </div>
          <Link href={WHY_CHOOSE_CTA.href} className="it-why__cta-btn">
            {WHY_CHOOSE_CTA.label}
            <i className="fa-solid fa-arrow-right" aria-hidden />
          </Link>
        </div>

        {afterContent}
      </div>
    </section>
  );
}
