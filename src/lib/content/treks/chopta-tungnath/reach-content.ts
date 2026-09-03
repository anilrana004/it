import type { TrekReachStep } from '@/lib/content/treks/types';

/** How to reach Chopta Tungnath — gateway cities, drive route, and return drop-off. */
export const CHOPTA_TUNGNATH_REACH_STEPS: TrekReachStep[] = [
  {
    title: 'Directions to Dehradun',
    items: [
      {
        label: 'By Air',
        text: 'Jolly Grant Airport is the domestic airport that serves Dehradun, and it receives frequent flights from the main metropolises located across India.',
      },
      {
        label: 'By Train',
        text: 'Dehradun Junction is the closest railway station, and it has excellent connections to major cities located around India.',
      },
      {
        label: 'By Road',
        text: 'The road network in and around Dehradun is extensive and convenient. To get to Dehradun from Delhi or any of the other surrounding cities, you have the option of either driving there yourself or hiring a cab or taxi. In addition, there is a consistent bus service between Dehradun and the surrounding areas thanks to the extensive road network.',
      },
    ],
  },
  {
    title: 'Rishikesh to Chopta (202 km · 7–8 hrs)',
    items: [
      {
        label: 'Assembly point',
        text: 'Indian Treks arranges pickup from Rishikesh railway station at 7:30 AM on Day 1. Plan to reach Rishikesh the evening before (Dehradun is about 45 km / 1.5 hrs by road if you fly into Jolly Grant Airport).',
      },
      {
        label: 'Rishikesh → Devprayag',
        text: 'The drive follows the Ganges valley toward Devprayag, where the Alaknanda and Bhagirathi rivers meet.',
      },
      {
        label: 'Devprayag → Rudraprayag',
        text: 'Continue along the Mandakini–Alaknanda corridor through Rudraprayag — one of the Panch Prayag sacred confluences.',
      },
      {
        label: 'Rudraprayag → Chopta',
        text: 'The road climbs through Ukhimath and forested hills into the Chopta meadows — your camp for the first night.',
      },
      {
        label: 'Transport',
        text: 'Group transport by Tempo Traveller or similar non-AC vehicle as per the package itinerary.',
      },
    ],
  },
  {
    title: 'Drop-off Information',
    items: [
      {
        label: 'Return day',
        text: 'On Day 3, after the Deoria Tal trek, the group drives back from Chopta/Sari to Rishikesh.',
      },
      {
        label: 'Arrival window',
        text: 'Expected arrival in Rishikesh between 8:30 and 9:30 PM. Plan onward train or bus connections accordingly.',
      },
      {
        label: 'Route highlights',
        text: 'The return drive passes Ukhimath, Rudraprayag, Devprayag, and stretches along the Ganges valley.',
      },
      {
        label: 'Buffer day',
        text: 'Adding a buffer night in Rishikesh or Dehradun after the trek is recommended for relaxed connections.',
      },
    ],
  },
];
