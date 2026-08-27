import { getBestSellerBuckets } from '@/lib/catalog';
import { photos } from '@/lib/media';
import {
  bestSellersArticles,
  bestSellersReviews,
} from '@/lib/landing-social-content';
import type { TrendingLandingConfig } from '@/lib/trending-landing-types';
import { tripFromCatalog } from '@/lib/trending-landing-utils';

const buckets = getBestSellerBuckets();

const topTreksSection = {
  id: 'top-treks',
  kicker: 'Most booked',
  title: 'Top Treks',
  intro:
    'Handpicked Himalayan treks that travellers book again and again — valley meadows, snow trails and beginner-friendly summits.',
  trips: buckets['Top Treks'].map((c) =>
    tripFromCatalog(c, { ctaLabel: 'View Trek' }),
  ),
};

const yatrasSection = {
  id: 'yatras',
  kicker: 'Sacred journeys',
  title: 'Yatras & Pilgrimages',
  intro:
    'Guided group yatras with comfortable stays, darshan support and experienced tour leaders across Uttarakhand.',
  trips: buckets['Yatras & Pilgrimages'].map((c) =>
    tripFromCatalog(c, { ctaLabel: 'View Yatra' }),
  ),
};

const internationalSection = {
  id: 'international',
  kicker: 'Global favourites',
  title: 'International Adventures',
  intro:
    'Nepal and beyond — Everest Base Camp, Annapurna and curated international circuits with fixed departures.',
  trips: buckets['International Adventures'].map((c) =>
    tripFromCatalog(c, { ctaLabel: 'View Trek' }),
  ),
};

const tripSections = [topTreksSection, yatrasSection, internationalSection];

export const bestSellersHeroStats = [
  { value: '80K+', label: 'Happy Travellers' },
  { value: '4.8/5', label: 'Average Rating' },
  { value: '200+', label: 'Expertly Curated Trips' },
  { value: '100%', label: 'Safe & Trusted' },
] as const;

export const bestSellersHeroFeatures = [
  { title: 'Handpicked Trips', sub: 'Carefully selected by trek experts' },
  { title: 'Best Reviews', sub: 'Trips loved by thousands of travellers' },
  { title: 'Fast Filling', sub: 'High demand departures, book early!' },
  { title: 'All In One', sub: 'Treks, Yatras & International Adventures' },
] as const;

export const bestSellersLandingConfig: TrendingLandingConfig = {
  slug: 'best-sellers',
  heroImage: photos.snow,
  heroEyebrow: 'Most booked · Group departures',
  heroTitle: 'Best Sellers',
  heroLead:
    'Discover the trips our travellers love most — proven routes, strong reviews and departures that fill fast across treks, yatras and international adventures.',
  heroPrimaryCta: { label: 'Explore Best Sellers', targetId: 'explore-categories' },
  heroWhatsappMsg: 'Hi Indian Treks! I want help choosing from your best-selling group trips.',
  premiumHero: {
    titleMain: 'Best',
    titleAccent: 'Sellers',
    whatsappSub: 'Get quick help',
    badgeIcon: 'users',
    stats: bestSellersHeroStats,
    features: bestSellersHeroFeatures,
  },
  stickyNav: [
    { id: 'explore-categories', label: 'Categories' },
    { id: 'top-treks', label: 'Top Treks' },
    { id: 'yatras', label: 'Yatras' },
    { id: 'international', label: 'International' },
  ],
  exploreSection: {
    id: 'explore-categories',
    kicker: 'Browse by type',
    title: 'Most Booked Group Trips',
    intro:
      'Pick a category to jump straight to our highest-rated and most frequently booked journeys.',
    cards: [
      {
        id: 'top-treks',
        title: 'Top Treks',
        blurb: 'Himalayan classics & crowd favourites',
        cover: photos.vof,
        tripCount: topTreksSection.trips.length,
      },
      {
        id: 'yatras',
        title: 'Yatras & Pilgrimages',
        blurb: 'Kedarnath, Do Dham & Char Dham circuits',
        cover: photos.yatra,
        tripCount: yatrasSection.trips.length,
      },
      {
        id: 'international',
        title: 'International Adventures',
        blurb: 'Nepal treks & global expeditions',
        cover: photos.ebc,
        tripCount: internationalSection.trips.length,
      },
    ],
  },
  whySection: {
    kicker: 'Why book best sellers',
    title: 'Why These Trips Lead the Charts',
    tagline: 'Proven on the trail, loved by travellers.',
    intro:
      'Best sellers aren’t hype — they’re trips with strong logistics, clear briefings and repeat bookings season after season.',
    points: [
      'Highest-rated departures across treks & yatras',
      'Experienced trek leaders & tour managers',
      'Small groups with fixed, reliable itineraries',
      'Transparent pricing with flexible payment options',
      'Safety-first approach at every altitude',
      'Thousands of verified traveller reviews',
    ],
  },
  tripSections,
  reviews: {
    kicker: 'Traveller reviews',
    title: 'Why travellers keep coming back',
    intro:
      'Real feedback from batches on our most booked Kedarkantha, Valley of Flowers, Kedarnath and Nepal treks.',
    items: bestSellersReviews,
  },
  articles: {
    kicker: 'From the blog',
    title: 'Plan your next bestseller trip',
    items: bestSellersArticles,
  },
  discovery: {
    id: 'find-my-trip',
    title: 'Not Sure Which Best Seller Fits You?',
    intro:
      'Tell us what kind of journey you’re looking for and we’ll recommend the right bestseller from our catalog.',
    whatsappPrefix: 'Hi Indian Treks! I’m browsing your best sellers and',
    options: [
      {
        id: 'first-trek',
        label: 'This is my first Himalayan trek',
        targetSectionId: 'top-treks',
        whatsappHint: 'looking for a beginner-friendly bestseller trek',
      },
      {
        id: 'yatra',
        label: 'I want a spiritual yatra',
        targetSectionId: 'yatras',
        whatsappHint: 'looking for a best-selling yatra package',
      },
      {
        id: 'nepal',
        label: 'I want an international trek',
        targetSectionId: 'international',
        whatsappHint: 'looking for a best-selling international trek in Nepal',
      },
      {
        id: 'weekend',
        label: 'I need a short weekend trip',
        targetSectionId: 'top-treks',
        whatsappHint: 'looking for a short best-selling weekend trek',
      },
    ],
  },
  discoveryIcon: 'star',
};
