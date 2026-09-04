import type { TrekRouteProfileData } from '@/lib/treks/route-profile-types';

/** Day-by-day map — aligned to NAG_TIBBA_ITINERARY titles and end-points. */
export const NAG_TIBBA_ROUTE_PROFILE: TrekRouteProfileData = {
  mapCaption:
    'Day 1: Dehradun → Mussoorie → Kempty Falls → Pantwari → Goat Village → Base Camp · Day 2: Base Camp → Nag Mandir → Summit → Pantwari → Dehradun.',
  pointOverrides: {
    1: {
      label: 'Nag Tibba Base Camp',
      altitudeFt: 8200,
      distanceKm: 3,
      activity: 'trek',
    },
    2: {
      label: 'Summit → Pantwari → Dehradun',
      altitudeFt: 9915,
      distanceKm: 13,
      activity: 'summit',
    },
  },
};
