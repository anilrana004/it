import { treks, trekDetailPath, type Trek } from '@/lib/data';
import { getMonthlyBatches, type BatchStatus } from '@/lib/batches';
import { trekCover, trekOriginalPrice, trekPrice, isExpedition } from '@/lib/catalog';
import { SPECIAL_PROGRAMS, type SpecialProgramId } from '@/lib/special-programs-content';
import { photos } from '@/lib/media';

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const DIFFICULTIES = [
  'Easy',
  'Easy to Moderate',
  'Moderate',
  'Moderate-Difficult',
  'Difficult',
] as const;

export type SeasonId = 'spring' | 'summer' | 'monsoon' | 'autumn' | 'winter';

export const SEASONS: { id: SeasonId; label: string; months: number[] }[] = [
  { id: 'spring', label: 'Spring', months: [2, 3, 4] },
  { id: 'summer', label: 'Summer', months: [4, 5] },
  { id: 'monsoon', label: 'Monsoon', months: [6, 7, 8] },
  { id: 'autumn', label: 'Autumn', months: [8, 9, 10] },
  { id: 'winter', label: 'Winter', months: [11, 0, 1, 2, 3] },
];

export const DURATIONS = [
  { id: '2-3', label: '2–3 days', test: (d: number) => d >= 2 && d <= 3 },
  { id: '4', label: '4 days', test: (d: number) => d === 4 },
  { id: '5', label: '5 days', test: (d: number) => d === 5 },
  { id: '6', label: '6 days', test: (d: number) => d === 6 },
  { id: '7+', label: '7+ days', test: (d: number) => d >= 7 },
] as const;

export const REGIONS: { id: Trek['region']; label: string }[] = [
  { id: 'uttarakhand', label: 'Uttarakhand' },
  { id: 'himachal', label: 'Himachal Pradesh' },
  { id: 'kashmir', label: 'Jammu & Kashmir' },
  { id: 'nepal', label: 'Nepal' },
];

export const EXPERIENCES: { id: SpecialProgramId; label: string }[] = [
  { id: 'beginner', label: 'Beginner Treks' },
  { id: 'family', label: 'Family Treks' },
  { id: 'women-only', label: 'Women-Only Treks' },
  { id: 'senior-citizen', label: 'Senior Treks' },
];

const MONTH_ALIASES: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

/** Expand "July - September" / "Mar-May, Oct-Nov" into month indexes. */
export function monthsFromSeasonText(text: string): number[] {
  const lower = text.toLowerCase();
  const found: number[] = [];
  const tokens = lower.split(/[^a-z]+/).filter(Boolean);

  for (let i = 0; i < tokens.length; i++) {
    const a = MONTH_ALIASES[tokens[i]];
    if (a === undefined) continue;
    const b = MONTH_ALIASES[tokens[i + 1]];
    if (b !== undefined) {
      // range a..b wrapping year if needed (e.g. Dec–Apr)
      if (a <= b) {
        for (let m = a; m <= b; m++) found.push(m);
      } else {
        for (let m = a; m <= 11; m++) found.push(m);
        for (let m = 0; m <= b; m++) found.push(m);
      }
      i += 1;
    } else {
      found.push(a);
    }
  }

  return [...new Set(found)];
}

function seasonsForMonths(months: number[]): SeasonId[] {
  return SEASONS.filter((s) => s.months.some((m) => months.includes(m))).map((s) => s.id);
}

export type ListingBatch = {
  label: string;
  monthLabel: string;
  status: BatchStatus;
  startDate: string;
};

export type ListingTrek = {
  id: string;
  title: string;
  subtitle: string;
  state: string;
  region: Trek['region'];
  difficulty: Trek['difficulty'];
  days: number;
  duration: string;
  maxAltitude: string;
  distance: string;
  bestSeason: string;
  rating: string;
  reviewCount: string;
  price: number;
  origPrice: number;
  cover: string;
  href: string;
  badge?: string;
  openMonths: number[];
  seasons: SeasonId[];
  experiences: SpecialProgramId[];
  batches: ListingBatch[];
};

export function toListingTrek(trek: Trek): ListingTrek {
  const openMonths = monthsFromSeasonText(trek.bestSeason);
  const experiences = SPECIAL_PROGRAMS.filter((p) => p.filter(trek)).map((p) => p.id);
  const batches = getMonthlyBatches(trek, 4).map((b) => ({
    label: b.label,
    monthLabel: b.monthLabel,
    status: b.status,
    startDate: b.startDate,
  }));

  return {
    id: trek.id,
    title: trek.title,
    subtitle: trek.subtitle,
    state: trek.state,
    region: trek.region,
    difficulty: trek.difficulty,
    days: trek.days,
    duration: trek.duration,
    maxAltitude: trek.maxAltitude,
    distance: trek.distance,
    bestSeason: trek.bestSeason,
    rating: trek.rating,
    reviewCount: trek.reviewCount,
    price: trekPrice(trek),
    origPrice: trekOriginalPrice(trek),
    cover: trekCover(trek),
    href: trekDetailPath(trek),
    badge: trek.badge,
    openMonths: openMonths.length ? openMonths : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    seasons: seasonsForMonths(openMonths),
    experiences,
    batches,
  };
}

