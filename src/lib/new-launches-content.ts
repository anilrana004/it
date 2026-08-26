import {
  backpackingRegions,
  backpackingTripWhatsappMsg,
  backpackingTrips,
  tripsForRegion,
} from '@/lib/backpacking-trips-content';
import { photos } from '@/lib/media';
import { whatsappUrl } from '@/lib/contact';
import {
  newLaunchesArticles,
  newLaunchesReviews,
} from '@/lib/landing-social-content';
import type { TrendingLandingConfig, TrendingLandingTrip } from '@/lib/trending-landing-types';

/** Latest additions — Meghalaya, all-girls batches & winter Spiti highlighted as new. */
const NEW_LAUNCH_IDS = new Set([
  'meghalaya-all-girls',
  'meghalaya-kaziranga',
  'meghalaya-camping',
  'himachal-all-girls',
  'winter-spiti',
  'uttarakhand-nye',
]);

function toLaunchTrip(trip: (typeof backpackingTrips)[number]): TrendingLandingTrip {
  const meta = [trip.pickup, trip.duration, trip.season].filter(Boolean).join(' · ');
  return {
    id: trip.id,
    title: trip.title,
    subtitle: trip.subtitle,
    meta,
    duration: trip.duration,
    badge: NEW_LAUNCH_IDS.has(trip.id) ? 'NEW' : trip.badge,
    price: trip.price,
    cover: trip.cover,
    href: whatsappUrl(backpackingTripWhatsappMsg(trip)),
    external: true,
    ctaLabel: 'View Trip',
  };
}

const launchRegions = backpackingRegions.filter((r) =>
  tripsForRegion(r.id).some((t) => NEW_LAUNCH_IDS.has(t.id)),
);

const tripSections = launchRegions.map((region) => ({
  id: region.id,
  kicker: region.name,
  title: region.sectionTitle,
  intro: region.sectionIntro,
  trips: tripsForRegion(region.id).map(toLaunchTrip),
}));

export const newLaunchesLandingConfig: TrendingLandingConfig = {
  slug: 'new-launches',
  heroImage: photos.himachal,
  heroEyebrow: 'Fresh routes · Live now',
  heroTitle: 'New Launches',
  heroLead:
    'Our latest backpacking circuits — new Northeast trails, all-girls batches and winter Spiti — designed for flexible, social group travel.',
  heroPrimaryCta: { label: 'See New Trips', targetId: 'explore-launches' },
  heroWhatsappMsg: 'Hi Indian Treks! I want details on your newest backpacking launches.',
  stickyNav: [
    { id: 'explore-launches', label: 'New' },
    ...launchRegions.map((r) => ({ id: r.id, label: r.shortName })),
  ],
  exploreSection: {
    id: 'explore-launches',
    kicker: 'Just launched',
    title: 'Latest Backpacking Trips',
    intro:
      'Explore our newest group backpacking routes across Meghalaya, Himachal, Spiti and Uttarakhand.',
    cards: launchRegions.map((region) => ({
      id: region.id,
      title: region.cardTitle,
      blurb: region.cardBlurb,
      cover: region.cover,
      tripCount: tripsForRegion(region.id).length,
    })),
  },
  whySection: {
    kicker: 'What’s new',
    title: 'Why These Launches Stand Out',
    tagline: 'Fresh itineraries. Same Indian Treks standards.',
    intro:
      'Every new launch is tested for route quality, stay standards and group size — so you get novelty without compromise.',
    points: [
      'Brand-new Meghalaya & Northeast circuits',
      'Dedicated all-girls backpacking batches',
      'Winter Spiti & festive season routes',
      'Small groups with flexible free time',
      'Local experiences beyond tourist hotspots',
      'End-to-end support on WhatsApp',
    ],
  },
  tripSections,
  reviews: {
    kicker: 'Traveller reviews',
    title: 'Early feedback on new routes',
    intro:
      'First-hand stories from travellers on our newest Meghalaya, Himachal and Spiti backpacking launches.',
    items: newLaunchesReviews,
  },
  articles: {
    kicker: 'From the blog',
    title: 'Backpacking guides',
    items: newLaunchesArticles,
  },
  discovery: {
    id: 'find-my-trip',
    title: 'Which New Launch Suits You?',
    intro:
      'Pick what matters most and we’ll point you to the right fresh route from our latest catalog.',
    whatsappPrefix: 'Hi Indian Treks! I’m interested in your new launches and',
    options: [
      {
        id: 'northeast',
        label: 'I want Northeast / Meghalaya',
        targetSectionId: 'meghalaya',
        whatsappHint: 'want the new Meghalaya backpacking launches',
      },
      {
        id: 'all-girls',
        label: 'I want an all-girls batch',
        targetSectionId: 'himachal',
        whatsappHint: 'want a new all-girls backpacking trip',
      },
      {
        id: 'winter',
        label: 'I want a winter adventure',
        targetSectionId: 'spiti',
        whatsappHint: 'want the new winter Spiti launch',
      },
      {
        id: 'budget',
        label: 'Something under ₹20,000',
        targetSectionId: 'himachal',
        whatsappHint: 'want a new launch under ₹20,000',
      },
    ],
  },
  discoveryIcon: 'megaphone',
};
