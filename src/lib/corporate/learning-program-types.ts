/** Shared content shape for Learning Programs landings (corporate / school / campus / gift). */

export type LpReview = {
  id: string;
  name: string;
  role: string;
  short: string;
  full: string;
  /** Optional portrait for story cards */
  avatar?: string;
  /** Quick-open trek or program link */
  trekLink?: { label: string; href: string };
};

export type LpProgramme = {
  id: string;
  title: string;
  blurb: string;
  duration: string;
  location: string;
  overview: string;
  image: string;
};

export type LpArticle = {
  title: string;
  href: string;
  image: string;
  read: string;
};

export type LpBrand = {
  id: string;
  name: string;
  logo?: string;
};

export type LpPremiumHero = {
  badge: string;
  titleMain: string;
  titleAccent: string;
  lead: string;
  trustLine: string;
  avatars: readonly string[];
  tagline: string;
  panel: readonly { title: string; sub: string }[];
  stats: readonly { value: string; sub: string }[];
  features: readonly { title: string; sub: string }[];
};

export type LpLandingContent = {
  /** Used for form / WhatsApp labelling */
  variant: 'corporate' | 'school' | 'campus' | 'gift';
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    image: string;
    primaryCta: string;
    primaryWhatsapp: string;
    secondaryCta?: string;
    youtubeId?: string;
  };
  /** Premium hero — glass panel, stats bar, feature strip */
  premiumHero?: LpPremiumHero;
  brands: {
    kicker: string;
    title: string;
    intro: string;
    items: LpBrand[];
  };
  benefits: {
    kicker: string;
    title: string;
    intro: string;
    items: string[];
    image: string;
    imageAlt: string;
  };
  whyBetter: {
    kicker: string;
    title: string;
    items: { title: string; body: string }[];
  };
  reviews: {
    kicker: string;
    title: string;
    intro: string;
    items: LpReview[];
  };
  difficulties: {
    kicker: string;
    title: string;
    intro: string;
    items: string[];
    image: string;
    imageAlt: string;
  };
  programmes: {
    kicker: string;
    title: string;
    intro: string;
    items: LpProgramme[];
    enquirePrefix: string;
  };
  treks?: {
    kicker: string;
    title: string;
    intro: string;
    note: string;
    ids: readonly string[];
  };
  gallery: {
    kicker: string;
    title: string;
    items: { src: string; alt: string }[];
  };
  cta: {
    kicker: string;
    title: string;
    body: string;
    primaryWhatsapp: string;
    primaryLabel: string;
    secondaryHref: string;
    secondaryLabel: string;
  };
  articles: {
    kicker: string;
    title: string;
    items: LpArticle[];
  };
  inquiry: {
    kicker: string;
    title: string;
    intro: string;
    orgLabel: string;
    orgPlaceholder?: string;
    sizeLabel: string;
    sizeOptions: string[];
    programmeLabel: string;
    whatsappFallback: string;
    successBody: string;
  };
  /** Gift-only extras rendered in dedicated slots */
  gift?: {
    occasions: { title: string; body: string }[];
    howSteps: { title: string; body: string }[];
    amounts: number[];
    faqs: { q: string; a: string }[];
  };
};
