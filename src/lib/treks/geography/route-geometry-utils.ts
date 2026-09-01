import type { MapDisplayWaypoint, ResolvedWaypoint, RouteSegment, TrekGeography } from './types';

function coordsNear(a: [number, number], b: [number, number], epsilon = 0.003): boolean {
  return Math.abs(a[0] - b[0]) <= epsilon && Math.abs(a[1] - b[1]) <= epsilon;
}

function coordsKey(lng: number, lat: number): string {
  return `${lng.toFixed(4)},${lat.toFixed(4)}`;
}

/** Minimum separation between marker centres (~1.5 km at Garhwal latitudes). */
const MARKER_MIN_DEG = 0.016;

function mergeColocatedWaypoints(waypoints: ResolvedWaypoint[], activeDay: number): MapDisplayWaypoint[] {
  const groups: ResolvedWaypoint[][] = [];

  for (const wp of waypoints) {
    const match = groups.find((group) =>
      coordsNear([group[0].lng, group[0].lat], [wp.lng, wp.lat], 0.0015),
    );
    if (match) match.push(wp);
    else groups.push([wp]);
  }

  return groups.map((group) => {
    const anchor = group.find((wp) => wp.day === activeDay) ?? group[0];
    return {
      ...anchor,
      displayLng: anchor.lng,
      displayLat: anchor.lat,
      days: group.map((wp) => wp.day).sort((a, b) => a - b),
    };
  });
}

function separateOverlappingMarkers(markers: MapDisplayWaypoint[]): MapDisplayWaypoint[] {
  const placed = markers.map((m) => ({ ...m }));

  for (let pass = 0; pass < 3; pass += 1) {
    for (let i = 0; i < placed.length; i += 1) {
      for (let j = 0; j < i; j += 1) {
        const a = placed[i];
        const b = placed[j];
        let dLng = a.displayLng - b.displayLng;
        let dLat = a.displayLat - b.displayLat;
        let dist = Math.hypot(dLng, dLat);

        if (dist >= MARKER_MIN_DEG) continue;

        if (dist < 1e-9) {
          const angle = ((a.days[0] * 73) % 360) * (Math.PI / 180);
          dLng = Math.cos(angle);
          dLat = Math.sin(angle);
          dist = 1;
        }

        const push = (MARKER_MIN_DEG - dist) / 2 + 0.002;
        a.displayLng += (dLng / dist) * push;
        a.displayLat += (dLat / dist) * push;
        b.displayLng -= (dLng / dist) * push;
        b.displayLat -= (dLat / dist) * push;
      }
    }
  }

  return placed;
}

/** Layout day markers so labels never stack — merges D1/D5 at Dehradun, spreads nearby camps. */
export function layoutMapWaypoints(
  waypoints: ResolvedWaypoint[],
  activeDay: number,
): MapDisplayWaypoint[] {
  const primaries = waypoints
    .filter((wp) => wp.markerRole === 'primary')
    .sort((a, b) => a.day - b.day);

  const merged = mergeColocatedWaypoints(primaries, activeDay);
  return separateOverlappingMarkers(merged);
}

/** @deprecated Use layoutMapWaypoints */
export function selectMapWaypoints(
  waypoints: ResolvedWaypoint[],
  activeDay: number,
): ResolvedWaypoint[] {
  return layoutMapWaypoints(waypoints, activeDay).map((wp) => ({ ...wp, day: wp.days.includes(activeDay) ? activeDay : wp.days[0] }));
}

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

export function mergeSegmentCoordinates(
  segments: RouteSegment[],
  category?: 'drive' | 'trek',
): [number, number][] {
  const filtered = category
    ? segments.filter((seg) => seg.segmentCategory === category && seg.coordinates?.length)
    : segments.filter((seg) => seg.coordinates?.length);

  const out: [number, number][] = [];
  for (const seg of filtered) {
    if (!seg.coordinates?.length) continue;
    if (out.length && seg.coordinates[0]) {
      const last = out[out.length - 1];
      const first = seg.coordinates[0];
      if (last[0] === first[0] && last[1] === first[1]) {
        out.push(...seg.coordinates.slice(1));
        continue;
      }
      if (coordsNear(last, first)) {
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
  category?: 'drive' | 'trek',
): [number, number][] {
  const scoped = category
    ? segments.filter((seg) => seg.segmentCategory === category)
    : segments;

  const cumulative = scoped.filter((seg) => seg.dayEnd <= activeDay && seg.coordinates?.length);
  const merged = mergeSegmentCoordinates(cumulative);
  if (merged.length >= 2) return merged;

  if (category === 'trek') {
    const trekSeg = scoped.find((seg) => seg.coordinates?.length);
    return trekSeg?.coordinates?.slice(0, 2) ?? [];
  }

  const activeWp =
    waypoints.find((w) => w.day === activeDay && w.markerRole === 'primary') ??
    waypoints.find((w) => w.day === activeDay);
  if (!activeWp) return scoped[0]?.coordinates?.slice(0, 2) ?? [];

  const all = mergeSegmentCoordinates(scoped);
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
  const trekCoordinates = mergeSegmentCoordinates(segments, 'trek');
  const driveCoordinates = mergeSegmentCoordinates(segments, 'drive');
  const allCoordinates = mergeSegmentCoordinates(segments);
  const trekProgressCoordinates = progressCoordinatesForDay(segments, waypoints, activeDay, 'trek');
  const progressCoordinates = progressCoordinatesForDay(segments, waypoints, activeDay);
  return {
    allCoordinates,
    trekCoordinates,
    driveCoordinates,
    trekProgressCoordinates,
    progressCoordinates,
    hasDrawableRoute: allCoordinates.length >= 2,
    hasDrawableTrekRoute: trekCoordinates.length >= 2,
  };
}

export function boundsForGeography(
  geography: TrekGeography,
  resolvedCoords: [number, number][],
): [[number, number], [number, number]] {
  const wpCoords = [
    ...geography.waypoints,
    ...geography.trailStops,
  ].map((w) => [w.lng, w.lat] as [number, number]);
  const combined = resolvedCoords.length ? resolvedCoords : wpCoords;
  return computeBoundsFromCoords(combined.length ? combined : wpCoords);
}
