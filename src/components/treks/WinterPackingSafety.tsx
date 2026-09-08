'use client';

import Link from 'next/link';
import { ArrowRight, Backpack, Check } from 'lucide-react';
import { WINTER_GUIDE_SECTIONS } from '@/lib/content/winter-treks-guide';
import '@/components/landing/landing-reviews-blog.css';
import './winter-treks-guide.css';

function splitEmDash(item: string): { title: string; body: string } {
  const sep = item.includes(' — ') ? ' — ' : item.includes(' - ') ? ' - ' : null;
  if (!sep) return { title: item, body: '' };
  const i = item.indexOf(sep);
  return { title: item.slice(0, i).trim(), body: item.slice(i + sep.length).trim() };
}

function getSection(id: string) {
  return WINTER_GUIDE_SECTIONS.find((s) => s.id === id);
}

function getListItems(sectionId: string): string[] {
  const section = getSection(sectionId);
  const list = section?.blocks.find((b) => b.type === 'ul');
  return list?.type === 'ul' ? list.items : [];
}

function getParagraphs(sectionId: string): string[] {
  const section = getSection(sectionId);
  return (
    section?.blocks.filter((b) => b.type === 'p').map((b) => (b.type === 'p' ? b.text : '')) ?? []
  );
}

/** Packing list — own section after Why IndianTreks. */
export function WinterPackingSection() {
  const items = getListItems('packing');
  const paras = getParagraphs('packing');
  if (items.length === 0) return null;

  const tip = paras[1]?.replace(/^Pro Tip:\s*/i, '') ?? null;

  return (
    <section
      id="winter-packing"
      className="it-lx__section it-wg-pack"
      aria-labelledby="winter-packing-title"
    >
      <div className="it-lx__container">
        <div className="it-lx__heading it-lx__heading--center it-wg-pack__heading">
          <p className="it-lx__kicker">Gear checklist</p>
          <h2 id="winter-packing-title">What to Pack for a Winter Trek</h2>
          <p>
            {paras[0] ??
              'Temperatures drop sharply after sunset at higher camps — pack layers you can add or remove on trail.'}
          </p>
        </div>

        <div className="it-wg-pack__shell">
          <div className="it-wg-pack__badge" aria-hidden>
            <Backpack strokeWidth={2} />
            <span>Essential winter trek gear</span>
          </div>

          <ul className="it-wg-pack__grid">
            {items.map((item) => (
              <li key={item}>
                <Check className="it-wg-pack__check" strokeWidth={2.5} aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {tip ? <p className="it-wg-pack__tip">{tip}</p> : null}

          <div className="it-wg-pack__rental">
            <div className="it-wg-pack__rental-copy">
              <p className="it-wg-pack__rental-kicker">Gear rental</p>
              <p className="it-wg-pack__rental-title">Skip buying bulky winter gear</p>
              <p className="it-wg-pack__rental-body">
                Rent trail-ready jackets, waterproof shoes, backpacks and more for your trek —
                sanitised, sized, and collected at the pickup point.
              </p>
            </div>
            <Link href="/gear-rental" className="it-wg-pack__rental-link">
              View rental details
              <ArrowRight strokeWidth={2.25} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Safety tips — own section after packing. */
export function WinterSafetySection() {
  const items = getListItems('safety');
  const paras = getParagraphs('safety');
  if (items.length === 0) return null;

  return (
    <section
      id="winter-safety"
      className="it-lx__section it-lx__section--wash it-wg-safe"
      aria-labelledby="winter-safety-title"
    >
      <div className="it-lx__container">
        <div className="it-lx__heading it-lx__heading--center it-wg-safe__heading">
          <p className="it-lx__kicker">Stay safe</p>
          <h2 id="winter-safety-title">Winter Trekking Safety Tips</h2>
          <p>
            {paras[0] ??
              'Winter trekking is rewarding, but snow and cold need extra preparation and honest communication with your trek leader.'}
          </p>
        </div>

        <ol className="it-wg-safe__grid">
          {items.map((item, idx) => {
            const { title, body } = splitEmDash(item);
            return (
              <li key={item} className="it-wg-safe__item">
                <span className="it-wg-safe__num" aria-hidden>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="it-wg-safe__copy">
                  <h3>{title}</h3>
                  {body ? <p>{body}</p> : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** Renders packing then safety as two independent page sections. */
export default function WinterPackingSafety() {
  return (
    <>
      <WinterPackingSection />
      <WinterSafetySection />
    </>
  );
}
