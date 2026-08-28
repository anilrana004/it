import type { TrekRouteProfileData } from './route-profile-types';

/** Precise day-by-day map allocation for Kedarkantha — Garhwal Himalaya route. */
export const kedarkanthaRouteProfile: TrekRouteProfileData = {
  mapCaption:
    'Kedarkantha route through Govind Pashu Vihar — Dehradun pickup, Sankri base, Juda Ka Talab, summit at 12,500 ft, and descent via Hargaon Thach.',
  pointOverrides: {
    1: {
      label: 'Sankri',
      altitudeFt: 6400,
      distanceKm: 190,
      activity: 'drive',
      mapX: 18,
      mapY: 74,
    },
    2: {
      label: 'Juda Ka Talab',
      altitudeFt: 9000,
      distanceKm: 5,
      activity: 'trek',
      mapX: 34,
      mapY: 58,
    },
    3: {
      label: 'Kedarkantha Base',
      altitudeFt: 11250,
      distanceKm: 3,
      activity: 'trek',
      mapX: 48,
      mapY: 42,
    },
    4: {
      label: 'Kedarkantha Summit',
      altitudeFt: 12500,
      distanceKm: 11,
      activity: 'summit',
      mapX: 66,
      mapY: 16,
    },
    5: {
      label: 'Sankri',
      altitudeFt: 6400,
      distanceKm: 4.5,
      activity: 'trek',
      mapX: 22,
      mapY: 70,
    },
  },
};
