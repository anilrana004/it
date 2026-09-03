import type {
  ExpressionSpecification,
  GeoJSONSource,
  LayerSpecification,
  Map as MapboxMap,
} from 'mapbox-gl';
import type { JourneyMode, MapSelection, TrekMapLocation, TrekMapModel } from '@/types/trek-map';
import {
  activeDayCoordinates,
  currentItineraryStop,
  progressCoordinatesForSelection,
  progressFocusCoordinate,
  startLocation,
  visibleItineraryStops,
} from './route-progress';

export const SOURCE = {
  routes: 'trek-routes',
  progress: 'trek-progress',
  activeDay: 'trek-active-day',
  locations: 'trek-locations',
  endpoints: 'trek-endpoints',
  itineraryStops: 'trek-itinerary-stops',
  progressTip: 'trek-progress-tip',
  tracker: 'trek-tracker',
} as const;

export const LAYER = {
  driveCasing: 'trek-drive-casing',
  driveLine: 'trek-drive-line',
  returnCasing: 'trek-return-casing',
  returnLine: 'trek-return-line',
  trekCasing: 'trek-trek-casing',
  trekLine: 'trek-trek-line',
  trekActive: 'trek-trek-active',
  progressCasing: 'trek-progress-casing',
  progressLine: 'trek-progress-line',
  activeDayCasing: 'trek-active-day-casing',
  activeDayLine: 'trek-active-day-line',
  markers: 'trek-markers',
  markerLabels: 'trek-marker-labels',
  itineraryStops: 'trek-itinerary-stop-circles',
  itineraryLabels: 'trek-itinerary-stop-labels',
  startDot: 'trek-start-dot',
  startLabel: 'trek-start-label',
  progressTip: 'trek-progress-tip-dot',
  summit: 'trek-summit-glow',
  endpoints: 'trek-endpoints',
  tracker: 'trek-tracker-point',
} as const;

type Slot = 'bottom' | 'middle' | 'top';

function segmentFeatures(model: TrekMapModel, mode: JourneyMode) {
  const allowed =
    mode === 'trek-only'
      ? new Set(model.journey.trekSegments.map((s) => s.id))
      : null;

  return model.segments
    .filter((seg) => seg.verified && seg.coordinates.length >= 2)
    .filter((seg) => (allowed ? allowed.has(seg.id) : true))
    .map((seg) => ({
      type: 'Feature' as const,
      properties: {
        id: seg.id,
        category: seg.category,
        role: seg.role,
        dayStart: seg.dayStart,
        dayEnd: seg.dayEnd,
        verified: 1,
      },
      geometry: {
        type: 'LineString' as const,
        coordinates: seg.coordinates,
      },
    }));
}

function locationFeatures(model: TrekMapModel, selection: MapSelection) {
  const visibleIds = new Set(visibleItineraryStops(model, selection).map((s) => s.locationId));
  const current = currentItineraryStop(model, selection);

  return model.locations.map((loc) => {
    const onPath = visibleIds.has(loc.id);
    const isCurrent = current?.locationId === loc.id;
    const active =
      selection === 'overview'
        ? 1
        : onPath || isCurrent
          ? 1
          : loc.days.includes(typeof selection === 'number' ? selection : -1)
            ? 1
            : 0;
    return {
      type: 'Feature' as const,
      properties: {
        id: loc.id,
        name: loc.name,
        kind: loc.kind,
        importance: loc.importance,
        active,
        onPath: onPath ? 1 : 0,
        isCurrent: isCurrent ? 1 : 0,
        days: loc.days.join(','),
        elevationM: loc.elevationM ?? 0,
      },
      geometry: {
        type: 'Point' as const,
        coordinates: [loc.lng, loc.lat],
      },
    };
  });
}

function itineraryStopFeatures(model: TrekMapModel, selection: MapSelection) {
  const visible = visibleItineraryStops(model, selection);
  const current = currentItineraryStop(model, selection);
  return visible.map((stop) => ({
    type: 'Feature' as const,
    properties: {
      id: stop.locationId,
      name: stop.kind === 'start' ? 'Start' : stop.name,
      kind: stop.kind,
      day: stop.day,
      isCurrent: current?.locationId === stop.locationId ? 1 : 0,
      isStart: stop.kind === 'start' ? 1 : 0,
    },
    geometry: {
      type: 'Point' as const,
      coordinates: [stop.lng, stop.lat],
    },
  }));
}

