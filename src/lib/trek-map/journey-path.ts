import type {
  Coordinate,
  JourneyMode,
  TrekMapLocation,
  TrekMapModel,
  TrekMapSegment,
} from '@/types/trek-map';
import { haversineKm, polylineLengthKm } from './geo-utils';
import { mergeSegmentCoordinates, segmentsForMode } from './journey-model';

export type JourneyLocationCue = {
  id: string;
  name: string;
  kind: TrekMapLocation['kind'];
  elevationM?: number;
  description?: string;
  day: number;
  /** 0–1 along cinematic path */
  progress: number;
  distanceKm: number;
  lng: number;
  lat: number;
  importance: 1 | 2 | 3;
  roleHint?: 'pickup' | 'trailhead' | 'summit' | 'dropoff' | 'transfer' | 'trek';
};

export type JourneyDayBand = {
  day: number;
  label: string;
  title: string;
  startProgress: number;
  endProgress: number;
  startKm: number;
  endKm: number;
};

export type JourneyPath = {
  mode: JourneyMode;
  coordinates: Coordinate[];
  totalKm: number;
  /** Cumulative km at each coordinate index */
  cumulativeKm: number[];
  dayBands: JourneyDayBand[];
  cues: JourneyLocationCue[];
  canPlay: boolean;
  reasonDisabled?: string;
  /** Segment roles along the path for HUD transitions */
  hasTransfer: boolean;
  hasReturn: boolean;
};

function buildCumulative(coords: Coordinate[]): { cumulativeKm: number[]; totalKm: number } {
  const cumulativeKm = [0];
  for (let i = 1; i < coords.length; i += 1) {
    cumulativeKm.push(cumulativeKm[i - 1] + haversineKm(coords[i - 1], coords[i]));
  }
  return { cumulativeKm, totalKm: cumulativeKm[cumulativeKm.length - 1] ?? 0 };
}

export function sampleAtProgress(
  path: JourneyPath,
  progress: number,
): { coord: Coordinate; distanceKm: number; bearing: number } {
  const t = Math.max(0, Math.min(1, progress));
  const targetKm = path.totalKm * t;
  const coords = path.coordinates;
  if (coords.length < 2) {
    return { coord: coords[0] ?? [0, 0], distanceKm: 0, bearing: 0 };
  }

  let i = 1;
  while (i < path.cumulativeKm.length && path.cumulativeKm[i] < targetKm) i += 1;
  const i0 = Math.max(0, i - 1);
  const i1 = Math.min(coords.length - 1, i);
  const segStart = path.cumulativeKm[i0];
  const segEnd = path.cumulativeKm[i1];
  const segLen = segEnd - segStart;
  const frac = segLen > 0 ? (targetKm - segStart) / segLen : 0;
  const coord: Coordinate = [
    coords[i0][0] + (coords[i1][0] - coords[i0][0]) * frac,
    coords[i0][1] + (coords[i1][1] - coords[i0][1]) * frac,
  ];
  const bearing = bearingDegrees(coords[i0], coords[i1] ?? coords[i0]);
  return { coord, distanceKm: targetKm, bearing };
}

export function lookAheadCoord(path: JourneyPath, progress: number, aheadKm = 0.45): Coordinate {
  const here = sampleAtProgress(path, progress);
  const aheadProgress = Math.min(1, (here.distanceKm + aheadKm) / Math.max(path.totalKm, 0.001));
  return sampleAtProgress(path, aheadProgress).coord;
}

