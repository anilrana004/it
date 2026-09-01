import type { TrekRouteDefinition } from './types';

/** Explicit trek routes — every location key must exist in locations.ts. */
export const TREK_ROUTES: Record<string, TrekRouteDefinition> = {
  kedarkantha: {
    trekId: 'kedarkantha',
    driveVia: ['mussoorie', 'nainbag', 'naugaon', 'purola', 'mori', 'netwar'],
    caption:
      '5-day Kedarkantha itinerary — Day 1 drive via Naugaon, Purola, Mori and Netwar to Sankri; Days 2–4 trek to summit and Hargaon; Day 5 return to Dehradun.',
    waypoints: [
      { day: 1, locationKey: 'dehradun-railway', kind: 'start', activity: 'drive', markerRole: 'primary' },
      { day: 2, locationKey: 'juda-ka-talab', kind: 'water', activity: 'trek', markerRole: 'primary' },
      { day: 3, locationKey: 'kedarkantha-base', kind: 'base-camp', activity: 'trek', markerRole: 'primary' },
      { day: 4, locationKey: 'kedarkantha-summit', kind: 'summit', activity: 'summit', markerRole: 'primary' },
      { day: 5, locationKey: 'dehradun-railway', kind: 'end', activity: 'drive', markerRole: 'primary' },
    ],
    trailStops: [
      { locationKey: 'sankri', kind: 'village', label: 'Sankri', itineraryDay: 2 },
      { locationKey: 'juda-ka-talab', kind: 'water', label: 'Juda Ka Talab', itineraryDay: 2 },
      { locationKey: 'kedarkantha-base', kind: 'base-camp', label: 'Base Camp', itineraryDay: 3 },
      { locationKey: 'kedarkantha-summit', kind: 'summit', label: 'Summit', itineraryDay: 4, pinExact: true },
      { locationKey: 'hargaon', kind: 'camp', label: 'Hargaon Thach', itineraryDay: 4 },
    ],
    routeSegments: [
      {
        id: 'day1-drive',
        geometryKind: 'driving-network',
        trackKey: 'kedarkantha-day1-drive',
        driveFrom: 'dehradun-railway',
        driveTo: 'sankri',
        driveVia: ['mussoorie', 'nainbag', 'naugaon', 'purola', 'mori', 'netwar'],
        dayStart: 1,
        dayEnd: 1,
      },
      {
        id: 'trek-full',
        geometryKind: 'gps-track',
        trackKey: 'kedarkantha-trek-full',
        dayStart: 2,
        dayEnd: 5,
      },
      {
        id: 'day5-drive',
        geometryKind: 'driving-network',
        trackKey: 'kedarkantha-day5-drive',
        driveFrom: 'sankri',
        driveTo: 'dehradun-railway',
        driveVia: ['netwar', 'mori', 'purola', 'naugaon', 'nainbag', 'mussoorie'],
        dayStart: 5,
        dayEnd: 5,
      },
    ],
  },
  'valley-of-flowers': {
    trekId: 'valley-of-flowers',
    waypoints: [
      { day: 1, locationKey: 'rishikesh', kind: 'start', activity: 'drive' },
      { day: 1, locationKey: 'govindghat', kind: 'village', activity: 'drive' },
      { day: 2, locationKey: 'ghangaria', kind: 'camp', activity: 'trek' },
      { day: 3, locationKey: 'valley-of-flowers', kind: 'viewpoint', activity: 'trek' },
      { day: 4, locationKey: 'hemkund', kind: 'temple', activity: 'trek' },
      { day: 5, locationKey: 'govindghat', kind: 'village', activity: 'trek' },
      { day: 5, locationKey: 'rishikesh', kind: 'end', activity: 'drive' },
    ],
  },
  'hampta-pass': {
    trekId: 'hampta-pass',
    waypoints: [
      { day: 1, locationKey: 'manali', kind: 'start', activity: 'drive' },
      { day: 3, locationKey: 'hampta-pass', kind: 'pass', activity: 'summit' },
      { day: 5, locationKey: 'manali', kind: 'end', activity: 'drive' },
    ],
  },
  'annapurna-base-camp': {
    trekId: 'annapurna-base-camp',
    waypoints: [
      { day: 1, locationKey: 'pokhara', kind: 'start', activity: 'drive' },
      { day: 6, locationKey: 'annapurna-base-camp', kind: 'base-camp', activity: 'summit' },
      { day: 8, locationKey: 'pokhara', kind: 'end', activity: 'drive' },
    ],
  },
  'kedarnath-yatra': {
    trekId: 'kedarnath-yatra',
    waypoints: [
      { day: 1, locationKey: 'rishikesh', kind: 'start', activity: 'drive' },
      { day: 2, locationKey: 'kedarnath', kind: 'temple', activity: 'trek' },
      { day: 4, locationKey: 'rishikesh', kind: 'end', activity: 'drive' },
    ],
  },
  'everest-base-camp': {
    trekId: 'everest-base-camp',
    waypoints: [
      { day: 1, locationKey: 'kathmandu', kind: 'start', activity: 'drive' },
      { day: 1, locationKey: 'lukla', kind: 'village', activity: 'drive' },
      { day: 8, locationKey: 'everest-base-camp', kind: 'base-camp', activity: 'summit' },
      { day: 12, locationKey: 'lukla', kind: 'village', activity: 'trek' },
      { day: 13, locationKey: 'kathmandu', kind: 'end', activity: 'drive' },
    ],
  },
  'mcleodganj-trek': {
    trekId: 'mcleodganj-trek',
    waypoints: [
      { day: 1, locationKey: 'mcleodganj', kind: 'start', activity: 'rest' },
      { day: 2, locationKey: 'triund', kind: 'camp', activity: 'trek' },
      { day: 3, locationKey: 'mcleodganj', kind: 'end', activity: 'trek' },
    ],
  },
  'chopta-tungnath': {
    trekId: 'chopta-tungnath',
    waypoints: [
      { day: 1, locationKey: 'rishikesh', kind: 'start', activity: 'drive' },
      { day: 1, locationKey: 'chopta', kind: 'village', activity: 'drive' },
      { day: 2, locationKey: 'tungnath', kind: 'temple', activity: 'summit' },
      { day: 4, locationKey: 'rishikesh', kind: 'end', activity: 'drive' },
    ],
  },
  'badrinath-yatra': {
    trekId: 'badrinath-yatra',
    waypoints: [
      { day: 1, locationKey: 'rishikesh', kind: 'start', activity: 'drive' },
      { day: 2, locationKey: 'badrinath', kind: 'temple', activity: 'drive' },
      { day: 4, locationKey: 'rishikesh', kind: 'end', activity: 'drive' },
    ],
  },
  'dayara-bugyal': {
    trekId: 'dayara-bugyal',
    waypoints: [
      { day: 1, locationKey: 'rishikesh', kind: 'start', activity: 'drive' },
      { day: 3, locationKey: 'dayara-bugyal', kind: 'viewpoint', activity: 'trek' },
      { day: 5, locationKey: 'rishikesh', kind: 'end', activity: 'drive' },
    ],
  },
  'har-ki-dun': {
    trekId: 'har-ki-dun',
    waypoints: [
      { day: 1, locationKey: 'dehradun-railway', kind: 'start', activity: 'drive' },
      { day: 1, locationKey: 'sankri', kind: 'village', activity: 'drive' },
      { day: 2, locationKey: 'juda-ka-talab', kind: 'water', activity: 'trek' },
      { day: 3, locationKey: 'har-ki-dun', kind: 'viewpoint', activity: 'trek' },
      { day: 5, locationKey: 'sankri', kind: 'village', activity: 'trek' },
      { day: 6, locationKey: 'dehradun-railway', kind: 'end', activity: 'drive' },
    ],
  },
  'kuari-pass': {
    trekId: 'kuari-pass',
    waypoints: [
      { day: 1, locationKey: 'rishikesh', kind: 'start', activity: 'drive' },
      { day: 3, locationKey: 'kuari-pass', kind: 'pass', activity: 'summit' },
      { day: 5, locationKey: 'rishikesh', kind: 'end', activity: 'drive' },
    ],
  },
  'nag-tibba': {
    trekId: 'nag-tibba',
    waypoints: [
      { day: 1, locationKey: 'dehradun-railway', kind: 'start', activity: 'drive' },
      { day: 2, locationKey: 'nag-tibba', kind: 'summit', activity: 'summit' },
      { day: 3, locationKey: 'dehradun-railway', kind: 'end', activity: 'drive' },
    ],
  },
  'gaumukh-tapovan': {
    trekId: 'gaumukh-tapovan',
    waypoints: [
      { day: 1, locationKey: 'rishikesh', kind: 'start', activity: 'drive' },
      { day: 1, locationKey: 'gangotri', kind: 'temple', activity: 'drive' },
      { day: 4, locationKey: 'gaumukh', kind: 'viewpoint', activity: 'trek' },
      { day: 6, locationKey: 'rishikesh', kind: 'end', activity: 'drive' },
    ],
  },
  'bali-pass': {
    trekId: 'bali-pass',
    waypoints: [
      { day: 1, locationKey: 'dehradun-railway', kind: 'start', activity: 'drive' },
      { day: 4, locationKey: 'bali-pass', kind: 'pass', activity: 'summit' },
      { day: 6, locationKey: 'dehradun-railway', kind: 'end', activity: 'drive' },
    ],
  },
  'rupin-pass': {
    trekId: 'rupin-pass',
    waypoints: [
      { day: 1, locationKey: 'dehradun-railway', kind: 'start', activity: 'drive' },
      { day: 5, locationKey: 'rupin-pass', kind: 'pass', activity: 'summit' },
      { day: 7, locationKey: 'dehradun-railway', kind: 'end', activity: 'drive' },
    ],
  },
  'sar-pass': {
    trekId: 'sar-pass',
    waypoints: [
      { day: 1, locationKey: 'kasol', kind: 'start', activity: 'rest' },
      { day: 3, locationKey: 'kasol', kind: 'end', activity: 'trek' },
    ],
  },
  'beas-kund': {
    trekId: 'beas-kund',
    waypoints: [
      { day: 1, locationKey: 'manali', kind: 'start', activity: 'drive' },
      { day: 2, locationKey: 'beas-kund', kind: 'water', activity: 'trek' },
      { day: 3, locationKey: 'manali', kind: 'end', activity: 'trek' },
    ],
  },
  'yulla-kanda': {
    trekId: 'yulla-kanda',
    waypoints: [
      { day: 1, locationKey: 'dehradun-railway', kind: 'start', activity: 'drive' },
      { day: 3, locationKey: 'yulla-kanda', kind: 'summit', activity: 'summit' },
      { day: 5, locationKey: 'dehradun-railway', kind: 'end', activity: 'drive' },
    ],
  },
  'buran-ghati': {
    trekId: 'buran-ghati',
    waypoints: [
      { day: 1, locationKey: 'dehradun-railway', kind: 'start', activity: 'drive' },
      { day: 4, locationKey: 'buran-ghati', kind: 'pass', activity: 'summit' },
      { day: 6, locationKey: 'dehradun-railway', kind: 'end', activity: 'drive' },
    ],
  },
  'bhrigu-lake': {
    trekId: 'bhrigu-lake',
    waypoints: [
      { day: 1, locationKey: 'manali', kind: 'start', activity: 'drive' },
      { day: 2, locationKey: 'bhrigu-lake', kind: 'water', activity: 'trek' },
      { day: 3, locationKey: 'manali', kind: 'end', activity: 'trek' },
    ],
  },
  'kheerganga': {
    trekId: 'kheerganga',
    waypoints: [
      { day: 1, locationKey: 'kasol', kind: 'start', activity: 'rest' },
      { day: 2, locationKey: 'kasol', kind: 'end', activity: 'trek' },
    ],
  },
  'do-dham': {
    trekId: 'do-dham',
    waypoints: [
      { day: 1, locationKey: 'rishikesh', kind: 'start', activity: 'drive' },
      { day: 3, locationKey: 'kedarnath', kind: 'temple', activity: 'trek' },
      { day: 5, locationKey: 'badrinath', kind: 'temple', activity: 'drive' },
      { day: 7, locationKey: 'rishikesh', kind: 'end', activity: 'drive' },
    ],
  },
  'char-dham': {
    trekId: 'char-dham',
    waypoints: [
      { day: 1, locationKey: 'rishikesh', kind: 'start', activity: 'drive' },
      { day: 4, locationKey: 'kedarnath', kind: 'temple', activity: 'trek' },
      { day: 7, locationKey: 'badrinath', kind: 'temple', activity: 'drive' },
      { day: 10, locationKey: 'rishikesh', kind: 'end', activity: 'drive' },
    ],
  },
  'panch-kedar': {
    trekId: 'panch-kedar',
    waypoints: [
      { day: 1, locationKey: 'rishikesh', kind: 'start', activity: 'drive' },
      { day: 5, locationKey: 'kedarnath', kind: 'temple', activity: 'trek' },
      { day: 10, locationKey: 'rishikesh', kind: 'end', activity: 'drive' },
    ],
  },
  'nepal-backpacking': {
    trekId: 'nepal-backpacking',
    waypoints: [
      { day: 1, locationKey: 'kathmandu', kind: 'start', activity: 'rest' },
      { day: 3, locationKey: 'pokhara', kind: 'village', activity: 'drive' },
      { day: 7, locationKey: 'kathmandu', kind: 'end', activity: 'drive' },
    ],
  },
  'kathmandu-tour': {
    trekId: 'kathmandu-tour',
    waypoints: [{ day: 1, locationKey: 'kathmandu', kind: 'start', activity: 'rest' }],
  },
  'pokhara-tour': {
    trekId: 'pokhara-tour',
    waypoints: [{ day: 1, locationKey: 'pokhara', kind: 'start', activity: 'rest' }],
  },
  'chitwan-safari': {
    trekId: 'chitwan-safari',
    waypoints: [
      { day: 1, locationKey: 'kathmandu', kind: 'start', activity: 'drive' },
      { day: 2, locationKey: 'chitwan', kind: 'viewpoint', activity: 'drive' },
      { day: 4, locationKey: 'kathmandu', kind: 'end', activity: 'drive' },
    ],
  },
};
