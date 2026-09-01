'use client';

import type { TrekRichSection } from '@/lib/treks/trek-extended-types';
import { CollapsibleRichBlocks } from '@/components/treks/TrekExtendedSections';

const PREVIEW_BLOCK_COUNT = 5;

type Props = {
  section: TrekRichSection;
};

export default function TrekWhyChooseSection({ section }: Props) {
  return (
    <section id={section.id} className="kg-section">
      <div className="kg-overview-card">
        <div className="kg-overview-head">
          <div>
            <span className="kg-overview-kicker">
              <i className="fa-solid fa-award" aria-hidden /> {section.kicker}
            </span>
            <h2>{section.title}</h2>
            {section.intro ? <p>{section.intro}</p> : null}
          </div>
        </div>

        <CollapsibleRichBlocks
          blocks={section.blocks}
          previewCount={PREVIEW_BLOCK_COUNT}
          className="kg-overview-text kg-extended-rich"
        />
      </div>
    </section>
  );
}
