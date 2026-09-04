import type { Trek } from '@/lib/data';
import type { TrekExtendedContent, TrekRichSection } from '@/lib/content/treks/types';
import { buildDefaultTrekExtended } from '@/lib/content/treks/default-extended-content';
import { HAR_KI_DUN_FITNESS_SECTION } from '@/lib/content/treks/har-ki-dun/fitness-content';
import { HAR_KI_DUN_NOTE_SECTION } from '@/lib/content/treks/har-ki-dun/note-content';
import { HAR_KI_DUN_OVERVIEW } from '@/lib/content/treks/har-ki-dun/overview-content';
import { HAR_KI_DUN_PACKING_SECTION } from '@/lib/content/treks/har-ki-dun/packing-content';
import { HAR_KI_DUN_REACH_STEPS } from '@/lib/content/treks/har-ki-dun/reach-content';
import { HAR_KI_DUN_SAFETY_SECTION } from '@/lib/content/treks/har-ki-dun/safety-content';
import { HAR_KI_DUN_TESTIMONIALS } from '@/lib/content/treks/har-ki-dun/testimonials-content';

const HAR_KI_DUN_SECTIONS: Record<string, TrekRichSection> = {
  fitness: HAR_KI_DUN_FITNESS_SECTION,
  safety: HAR_KI_DUN_SAFETY_SECTION,
};

/** Har Ki Dun extended content — overview, fitness, safety, reach, packing, note & reviews. */
export function buildHarKiDunExtended(trek: Trek): TrekExtendedContent {
  const base = buildDefaultTrekExtended(trek);

  return {
    ...base,
    overviewExtra: HAR_KI_DUN_OVERVIEW,
    reachSteps: HAR_KI_DUN_REACH_STEPS,
    packingSection: HAR_KI_DUN_PACKING_SECTION,
    noteSection: HAR_KI_DUN_NOTE_SECTION,
    testimonials: HAR_KI_DUN_TESTIMONIALS,
    sections: base.sections.map((section) => HAR_KI_DUN_SECTIONS[section.id] ?? section),
  };
}
