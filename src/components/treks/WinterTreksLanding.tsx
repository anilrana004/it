'use client';

import { useCallback, useState } from 'react';
import { Check, Share2 } from 'lucide-react';
import TrekInfoCard from '@/components/treks/TrekInfoCard';
import type { ListingTrek } from '@/lib/treks-listing';
import {
  WINTER_FILTER_VIEW,
  WINTER_SECTION_INTRO,
} from '@/lib/content/winter-treks-guide';
import './treks-explorer.css';
import './winter-treks-guide.css';

function toAbsoluteUrl(href: string): string {
  if (typeof window === 'undefined') return href;
  if (/^https?:\/\//i.test(href)) return href;
  return `${window.location.origin}${href.startsWith('/') ? href : `/${href}`}`;
}

/**
 * Winter landing — intro + trek cards (packing/safety/FAQ live in separate page sections).
 */
export default function WinterTreksLanding({
  title,
  treks,
  shareHref = '/treks?season=winter',
}: {
  title: string;
  info?: string;
  treks: ListingTrek[];
  shareHref?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copySectionLink = useCallback(async () => {
    const url = toAbsoluteUrl(shareHref);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked */
    }
  }, [shareHref]);

  if (treks.length === 0) return null;

  return (
    <section id="season-winter" className="it-trek-section it-winter-landing py-6 lg:py-8 scroll-mt-28">
      <div className="it-trek-section__head it-trek-section__head--winter">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="it-trek-section__kicker">{WINTER_SECTION_INTRO.kicker}</p>
            <h2 className="it-trek-section__title">{title || WINTER_FILTER_VIEW.sectionTitle}</h2>
            <div className="it-trek-section__rich">
              {WINTER_SECTION_INTRO.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="it-trek-section__why-title">{WINTER_SECTION_INTRO.whyTitle}</p>
              <ul className="it-trek-section__why-list">
                {WINTER_SECTION_INTRO.whyPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="it-trek-section__season">{WINTER_SECTION_INTRO.seasonNote}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={copySectionLink}
            className="it-trek-section__share"
            aria-label={copied ? 'Section link copied' : 'Copy link to winter treks'}
            title={copied ? 'Copied!' : 'Copy link'}
          >
            {copied ? (
              <Check className="h-[18px] w-[18px]" strokeWidth={2.25} aria-hidden />
            ) : (
              <Share2 className="h-[18px] w-[18px]" strokeWidth={2.1} aria-hidden />
            )}
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {treks.map((t) => (
          <div key={t.id} id={`trek-${t.id}`} className="scroll-mt-28">
            <TrekInfoCard trek={t} fill />
          </div>
        ))}
      </div>
    </section>
  );
}
