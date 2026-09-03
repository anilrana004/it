/** Client-safe public env vars (must be prefixed with NEXT_PUBLIC_). */

/** Mapbox GL JS / Directions — browser-safe public token only (`pk.`). */
export function getMapboxToken(): string {
  const token = (process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '').trim();
  // Ignore accidental secret tokens — never ship `sk.` to the client map.
  if (token.startsWith('sk.')) return '';
  return token;
}

export function hasMapboxToken(): boolean {
  const token = getMapboxToken();
  return token.startsWith('pk.') && token.length > 20;
}
