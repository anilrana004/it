import type { RoutePoint, RouteProfile } from './route-profile-types';
import type { DayBand, ElevationProfile, ElevationSample } from './elevation-profile-types';

const SAMPLES_PER_SEGMENT = 12;

function isDriveOnly(point: RoutePoint): boolean {
  return point.activity === 'drive';
}

function trekSegmentKm(point: RoutePoint): number {
  if (isDriveOnly(point)) return 0;
  return point.distanceKm ?? 0;
}

function interpolateSegment(
  from: ElevationSample,
  to: ElevationSample,
  count: number,
): ElevationSample[] {
  if (count <= 0) return [];
  const out: ElevationSample[] = [];
  for (let i = 1; i <= count; i += 1) {
    const t = i / (count + 1);
    out.push({
      distanceKm: from.distanceKm + (to.distanceKm - from.distanceKm) * t,
      altitudeFt: from.altitudeFt + (to.altitudeFt - from.altitudeFt) * t,
      day: to.day,
      label: to.label,
      activity: to.activity,
      isWaypoint: false,
    });
  }
  return out;
}

function cumulativeAscentDescent(samples: ElevationSample[]): { ascent: number; descent: number } {
  let ascent = 0;
  let descent = 0;
  for (let i = 1; i < samples.length; i += 1) {
    const delta = samples[i].altitudeFt - samples[i - 1].altitudeFt;
    if (delta > 0) ascent += delta;
    else if (delta < 0) descent += Math.abs(delta);
  }
  return { ascent, descent };
}

function findSummitIndex(samples: ElevationSample[]): number {
  if (!samples.length) return 0;
  let idx = 0;
  let max = samples[0].altitudeFt;
  for (let i = 1; i < samples.length; i += 1) {
    if (samples[i].altitudeFt > max) {
      max = samples[i].altitudeFt;
      idx = i;
    }
  }
  return idx;
}

/** Build a distance-based elevation profile from verified itinerary points. */
export function buildElevationProfile(profile: RouteProfile): ElevationProfile | null {
  const withAltitude = profile.points.filter((p) => p.altitudeFt != null);
  if (withAltitude.length < 2) return null;

  const hasDistanceData = profile.points.some((p) => !isDriveOnly(p) && p.distanceKm != null);

  let cumulativeKm = 0;
  const waypoints: ElevationSample[] = [];

  for (const point of profile.points) {
    if (isDriveOnly(point) && waypoints.length === 0) {
      waypoints.push({
        distanceKm: 0,
        altitudeFt: point.altitudeFt!,
        day: point.day,
        label: point.label,
        activity: point.activity,
        isWaypoint: true,
      });
      continue;
    }

    if (isDriveOnly(point)) continue;

    cumulativeKm += trekSegmentKm(point);
    waypoints.push({
      distanceKm: cumulativeKm,
      altitudeFt: point.altitudeFt!,
      day: point.day,
      label: point.label,
      activity: point.activity,
      isWaypoint: true,
    });
  }

  if (waypoints.length < 2) return null;

  if (!hasDistanceData) {
    for (let i = 0; i < waypoints.length; i += 1) {
      waypoints[i] = {
        ...waypoints[i],
        distanceKm: i,
      };
    }
  }

  const samples: ElevationSample[] = [waypoints[0]];
  for (let i = 1; i < waypoints.length; i += 1) {
    const segmentSamples = interpolateSegment(waypoints[i - 1], waypoints[i], SAMPLES_PER_SEGMENT);
    samples.push(...segmentSamples, waypoints[i]);
  }

  const dayBands: DayBand[] = [];
  for (let i = 0; i < waypoints.length; i += 1) {
    const wp = waypoints[i];
    const prev = i > 0 ? waypoints[i - 1] : null;
    dayBands.push({
      day: wp.day,
      label: wp.label,
      startKm: prev?.distanceKm ?? 0,
      endKm: wp.distanceKm,
    });
  }

  const alts = samples.map((s) => s.altitudeFt);
  const { ascent, descent } = cumulativeAscentDescent(samples);
  const summitIndex = findSummitIndex(samples);

  return {
    samples,
    waypoints,
    dayBands,
    totalDistanceKm: waypoints[waypoints.length - 1].distanceKm,
    maxAltitudeFt: Math.max(...alts),
    minAltitudeFt: Math.min(...alts),
    totalAscentFt: ascent,
    totalDescentFt: descent,
    summitIndex,
    startIndex: 0,
    endIndex: samples.length - 1,
    hasDistanceData,
    distanceAxisMode: hasDistanceData ? 'km' : 'stage',
  };
}

export function nearestSampleIndex(samples: ElevationSample[], distanceKm: number): number {
  if (!samples.length) return 0;
  let best = 0;
  let bestDiff = Math.abs(samples[0].distanceKm - distanceKm);
  for (let i = 1; i < samples.length; i += 1) {
    const diff = Math.abs(samples[i].distanceKm - distanceKm);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return best;
}

export function formatAltitudeMeters(ft: number): string {
  const m = Math.round(ft / 3.28084);
  return `${m.toLocaleString('en-IN')} m`;
}

export function formatDistanceKm(km: number, digits = 1): string {
  return `${km.toLocaleString('en-IN', { maximumFractionDigits: digits, minimumFractionDigits: digits })} km`;
}
