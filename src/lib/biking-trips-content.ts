import { photos } from '@/lib/media';

export type BikingRegionId = 'ladakh' | 'spiti';

export type BikingTrip = {
  id: string;
  regionId: BikingRegionId;
  title: string;
  subtitle?: string;
  pickup: string;
  duration: string;
  season?: string;
  price: number;
  badge?: string;
  cover: string;
};

export type BikingRegion = {
  id: BikingRegionId;
  name: string;
  shortName: string;
  cardTitle: string;
  cardBlurb: string;
  sectionTitle: string;
  sectionIntro: string;
  cover: string;
};

export const bikingRegions: BikingRegion[] = [
  {
    id: 'ladakh',
    name: 'Ladakh',
    shortName: 'Ladakh',
    cardTitle: 'Ladakh Trips',
    cardBlurb: 'High passes, deserts & iconic Himalayan highways',
    sectionTitle: 'Ladakh Bike Trips',
    sectionIntro:
      'Ride the legendary Manali–Leh and Leh circuits across high-altitude passes — with support vehicles, stays and experienced bike captains.',
    cover: photos.snow,
  },
  {
    id: 'spiti',
    name: 'Spiti Valley',
    shortName: 'Spiti',
    cardTitle: 'Spiti Valley',
    cardBlurb: 'Cold desert roads, monasteries & remote mountain villages',
    sectionTitle: 'Spiti Valley Tour',
    sectionIntro:
      'A classic Spiti bike expedition through Kaza, Key, Tabo and high Himalayan villages — built for riders who want raw landscapes and long scenic days.',
    cover: photos.himachal,
  },
];

export const bikingTrips: BikingTrip[] = [
  {
    id: 'ladakh-bike-6d',
    regionId: 'ladakh',
    title: 'Ladakh Bike Trip',
    subtitle: 'Manali · High passes · Leh circuit',
    pickup: 'Manali / Leh',
    duration: '6D/5N',
    season: 'Jun – Sep',
    price: 28999,
    badge: 'Popular Trek',
    cover: photos.snow,
  },
  {
    id: 'ladakh-bike-7d',
    regionId: 'ladakh',
    title: 'Ladakh Bike Trip',
    subtitle: 'Manali · Leh · Khardung La highlights',
    pickup: 'Manali / Leh',
    duration: '7D/6N',
    season: 'Jun – Sep',
    price: 32999,
    badge: 'Popular Trek',
    cover: photos.himachal,
  },
  {
    id: 'ladakh-bike-8d',
    regionId: 'ladakh',
    title: 'Ladakh Bike Trip',
    subtitle: 'Full high-altitude highway experience',
    pickup: 'Manali / Leh',
    duration: '8D/7N',
    season: 'Jun – Sep',
    price: 34999,
    badge: 'Popular Trek',
    cover: photos.snow,
  },
  {
    id: 'spiti-valley-tour',
    regionId: 'spiti',
    title: 'Spiti Valley Tour',
    subtitle: 'Manali · Kaza · Monasteries · Return',
    pickup: 'Manali to Manali',
    duration: '8D/7N',
    season: 'Jun – Oct',
    price: 24999,
    badge: 'Popular',
    cover: photos.himachal,
  },
];

export const bikingWhyPoints = [
  'Experienced bike marshals',
  'Support vehicle throughout',
  'Royal Enfield–ready logistics',
  'High-altitude riding briefings',
  'Curated stays on route',
  'Like-minded rider groups',
] as const;

export const bikingDiscoveryOptions = [
  {
    id: 'short-ladakh',
    label: 'I want a shorter Ladakh ride',
    targetRegionId: 'ladakh' as BikingRegionId,
    whatsappHint: 'looking for the Ladakh Bike Trip 6D/5N',
  },
  {
    id: 'full-ladakh',
    label: 'I want a longer Ladakh circuit',
    targetRegionId: 'ladakh' as BikingRegionId,
    whatsappHint: 'looking for the Ladakh Bike Trip 8D/7N',
  },
  {
    id: 'spiti',
    label: 'I want Spiti Valley',
    targetRegionId: 'spiti' as BikingRegionId,
    whatsappHint: 'looking for the Spiti Valley Tour bike trip',
  },
  {
    id: 'first-ride',
    label: 'This is my first Himalayan bike trip',
    targetRegionId: 'spiti' as BikingRegionId,
    whatsappHint: 'a first-timer looking for the right Himalayan bike trip',
  },
] as const;

export const bikingStickyNav = [
  { id: 'explore-biking', label: 'Biking' },
  ...bikingRegions.map((r) => ({ id: r.id, label: r.shortName })),
] as const;

export function tripsForBikingRegion(regionId: BikingRegionId): BikingTrip[] {
  return bikingTrips.filter((t) => t.regionId === regionId);
}

export function bikingTripWhatsappMsg(trip: BikingTrip): string {
  const route = trip.subtitle ? ` (${trip.subtitle})` : '';
  return `Hi Indian Treks! I'm interested in "${trip.title}"${route} — ${trip.duration}, starting from ₹${trip.price.toLocaleString('en-IN')}. Please share dates and bike details.`;
}
