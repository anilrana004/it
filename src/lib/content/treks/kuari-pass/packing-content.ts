import type { TrekRichSection } from '@/lib/content/treks/types';

/** Things to carry — Kuari Pass trek packing list. */
export const KUARI_PASS_PACKING_SECTION: TrekRichSection = {
  id: 'things-to-carry',
  kicker: 'Packing Guide',
  title: 'Things to Carry',
  intro:
    'Participants must bring the following for the Kuari Pass Trek. Pack light but complete — aim for a well-fitted 50–60 L backpack and break in your boots before departure.',
  blocks: [
    {
      type: 'h3',
      text: 'Participants must bring for Kuari Pass Trek',
    },
    {
      type: 'ul',
      items: [
        '50–60 L backpack',
        'Strong hiking boots — a leather upper is best for ankle support. If you don’t have a pair yet, buy them early and wear them often so they break in well and help prevent blisters.',
        'Tennis shoes or sandals light enough to wear in camp',
        'Two pairs of thick wool socks, if possible',
        'Two pairs of everyday nylon socks to wear underneath the wool socks to prevent blisters',
        'One shirt for hiking, preferably with long sleeves',
        'Long John top (thermal underwear) — wool preferred for the first layer',
        'Two each of warm shirts and pants for camp',
        '1 rain coat / poncho',
        'Warm jacket — 1',
        'One pair of thick wool gloves',
        'Long Johns — first layer should be wool if possible',
        'Underwear — 2–3 changes',
        'Shorts or pants for hiking — 1',
        'Sunscreen lotion (optional). Chapstick or lip balm (optional)',
        'Water bottles — two 1-litre bottles (leak-proof; Pepsi bottles work well)',
        'Headlamp or flashlight — a headlamp is best because it frees your hands; bring extra batteries if using a flashlight',
        'Bathroom items (toothbrush, toothpaste, etc.) and a small personal medical kit',
        'Sun hat (cotton or nylon)',
        'Sunglasses — styles with an anchor / retainer are best',
      ],
    },
  ],
};
