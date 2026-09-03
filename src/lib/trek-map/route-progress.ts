import type {
  Coordinate,
  JourneyMode,
  MapSelection,
  TrekMapItineraryStop,
  TrekMapLocation,
  TrekMapModel,
} from '@/types/trek-map';
import { haversineKm } from './geo-utils';
import { mergeSegmentCoordinates, segmentsForMode } from './journey-model';

/** Ordered verified coordinates for the active journey mode. */
export function fullTrackCoordinates(
  model: TrekMapModel,
  mode: JourneyMode = 'complete',
): Coordinate[] {
  const segs = segmentsForMode(model.journey, mode);
  const fromJourney = mergeSegmentCoordinates(segs);
  if (fromJourney.length >= 2) return fromJourney;

  // Fallback: any verified segments on the model
  const verified = model.segments.filter((s) => s.verified && s.coordinates.length >= 2);
  return mergeSegmentCoordinates(verified);
}

export function trekTrackCoordinates(model: TrekMapModel): Coordinate[] {
  return mergeSegmentCoordinates(model.journey.trekSegments);
}

function nearestIndex(coords: Coordinate[], lng: number, lat: number): number {
  let bestIdx = 0;
  let best = Infinity;
  for (let i = 0; i < coords.length; i += 1) {
    const d = haversineKm(coords[i], [lng, lat]);
    if (d < best) {
      best = d;
      bestIdx = i;
    }
  }
  return bestIdx;
}

/**
 * Project itinerary stops onto the route in day order.
 * Route indices are forced to be non-decreasing so Day 3 never draws
 * behind Day 2 even when waypoints are close.
 */
export function projectItineraryStops(
  model: TrekMapModel,
  track: Coordinate[],
): Array<TrekMapItineraryStop & { routeIndex: number }> {
  if (track.length < 2) return [];

  let prevIdx = 0;
  const projected: Array<TrekMapItineraryStop & { routeIndex: number }> = [];

  for (const stop of model.itineraryStops) {
    const idx = Math.max(prevIdx, nearestIndex(track, stop.lng, stop.lat));
    projected.push({ ...stop, routeIndex: idx });
    prevIdx = idx;
  }

  return projected;
}

function endIndexForSelection(
  model: TrekMapModel,
  selection: MapSelection,
  track: Coordinate[],
): number {
  const projected = projectItineraryStops(model, track);
  if (!projected.length) return track.length - 1;

  if (selection === 'overview') {
    return projected[projected.length - 1]?.routeIndex ?? track.length - 1;
  }

  if (selection === 'summit') {
    const summit =
      projected.find((s) => s.kind === 'summit') ??
      projected.find((s) => model.summitDay != null && s.day === model.summitDay);
    return summit?.routeIndex ?? projected[projected.length - 1].routeIndex;
  }

  const day = selection;
  const upTo = projected.filter((s) => s.day <= day);
  if (upTo.length) return upTo[upTo.length - 1].routeIndex;

  const next = projected.find((s) => s.day >= day) ?? projected[projected.length - 1];
  return next.routeIndex;
}

function startIndexForDay(
  model: TrekMapModel,
  selection: MapSelection,
  track: Coordinate[],
): number {
  if (selection === 'overview' || selection === 'summit') return 0;
  const projected = projectItineraryStops(model, track);
  const prev = projected.filter((s) => s.day < selection);
  if (!prev.length) return 0;
  return prev[prev.length - 1].routeIndex;
}

/**
 * Green itinerary progress along verified journey geometry:
 * Pickup → transfer → trailhead → days → summit → return → drop-off
 */
export function progressCoordinatesForSelection(
  model: TrekMapModel,
  selection: MapSelection,
  mode: JourneyMode = 'complete',
): Coordinate[] {
  const track = fullTrackCoordinates(model, mode);
  if (track.length < 2) return [];

  const endIdx = Math.max(1, endIndexForSelection(model, selection, track));
  return track.slice(0, endIdx + 1);
}

/** Strong highlight for the selected day only (continuous journey — does not reset). */
export function activeDayCoordinates(
  model: TrekMapModel,
  selection: MapSelection,
  mode: JourneyMode = 'complete',
): Coordinate[] {
  if (selection === 'overview') {
    return progressCoordinatesForSelection(model, selection, mode);
  }
  const track = fullTrackCoordinates(model, mode);
  if (track.length < 2) return [];
  const startIdx = startIndexForDay(model, selection, track);
  const endIdx = Math.max(startIdx + 1, endIndexForSelection(model, selection, track));
  return track.slice(startIdx, endIdx + 1);
}

export function progressFocusCoordinate(
  model: TrekMapModel,
  selection: MapSelection,
  mode: JourneyMode = 'complete',
): Coordinate | null {
  const line = progressCoordinatesForSelection(model, selection, mode);
  if (!line.length) return null;
  return line[line.length - 1] ?? null;
}

/** Stops completed / current for the selected itinerary day. */
export function visibleItineraryStops(
  model: TrekMapModel,
  selection: MapSelection,
): TrekMapItineraryStop[] {
  const stops = model.itineraryStops;
  if (!stops.length) return [];
  if (selection === 'overview') return stops;
  if (selection === 'summit') {
    const summitIdx = stops.findIndex((s) => s.kind === 'summit');
    if (summitIdx >= 0) return stops.slice(0, summitIdx + 1);
    return stops;
  }
  return stops.filter((s) => s.kind === 'start' || s.day <= selection);
}

export function currentItineraryStop(
  model: TrekMapModel,
  selection: MapSelection,
): TrekMapItineraryStop | null {
  const visible = visibleItineraryStops(model, selection);
  if (!visible.length) return null;
  if (selection === 'overview') return visible[visible.length - 1] ?? null;
  if (selection === 'summit') {
    return visible.find((s) => s.kind === 'summit') ?? visible[visible.length - 1] ?? null;
  }
  return visible.filter((s) => s.day === selection).at(-1) ?? visible[visible.length - 1] ?? null;
}

export function startLocation(model: TrekMapModel): TrekMapLocation | TrekMapItineraryStop | null {
  if (model.journey.pickup) {
    return {
      id: model.journey.pickup.id,
      name: model.journey.pickup.name,
      kind: 'start',
      lng: model.journey.pickup.coordinates[0],
      lat: model.journey.pickup.coordinates[1],
      days: [model.journey.pickup.day],
      importance: 3,
      verified: true,
      elevationM: model.journey.pickup.elevation,
    };
  }
  return (
    model.locations.find((l) => l.kind === 'start' || l.kind === 'pickup') ??
    model.itineraryStops[0] ??
    null
  );
}
