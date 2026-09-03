import type { Trek } from '@/lib/data';
import type { TrekExtendedContent, TrekRichSection } from '@/lib/content/treks/types';
import { buildDefaultTrekExtended } from '@/lib/content/treks/default-extended-content';
import { KUARI_PASS_FITNESS_SECTION } from '@/lib/content/treks/kuari-pass/fitness-content';
import { KUARI_PASS_OVERVIEW } from '@/lib/content/treks/kuari-pass/overview-content';
import { KUARI_PASS_PACKING_SECTION } from '@/lib/content/treks/kuari-pass/packing-content';
import {
  KUARI_PASS_BOOKING_POLICY_ROWS,
  KUARI_PASS_CANCELLATION_POLICY_SECTION,
} from '@/lib/content/treks/kuari-pass/policies-content';
import { KUARI_PASS_REACH_STEPS } from '@/lib/content/treks/kuari-pass/reach-content';
import { KUARI_PASS_SAFETY_SECTION } from '@/lib/content/treks/kuari-pass/safety-content';
import { KUARI_PASS_STATS } from '@/lib/content/treks/kuari-pass/stats-content';

const KUARI_PASS_SECTIONS: Record<string, TrekRichSection> = {
  fitness: KUARI_PASS_FITNESS_SECTION,
  safety: KUARI_PASS_SAFETY_SECTION,
};

/** Kuari Pass extended content — custom overview, stats, fitness, safety, reach, packing & policies. */
export function buildKuariPassExtended(trek: Trek): TrekExtendedContent {
  const base = buildDefaultTrekExtended(trek);

  return {
    ...base,
    stats: KUARI_PASS_STATS,
    overviewExtra: KUARI_PASS_OVERVIEW,
    reachSteps: KUARI_PASS_REACH_STEPS,
    packingSection: KUARI_PASS_PACKING_SECTION,
    bookingPolicyRows: KUARI_PASS_BOOKING_POLICY_ROWS,
    cancellationPolicySection: KUARI_PASS_CANCELLATION_POLICY_SECTION,
    sections: base.sections.map((section) => KUARI_PASS_SECTIONS[section.id] ?? section),
  };
}
