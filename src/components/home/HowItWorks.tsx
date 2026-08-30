import Link from 'next/link';
import { photos } from '@/lib/media';
import './how-it-works.css';

const STEPS = [
  {
    n: '01',
    title: ['Choose', 'Your Trip'],
    desc: 'Browse our curated treks, yatras, and adventure tours. Filter by region, difficulty, and season to find your perfect match.',
    img: photos.prepHero,
    icon: 'fa-solid fa-compass',
    href: '/treks',
  },
  {
    n: '02',
    title: ['Book', '& Pay Later'],
    desc: 'Reserve your spot with just ₹799 deposit. Pay the rest in installments or in full — your journey, your pace.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=560&q=80',
    icon: 'fa-solid fa-wallet',
    href: '/treks',
  },
  {
    n: '03',
    title: ['Go on', 'Adventure'],
    desc: 'Meet fellow trekkers, follow expert guides, and make memories for a lifetime. We handle everything — you just explore.',
    img: photos.womenTrek,
    icon: 'fa-solid fa-person-hiking',
    href: '/treks',
  },
] as const;

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
            How It Works
            <span className="it-hiw__kicker-line" aria-hidden />
          </p>
          <h2 className="it-hiw__title" id="it-hiw-title">
            <span>3 Steps</span> to Your Next Adventure
          </h2>
          <p className="it-hiw__lede">From choosing to booking to exploring – we make it simple.</p>
        </header>

        <div className="it-hiw__grid">
          {STEPS.map((step) => (
            <article key={step.n} className="it-hiw__card">
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
                  Explore Treks
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
