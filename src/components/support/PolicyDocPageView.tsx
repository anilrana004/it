import Link from 'next/link';
import PrepTocNav, { PrepTocBackLink } from '@/components/prep/PrepTocNav';
import type { PolicyDocMeta, PolicyDocSection } from '@/lib/content/cancellation-content';
import TermsScrollControls from '@/components/support/TermsScrollControls';
import { mailtoUrl, telUrl } from '@/lib/contact';
import '@/components/prep/prep-guides.css';
import './terms-page.css';

const SECTION_ACCENTS = ['green', 'teal', 'blue', 'violet', 'amber', 'rose'] as const;

function PolicyDocTable({
  title,
  headers,
  rows,
}: {
  title?: string;
  headers: [string, string];
  rows: [string, string][];
}) {
  return (
    <div className="it-policy-table-wrap">
      {title ? <h3 className="it-policy-table__title">{title}</h3> : null}
      <div className="it-policy-table" role="table">
        <div className="it-policy-table__head" role="rowgroup">
          <div className="it-policy-table__row it-policy-table__row--head" role="row">
            <div role="columnheader">{headers[0]}</div>
            <div role="columnheader">{headers[1]}</div>
          </div>
        </div>
        <div role="rowgroup">
          {rows.map(([label, detail]) => (
            <div key={label} className="it-policy-table__row" role="row">
              <div className="it-policy-table__cell it-policy-table__cell--label" role="cell">
                {label}
              </div>
              <div className="it-policy-table__cell" role="cell">
                {detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PolicyDocPageView({
  meta,
  sections,
  idPrefix,
  mailtoSubject,
}: {
  meta: PolicyDocMeta;
  sections: PolicyDocSection[];
  idPrefix: string;
  mailtoSubject: string;
}) {
  const tocItems = sections.map((section) => ({
    id: `${idPrefix}-${section.number}`,
    title: `${section.number}. ${section.title}`,
  }));
  const sectionIds = tocItems.map((item) => item.id);

  return (
    <article className="it-prep it-terms">
      <header className="it-terms__hero">
        <div className="it-terms__hero-glow it-terms__hero-glow--a" aria-hidden />
        <div className="it-terms__hero-glow it-terms__hero-glow--b" aria-hidden />
        <div className="it-terms__hero-inner">
          <p className="it-terms__eyebrow">{meta.eyebrow}</p>
          <h1 className="it-terms__title">{meta.title}</h1>
          <p className="it-terms__lead">{meta.lead}</p>
          <span className="it-terms__updated">Last Updated: {meta.lastUpdated}</span>
        </div>
      </header>

      <div className="it-prep__wrap it-prep__wrap--solo it-terms__layout">
        <PrepTocNav
          items={tocItems}
          scrollable
          footer={<PrepTocBackLink href="/help-centre" label="← Help Centre" />}
        />

        <div className="it-terms__main">
          <div className="it-prep__content it-terms__content">
            {sections.map((section) => {
              const accent = SECTION_ACCENTS[(section.number - 1) % SECTION_ACCENTS.length];
              return (
                <section
                  key={section.number}
                  id={`${idPrefix}-${section.number}`}
                  className={`it-prep__section it-terms__section it-terms__section--${accent}`}
                >
                  <header className="it-terms__section-head">
                    <span className="it-terms__section-num">{section.number}</span>
                    <h2 className="it-prep__section-title">{section.title}</h2>
                  </header>

                  {section.paragraphs?.map((text) => (
                    <p key={text}>{text}</p>
                  ))}

                  {section.bullets ? (
                    <ul className="it-prep__list it-terms__list">
                      {section.bullets.map((item) => (
                        <li key={item}>
                          <i className="fa-solid fa-circle-check" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.table ? (
                    <PolicyDocTable
                      title={section.table.title}
                      headers={section.table.headers}
                      rows={section.table.rows}
                    />
                  ) : null}

                  {section.paragraphsAfter?.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </section>
              );
            })}

            <footer className="it-terms__footer">
              <div className="it-terms__footer-glow" aria-hidden />
              <p className="it-terms__footer-brand">IndianTreks</p>
              <p className="it-terms__footer-tagline">{meta.footerTagline}</p>
              <p className="it-terms__footer-line">{meta.address}</p>
              <p className="it-terms__footer-line">
                Email: <a href={mailtoUrl(mailtoSubject)}>{meta.email}</a>
              </p>
              <p className="it-terms__footer-line">
                Contact: <a href={telUrl()}>{meta.phones}</a>
              </p>
            </footer>

            <div className="it-terms__back">
              <Link href="/help-centre" className="it-retro-btn it-retro-btn--pill it-retro-btn--md">
                <i className="fa-solid fa-arrow-left" aria-hidden />
                Back to Help Centre
              </Link>
            </div>
          </div>

          <TermsScrollControls sectionIds={sectionIds} />
        </div>
      </div>
    </article>
  );
}
