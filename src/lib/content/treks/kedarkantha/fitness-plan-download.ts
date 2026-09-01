import type { FitnessAssessmentResult } from '@/lib/treks/fitness-calculator';
import {
  downloadFitnessPlanPdf,
  printFitnessPlanPdf,
  type FitnessPlanMeta,
} from '@/lib/treks/fitness-plan-pdf';

const KEDARKANTHA_META: FitnessPlanMeta = {
  trekTitle: 'Kedarkantha Trek',
  trekId: 'kedarkantha',
  maxAltitude: '12,500 ft',
  startEndPoint: 'Dehradun to Dehradun',
};

/** @deprecated Use `downloadFitnessPlanPdf` from `@/lib/treks/fitness-plan-pdf`. */
export function downloadKedarkanthaFitnessPlan(result: FitnessAssessmentResult): void {
  downloadFitnessPlanPdf(result, KEDARKANTHA_META);
}

/** @deprecated Use `printFitnessPlanPdf` from `@/lib/treks/fitness-plan-pdf`. */
export function printKedarkanthaFitnessPlan(result: FitnessAssessmentResult): void {
  printFitnessPlanPdf(result, KEDARKANTHA_META);
}
