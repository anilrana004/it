import type { TrekRichSection } from '@/lib/content/treks/types';

export const KEDARKANTHA_FITNESS_SECTION: TrekRichSection = {
  id: 'fitness',
  kicker: 'Prepare Well',
  title: 'Fitness Required For Kedarkantha Trek',
  intro:
    'Kedarkantha is beginner-friendly but still demands stamina for 4–6 hour walking days at up to 12,500 ft. Prepare at least a month in advance.',
  blocks: [
    {
      type: 'h3',
      text: 'Why Is Fitness Key?',
    },
    {
      type: 'p',
      text: 'At 12,500 ft oxygen levels drop and cold weather adds challenge. Cardiovascular endurance helps you adjust and avoid fatigue or altitude-related illness.',
    },
    {
      type: 'h3',
      text: 'Cardiovascular Endurance',
    },
    {
      type: 'ul',
      items: [
        'Running or jogging: 5–7 km at moderate pace, 4–5 times a week',
        'Cycling: strengthens legs and lung capacity',
        'Swimming: improves stamina and breathing efficiency',
        'Stair climbing: prepares legs for steep ascents and descents',
      ],
    },
    {
      type: 'h3',
      text: 'Strength and Muscle Endurance',
    },
    {
      type: 'ul',
      items: [
        'Leg strength: squats, lunges, step-ups (3 sets of 15 reps)',
        'Core stability: planks, crunches, leg raises',
        'Upper body: push-ups, shoulder presses for backpack carrying',
        'Balance: one-leg stands and stability exercises',
      ],
    },
    {
      type: 'h3',
      text: 'Flexibility and Mental Preparation',
    },
    {
      type: 'ul',
      items: [
        'Hamstring and calf stretches; hip openers; daily yoga 10–15 minutes',
        'Visualize the trek; practice Pranayama for lung capacity',
        'Stay hydrated (3–4 litres daily); avoid alcohol and smoking before the trek',
      ],
    },
  ],
};
