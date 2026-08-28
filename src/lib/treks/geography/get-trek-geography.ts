import type { RouteProfile } from '@/lib/treks/route-profile-types';
import { getLocation } from './locations';
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

function buildSegments(def: TrekRouteDefinition): RouteSegment[] {
  const segments: RouteSegment[] = [];
  const wps = def.waypoints;

  if (def.trackKey && ROUTE_TRACKS[def.trackKey]) {
    segments.push({
      id: `${def.trekId}-trek-track`,
      geometryKind: 'gps-track',
      coordinates: ROUTE_TRACKS[def.trackKey].coordinates,
      dayStart: wps.find((w) => w.activity === 'trek' || w.kind === 'summit')?.day ?? 2,
      dayEnd: wps.filter((w) => w.activity === 'trek' || w.kind === 'summit').at(-1)?.day ?? 5,
    });
  }

  for (let i = 0; i < wps.length - 1; i += 1) {
    const a = wps[i];
    const b = wps[i + 1];
    if (a.activity !== 'drive' && b.activity !== 'drive') continue;
    if (a.locationKey === b.locationKey) continue;

    segments.push({
      id: `${def.trekId}-drive-${i}`,
      geometryKind: 'driving-network',
      driveFrom: a.locationKey,
      driveTo: b.locationKey,
      driveVia: def.driveVia,
      dayStart: a.day,
      dayEnd: b.day,
    });
  }

  return segments;
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
      priority: waypointPriority(wp.kind),
    });
  }

  const waypoints = dedupeWaypoints(resolved);
  if (waypoints.length < 1) return null;

  const segments = buildSegments(def);
  const staticCoords = mergeSegmentCoordinates(segments);
  const bounds = boundsForGeography(
    { trekId: def.trekId, waypoints, segments, bounds: [[0, 0], [0, 0]] },
    staticCoords,
  );

  return {
    trekId: def.trekId,
    caption: def.caption,
    waypoints,
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
  return geography.waypoints.find((wp) => wp.day === day) ?? geography.waypoints[0];
}

/** Resolve driving-network segments via Mapbox Directions (client-side). */
export async function resolveDrivingSegments(
  segments: RouteSegment[],
): Promise<RouteSegment[]> {
  const { fetchDrivingRoute } = await import('./mapbox-directions');
  const resolved: RouteSegment[] = [];

  for (const seg of segments) {
    if (seg.geometryKind !== 'driving-network' || !seg.driveFrom || !seg.driveTo) {
      resolved.push(seg);
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
      resolved.push({ ...seg, coordinates: result.coordinates, geometryKind: 'driving-network' });
    } else {
      resolved.push({ ...seg, geometryKind: 'none' });
    }
  }

  return resolved;
}
