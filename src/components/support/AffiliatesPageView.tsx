import Link from 'next/link';
import PrepTocNav, { PrepTocBackLink } from '@/components/prep/PrepTocNav';
import {
  AFFILIATES_CLOSING,
  AFFILIATES_HERO,
  AFFILIATES_SECTIONS,
  type AffiliateSection,
} from '@/lib/content/affiliates-content';
import TermsScrollControls from '@/components/support/TermsScrollControls';
import { CONTACT, mailtoUrl, telUrl, whatsappUrl } from '@/lib/contact';
import '@/components/prep/prep-guides.css';
import './affiliates-page.css';

const SECTION_ACCENTS = ['green', 'teal', 'blue', 'violet', 'amber', 'rose'] as const;

const SECTION_ICONS: Record<string, string> = {
  'why-partner': 'fa-handshake',
  infrastructure: 'fa-mountain',
  transportation: 'fa-van-shuttle',
  'ground-team': 'fa-people-group',
  b2b: 'fa-briefcase',
  campus: 'fa-graduation-cap',
  corporate: 'fa-building',
  referral: 'fa-share-nodes',
  'why-indiantreks': 'fa-award',
};

const HIGHLIGHT_ICONS = [
  'fa-calendar-check',
  'fa-certificate',
  'fa-campground',
  'fa-bus',
  'fa-map-location-dot',
  'fa-route',
  'fa-sliders',
  'fa-headset',
];

const TOC_ITEMS = AFFILIATES_SECTIONS.map((section, index) => ({
  id: `aff-section-${section.id}`,
  title: `${index + 1}. ${section.title}`,
}));

const SECTION_IDS = [...TOC_ITEMS.map((item) => item.id), 'aff-closing'];

function SectionParagraphs({ items }: { items: string[] }) {
  return (
    <>
      {items.map((text) => (
        <p key={text} className="it-aff__p">
          {text}
        </p>
      ))}
    </>
  );
}

