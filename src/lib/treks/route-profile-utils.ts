import type { RouteActivity, RoutePoint, RouteProfile, BuildRouteProfileInput } from './route-profile-types';

/** Extract the first numeric altitude in feet from strings like "12,500 ft (summit)". */
export function parseAltitudeFt(raw?: string): number | null {
  if (!raw) return null;
  const matches = [...raw.matchAll(/([\d,]+(?:\.\d+)?)\s*ft/gi)];
  if (!matches.length) return null;
  const values = matches.map((m) => Number(m[1].replace(/,/g, ''))).filter(Number.isFinite);
  if (!values.length) return null;
  return Math.max(...values);
}

/** Parse trek distance in km — prefers trek segments over drive totals when mixed. */
export function parseDistanceKm(raw?: string): number | null {
  if (!raw) return null;
  const trekMatch = raw.match(/([\d,]+(?:\.\d+)?)\s*km\s*(?:trek|on foot|hike|walk)/i);
  if (trekMatch) return Number(trekMatch[1].replace(/,/g, ''));

  const all = [...raw.matchAll(/([\d,]+(?:\.\d+)?)\s*km/gi)].map((m) =>
    Number(m[1].replace(/,/g, '')),
  );
  if (!all.length) return null;

  const trekOnly = all.filter((v) => v <= 40);
  if (trekOnly.length) return trekOnly.reduce((sum, v) => sum + v, 0);
  return all[0];
}

function detectActivity(title: string): RouteActivity {
  const lower = title.toLowerCase();
  if (/summit|peak climb|top/.test(lower)) return 'summit';
  if (/depart|conclude|checkout|checkout|end of trip|return home/.test(lower)) return 'rest';
  if (/drive|pickup|drop|transport|railway|airport|bus/.test(lower)) return 'drive';
  return 'trek';
}

function extractLocationLabel(title: string): string {
  const cleaned = title
    .replace(/\([^)]*\)/g, '')
    .replace(/—/g, '—')
    .trim();

  const toMatch = cleaned.match(/\bto\s+(.+?)(?:\s+treat|\s+trek|\s+hike|\s+&|\s+—|$)/i);
  if (toMatch) return shortenLabel(toMatch[1]);

  const dashDest = cleaned.match(/—\s*(?:Drive to|Trek to|Travel to)\s+(.+?)$/i);
  if (dashDest) return shortenLabel(dashDest[1]);

  const parts = cleaned.split(/\s+—\s+/);
  if (parts.length > 1) return shortenLabel(parts[parts.length - 1]);

  return shortenLabel(cleaned.split(/[,&]/)[0] ?? `Day stop`);
}

function shortenLabel(text: string): string {
  return text
    .replace(/\b(base camp|trek|drive|pickup|drop|overnight|stay)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 42);
}

function layoutCoordinates(
  index: number,
  total: number,
  altitudeFt: number | null,
  minAlt: number,
  maxAlt: number,
): { mapX: number; mapY: number } {
  const progress = total <= 1 ? 0.5 : index / (total - 1);
  const wave = Math.sin(progress * Math.PI) * 8;
  const mapX = 8 + progress * 84 + wave * 0.35;

  if (altitudeFt == null || maxAlt <= minAlt) {
    const mapY = 78 - progress * 56;
    return { mapX, mapY };
  }

  const ratio = (altitudeFt - minAlt) / (maxAlt - minAlt);
  const mapY = 82 - ratio * 68;
  return { mapX, mapY: Math.max(10, Math.min(88, mapY)) };
}

function computeGainFt(points: RoutePoint[]): number | null {
  const alts = points.map((p) => p.altitudeFt).filter((v): v is number => v != null);
  if (alts.length < 2) return null;
  let gain = 0;
  for (let i = 1; i < alts.length; i += 1) {
    const delta = alts[i] - alts[i - 1];
    if (delta > 0) gain += delta;
  }
  return gain;
}

export function buildRouteProfile(input: BuildRouteProfileInput): RouteProfile {
  const { itinerary, mapImage, maxAltitude, title, routeData } = input;
  const fallbackMax = parseAltitudeFt(maxAltitude);

  const rawAlts = itinerary.map((day) => parseAltitudeFt(day.altitude));
  const knownAlts = rawAlts.filter((v): v is number => v != null);
  const minAlt = knownAlts.length ? Math.min(...knownAlts) : 0;
  const maxAlt = knownAlts.length ? Math.max(...knownAlts) : fallbackMax ?? 12000;

  const points: RoutePoint[] = itinerary.map((day, index) => {
    const override = routeData?.pointOverrides?.[day.day];
    const altitudeFt = override?.altitudeFt ?? parseAltitudeFt(day.altitude);
    const autoCoords = layoutCoordinates(index, itinerary.length, altitudeFt, minAlt, maxAlt);

    return {
      day: day.day,
      label: override?.label ?? extractLocationLabel(day.title),
      title: day.title,
      altitudeFt,
      altitudeLabel: day.altitude,
      distanceKm: override?.distanceKm ?? parseDistanceKm(day.distance),
      distanceLabel: day.distance,
      duration: day.duration,
      meals: day.meals,
      activity: override?.activity ?? detectActivity(day.title),
      mapX: override?.mapX ?? autoCoords.mapX,
      mapY: override?.mapY ?? autoCoords.mapY,
      description: day.description,
    };
  });

  const totalDistanceKm = points.reduce((sum, p) => sum + (p.distanceKm ?? 0), 0) || null;
  const maxAltitudeFt =
    points.reduce<number | null>((max, p) => {
      if (p.altitudeFt == null) return max;
      return max == null ? p.altitudeFt : Math.max(max, p.altitudeFt);
    }, null) ?? fallbackMax;

  return {
    points,
    totalDistanceKm,
    maxAltitudeFt,
    totalGainFt: computeGainFt(points),
    mapImage,
    mapCaption:
      routeData?.mapCaption ??
      `Day-by-day route map for ${title}. Select a day to view trail allocation, altitude, and distance.`,
  };
}

export function formatAltitude(ft: number | null): string {
  if (ft == null) return '—';
  return `${ft.toLocaleString('en-IN')} ft`;
}

export function formatDistance(km: number | null, label?: string): string {
  if (label) return label;
  if (km == null) return '—';
  return `${km.toLocaleString('en-IN', { maximumFractionDigits: 1 })} km`;
}

export function activityLabel(activity: RouteActivity): string {
  switch (activity) {
    case 'drive':
      return 'Road transfer';
    case 'summit':
      return 'Summit push';
    case 'rest':
      return 'Departure / rest';
    default:
      return 'Trekking';
  }
}

export function activityIcon(activity: RouteActivity): string {
  switch (activity) {
    case 'drive':
      return 'fa-solid fa-bus';
    case 'summit':
      return 'fa-solid fa-flag-checkered';
    case 'rest':
      return 'fa-solid fa-mug-hot';
    default:
      return 'fa-solid fa-person-hiking';
  }
}
