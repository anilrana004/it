'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import type { RoutePoint, RouteProfile } from '@/lib/treks/route-profile-types';
import type { ResolvedWaypoint, RouteSegment, TrekGeography } from '@/lib/treks/geography/types';
import {
  getWaypointForDay,
  resolveDrivingSegments,
} from '@/lib/treks/geography/get-trek-geography';
import {
  boundsForGeography,
  resolveRouteGeometry,
} from '@/lib/treks/geography/route-geometry-utils';
import { activityLabel } from '@/lib/treks/route-profile-utils';
import { getMapboxToken } from '@/lib/env/public-env';
import 'mapbox-gl/dist/mapbox-gl.css';
import './trek-route-map.css';

const MAPBOX_TOKEN = getMapboxToken();
const STYLE_OUTDOORS = 'mapbox://styles/mapbox/outdoors-v12';
const STYLE_SATELLITE = 'mapbox://styles/mapbox/satellite-streets-v12';

type Props = {
  geography: TrekGeography;
  profile: RouteProfile;
  activeDay: number;
  onDayChange: (day: number) => void;
  trekTitle: string;
  kindLabel: string;
};

const KIND_ICON: Record<ResolvedWaypoint['kind'], string> = {
  start: 'fa-solid fa-flag',
  end: 'fa-solid fa-flag-checkered',
  village: 'fa-solid fa-house',
  camp: 'fa-solid fa-campground',
  'base-camp': 'fa-solid fa-tent',
  water: 'fa-solid fa-droplet',
  pass: 'fa-solid fa-mountain-sun',
  viewpoint: 'fa-solid fa-binoculars',
  summit: 'fa-solid fa-mountain',
  temple: 'fa-solid fa-place-of-worship',
};

function profilePoint(profile: RouteProfile, day: number): RoutePoint | undefined {
  return profile.points.find((p) => p.day === day);
}

function popupHtml(
  wp: ResolvedWaypoint,
  point: RoutePoint | undefined,
  kindLabel: string,
  day: number,
) {
  const alt =
    point?.altitudeLabel ??
    (wp.elevationM ? `${Math.round(wp.elevationM * 3.28084).toLocaleString('en-IN')} ft` : '—');

  return `
    <div class="kg-map-popup">
      <span class="kg-map-popup-day">Day ${day}</span>
      <strong class="kg-map-popup-title">${wp.name}</strong>
      ${point?.title ? `<p class="kg-map-popup-sub">${point.title}</p>` : ''}
      <dl class="kg-map-popup-meta">
        <div><dt>Altitude</dt><dd>${alt}</dd></div>
        ${point?.distanceLabel || point?.distanceKm != null ? `<div><dt>Distance</dt><dd>${point.distanceLabel ?? `${point.distanceKm} km`}</dd></div>` : ''}
        ${point?.duration ? `<div><dt>Duration</dt><dd>${point.duration}</dd></div>` : ''}
        ${point?.meals ? `<div><dt>Meals</dt><dd>${point.meals}</dd></div>` : ''}
        ${point?.activity ? `<div><dt>Activity</dt><dd>${activityLabel(point.activity)}</dd></div>` : ''}
        <div><dt>${kindLabel}</dt><dd>${wp.kind.replace('-', ' ')}</dd></div>
      </dl>
    </div>
  `;
}

function createTrailStopMarker(wp: ResolvedWaypoint, active: boolean) {
  const isSummit = wp.kind === 'summit';
  const el = document.createElement('button');
  el.type = 'button';
  el.className = [
    'kg-map-marker',
    isSummit ? 'kg-map-marker--summit-red kg-map-marker--summit-pin' : `kg-map-marker--trail-stop kg-map-marker--${wp.kind}`,
    active ? 'is-active' : '',
  ]
    .filter(Boolean)
    .join(' ');
  el.setAttribute('aria-label', wp.name);

  if (isSummit) {
    el.innerHTML = `
      <span class="kg-map-marker-pin" aria-hidden="true">
        <span class="kg-map-marker-pin-head"><i class="fa-solid fa-mountain"></i></span>
      </span>
      <span class="kg-map-marker-summit-label">Summit</span>
    `;
  } else {
    el.innerHTML = `
      <span class="kg-map-marker-dot"><i class="${KIND_ICON[wp.kind]}" aria-hidden="true"></i></span>
      <span class="kg-map-marker-stop-label">${wp.name}</span>
    `;
  }
  return el;
}

function createDriveMarker(wp: ResolvedWaypoint, active: boolean, label: string) {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = `kg-map-marker kg-map-marker--drive kg-map-marker--trail-stop${active ? ' is-active' : ''}`;
  el.setAttribute('aria-label', label);
  el.innerHTML = `
    <span class="kg-map-marker-dot"><i class="${KIND_ICON[wp.kind]}" aria-hidden="true"></i></span>
    <span class="kg-map-marker-stop-label">${label}</span>
  `;
  return el;
}

