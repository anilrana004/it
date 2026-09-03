/** Canonical trek map types — Mapbox GL JS stack. */

/** [longitude, latitude] — GeoJSON order. */
export type Coordinate = [number, number];

export type MapBounds = [[number, number], [number, number]];

export type MapPadding = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

/** Map style: standard vector or satellite imagery. */
export type MapStyleMode = 'standard' | 'satellite';

/**
 * Complete journey (pickup → drop-off) vs hiking trail only.
 * Default: complete when transfer/return geometry exists.
 */
export type JourneyMode = 'complete' | 'trek-only';

/** Physical role of a route segment in the traveler journey. */
export type JourneySegmentRole = 'transfer' | 'trek' | 'return' | 'optional';

export type LocationKind =
  | 'start'
  | 'end'
  | 'pickup'
  | 'dropoff'
  | 'trailhead'
  | 'parking'
  | 'village'
  | 'camp'
  | 'base-camp'
  | 'summit'
  | 'pass'
  | 'viewpoint'
  | 'water'
  | 'temple'
  | 'lake'
  | 'forest'
  | 'landmark'
  | 'checkpoint'
  | 'rest'
  | 'food'
  | 'emergency'
  | 'drive';

export type MapSelection = 'overview' | 'summit' | number;

export type TrekMapLocation = {
  id: string;
  name: string;
  kind: LocationKind;
  lng: number;
  lat: number;
  elevationM?: number;
  description?: string;
  imagePublicId?: string;
  /** Itinerary days this location belongs to */
  days: number[];
  /** Visual weight 1 (minor) – 3 (start/summit) */
  importance: 1 | 2 | 3;
  verified: boolean;
};

export type TrekMapSegment = {
  id: string;
  category: 'trek' | 'drive';
  /** Journey role derived from trek data order (not hardcoded trek names). */
  role: JourneySegmentRole;
  coordinates: Coordinate[];
  dayStart: number;
  dayEnd: number;
  /**
   * True when geometry comes from GPS / verified driving track.
   * False for missing or fabricated straight-line stubs — never treat as real trail.
   */
  verified: boolean;
  /** Dev-facing note when geometry is incomplete. */
  missingGeometryReason?: string;
};

export type TrekMapDay = {
  day: number;
  label: string;
  title: string;
  segmentIds: string[];
  locationIds: string[];
};

/** Ordered itinerary destination used for green progress tracking. */
export type TrekMapItineraryStop = {
  day: number;
  locationId: string;
  name: string;
  kind: LocationKind;
  lng: number;
  lat: number;
};

/**
 * Important point projected onto the continuous journey route.
 * `distanceAlongRoute` is km from journey start along verified geometry.
 */
export type JourneyPoint = {
  id: string;
  name: string;
  type: LocationKind;
  coordinates: Coordinate;
  day: number;
  routeSegmentId: string | null;
  distanceAlongRoute: number;
  elevation?: number;
  importance: 1 | 2 | 3;
  /** Off-route if nearest verified geometry is farther than threshold. */
  onRoute: boolean;
};

export type TrekMapElevationSample = {
  distanceKm: number;
  elevationM: number;
  day: number;
};

/** Structured pickup → drop-off journey derived from trek geography. */
export type TrekJourney = {
  pickup: JourneyPoint | null;
  trekStart: JourneyPoint | null;
  summit: JourneyPoint | null;
  dropoff: JourneyPoint | null;
  transferSegments: TrekMapSegment[];
  trekSegments: TrekMapSegment[];
  returnSegments: TrekMapSegment[];
  optionalSegments: TrekMapSegment[];
  /** All ordered segments with verified geometry for complete mode. */
  orderedSegments: TrekMapSegment[];
  itineraryPoints: JourneyPoint[];
  /** Warnings for missing / unverified geometry (never invent routes). */
  warnings: string[];
  hasTransfer: boolean;
  hasReturn: boolean;
  supportsCompleteJourney: boolean;
};

export type TrekMapModel = {
  trekId: string;
  title: string;
  caption?: string;
  segments: TrekMapSegment[];
  locations: TrekMapLocation[];
  days: TrekMapDay[];
  /** Day-ordered primary stops from the itinerary (start → camps → summit → …). */
  itineraryStops: TrekMapItineraryStop[];
  /** Complete physical journey model (pickup → drop-off). */
  journey: TrekJourney;
  bounds: MapBounds;
  hasSummit: boolean;
  summitDay?: number;
  elevationSamples: TrekMapElevationSample[];
  stats: {
    distanceKm: number | null;
    gainFt: number | null;
    maxAltFt: number | null;
  };
};

export type TrekMapConfig = {
  defaultPitch: number;
  defaultBearing: number;
  terrainExaggeration: number;
  fitPadding: MapPadding;
  fitMinZoom: number;
  fitMaxZoom: number;
  mapMinZoom: number;
  mapMaxZoom: number;
  globeMaxZoom: number;
};
