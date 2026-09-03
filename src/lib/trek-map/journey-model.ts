import type {
  Coordinate,
  JourneyPoint,
  JourneySegmentRole,
  TrekJourney,
  TrekMapLocation,
  TrekMapSegment,
} from '@/types/trek-map';
import { haversineKm, polylineLengthKm } from './geo-utils';

const ON_ROUTE_MAX_KM = 2.5;

function sortJourneySegments(segments: TrekMapSegment[]): TrekMapSegment[] {
  return [...segments].sort((a, b) => {
    if (a.dayStart !== b.dayStart) return a.dayStart - b.dayStart;
    if (a.category !== b.category) {
      // Outbound drive before trek on same day; return drive after trek.
      if (a.dayStart === b.dayStart && a.dayEnd === b.dayEnd) {
        // Defer role-aware sort until roles assigned — day then category fallback.
      }
      return a.category === 'drive' ? -1 : 1;
    }
    return a.dayEnd - b.dayEnd;
  });
}

/**
 * Assign transfer / trek / return / optional from data order.
 * First trek block splits outbound drives (transfer) from later drives (return).
 */
export function assignSegmentRoles(segments: TrekMapSegment[]): TrekMapSegment[] {
  const ordered = sortJourneySegments(segments);
  const firstTrekIdx = ordered.findIndex((s) => s.category === 'trek');
  const lastTrekIdx = (() => {
    let idx = -1;
    for (let i = 0; i < ordered.length; i += 1) {
      if (ordered[i].category === 'trek') idx = i;
    }
    return idx;
  })();

  return ordered.map((seg, i) => {
    let role: JourneySegmentRole;
    if (seg.category === 'trek') {
      role = 'trek';
    } else if (firstTrekIdx < 0) {
      // Drive-only itinerary — treat early half as transfer, late as return.
      role = i < ordered.length / 2 ? 'transfer' : 'return';
    } else if (i < firstTrekIdx) {
      role = 'transfer';
    } else if (i > lastTrekIdx) {
      role = 'return';
    } else {
      // Drive sandwiched between trek days (rare) — optional shuttle.
      role = 'optional';
    }
    return { ...seg, role };
  });
}

export function mergeSegmentCoordinates(segments: TrekMapSegment[]): Coordinate[] {
  const out: Coordinate[] = [];
  for (const seg of segments) {
    for (const c of seg.coordinates) {
      const last = out[out.length - 1];
      if (last && last[0] === c[0] && last[1] === c[1]) continue;
      out.push(c);
    }
  }
  return out;
}

function buildCumulative(coords: Coordinate[]): number[] {
  const cumulative = [0];
  for (let i = 1; i < coords.length; i += 1) {
    cumulative.push(cumulative[i - 1] + haversineKm(coords[i - 1], coords[i]));
  }
  return cumulative;
}

function nearestOnPath(
  coords: Coordinate[],
  cumulativeKm: number[],
  lng: number,
  lat: number,
): { distanceAlongRoute: number; distKm: number; index: number } | null {
  if (coords.length < 1) return null;
  let best = Infinity;
  let bestIdx = 0;
  for (let i = 0; i < coords.length; i += 1) {
    const d = haversineKm(coords[i], [lng, lat]);
    if (d < best) {
      best = d;
      bestIdx = i;
    }
  }
  return {
    distanceAlongRoute: cumulativeKm[bestIdx] ?? 0,
    distKm: best,
    index: bestIdx,
  };
}

function segmentContainingIndex(
  segments: TrekMapSegment[],
  globalIndex: number,
): string | null {
  let cursor = 0;
  for (const seg of segments) {
    const n = seg.coordinates.length;
    if (n === 0) continue;
    const start = cursor;
    const end = cursor + n - (cursor > 0 ? 1 : 0);
    // Approximate occupancy by walking merged length
    void start;
    void end;
    const nextCursor = cursor === 0 ? n : cursor + Math.max(0, n - 1);
    if (globalIndex >= cursor && globalIndex < nextCursor) return seg.id;
    cursor = nextCursor;
  }
  return segments[0]?.id ?? null;
}

function asPoint(
  loc: TrekMapLocation,
  path: Coordinate[],
  cumulativeKm: number[],
  segments: TrekMapSegment[],
  typeOverride?: JourneyPoint['type'],
): JourneyPoint {
  const nearest = nearestOnPath(path, cumulativeKm, loc.lng, loc.lat);
  const onRoute = nearest != null && nearest.distKm <= ON_ROUTE_MAX_KM;
  return {
    id: loc.id,
    name: loc.name,
    type: typeOverride ?? loc.kind,
    coordinates: [loc.lng, loc.lat],
    day: loc.days[0] ?? 1,
    routeSegmentId: nearest ? segmentContainingIndex(segments, nearest.index) : null,
    distanceAlongRoute: nearest?.distanceAlongRoute ?? 0,
    elevation: loc.elevationM,
    importance: loc.importance,
    onRoute,
  };
}

function syntheticEndpoint(
  id: string,
  name: string,
  type: JourneyPoint['type'],
  coord: Coordinate,
  day: number,
  distanceAlongRoute: number,
  segmentId: string | null,
): JourneyPoint {
  return {
    id,
    name,
    type,
    coordinates: coord,
    day,
    routeSegmentId: segmentId,
    distanceAlongRoute,
    importance: 3,
    onRoute: true,
  };
}

/**
 * Build the reusable pickup → drop-off journey from verified segment geometry only.
 * Never invents missing road/trail geometry.
 */
