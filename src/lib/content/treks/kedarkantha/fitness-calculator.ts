import {
  assessTrekFitness,
  fitnessLevelForScore as fitnessLevelForScoreGeneric,
  type FitnessAssessmentInput,
  type FitnessAssessmentResult,
  type FitnessLevel,
  type FitnessLevelId,
} from '@/lib/treks/fitness-calculator';

export type {
  FitnessAssessmentInput,
  FitnessAssessmentResult,
  FitnessLevel,
  FitnessLevelId,
};

const KEDARKANTHA_TITLE = 'Kedarkantha Trek';

export function assessKedarkanthaFitness(input: FitnessAssessmentInput): FitnessAssessmentResult {
  return assessTrekFitness(input, KEDARKANTHA_TITLE);
}

export function fitnessLevelForScore(score: number): FitnessLevel {
  return fitnessLevelForScoreGeneric(score, KEDARKANTHA_TITLE);
}
