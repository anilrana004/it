'use client';

import { useState } from 'react';
import type { TrekRichSection } from '@/lib/treks/trek-extended-types';
import { RichBlocks } from '@/components/treks/TrekExtendedSections';

const PREVIEW_BLOCK_COUNT = 5;

type Props = {
  section: TrekRichSection;
};

export default function KedarkanthaPackingSection({ section }: Props) {
  const [expanded, setExpanded] = useState(false);
  const visibleBlocks = expanded ? section.blocks : section.blocks.slice(0, PREVIEW_BLOCK_COUNT);

  return (
    <section id={section.id} className="kg-section">
      <div className="kg-carry-card">
        <div className="kg-carry-head">
          <span className="kg-carry-kicker">
            <i className="fa-solid fa-suitcase" aria-hidden /> {section.kicker}
          </span>
          <h2>{section.title}</h2>
          {section.intro ? (
            <div>
              <p>{section.intro}</p>
            </div>
          ) : null}
        </div>

        <div className="kg-overview-text kg-extended-rich kg-carry-rich">
          <RichBlocks blocks={visibleBlocks} />
        </div>

        {section.blocks.length > PREVIEW_BLOCK_COUNT ? (
          <div className="kg-overview-footer">
            <div className="kg-overview-actions">
              <button
                type="button"
                className="kg-overview-btn kg-overview-btn-primary"
                onClick={() => setExpanded((open) => !open)}
              >
                {expanded ? 'Read Less' : 'Read More'}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
