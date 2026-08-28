import type { ComponentType } from 'react';
import type { SpecialProgramId } from '@/lib/special-programs-content';

export type SplIcon = ComponentType<{ size?: number; strokeWidth?: number }>;

export type SplReview = {
  id: string;
  name: string;
  batch: string;
  short: string;
  full: string;
  avatar?: string;
  trekLink?: { label: string; href: string };
};

export type SplArticle = {
  title: string;
  excerpt: string;
  href: string;
  image: string;
  read: string;
};

export type SplPremiumHero = {
  badge: string;
  titleMain: string;
  titleAccent: string;
  tagline: { before: string; highlight: string; after: string };
  lead: string;
  trustLine: string;
  avatars: readonly string[];
  pathTagline: string;
  panelKicker: string;
  panel: readonly { title: string; sub: string }[];
  panelPromise: string;
  features: readonly { title: string; sub: string }[];
};

export type SplLandingContent = {
  programId: SpecialProgramId;
  premiumHero?: SplPremiumHero;
  hero: {
    titleBefore: string;
    titleEm: string;
    titleAfter?: string;
    tagline: string;
    lead: string;
    whatsappMsg: string;
    asideKicker: string;
    asideTitle: string;
    asideBody: string;
    asideBullets: string[];
  };
  story: {
    kicker: string;
    title: string;
    paragraphs: string[];
  };
  reviews: {
    kicker: string;
    title: string;
    intro: string;
    items: SplReview[];
  };
  eligibility: {
    kicker: string;
    title: string;
    intro: string;
    items: { label: string; body: string }[];
  };
  promo: {
    text: string;
    href: string;
    cta: string;
  };
  treks: {
    kicker: string;
    title: string;
    intro: string;
    note?: string;
  };
  differences: {
    kicker: string;
    title: string;
    intro: string;
    items: { title: string; body: string; icon: SplIcon }[];
  };
  safety: {
    kicker: string;
    title: string;
    intro: string;
    items: { title: string; body: string; icon: SplIcon }[];
  };
  gallery: { src: string; alt: string }[];
  articles: {
    kicker: string;
    title: string;
    items: SplArticle[];
  };
  cta: {
    kicker: string;
    title: string;
    body: string;
    whatsappMsg: string;
  };
};