export function buildTrekJourney(
  segments: TrekMapSegment[],
  locations: TrekMapLocation[],
): TrekJourney {
  const warnings: string[] = [];
  const withRoles = assignSegmentRoles(segments);

  for (const seg of withRoles) {
    if (seg.coordinates.length < 2) {
      warnings.push(`Verified route geometry is missing for segment "${seg.id}".`);
    } else if (!seg.verified) {
      warnings.push(
        seg.missingGeometryReason ??
          `Segment "${seg.id}" lacks verified GPX/GeoJSON/driving-track geometry — excluded from journey path.`,
      );
    }
  }

  const verified = withRoles.filter((s) => s.verified && s.coordinates.length >= 2);
  const transferSegments = verified.filter((s) => s.role === 'transfer');
  const trekSegments = verified.filter((s) => s.role === 'trek');
  const returnSegments = verified.filter((s) => s.role === 'return');
  const optionalSegments = verified.filter((s) => s.role === 'optional');

  const orderedSegments = [...transferSegments, ...trekSegments, ...optionalSegments, ...returnSegments];
  // Preserve chronological order from withRoles among verified only.
  const chronological = withRoles.filter((s) => s.verified && s.coordinates.length >= 2);

  const path = mergeSegmentCoordinates(chronological);
  const cumulativeKm = buildCumulative(path);
  const totalKm = cumulativeKm[cumulativeKm.length - 1] ?? 0;

  const startLoc =
    locations.find((l) => l.kind === 'start' || l.kind === 'pickup') ?? null;
  const endLoc =
    locations.find((l) => l.kind === 'end' || l.kind === 'dropoff') ?? null;
  const summitLoc = locations.find((l) => l.kind === 'summit') ?? null;
  const trailheadLoc =
    locations.find((l) => l.kind === 'trailhead') ??
    locations.find((l) => l.kind === 'village' && l.importance >= 2) ??
    null;

  let pickup: JourneyPoint | null = null;
  if (startLoc) {
    pickup = asPoint(startLoc, path, cumulativeKm, chronological, 'pickup');
  } else if (path.length) {
    const first = chronological[0];
    pickup = syntheticEndpoint(
      `${first?.id ?? 'journey'}-pickup`,
      'Pickup',
      'pickup',
      path[0],
      first?.dayStart ?? 1,
      0,
      first?.id ?? null,
    );
  }

  let dropoff: JourneyPoint | null = null;
  if (endLoc) {
    dropoff = asPoint(endLoc, path, cumulativeKm, chronological, 'dropoff');
    if (totalKm > 0) dropoff = { ...dropoff, distanceAlongRoute: Math.max(dropoff.distanceAlongRoute, totalKm * 0.98) };
  } else if (path.length) {
    const last = chronological[chronological.length - 1];
    dropoff = syntheticEndpoint(
      `${last?.id ?? 'journey'}-dropoff`,
      'Drop-off',
      'dropoff',
      path[path.length - 1],
      last?.dayEnd ?? last?.dayStart ?? 1,
      totalKm,
      last?.id ?? null,
    );
  }

  let trekStart: JourneyPoint | null = null;
  if (trekSegments[0]?.coordinates[0]) {
    const c = trekSegments[0].coordinates[0];
    const nearest = nearestOnPath(path, cumulativeKm, c[0], c[1]);
    if (trailheadLoc) {
      trekStart = asPoint(trailheadLoc, path, cumulativeKm, chronological, 'trailhead');
    } else {
      trekStart = syntheticEndpoint(
        `${trekSegments[0].id}-trailhead`,
        'Trek start',
        'trailhead',
        c,
        trekSegments[0].dayStart,
        nearest?.distanceAlongRoute ?? 0,
        trekSegments[0].id,
      );
    }
  }

  const summit = summitLoc
    ? asPoint(summitLoc, path, cumulativeKm, chronological, 'summit')
    : null;

  const itineraryPoints: JourneyPoint[] = [];
  const seen = new Set<string>();
  const pushUnique = (p: JourneyPoint | null) => {
    if (!p || seen.has(p.id)) return;
    seen.add(p.id);
    itineraryPoints.push(p);
    if (!p.onRoute && path.length >= 2) {
      warnings.push(
        `Location "${p.name}" is not near verified route geometry (>${ON_ROUTE_MAX_KM} km).`,
      );
    }
  };

  pushUnique(pickup);
  pushUnique(trekStart);

  for (const loc of locations) {
    if (loc.importance < 2 && loc.kind !== 'water' && loc.kind !== 'camp') continue;
    if (loc.kind === 'drive') continue;
    pushUnique(asPoint(loc, path, cumulativeKm, chronological));
  }

  pushUnique(summit);
  pushUnique(dropoff);

  itineraryPoints.sort((a, b) => a.distanceAlongRoute - b.distanceAlongRoute);

  const hasTransfer = transferSegments.length > 0;
  const hasReturn = returnSegments.length > 0;
  const supportsCompleteJourney = hasTransfer || hasReturn;

  if (!trekSegments.length && !chronological.length) {
    warnings.push('Verified route geometry is missing for this trek journey.');
  }

  void polylineLengthKm; // reserved for future per-segment stats

  return {
    pickup,
    trekStart,
    summit,
    dropoff,
    transferSegments,
    trekSegments,
    returnSegments,
    optionalSegments,
    orderedSegments: chronological,
    itineraryPoints,
    warnings,
    hasTransfer,
    hasReturn,
    supportsCompleteJourney,
  };
}

/** Segments for a journey mode — verified geometry only. */
export function segmentsForMode(
  journey: TrekJourney,
  mode: 'complete' | 'trek-only',
): TrekMapSegment[] {
  if (mode === 'trek-only') {
    return journey.trekSegments.length
      ? journey.trekSegments
      : journey.orderedSegments.filter((s) => s.role === 'trek');
  }
  return journey.orderedSegments;
}
