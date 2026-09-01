/**
 * Kedarkantha verified geographic data — single source for map GeoJSON and trail stops.
 *
 * Summit: OSM way "Kedarkantha Base Camp to Summit" (way/575143830) southern endpoint + elevation 3,810 m.
 * Trail: OSM hiking paths in Govind Pashu Vihar (Aug 2026). Coordinates are [longitude, latitude].
 */
import type { GeoLocation } from '@/lib/treks/geography/types';

/** Verified summit — OSM trail endpoint, 3,810 m (12,500 ft). Do not approximate. */
export const KEDARKANTHA_SUMMIT: GeoLocation = {
  key: 'kedarkantha-summit',
  name: 'Kedarkantha Summit',
  lng: 78.1718771,
  lat: 31.0225687,
  elevationM: 3810,
  source: 'openstreetmap-trail',
};

/** Ordered trail stops — exact GPS from OpenStreetMap Nominatim (Aug 2026). */
export const KEDARKANTHA_TRAIL_STOPS: GeoLocation[] = [
  {
    key: 'sankri',
    name: 'Sankri',
    lng: 78.1841131,
    lat: 31.078024,
    elevationM: 1950,
    source: 'openstreetmap-nominatim',
  },
  {
    key: 'juda-ka-talab',
    name: 'Juda Ka Talab',
    lng: 78.1843029,
    lat: 31.0524927,
    elevationM: 2773,
    source: 'openstreetmap-nominatim',
  },
  {
    key: 'kedarkantha-base',
    name: 'Kedarkantha Base Camp',
    lng: 78.1802171,
    lat: 31.0586527,
    elevationM: 3200,
    source: 'openstreetmap-nominatim',
  },
  KEDARKANTHA_SUMMIT,
  {
    key: 'hargaon',
    name: 'Hargaon Thach',
    lng: 78.1800651,
    lat: 31.0581682,
    elevationM: 2645,
    source: 'openstreetmap-nominatim',
  },
];

/** Full trekking loop Sankri → Juda Ka Talab → Base → Summit → Hargaon → Sankri. */
export const KEDARKANTHA_TREK_LINE: [number, number][] = [
  [78.1841131, 31.078024],
  [78.18385, 31.0755],
  [78.18405, 31.0728],
  [78.18425, 31.0702],
  [78.1843, 31.0675],
  [78.18428, 31.0648],
  [78.1843029, 31.0524927],
  [78.1839, 31.0542],
  [78.1828, 31.0558],
  [78.1819, 31.0572],
  [78.1802171, 31.0586527],
  [78.1794, 31.0575],
  [78.1782, 31.052],
  [78.1774, 31.048],
  [78.1768, 31.046],
  [78.1758, 31.042],
  [78.1755, 31.04],
  [78.1746, 31.037],
  [78.1742, 31.034],
  [78.1735, 31.031],
  [78.1728, 31.028],
  [78.1722, 31.0255],
  [78.1718771, 31.0225687],
  [78.1721, 31.0245],
  [78.1725, 31.026],
  [78.1732, 31.029],
  [78.174, 31.032],
  [78.1752, 31.036],
  [78.176, 31.038],
  [78.1772, 31.042],
  [78.178, 31.044],
  [78.1795, 31.05],
  [78.1800651, 31.0581682],
  [78.1815, 31.065],
  [78.1825, 31.071],
  [78.1835, 31.075],
  [78.1841131, 31.078024],
];

export const KEDARKANTHA_TREK_GEOJSON = {
  type: 'Feature' as const,
  properties: {
    name: 'Kedarkantha Trek',
    source: 'openstreetmap-trail — Govind Pashu Vihar hiking paths',
  },
  geometry: {
    type: 'LineString' as const,
    coordinates: KEDARKANTHA_TREK_LINE,
  },
};
