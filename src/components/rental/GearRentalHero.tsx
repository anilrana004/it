import Image from 'next/image';
import { GEAR_HERO_IMAGE, GEAR_TRUST_AVATARS } from '@/lib/gear-rental';

export default function GearRentalHero() {
  return (
    <header className="it-rental__hero">
      <div className="it-rental__hero-media" aria-hidden>
        <Image
          src={GEAR_HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="it-rental__hero-shade" aria-hidden />

      <div className="it-rental__hero-layout">
        <div className="it-rental__hero-inner">
          <p className="it-rental__hero-badge">
            <i className="fa-solid fa-person-hiking" aria-hidden />
            Indian Treks · Gear rental
          </p>

          <h1 className="it-rental__hero-title">
            <span>Don&apos;t buy trek gear.</span>
            <em className="it-rental__hero-accent">
              Rent it.
              <svg className="it-rental__hero-scribble" viewBox="0 0 120 12" aria-hidden>
                <path
                  d="M2 8 C 28 2, 52 10, 118 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </em>
          </h1>

          <p className="it-rental__hero-lead">
            Sanitised, trail-tested kit waiting at base camp. Travel light,{' '}
            <strong>save up to 80%</strong>, and skip the cupboard of gear you will use once a year.
          </p>

          <div className="it-rental__hero-actions">
            <a
              href="#rental-store"
              className="it-rental__btn it-rental__btn--lime it-rental__btn--lg"
            >
              <i className="fa-solid fa-bag-shopping" aria-hidden />
              Rent gear now
              <i className="fa-solid fa-arrow-right" aria-hidden />
            </a>
            <a
              href="#how-renting-works"
              className="it-rental__btn it-rental__btn--outline it-rental__btn--lg"
            >
              <i className="fa-solid fa-circle-play" aria-hidden />
              See how it works
            </a>
          </div>

          <div className="it-rental__hero-trust">
            <div className="it-rental__hero-avatars" aria-hidden>
              {GEAR_TRUST_AVATARS.map((avatar) => (
                <span
                  key={avatar.initials}
                  className="it-rental__hero-avatar"
                  style={{ background: `hsl(${avatar.hue} 45% 32%)` }}
                >
                  {avatar.initials}
                </span>
              ))}
            </div>
            <span>
              <i className="fa-solid fa-circle-check" aria-hidden />
              Trusted by 18,000+ trekkers each season
            </span>
          </div>
        </div>

        <aside className="it-rental__hero-save" aria-label="Savings highlight">
          <span className="it-rental__hero-save-icon">
            <i className="fa-solid fa-piggy-bank" aria-hidden />
          </span>
          <p>
            Save up to <strong>80%</strong>
            <span>compared to buying new gear</span>
          </p>
          <svg className="it-rental__hero-save-scribble" viewBox="0 0 80 10" aria-hidden>
            <path
              d="M2 7 C 20 2, 40 8, 78 3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </aside>
      </div>
    </header>
  );
}
