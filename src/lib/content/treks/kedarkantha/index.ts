import type { TrekExtendedContent } from '@/lib/content/treks/types';
import { KEDARKANTHA_DEPARTURE } from '@/lib/content/treks/kedarkantha/departure-content';
import { KEDARKANTHA_FITNESS_SECTION } from '@/lib/content/treks/kedarkantha/fitness-content';
import { KEDARKANTHA_FOOD_SECTION } from '@/lib/content/treks/kedarkantha/food-content';
import { KEDARKANTHA_OVERVIEW } from '@/lib/content/treks/kedarkantha/overview-content';
import { KEDARKANTHA_PACKING_SECTION } from '@/lib/content/treks/kedarkantha/packing-content';
import {
  KEDARKANTHA_BOOKING_POLICY_ROWS,
  KEDARKANTHA_CANCELLATION_POLICY_SECTION,
} from '@/lib/content/treks/kedarkantha/policies-content';
import { KEDARKANTHA_REACH_STEPS } from '@/lib/content/treks/kedarkantha/reach-content';
import { KEDARKANTHA_ROUTE_PROFILE } from '@/lib/content/treks/kedarkantha/route-content';
import { KEDARKANTHA_SAFETY_SECTION } from '@/lib/content/treks/kedarkantha/safety-content';
import { KEDARKANTHA_STATS } from '@/lib/content/treks/kedarkantha/stats-content';
import { KEDARKANTHA_TESTIMONIALS } from '@/lib/content/treks/kedarkantha/testimonials-content';
import { KEDARKANTHA_WHY_CHOOSE_SECTION } from '@/lib/content/treks/kedarkantha/why-choose-content';

/**
 * Kedarkantha trek detail content — assembled from section files in this folder.
 * To update copy, edit the relevant `*-content.ts` file; do not add prose here.
 */
export const kedarkanthaExtended: TrekExtendedContent = {
  stats: KEDARKANTHA_STATS,
  overviewExtra: KEDARKANTHA_OVERVIEW,
  sections: [
    KEDARKANTHA_FITNESS_SECTION,
    KEDARKANTHA_SAFETY_SECTION,
    KEDARKANTHA_FOOD_SECTION,
    KEDARKANTHA_WHY_CHOOSE_SECTION,
  ],
  packingSection: KEDARKANTHA_PACKING_SECTION,
  reachSteps: KEDARKANTHA_REACH_STEPS,
  bookingPolicyRows: KEDARKANTHA_BOOKING_POLICY_ROWS,
  cancellationPolicySection: KEDARKANTHA_CANCELLATION_POLICY_SECTION,
  testimonials: KEDARKANTHA_TESTIMONIALS,
  departure: KEDARKANTHA_DEPARTURE,
  routeProfile: KEDARKANTHA_ROUTE_PROFILE,
};