function lineFeature(coords: [number, number][], name = 'route') {
  return {
    type: 'Feature' as const,
    properties: { name },
    geometry: { type: 'LineString' as const, coordinates: coords },
  };
}

function upsertGeoJsonSource(map: mapboxgl.Map, id: string, data: GeoJSON.Feature) {
  const src = map.getSource(id) as mapboxgl.GeoJSONSource | undefined;
  if (src) src.setData(data);
  else map.addSource(id, { type: 'geojson', data });
}

function addTerrainAndRouteLayers(map: mapboxgl.Map) {
  if (!map.getSource('mapbox-dem')) {
    map.addSource('mapbox-dem', {
      type: 'raster-dem',
      url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
      tileSize: 512,
      maxzoom: 14,
    });
  }
}

function ensureRouteLayers(map: mapboxgl.Map) {
  const layers: mapboxgl.AnyLayer[] = [
    // Drive — muted corridor
    {
      id: 'drive-route-glow',
      type: 'line',
      source: 'drive-route-full',
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#ffffff',
        'line-width': ['interpolate', ['linear'], ['zoom'], 6, 4, 10, 7, 14, 10],
        'line-opacity': 0.45,
        'line-blur': 0.6,
      },
    },
    {
      id: 'drive-route-line',
      type: 'line',
      source: 'drive-route-full',
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#64748b',
        'line-width': ['interpolate', ['linear'], ['zoom'], 6, 2, 10, 3, 14, 4.5],
        'line-opacity': 0.75,
        'line-dasharray': [2, 2],
      },
    },
    // Trek — premium red with halo
    {
      id: 'trek-route-glow',
      type: 'line',
      source: 'trek-route-full',
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#ffffff',
        'line-width': ['interpolate', ['linear'], ['zoom'], 8, 8, 12, 12, 14, 16],
        'line-opacity': 0.65,
        'line-blur': 0.9,
      },
    },
    {
      id: 'trek-route-line',
      type: 'line',
      source: 'trek-route-full',
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#dc2626',
        'line-width': ['interpolate', ['linear'], ['zoom'], 8, 3.5, 12, 5.5, 14, 7.5],
        'line-opacity': 0.92,
      },
    },
    {
      id: 'trek-route-progress-glow',
      type: 'line',
      source: 'trek-route-progress',
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#ffffff',
        'line-width': ['interpolate', ['linear'], ['zoom'], 8, 10, 12, 14, 14, 18],
        'line-opacity': 0.55,
        'line-blur': 1,
      },
    },
    {
      id: 'trek-route-progress',
      type: 'line',
      source: 'trek-route-progress',
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#b91c1c',
        'line-width': ['interpolate', ['linear'], ['zoom'], 8, 4.5, 12, 7, 14, 9],
        'line-opacity': 1,
      },
    },
  ];

  for (const layer of layers) {
    if (!map.getLayer(layer.id)) map.addLayer(layer);
  }
}

