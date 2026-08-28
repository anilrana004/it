import type { ItineraryDay } from '@/lib/data';

export type RouteActivity = 'drive' | 'trek' | 'summit' | 'rest';

export type RoutePoint = {
  day: number;
  label: string;
  title: string;
  altitudeFt: number | null;
  altitudeLabel?: string;
  distanceKm: number | null;
  distanceLabel?: string;
  duration?: string;
  meals?: string;
  activity: RouteActivity;
  /** 0–100 layout coordinate for map overlay */
  mapX: number;
  /** 0–100 layout coordinate (lower = higher on map) */
  mapY: number;
  description?: string;
};

export type RouteProfile = {
  points: RoutePoint[];
  totalDistanceKm: number | null;
  maxAltitudeFt: number | null;
  totalGainFt: number | null;
  mapImage: string;
  mapCaption?: string;
};

export type RoutePointOverride = Partial<
  Pick<RoutePoint, 'label' | 'altitudeFt' | 'distanceKm' | 'activity' | 'mapX' | 'mapY'>
>;

export type TrekRouteProfileData = {
  mapCaption?: string;
  pointOverrides?: Record<number, RoutePointOverride>;
};

export type BuildRouteProfileInput = {
  trekId: string;
  itinerary: ItineraryDay[];
  mapImage: string;
  maxAltitude: string;
  title: string;
  routeData?: TrekRouteProfileData;
};
