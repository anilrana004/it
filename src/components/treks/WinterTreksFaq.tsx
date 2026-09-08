'use client';

import { WINTER_GUIDE_SECTIONS } from '@/lib/content/winter-treks-guide';
import '@/components/landing/landing-reviews-blog.css';
import './winter-treks-guide.css';

function getWinterFaqItems() {
  const section = WINTER_GUIDE_SECTIONS.find((s) => s.id === 'faq');
  const block = section?.blocks.find((b) => b.type === 'faq');
  return block?.type === 'faq' ? block.items : [];
}

/** Winter FAQ — reviews-style heading, standard accordion list (no boxes). */
export default function WinterTreksFaq() {
  const items = getWinterFaqItems();
  if (items.length === 0) return null;

  return (
    <section id="faq" className="it-lx__section it-lx__section--wash it-wg-faq-page" aria-labelledby="winter-faq-title">
      <div className="it-lx__container">
        <div className="it-lx__heading it-lx__heading--center">
          <p className="it-lx__kicker">Winter trekking FAQ</p>
          <h2 id="winter-faq-title">Frequently Asked Questions</h2>
          <p>
            Quick answers for first snow treks, packing, fitness and safety before you book a
            2026–27 winter departure.
          </p>
        </div>

        <div className="it-wg-faq-list">
          {items.map((item) => (
            <details key={item.q} className="it-wg-faq-list__item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
