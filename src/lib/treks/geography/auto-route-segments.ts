import { getLocation } from './locations';
import type { TrekRouteDefinition, TrekRouteSegmentDefinition, TrailStop } from './types';

export function straightLineCoords(
  fromKey: string,
  toKey: string,
): [number, number][] | null {
  const from = getLocation(fromKey);
  const to = getLocation(toKey);
  if (!from || !to) return null;
  return [
    [from.lng, from.lat],
    [to.lng, to.lat],
  ];
}

/** Infer whether a leg between two waypoints is road or on-foot. */
function legIsDrive(
  fromActivity?: string,
  toActivity?: string,
): boolean {
  if (fromActivity === 'drive' && toActivity === 'drive') return true;
  if (toActivity === 'drive' && fromActivity !== 'trek' && fromActivity !== 'summit') return true;
  return false;
}

/** Auto-build drive + trek segments for treks without explicit `routeSegments`. */
export function buildAutoRouteSegments(def: TrekRouteDefinition): TrekRouteSegmentDefinition[] {
  const segments: TrekRouteSegmentDefinition[] = [];
  const wps = def.waypoints;

  for (let i = 0; i < wps.length - 1; i += 1) {
    const a = wps[i];
    const b = wps[i + 1];
    if (a.locationKey === b.locationKey) continue;

    const isDrive = legIsDrive(a.activity, b.activity);

    segments.push({
      id: isDrive ? `auto-drive-${i}` : `auto-trek-${i}`,
      geometryKind: isDrive ? 'driving-network' : 'gps-track',
      driveFrom: a.locationKey,
      driveTo: b.locationKey,
      driveVia: isDrive ? def.driveVia : undefined,
      dayStart: Math.min(a.day, b.day),
      dayEnd: Math.max(a.day, b.day),
    });
  }

  return segments;
}

/** Trail markers for camps, temples, summits — derived from waypoints when not explicit. */
export function buildAutoTrailStops(def: TrekRouteDefinition): TrailStop[] {
  if (def.trailStops?.length) return def.trailStops;

  return def.waypoints
    .filter((wp) => wp.kind !== 'start' && wp.kind !== 'end')
    .map((wp) => ({
      locationKey: wp.locationKey,
      kind: wp.kind,
      label: getLocation(wp.locationKey)?.name ?? wp.locationKey,
      itineraryDay: wp.day,
      pinExact: wp.kind === 'summit',
    }));
}

/** One-line route summary for map caption when none is authored. */
export function buildAutoCaption(def: TrekRouteDefinition): string {
  if (def.caption) return def.caption;

  const names = def.waypoints
    .map((wp) => getLocation(wp.locationKey)?.name)
    .filter((name, index, arr): name is string => Boolean(name && arr.indexOf(name) === index));

  if (names.length < 2) {
    return 'Select a day below to highlight each leg of the itinerary on the map.';
  }

  return `${names.length}-stop route — ${names.join(' → ')}. Dashed gray = road transfer · solid red = trekking.`;
}