export function getAllListingTreks(): ListingTrek[] {
  return treks
    .filter((t) => t.type === 'trek' && !isExpedition(t))
    .map(toListingTrek)
    .sort((a, b) => Number(b.rating) - Number(a.rating) || a.title.localeCompare(b.title));
}

export type TopCategory = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
  countLabel: string;
};

function altitudeFt(maxAltitude: string) {
  const n = parseInt(maxAltitude.replace(/[^\d]/g, ''), 10);
  return Number.isFinite(n) ? n : 0;
}

export function getTopCategories(listings: ListingTrek[]): TopCategory[] {
  const easy = listings.filter(
    (t) => t.difficulty === 'Easy' || t.difficulty === 'Easy to Moderate',
  ).length;
  const high = listings.filter((t) => altitudeFt(t.maxAltitude) >= 14000).length;
  const autumn = listings.filter((t) => t.seasons.includes('autumn')).length;
  const winter = listings.filter((t) => t.seasons.includes('winter')).length;
  const uk = listings.filter((t) => t.region === 'uttarakhand').length;
  const hp = listings.filter((t) => t.region === 'himachal').length;

  return [
    {
      id: 'autumn-top',
      title: 'Top Treks in Sep–Nov',
      subtitle: 'Clear skies & classic autumn trails',
      href: '/treks?season=autumn',
      image: photos.vof,
      countLabel: `${autumn} treks`,
    },
    {
      id: 'beginners',
      title: 'Best for Beginners',
      subtitle: 'Gentle climbs, big mountain views',
      href: '/treks?experience=beginner',
      image: photos.triund,
      countLabel: `${easy}+ treks`,
    },
    {
      id: 'high',
      title: 'Treks Above 14,000 ft',
      subtitle: 'Passes, glaciers & high camps',
      href: '/treks?difficulty=Moderate-Difficult',
      image: photos.hampta,
      countLabel: `${high} treks`,
    },
    {
      id: 'winter',
      title: 'Top Winter Treks',
      subtitle: 'Dec · Jan · Feb snow trails',
      href: '/treks?season=winter',
      image: photos.snow,
      countLabel: `${winter} options`,
    },
    {
      id: 'uttarakhand',
      title: 'Uttarakhand Treks',
      subtitle: 'Land of Gods & alpine meadows',
      href: '/treks?region=uttarakhand',
      image: photos.uttarakhand,
      countLabel: `${uk} treks`,
    },
    {
      id: 'himachal',
      title: 'Himachal Adventures',
      subtitle: 'Passes, lakes & pine forests',
      href: '/treks?region=himachal',
      image: photos.himachal,
      countLabel: `${hp} treks`,
    },
  ];
}

export function difficultyTone(diff: string) {
  if (diff === 'Easy') return 'bg-emerald-50 text-emerald-800 border-emerald-200';
  if (diff === 'Easy to Moderate') return 'bg-lime-50 text-lime-800 border-lime-200';
  if (diff === 'Moderate') return 'bg-amber-50 text-amber-800 border-amber-200';
  if (diff === 'Moderate-Difficult') return 'bg-orange-50 text-orange-800 border-orange-200';
  return 'bg-rose-50 text-rose-800 border-rose-200';
}

export type CuratedSection = {
  id: string;
  title: string;
  info: string;
  href: string;
  trekIds?: string[];
  filter?: (t: ListingTrek) => boolean;
};

/** Featured autumn treks — editorial pick for Sep–Nov departures. */
export const AUTUMN_TOP_TREK_IDS = [
  'har-ki-dun',
  'phulara-ridge',
  'chopta-tungnath',
  'bali-pass',
  'roopkund',
  'hampta-pass',
  'gulabi-kantha',
  'gaumukh-tapovan',
  'nag-tibba',
  'ali-bedni-bugyal',
] as const;

/** Per-month display order — varied so each autumn month feels fresh in filters. */
export const AUTUMN_MONTH_ORDERS: Record<number, readonly string[]> = {
  8: [
    'nag-tibba',
    'har-ki-dun',
    'phulara-ridge',
    'chopta-tungnath',
    'gulabi-kantha',
    'ali-bedni-bugyal',
    'hampta-pass',
    'roopkund',
    'bali-pass',
    'gaumukh-tapovan',
  ],
  9: [
    'hampta-pass',
    'roopkund',
    'bali-pass',
    'gaumukh-tapovan',
    'phulara-ridge',
    'har-ki-dun',
    'chopta-tungnath',
    'ali-bedni-bugyal',
    'gulabi-kantha',
    'nag-tibba',
  ],
  10: [
    'gulabi-kantha',
    'ali-bedni-bugyal',
    'har-ki-dun',
    'phulara-ridge',
    'chopta-tungnath',
    'nag-tibba',
    'bali-pass',
    'gaumukh-tapovan',
    'hampta-pass',
    'roopkund',
  ],
};

