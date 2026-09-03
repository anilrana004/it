import { getMapboxToken, hasMapboxToken } from '@/lib/env/public-env';
import type { MapStyleMode, TrekMapConfig } from '@/types/trek-map';
import { DEFAULT_FIT_PADDING } from './geo-utils';

export const TREK_MAP_CONFIG: TrekMapConfig = {
  defaultPitch: 48,
  defaultBearing: -18,
  terrainExaggeration: 1.25,
  fitPadding: DEFAULT_FIT_PADDING,
  fitMinZoom: 8,
  fitMaxZoom: 15.5,
  mapMinZoom: 0.8,
  mapMaxZoom: 18,
  globeMaxZoom: 5,
};

/**
 * HTTPS style URLs with the token in the query.
 * `mapbox://styles/...` can fail to authenticate under some Mapbox GL builds.
 */
export function mapboxStyleUrl(mode: MapStyleMode, token = getMapboxToken()): string {
  const t = encodeURIComponent(token);
  return mode === 'satellite'
    ? `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12?access_token=${t}`
    : `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12?access_token=${t}`;
}

export function mapboxStyleFallbacks(mode: MapStyleMode, token = getMapboxToken()): string[] {
  const t = encodeURIComponent(token);
  if (mode === 'satellite') {
    return [
      `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12?access_token=${t}`,
      `https://api.mapbox.com/styles/v1/mapbox/satellite-v9?access_token=${t}`,
    ];
  }
  return [
    `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12?access_token=${t}`,
    `https://api.mapbox.com/styles/v1/mapbox/streets-v12?access_token=${t}`,
    `https://api.mapbox.com/styles/v1/mapbox/light-v11?access_token=${t}`,
  ];
}

export function getMapAccessToken(): string {
  return getMapboxToken();
}

export function canUseMapbox(): boolean {
  return hasMapboxToken();
}

export type MapboxTokenStatus =
  | { ok: true }
  | { ok: false; reason: 'missing' | 'revoked' | 'invalid' | 'network'; message: string };

/**
 * Shape-only check. Never block map init on the tokens API —
 * ad blockers, CORS, and URL restrictions all make that call lie.
 */
export async function validateMapboxToken(token = getMapAccessToken()): Promise<MapboxTokenStatus> {
  const trimmed = token.trim();
  if (!trimmed) {
    return {
      ok: false,
      reason: 'missing',
      message:
        'Add a Mapbox public token (pk.…) to NEXT_PUBLIC_MAPBOX_TOKEN in .env.local, then restart the dev server.',
    };
  }
  if (!trimmed.startsWith('pk.') || trimmed.length < 20) {
    return {
      ok: false,
      reason: 'invalid',
      message:
        'NEXT_PUBLIC_MAPBOX_TOKEN must be a public token starting with pk. Restart the server after updating .env.local.',
    };
  }
  return { ok: true };
}

export function isIgnorableMapError(message: string): boolean {
  const m = message.toLowerCase();
  return (
    m.includes('cancel') ||
    m.includes('abort') ||
    m.includes('webgl') ||
    m.includes('lost context') ||
    m.includes('already exists') ||
    m.includes('does not exist') ||
    m.includes('is not done loading') ||
    m.includes('style is not done') ||
    m.includes('failed to fetch') ||
    m.includes('ajaxerror') ||
    m.includes('network') ||
    m.includes('404') ||
    m.includes('throttle') ||
    m.includes('rate limit') ||
    m.includes('tile') ||
    m.includes('source') ||
    m.includes('layer') ||
    m.includes('sprite') ||
    m.includes('glyph') ||
    m.includes('image') ||
    m.includes('terrain') ||
    m.includes('hillshade') ||
    m.includes('unauthorized') ||
    m.includes('401') ||
    m.includes('403') ||
    m.includes('forbidden')
  );
}

export function isFatalMapError(message: string): boolean {
  const m = message.toLowerCase();
  return (
    m.includes('token revoked') ||
    m.includes('invalid access token') ||
    m.includes('not authorized')
  );
}
