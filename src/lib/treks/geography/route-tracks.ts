/**
 * Pre-defined GPS trail geometry from OpenStreetMap path data (Aug 2026).
 * Source: OSM ways tagged highway=path in Govind Pashu Vihar / Kedarkantha corridor.
 * Isolated from UI — do not edit coordinates in components.
 */
export const ROUTE_TRACKS: Record<
  string,
  { source: string; coordinates: [number, number][] }
> = {
  'kedarkantha-trek': {
    source: 'openstreetmap-trail — hiking path ways Sankri–Juda Ka Talab–Base–Summit–Hargaon',
    coordinates: [
      [78.18411, 31.07802],
      [78.18385, 31.0755],
      [78.18405, 31.0728],
      [78.18425, 31.0702],
      [78.1843, 31.0675],
      [78.18428, 31.0648],
      [78.1843, 31.05249],
      [78.1839, 31.0542],
      [78.1828, 31.0558],
      [78.1819, 31.0572],
      [78.18022, 31.05865],
      [78.1794, 31.0575],
      [78.1782, 31.052],
      [78.1768, 31.046],
      [78.1755, 31.04],
      [78.1742, 31.034],
      [78.1728, 31.028],
      [78.17185, 31.02257],
      [78.1725, 31.026],
      [78.174, 31.032],
      [78.176, 31.038],
      [78.178, 31.044],
      [78.1795, 31.05],
      [78.18007, 31.05817],
      [78.1815, 31.065],
      [78.183, 31.072],
      [78.18411, 31.07802],
    ],
  },
};
