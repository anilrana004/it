import type { TrekRichSection } from '@/lib/content/treks/types';

export const KEDARKANTHA_SAFETY_SECTION: TrekRichSection = {
  id: 'safety',
  kicker: 'Stay Safe',
  title: 'Safety Precautions and Protocols',
  intro:
    'Eleven essential safety measures for the Kedarkantha Winter Trek — from acclimatization to altitude sickness awareness.',
  blocks: [
    {
      type: 'h3',
      text: '1. Acclimatization',
    },
    {
      type: 'ul',
      items: [
        'Spend time at Sankri Base Camp (6,400 ft) before ascending',
        'Follow “climb high, sleep low” with short acclimatization hikes',
        'Walk slowly; practice light yoga and Pranayama',
      ],
    },
    {
      type: 'h3',
      text: '2. Weather Preparedness',
    },
    {
      type: 'ul',
      items: [
        'Check forecast; delay if heavy snowfall or storms predicted',
        'Carry waterproof jacket, poncho, and rain cover',
        'Start early; reach camp before afternoon weather shifts',
      ],
    },
    {
      type: 'h3',
      text: '3. Hydration and Nutrition',
    },
    {
      type: 'ul',
      items: [
        'Drink 3–4 litres of water daily in small sips',
        'Carry dry fruits, energy bars, jaggery, glucose biscuits',
        'Avoid alcohol, smoking, and excess caffeine',
      ],
    },
    {
      type: 'h3',
      text: '4. Health and First Aid',
    },
    {
      type: 'ul',
      items: [
        'Carry Diamox, pain relievers, bandages, antiseptic, ORS',
        'Inform trek leader of pre-existing conditions',
        'Learn basic first aid and altitude sickness management',
      ],
    },
    {
      type: 'h3',
      text: '5. Safety Gear',
    },
    {
      type: 'ul',
      items: [
        'High-ankle waterproof trekking boots with good grip',
        'Layered clothing: thermals, fleece, down jacket, waterproof shell',
        'Headlamp, trekking poles, microspikes, gaiters, gloves, rain cover',
      ],
    },
    {
      type: 'h3',
      text: '6–11. Emergency, Navigation, Wildlife, Group, Environment, AMS',
    },
    {
      type: 'ul',
      items: [
        'Nearest hospital: Mori (21 km from Sankri); carry emergency contacts',
        'Always follow guide; stay on marked trails',
        'Store food properly in Govind Wildlife Sanctuary',
        'Maintain visual contact in group; single-file on narrow trails',
        'Leave No Trace — carry all waste back',
        'AMS symptoms (headache, nausea, dizziness): inform leader immediately and descend if needed',
      ],
    },
    {
      type: 'p',
      text: 'Indian Treks — local experts from Dehradun and Sankri with 25+ years of Himalayan experience — prioritize your safety at every step with trained guides, equipment, and on-ground support.',
    },
  ],
};
