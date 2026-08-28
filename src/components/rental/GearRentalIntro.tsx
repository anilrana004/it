import {
  GEAR_HERO_HIGHLIGHTS,
  GEAR_STATS,
  GEAR_WHY_RENT,
} from '@/lib/gear-rental';

export default function GearRentalIntro() {
  return (
    <>
      <section className="it-rental__highlights" aria-label="Rental highlights">
        <div className="it-rental__shell">
          <ul>
            {GEAR_HERO_HIGHLIGHTS.map((item) => (
              <li key={item.title}>
                <span className="it-rental__highlights-icon">
                  <i className={`fa-solid ${item.icon}`} aria-hidden />
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="it-rental__why" id="why-rent">
        <div className="it-rental__shell">
          <div className="it-rental__why-head">
            <span className="it-rental__why-rule" aria-hidden />
            <div>
              <i className="fa-solid fa-mountain-sun" aria-hidden />
              <h2>Why rent from us?</h2>
              <svg className="it-rental__why-scribble" viewBox="0 0 160 10" aria-hidden>
                <path
                  d="M2 7 C 40 2, 80 9, 158 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="it-rental__why-rule" aria-hidden />
          </div>

          <ul className="it-rental__why-grid">
            {GEAR_WHY_RENT.map((item) => (
              <li key={item.title}>
                <span className="it-rental__why-icon">
                  <i className={`fa-solid ${item.icon}`} aria-hidden />
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="it-rental__stats" aria-label="Indian Treks rental stats">
        <div className="it-rental__shell">
          <ul>
            {GEAR_STATS.map((stat) => (
              <li key={stat.label}>
                <i className={`fa-solid ${stat.icon}`} aria-hidden />
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