function endpointFeatures(model: TrekMapModel) {
  const start = model.locations.find((l) => l.kind === 'start');
  const end =
    model.locations.find((l) => l.kind === 'end') ??
    model.locations.filter((l) => l.kind !== 'start').at(-1);
  const features = [];
  if (start) {
    features.push({
      type: 'Feature' as const,
      properties: { role: 'start', name: start.name },
      geometry: { type: 'Point' as const, coordinates: [start.lng, start.lat] },
    });
  }
  if (end && end.id !== start?.id) {
    features.push({
      type: 'Feature' as const,
      properties: { role: 'finish', name: end.name },
      geometry: { type: 'Point' as const, coordinates: [end.lng, end.lat] },
    });
  }
  return features;
}

type FeatureCollectionData = Parameters<GeoJSONSource['setData']>[0];

function upsertGeoJson(map: MapboxMap, id: string, data: FeatureCollectionData): void {
  const existing = map.getSource(id) as GeoJSONSource | undefined;
  if (existing) {
    existing.setData(data);
    return;
  }
  map.addSource(id, { type: 'geojson', data, lineMetrics: true });
}

function isStandardStyle(map: MapboxMap): boolean {
  const style = map.getStyle();
  const name = (style?.name ?? '').toLowerCase();
  const sprite = typeof style?.sprite === 'string' ? style.sprite : '';
  return name.includes('standard') || sprite.includes('standard');
}

function upsertLayer(
  // Looser than LayerSpecification so circle/symbol layout props type-check.
  map: MapboxMap,
  spec: {
    id: string;
    type: string;
    source?: string;
    slot?: Slot;
    filter?: ExpressionSpecification | null;
    layout?: Record<string, unknown>;
    paint?: Record<string, unknown>;
  },
): void {
  try {
    if (map.getLayer(spec.id)) {
      if (spec.filter !== undefined) {
        map.setFilter(spec.id, spec.filter);
      }
      if (spec.paint) {
        for (const [key, value] of Object.entries(spec.paint)) {
          map.setPaintProperty(spec.id, key as never, value as never);
        }
      }
      if (spec.layout) {
        for (const [key, value] of Object.entries(spec.layout)) {
          map.setLayoutProperty(spec.id, key as never, value as never);
        }
      }
      return;
    }
    map.addLayer(spec as unknown as LayerSpecification);
  } catch {
    // Style may still be settling; next style.load will retry.
  }
}

function bringPointLayersToFront(map: MapboxMap): void {
  for (const id of [
    LAYER.markers,
    LAYER.summit,
    LAYER.itineraryStops,
    LAYER.startDot,
    LAYER.progressTip,
    LAYER.tracker,
    LAYER.markerLabels,
    LAYER.itineraryLabels,
    LAYER.startLabel,
  ]) {
    if (!map.getLayer(id)) continue;
    try {
      map.moveLayer(id);
    } catch {
      // Style may not allow reordering yet.
    }
  }
}

