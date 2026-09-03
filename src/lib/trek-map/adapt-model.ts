import type { RouteProfile } from '@/lib/treks/route-profile-types';
import type { TrekGeography, WaypointKind } from '@/lib/treks/geography/types';
import { resolveRouteGeometry } from '@/lib/treks/geography/route-geometry-utils';
import { buildElevationProfile } from '@/lib/treks/elevation-profile-utils';
import type {
  LocationKind,
  MapSelection,
  TrekMapDay,
  TrekMapElevationSample,
  TrekMapItineraryStop,
  TrekMapLocation,
  TrekMapModel,
  TrekMapSegment,
} from '@/types/trek-map';
import { computeBoundsFromCoords, polylineLengthKm } from './geo-utils';
import { assignSegmentRoles, buildTrekJourney } from './journey-model';

function kindFromWaypoint(kind: WaypointKind): LocationKind {
  const map: Record<WaypointKind, LocationKind> = {
    start: 'start',
    village: 'village',
    camp: 'camp',
    'base-camp': 'base-camp',
    water: 'water',
    pass: 'pass',
    viewpoint: 'viewpoint',
    summit: 'summit',
    temple: 'temple',
    end: 'end',
  };
  return map[kind] ?? 'landmark';
}

function importanceFromKind(kind: LocationKind, priority: number): 1 | 2 | 3 {
  if (
    kind === 'summit' ||
    kind === 'start' ||
    kind === 'end' ||
    kind === 'pickup' ||
    kind === 'dropoff'
  ) {
    return 3;
  }
  if (kind === 'base-camp' || kind === 'camp' || kind === 'trailhead' || priority >= 3) return 2;
  return Math.min(3, Math.max(1, priority)) as 1 | 2 | 3;
}

function buildLocations(geography: TrekGeography): TrekMapLocation[] {
  const all = [...geography.waypoints, ...geography.trailStops];
  const byKey = new Map<string, TrekMapLocation>();

  for (const wp of all) {
    const kind = kindFromWaypoint(wp.kind);
    const existing = byKey.get(wp.id);
    if (existing) {
      if (!existing.days.includes(wp.day)) {
        existing.days.push(wp.day);
        existing.days.sort((a, b) => a - b);
      }
      continue;
    }
    byKey.set(wp.id, {
      id: wp.id,
      name: wp.name,
      kind,
      lng: wp.lng,
      lat: wp.lat,
      elevationM: wp.elevationM,
      description: wp.description,
      imagePublicId: wp.imagePublicId,
      days: [wp.day],
      importance: importanceFromKind(kind, wp.priority),
      verified: wp.source !== 'project-itinerary',
    });
  }

  return [...byKey.values()];
}

/**
 * Only GPS tracks and driving segments with a real trackKey count as verified.
 * Straight-line stubs are kept for diagnostics but marked unverified.
 */
function buildSegments(geography: TrekGeography): TrekMapSegment[] {
  const raw = geography.segments
    .filter((seg) => seg.coordinates && seg.coordinates.length >= 2)
    .map((seg) => {
      const isDrive = seg.segmentCategory === 'drive' || seg.geometryKind === 'driving-network';
      const hasTrack = seg.geometryKind === 'gps-track' || Boolean(seg.fallbackTrackKey);
      const looksLikeStraightStub =
        isDrive && !seg.fallbackTrackKey && (seg.coordinates?.length ?? 0) <= 3;
      const verified = hasTrack && !looksLikeStraightStub;

      return {
        id: seg.id,
        category: (isDrive ? 'drive' : 'trek') as 'trek' | 'drive',
        role: 'trek' as const,
        coordinates: seg.coordinates!,
        dayStart: seg.dayStart,
        dayEnd: seg.dayEnd,
        verified,
        missingGeometryReason: verified
          ? undefined
          : `Verified route geometry is missing for segment "${seg.id}".`,
      };
    });

  return assignSegmentRoles(raw);
}

function buildDays(
  profile: RouteProfile,
  segments: TrekMapSegment[],
  locations: TrekMapLocation[],
): TrekMapDay[] {
  return profile.points.map((point) => {
    const day = point.day;
    const segmentIds = segments
      .filter((s) => s.dayStart <= day && s.dayEnd >= day)
      .map((s) => s.id);
    const locationIds = locations.filter((l) => l.days.includes(day)).map((l) => l.id);
    return {
      day,
      label: point.label,
      title: point.title,
      segmentIds,
      locationIds,
    };
  });
}

