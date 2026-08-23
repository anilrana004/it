import Link from 'next/link';
import { CONTACT, mailtoUrl, telUrl, whatsappUrl } from '@/lib/contact';
import { SPECIAL_PROGRAMS } from '@/lib/special-programs-content';

export default function SpecialProgramsHubPageView() {
  return (
    <div className="it-support-page">
      <div className="it-support-page__wrap it-support-page__wrap--wide">
        <header className="it-support-page__hero">
          <p className="it-support-page__eyebrow">Special Programs ⭐</p>
          <h1 className="it-support-page__title">Treks for every traveller</h1>
          <p className="it-support-page__lead">
            Curated Himalayan collections for women-only groups, senior citizens, families, and
            first-time trekkers.
          </p>
        </header>

        <section className="it-help-strip" aria-label="Contact options">
          <div className="it-help-strip__copy">
            <strong>Need help choosing a trek?</strong>
            <span>We are here to support you · {CONTACT.hours}</span>
          </div>
          <div className="it-help-strip__actions">
            <a
              className="it-help-strip__btn it-help-strip__btn--primary"
              href={whatsappUrl('Hi Indian Treks! Help me pick a Special Programs trek.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-whatsapp" aria-hidden />
              WhatsApp us
            </a>
            <a className="it-help-strip__btn" href={mailtoUrl('Special Programs — Indian Treks')}>
              <i className="fa-solid fa-envelope" aria-hidden />
              Email
            </a>
            <a className="it-help-strip__btn" href={telUrl()}>
              <i className="fa-solid fa-phone" aria-hidden />
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </section>

        <section className="it-help-group">
          <h2 className="it-help-group__title">Explore collections</h2>
          <div className="it-help-grid">
            {SPECIAL_PROGRAMS.map((program) => (
              <Link key={program.id} href={program.href} className="it-help-card">
                <span className="it-help-card__ico" aria-hidden>
                  <i className={`fa-solid ${program.icon}`} />
                </span>
                <span className="it-help-card__body">
                  <span className="it-help-card__title">{program.title}</span>
                  <span className="it-help-card__desc">{program.lead}</span>
                </span>
                <i className="fa-solid fa-arrow-right it-help-card__arrow" aria-hidden />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
