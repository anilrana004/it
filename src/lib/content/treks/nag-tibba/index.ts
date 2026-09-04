import type { Trek } from '@/lib/data';
import type { TrekExtendedContent, TrekRichSection } from '@/lib/content/treks/types';
import { buildDefaultTrekExtended } from '@/lib/content/treks/default-extended-content';
import { NAG_TIBBA_FITNESS_SECTION } from '@/lib/content/treks/nag-tibba/fitness-content';
import { NAG_TIBBA_OVERVIEW } from '@/lib/content/treks/nag-tibba/overview-content';
import { NAG_TIBBA_PACKING_SECTION } from '@/lib/content/treks/nag-tibba/packing-content';
import { NAG_TIBBA_REACH_STEPS } from '@/lib/content/treks/nag-tibba/reach-content';
import { NAG_TIBBA_ROUTE_PROFILE } from '@/lib/content/treks/nag-tibba/route-content';
import { NAG_TIBBA_SAFETY_SECTION } from '@/lib/content/treks/nag-tibba/safety-content';

const NAG_TIBBA_SECTIONS: Record<string, TrekRichSection> = {
  fitness: NAG_TIBBA_FITNESS_SECTION,
  safety: NAG_TIBBA_SAFETY_SECTION,
};

/** Nag Tibba extended content — overview, fitness, safety, reach, packing & day-by-day route map. */
export function buildNagTibbaExtended(trek: Trek): TrekExtendedContent {
  const base = buildDefaultTrekExtended(trek);

  return {
    ...base,
    overviewExtra: NAG_TIBBA_OVERVIEW,
    routeProfile: NAG_TIBBA_ROUTE_PROFILE,
    packingSection: NAG_TIBBA_PACKING_SECTION,
    reachSteps: NAG_TIBBA_REACH_STEPS,
    sections: base.sections.map((section) => NAG_TIBBA_SECTIONS[section.id] ?? section),
  };
}
