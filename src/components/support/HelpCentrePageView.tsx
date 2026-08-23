import Link from 'next/link';
import { CONTACT, mailtoUrl, telUrl, whatsappUrl } from '@/lib/contact';
import { HELP_CENTRE_GROUPS, HELP_CENTRE_TOPICS } from '@/lib/help-centre-content';

export default function HelpCentrePageView() {
  return (
    <div className="it-support-page">
      <div className="it-support-page__wrap it-support-page__wrap--wide">
        <header className="it-support-page__hero">
          <p className="it-support-page__eyebrow">Help Centre</p>
          <h1 className="it-support-page__title">How can we help you?</h1>
          <p className="it-support-page__lead">
            Browse FAQs, safety guides, policies, and trek stories — or reach our team directly
            for booking support.
          </p>
        </header>

        <section className="it-help-strip" aria-label="Contact options">
          <div className="it-help-strip__copy">
            <strong>Need help with booking?</strong>
            <span>We are here to support you · {CONTACT.hours}</span>
          </div>
          <div className="it-help-strip__actions">
            <a
              className="it-help-strip__btn it-help-strip__btn--primary"
              href={whatsappUrl('Hi Indian Treks! I need help with a booking.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-whatsapp" aria-hidden />
              WhatsApp us
            </a>
            <a className="it-help-strip__btn" href={mailtoUrl('Booking help — Indian Treks')}>
              <i className="fa-solid fa-envelope" aria-hidden />
              Email
            </a>
            <a className="it-help-strip__btn" href={telUrl()}>
              <i className="fa-solid fa-phone" aria-hidden />
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </section>

        {HELP_CENTRE_GROUPS.map((group) => {
          const topics = HELP_CENTRE_TOPICS.filter((t) => t.group === group.id);
          if (!topics.length) return null;

          return (
            <section key={group.id} className="it-help-group">
              <h2 className="it-help-group__title">{group.label}</h2>
              <div className="it-help-grid">
                {topics.map((topic) => (
                  <Link key={topic.id} href={topic.href} className="it-help-card">
                    <span className="it-help-card__ico" aria-hidden>
                      <i className={`fa-solid ${topic.icon}`} />
                    </span>
                    <span className="it-help-card__body">
                      <span className="it-help-card__title">{topic.title}</span>
                      <span className="it-help-card__desc">{topic.description}</span>
                    </span>
                    <i className="fa-solid fa-arrow-right it-help-card__arrow" aria-hidden />
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
