import { getMapboxToken } from '@/lib/env/public-env';

export type DirectionsResult = {
  coordinates: [number, number][];
  source: 'mapbox-directions' | 'osrm';
};

/** Fetch driving geometry — Mapbox when token is set, otherwise OSRM (free, no key). */
export async function fetchDrivingRoute(
  from: { lng: number; lat: number },
  to: { lng: number; lat: number },
  via: { lng: number; lat: number }[] = [],
): Promise<DirectionsResult | null> {
  const mapbox = await fetchMapboxDriving(from, to, via);
  if (mapbox) return mapbox;
  return fetchOsrmDriving(from, to, via);
}

async function fetchMapboxDriving(
  from: { lng: number; lat: number },
  to: { lng: number; lat: number },
  via: { lng: number; lat: number }[],
): Promise<DirectionsResult | null> {
  const token = getMapboxToken();
  if (!token) return null;

  const points = [from, ...via, to];
  const coordPath = points.map((p) => `${p.lng},${p.lat}`).join(';');
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordPath}?geometries=geojson&overview=full&access_token=${token}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as {
      routes?: { geometry?: { coordinates?: [number, number][] } }[];
    };
    const coords = data.routes?.[0]?.geometry?.coordinates;
    if (!coords?.length) return null;
    return { coordinates: coords, source: 'mapbox-directions' };
  } catch {
    return null;
  }
}

/** OSRM public demo server — reliable fallback for road geometry without an API key. */
async function fetchOsrmDriving(
  from: { lng: number; lat: number },
  to: { lng: number; lat: number },
  via: { lng: number; lat: number }[],
): Promise<DirectionsResult | null> {
  const points = [from, ...via, to];
  const coordPath = points.map((p) => `${p.lng},${p.lat}`).join(';');
  const url = `https://router.project-osrm.org/route/v1/driving/${coordPath}?overview=full&geometries=geojson`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as {
      code?: string;
      routes?: { geometry?: { coordinates?: [number, number][] } }[];
    };
    if (data.code !== 'Ok') return null;
    const coords = data.routes?.[0]?.geometry?.coordinates;
    if (!coords?.length) return null;
    return { coordinates: coords, source: 'osrm' };
  } catch {
    return null;
  }
}
