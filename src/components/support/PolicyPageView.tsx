import Link from 'next/link';
import type { PolicySection } from '@/lib/help-centre-content';

type PolicyPageViewProps = {
  eyebrow: string;
  title: string;
  lead: string;
  sections: PolicySection[];
  table?: {
    headers: [string, string];
    rows: [string, string][];
  };
  cta?: { label: string; href: string };
};

export default function PolicyPageView({
  eyebrow,
  title,
  lead,
  sections,
  table,
  cta,
}: PolicyPageViewProps) {
  return (
    <div className="it-support-page">
      <div className="it-support-page__wrap it-support-page__wrap--wide">
        <header className="it-support-page__hero">
          <p className="it-support-page__eyebrow">{eyebrow}</p>
          <h1 className="it-support-page__title">{title}</h1>
          <p className="it-support-page__lead">{lead}</p>
        </header>

        {table ? (
          <div className="it-policy-table-wrap">
            <h2 className="it-policy-table__title">Refund schedule</h2>
            <div className="it-policy-table" role="table">
              <div className="it-policy-table__head" role="rowgroup">
                <div className="it-policy-table__row it-policy-table__row--head" role="row">
                  <div role="columnheader">{table.headers[0]}</div>
                  <div role="columnheader">{table.headers[1]}</div>
                </div>
              </div>
              <div role="rowgroup">
                {table.rows.map(([window, detail]) => (
                  <div key={window} className="it-policy-table__row" role="row">
                    <div className="it-policy-table__cell it-policy-table__cell--label" role="cell">
                      {window}
                    </div>
                    <div className="it-policy-table__cell" role="cell">{detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {sections.map((section) => (
          <article key={section.title} className="it-support-page__card">
            <h2>{section.title}</h2>
            {section.body ? <p>{section.body}</p> : null}
            {section.bullets ? (
              <ul className="it-support-page__list">
                {section.bullets.map((item) => (
                  <li key={item}>
                    <i className="fa-solid fa-check" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}

        {cta ? (
          <div className="it-support-page__cta">
            <Link href={cta.href}>
              <i className="fa-solid fa-arrow-left" aria-hidden />
              {cta.label}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
