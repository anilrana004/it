import type { BlogAuthority } from '@/lib/blog';

type Props = {
  authority: BlogAuthority;
};

function formatVerifiedDate(iso?: string) {
  if (!iso) return null;
  const date = new Date(iso.includes('T') ? iso : `${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function BlogAuthorityPanel({ authority }: Props) {
  const showQuickAnswer =
    authority.quickAnswerDisplay &&
    Boolean(authority.quickAnswer?.trim() || (authority.keyFacts?.length ?? 0) > 0);

  const hasFaqs = (authority.faqs?.length ?? 0) > 0;
  const hasSources = (authority.sources?.length ?? 0) > 0;
  const hasAuthor = Boolean(authority.authorBio?.trim());
  const lastVerified = formatVerifiedDate(authority.lastVerified);

  if (!showQuickAnswer && !hasFaqs && !hasSources && !hasAuthor && !lastVerified) {
    return null;
  }

  return (
    <aside className="it-blog__authority" aria-label="Article facts and sources">
      {showQuickAnswer ? (
        <section className="it-blog__authority-block it-blog__quick-answer">
          <p className="it-blog__authority-label">Quick answer</p>
          {authority.quickAnswer?.trim() ? <p>{authority.quickAnswer}</p> : null}
          {authority.keyFacts && authority.keyFacts.length > 0 ? (
            <dl className="it-blog__key-facts">
              {authority.keyFacts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </section>
      ) : null}

      {hasAuthor ? (
        <section className="it-blog__authority-block">
          <p className="it-blog__authority-label">About the author</p>
          {authority.authorRole ? (
            <p className="it-blog__authority-role">{authority.authorRole}</p>
          ) : null}
          <p>{authority.authorBio}</p>
          {authority.reviewerName ? (
            <p className="it-blog__authority-reviewed">
              Reviewed by {authority.reviewerName}
              {authority.expertReviewed ? ' (expert reviewed)' : ''}
            </p>
          ) : null}
        </section>
      ) : null}

      {hasFaqs ? (
        <section className="it-blog__authority-block">
          <p className="it-blog__authority-label">Frequently asked questions</p>
          <div className="it-blog__faq-list">
            {authority.faqs!.map((faq) => (
              <details key={faq.question} className="it-blog__faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {hasSources ? (
        <section className="it-blog__authority-block">
          <p className="it-blog__authority-label">Sources</p>
          <ul className="it-blog__sources">
            {authority.sources!.map((source) => (
              <li key={`${source.title}-${source.url ?? ''}`}>
                {source.url ? (
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.title}
                  </a>
                ) : (
                  <span>{source.title}</span>
                )}
                {source.verifiedAt ? (
                  <span className="it-blog__source-verified">
                    Verified {formatVerifiedDate(source.verifiedAt)}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {lastVerified ? (
        <p className="it-blog__authority-footnote">Facts last checked {lastVerified}</p>
      ) : null}
    </aside>
  );
}
