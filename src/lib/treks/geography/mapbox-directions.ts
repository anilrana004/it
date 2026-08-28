const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

export type DirectionsResult = {
  coordinates: [number, number][];
  source: 'mapbox-directions';
};

/** Fetch real driving geometry from Mapbox Directions API (road network). */
export async function fetchDrivingRoute(
  from: { lng: number; lat: number },
  to: { lng: number; lat: number },
  via: { lng: number; lat: number }[] = [],
): Promise<DirectionsResult | null> {
  if (!MAPBOX_TOKEN) return null;

  const points = [from, ...via, to];
  const coordPath = points.map((p) => `${p.lng},${p.lat}`).join(';');
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordPath}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`;

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
