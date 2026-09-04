import type { TrekRouteProfileData } from '@/lib/treks/route-profile-types';

export type RichBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'video'; youtubeId: string; title: string; caption?: string };

export type TrekRichSection = {
  id: string;
  kicker: string;
  title: string;
  intro?: string;
  blocks: RichBlock[];
};

export type TrekExtendedContent = {
  stats?: { label: string; value: string }[];
  overviewExtra?: RichBlock[];
  sections: TrekRichSection[];
  packingGroups?: { title: string; icon: string; items: string[] }[];
  reachSteps?: { title: string; items: { label: string; text: string }[] }[];
  bookingPolicyRows?: [string, string][];
  cancellationPolicyRows?: [string, string][];
  cancellationPolicySection?: TrekRichSection;
  testimonials?: {
    name: string;
    text: string;
    platform?: 'google' | 'tripadvisor';
    verifyUrl?: string;
    posted?: string;
    rating?: number;
  }[];
  departure?: {
    pickupTime: string;
    dropTime: string;
    location: string;
    notes: string[];
  };
  routeProfile?: TrekRouteProfileData;
  packingSection?: TrekRichSection;
  /** Optional notes block (offloading, special offers, etc.) — shown after Things to Carry. */
  noteSection?: TrekRichSection;
};
