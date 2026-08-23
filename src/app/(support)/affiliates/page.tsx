import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Affiliates & Partners | Indian Treks',
  description:
    'Partner with Indian Treks — travel agents, campus ambassadors, corporate teams, and referral programmes for Himalayan treks and yatras.',
};

export default function AffiliatesPage() {
  return (
    <div className="it-support-page">
      <div className="it-support-page__wrap">
        <header className="it-support-page__hero">
          <p className="it-support-page__eyebrow">Affiliates</p>
          <h1 className="it-support-page__title">Partner With Indian Treks</h1>
          <p className="it-support-page__lead">
            Travel agents, student leaders, and businesses can collaborate with us to offer trusted
            Himalayan treks, yatras, and custom departures.
          </p>
        </header>

        <article className="it-support-page__card">
          <h2>Travel agents &amp; B2B partners</h2>
          <p>
            We support agencies and tour operators with trekking packages, customised itineraries,
            group departures, and end-to-end ground coordination across Uttarakhand, Himachal, and
            Nepal.
          </p>
          <div className="it-support-page__cta" style={{ marginTop: '0.85rem' }}>
            <Link href="/contact">
              <i className="fa-solid fa-handshake" aria-hidden />
              Contact B2B team
            </Link>
          </div>
        </article>

        <article className="it-support-page__card">
          <h2>Campus Ambassador Program</h2>
          <p>
            Represent Indian Treks at your college, build a travel community, earn credits, and grow
            with mentorship from our trek leaders.
          </p>
          <div className="it-support-page__cta" style={{ marginTop: '0.85rem' }}>
            <Link href="/campus-ambassador">
              <i className="fa-solid fa-graduation-cap" aria-hidden />
              Apply as ambassador
            </Link>
          </div>
        </article>

        <article className="it-support-page__card">
          <h2>Corporate &amp; team outings</h2>
          <ul className="it-support-page__list">
            <li>
              <i className="fa-solid fa-check" aria-hidden />
              <span>Private departures and custom durations</span>
            </li>
            <li>
              <i className="fa-solid fa-check" aria-hidden />
              <span>Transport, stays, and on-trail logistics handled end-to-end</span>
            </li>
            <li>
              <i className="fa-solid fa-check" aria-hidden />
              <span>Certificates, branded kits, and team-building formats</span>
            </li>
          </ul>
          <div className="it-support-page__cta" style={{ marginTop: '0.85rem' }}>
            <Link href="/corporate">
              <i className="fa-solid fa-briefcase" aria-hidden />
              Corporate treks
            </Link>
          </div>
        </article>

        <article className="it-support-page__card">
          <h2>Referral &amp; affiliate enquiries</h2>
          <p>
            For referral partnerships or affiliate collaborations, email us with your audience,
            region, and how you would like to work together. Our team responds within 24 hours on
            business days.
          </p>
        </article>
      </div>
    </div>
  );
}
