import type { LandingArticle, LandingReview } from '@/lib/landing-social-content';
import type { GroupJourneyPremiumHeroConfig } from '@/lib/group-journey-hero-types';

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

export type TrendingStickyNavItem = {
  id: string;
  label: string;
  icon?: 'tag' | 'mountain' | 'landmark' | 'globe' | 'calendar';
};

export type TrendingLandingConfig = {
  slug: string;
  heroImage: string;
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  heroPrimaryCta: { label: string; targetId: string };
  heroWhatsappMsg: string;
  stickyNav: readonly TrendingStickyNavItem[];
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
  /** Backpacking-style split title hero with feature bar */
  journeyHero?: GroupJourneyPremiumHeroConfig;
  /** Premium hero layout — glass stats panel + feature highlight bar */
  premiumHero?: {
    titleMain: string;
    titleAccent: string;
    whatsappSub: string;
    badgeIcon?: 'users' | 'calendar' | 'megaphone' | 'sparkles';
    stats: readonly { value: string; label: string }[];
    features: readonly { title: string; sub: string }[];
  };
  /** Bucket List Sale hero — countdown card + script accent title */
  saleHero?: {
    titleMain: string;
    titleAccent: string;
    countdownEnd: string;
    features: readonly { title: string; sub: string }[];
  };
};
