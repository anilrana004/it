import type { RouteActivity } from './route-profile-types';

export type ElevationSample = {
  /** Cumulative trek distance in km */
  distanceKm: number;
  /** Altitude in feet */
  altitudeFt: number;
  day: number;
  label: string;
  activity: RouteActivity;
  /** True when this sample is an itinerary waypoint (not interpolated) */
  isWaypoint: boolean;
};

export type DayBand = {
  day: number;
  label: string;
  startKm: number;
  endKm: number;
};

export type ElevationProfile = {
  samples: ElevationSample[];
  waypoints: ElevationSample[];
  dayBands: DayBand[];
  totalDistanceKm: number;
  maxAltitudeFt: number;
  minAltitudeFt: number;
  totalAscentFt: number;
  totalDescentFt: number;
  summitIndex: number;
  startIndex: number;
  endIndex: number;
  /** True when x-axis uses verified segment distances */
  hasDistanceData: boolean;
  /** How to label the horizontal axis */
  distanceAxisMode: 'km' | 'stage';
};
