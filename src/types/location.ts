import type { LocationKind } from '@/types/trek-map';

/** @deprecated Use LocationKind from trek-map */
export type MarkerType = LocationKind;

/** Normalized map location — single shape for markers, popups, and cards. */
export type MapLocation = {
  id: string;
  name: string;
  type: LocationKind;
  latitude: number;
  longitude: number;
  elevationM?: number;
  elevationLabel?: string;
  description?: string;
  /** Cloudinary public ID or versioned asset path — not a raw external URL. */
  imagePublicId?: string;
  day?: number;
  subtitle?: string;
  activity?: string;
  distanceLabel?: string;
  duration?: string;
  meals?: string;
  kindLabel?: string;
  coordinatesLabel?: string;
};

export type MarkerRole = 'primary' | 'secondary' | 'via' | 'trail';

export type MarkerFeatureProps = {
  id: string;
  name: string;
  markerType: MarkerType;
  variant: 'trail' | 'drive' | 'summit';
  role: MarkerRole;
  priority: number;
  active: number;
  day: number;
  daysLabel?: string;
  badge?: string;
};
