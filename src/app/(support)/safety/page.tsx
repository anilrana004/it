import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Safety | Indian Treks — How We Keep You Safe on the Trail',
  description:
    'Learn how Indian Treks ensures safety on Himalayan treks and yatras — trained leaders, permits, first aid, acclimatisation, and emergency protocols.',
};

export default function SafetyPage() {
  return (
    <div className="it-support-page">
      <div className="it-support-page__wrap">
        <header className="it-support-page__hero">
          <p className="it-support-page__eyebrow">Safety</p>
          <h1 className="it-support-page__title">Safety-Led Himalayan Travel</h1>
          <p className="it-support-page__lead">
            Every departure is planned around terrain, weather, group fitness, and clear on-trail
            protocols — so you can focus on the journey.
          </p>
        </header>

        <article className="it-support-page__card">
          <h2>Certified trek leaders &amp; ground teams</h2>
          <p>
            Our trek leaders are trained in wilderness first aid and high-altitude awareness. They
            monitor pace, hydration, and group wellbeing throughout the itinerary.
          </p>
        </article>

        <article className="it-support-page__card">
          <h2>Altitude &amp; acclimatisation</h2>
          <p>
            High-altitude itineraries include acclimatisation days and conservative pacing. Leaders
            carry pulse oximeters and supplemental oxygen where required. At signs of AMS, descent
            is the first response.
          </p>
        </article>

        <article className="it-support-page__card">
          <h2>Permits, routes &amp; local coordination</h2>
          <p>
            Forest and trek permits are arranged in advance. Activities in restricted zones are
            conducted only with valid permissions and experienced local partners.
          </p>
        </article>

        <article className="it-support-page__card">
          <h2>Women, families &amp; solo travellers</h2>
          <ul className="it-support-page__list">
            <li>
              <i className="fa-solid fa-check" aria-hidden />
              <span>Mixed groups with clear camp and briefing protocols</span>
            </li>
            <li>
              <i className="fa-solid fa-check" aria-hidden />
              <span>Vetted stay partners and hygienic meal planning on trail</span>
            </li>
            <li>
              <i className="fa-solid fa-check" aria-hidden />
              <span>Route difficulty and age guidance listed on every trek page</span>
            </li>
          </ul>
        </article>

        <article className="it-support-page__card">
          <h2>Travel insurance</h2>
          <p>
            Travel insurance covering high-altitude trekking and emergency evacuation is mandatory
            for our expeditions. Ask our team for guidance on suitable policies before you book.
          </p>
        </article>

        <div className="it-support-page__cta">
          <Link href="/faqs">
            <i className="fa-solid fa-circle-question" aria-hidden />
            Read safety FAQs
          </Link>
        </div>
      </div>
    </div>
  );
}
