import { photos } from '@/lib/media';

export type SacredYatraGroupId = 'classic-dham' | 'temple-circuits' | 'panch-kedar';

export type SacredYatraTrip = {
  id: string;
  /** Catalog / detail route id */
  slug: string;
  groupId: SacredYatraGroupId;
  title: string;
  subtitle?: string;
  pickup: string;
  duration: string;
  season?: string;
  price: number;
  badge?: string;
  cover: string;
};

export type SacredYatraGroup = {
  id: SacredYatraGroupId;
  name: string;
  shortName: string;
  cardTitle: string;
  cardBlurb: string;
  sectionTitle: string;
  sectionIntro: string;
  cover: string;
};

export const sacredYatraGroups: SacredYatraGroup[] = [
  {
    id: 'classic-dham',
    name: 'Classic Dham Yatras',
    shortName: 'Dham Yatras',
    cardTitle: 'Classic Dhams',
    cardBlurb: 'Char Dham, Do Dham & Kedarnath pilgrimages',
    sectionTitle: 'Classic Dham Yatras',
    sectionIntro:
      'Time-honoured Himalayan pilgrimages to the most sacred shrines of Uttarakhand — planned with care, paced with devotion.',
    cover: photos.yatra,
  },
  {
    id: 'temple-circuits',
    name: 'Temple Circuits',
    shortName: 'Circuits',
    cardTitle: 'Temple Circuits',
    cardBlurb: 'Kedarnath, Badrinath, Chopta & Tungnath combined',
    sectionTitle: 'Kedarnath · Chopta · Tungnath Circuits',
    sectionIntro:
      'Blend darshan with soft mountain scenery — Kedarnath and Badrinath with Chopta meadows and Tungnath.',
    cover: photos.chopta,
  },
  {
    id: 'panch-kedar',
    name: 'Panch Kedar',
    shortName: 'Panch Kedar',
    cardTitle: 'Panch Kedar',
    cardBlurb: 'Five sacred abodes of Lord Shiva',
    sectionTitle: 'Panch Kedar Yatra',
    sectionIntro:
      'A deeper Shiva circuit through Kedarnath, Tungnath, Rudranath, Madhyamaheshwar and Kalpeshwar — quieter trails, lasting devotion.',
    cover: photos.kedarnath,
  },
];

/** Spiritual trips shown on the Sacred Yatra landing — display titles as requested. */
export const sacredYatraTrips: SacredYatraTrip[] = [
  {
    id: 'char-dham',
    slug: 'char-dham',
    groupId: 'classic-dham',
    title: 'Char Dham Yatra',
    subtitle: 'Yamunotri · Gangotri · Kedarnath · Badrinath',
    pickup: 'Rishikesh to Rishikesh',
    duration: '8N/9D',
    season: 'May – Oct',
    price: 20499,
    badge: 'Complete Circuit',
    cover: photos.yatra,
  },
  {
    id: 'do-dham',
    slug: 'do-dham',
    groupId: 'classic-dham',
    title: 'Do Dham Yatra',
    subtitle: 'Kedarnath · Badrinath',
    pickup: 'Rishikesh to Rishikesh',
    duration: '4N/5D',
    season: 'May – Oct',
    price: 15499,
    badge: 'Popular',
    cover: photos.yatra,
  },
  {
    id: 'kedarnath-yatra',
    slug: 'kedarnath-yatra',
    groupId: 'classic-dham',
    title: 'Kedarnath Yatra',
    subtitle: 'The sacred Jyotirlinga pilgrimage',
    pickup: 'Rishikesh to Rishikesh',
    duration: '3N/4D',
    season: 'May – Oct',
    price: 10499,
    cover: photos.kedarnath,
  },
  {
    id: 'kedarnath-badrinath-chopta',
    slug: 'do-dham-chopta',
    groupId: 'temple-circuits',
    title: 'Kedarnath Badrinath Chopta Tungnath Trip',
    subtitle: 'Do Dham with Chopta & Tungnath',
    pickup: 'Haridwar / Rishikesh',
    duration: '5N/6D',
    season: 'May – Oct',
    price: 17499,
    badge: 'Best Value',
    cover: photos.chopta,
  },
  {
    id: 'kedarnath-chopta-tungnath',
    slug: 'kedarnath-chopta',
    groupId: 'temple-circuits',
    title: 'Kedarnath Chopta Tungnath Trip',
    subtitle: 'Kedarnath darshan with Chopta meadows',
    pickup: 'Haridwar / Rishikesh',
    duration: '4N/5D',
    season: 'May – Oct',
    price: 13999,
    cover: photos.kedarnath,
  },
  {
    id: 'panch-kedar',
    slug: 'panch-kedar',
    groupId: 'panch-kedar',
    title: 'Panch Kedar',
    subtitle: 'Kedarnath · Tungnath · Rudranath · Madhyamaheshwar · Kalpeshwar',
    pickup: 'Rishikesh to Rishikesh',
    duration: '10N/11D',
    season: 'May – Oct',
    price: 27999,
    badge: 'Sacred Trek',
    cover: photos.kedarnath,
  },
];

export const sacredYatraWhyPoints = [
  'Experienced yatra leaders',
  'Temple logistics handled',
  'Comfortable stays on route',
  'Safe group travel',
  'Flexible trek / helicopter options',
  'Devotion-first pacing',
] as const;

export const sacredYatraDiscoveryOptions = [
  {
    id: 'complete',
    label: 'I want the complete Char Dham',
    targetGroupId: 'classic-dham' as SacredYatraGroupId,
    whatsappHint: 'looking for Char Dham Yatra',
  },
  {
    id: 'short',
    label: 'I want a shorter yatra',
    targetGroupId: 'classic-dham' as SacredYatraGroupId,
    whatsappHint: 'looking for a shorter yatra like Kedarnath or Do Dham',
  },
  {
    id: 'chopta',
    label: 'I want Chopta & Tungnath with darshan',
    targetGroupId: 'temple-circuits' as SacredYatraGroupId,
    whatsappHint: 'looking for Kedarnath Chopta Tungnath packages',
  },
  {
    id: 'panch',
    label: 'I want the full Panch Kedar',
    targetGroupId: 'panch-kedar' as SacredYatraGroupId,
    whatsappHint: 'looking for Panch Kedar Yatra',
  },
] as const;

export const sacredYatraStickyNav = [
  { id: 'explore-yatra', label: 'Spiritual' },
  ...sacredYatraGroups.map((g) => ({ id: g.id, label: g.shortName })),
] as const;

export function tripsForYatraGroup(groupId: SacredYatraGroupId): SacredYatraTrip[] {
  return sacredYatraTrips.filter((t) => t.groupId === groupId);
}

export function sacredYatraDetailHref(trip: SacredYatraTrip): string {
  return `/yatra/${trip.slug}`;
}
