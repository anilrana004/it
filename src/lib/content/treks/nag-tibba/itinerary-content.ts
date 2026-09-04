import type { ItineraryDay } from '@/lib/content/treks/types';

/** Day-wise itinerary for Nag Tibba — shown in the trek detail accordion. */
export const NAG_TIBBA_ITINERARY: ItineraryDay[] = [
  {
    day: 1,
    title: 'Drive from Dehradun towards Pantwari and Trek to Base Camp',
    description: [
      'Distance: 3 km trek · Time: ~4 hrs · Pickup: Dehradun Railway Station · Overnight: Nag Tibba base camp.',
      'In the morning, we pick you up from Dehradun Railway Station and begin the journey toward Pantwari village. En route you stop at Mussoorie — the Queen of Hills — and pass Kempty Falls before the road continues into the hills.',
      'We turn onto the Nag Tibba road and typically arrive at Pantwari around midday. After lunch and a short break in the village, the trek begins.',
      'The hike starts on a paved stretch, then the trail grows rougher as you gain height. You pass through a picturesque Goat Village — a well-known local tourism stop — before reaching the crest that links the Pantwari side of the hills with the Nag Tibba ridge.',
      'Along the way you walk through oak and rhododendron woodland. Overnight is at base camp, with open views of the surrounding mountain landscape.',
    ].join('\n\n'),
    meals: 'Lunch, Dinner',
    altitude: '8,200 ft (base camp)',
    distance: '~90 km drive + 3 km trek',
    duration: '4–5 hrs drive + ~4 hrs trek',
  },
  {
    day: 2,
    title: 'From Base Camp to Nag Tibba Summit and then to Pantwari and back to Dehradun',
    description: [
      'Distance: 13 km trek · Time: ~12 hrs · Altitude: base camp → ~9,915 ft (summit) → Pantwari → Dehradun.',
      'Because it will be a long day, the walk begins early in the morning. After breakfast by about 5:00 a.m., the group sets out toward the peak.',
      'You pass through dense woodland — the same trail can be covered with snow in winter, which makes the walk a little more challenging. After 20 to 30 minutes you reach two open clearings.',
      'From there the route continues to Nag Tibba Temple (Nag Mandir), at the base of Nag Tibba hill, with spectacular views of the Himalayan peaks when the weather is clear.',
      'Beyond the temple the trail re-enters the forest on a steeper climb. This stretch is tougher, but it is also one of the most memorable parts of the trek. Finally you reach the flag that marks the summit of Nag Tibba.',
      'From the top you are treated to breathtaking views of snow-capped mountains such as Kala Nag, Bandarpoonch, Gangotri and Kedarnath — subject to weather and visibility.',
      'After descending to camp for lunch, continue back to Pantwari. From Pantwari the vehicle returns to Dehradun, bringing the Nag Tibba hiking excursion to a close.',
    ].join('\n\n'),
    meals: 'Breakfast, Lunch',
    altitude: '9,915 ft (summit)',
    distance: '13 km trek + drive',
    duration: '~12 hrs',
  },
];