function buildItineraryStops(
  profile: RouteProfile,
  locations: TrekMapLocation[],
  geography: TrekGeography,
): TrekMapItineraryStop[] {
  const byDayPrimary = new Map<number, TrekMapLocation>();

  for (const wp of geography.waypoints) {
    if (wp.markerRole && wp.markerRole !== 'primary') continue;
    const loc = locations.find((l) => l.id === wp.id);
    if (!loc) continue;
    if (!byDayPrimary.has(wp.day) || loc.importance >= (byDayPrimary.get(wp.day)?.importance ?? 0)) {
      byDayPrimary.set(wp.day, loc);
    }
  }

  const stops: TrekMapItineraryStop[] = [];
  for (const point of profile.points) {
    const loc =
      byDayPrimary.get(point.day) ??
      locations.find((l) => l.days.includes(point.day) && l.importance >= 2) ??
      locations.find((l) => l.days.includes(point.day));
    if (!loc) continue;
    const prev = stops[stops.length - 1];
    if (prev && prev.locationId === loc.id && prev.day === point.day) continue;
    stops.push({
      day: point.day,
      locationId: loc.id,
      name: loc.name || point.label,
      kind: loc.kind,
      lng: loc.lng,
      lat: loc.lat,
    });
  }

  const startLoc = locations.find((l) => l.kind === 'start' || l.kind === 'pickup');
  if (startLoc && stops[0]?.locationId !== startLoc.id) {
    stops.unshift({
      day: Math.min(1, stops[0]?.day ?? 1),
      locationId: startLoc.id,
      name: startLoc.name || 'Pickup',
      kind: 'start',
      lng: startLoc.lng,
      lat: startLoc.lat,
    });
  } else if (stops[0] && stops[0].kind !== 'start' && !startLoc) {
    stops[0] = { ...stops[0], kind: 'start', name: stops[0].name || 'Pickup' };
  }

  return stops;
}

function buildElevationSamples(
  profile: RouteProfile,
  segments: TrekMapSegment[],
): TrekMapElevationSample[] {
  const elevation = buildElevationProfile(profile);
  if (elevation?.samples?.length) {
    return elevation.samples.map((s) => ({
      distanceKm: s.distanceKm,
      elevationM: s.altitudeFt * 0.3048,
      day: s.day,
    }));
  }

  const trekCoords = segments.filter((s) => s.category === 'trek').flatMap((s) => s.coordinates);
  if (trekCoords.length < 2) return [];

  const totalKm = polylineLengthKm(trekCoords);
  const samples: TrekMapElevationSample[] = [];
  const steps = Math.min(80, trekCoords.length);
  for (let i = 0; i < steps; i += 1) {
    const t = i / (steps - 1);
    samples.push({
      distanceKm: totalKm * t,
      elevationM: 0,
      day: profile.points[0]?.day ?? 1,
    });
  }
  return samples;
}

export function adaptTrekGeography(
  geography: TrekGeography,
  profile: RouteProfile,
  title: string,
): TrekMapModel {
  const segments = buildSegments(geography);
  const locations = buildLocations(geography);
  const days = buildDays(profile, segments, locations);
  const itineraryStops = buildItineraryStops(profile, locations, geography);
  const journey = buildTrekJourney(segments, locations);
  const summitLoc = locations.find((l) => l.kind === 'summit');
  const summitDay = summitLoc?.days[0] ?? profile.points.find((p) => p.activity === 'summit')?.day;

  const routeGeom = resolveRouteGeometry(geography.segments, geography.waypoints, 999);
  const allCoords = routeGeom.allCoordinates.length
    ? routeGeom.allCoordinates
    : locations.map((l) => [l.lng, l.lat] as [number, number]);

  if (process.env.NODE_ENV === 'development' && journey.warnings.length) {
    // eslint-disable-next-line no-console
    console.warn(`[trek-map:${geography.trekId}]`, journey.warnings.join('\n'));
  }

  return {
    trekId: geography.trekId,
    title,
    caption: geography.caption,
    segments,
    locations,
    days,
    itineraryStops,
    journey,
    bounds: geography.bounds.length ? geography.bounds : computeBoundsFromCoords(allCoords),
    hasSummit: Boolean(summitLoc),
    summitDay,
    elevationSamples: buildElevationSamples(profile, segments),
    stats: {
      distanceKm: profile.totalDistanceKm,
      gainFt: profile.totalGainFt,
      maxAltFt: profile.maxAltitudeFt,
    },
  };
}

export function selectionToDay(selection: MapSelection): number | null {
  if (selection === 'overview') return null;
  if (selection === 'summit') return null;
  return selection;
}

export function dayLabelForSelection(model: TrekMapModel, selection: MapSelection): string {
  if (selection === 'overview') return 'Complete journey';
  if (selection === 'summit') return 'Summit';
  const day = model.days.find((d) => d.day === selection);
  return day ? `Day ${day.day}` : `Day ${selection}`;
}
