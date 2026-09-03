import type { Map as MapboxMap } from 'mapbox-gl';
import { TREK_MAP_CONFIG } from './mapbox';

const DEM_SOURCE = 'trek-map-dem';

function isStandardBasemap(map: MapboxMap): boolean {
  const style = map.getStyle();
  const name = (style?.name ?? '').toLowerCase();
  return name.includes('standard');
}

/** Enable/disable 3D terrain without breaking Mapbox Standard basemap. */
export function ensureTerrain(map: MapboxMap, enabled: boolean): boolean {
  try {
    if (!map.isStyleLoaded()) return false;

    // Mapbox Standard already includes terrain-capable basemap lighting.
    // Prefer DEM when available; skip hillshade (conflicts with Standard slots).
    if (!map.getSource(DEM_SOURCE)) {
      map.addSource(DEM_SOURCE, {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
      });
    }

    if (enabled) {
      map.setTerrain({
        source: DEM_SOURCE,
        exaggeration: TREK_MAP_CONFIG.terrainExaggeration,
      });

      // Classic styles only — Standard manages its own relief shading.
      if (!isStandardBasemap(map) && !map.getLayer('trek-hillshade')) {
        map.addLayer({
          id: 'trek-hillshade',
          type: 'hillshade',
          source: DEM_SOURCE,
          paint: {
            'hillshade-exaggeration': 0.35,
            'hillshade-highlight-color': '#ffffff',
            'hillshade-shadow-color': '#1a2332',
          },
        });
      }
    } else {
      map.setTerrain(null);
      if (map.getLayer('trek-hillshade')) {
        map.removeLayer('trek-hillshade');
      }
    }
    return true;
  } catch {
    return false;
  }
}

/** Call after enabling 3D so markers stay drawable above terrain. */
export function refreshPointLayerOrder(map: MapboxMap): void {
  try {
    if (!map.isStyleLoaded()) return;
    for (const id of [
      'trek-markers',
      'trek-summit-glow',
      'trek-itinerary-stop-circles',
      'trek-start-dot',
      'trek-progress-tip-dot',
      'trek-tracker-point',
      'trek-marker-labels',
      'trek-itinerary-stop-labels',
      'trek-start-label',
    ]) {
      if (map.getLayer(id)) map.moveLayer(id);
    }
  } catch {
    // ignore
  }
}
