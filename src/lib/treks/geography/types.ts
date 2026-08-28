import type { RouteActivity } from '@/lib/treks/route-profile-types';

/** Geographic source attribution — required for externally researched coordinates. */
export type GeoSource =
  | 'openstreetmap-nominatim'
  | 'himalaya-trekker-gps'
  | 'authoritative-reference'
  | 'openstreetmap-trail'
  | 'mapbox-directions'
  | 'project-itinerary';

export type WaypointKind =
  | 'start'
  | 'village'
  | 'camp'
  | 'base-camp'
  | 'water'
  | 'pass'
  | 'viewpoint'
  | 'summit'
  | 'temple'
  | 'end';

/** How route line geometry was obtained — never imply live GPS tracking. */
export type RouteGeometryKind =
  | 'gps-track'
  | 'driving-network'
  | 'none';

export type GeoLocation = {
  key: string;
  name: string;
  lng: number;
  lat: number;
  elevationM?: number;
  source: GeoSource;
};

export type TrekWaypoint = {
  day: number;
  locationKey: string;
  kind: WaypointKind;
  activity?: RouteActivity;
};

export type TrekRouteDefinition = {
  trekId: string;
  caption?: string;
  waypoints: TrekWaypoint[];
  /** Optional pre-defined GPS track key (see route-tracks.ts) */
  trackKey?: string;
  /** Drive corridor via location keys — resolved through Mapbox Directions */
  driveVia?: string[];
};

/** A drawable route segment — trek segments without GPS tracks have kind 'none'. */
export type RouteSegment = {
  id: string;
  geometryKind: RouteGeometryKind;
  /** Present when geometryKind is gps-track */
  coordinates?: [number, number][];
  /** For driving-network — location keys to resolve via Mapbox Directions */
  driveFrom?: string;
  driveTo?: string;
  driveVia?: string[];
  dayStart: number;
  dayEnd: number;
};

export type ResolvedWaypoint = {
  id: string;
  day: number;
  name: string;
  lng: number;
  lat: number;
  elevationM?: number;
  kind: WaypointKind;
  activity?: RouteActivity;
  source: GeoSource;
  profileDay?: number;
  /** Marker visual weight 1 (minor) – 3 (summit/start) */
  priority: 1 | 2 | 3;
};

export type TrekGeography = {
  trekId: string;
  caption?: string;
  waypoints: ResolvedWaypoint[];
  segments: RouteSegment[];
  bounds: [[number, number], [number, number]];
};

export type ResolvedRouteGeometry = {
  /** Full merged coordinates for bounds + fit */
  allCoordinates: [number, number][];
  /** Completed portion up to active day (for progress highlight) */
  progressCoordinates: [number, number][];
  hasDrawableRoute: boolean;
};
