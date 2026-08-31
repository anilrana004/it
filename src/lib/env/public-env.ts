/** Client-safe public env vars (must be prefixed with NEXT_PUBLIC_). */
export function getMapboxToken(): string {
  return (process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '').trim();
}

export function hasMapboxToken(): boolean {
  return getMapboxToken().length > 0;
}
