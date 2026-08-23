import Link from 'next/link';
import { CONTACT, mailtoUrl, telUrl, whatsappUrl } from '@/lib/contact';
import { SPECIAL_PROGRAMS } from '@/lib/special-programs-content';

export default function SpecialProgramsHubPageView() {
  return (
    <div className="it-sp-landing">
      <div className="it-sp-landing__wrap">
        <header className="it-sp-landing__hero">
          <p className="it-sp-landing__eyebrow">
            Special Programs
            <span className="it-sp-landing__star" aria-hidden>
              ★
            </span>
          </p>
          <h1 className="it-sp-landing__title">Treks for every traveller</h1>
          <p className="it-sp-landing__lead">
            Curated Himalayan collections for women-only groups, senior citizens, families, and
            first-time trekkers.
          </p>
        </header>

        <section className="it-sp-landing__help" aria-label="Contact options">
          <p className="it-sp-landing__help-copy">
            <strong>Need help choosing a trek?</strong>
            <span> We are here to support you · {CONTACT.hours}</span>
          </p>
          <ul className="it-sp-landing__help-links">
            <li>
              <a
                href={whatsappUrl('Hi Indian Treks! Help me pick a Special Programs trek.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden />
                WhatsApp us
              </a>
            </li>
            <li>
              <a href={mailtoUrl('Special Programs — Indian Treks')}>
                <i className="fa-solid fa-envelope" aria-hidden />
                Email
              </a>
            </li>
            <li>
              <a href={telUrl()}>
                <i className="fa-solid fa-phone" aria-hidden />
                {CONTACT.phoneDisplay}
              </a>
            </li>
          </ul>
        </section>

        <section className="it-sp-landing__collections" aria-labelledby="sp-collections-heading">
          <h2 id="sp-collections-heading" className="it-sp-landing__collections-label">
            Explore collections
          </h2>
          <ul className="it-sp-landing__list">
            {SPECIAL_PROGRAMS.map((program) => (
              <li key={program.id}>
                <Link href={program.href} className="it-sp-landing__row">
                  <span className="it-sp-landing__row-ico" aria-hidden>
                    <i className={`fa-solid ${program.icon}`} />
                  </span>
                  <span className="it-sp-landing__row-body">
                    <span className="it-sp-landing__row-title">{program.title}</span>{' '}
                    <span className="it-sp-landing__row-desc">{program.lead}</span>
                  </span>
                  <i className="fa-solid fa-arrow-right it-sp-landing__row-arrow" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
