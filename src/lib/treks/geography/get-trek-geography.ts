import type { RouteProfile } from '@/lib/treks/route-profile-types';
import { getLocation } from './locations';
import {
  buildAutoCaption,
  buildAutoRouteSegments,
  buildAutoTrailStops,
  straightLineCoords,
} from './auto-route-segments';
import { ROUTE_TRACKS } from './route-tracks';
import { TREK_ROUTES } from './trek-routes';
import {
  boundsForGeography,
  mergeSegmentCoordinates,
  waypointPriority,
} from './route-geometry-utils';
import type {
  ResolvedWaypoint,
  RouteSegment,
  TrekGeography,
  TrekRouteDefinition,
} from './types';

function dedupeWaypoints(waypoints: ResolvedWaypoint[]): ResolvedWaypoint[] {
  const seen = new Set<string>();
  const out: ResolvedWaypoint[] = [];
  for (const wp of waypoints) {
    const key = `${wp.day}:${wp.lng.toFixed(5)},${wp.lat.toFixed(5)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(wp);
  }
  return out;
}

function attachTrackCoordinates(seg: RouteSegment): RouteSegment {
  const key = seg.fallbackTrackKey;
  if (!key || seg.coordinates?.length) return seg;
  const track = ROUTE_TRACKS[key];
  if (!track?.coordinates.length) return seg;
  return { ...seg, coordinates: track.coordinates };
}

function attachStraightLineFallback(seg: RouteSegment): RouteSegment {
  if (seg.coordinates?.length || !seg.driveFrom || !seg.driveTo) return seg;
  const coords = straightLineCoords(seg.driveFrom, seg.driveTo);
  if (!coords) return seg;
  return { ...seg, coordinates: coords };
}

function buildExplicitSegments(def: TrekRouteDefinition): RouteSegment[] {
  const segmentDefs = def.routeSegments?.length
    ? def.routeSegments
    : buildAutoRouteSegments(def);

  return segmentDefs.map((seg) => {
    const category: RouteSegment['segmentCategory'] =
      seg.geometryKind === 'gps-track' ? 'trek' : seg.geometryKind === 'driving-network' ? 'drive' : undefined;

    const base: RouteSegment = {
      id: `${def.trekId}-${seg.id}`,
      geometryKind: seg.geometryKind,
      segmentCategory: category,
      driveFrom: seg.driveFrom,
      driveTo: seg.driveTo,
      driveVia: seg.driveVia ?? def.driveVia,
      fallbackTrackKey: seg.trackKey,
      dayStart: seg.dayStart,
      dayEnd: seg.dayEnd,
    };

    if (seg.geometryKind === 'gps-track') {
      const withTrack = seg.trackKey
        ? attachTrackCoordinates({ ...base, fallbackTrackKey: seg.trackKey })
        : base;
      if (withTrack.coordinates?.length) return withTrack;
      if (seg.driveFrom && seg.driveTo) {
        const coords = straightLineCoords(seg.driveFrom, seg.driveTo);
        return coords ? { ...withTrack, coordinates: coords } : withTrack;
      }
      return withTrack;
    }

    if (seg.geometryKind === 'driving-network') {
      const withTrack = seg.trackKey
        ? attachTrackCoordinates({ ...base, fallbackTrackKey: seg.trackKey })
        : attachStraightLineFallback(base);
      return withTrack;
    }

    return base;
  });
}

function buildSegments(def: TrekRouteDefinition): RouteSegment[] {
  const segments = buildExplicitSegments(def);
  if (segments.length) return segments;

  const wps = def.waypoints;
  const fallback: RouteSegment[] = [];

  if (def.trackKey && ROUTE_TRACKS[def.trackKey]) {
    fallback.push(
      attachTrackCoordinates({
        id: `${def.trekId}-trek-track`,
        geometryKind: 'gps-track',
        segmentCategory: 'trek',
        fallbackTrackKey: def.trackKey,
        dayStart: wps.find((w) => w.activity === 'trek' || w.kind === 'summit')?.day ?? 2,
        dayEnd: wps.filter((w) => w.activity === 'trek' || w.kind === 'summit').at(-1)?.day ?? 5,
      }),
    );
  }

  return fallback;
}

function buildFromDefinition(def: TrekRouteDefinition, profile?: RouteProfile): TrekGeography | null {
  const resolved: ResolvedWaypoint[] = [];

  for (const wp of def.waypoints) {
    const loc = getLocation(wp.locationKey);
    if (!loc) continue;
    const profilePoint = profile?.points.find((p) => p.day === wp.day);
    resolved.push({
      id: `${def.trekId}-d${wp.day}-${loc.key}`,
      day: wp.day,
      name: loc.name,
      lng: loc.lng,
      lat: loc.lat,
      elevationM: loc.elevationM,
      kind: wp.kind,
      activity: wp.activity ?? profilePoint?.activity,
      source: loc.source,
      profileDay: wp.day,
      markerRole: wp.markerRole ?? 'primary',
      priority: waypointPriority(wp.kind),
      description: loc.description,
      imagePublicId: loc.imagePublicId,
    });
  }

  const waypoints = dedupeWaypoints(resolved);
  if (waypoints.length < 1) return null;

  const trailStopDefs = buildAutoTrailStops(def);
  const trailStops: ResolvedWaypoint[] = [];
  for (const stop of trailStopDefs) {
    const loc = getLocation(stop.locationKey);
    if (!loc) continue;
    trailStops.push({
      id: `${def.trekId}-trail-${loc.key}`,
      day: stop.itineraryDay ?? 0,
      name: stop.label || loc.name,
      lng: loc.lng,
      lat: loc.lat,
      elevationM: loc.elevationM,
      kind: stop.kind,
      activity: stop.kind === 'summit' ? 'summit' : 'trek',
      source: loc.source,
      markerRole: 'primary',
      priority: stop.kind === 'summit' ? 3 : stop.kind === 'base-camp' ? 3 : 2,
      description: loc.description,
      imagePublicId: loc.imagePublicId,
      pinExact: stop.pinExact ?? stop.kind === 'summit',
    });
  }

  const segments = buildSegments(def);
  const staticCoords = mergeSegmentCoordinates(segments);
  const bounds = boundsForGeography(
    { trekId: def.trekId, waypoints, trailStops, segments, bounds: [[0, 0], [0, 0]] },
    staticCoords,
  );

  return {
    trekId: def.trekId,
    caption: buildAutoCaption(def),
    waypoints,
    trailStops,
    segments,
    bounds,
  };
}

export function getTrekGeography(trekId: string, profile: RouteProfile): TrekGeography | null {
  const def = TREK_ROUTES[trekId];
  if (!def) return null;
  return buildFromDefinition(def, profile);
}

export function getWaypointForDay(geography: TrekGeography, day: number): ResolvedWaypoint | undefined {
  const dayWaypoints = geography.waypoints.filter((wp) => wp.day === day);
  return (
    dayWaypoints.find((wp) => wp.markerRole === 'primary') ??
    dayWaypoints.at(-1) ??
    geography.waypoints[0]
  );
}

/** Prefer verified road corridors when Mapbox Directions may reroute poorly. */
function shouldPreferVerifiedDriveTrack(seg: RouteSegment): boolean {
  return Boolean(
    seg.fallbackTrackKey?.match(
      /^(kedarkantha|kuari-pass|har-ki-dun|brahmatal|nag-tibba)-day\d+-(drive|jeep)$/,
    ),
  );
}

/** Resolve driving-network segments via Mapbox Directions (client-side). */
export async function resolveDrivingSegments(
  segments: RouteSegment[],
): Promise<RouteSegment[]> {
  const { fetchDrivingRoute } = await import('./driving-directions');
  const resolved: RouteSegment[] = [];

  for (const seg of segments) {
    if (seg.geometryKind !== 'driving-network' || !seg.driveFrom || !seg.driveTo) {
      resolved.push(seg);
      continue;
    }

    if (shouldPreferVerifiedDriveTrack(seg)) {
      const withTrack = attachTrackCoordinates({ ...seg, geometryKind: 'driving-network' });
      resolved.push(withTrack.coordinates?.length ? withTrack : { ...seg, geometryKind: 'none' });
      continue;
    }

    const from = getLocation(seg.driveFrom);
    const to = getLocation(seg.driveTo);
    if (!from || !to) {
      resolved.push({ ...seg, geometryKind: 'none' });
      continue;
    }

    const viaLocs = (seg.driveVia ?? [])
      .map((k) => getLocation(k))
      .filter(Boolean)
      .map((l) => ({ lng: l!.lng, lat: l!.lat }));

    const result = await fetchDrivingRoute(
      { lng: from.lng, lat: from.lat },
      { lng: to.lng, lat: to.lat },
      viaLocs,
    );

    if (result) {
      resolved.push({
        ...seg,
        segmentCategory: 'drive',
        coordinates: result.coordinates,
        geometryKind: 'driving-network',
      });
    } else {
      const withTrack = attachTrackCoordinates({ ...seg, segmentCategory: 'drive' });
      const withLine = withTrack.coordinates?.length ? withTrack : attachStraightLineFallback({ ...seg, segmentCategory: 'drive' });
      resolved.push(withLine.coordinates?.length ? withLine : { ...seg, segmentCategory: 'drive', geometryKind: 'none' });
    }
  }

  return resolved;
}
