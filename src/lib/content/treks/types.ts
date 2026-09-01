/**
 * Trek detail content types — shared between content files and trek page components.
 * Edit copy in `content/treks/<trek-id>/`; do not embed long-form text in components.
 */
export type {
  RichBlock,
  TrekExtendedContent,
  TrekRichSection,
} from '@/lib/treks/trek-extended-types';

export type TrekStat = { label: string; value: string };

export type TrekPackingGroup = { title: string; icon: string; items: string[] };

export type TrekReachStep = {
  title: string;
  items: { label: string; text: string }[];
};

export type TrekTestimonial = {
  name: string;
  text: string;
  platform?: 'google' | 'tripadvisor';
  verifyUrl?: string;
  posted?: string;
  rating?: number;
};

export type TrekDepartureInfo = {
  pickupTime: string;
  dropTime: string;
  location: string;
  notes: string[];
};

export type TrekPolicyRows = [string, string][];

export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  meals: string;
  altitude?: string;
  distance?: string;
  duration?: string;
};
