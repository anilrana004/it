import { photos } from '@/lib/media';

export type BackpackingRegionId =
  | 'uttarakhand'
  | 'himachal'
  | 'spiti'
  | 'meghalaya';

export type BackpackingTrip = {
  id: string;
  regionId: BackpackingRegionId;
  title: string;
  /** Route / tagline under the title */
  subtitle?: string;
  pickup: string;
  duration: string;
  season?: string;
  price: number;
  badge?: string;
  cover: string;
};

export type BackpackingRegion = {
  id: BackpackingRegionId;
  name: string;
  shortName: string;
  cardTitle: string;
  cardBlurb: string;
  sectionTitle: string;
  sectionIntro: string;
  cover: string;
};

export const backpackingRegions: BackpackingRegion[] = [
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    shortName: 'Uttarakhand',
    cardTitle: 'Uttarakhand',
    cardBlurb: 'Mountains, valleys & Himalayan escapes',
    sectionTitle: 'Uttarakhand Backpacking Trips',
    sectionIntro:
      'From Himalayan towns and forest trails to riverside escapes, explore Uttarakhand at a slower and more immersive pace.',
    cover: photos.uttarakhand,
  },
  {
    id: 'himachal',
    name: 'Himachal Pradesh',
    shortName: 'Himachal',
    cardTitle: 'Himachal Pradesh',
    cardBlurb: 'Mountain villages, forests & vibrant backpacker trails',
    sectionTitle: 'Himachal Pradesh Backpacking Trips',
    sectionIntro:
      'Wander through mountain villages, forests, cafés and valleys across Himachal Pradesh.',
    cover: photos.himachal,
  },
  {
    id: 'spiti',
    name: 'Spiti Valley',
    shortName: 'Spiti',
    cardTitle: 'Spiti Valley',
    cardBlurb: 'High-altitude landscapes & remote Himalayan villages',
    sectionTitle: 'Spiti Valley Backpacking Trips',
    sectionIntro:
      'High-altitude landscapes, remote villages and a journey deep into the heart of the Himalayas.',
    cover: photos.snow,
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya',
    shortName: 'Meghalaya',
    cardTitle: 'Meghalaya',
    cardBlurb: 'Forests, waterfalls & unforgettable Northeast experiences',
    sectionTitle: 'Meghalaya & Northeast Backpacking Trips',
    sectionIntro:
      'Discover forests, waterfalls, living-root bridges and landscapes unlike anywhere else in India.',
    cover: photos.nepal,
  },
];

export const backpackingTrips: BackpackingTrip[] = [
  {
    id: 'uttarakhand-classic',
    regionId: 'uttarakhand',
    title: 'Uttarakhand Backpacking',
    subtitle: 'Auli • Chopta • Rishikesh',
    pickup: 'Delhi to Delhi',
    duration: '7N/8D',
    season: 'Oct – Apr',
    price: 22500,
    cover: photos.uttarakhand,
  },
  {
    id: 'uttarakhand-nye',
    regionId: 'uttarakhand',
    title: 'Uttarakhand Backpacking',
    subtitle: 'Christmas & New Year',
    pickup: 'Delhi to Delhi',
    duration: '7N/8D',
    price: 26000,
    cover: photos.chopta,
  },
  {
    id: 'himachal-manali-kasol-jibhi',
    regionId: 'himachal',
    title: 'Himachal Backpacking Trip',
    subtitle: 'Manali • Kasol • Jibhi',
    pickup: 'Delhi to Delhi',
    duration: '6N/7D',
    season: 'Oct – Apr',
    price: 18500,
    cover: photos.himachal,
  },
  {
    id: 'himachal-all-girls',
    regionId: 'himachal',
    title: 'All Girls Himachal Backpacking Trip',
    subtitle: 'Manali • Kasol • Jibhi',
    pickup: 'Delhi to Delhi',
    duration: '6N/7D',
    season: 'Oct – Apr',
    price: 18500,
    badge: 'ALL GIRLS',
    cover: photos.hampta,
  },
  {
    id: 'himachal-mcleod-bir',
    regionId: 'himachal',
    title: 'Himachal Backpacking Trip',
    subtitle: 'McLeodganj • Triund • Bir',
    pickup: 'Delhi to Delhi',
    duration: '5N/6D',
    season: 'Oct – Apr',
    price: 15300,
    cover: photos.triund,
  },
  {
    id: 'winter-spiti',
    regionId: 'spiti',
    title: 'Winter Spiti Trip',
    pickup: 'Delhi to Delhi',
    duration: '8N/9D',
    season: 'Oct – May',
    price: 24000,
    cover: photos.snow,
  },
  {
    id: 'meghalaya-all-girls',
    regionId: 'meghalaya',
    title: 'All Girls Meghalaya & Kaziranga Backpacking Trip',
    subtitle: 'Scenic Trails',
    pickup: 'Guwahati to Guwahati',
    duration: '6N/7D',
    season: 'Oct – Apr',
    price: 28000,
    badge: 'ALL GIRLS',
    cover: photos.nepal,
  },
  {
    id: 'meghalaya-kaziranga',
    regionId: 'meghalaya',
    title: 'Meghalaya & Kaziranga Backpacking Trip',
    subtitle: 'Forests, Falls & Safari',
    pickup: 'Guwahati to Guwahati',
    duration: '6N/7D',
    season: 'Oct – Apr',
    price: 28000,
    cover: photos.ebc,
  },
  {
    id: 'meghalaya-camping',
    regionId: 'meghalaya',
    title: 'Meghalaya Backpacking Trip',
    subtitle: 'Shillong • Cherrapunji • Camping',
    pickup: 'Guwahati to Guwahati',
    duration: '5N/6D',
    price: 23500,
    cover: photos.vof,
  },
];

export const backpackingWhyPoints = [
  'Small-group travel',
  'Local experiences',
  'Carefully planned routes',
  'Time to explore independently',
  'Like-minded travellers',
  'Experiences beyond the usual tourist routes',
] as const;

export const backpackingDiscoveryOptions = [
  {
    id: 'mountains',
    label: "I'm looking for mountains",
    targetRegionId: 'uttarakhand' as BackpackingRegionId,
    whatsappHint: 'looking for a mountain backpacking trip',
  },
  {
    id: 'winter',
    label: 'I want a winter trip',
    targetRegionId: 'spiti' as BackpackingRegionId,
    whatsappHint: 'looking for a winter backpacking trip',
  },
  {
    id: 'all-girls',
    label: 'I want an all-girls trip',
    targetRegionId: 'himachal' as BackpackingRegionId,
    whatsappHint: 'looking for an all-girls backpacking trip',
  },
  {
    id: 'under-20k',
    label: 'I want something under ₹20,000',
    targetRegionId: 'himachal' as BackpackingRegionId,
    whatsappHint: 'looking for a backpacking trip under ₹20,000',
  },
] as const;

export const backpackingStickyNav = [
  { id: 'explore-regions', label: 'Backpacking' },
  ...backpackingRegions.map((r) => ({ id: r.id, label: r.shortName })),
] as const;

export function tripsForRegion(regionId: BackpackingRegionId): BackpackingTrip[] {
  return backpackingTrips.filter((t) => t.regionId === regionId);
}

export function backpackingTripWhatsappMsg(trip: BackpackingTrip): string {
  const route = trip.subtitle ? ` (${trip.subtitle})` : '';
  return `Hi Indian Treks! I'm interested in "${trip.title}"${route} — ${trip.duration}, starting from ₹${trip.price.toLocaleString('en-IN')}. Please share dates and details.`;
}
