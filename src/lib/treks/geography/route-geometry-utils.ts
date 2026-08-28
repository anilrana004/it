import type { ResolvedWaypoint, RouteSegment, TrekGeography } from './types';

export function waypointPriority(kind: ResolvedWaypoint['kind']): 1 | 2 | 3 {
  if (kind === 'summit' || kind === 'start' || kind === 'end' || kind === 'base-camp') return 3;
  if (kind === 'camp' || kind === 'pass' || kind === 'temple' || kind === 'water') return 2;
  return 1;
}

export function computeBoundsFromCoords(
  coords: [number, number][],
): [[number, number], [number, number]] {
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;
  for (const [lng, lat] of coords) {
    minLng = Math.min(minLng, lng);
    minLat = Math.min(minLat, lat);
    maxLng = Math.max(maxLng, lng);
    maxLat = Math.max(maxLat, lat);
  }
  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
}

export function mergeSegmentCoordinates(segments: RouteSegment[]): [number, number][] {
  const out: [number, number][] = [];
  for (const seg of segments) {
    if (!seg.coordinates?.length) continue;
    if (out.length && seg.coordinates[0]) {
      const last = out[out.length - 1];
      const first = seg.coordinates[0];
      if (last[0] === first[0] && last[1] === first[1]) {
        out.push(...seg.coordinates.slice(1));
        continue;
      }
    }
    out.push(...seg.coordinates);
  }
  return out;
}

export function progressCoordinatesForDay(
  segments: RouteSegment[],
  waypoints: ResolvedWaypoint[],
  activeDay: number,
): [number, number][] {
  const activeIdx = waypoints.findIndex((w) => w.day === activeDay);
  if (activeIdx <= 0) return segments[0]?.coordinates?.slice(0, 2) ?? [];

  const activeWp = waypoints[activeIdx];
  const all = mergeSegmentCoordinates(segments);
  if (!all.length) return [];

  let bestIdx = 0;
  let bestDist = Infinity;
  for (let i = 0; i < all.length; i += 1) {
    const dx = all[i][0] - activeWp.lng;
    const dy = all[i][1] - activeWp.lat;
    const d = dx * dx + dy * dy;
    if (d < bestDist) {
      bestDist = d;
      bestIdx = i;
    }
  }

  return all.slice(0, bestIdx + 1);
}

export function resolveRouteGeometry(
  segments: RouteSegment[],
  waypoints: ResolvedWaypoint[],
  activeDay: number,
) {
  const allCoordinates = mergeSegmentCoordinates(segments);
  const progressCoordinates = progressCoordinatesForDay(segments, waypoints, activeDay);
  return {
    allCoordinates,
    progressCoordinates,
    hasDrawableRoute: allCoordinates.length >= 2,
  };
}

export function boundsForGeography(
  geography: TrekGeography,
  resolvedCoords: [number, number][],
): [[number, number], [number, number]] {
  const wpCoords = geography.waypoints.map((w) => [w.lng, w.lat] as [number, number]);
  const combined = resolvedCoords.length ? resolvedCoords : wpCoords;
  return computeBoundsFromCoords(combined.length ? combined : wpCoords);
}
