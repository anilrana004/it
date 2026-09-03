import type { Map as MapboxMap } from 'mapbox-gl';
import type {
  Coordinate,
  MapBounds,
  MapPadding,
  MapSelection,
  TrekMapLocation,
  TrekMapModel,
} from '@/types/trek-map';
import {
  boundsCenter,
  computeBoundsFromCoords,
  expandBounds,
  isValidBounds,
} from './geo-utils';
import { TREK_MAP_CONFIG } from './mapbox';
import { progressCoordinatesForSelection } from './route-progress';

type CameraTarget = {
  bounds: MapBounds;
  pitch?: number;
  bearing?: number;
  maxZoom?: number;
};

function segmentCoordsForSelection(
  model: TrekMapModel,
  selection: MapSelection,
): Coordinate[] {
  const progress = progressCoordinatesForSelection(model, selection);
  if (progress.length >= 2 && selection !== 'overview') return progress;

  if (selection === 'overview') {
    return model.segments.flatMap((s) => s.coordinates);
  }
  if (selection === 'summit') {
    return model.segments
      .filter((s) => s.category === 'trek')
      .flatMap((s) => s.coordinates);
  }
  const day = selection;
  return model.segments
    .filter((s) => s.dayStart <= day && s.dayEnd >= day)
    .flatMap((s) => s.coordinates);
}

function locationCoordsForSelection(
  locations: TrekMapLocation[],
  selection: MapSelection,
  summitDay?: number,
): Coordinate[] {
  if (selection === 'overview') {
    return locations.map((l) => [l.lng, l.lat]);
  }
  if (selection === 'summit') {
    const summitLocs = locations.filter((l) => l.kind === 'summit');
    if (summitLocs.length) {
      return summitLocs.map((l) => [l.lng, l.lat]);
    }
    if (summitDay != null) {
      return locations
        .filter((l) => l.days.includes(summitDay))
        .map((l) => [l.lng, l.lat]);
    }
  }
  const day = selection as number;
  return locations.filter((l) => l.days.includes(day)).map((l) => [l.lng, l.lat]);
}

export function boundsForSelection(
  model: TrekMapModel,
  selection: MapSelection,
): MapBounds {
  const segCoords = segmentCoordsForSelection(model, selection);
  const locCoords = locationCoordsForSelection(
    model.locations,
    selection,
    model.summitDay,
  );
  const combined = [...segCoords, ...locCoords];
  if (combined.length >= 2) {
    return expandBounds(computeBoundsFromCoords(combined), 0.12);
  }
  if (locCoords.length) {
    return expandBounds(computeBoundsFromCoords(locCoords), 0.15);
  }
  return expandBounds(model.bounds, 0.08);
}

export function cameraTargetForSelection(
  model: TrekMapModel,
  selection: MapSelection,
  is3D: boolean,
): CameraTarget {
  const bounds = boundsForSelection(model, selection);
  const pitch =
    selection === 'summit'
      ? Math.min(62, TREK_MAP_CONFIG.defaultPitch + 8)
      : is3D
        ? TREK_MAP_CONFIG.defaultPitch
        : 0;
  const bearing = TREK_MAP_CONFIG.defaultBearing;
  const maxZoom =
    selection === 'summit' ? TREK_MAP_CONFIG.fitMaxZoom : TREK_MAP_CONFIG.fitMaxZoom;

  return { bounds, pitch, bearing, maxZoom };
}

export function cameraTargetForLocation(location: TrekMapLocation, is3D: boolean): CameraTarget {
  const bounds: MapBounds = [
    [location.lng - 0.02, location.lat - 0.015],
    [location.lng + 0.02, location.lat + 0.015],
  ];
  return {
    bounds,
    pitch: is3D ? 52 : 0,
    bearing: TREK_MAP_CONFIG.defaultBearing,
    maxZoom: 14.5,
  };
}

export type FlyToOptions = {
  animate?: boolean;
  padding?: MapPadding;
};

export function flyToTarget(
  map: MapboxMap,
  target: CameraTarget,
  options: FlyToOptions = {},
): void {
  const { bounds, pitch = 0, bearing = 0, maxZoom } = target;
  if (!isValidBounds(bounds)) return;

  const [[minLng, minLat], [maxLng, maxLat]] = bounds;
  const padding = options.padding ?? TREK_MAP_CONFIG.fitPadding;
  const duration = options.animate === false ? 0 : 1200;

  map.fitBounds(
    [
      [minLng, minLat],
      [maxLng, maxLat],
    ],
    {
      padding,
      duration,
      pitch: Math.min(pitch, 65),
      bearing,
      minZoom: TREK_MAP_CONFIG.fitMinZoom,
      maxZoom: maxZoom ?? TREK_MAP_CONFIG.fitMaxZoom,
      essential: true,
    },
  );
}

export function applyGlobeIfZoomedOut(map: MapboxMap): void {
  try {
    // Keep globe projection at every zoom so zoom-in and zoom-out both show
    // the spherical Earth (full globe when zoomed out; local detail when zoomed in).
    const current = map.getProjection()?.name;
    if (current !== 'globe') {
      map.setProjection({ name: 'globe' });
    }
  } catch {
    // Classic styles / WebGL contexts that don't support globe — keep mercator.
  }
}

export function resetCamera(map: MapboxMap, model: TrekMapModel, is3D: boolean): void {
  flyToTarget(map, cameraTargetForSelection(model, 'overview', is3D));
}

export function centerForModel(model: TrekMapModel): Coordinate {
  return boundsCenter(model.bounds);
}