function SectionBullets({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul className={`it-aff__bullets it-aff__bullets--${accent}`}>
      {items.map((item) => (
        <li key={item}>
          <span className="it-aff__bullet-mark" aria-hidden>
            <i className="fa-solid fa-circle-check" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function FlowSteps({ flow, accent }: { flow: string; accent: string }) {
  const steps = flow.split('→').map((step) => step.trim());
  return (
    <div className={`it-aff__flow it-aff__flow--${accent}`}>
      {steps.map((step, index) => (
        <span key={step} className="it-aff__flow-step">
          <span className="it-aff__flow-num">{index + 1}</span>
          <span>{step}</span>
          {index < steps.length - 1 ? (
            <i className="fa-solid fa-arrow-right it-aff__flow-arrow" aria-hidden />
          ) : null}
        </span>
      ))}
    </div>
  );
}

function SectionCard({
  section,
  index,
  accent,
}: {
  section: AffiliateSection;
  index: number;
  accent: (typeof SECTION_ACCENTS)[number];
}) {
  const icon = SECTION_ICONS[section.id] ?? 'fa-circle-info';

  return (
    <article
      id={`aff-section-${section.id}`}
      className={`it-aff__section it-aff__section--${accent}`}
    >
      <header className="it-aff__section-head">
        <span className="it-aff__section-num">{index + 1}</span>
        <span className="it-aff__section-ico" aria-hidden>
          <i className={`fa-solid ${icon}`} />
        </span>
        <div>
          <h2>{section.title}</h2>
          {section.subtitle ? <p className="it-aff__kicker">{section.subtitle}</p> : null}
        </div>
      </header>

      <div className="it-aff__section-body">
        {section.paragraphs ? <SectionParagraphs items={section.paragraphs} /> : null}
        {section.bullets ? (
          <>
            {section.id === 'why-partner' ? (
              <p className="it-aff__p it-aff__p--label">Our partners benefit from:</p>
            ) : null}
            <SectionBullets items={section.bullets} accent={accent} />
          </>
        ) : null}
        {section.destinations ? (
          <div className="it-aff__dest-grid">
            {section.destinations.map((dest, destIndex) => (
              <div key={dest.title} className={`it-aff__dest it-aff__dest--${accent}`}>
                <div className="it-aff__dest-top">
                  <span className="it-aff__dest-badge">{String(destIndex + 1).padStart(2, '0')}</span>
                  <h3>{dest.title}</h3>
                </div>
                {dest.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            ))}
          </div>
        ) : null}
        {section.flow ? <FlowSteps flow={section.flow} accent={accent} /> : null}
        {section.paragraphsAfter ? <SectionParagraphs items={section.paragraphsAfter} /> : null}
        {section.taglines ? (
          <div className={`it-aff__taglines it-aff__taglines--${accent}`}>
            {section.taglines.map((line, lineIndex) => (
              <p key={line} className={`it-aff__tagline${lineIndex === 0 ? ' is-primary' : ''}`}>
                {line}
              </p>
            ))}
          </div>
        ) : null}
        {section.highlights ? (
          <div className="it-aff__highlights">
            {section.highlights.map((item, highlightIndex) => (
              <div
                key={item.title}
                className={`it-aff__highlight it-aff__highlight--${(highlightIndex % 6) + 1}`}
              >
                <span className="it-aff__highlight-ico" aria-hidden>
                  <i className={`fa-solid ${HIGHLIGHT_ICONS[highlightIndex] ?? 'fa-star'}`} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        ) : null}
        {section.cta ? (
          <div className="it-aff__section-cta">
            <Link href={section.cta.href} className="it-retro-btn it-retro-btn--pill it-retro-btn--md">
              <i className={`fa-solid ${section.cta.icon}`} aria-hidden />
              {section.cta.label}
            </Link>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function AffiliatesPageView() {
  const b2bWa = whatsappUrl('Hi IndianTreks! I would like to discuss a B2B partnership.');

  return (
    <article className="it-prep it-aff">
      <header className="it-aff__hero">
        <div className="it-aff__hero-glow it-aff__hero-glow--a" aria-hidden />
        <div className="it-aff__hero-glow it-aff__hero-glow--b" aria-hidden />
        <div className="it-aff__wrap">
          <p className="it-aff__eyebrow">{AFFILIATES_HERO.eyebrow}</p>
          <h1 className="it-aff__title">{AFFILIATES_HERO.title}</h1>
          <p className="it-aff__subtitle">{AFFILIATES_HERO.subtitle}</p>

          <div className="it-aff__stats">
            {AFFILIATES_HERO.stats.map((stat, index) => (
              <div key={stat.label} className={`it-aff__stat it-aff__stat--${(index % 4) + 1}`}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="it-aff__intro-card">
            {AFFILIATES_HERO.intro.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
      </header>

      <div className="it-prep__wrap it-prep__wrap--solo it-aff__layout">
        <PrepTocNav
          items={TOC_ITEMS}
          scrollable
          footer={<PrepTocBackLink href="/help-centre" label="← Help Centre" />}
        />

        <div className="it-aff__main">
          <div className="it-prep__content it-aff__content">
            <section className="it-aff__strip" aria-label="Partner enquiries">
              <div className="it-aff__strip-copy">
                <strong>Ready to partner with IndianTreks?</strong>
                <span>B2B agents, colleges, corporates &amp; creators · {CONTACT.hours}</span>
              </div>
              <div className="it-aff__strip-actions">
                <a
                  className="it-aff__strip-btn it-aff__strip-btn--primary"
                  href={b2bWa}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden />
                  WhatsApp B2B
                </a>
                <Link className="it-aff__strip-btn" href="/contact">
                  <i className="fa-solid fa-handshake" aria-hidden />
                  Contact team
                </Link>
                <a className="it-aff__strip-btn" href={mailtoUrl('B2B partnership enquiry — IndianTreks')}>
                  <i className="fa-solid fa-envelope" aria-hidden />
                  Email
                </a>
              </div>
            </section>

            {AFFILIATES_SECTIONS.map((section, index) => (
              <SectionCard
                key={section.id}
                section={section}
                index={index}
                accent={SECTION_ACCENTS[index % SECTION_ACCENTS.length]}
              />
            ))}

            <article id="aff-closing" className="it-aff__closing">
              <div className="it-aff__closing-glow" aria-hidden />
              <h2>{AFFILIATES_CLOSING.title}</h2>
              <SectionParagraphs items={AFFILIATES_CLOSING.paragraphs} />
              <div className="it-aff__contact">
                <a className="it-aff__contact-link" href={mailtoUrl('B2B partnership enquiry — IndianTreks')}>
                  <i className="fa-solid fa-envelope" aria-hidden />
                  Email: {AFFILIATES_CLOSING.email}
                </a>
                <a
                  className="it-aff__contact-link it-aff__contact-link--wa"
                  href={b2bWa}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden />
                  WhatsApp: {AFFILIATES_CLOSING.whatsapp}
                </a>
              </div>
              <div className="it-aff__closing-cta">
                <Link href="/contact" className="it-retro-btn it-retro-btn--pill it-retro-btn--md it-aff__closing-btn">
                  <i className="fa-solid fa-handshake" aria-hidden />
                  {AFFILIATES_CLOSING.ctaLabel}
                </Link>
              </div>
            </article>

            <p className="it-aff__footnote">
              Reach us anytime at <a href={telUrl()}>{CONTACT.phoneDisplay}</a> · {CONTACT.hoursShort},{' '}
              {CONTACT.hoursDetail}.
            </p>
          </div>

          <TermsScrollControls sectionIds={SECTION_IDS} />
        </div>
      </div>
    </article>
  );
}
