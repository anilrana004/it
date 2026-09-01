import type { TrekRouteProfileData } from '@/lib/treks/route-profile-types';

/** Day-by-day map — aligned to KEDARKANTHA_ITINERARY titles and end-points. */
export const KEDARKANTHA_ROUTE_PROFILE: TrekRouteProfileData = {
  mapCaption:
    'Day 1: Dehradun pickup → Sankri via Naugaon, Purola, Mori · Day 2: Sankri → Juda Ka Talab · Day 3: Juda Ka Talab → Base Camp · Day 4: Summit → Hargaon Thach · Day 5: Hargaon → Sankri → Dehradun.',
  pointOverrides: {
    1: {
      label: 'Dehradun Railway Station',
      altitudeFt: 2100,
      distanceKm: 190,
      activity: 'drive',
    },
    2: {
      label: 'Juda Ka Talab',
      altitudeFt: 9000,
      distanceKm: 5,
      activity: 'trek',
    },
    3: {
      label: 'Kedarkantha Base Camp',
      altitudeFt: 11250,
      distanceKm: 3,
      activity: 'trek',
    },
    4: {
      label: 'Kedarkantha Summit',
      altitudeFt: 12500,
      distanceKm: 11,
      activity: 'summit',
    },
    5: {
      label: 'Dehradun Railway Station',
      altitudeFt: 2100,
      distanceKm: 194.5,
      activity: 'drive',
    },
  },
};
