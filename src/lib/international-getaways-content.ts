import { photos } from '@/lib/media';

export type InternationalTrip = {
  id: string;
  /** Detail route when available */
  slug?: string;
  title: string;
  subtitle?: string;
  pickup: string;
  duration: string;
  season?: string;
  price: number;
  badge?: string;
  cover: string;
};

export const internationalTrips: InternationalTrip[] = [
  {
    id: 'everest-base-camp',
    slug: 'everest-base-camp',
    title: 'Everest Base Camp',
    subtitle: 'Walk to the base of the world’s highest peak',
    pickup: 'Kathmandu to Kathmandu',
    duration: '15N/16D',
    season: 'Mar – May · Sep – Nov',
    price: 75000,
    badge: 'Bucket List',
    cover: photos.ebc,
  },
  {
    id: 'annapurna-base-camp',
    slug: 'annapurna-base-camp',
    title: 'Annapurna Base Camp Trek',
    subtitle: 'Into the Annapurna Sanctuary',
    pickup: 'Kathmandu to Kathmandu',
    duration: '12N/13D',
    season: 'Mar – May · Sep – Nov',
    price: 70000,
    badge: 'Popular',
    cover: photos.nepal,
  },
  {
    id: 'annapurna-circuit',
    title: 'Annapurna Circuit Trek',
    subtitle: 'Classic high-pass circuit around Annapurna',
    pickup: 'Kathmandu to Kathmandu',
    duration: '14N/15D',
    season: 'Mar – May · Sep – Nov',
    price: 85000,
    badge: 'Epic Circuit',
    cover: photos.himachal,
  },
];

export const internationalWhyPoints = [
  'Experienced Nepal trek leaders',
  'Permits & logistics handled',
  'Tea-house / lodge stays planned',
  'Acclimatisation-first itineraries',
  'Small supportive groups',
  'Easy planning from India',
] as const;

export const internationalDiscoveryOptions = [
  {
    id: 'ebc',
    label: 'I want Everest Base Camp',
    tripId: 'everest-base-camp',
    whatsappHint: 'looking for Everest Base Camp Trek',
  },
  {
    id: 'abc',
    label: 'I want Annapurna Base Camp',
    tripId: 'annapurna-base-camp',
    whatsappHint: 'looking for Annapurna Base Camp Trek',
  },
  {
    id: 'circuit',
    label: 'I want Annapurna Circuit',
    tripId: 'annapurna-circuit',
    whatsappHint: 'looking for Annapurna Circuit Trek',
  },
  {
    id: 'first',
    label: 'Help me choose my first Nepal trek',
    tripId: 'annapurna-base-camp',
    whatsappHint: 'a first-timer looking for the right Nepal trek',
  },
] as const;

export const internationalStickyNav = [
  { id: 'explore-international', label: 'International' },
  { id: 'international-treks', label: 'Nepal Treks' },
] as const;

export function internationalTripHref(trip: InternationalTrip): string {
  if (trip.slug) return `/treks/${trip.slug}`;
  return '';
}

export function internationalTripWhatsappMsg(trip: InternationalTrip): string {
  const route = trip.subtitle ? ` (${trip.subtitle})` : '';
  return `Hi Indian Treks! I'm interested in "${trip.title}"${route} — ${trip.duration}, starting from ₹${trip.price.toLocaleString('en-IN')}. Please share dates and details.`;
}