export function syncTrekLayers(
  map: MapboxMap,
  model: TrekMapModel,
  selection: MapSelection,
  mode: JourneyMode = 'complete',
): void {
  if (!map.isStyleLoaded()) return;

  upsertGeoJson(map, SOURCE.routes, {
    type: 'FeatureCollection',
    features: segmentFeatures(model, mode),
  });

  const progressCoords = progressCoordinatesForSelection(model, selection, mode);
  upsertGeoJson(map, SOURCE.progress, {
    type: 'FeatureCollection',
    features:
      progressCoords.length >= 2
        ? [
            {
              type: 'Feature' as const,
              properties: { role: 'itinerary-progress' },
              geometry: {
                type: 'LineString' as const,
                coordinates: progressCoords,
              },
            },
          ]
        : [],
  });

  const activeCoords = activeDayCoordinates(model, selection, mode);
  upsertGeoJson(map, SOURCE.activeDay, {
    type: 'FeatureCollection',
    features:
      selection !== 'overview' && activeCoords.length >= 2
        ? [
            {
              type: 'Feature' as const,
              properties: { role: 'active-day' },
              geometry: {
                type: 'LineString' as const,
                coordinates: activeCoords,
              },
            },
          ]
        : [],
  });

  const tip = progressFocusCoordinate(model, selection, mode);
  upsertGeoJson(map, SOURCE.progressTip, {
    type: 'FeatureCollection',
    features: tip
      ? [
          {
            type: 'Feature' as const,
            properties: { role: 'progress-tip' },
            geometry: { type: 'Point' as const, coordinates: tip },
          },
        ]
      : [],
  });

  const start = startLocation(model);
  upsertGeoJson(map, SOURCE.itineraryStops, {
    type: 'FeatureCollection',
    features: itineraryStopFeatures(model, selection),
  });

  upsertGeoJson(map, SOURCE.locations, {
    type: 'FeatureCollection',
    features: locationFeatures(model, selection),
  });
  upsertGeoJson(map, SOURCE.endpoints, {
    type: 'FeatureCollection',
    features: start
      ? [
          {
            type: 'Feature' as const,
            properties: { role: 'start', name: mode === 'complete' ? 'Pickup' : 'Start' },
            geometry: {
              type: 'Point' as const,
              coordinates: [start.lng, start.lat],
            },
          },
        ]
      : endpointFeatures(model),
  });
  if (!map.getSource(SOURCE.tracker)) {
    upsertGeoJson(map, SOURCE.tracker, {
      type: 'FeatureCollection',
      features: [],
    });
  }

  const useSlot = isStandardStyle(map);
  const lineSlot: Slot | undefined = useSlot ? 'middle' : undefined;
  const pointSlot: Slot | undefined = undefined;

  const dayScoped = selection !== 'overview';
  const trekBaseFilter: ExpressionSpecification = ['==', ['get', 'role'], 'trek'];
  const transferFilter: ExpressionSpecification = ['==', ['get', 'role'], 'transfer'];
  const returnFilter: ExpressionSpecification = [
    'any',
    ['==', ['get', 'role'], 'return'],
    ['==', ['get', 'role'], 'optional'],
  ];

  const circleLayout = {
    'circle-pitch-alignment': 'viewport' as const,
    'circle-pitch-scale': 'viewport' as const,
  };

  // TRANSFER (vehicle) — subtle dashed road
  upsertLayer(map, {
    id: LAYER.driveCasing,
    type: 'line',
    source: SOURCE.routes,
    ...(lineSlot ? { slot: lineSlot } : {}),
    filter: transferFilter,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#475569',
      'line-width': ['interpolate', ['linear'], ['zoom'], 8, 2, 14, 5],
      'line-opacity': dayScoped ? 0.25 : 0.45,
    },
  });

  upsertLayer(map, {
    id: LAYER.driveLine,
    type: 'line',
    source: SOURCE.routes,
    ...(lineSlot ? { slot: lineSlot } : {}),
    filter: transferFilter,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#94a3b8',
      'line-width': ['interpolate', ['linear'], ['zoom'], 8, 1.2, 14, 3],
      'line-opacity': dayScoped ? 0.35 : 0.7,
      'line-dasharray': [2, 1.5],
    },
  });

  // RETURN — secondary muted route
  upsertLayer(map, {
    id: LAYER.returnCasing,
    type: 'line',
    source: SOURCE.routes,
    ...(lineSlot ? { slot: lineSlot } : {}),
    filter: returnFilter,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#334155',
      'line-width': ['interpolate', ['linear'], ['zoom'], 8, 2, 14, 4.5],
      'line-opacity': dayScoped ? 0.2 : 0.35,
    },
  });

  upsertLayer(map, {
    id: LAYER.returnLine,
    type: 'line',
    source: SOURCE.routes,
    ...(lineSlot ? { slot: lineSlot } : {}),
    filter: returnFilter,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#64748b',
      'line-width': ['interpolate', ['linear'], ['zoom'], 8, 1, 14, 2.5],
      'line-opacity': dayScoped ? 0.28 : 0.55,
      'line-dasharray': [1.5, 2],
    },
  });

  // TREK muted upcoming / full base
  upsertLayer(map, {
    id: LAYER.trekCasing,
    type: 'line',
    source: SOURCE.routes,
    ...(lineSlot ? { slot: lineSlot } : {}),
    filter: trekBaseFilter,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#0f172a',
      'line-width': ['interpolate', ['linear'], ['zoom'], 8, 3.5, 14, 9],
      'line-opacity': dayScoped ? 0.28 : 0.4,
      'line-emissive-strength': 0.4,
    },
  });

  upsertLayer(map, {
    id: LAYER.trekLine,
    type: 'line',
    source: SOURCE.routes,
    ...(lineSlot ? { slot: lineSlot } : {}),
    filter: trekBaseFilter,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#86efac',
      'line-width': ['interpolate', ['linear'], ['zoom'], 8, 2, 14, 5],
      'line-opacity': dayScoped ? 0.28 : 0.55,
      'line-emissive-strength': 0.5,
    },
  });

  // Completed journey (Pickup → current) — GREEN
  upsertLayer(map, {
    id: LAYER.progressCasing,
    type: 'line',
    source: SOURCE.progress,
    ...(lineSlot ? { slot: lineSlot } : {}),
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#0a0a0a',
      'line-width': ['interpolate', ['linear'], ['zoom'], 8, 7, 14, 14],
      'line-opacity': 0.9,
      'line-emissive-strength': 0.8,
    },
  });

  upsertLayer(map, {
    id: LAYER.progressLine,
    type: 'line',
    source: SOURCE.progress,
    ...(lineSlot ? { slot: lineSlot } : {}),
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#22c55e',
      'line-width': ['interpolate', ['linear'], ['zoom'], 8, 4, 14, 9],
      'line-opacity': 1,
      'line-emissive-strength': 1,
    },
  });

  // Current day emphasis (stronger green on top of completed)
  upsertLayer(map, {
    id: LAYER.activeDayCasing,
    type: 'line',
    source: SOURCE.activeDay,
    ...(lineSlot ? { slot: lineSlot } : {}),
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#052e16',
      'line-width': ['interpolate', ['linear'], ['zoom'], 8, 8, 14, 15],
      'line-opacity': 0.85,
    },
  });

  upsertLayer(map, {
    id: LAYER.activeDayLine,
    type: 'line',
    source: SOURCE.activeDay,
    ...(lineSlot ? { slot: lineSlot } : {}),
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#16a34a',
      'line-width': ['interpolate', ['linear'], ['zoom'], 8, 5, 14, 11],
      'line-opacity': 1,
      'line-emissive-strength': 1,
    },
  });

  upsertLayer(map, {
    id: LAYER.markers,
    type: 'circle',
    source: SOURCE.locations,
    ...(pointSlot ? { slot: pointSlot } : {}),
    // Itinerary / Start / Summit have dedicated layers — avoid double dots.
    filter: [
      'all',
      ['!=', ['get', 'kind'], 'summit'],
      ['!=', ['get', 'kind'], 'start'],
      ['!=', ['get', 'kind'], 'end'],
      ['!=', ['get', 'onPath'], 1],
    ],
    layout: circleLayout,
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 8, 4, 14, 7],
      'circle-color': '#64748b',
      'circle-stroke-color': '#ffffff',
      'circle-stroke-width': 2,
      'circle-opacity': 0.55,
      'circle-emissive-strength': 0.8,
    },
  });

  upsertLayer(map, {
    id: LAYER.summit,
    type: 'circle',
    source: SOURCE.locations,
    ...(pointSlot ? { slot: pointSlot } : {}),
    filter: [
      'all',
      ['==', ['get', 'kind'], 'summit'],
      ['!=', ['get', 'onPath'], 1],
    ],
    layout: circleLayout,
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 8, 9, 14, 16],
      'circle-color': '#ef4444',
      'circle-stroke-color': '#ffffff',
      'circle-stroke-width': 3,
      'circle-opacity': 1,
      'circle-emissive-strength': 1,
    },
  });

  upsertLayer(map, {
    id: LAYER.markerLabels,
    type: 'symbol',
    source: SOURCE.locations,
    ...(pointSlot ? { slot: pointSlot } : {}),
    filter: [
      'all',
      ['>=', ['get', 'importance'], 2],
      ['!=', ['get', 'onPath'], 1],
      ['!=', ['get', 'kind'], 'start'],
    ],
    layout: {
      'text-field': ['get', 'name'],
      'text-size': 11,
      'text-offset': [0, 1.35],
      'text-anchor': 'top',
      'text-max-width': 12,
      'text-allow-overlap': false,
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': '#0f172a',
      'text-halo-color': '#ffffff',
      'text-halo-width': 1.4,
      'text-opacity': 0.65,
      'text-emissive-strength': 1,
    },
  });

  upsertLayer(map, {
    id: LAYER.itineraryStops,
    type: 'circle',
    source: SOURCE.itineraryStops,
    filter: ['!=', ['get', 'isStart'], 1],
    layout: circleLayout,
    paint: {
      'circle-radius': [
        'case',
        ['==', ['get', 'isCurrent'], 1],
        9,
        7,
      ],
      'circle-color': [
        'case',
        ['==', ['get', 'isCurrent'], 1],
        '#2563eb',
        [
          'match',
          ['get', 'kind'],
          'summit',
          '#ef4444',
          'camp',
          '#ea580c',
          'base-camp',
          '#c2410c',
          'water',
          '#0ea5e9',
          '#22c55e',
        ],
      ],
      'circle-stroke-color': '#ffffff',
      'circle-stroke-width': 2.5,
      'circle-opacity': 1,
      'circle-emissive-strength': 1,
    },
  });

  upsertLayer(map, {
    id: LAYER.itineraryLabels,
    type: 'symbol',
    source: SOURCE.itineraryStops,
    filter: ['!=', ['get', 'isStart'], 1],
    layout: {
      'text-field': ['get', 'name'],
      'text-size': 12,
      'text-offset': [0, 1.35],
      'text-anchor': 'top',
      'text-max-width': 14,
      'text-allow-overlap': true,
      'text-ignore-placement': true,
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': '#ffffff',
      'text-halo-color': '#0a0a0a',
      'text-halo-width': 1.8,
      'text-opacity': 1,
      'text-emissive-strength': 1,
    },
  });

  upsertLayer(map, {
    id: LAYER.startDot,
    type: 'circle',
    source: SOURCE.endpoints,
    filter: ['==', ['get', 'role'], 'start'],
    layout: circleLayout,
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 8, 8, 14, 12],
      'circle-color': '#22c55e',
      'circle-stroke-color': '#ffffff',
      'circle-stroke-width': 3,
      'circle-opacity': 1,
      'circle-emissive-strength': 1,
    },
  });

  upsertLayer(map, {
    id: LAYER.startLabel,
    type: 'symbol',
    source: SOURCE.endpoints,
    filter: ['==', ['get', 'role'], 'start'],
    layout: {
      'text-field': ['coalesce', ['get', 'name'], 'Pickup'],
      'text-size': 13,
      'text-offset': [0, -1.55],
      'text-anchor': 'bottom',
      'text-allow-overlap': true,
      'text-ignore-placement': true,
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': '#ffffff',
      'text-halo-color': '#0a0a0a',
      'text-halo-width': 2,
      'text-emissive-strength': 1,
    },
  });

  upsertLayer(map, {
    id: LAYER.progressTip,
    type: 'circle',
    source: SOURCE.progressTip,
    layout: circleLayout,
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 8, 8, 14, 12],
      'circle-color': '#2563eb',
      'circle-stroke-color': '#ffffff',
      'circle-stroke-width': 3,
      'circle-opacity': 1,
      'circle-emissive-strength': 1,
    },
  });

  // Moving "you are here" indicator (cinematic + itinerary focus)
  upsertLayer(map, {
    id: LAYER.tracker,
    type: 'circle',
    source: SOURCE.tracker,
    layout: circleLayout,
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 8, 7, 14, 11],
      'circle-color': '#22c55e',
      'circle-stroke-color': '#ffffff',
      'circle-stroke-width': 3,
      'circle-opacity': 1,
      'circle-emissive-strength': 1,
    },
  });

  bringPointLayersToFront(map);
}

