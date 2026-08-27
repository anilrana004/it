import { getSiteTreks, toCatalogCard } from '@/lib/catalog';
import { treks } from '@/lib/data';
import { photos } from '@/lib/media';
import {
  weekendTripsArticles,
  weekendTripsReviews,
} from '@/lib/landing-social-content';
import type { GroupJourneyPremiumHeroConfig } from '@/lib/group-journey-hero-types';
import type { TrendingLandingConfig } from '@/lib/trending-landing-types';
import { tripFromCatalog } from '@/lib/trending-landing-utils';

/** Short Himalayan escapes — ≤3 days or known weekend classics. */
const WEEKEND_IDS = [
  'nag-tibba',
  'mcleodganj-trek',
  'kheerganga',
  'beas-kund',
  'bhrigu-lake',
  'chopta-tungnath',
  'dayara-bugyal',
] as const;

function weekendCards() {
  const byId = new Map(treks.map((t) => [t.id, t]));
  const fromIds = WEEKEND_IDS.map((id) => byId.get(id)).filter(Boolean).map((t) => toCatalogCard(t!));

  if (fromIds.length >= 4) return fromIds;

  const short = getSiteTreks().filter((c) => {
    const days = Number(c.dur.match(/(\d+)D/)?.[1] ?? 99);
    return days <= 3 || /easy/i.test(c.difficulty);
  });
  return [...fromIds, ...short.filter((c) => !fromIds.some((f) => f.id === c.id))].slice(0, 8);
}

const all = weekendCards();

const himachal = all.filter((c) => c.region === 'himachal');
const uttarakhand = all.filter((c) => c.region === 'uttarakhand');
const other = all.filter((c) => c.region !== 'himachal' && c.region !== 'uttarakhand');

const himachalSection = {
  id: 'himachal',
  kicker: 'Himachal Pradesh',
  title: 'Himachal Weekend Treks',
  intro:
    'Quick escapes from Delhi and Chandigarh — Triund, Kheerganga, Beas Kund and Bhrigu Lake for a short mountain reset.',
  trips: himachal.map((c) => tripFromCatalog(c, { ctaLabel: 'View Trek' })),
};

const uttarakhandSection = {
  id: 'uttarakhand',
  kicker: 'Uttarakhand',
  title: 'Uttarakhand Weekend Treks',
  intro:
    'Nag Tibba, Chopta–Tungnath and Dayara Bugyal — short Garhwal trails with big Himalayan views.',
  trips: uttarakhand.map((c) => tripFromCatalog(c, { ctaLabel: 'View Trek' })),
};

const moreSection =
  other.length > 0
    ? {
        id: 'more-weekends',
        kicker: 'Quick escapes',
        title: 'More Short Treks',
        intro: 'Additional easy and easy-to-moderate routes that fit a long weekend.',
        trips: other.map((c) => tripFromCatalog(c, { ctaLabel: 'View Trek' })),
      }
    : null;

const tripSections = [
  himachalSection.trips.length ? himachalSection : null,
  uttarakhandSection.trips.length ? uttarakhandSection : null,
  moreSection,
].filter(Boolean) as NonNullable<typeof himachalSection>[];

// Fallback if filters emptied somehow
if (tripSections.length === 0) {
  tripSections.push({
    id: 'all-weekends',
    kicker: 'Short escapes',
    title: 'Weekend Group Treks',
    intro: 'Short Himalayan trails designed for Friday–Sunday travellers.',
    trips: all.map((c) => tripFromCatalog(c, { ctaLabel: 'View Trek' })),
  });
}

