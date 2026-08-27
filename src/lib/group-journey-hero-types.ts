export type GroupJourneyPremiumFeature = {
  title: string;
  sub: string;
};

export type GroupJourneyBadgeIcon = 'mountain' | 'bike' | 'calendar';

export type GroupJourneyPremiumHeroConfig = {
  badgePrimary: string;
  badgeSecondary: string;
  badgeIcon?: GroupJourneyBadgeIcon;
  titleLine1: string;
  titleLine2: string;
  leadBefore: string;
  leadHighlight: string;
  leadAfter: string;
  primaryCtaLabel: string;
  primaryCtaTargetId: string;
  whatsappMsg: string;
  features: readonly GroupJourneyPremiumFeature[];
};