/** Editorial sections inspired by Indiahikes upcoming-treks — Indian Treks content. */
export const CURATED_SECTIONS: CuratedSection[] = [
  {
    id: 'autumn',
    title: 'Top Treks in September, October & November',
    info:
      'Autumn is one of the most loved trekking seasons in the Indian Himalayas — clear skies, crisp air, and dust-free trails. Har Ki Dun, Phulara Ridge, Chopta–Chandrashila, Bali Pass, Roopkund, Hampta Pass, Gulabi Kantha, Gaumukh–Tapovan, Nag Tibba, and Ali–Bedni Bugyal are our top picks for Sep–Nov.',
    href: '/treks?season=autumn',
    trekIds: [...AUTUMN_TOP_TREK_IDS],
  },
  {
    id: 'beginners',
    title: 'Best Treks for Beginners',
    info:
      'These treks are perfect if you are stepping into the Himalayas for the first time. Well-paced trails, gentle climbs, and strong trail support make them ideal for first-timers, families, and anyone building confidence outdoors.',
    href: '/treks?experience=beginner',
    filter: (t) => t.experiences.includes('beginner'),
  },
  {
    id: 'high-altitude',
    title: 'Treks Above 14,000 ft',
    info:
      'There is a thrill that only very high altitudes can offer — raw terrain, pass crossings, and big mountain amphitheatres. These 14,000-ft+ routes need fitness and acclimatisation, and reward you with unforgettable Himalayan drama.',
    href: '/treks?difficulty=Moderate-Difficult',
    filter: (t) => altitudeFt(t.maxAltitude) >= 14000,
  },
  {
    id: 'summits',
    title: 'Best Summit Climbs',
    info:
      'The Himalayas are gifted with terrific summit climbs — some for beginners, some for seasoned trekkers. Standing on a summit ridge with 360° views gives a sense of accomplishment few other trails can match.',
    href: '/treks?experience=beginner',
    trekIds: [
      'kedarkantha',
      'chopta-tungnath',
      'kuari-pass',
      'dayara-bugyal',
      'bhrigu-lake',
      'nag-tibba',
    ],
  },
  {
    id: 'winter',
    title: 'Top Treks in December, January & February',
    info:
      'Winter trekking in the Indian Himalayas has become a mainstream favourite. Snow trails, frozen meadows, and clear ridgeline views make Kedarkantha, Kuari Pass, and Chopta standout choices in peak winter.',
    href: '/treks?season=winter',
    filter: (t) => t.seasons.includes('winter') || t.openMonths.some((m) => [11, 0, 1, 2].includes(m)),
  },
  {
    id: 'himachal',
    title: 'Himachal Pass & Lake Treks',
    info:
      'From dramatic crossovers like Hampta Pass to pine-scented weekends around Triund and Kheerganga, Himachal offers some of India’s most accessible adventure trails with reliable road heads and year-round departures.',
    href: '/treks?region=himachal',
    filter: (t) => t.region === 'himachal',
  },
];

export function resolveCuratedTreks(
  section: CuratedSection,
  all: ListingTrek[],
  options?: { limit?: number; month?: number | null },
) {
  const limit = options?.limit ?? 8;
  const month = options?.month ?? null;

  let list: ListingTrek[];
  let preserveOrder = false;

  if (section.id === 'autumn') {
    const order =
      month !== null && AUTUMN_MONTH_ORDERS[month]
        ? AUTUMN_MONTH_ORDERS[month]
        : AUTUMN_TOP_TREK_IDS;
    const map = new Map(all.map((t) => [t.id, t]));
    list = order.map((id) => map.get(id)).filter(Boolean) as ListingTrek[];
    preserveOrder = true;
  } else if (section.trekIds?.length) {
    const map = new Map(all.map((t) => [t.id, t]));
    list = section.trekIds.map((id) => map.get(id)).filter(Boolean) as ListingTrek[];
    preserveOrder = true;
  } else if (section.filter) {
    list = all.filter(section.filter);
  } else {
    list = all;
  }

  if (preserveOrder) {
    return list.slice(0, limit);
  }

  return list
    .slice()
    .sort((a, b) => Number(b.rating) - Number(a.rating))
    .slice(0, limit);
}

export type InfoBanner = {
  id: string;
  text: string;
  href: string;
  cta: string;
};

export const INFO_BANNERS: InfoBanner[] = [
  {
    id: 'kedarkantha',
    text:
      'Kedarkantha winter batches are open for Dec–Apr. It remains one of India’s finest beginner summit climbs with 360° Himalayan views.',
    href: '/treks/kedarkantha',
    cta: 'View trek & dates',
  },
  {
    id: 'vof',
    text:
      'Valley of Flowers is a UNESCO Himalayan classic — alpine meadows, rare flora, and snow peaks. Ideal for monsoon–early autumn departures.',
    href: '/treks/valley-of-flowers',
    cta: 'View trek & register',
  },
  {
    id: 'hampta',
    text:
      'Hampta Pass is one of the most dramatic crossover treks in Himachal — lush Kullu on one side, barren Spiti on the other.',
    href: '/treks/hampta-pass',
    cta: 'View dates',
  },
];