export const weekendTripsLandingConfig: TrendingLandingConfig = {
  slug: 'weekend-trips',
  heroImage: photos.weekendHero,
  heroEyebrow: '2–3 days · Easy trails',
  heroTitle: 'Weekend Trips',
  heroLead:
    'Short Himalayan escapes you can fit into a long weekend — easy trails, fixed departures and like-minded groups from Indian Treks.',
  heroPrimaryCta: { label: 'Browse Weekends', targetId: 'explore-weekends' },
  heroWhatsappMsg: 'Hi Indian Treks! I want help choosing a weekend trek.',
  journeyHero: {
    badgePrimary: '2–3 days',
    badgeSecondary: 'Easy trails',
    badgeIcon: 'calendar',
    titleLine1: 'Weekend',
    titleLine2: 'Trips',
    leadBefore: 'Short Himalayan escapes you can fit into a long weekend — ',
    leadHighlight: 'easy trails, fixed departures and like-minded groups',
    leadAfter: ' from Indian Treks.',
    primaryCtaLabel: 'Browse Weekends',
    primaryCtaTargetId: 'explore-weekends',
    whatsappMsg: 'Hi Indian Treks! I want help choosing a weekend trek.',
    features: [
      { title: 'Quick Escapes', sub: 'Fit a long weekend from Delhi' },
      { title: 'Easy Trails', sub: 'First-timer friendly routes' },
      { title: 'Fixed Groups', sub: 'Confirmed departures with leaders' },
      { title: 'Smooth Logistics', sub: 'Pickups, stays & briefings handled' },
    ],
  } satisfies GroupJourneyPremiumHeroConfig,
  stickyNav: [
    { id: 'explore-weekends', label: 'Weekends', icon: 'mountain' },
    ...tripSections.map((s) => ({
      id: s.id,
      label: s.id === 'himachal' ? 'Himachal' : s.id === 'uttarakhand' ? 'Uttarakhand' : 'More',
      icon: 'mountain' as const,
    })),
  ],
  exploreSection: {
    id: 'explore-weekends',
    kicker: 'Short escapes',
    title: 'Weekend Treks by Region',
    intro:
      'Pick a region and explore short group treks with confirmed dates, clear difficulty and Delhi-friendly logistics.',
    cards: tripSections.map((s) => ({
      id: s.id,
      title: s.title.replace(/ Treks$/, ''),
      blurb: s.intro.slice(0, 72) + (s.intro.length > 72 ? '…' : ''),
      cover:
        s.id === 'himachal'
          ? photos.himachal
          : s.id === 'uttarakhand'
            ? photos.uttarakhand
            : photos.chopta,
      tripCount: s.trips.length,
    })),
  },
  whySection: {
    kicker: 'Why weekend with us',
    title: 'Why Book a Weekend Trek',
    tagline: 'Big mountain energy. Small time window.',
    intro:
      'Weekend trips are paced for first-timers and busy travellers — short days, experienced leaders and smooth pickups.',
    points: [
      '2–3 day itineraries that fit a long weekend',
      'Easy and easy-to-moderate graded trails',
      'Fixed group departures with experienced leaders',
      'Clear inclusions, packing lists and briefings',
      'Ideal for first-timers and office groups',
      'WhatsApp support until departure day',
    ],
  },
  tripSections,
  reviews: {
    kicker: 'Traveller reviews',
    title: 'Weekend stories from the trail',
    intro: 'Feedback from short batches on Triund, Nag Tibba, Kheerganga and Chopta.',
    items: weekendTripsReviews,
  },
  articles: {
    kicker: 'From the blog',
    title: 'Prepare for a short escape',
    items: weekendTripsArticles,
  },
  discovery: {
    id: 'find-my-trip',
    title: 'Which Weekend Fits You?',
    intro: 'Tell us your preferred region or vibe — we’ll suggest the right short trek.',
    whatsappPrefix: 'Hi Indian Treks! I’m looking for a weekend trip and',
    options: [
      {
        id: 'himachal',
        label: 'I want Himachal this weekend',
        targetSectionId: himachalSection.trips.length ? 'himachal' : tripSections[0].id,
        whatsappHint: 'want a Himachal weekend trek',
      },
      {
        id: 'uttarakhand',
        label: 'I prefer Uttarakhand',
        targetSectionId: uttarakhandSection.trips.length ? 'uttarakhand' : tripSections[0].id,
        whatsappHint: 'want an Uttarakhand weekend trek',
      },
      {
        id: 'first',
        label: 'This is my first trek',
        targetSectionId: tripSections[0].id,
        whatsappHint: 'want a beginner-friendly weekend trek',
      },
      {
        id: 'friends',
        label: 'Trip with friends / office',
        targetSectionId: tripSections[0].id,
        whatsappHint: 'want a weekend trek for friends or office group',
      },
    ],
  },
  discoveryIcon: 'sparkles',
};
