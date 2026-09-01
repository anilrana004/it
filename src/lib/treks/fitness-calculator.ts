export type FitnessLevelId = 'needs-preparation' | 'building-base' | 'trek-ready' | 'strong-ready';

export type FitnessLevel = {
  id: FitnessLevelId;
  label: string;
  scoreMin: number;
  scoreMax: number;
  summary: string;
  weeksRecommended: string;
  readiness: string;
  weeklyPlan: string[];
  focusAreas: string[];
  warnings: string[];
};

export type FitnessAssessmentInput = {
  exerciseDays: '0-1' | '2-3' | '4-5' | '6-7';
  jog5km: 'no' | 'breaks' | 'yes';
  stairs10Floors: 'no' | 'breaks' | 'yes';
  priorHighAltitude: 'never' | 'once' | 'multiple';
  weeklyHiking: 'rarely' | 'sometimes' | 'regular';
};

export type FitnessAssessmentResult = {
  score: number;
  level: FitnessLevel;
  tips: string[];
};

const SCORE = {
  exerciseDays: { '0-1': 0, '2-3': 8, '4-5': 16, '6-7': 22 },
  jog5km: { no: 0, breaks: 10, yes: 20 },
  stairs10Floors: { no: 0, breaks: 12, yes: 18 },
  priorHighAltitude: { never: 0, once: 10, multiple: 18 },
  weeklyHiking: { rarely: 0, sometimes: 10, regular: 20 },
} as const;

function buildFitnessLevels(trekTitle: string): FitnessLevel[] {
  return [
    {
      id: 'needs-preparation',
      label: 'Needs Preparation',
      scoreMin: 0,
      scoreMax: 39,
      summary: `Your current base needs structured build-up before ${trekTitle}. Start training at least 8–10 weeks before departure.`,
      weeksRecommended: '8–10 weeks',
      readiness:
        'Focus on building daily walking habit, basic cardio, and leg strength before attempting long walks at altitude.',
      weeklyPlan: [
        'Weeks 1–2: Brisk walking 30–40 min, 5 days/week; 2 sets squats and lunges (10 reps); daily stretching 10 min',
        'Weeks 3–4: Walk 45–60 min with incline or stairs; jog-walk 2 km, 3 days/week; core planks 3 × 30 sec',
        'Weeks 5–6: Stair climbing 15–20 min, 4 days/week; jog 3–4 km with breaks; add step-ups 3 × 12',
        'Weeks 7–8: Weekend hike 3–4 hours with light backpack; jog 4–5 km; balance drills on uneven ground',
        'Weeks 9–10: Simulate trek days — 5–6 hour walks; practice with 6–8 kg daypack; hydrate 3 L daily',
      ],
      focusAreas: ['Daily walking habit', 'Basic cardio', 'Leg and core strength', 'Hydration discipline'],
      warnings: [
        'Consult a doctor if you have heart, lung, or joint conditions before booking.',
        'Do not skip the gradual build-up — altitude and terrain will feel harder than plain-ground walks.',
      ],
    },
    {
      id: 'building-base',
      label: 'Building Base',
      scoreMin: 40,
      scoreMax: 59,
      summary: `You have a reasonable foundation. A focused 6–8 week plan will bring you to a comfortable fitness level for ${trekTitle}.`,
      weeksRecommended: '6–8 weeks',
      readiness: 'Increase endurance and backpack comfort; add hill repeats and longer weekend sessions.',
      weeklyPlan: [
        'Weeks 1–2: Jog or brisk walk 4 km, 4 days/week; stair session 20 min twice weekly; strength 3 days',
        'Weeks 3–4: Run or fast walk 5 km, 4–5 days/week; squats and lunges 3 × 15; weekend hike 2–3 hours',
        'Weeks 5–6: 5–6 hour weekend trek simulation with 7 kg pack; cycling or swimming once weekly',
        'Weeks 7–8: Two consecutive long-walk days (4–5 hrs each); Pranayama 10 min daily; taper last 3 days',
      ],
      focusAreas: ['5 km cardio consistency', 'Hill and stair training', 'Backpack adaptation', 'Breathing exercises'],
      warnings: [
        'Avoid increasing weekly volume by more than 10% to reduce injury risk.',
        'Practice layering and hydration on longer outdoor sessions.',
      ],
    },
    {
      id: 'trek-ready',
      label: 'Trek Ready',
      scoreMin: 60,
      scoreMax: 79,
      summary: `You are close to the fitness level most ${trekTitle} participants need. Refine endurance and altitude habits over 4–6 weeks.`,
      weeksRecommended: '4–6 weeks',
      readiness: 'Maintain cardio, add terrain simulation where possible, and prioritise recovery and hydration.',
      weeklyPlan: [
        'Weeks 1–2: Run 5–7 km, 4 days/week; strength maintenance 2 days; one 4-hour hike with pack',
        'Weeks 3–4: Back-to-back walking days (5 hrs + 4 hrs); stair intervals; yoga or mobility daily',
        'Weeks 5–6: Peak week — 6-hour hike with trek-weight pack; then reduce volume 30% before departure',
      ],
      focusAreas: ['Multi-hour endurance', 'Pack-weight comfort', 'Flexibility in cold', 'Altitude hydration'],
      warnings: [
        'Do not overtrain in the final week — rest helps performance at altitude.',
        'Report any persistent breathlessness to your trek leader on Day 1.',
      ],
    },
    {
      id: 'strong-ready',
      label: 'Strong & Ready',
      scoreMin: 80,
      scoreMax: 100,
      summary: `Your fitness profile is strong for ${trekTitle}. Maintain conditioning and focus on altitude-specific habits.`,
      weeksRecommended: '2–4 weeks',
      readiness: 'Keep weekly cardio and one long hike; emphasise recovery, sleep, and hydration before travel.',
      weeklyPlan: [
        'Weeks 1–2: Maintain 5–7 km runs or equivalent, 3–4 days/week; one 5–6 hour hike with full daypack',
        'Weeks 3–4: Reduce intensity 20%; daily stretching; Pranayama; practice cold-weather layering on walks',
      ],
      focusAreas: ['Maintenance not overload', 'Sleep and recovery', 'Altitude hydration', 'Mental visualization'],
      warnings: [
        'Even strong trekkers can feel altitude — pace yourself on summit or long days.',
        'Avoid alcohol and heavy meals the night before the hardest day.',
      ],
    },
  ];
}

