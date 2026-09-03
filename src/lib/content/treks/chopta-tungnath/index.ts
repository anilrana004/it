import type { Trek } from '@/lib/data';
import type { TrekExtendedContent, TrekRichSection } from '@/lib/content/treks/types';
import { buildDefaultTrekExtended } from '@/lib/content/treks/default-extended-content';
import { CHOPTA_TUNGNATH_FITNESS_SECTION } from '@/lib/content/treks/chopta-tungnath/fitness-content';
import { CHOPTA_TUNGNATH_OVERVIEW } from '@/lib/content/treks/chopta-tungnath/overview-content';
import { CHOPTA_TUNGNATH_REACH_STEPS } from '@/lib/content/treks/chopta-tungnath/reach-content';
import { CHOPTA_TUNGNATH_ROUTE_PROFILE } from '@/lib/content/treks/chopta-tungnath/route-content';
import { CHOPTA_TUNGNATH_SAFETY_SECTION } from '@/lib/content/treks/chopta-tungnath/safety-content';
import { CHOPTA_TUNGNATH_STATS } from '@/lib/content/treks/chopta-tungnath/stats-content';

const CHOPTA_TUNGNATH_SECTIONS: Record<string, TrekRichSection> = {
  fitness: CHOPTA_TUNGNATH_FITNESS_SECTION,
  safety: CHOPTA_TUNGNATH_SAFETY_SECTION,
};

/** Chopta Tungnath extended content — custom sections merged with defaults. */
export function buildChoptaTungnathExtended(trek: Trek): TrekExtendedContent {
  const base = buildDefaultTrekExtended(trek);

  return {
    ...base,
    stats: CHOPTA_TUNGNATH_STATS,
    overviewExtra: CHOPTA_TUNGNATH_OVERVIEW,
    reachSteps: CHOPTA_TUNGNATH_REACH_STEPS,
    routeProfile: CHOPTA_TUNGNATH_ROUTE_PROFILE,
    sections: base.sections.map(
      (section) => CHOPTA_TUNGNATH_SECTIONS[section.id] ?? section,
    ),
  };
}
