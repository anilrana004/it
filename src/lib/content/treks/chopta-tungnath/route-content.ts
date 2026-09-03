import type { TrekRouteProfileData } from '@/lib/treks/route-profile-types';

/** Day-by-day map — aligned to CHOPTA_TUNGNATH_ITINERARY. */
export const CHOPTA_TUNGNATH_ROUTE_PROFILE: TrekRouteProfileData = {
  mapCaption:
    'Day 1: Rishikesh pickup → Chopta camp (202 km) · Day 2: Chopta → Tungnath → Chandrashila → Sari · Day 3: Deoria Tal trek → drive to Rishikesh (220 km).',
  pointOverrides: {
    1: {
      label: 'Chopta Camp',
      altitudeFt: 8800,
      distanceKm: 202,
      activity: 'drive',
    },
    2: {
      label: 'Chandrashila Summit',
      altitudeFt: 13550,
      distanceKm: 10,
      activity: 'summit',
    },
    3: {
      label: 'Rishikesh Railway Station',
      altitudeFt: 1220,
      distanceKm: 6,
      activity: 'drive',
    },
  },
};
