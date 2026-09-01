import type { TrekReachStep } from '@/lib/content/treks/types';

/** How to reach Kedarkantha base camp (Sankri) — Dehradun gateway, drive route, and return drop-off. */
export const KEDARKANTHA_REACH_STEPS: TrekReachStep[] = [
  {
    title: 'Directions to Dehradun',
    items: [
      {
        label: 'By Air',
        text: 'Jolly Grant Airport is the domestic airport serving Dehradun, with frequent flights from major metros across India.',
      },
      {
        label: 'By Train',
        text: 'Dehradun Junction is the nearest railway station, with excellent connections to major cities across India.',
      },
      {
        label: 'By Road',
        text: 'Dehradun has an extensive, well-connected road network. From Delhi and surrounding cities you can drive yourself, hire a cab, or use regular bus services thanks to the highway links in the region.',
      },
    ],
  },
  {
    title: 'Dehradun to Sankri (190 km · 8–9 hrs)',
    items: [
      {
        label: 'Dehradun → Mussoorie',
        text: 'Take NH 7 from Dehradun to the hill station of Mussoorie — the usual start of the mountain leg.',
      },
      {
        label: 'Mussoorie → Purola',
        text: 'Continue on NH 7 from Mussoorie toward Purola. This stretch offers scenic mountain roads through the Garhwal hills.',
      },
      {
        label: 'Purola → Mori',
        text: 'From Purola, proceed to Mori and follow signs toward the Sankri / Govind Pashu Vihar corridor.',
      },
      {
        label: 'Mori → Sankri',
        text: 'The final leg from Mori to Sankri is well marked — Sankri is the last motorable village and Kedarkantha base camp.',
      },
      {
        label: 'Pickup',
        text: 'Indian Treks arranges pickup from Dehradun Railway Station around 6:00–7:00 AM (report by 7:30–8:00 AM on batch day).',
      },
      {
        label: 'Transport',
        text: 'Relaxing group transport by Bolero, Tempo Traveller, or similar. Contact your trek coordinator if you wish to upgrade your vehicle.',
      },
    ],
  },
  {
    title: 'Drop-off Information',
    items: [
      {
        label: 'Drop Location',
        text: 'Prince Chowk, Dehradun is the specified drop-off point on return.',
      },
      {
        label: 'Arrival Window',
        text: 'Reach Prince Chowk between 6:30 and 7:30 PM. Plan your onward journey after 9:00 PM.',
      },
      {
        label: 'Departure from Sankri',
        text: 'Return transport from Sankri is arranged around 11:30 AM after the certificate ceremony and group photos.',
      },
      {
        label: 'Railway Station → ISBT',
        text: 'About 6 km — roughly 25 minutes from Dehradun Railway Station to Dehradun Bus Stand (ISBT).',
      },
      {
        label: 'Railway Station → Airport',
        text: 'About 30 km — roughly one hour from Dehradun Railway Station to Jolly Grant Airport.',
      },
      {
        label: 'Buffer Day',
        text: 'Adding a buffer day is highly recommended. If you do not need it for connections, use it to explore Dehradun, Mussoorie, or Rishikesh.',
      },
    ],
  },
];
