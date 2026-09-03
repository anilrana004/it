/**
 * Chopta Tungnath verified geographic data — map GeoJSON and trail stops.
 * Coordinates [longitude, latitude]. Sources: OSM Nominatim, Wikipedia, Indiahikes (Aug 2026).
 */
import type { GeoLocation } from '@/lib/treks/geography/types';

export const CHOPTA_TRAIL_STOPS: GeoLocation[] = [
  {
    key: 'chopta',
    name: 'Chopta Camp',
    lng: 79.1944,
    lat: 30.4792,
    elevationM: 2680,
    source: 'authoritative-reference',
  },
  {
    key: 'tungnath',
    name: 'Tungnath Temple',
    lng: 79.216944,
    lat: 30.489722,
    elevationM: 3680,
    source: 'authoritative-reference',
  },
  {
    key: 'chandrashila',
    name: 'Chandrashila Summit',
    lng: 79.22139,
    lat: 30.48806,
    elevationM: 4130,
    source: 'authoritative-reference',
  },
  {
    key: 'sari-village',
    name: 'Sari Village',
    lng: 79.1534,
    lat: 30.5181,
    elevationM: 2000,
    source: 'himalaya-trekker-gps',
  },
  {
    key: 'deoria-tal',
    name: 'Deoria Tal',
    lng: 79.12778,
    lat: 30.52222,
    elevationM: 2438,
    source: 'authoritative-reference',
  },
];

/** Day 2 — Chopta → Tungnath → Chandrashila → Sari (approximate trail corridor). */
export const CHOPTA_DAY2_TREK_LINE: [number, number][] = [
  [79.1944, 30.4792],
  [79.198, 30.481],
  [79.203, 30.4835],
  [79.208, 30.4855],
  [79.212, 30.4875],
  [79.216944, 30.489722],
  [79.2185, 30.489],
  [79.220, 30.4885],
  [79.22139, 30.48806],
  [79.215, 30.492],
  [79.205, 30.498],
  [79.195, 30.505],
  [79.185, 30.511],
  [79.175, 30.515],
  [79.165, 30.517],
  [79.1534, 30.5181],
];

/** Day 3 — Sari → Deoria Tal (one-way; return retraces same trail). */
export const CHOPTA_DAY3_TREK_LINE: [number, number][] = [
  [79.1534, 30.5181],
  [79.148, 30.519],
  [79.142, 30.5205],
  [79.136, 30.5215],
  [79.131, 30.522],
  [79.12778, 30.52222],
];
