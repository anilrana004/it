import type { LandingArticle, LandingReview } from '@/lib/landing-social-content';

export type TrendingLandingTrip = {
  id: string;
  title: string;
  subtitle?: string;
  meta: string;
  duration?: string;
  badge?: string;
  price: number;
  cover: string;
  href: string;
  external?: boolean;
  ctaLabel?: string;
  priceLabel?: string;
};

export type TrendingExploreCard = {
  id: string;
  title: string;
  blurb: string;
  cover: string;
  tripCount: number;
};

export type TrendingTripSection = {
  id: string;
  kicker: string;
  title: string;
  intro: string;
  trips: TrendingLandingTrip[];
};

export type TrendingDiscoveryOption = {
  id: string;
  label: string;
  targetSectionId: string;
  whatsappHint: string;
};

export type TrendingLandingConfig = {
  slug: string;
  heroImage: string;
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  heroPrimaryCta: { label: string; targetId: string };
  heroWhatsappMsg: string;
  stickyNav: readonly { id: string; label: string }[];
  exploreSection: {
    id: string;
    kicker: string;
    title: string;
    intro: string;
    cards: TrendingExploreCard[];
  };
  whySection: {
    kicker: string;
    title: string;
    tagline: string;
    intro: string;
    points: readonly string[];
  };
  tripSections: TrendingTripSection[];
  reviews: {
    kicker: string;
    title: string;
    intro: string;
    items: LandingReview[];
  };
  articles: {
    kicker: string;
    title: string;
    items: LandingArticle[];
  };
  discovery: {
    id: string;
    title: string;
    intro: string;
    options: readonly TrendingDiscoveryOption[];
    whatsappPrefix: string;
  };
  discoveryIcon: 'star' | 'calendar' | 'megaphone' | 'sparkles';
};
