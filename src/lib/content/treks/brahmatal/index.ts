import type { Trek } from '@/lib/data';
import type { TrekExtendedContent, TrekRichSection } from '@/lib/content/treks/types';
import { buildDefaultTrekExtended } from '@/lib/content/treks/default-extended-content';
import { BRAHMATAL_FITNESS_SECTION } from '@/lib/content/treks/brahmatal/fitness-content';
import { BRAHMATAL_OVERVIEW } from '@/lib/content/treks/brahmatal/overview-content';
import { BRAHMATAL_REACH_STEPS } from '@/lib/content/treks/brahmatal/reach-content';
import { BRAHMATAL_ROUTE_PROFILE } from '@/lib/content/treks/brahmatal/route-content';
import { BRAHMATAL_SAFETY_SECTION } from '@/lib/content/treks/brahmatal/safety-content';

const BRAHMATAL_SECTIONS: Record<string, TrekRichSection> = {
  fitness: BRAHMATAL_FITNESS_SECTION,
  safety: BRAHMATAL_SAFETY_SECTION,
};

/** Brahmatal extended content — overview, fitness, safety, reach & route map. */
export function buildBrahmatalExtended(trek: Trek): TrekExtendedContent {
  const base = buildDefaultTrekExtended(trek);

  return {
    ...base,
    overviewExtra: BRAHMATAL_OVERVIEW,
    routeProfile: BRAHMATAL_ROUTE_PROFILE,
    reachSteps: BRAHMATAL_REACH_STEPS,
    sections: base.sections.map((section) => BRAHMATAL_SECTIONS[section.id] ?? section),
  };
}