function bearingDegrees(a: Coordinate, b: Coordinate): number {
  const φ1 = (a[1] * Math.PI) / 180;
  const φ2 = (b[1] * Math.PI) / 180;
  const Δλ = ((b[0] - a[0]) * Math.PI) / 180;
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function projectLocationProgress(
  lng: number,
  lat: number,
  path: JourneyPath,
  maxKm = 2.5,
): { progress: number; distanceKm: number } | null {
  let best = Infinity;
  let bestKm = 0;
  for (let i = 0; i < path.coordinates.length; i += 1) {
    const d = haversineKm([lng, lat], path.coordinates[i]);
    if (d < best) {
      best = d;
      bestKm = path.cumulativeKm[i] ?? 0;
    }
  }
  if (best > maxKm) return null;
  return {
    distanceKm: bestKm,
    progress: path.totalKm > 0 ? bestKm / path.totalKm : 0,
  };
}

function dayBandsForPath(
  model: TrekMapModel,
  segments: TrekMapSegment[],
  path: JourneyPath,
): JourneyDayBand[] {
  const dayKm = new Map<number, { start: number; end: number }>();
  let cursorKm = 0;

  for (const seg of segments) {
    const len = polylineLengthKm(seg.coordinates);
    const dayCount = Math.max(1, seg.dayEnd - seg.dayStart + 1);
    const share = len / dayCount;
    for (let day = seg.dayStart; day <= seg.dayEnd; day += 1) {
      const existing = dayKm.get(day);
      if (!existing) {
        dayKm.set(day, { start: cursorKm, end: cursorKm + share });
      } else {
        existing.end = cursorKm + share;
      }
      cursorKm += share;
    }
  }

  const bands: JourneyDayBand[] = [];
  for (const day of model.days) {
    const span = dayKm.get(day.day);
    if (!span) continue;
    const startKm = span.start;
    const endKm = Math.max(span.end, startKm + 0.01);
    bands.push({
      day: day.day,
      label: day.label,
      title: day.title,
      startKm,
      endKm,
      startProgress: path.totalKm > 0 ? startKm / path.totalKm : 0,
      endProgress: path.totalKm > 0 ? Math.min(1, endKm / path.totalKm) : 1,
    });
  }

  if (!bands.length && path.totalKm > 0) {
    bands.push({
      day: model.days[0]?.day ?? 1,
      label: model.days[0]?.label ?? 'Route',
      title: model.days[0]?.title ?? model.title,
      startKm: 0,
      endKm: path.totalKm,
      startProgress: 0,
      endProgress: 1,
    });
  }

  return bands;
}

export function dayAtProgress(path: JourneyPath, progress: number): JourneyDayBand | null {
  const t = Math.max(0, Math.min(1, progress));
  return (
    path.dayBands.find((b) => t >= b.startProgress && t <= b.endProgress) ??
    path.dayBands[path.dayBands.length - 1] ??
    null
  );
}

/**
 * Build cinematic path for Complete Journey (pickup→drop-off) or Trek Only.
 * Uses verified geometry only — never invents missing segments.
 */
export function buildJourneyPath(
  model: TrekMapModel,
  mode: JourneyMode = 'complete',
): JourneyPath {
  const effectiveMode: JourneyMode =
    mode === 'complete' && !model.journey.supportsCompleteJourney && model.journey.trekSegments.length
      ? 'trek-only'
      : mode;

  const segments = segmentsForMode(model.journey, effectiveMode);
  const coordinates = mergeSegmentCoordinates(segments);

  const empty = (reason: string): JourneyPath => ({
    mode: effectiveMode,
    coordinates: [],
    totalKm: 0,
    cumulativeKm: [],
    dayBands: [],
    cues: [],
    canPlay: false,
    reasonDisabled: reason,
    hasTransfer: model.journey.hasTransfer,
    hasReturn: model.journey.hasReturn,
  });

  if (coordinates.length < 2) {
    const warn = model.journey.warnings[0];
    return empty(
      warn ??
        'Verified route geometry is not available for a 3D journey on this trek yet.',
    );
  }

  const { cumulativeKm, totalKm } = buildCumulative(coordinates);
  if (totalKm < 0.2) {
    return empty('Route geometry is too short for a cinematic journey.');
  }

  const pathBase: JourneyPath = {
    mode: effectiveMode,
    coordinates,
    totalKm,
    cumulativeKm,
    dayBands: [],
    cues: [],
    canPlay: true,
    hasTransfer: effectiveMode === 'complete' && model.journey.hasTransfer,
    hasReturn: effectiveMode === 'complete' && model.journey.hasReturn,
  };
  pathBase.dayBands = dayBandsForPath(model, segments, pathBase);

  const cues: JourneyLocationCue[] = [];
  const pushCue = (
    id: string,
    name: string,
    kind: TrekMapLocation['kind'],
    lng: number,
    lat: number,
    day: number,
    importance: 1 | 2 | 3,
    elevationM?: number,
    description?: string,
    roleHint?: JourneyLocationCue['roleHint'],
  ) => {
    const projected = projectLocationProgress(lng, lat, pathBase, roleHint === 'pickup' || roleHint === 'dropoff' ? 8 : 2.5);
    if (!projected) return;
    if (cues.some((c) => c.id === id)) return;
    cues.push({
      id,
      name,
      kind,
      elevationM,
      description,
      day,
      progress: projected.progress,
      distanceKm: projected.distanceKm,
      lng,
      lat,
      importance,
      roleHint,
    });
  };

  // Anchor cinematic at pickup when in complete mode.
  if (effectiveMode === 'complete' && model.journey.pickup) {
    const p = model.journey.pickup;
    pushCue(p.id, p.name || 'Pickup', 'pickup', p.coordinates[0], p.coordinates[1], p.day, 3, p.elevation, undefined, 'pickup');
  }
  if (model.journey.trekStart) {
    const t = model.journey.trekStart;
    pushCue(t.id, t.name || 'Trek start', 'trailhead', t.coordinates[0], t.coordinates[1], t.day, 3, t.elevation, undefined, 'trailhead');
  }

  for (const loc of model.locations) {
    if (loc.kind === 'drive') continue;
    pushCue(
      loc.id,
      loc.name,
      loc.kind,
      loc.lng,
      loc.lat,
      loc.days[0] ?? pathBase.dayBands[0]?.day ?? 1,
      loc.importance,
      loc.elevationM,
      loc.description,
      loc.kind === 'summit' ? 'summit' : undefined,
    );
  }

  if (effectiveMode === 'complete' && model.journey.dropoff) {
    const d = model.journey.dropoff;
    pushCue(d.id, d.name || 'Drop-off', 'dropoff', d.coordinates[0], d.coordinates[1], d.day, 3, d.elevation, undefined, 'dropoff');
  }

  cues.sort((a, b) => a.progress - b.progress);
  pathBase.cues = cues;

  return pathBase;
}

/** Camera altitude (meters AGL) for cinematic framing. */
export function cameraAltitudeForProgress(
  path: JourneyPath,
  progress: number,
  isMobile: boolean,
): number {
  const cue = nearestCue(path, progress, 0.04);
  let base = isMobile ? 900 : 1400;

  if (progress < 0.02) base = isMobile ? 2200 : 3200;
  // Higher / faster framing on transfer roads
  if (path.hasTransfer && progress < (path.dayBands[0]?.endProgress ?? 0.2)) {
    base = isMobile ? 2800 : 4200;
  }
  if (cue?.kind === 'summit' || cue?.roleHint === 'summit' || progress > 0.88) {
    base = isMobile ? 1600 : 2400;
  }
  if (cue?.kind === 'forest' || cue?.kind === 'camp') base = isMobile ? 700 : 1000;
  if (cue?.roleHint === 'trailhead') base = isMobile ? 1200 : 1800;
  return base;
}

export function nearestCue(
  path: JourneyPath,
  progress: number,
  window = 0.035,
): JourneyLocationCue | null {
  let best: JourneyLocationCue | null = null;
  let bestDist = Infinity;
  for (const cue of path.cues) {
    if (cue.importance < 2) continue;
    const d = Math.abs(cue.progress - progress);
    if (d <= window && d < bestDist) {
      best = cue;
      bestDist = d;
    }
  }
  return best;
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

/** Travel duration scales with real distance (not equal per stop). */
export function travelDurationMsForPath(path: JourneyPath): number {
  // ~1.1 km/s equivalent visual pace, clamped.
  const ms = path.totalKm * 900;
  return Math.max(28000, Math.min(180000, ms));
}