export function setRouteTrimProgress(map: MapboxMap, progress: number): void {
  // line-trim-offset: [trimFromStart, trimFromEnd] — reveal first `progress` of the line.
  const p = Math.max(0, Math.min(1, progress));
  const trim: [number, number] = [0, 1 - p];
  for (const id of [
    LAYER.progressLine,
    LAYER.progressCasing,
    LAYER.activeDayLine,
    LAYER.activeDayCasing,
  ]) {
    if (!map.getLayer(id)) continue;
    try {
      map.setPaintProperty(id, 'line-trim-offset', trim);
    } catch {
      // Unsupported on current style paint — ignore.
    }
  }
}

export function clearRouteTrim(map: MapboxMap): void {
  setRouteTrimProgress(map, 1);
}

export function setTrackerPosition(map: MapboxMap, lng: number, lat: number): void {
  if (!map.getSource(SOURCE.tracker)) {
    upsertGeoJson(map, SOURCE.tracker, {
      type: 'FeatureCollection',
      features: [],
    });
  }
  if (!map.getLayer(LAYER.tracker)) {
    try {
      map.addLayer({
        id: LAYER.tracker,
        type: 'circle',
        source: SOURCE.tracker,
        paint: {
          'circle-radius': 9,
          'circle-color': '#22c55e',
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': 3,
          'circle-emissive-strength': 1,
        },
      });
    } catch {
      // Style settling
    }
  }
  const src = map.getSource(SOURCE.tracker) as GeoJSONSource | undefined;
  if (!src) return;
  src.setData({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: { type: 'Point', coordinates: [lng, lat] },
      },
    ],
  });
}

export function clearTracker(map: MapboxMap): void {
  const src = map.getSource(SOURCE.tracker) as GeoJSONSource | undefined;
  if (!src) return;
  src.setData({ type: 'FeatureCollection', features: [] });
}

export function locationFromFeatureProps(
  model: TrekMapModel,
  props: Record<string, unknown>,
): TrekMapLocation | null {
  const id = props.id as string | undefined;
  if (id) return model.locations.find((l) => l.id === id) ?? null;
  return null;
}
