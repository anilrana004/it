import Link from 'next/link';
import type { PrepGuide, PrepSection } from '@/lib/prep-guides-content';
import PrepPremiumHero from '@/components/prep/PrepPremiumHero';
import PrepTocNav from '@/components/prep/PrepTocNav';
import './prep-guides.css';

function Callout({
  tone,
  title,
  body,
}: {
  tone: 'info' | 'warn' | 'tip';
  title: string;
  body: string;
}) {
  return (
    <aside className={`it-prep__callout it-prep__callout--${tone}`} role="note">
      <strong>{title}</strong>
      <p>{body}</p>
    </aside>
  );
}

function GuideSections({ sections }: { sections: PrepSection[] }) {
  return (
    <div className="it-prep__content">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="it-prep__section">
          <h2 className="it-prep__section-title">{section.title}</h2>
          {section.lead ? <p className="it-prep__section-lead">{section.lead}</p> : null}

          {section.body?.map((para) => (
            <p key={para.slice(0, 48)}>{para}</p>
          ))}

          {section.steps ? (
            <ol className="it-prep__steps">
              {section.steps.map((step) => (
                <li key={step.title}>
                  <span className="it-prep__step-num" aria-hidden />
                  <div className="it-prep__step-body">
                    <h3>{step.title}</h3>
                    <p>{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : null}

          {section.weeks ? (
            <div className="it-prep__weeks">
              {section.weeks.map((week) => (
                <div key={week.week} className="it-prep__week">
                  <div className="it-prep__week-head">
                    <strong>{week.week}</strong>
                    <span>{week.focus}</span>
                  </div>
                  <ul>
                    {week.sessions.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}

          {section.grid ? (
            <div className="it-prep__grid">
              {section.grid.map((card) => (
                <div key={card.title} className="it-prep__grid-card">
                  <h3>
                    <i className={`fa-solid ${card.icon}`} aria-hidden />
                    {card.title}
                  </h3>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}

          {section.table ? (
            <div className="it-prep__table-wrap">
              <table className="it-prep__table">
                <thead>
                  <tr>
                    <th scope="col">{section.table.headers[0]}</th>
                    <th scope="col">{section.table.headers[1]}</th>
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map(([a, b]) => (
                    <tr key={a}>
                      <td>{a}</td>
                      <td>{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {section.bullets ? (
            <ul className="it-prep__list">
              {section.bullets.map((item) => (
                <li key={item}>
                  <i className="fa-solid fa-check" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {section.checklist ? (
            <ul className="it-prep__check">
              {section.checklist.map((item) => (
                <li key={item}>
                  <i className="fa-solid fa-square-check" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {section.callout ? (
            <Callout
              tone={section.callout.tone}
              title={section.callout.title}
              body={section.callout.body}
            />
          ) : null}
        </section>
      ))}
    </div>
  );
}

/** One guide = one page. No tab switcher for the other guides. */
export default function PrepGuidePageView({ guide }: { guide: PrepGuide }) {
  return (
    <article className="it-prep">
      {guide.premiumHero ? (
        <PrepPremiumHero guide={guide} />
      ) : (
        <header className="it-prep__hero">
          <div className="it-prep__hero-media" aria-hidden>
            <img src={guide.heroImage} alt="" referrerPolicy="no-referrer" />
            <div className="it-prep__hero-shade" />
          </div>
          <div className="it-prep__hero-inner">
            <p className="it-prep__brand">Indian Treks</p>
            <p className="it-prep__eyebrow">
              <i className={`fa-solid ${guide.icon}`} aria-hidden />
              {guide.eyebrow}
            </p>
            <h1 className="it-prep__title">{guide.title}</h1>
            <p className="it-prep__lead">{guide.lead}</p>
            <div className="it-prep__meta">
              <span className="it-prep__meta-chip">
                <i className="fa-regular fa-clock" aria-hidden />
                {guide.readTime}
              </span>
              <span className="it-prep__meta-chip">
                <i className="fa-solid fa-book-open" aria-hidden />
                Field-tested guidance
              </span>
            </div>
          </div>
        </header>
      )}

      <div className="it-prep__wrap it-prep__wrap--solo">
        <PrepTocNav
          items={guide.sections.map((section) => ({
            id: section.id,
            title: section.title.replace(/^\d+\.\s*/, ''),
          }))}
        />

        <div>
          {!guide.premiumHero ? (
            <div className="it-prep__highlights" aria-label="Guide highlights">
              {guide.highlights.map((h) => (
                <div key={h.label} className="it-prep__highlight">
                  <span className="it-prep__highlight-label">{h.label}</span>
                  <span className="it-prep__highlight-value">{h.value}</span>
                </div>
              ))}
            </div>
          ) : null}

          <GuideSections sections={guide.sections} />

          <footer className="it-prep__footer">
            <div className="it-prep__cta">
              <div>
                <h2>Ready to put this into practice?</h2>
                <p>
                  Browse departures that match your fitness, or talk to our team — we will help you
                  pick a route and prepare with confidence.
                </p>
              </div>
              <div className="it-prep__cta-actions">
                <Link href="/treks">
                  <i className="fa-solid fa-compass" aria-hidden />
                  Explore treks
                </Link>
                <Link href="/contact">
                  <i className="fa-solid fa-comments" aria-hidden />
                  Ask an advisor
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}
