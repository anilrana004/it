import type { TrekRouteProfileData } from '@/lib/treks/route-profile-types';

/** Day-by-day map — aligned to BRAHMATAL_ITINERARY titles and end-points. */
export const BRAHMATAL_ROUTE_PROFILE: TrekRouteProfileData = {
  mapCaption:
    'Day 1: Rishikesh → Lohajung · Day 2: Lohajung → Bekaltal · Day 3: Bekaltal → Telindi → Brahmatal · Day 4: Summit → Daldum · Day 5: Daldum → Lohajung · Day 6: Lohajung → Deval → Tharali → Karnaprayag → Rudraprayag → Srinagar → Devprayag → Rishikesh.',
  pointOverrides: {
    1: {
      label: 'Lohajung',
      altitudeFt: 7600,
      distanceKm: 250,
      activity: 'drive',
    },
    2: {
      label: 'Bekaltal',
      altitudeFt: 9800,
      distanceKm: 6,
      activity: 'trek',
    },
    3: {
      label: 'Brahmatal Lake',
      altitudeFt: 11250,
      distanceKm: 7,
      activity: 'trek',
    },
    4: {
      label: 'Brahmatal Top → Daldum',
      altitudeFt: 12150,
      distanceKm: 12,
      activity: 'summit',
    },
    5: {
      label: 'Lohajung',
      altitudeFt: 7600,
      distanceKm: 4,
      activity: 'trek',
    },
    6: {
      label: 'Rishikesh',
      altitudeFt: 2100,
      distanceKm: 250,
      activity: 'drive',
    },
  },
};
