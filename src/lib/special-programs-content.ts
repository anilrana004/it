import { treks, type Trek } from '@/lib/data';
import { photos } from '@/lib/media';

export type SpecialProgramId =
  | 'women-only'
  | 'senior-citizen'
  | 'family'
  | 'beginner';

export type SpecialProgram = {
  id: SpecialProgramId;
  slug: string;
  title: string;
  shortTitle: string;
  href: string;
  icon: string;
  heroImage: string;
  eyebrow: string;
  lead: string;
  highlights: string[];
  filter: (trek: Trek) => boolean;
};

function altitudeFt(maxAltitude: string) {
  const n = parseInt(maxAltitude.replace(/[^\d]/g, ''), 10);
  return Number.isFinite(n) ? n : 99999;
}

const isEasy = (t: Trek) =>
  t.difficulty === 'Easy' || t.difficulty === 'Easy to Moderate';

const isTrek = (t: Trek) => t.type === 'trek';

/** Curated picks that work well for each audience — merged with rule-based filters */
const CURATED: Record<SpecialProgramId, string[]> = {
  'women-only': [
    'kedarkantha',
    'kuari-pass',
    'hampta-pass',
    'valley-of-flowers',
    'chopta-tungnath',
    'nag-tibba',
    'kheerganga',
    'bhrigu-lake',
  ],
  'senior-citizen': [
    'chopta-tungnath',
    'nag-tibba',
    'mcleodganj-trek',
    'kheerganga',
    'kedarnath-yatra',
    'badrinath-yatra',
  ],
  family: [
    'kedarkantha',
    'chopta-tungnath',
    'valley-of-flowers',
    'hampta-pass',
    'mcleodganj-trek',
    'nag-tibba',
    'kheerganga',
  ],
  beginner: [
    'nag-tibba',
    'kheerganga',
    'mcleodganj-trek',
    'chopta-tungnath',
    'kedarkantha',
    'dayara-bugyal',
  ],
};

export const SPECIAL_PROGRAMS: SpecialProgram[] = [
  {
    id: 'women-only',
    slug: 'women-only-treks',
    title: 'Women-Only Treks',
    shortTitle: 'Women-Only',
    href: '/women-only-treks',
    icon: 'fa-venus',
    heroImage: photos.kedarkantha,
    eyebrow: 'Safe & supportive groups',
    lead:
      'Women-led Himalayan departures with trained trek leaders, clear safety culture, and a welcoming trail community — popular with solo travellers and first-time women trekkers.',
    highlights: [
      'Women-friendly camp and briefing protocols',
      'Supportive groups for solo travellers',
      'Clear pace planning and safety checkpoints',
    ],
    filter: (t) =>
      isTrek(t) &&
      (CURATED['women-only'].includes(t.id) ||
        (isEasy(t) && t.days <= 7 && altitudeFt(t.maxAltitude) <= 14500)),
  },
  {
    id: 'senior-citizen',
    slug: 'senior-citizen-treks',
    title: 'Senior Citizen Treks',
    shortTitle: 'Senior Treks',
    href: '/senior-citizen-treks',
    icon: 'fa-person-cane',
    heroImage: photos.chopta,
    eyebrow: 'Comfortable pacing',
    lead:
      'Gentle Himalayan routes with conservative altitude gain, comfortable stays, and extra rest built into the itinerary for travellers 50+.',
    highlights: [
      'Shorter walking days where possible',
      'Lower-altitude and yatra-friendly options',
      'Helicopter / pony segments on select yatras',
    ],
    filter: (t) =>
      isTrek(t) &&
      (CURATED['senior-citizen'].includes(t.id) ||
        (isEasy(t) && t.days <= 6 && altitudeFt(t.maxAltitude) <= 12500)),
  },
  {
    id: 'family',
    slug: 'family-treks',
    title: 'Family Treks',
    shortTitle: 'Family',
    href: '/family-treks',
    icon: 'fa-people-roof',
    heroImage: photos.vof,
    eyebrow: 'Kids & parents welcome',
    lead:
      'School-holiday and weekend-friendly Himalayan treks with manageable trails, engaging scenery, and stays suited for parents and children travelling together.',
    highlights: [
      'Age-aware route recommendations',
      'Nutritious meals and hygienic camps',
      'Shared milestones the whole family can celebrate',
    ],
    filter: (t) =>
      isTrek(t) &&
      (CURATED.family.includes(t.id) ||
        (isEasy(t) && t.days <= 7 && altitudeFt(t.maxAltitude) <= 14000)),
  },
  {
    id: 'beginner',
    slug: 'beginner-friendly-treks',
    title: 'Beginner-Friendly Treks',
    shortTitle: 'Beginner',
    href: '/beginner-friendly-treks',
    icon: 'fa-seedling',
    heroImage: photos.triund,
    eyebrow: 'First Himalayan trek',
    lead:
      'Start your Himalayan journey on well-marked trails with gradual climbs, shorter days, and departures our leaders love recommending to first-timers.',
    highlights: [
      'Easy & easy-to-moderate grades',
      'Clear pre-trek fitness guidance',
      'Ideal stepping stones before higher adventures',
    ],
    filter: (t) =>
      isTrek(t) &&
      (CURATED.beginner.includes(t.id) ||
        (t.difficulty === 'Easy' || (isEasy(t) && t.days <= 5))),
  },
];

export function getSpecialProgram(id: SpecialProgramId) {
  return SPECIAL_PROGRAMS.find((p) => p.id === id);
}

export function getSpecialProgramBySlug(slug: string) {
  return SPECIAL_PROGRAMS.find((p) => p.slug === slug);
}

export function treksForProgram(program: SpecialProgram) {
  const matched = treks.filter(program.filter);
  const seen = new Set<string>();
  return matched.filter((t) => {
    if (seen.has(t.id)) return false;
    seen.add(t.id);
    return true;
  });
}
