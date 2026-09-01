import type { Trek } from '@/lib/data';
import { packingGroups } from '@/lib/trek-detail-content';
import type { TrekExtendedContent, TrekRichSection } from '@/lib/content/treks/types';

function buildFitnessSection(trek: Trek): TrekRichSection {
  const kind = trek.type === 'yatra' ? 'pilgrimage' : 'trek';
  return {
    id: 'fitness',
    kicker: 'Prepare Well',
    title: `${trek.title} Fitness Requirements`,
    intro: `A ${trek.difficulty.toLowerCase()} ${kind} reaching ${trek.maxAltitude} needs consistent cardio, leg strength, and altitude awareness. Use the calculator below for a personalised training plan.`,
    blocks: [
      {
        type: 'p',
        text: `Plan ${trek.duration} of trail time with daily walking between 4–8 hours depending on the stage. Build endurance gradually over 6–10 weeks before departure.`,
      },
      {
        type: 'h3',
        text: 'Cardio & endurance',
      },
      {
        type: 'ul',
        items: [
          'Brisk walking or jogging 4–5 days per week',
          'Stair climbing or incline treadmill sessions twice weekly',
          'One long outdoor walk or hike every weekend with a light backpack',
        ],
      },
      {
        type: 'h3',
        text: 'Strength & flexibility',
      },
      {
        type: 'ul',
        items: [
          'Squats, lunges, step-ups, and planks — 3 sets of 12–15 reps',
          'Daily stretching or yoga for 10–15 minutes',
          'Core work to stabilise your pack on uneven terrain',
        ],
      },
      {
        type: 'h3',
        text: 'Altitude readiness',
      },
      {
        type: 'ul',
        items: [
          `Maximum altitude on this ${kind}: ${trek.maxAltitude}`,
          'Hydrate 3–4 litres daily during training',
          'Avoid alcohol and heavy meals in the final 48 hours before departure',
        ],
      },
    ],
  };
}

function buildSafetySection(trek: Trek): TrekRichSection {
  return {
    id: 'safety',
    kicker: 'Stay Safe',
    title: 'Safety Precautions and Protocols',
    intro: `Essential safety measures for ${trek.title} — from acclimatization to weather awareness and emergency protocols.`,
    blocks: [
      {
        type: 'h3',
        text: 'Acclimatization',
      },
      {
        type: 'ul',
        items: [
          'Spend time at the base camp or starting point before ascending',
          'Follow “climb high, sleep low” with short acclimatization hikes',
          'Walk slowly; report headache, nausea, or dizziness to your trek leader immediately',
        ],
      },
      {
        type: 'h3',
        text: 'Weather preparedness',
      },
      {
        type: 'ul',
        items: [
          'Check the forecast; delay if heavy rain, snowfall, or storms are predicted',
          'Carry waterproof jacket, poncho, and rain cover for your pack',
          'Start early; reach camp before afternoon weather shifts',
        ],
      },
      {
        type: 'h3',
        text: 'Hydration and nutrition',
      },
      {
        type: 'ul',
        items: [
          'Drink regularly even when you do not feel thirsty',
          'Eat balanced meals; carry energy snacks for long trail days',
          'Avoid alcohol at altitude — it worsens dehydration and acclimatization',
        ],
      },
      {
        type: 'h3',
        text: 'Emergency protocols',
      },
      {
        type: 'ul',
        items: [
          'Stay with your group and follow trek leader instructions at all times',
          'Carry personal medications and share medical history with your leader',
          'Indian Treks carries a first-aid kit; serious cases are evacuated per itinerary plan',
        ],
      },
    ],
  };
}

function buildFoodSection(trek: Trek): TrekRichSection {
  return {
    id: 'food',
    kicker: 'On Trail Meals',
    title: 'Delicious & Nutritious Food During Trek',
    intro: `Fresh, high-altitude meals designed for energy and warmth on ${trek.title} — breakfast, lunch, evening snacks, and dinner prepared by experienced cooks.`,
    blocks: [
      {
        type: 'h3',
        text: 'Breakfast',
      },
      {
        type: 'ul',
        items: [
          'Beverages: ginger/masala tea, coffee, juice',
          'Indian: paratha, poha, porridge, omelettes, upma',
          'Light options: sandwiches, jam and butter',
        ],
      },
      {
        type: 'h3',
        text: 'Lunch & dinner',
      },
      {
        type: 'ul',
        items: [
          'Fresh roti, seasonal vegetable sabzi, dal, rice, and paneer dishes',
          'Hot soup and snacks on arrival at camp',
          'Vegetarian meals standard; inform us of dietary restrictions at booking',
        ],
      },
      {
        type: 'h3',
        text: 'Trail snacks',
      },
      {
        type: 'ul',
        items: [
          'Energy bars, dry fruits, and packed lunch on long walking days',
          'Electrolyte sachets recommended — carry your preferred brand',
          'Plenty of safe drinking water at camps; refill bottles each morning',
        ],
      },
    ],
  };
}

function buildWhyChooseSection(trek: Trek): TrekRichSection {
  const kind = trek.type === 'yatra' ? 'yatra' : 'trek';
  return {
    id: 'why-choose',
    kicker: 'Why Choose Us',
    title: `Why ${trek.title} with Indian Treks`,
    intro: `Trusted Himalayan operator for ${kind}s across Uttarakhand, Himachal, Nepal, and Kashmir — safety-first teams, transparent pricing, and trekkers who return season after season.`,
    blocks: [
      ...trek.highlights.slice(0, 4).map((highlight) => ({ type: 'p' as const, text: highlight })),
      {
        type: 'h3',
        text: 'What you can expect',
      },
      {
        type: 'ul',
        items: [
          `Experienced trek leaders for a ${trek.difficulty.toLowerCase()} route up to ${trek.maxAltitude}`,
          `Best season: ${trek.bestSeason}`,
          `Group size: ${trek.groupSize}`,
          `Route: ${trek.startEndPoint}`,
        ],
      },
      {
        type: 'h3',
        text: 'Indian Treks advantage',
      },
      {
        type: 'ul',
        items: [
          'Licensed operator with safety protocols and emergency evacuation planning',
          'Quality camping gear, nutritious meals, and transparent inclusions',
          'Dehradun-based support team available before and during your journey',
          'Flexible batch dates and dedicated customer support',
        ],
      },
    ],
  };
}

function buildPackingSection(trek: Trek): TrekRichSection {
  return {
    id: 'things-to-carry',
    kicker: 'Packing Guide',
    title: 'Things to Carry',
    intro: `Pack for two realities — warm sunshine at the base and cold nights at ${trek.maxAltitude}. Keep your pack under 10 kg; anything heavier compounds fatigue on long trail days.`,
    blocks: packingGroups.flatMap((group) => [
      { type: 'h3' as const, text: group.title },
      { type: 'ul' as const, items: group.items },
    ]),
  };
}

/** Default rich trek detail content — same UI structure as curated treks (e.g. Kedarkantha). */
export function buildDefaultTrekExtended(trek: Trek): TrekExtendedContent {
  return {
    sections: [
      buildFitnessSection(trek),
      buildSafetySection(trek),
      buildFoodSection(trek),
      buildWhyChooseSection(trek),
    ],
    packingSection: buildPackingSection(trek),
  };
}
