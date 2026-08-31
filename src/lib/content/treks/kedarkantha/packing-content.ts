import type { TrekPackingGroup } from '@/lib/content/treks/types';

export const KEDARKANTHA_PACKING_GROUPS: TrekPackingGroup[] = [
  {
    title: 'Headgear & Accessories',
    icon: 'fa-solid fa-hat-cowboy',
    items: [
      'Headlamp with extra batteries',
      'Woolen cap/beanie and wide-brim sun cap',
      'UV-protected sunglasses with side coverage',
      'Buff/balaclava for cold and dust',
      'Ear muffs or woolen headband in winter',
    ],
  },
  {
    title: 'Clothing (Layering)',
    icon: 'fa-solid fa-shirt',
    items: [
      'Winter: 5 layers — thermals, woolen sweater, two fleeces, padded jacket',
      '3 quick-dry T-shirts; 2 trekking pants (no jeans)',
      'Waterproof jacket and rain pants/poncho',
      'Thermal inners (2 pairs); woolen fleece jackets',
      'Waterproof gloves; woolen socks (3–4 pairs)',
    ],
  },
  {
    title: 'Footgear',
    icon: 'fa-solid fa-shoe-prints',
    items: [
      'High-ankle waterproof trekking shoes with excellent grip',
      'Trekking/hiking sandals for campsite',
      'Microspikes and gaiters (provided by Indian Treks when required)',
    ],
  },
  {
    title: 'Personal First Aid',
    icon: 'fa-solid fa-heart-pulse',
    items: [
      'Diamox (consult doctor), pain relievers, ORS, bandages, antiseptic',
      'Blister pads, insect repellent, personal prescribed medicines',
      'Sunscreen SPF 50+, lip balm, hand sanitizer',
    ],
  },
  {
    title: 'Documents',
    icon: 'fa-solid fa-id-card',
    items: [
      'Original & photocopy of government photo ID (Aadhaar, Voter ID, Driving License, Passport)',
      'Trekking permit if applicable; medical fitness certificate recommended',
      'Emergency contact list; travel insurance details if applicable',
    ],
  },
  {
    title: 'Essentials to Carry',
    icon: 'fa-solid fa-suitcase',
    items: [
      '60L backpack (max 10 kg personal load); trekking pole',
      'Insulated water bottle; raincoat; extra shirts and trekking pants',
      'Torch, toiletries, phone charger/power bank, identity card',
    ],
  },
];
