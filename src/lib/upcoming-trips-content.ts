import { getUpcomingCatalog } from '@/lib/catalog';
import { photos } from '@/lib/media';
import {
  upcomingTripsArticles,
  upcomingTripsReviews,
} from '@/lib/landing-social-content';
import type { TrendingLandingConfig, TrendingLandingTrip } from '@/lib/trending-landing-types';
import { tripFromCatalog } from '@/lib/trending-landing-utils';

const MONTHS = [
  {
    id: 'august',
    name: 'August',
    shortName: 'Aug',
    cardTitle: 'August Departures',
    cardBlurb: 'Monsoon meadows & late-summer windows',
    cover: photos.vof,
    monthKeys: ['Aug'],
  },
  {
    id: 'september',
    name: 'September',
    shortName: 'Sep',
    cardTitle: 'September Departures',
    cardBlurb: 'Post-monsoon clarity & autumn colours',
    cover: photos.kedarkantha,
    monthKeys: ['Sep'],
  },
  {
    id: 'october',
    name: 'October',
    shortName: 'Oct',
    cardTitle: 'October Departures',
    cardBlurb: 'Peak season treks & festival travel',
    cover: photos.hampta,
    monthKeys: ['Oct'],
  },
] as const;

const catalog = getUpcomingCatalog(18);

function toUpcomingTrip(
  card: (typeof catalog)[number],
): TrendingLandingTrip {
  const base = tripFromCatalog(
    {
      id: card.id,
      title: card.title,
      loc: card.loc,
      dur: card.dur,
      price: card.price,
      origPrice: card.origPrice,
      rating: card.rating,
      rev: card.rev,
      img: card.img,
      href: card.href,
      badge: card.badge,
      difficulty: card.difficulty,
      region: card.region,
      type: card.type === 'yatra' ? 'yatra' : 'trek',
    },
    {
      subtitle: `${card.origin} → ${card.dest}`,
      ctaLabel: 'View Trek',
    },
  );
  return {
    ...base,
    id: `${card.id}-${card.date}`,
    meta: [card.date, card.dur, card.difficulty].join(' · '),
    badge: card.badge ?? 'Open',
  };
}

function tripsForMonth(monthKeys: readonly string[]): TrendingLandingTrip[] {
  return catalog
    .filter((c) => monthKeys.some((m) => c.date.includes(m)))
    .map(toUpcomingTrip);
}

const tripSections = MONTHS.map((month) => ({
  id: month.id,
  kicker: `${month.name} 2026`,
  title: `${month.name} Group Departures`,
  intro: `Fixed batches leaving in ${month.name} — domestic Himalayan treks and select international circuits with confirmed dates.`,
  trips: tripsForMonth(month.monthKeys),
}));

// Fill empty months from catalog rotation so every section has cards
for (const section of tripSections) {
  if (section.trips.length > 0) continue;
  const start = tripSections.indexOf(section) * 4;
  section.trips = catalog.slice(start, start + 4).map(toUpcomingTrip);
}

export const upcomingTripsLandingConfig: TrendingLandingConfig = {
  slug: 'upcoming-trips',
  heroImage: photos.uttarakhand,
  heroEyebrow: 'Fixed departures · Aug – Oct',
  heroTitle: 'Upcoming Trips',
  heroLead:
    'Book your seat on confirmed group departures across August, September and October — Himalayan treks, yatras and Nepal adventures with set dates.',
  heroPrimaryCta: { label: 'Browse Departures', targetId: 'explore-months' },
  heroWhatsappMsg: 'Hi Indian Treks! I want details on upcoming group departures in Aug–Oct.',
  stickyNav: [
    { id: 'explore-months', label: 'Months' },
    { id: 'august', label: 'Aug' },
    { id: 'september', label: 'Sep' },
    { id: 'october', label: 'Oct' },
  ],
  exploreSection: {
    id: 'explore-months',
    kicker: 'Plan ahead',
    title: 'Upcoming Group Trips by Month',
    intro:
      'Choose your travel month and explore open batches with dates, pricing and route details.',
    cards: MONTHS.map((month) => ({
      id: month.id,
      title: month.cardTitle,
      blurb: month.cardBlurb,
      cover: month.cover,
      tripCount: tripSections.find((s) => s.id === month.id)?.trips.length ?? 0,
    })),
  },
  whySection: {
    kicker: 'Why book early',
    title: 'Why Book Upcoming Departures',
    tagline: 'Secure your spot before batches fill.',
    intro:
      'Fixed departures mean confirmed dates, grouped logistics and the best chance to travel with like-minded adventurers.',
    points: [
      'Confirmed batch dates for Aug, Sep & Oct',
      'Book now, pay later on select trips',
      'Small groups with experienced leaders',
      'Domestic & international options',
      'Transparent inclusions & cancellation policy',
      'WhatsApp support until departure day',
    ],
  },
  tripSections,
  reviews: {
    kicker: 'Traveller reviews',
    title: 'Recent batch experiences',
    intro:
      'Feedback from travellers who joined our latest fixed departures across Uttarakhand, Himachal and Nepal.',
    items: upcomingTripsReviews,
  },
  articles: {
    kicker: 'From the blog',
    title: 'Prepare for your departure',
    items: upcomingTripsArticles,
  },
  discovery: {
    id: 'find-my-trip',
    title: 'Need Help Picking a Departure?',
    intro:
      'Share your preferred month and trip style — we’ll suggest the best upcoming batch for you.',
    whatsappPrefix: 'Hi Indian Treks! I’m looking at upcoming departures and',
    options: [
      {
        id: 'august',
        label: 'I can travel in August',
        targetSectionId: 'august',
        whatsappHint: 'want August departure options',
      },
      {
        id: 'september',
        label: 'September works best for me',
        targetSectionId: 'september',
        whatsappHint: 'want September departure options',
      },
      {
        id: 'october',
        label: 'I prefer October travel',
        targetSectionId: 'october',
        whatsappHint: 'want October departure options',
      },
      {
        id: 'international',
        label: 'I want an international batch',
        targetSectionId: 'october',
        whatsappHint: 'want upcoming international trek departures',
      },
    ],
  },
  discoveryIcon: 'calendar',
};
