import type { Coordinate, MapBounds, MapPadding } from '@/types/trek-map';

export function isFiniteCoord(coord: Coordinate): boolean {
  return (
    Array.isArray(coord) &&
    coord.length >= 2 &&
    Number.isFinite(coord[0]) &&
    Number.isFinite(coord[1])
  );
}

export function computeBoundsFromCoords(coords: Coordinate[]): MapBounds {
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;

  for (const coord of coords) {
    if (!isFiniteCoord(coord)) continue;
    const [lng, lat] = coord;
    minLng = Math.min(minLng, lng);
    minLat = Math.min(minLat, lat);
    maxLng = Math.max(maxLng, lng);
    maxLat = Math.max(maxLat, lat);
  }

  if (!Number.isFinite(minLng)) {
    return [
      [78.0, 30.0],
      [79.0, 31.0],
    ];
  }

  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
}

export function expandBounds(bounds: MapBounds, factor = 0.1): MapBounds {
  const [[minLng, minLat], [maxLng, maxLat]] = bounds;
  const dLng = (maxLng - minLng) * factor || 0.05;
  const dLat = (maxLat - minLat) * factor || 0.05;
  return [
    [minLng - dLng, minLat - dLat],
    [maxLng + dLng, maxLat + dLat],
  ];
}

export function boundsCenter(bounds: MapBounds): Coordinate {
  return [(bounds[0][0] + bounds[1][0]) / 2, (bounds[0][1] + bounds[1][1]) / 2];
}

export function isValidBounds(bounds: MapBounds): boolean {
  const [[minLng, minLat], [maxLng, maxLat]] = bounds;
  return (
    Number.isFinite(minLng) &&
    Number.isFinite(minLat) &&
    Number.isFinite(maxLng) &&
    Number.isFinite(maxLat) &&
    Math.abs(maxLng - minLng) > 0.005 &&
    Math.abs(maxLat - minLat) > 0.005
  );
}

/** Haversine distance in km between two coordinates. */
export function haversineKm(a: Coordinate, b: Coordinate): number {
  const R = 6371;
  const dLat = ((b[1] - a[1]) * Math.PI) / 180;
  const dLng = ((b[0] - a[0]) * Math.PI) / 180;
  const lat1 = (a[1] * Math.PI) / 180;
  const lat2 = (b[1] * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function polylineLengthKm(coords: Coordinate[]): number {
  let total = 0;
  for (let i = 1; i < coords.length; i += 1) {
    total += haversineKm(coords[i - 1], coords[i]);
  }
  return total;
}

export function coordinateAtProgress(coords: Coordinate[], progress: number): Coordinate | null {
  if (coords.length < 2) return coords[0] ?? null;
  const t = Math.max(0, Math.min(1, progress));
  const total = polylineLengthKm(coords);
  if (total <= 0) return coords[0];
  const target = total * t;
  let walked = 0;
  for (let i = 1; i < coords.length; i += 1) {
    const seg = haversineKm(coords[i - 1], coords[i]);
    if (walked + seg >= target) {
      const frac = seg > 0 ? (target - walked) / seg : 0;
      return [
        coords[i - 1][0] + (coords[i][0] - coords[i - 1][0]) * frac,
        coords[i - 1][1] + (coords[i][1] - coords[i - 1][1]) * frac,
      ];
    }
    walked += seg;
  }
  return coords[coords.length - 1];
}

export function coordinateAtDistanceKm(
  coords: Coordinate[],
  totalKm: number,
  distanceKm: number,
): Coordinate | null {
  if (totalKm <= 0) return coords[0] ?? null;
  return coordinateAtProgress(coords, distanceKm / totalKm);
}

export const DEFAULT_FIT_PADDING: MapPadding = {
  top: 80,
  bottom: 64,
  left: 56,
  right: 56,
};
