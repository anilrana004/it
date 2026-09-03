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
  description?: string;
  /** Cloudinary public ID or versioned asset path — not a raw external URL. */
  imagePublicId?: string;
};

export type TrekWaypoint = {
  day: number;
  locationKey: string;
  kind: WaypointKind;
  activity?: RouteActivity;
  /** Primary day marker — always shown on map and used for day focus */
  markerRole?: 'primary' | 'secondary';
};

export type TrekRouteDefinition = {
  trekId: string;
  caption?: string;
  waypoints: TrekWaypoint[];
  /** Optional pre-defined GPS track key (see route-tracks.ts) — legacy auto-build */
  trackKey?: string;
  /** Drive corridor via location keys — resolved through Mapbox Directions */
  driveVia?: string[];
  /** Explicit ordered segments for full route geometry (Dehradun → summit → return) */
  routeSegments?: TrekRouteSegmentDefinition[];
  /** On-trail camps and summit — exact GPS markers independent of day pills */
  trailStops?: TrailStop[];
};

export type TrekRouteSegmentDefinition = {
  id: string;
  geometryKind: RouteGeometryKind;
  /** Static geometry key in route-tracks.ts */
  trackKey?: string;
  driveFrom?: string;
  driveTo?: string;
  driveVia?: string[];
  dayStart: number;
  dayEnd: number;
};

/** A drawable route segment — trek segments without GPS tracks have kind 'none'. */
export type RouteSegment = {
  id: string;
  geometryKind: RouteGeometryKind;
  /** Distinguishes road transfer from on-foot trail for map styling */
  segmentCategory?: 'drive' | 'trek';
  /** Present when geometryKind is gps-track, or as driving fallback */
  coordinates?: [number, number][];
  /** Static fallback when Mapbox driving resolution fails */
  fallbackTrackKey?: string;
  /** For driving-network — location keys to resolve via Mapbox Directions */
  driveFrom?: string;
  driveTo?: string;
  driveVia?: string[];
  dayStart: number;
  dayEnd: number;
};

export type TrailStop = {
  locationKey: string;
  kind: WaypointKind;
  label: string;
  itineraryDay?: number;
  /** Summit pins are never offset from verified coordinates */
  pinExact?: boolean;
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
  markerRole?: 'primary' | 'secondary';
  /** Marker visual weight 1 (minor) – 3 (summit/start) */
  priority: 1 | 2 | 3;
  description?: string;
  imagePublicId?: string;
  /** When true, marker uses exact registry coordinates (never layout-offset). */
  pinExact?: boolean;
};

export type MapDisplayWaypoint = ResolvedWaypoint & {
  displayLng: number;
  displayLat: number;
  /** One or more itinerary days at this pin (merged when co-located). */
  days: number[];
};

export type TrekGeography = {
  trekId: string;
  caption?: string;
  waypoints: ResolvedWaypoint[];
  trailStops: ResolvedWaypoint[];
  segments: RouteSegment[];
  bounds: [[number, number], [number, number]];
};

export type ResolvedRouteGeometry = {
  /** Full merged coordinates for bounds + fit */
  allCoordinates: [number, number][];
  /** On-foot trail only — rendered in red */
  trekCoordinates: [number, number][];
  /** Road transfer only — rendered muted */
  driveCoordinates: [number, number][];
  /** Completed trek portion up to active day */
  trekProgressCoordinates: [number, number][];
  /** Completed drive portion up to active day */
  driveProgressCoordinates: [number, number][];
  /** Completed full route up to active day */
  progressCoordinates: [number, number][];
  hasDrawableRoute: boolean;
  hasDrawableTrekRoute: boolean;
  hasDrawableDriveRoute: boolean;
};