export function assessTrekFitness(
  input: FitnessAssessmentInput,
  trekTitle: string,
): FitnessAssessmentResult {
  const levels = buildFitnessLevels(trekTitle);
  const score =
    SCORE.exerciseDays[input.exerciseDays] +
    SCORE.jog5km[input.jog5km] +
    SCORE.stairs10Floors[input.stairs10Floors] +
    SCORE.priorHighAltitude[input.priorHighAltitude] +
    SCORE.weeklyHiking[input.weeklyHiking];

  const level =
    levels.find((item) => score >= item.scoreMin && score <= item.scoreMax) ?? levels[0];

  const tips: string[] = [];
  if (input.jog5km === 'no') tips.push('Add jog-walk intervals — aim for 3 km without stopping within 4 weeks.');
  if (input.stairs10Floors === 'no') tips.push('Include stair climbing or incline treadmill 3 times per week.');
  if (input.priorHighAltitude === 'never') {
    tips.push('Spend a day acclimatising at base camp before the trek starts.');
  }
  if (input.weeklyHiking === 'rarely') {
    tips.push('Schedule one long outdoor walk every weekend with your trek backpack.');
  }
  if (input.exerciseDays === '0-1') {
    tips.push('Move to at least 4 active days per week — consistency matters more than intensity early on.');
  }
  if (!tips.length) {
    tips.push('Maintain your current routine and prioritise sleep, hydration, and a gradual taper before departure.');
  }

  return { score, level, tips };
}

export function fitnessLevelForScore(score: number, trekTitle: string): FitnessLevel {
  const levels = buildFitnessLevels(trekTitle);
  return levels.find((item) => score >= item.scoreMin && score <= item.scoreMax) ?? levels[0];
}
