import Link from 'next/link';
import {
  HOW_IT_WORKS_SECTION,
  HOW_IT_WORKS_STEPS,
} from '@/lib/content/home-how-it-works';
import './how-it-works.css';

export default function HowItWorks() {
  return (
    <section className="it-hiw" aria-labelledby="it-hiw-title">
      <div className="it-hiw__deco" aria-hidden />

      <div className="it-hiw__wrap">
        <header className="it-hiw__head">
          <p className="it-hiw__kicker">
            <span className="it-hiw__kicker-line" aria-hidden />
            <span className="it-hiw__kicker-icon" aria-hidden>
              <i className="fa-solid fa-mountain" />
            </span>
            {HOW_IT_WORKS_SECTION.kicker}
            <span className="it-hiw__kicker-line" aria-hidden />
          </p>
          <h2 className="it-hiw__title" id="it-hiw-title">
            <span>{HOW_IT_WORKS_SECTION.titleLead}</span> {HOW_IT_WORKS_SECTION.titleRest}
          </h2>
          <p className="it-hiw__lede">{HOW_IT_WORKS_SECTION.lede}</p>
        </header>

        <div className="it-hiw__grid">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <article key={step.id} className="it-hiw__card">
              <div className="it-hiw__media">
                <img src={step.img} alt="" loading="lazy" referrerPolicy="no-referrer" />
                <span className="it-hiw__step-badge" aria-hidden>
                  {step.n}
                </span>
              </div>

              <div className="it-hiw__body">
                <div className="it-hiw__title-row">
                  <span className="it-hiw__icon" aria-hidden>
                    <i className={step.icon} />
                  </span>
                  <h3>
                    <em>{step.title[0]}</em> {step.title[1]}
                  </h3>
                </div>
                <p>{step.desc}</p>
                <Link href={step.href} className="it-hiw__link">
                  {HOW_IT_WORKS_SECTION.linkLabel}
                  <i className="fa-solid fa-arrow-right" aria-hidden />
                </Link>
                <span className="it-hiw__watermark" aria-hidden>
                  {step.n}
                </span>
                <div className="it-hiw__peaks" aria-hidden />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
