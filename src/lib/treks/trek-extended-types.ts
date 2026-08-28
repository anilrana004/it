import type { TrekRouteProfileData } from '@/lib/treks/route-profile-types';

export type RichBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] };

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
  testimonials?: { name: string; text: string }[];
  departure?: {
    pickupTime: string;
    dropTime: string;
    location: string;
    notes: string[];
  };
  routeProfile?: TrekRouteProfileData;
};
