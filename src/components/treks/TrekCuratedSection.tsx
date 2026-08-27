'use client';

import { useCallback, useState } from 'react';
import { Check, Share2 } from 'lucide-react';
import TrekInfoCard from '@/components/treks/TrekInfoCard';
import type { ListingTrek } from '@/lib/treks-listing';
import './treks-explorer.css';

function toAbsoluteUrl(href: string): string {
  if (typeof window === 'undefined') return href;
  if (/^https?:\/\//i.test(href)) return href;
  return `${window.location.origin}${href.startsWith('/') ? href : `/${href}`}`;
}

export default function TrekCuratedSection({
  title,
  info,
  treks,
  onOpen,
  layout = 'scroll',
  shareHref,
  sectionId,
}: {
  title: string;
  info: string;
  treks: ListingTrek[];
  onOpen?: () => void;
  layout?: 'scroll' | 'grid';
  /** Filter or page path copied when sharing this section — e.g. `/treks?season=autumn` */
  shareHref?: string;
  sectionId?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copySectionLink = useCallback(async () => {
    const base = shareHref ? toAbsoluteUrl(shareHref) : window.location.href;
    const url = sectionId ? `${base.split('#')[0]}#${sectionId}` : base;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked — no-op */
    }
  }, [sectionId, shareHref]);

  if (treks.length === 0) return null;

  return (
    <section id={sectionId} className="it-trek-section py-6 lg:py-8 scroll-mt-28">
      <div className="it-trek-section__head">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="it-trek-section__title">
              {onOpen ? (
                <button type="button" onClick={onOpen} className="text-left">
                  {title}
                </button>
              ) : (
                title
              )}
            </h2>
            <p className="it-trek-section__info">{info}</p>
          </div>
          <button
            type="button"
            onClick={copySectionLink}
            className="it-trek-section__share"
            aria-label={copied ? 'Section link copied' : 'Copy link to this trek section'}
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

      {layout === 'grid' ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {treks.map((t) => (
            <TrekInfoCard key={t.id} trek={t} fill />
          ))}
        </div>
      ) : (
        <div
          className="-mx-4 mt-4 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-none snap-x snap-mandatory lg:mx-0 lg:gap-4 lg:px-0"
          style={{ scrollbarWidth: 'none' }}
        >
          {treks.map((t) => (
            <div key={t.id} className="snap-start">
              <TrekInfoCard trek={t} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
