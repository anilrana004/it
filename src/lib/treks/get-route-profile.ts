import type { Trek } from '@/lib/data';
import type { TrekExtendedContent } from '@/lib/treks/trek-extended-types';
import { buildRouteProfile } from '@/lib/treks/route-profile-utils';
import { KEDARKANTHA_ROUTE_PROFILE } from '@/lib/content/treks/kedarkantha/route-content';
import type { RouteProfile, TrekRouteProfileData } from '@/lib/treks/route-profile-types';

const ROUTE_DATA: Record<string, TrekRouteProfileData> = {
  kedarkantha: KEDARKANTHA_ROUTE_PROFILE,
};

export function getRouteProfile(trek: Trek, extended?: TrekExtendedContent): RouteProfile {
  const routeData = extended?.routeProfile ?? ROUTE_DATA[trek.id];
  return buildRouteProfile({
    trekId: trek.id,
    itinerary: trek.itinerary,
    mapImage: trek.mapImage,
    maxAltitude: trek.maxAltitude,
    title: trek.title,
    routeData,
  });
}