export default function TrekRouteMapbox({
  geography,
  profile,
  activeDay,
  onDayChange,
  trekTitle,
  kindLabel,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const readyRef = useRef(false);
  const styleReadyRef = useRef(false);

  const [resolvedSegments, setResolvedSegments] = useState<RouteSegment[]>(geography.segments);
  const [segmentsReady, setSegmentsReady] = useState(
    () => !geography.segments.some((s) => s.geometryKind === 'driving-network'),
  );
  const routeLoading = !segmentsReady;
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [terrainOn, setTerrainOn] = useState(true);
  const [is3D, setIs3D] = useState(true);
  const [styleMode, setStyleMode] = useState<'outdoors' | 'satellite'>('satellite');

  const routeGeom = useMemo(
    () => resolveRouteGeometry(resolvedSegments, geography.waypoints, activeDay),
    [resolvedSegments, geography.waypoints, activeDay],
  );

  const bounds = useMemo(
    () => boundsForGeography(geography, routeGeom.allCoordinates),
    [geography, routeGeom.allCoordinates],
  );

  const openPopup = useCallback(
    (map: mapboxgl.Map, wp: ResolvedWaypoint, day: number) => {
      const point = profilePoint(profile, day);
      popupRef.current?.remove();
      popupRef.current = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: true,
        offset: 16,
        className: 'kg-map-popup-wrap',
        maxWidth: '300px',
      })
        .setLngLat([wp.lng, wp.lat])
        .setHTML(popupHtml(wp, point, kindLabel, day))
        .addTo(map);
    },
    [kindLabel, profile],
  );

  const syncMarkers = useCallback(
    (map: mapboxgl.Map) => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      const driveWp = geography.waypoints.find((w) => w.kind === 'start' || w.kind === 'end');
      if (driveWp) {
        const isDriveActive = activeDay === 1 || activeDay === 5;
        const el = createDriveMarker(driveWp, isDriveActive, 'Dehradun');
        const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
          .setLngLat([driveWp.lng, driveWp.lat])
          .addTo(map);
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          const day = activeDay === 5 ? 5 : 1;
          onDayChange(day);
          openPopup(map, driveWp, day);
        });
        markersRef.current.push(marker);
      }

      for (const wp of geography.trailStops) {
        const stopDay = wp.day || activeDay;
        const isActive = stopDay === activeDay || (wp.kind === 'summit' && activeDay === 4);
        const el = createTrailStopMarker(wp, isActive);
        const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
          .setLngLat([wp.lng, wp.lat])
          .addTo(map);

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          const day = wp.day || activeDay;
          onDayChange(day);
          openPopup(map, wp, day);
        });

        markersRef.current.push(marker);
      }
    },
    [activeDay, geography.trailStops, geography.waypoints, onDayChange, openPopup],
  );

  const updateRouteSources = useCallback(
    (map: mapboxgl.Map) => {
      const hasTrek = routeGeom.hasDrawableTrekRoute && routeGeom.trekCoordinates.length >= 2;
      const hasDrive = routeGeom.driveCoordinates.length >= 2;

      if (hasDrive) {
        upsertGeoJsonSource(map, 'drive-route-full', lineFeature(routeGeom.driveCoordinates, 'drive'));
      }
      if (hasTrek) {
        upsertGeoJsonSource(map, 'trek-route-full', lineFeature(routeGeom.trekCoordinates, trekTitle));
        upsertGeoJsonSource(
          map,
          'trek-route-progress',
          lineFeature(
            routeGeom.trekProgressCoordinates.length >= 2
              ? routeGeom.trekProgressCoordinates
              : routeGeom.trekCoordinates.slice(0, 2),
            'trek-progress',
          ),
        );
      }

      ensureRouteLayers(map);

      ['drive-route-glow', 'drive-route-line'].forEach((id) => {
        if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', hasDrive ? 'visible' : 'none');
      });
      ['trek-route-glow', 'trek-route-line', 'trek-route-progress-glow', 'trek-route-progress'].forEach((id) => {
        if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', hasTrek ? 'visible' : 'none');
      });
    },
    [routeGeom, trekTitle],
  );

  const applyTerrain = useCallback((map: mapboxgl.Map, enabled: boolean) => {
    if (!map.getSource('mapbox-dem')) return;
    if (enabled) {
      map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.28 });
      if (!map.getLayer('hillshade')) {
        map.addLayer({
          id: 'hillshade',
          type: 'hillshade',
          source: 'mapbox-dem',
          paint: { 'hillshade-exaggeration': 0.32 },
        });
      } else {
        map.setLayoutProperty('hillshade', 'visibility', 'visible');
      }
    } else {
      map.setTerrain(null);
      if (map.getLayer('hillshade')) map.setLayoutProperty('hillshade', 'visibility', 'none');
    }
  }, []);

  const fitRoute = useCallback(
    (map: mapboxgl.Map, animate = true) => {
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;
      map.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        {
          padding: { top: 72, bottom: 56, left: 52, right: 52 },
          duration: animate ? 1000 : 0,
          pitch: is3D ? 54 : 0,
          bearing: is3D ? -22 : 0,
        },
      );
    },
    [bounds, is3D],
  );

  useEffect(() => {
    let cancelled = false;
    const needsDriving = geography.segments.some((s) => s.geometryKind === 'driving-network');
    if (!needsDriving) {
      setResolvedSegments(geography.segments);
      setSegmentsReady(true);
      return;
    }
    setSegmentsReady(false);
    resolveDrivingSegments(geography.segments).then((segs) => {
      if (!cancelled) {
        setResolvedSegments(segs);
        setSegmentsReady(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [geography.segments, geography.trekId]);

  useEffect(() => {
    if (!MAPBOX_TOKEN || !containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    setMapError(null);

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: STYLE_SATELLITE,
      center: [geography.waypoints[0]?.lng ?? 78.18, geography.waypoints[0]?.lat ?? 31.07],
      zoom: 9,
      pitch: 54,
      bearing: -22,
      antialias: true,
      attributionControl: false,
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-left');

    // Custom toolbar handles map modes; default Mapbox chrome creates a white strip on phone.
    const desktopMap = window.matchMedia('(min-width: 768px)').matches;
    if (desktopMap) {
      map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right');
      map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    }

    map.on('load', () => {
      addTerrainAndRouteLayers(map);
      applyTerrain(map, true);
      updateRouteSources(map);
      syncMarkers(map);
      fitRoute(map, false);
      map.resize();
      readyRef.current = true;
      styleReadyRef.current = true;
      setMapReady(true);
    });

    map.on('error', (e) => {
      if (e.error?.message) setMapError('Unable to load map tiles. Check your Mapbox token.');
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      popupRef.current?.remove();
      map.remove();
      mapRef.current = null;
      readyRef.current = false;
      styleReadyRef.current = false;
      setMapReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geography.trekId]);

  useEffect(() => {
    const el = containerRef.current;
    const map = mapRef.current;
    if (!el || !map) return;

    const resize = () => map.resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    window.addEventListener('orientationchange', resize);
    return () => {
      ro.disconnect();
      window.removeEventListener('orientationchange', resize);
    };
  }, [mapReady]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !readyRef.current) return;
    updateRouteSources(map);
    syncMarkers(map);
  }, [routeGeom, syncMarkers, updateRouteSources]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !readyRef.current) return;
    syncMarkers(map);
  }, [activeDay, syncMarkers]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !readyRef.current) return;

    const displayWp =
      geography.trailStops.find((wp) => wp.day === activeDay) ??
      geography.waypoints.find((wp) => wp.day === activeDay);
    const wp = getWaypointForDay(geography, activeDay);
    if (!displayWp || !wp) return;

    openPopup(map, displayWp, activeDay);
    map.easeTo({
      center: [displayWp.lng, displayWp.lat],
      zoom: Math.max(
        map.getZoom(),
        displayWp.kind === 'summit' ? 12.4 : displayWp.priority === 3 ? 11.5 : 11,
      ),
      pitch: is3D ? 54 : 0,
      bearing: is3D ? -22 : 0,
      duration: 900,
      essential: true,
    });
  }, [activeDay, geography, is3D, openPopup]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !readyRef.current) return;
    applyTerrain(map, terrainOn);
  }, [applyTerrain, terrainOn]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !readyRef.current) return;

    styleReadyRef.current = false;
    map.setStyle(styleMode === 'satellite' ? STYLE_SATELLITE : STYLE_OUTDOORS);
    map.once('style.load', () => {
      addTerrainAndRouteLayers(map);
      applyTerrain(map, terrainOn);
      updateRouteSources(map);
      syncMarkers(map);
      styleReadyRef.current = true;
    });
  }, [applyTerrain, styleMode, syncMarkers, terrainOn, updateRouteSources]);

  const toggle3D = () => {
    const next = !is3D;
    setIs3D(next);
    mapRef.current?.easeTo({ pitch: next ? 54 : 0, bearing: next ? -22 : 0, duration: 700 });
  };

  if (!MAPBOX_TOKEN) {
    return (
      <div className="kg-map-unavailable">
        <i className="fa-solid fa-map" aria-hidden />
        <strong>Interactive 3D map requires Mapbox</strong>
        <p>
          Add <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> to <code>.env.local</code> at the project root.
        </p>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="kg-map-unavailable">
        <i className="fa-solid fa-triangle-exclamation" aria-hidden />
        <strong>Map unavailable</strong>
        <p>{mapError}</p>
      </div>
    );
  }

  return (
    <div className="kg-map-shell">
      <div className="kg-map-toolbar" role="toolbar" aria-label="Map controls">
        <button type="button" className={`kg-map-tool${is3D ? ' is-active' : ''}`} onClick={toggle3D} aria-pressed={is3D}>
          {is3D ? '3D' : '2D'}
        </button>
        <button
          type="button"
          className={`kg-map-tool${terrainOn ? ' is-active' : ''}`}
          onClick={() => setTerrainOn((v) => !v)}
          aria-pressed={terrainOn}
        >
          Terrain
        </button>
        <button
          type="button"
          className={`kg-map-tool${styleMode === 'satellite' ? ' is-active' : ''}`}
          onClick={() => setStyleMode((m) => (m === 'satellite' ? 'outdoors' : 'satellite'))}
          aria-pressed={styleMode === 'satellite'}
        >
          {styleMode === 'satellite' ? 'Satellite' : 'Terrain'}
        </button>
        <button type="button" className="kg-map-tool" onClick={() => mapRef.current && fitRoute(mapRef.current)}>
          Fit route
        </button>
      </div>

      {!routeGeom.hasDrawableTrekRoute && mapReady && (
        <div className="kg-map-notice" role="status">
          Verified trail stops shown — GPS trail geometry pending verification for this segment.
        </div>
      )}

      <div ref={containerRef} className="kg-map-canvas" aria-label={`${trekTitle} route map`} />

      {(!mapReady || routeLoading) && (
        <div className="kg-map-loading" aria-live="polite">
          <div className="kg-map-loading-inner">
            <span className="kg-map-loading-pulse" aria-hidden />
            <span>{routeLoading ? 'Resolving road & trail geometry…' : 'Loading terrain map…'}</span>
          </div>
        </div>
      )}
    </div>
  );
}
