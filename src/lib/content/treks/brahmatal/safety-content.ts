import type { TrekRichSection } from '@/lib/content/treks/types';

/** Safety precautions — Brahmatal Trek. */
export const BRAHMATAL_SAFETY_SECTION: TrekRichSection = {
  id: 'safety',
  kicker: 'Stay Safe',
  title: 'Safety Precautions for the Brahmatal Trek',
  intro: 'Points to remember for safety on the trek:',
  blocks: [
    {
      type: 'ul',
      items: [
        'Arrive at the starting point of the hike in the best possible physical condition and readiness.',
        'The hike is not tough; if you keep both your feet and your mind calm and strong, you will find the journey rather simple.',
        'When you are out on the trail, remember that you may not always be beside your guide and that you must stay on the correct path.',
        'Avoid constantly looking around while walking in a way that unsettles your footing — focus on a steady, confident pace so your legs stay stable through the day.',
        'See your physician if you have any health concerns before joining the trek.',
        'Carry your personal medical supplies with you at all times — this is of the utmost importance.',
      ],
    },
    {
      type: 'h3',
      text: 'How Indian Treks supports you on the trail',
    },
    {
      type: 'ul',
      items: [
        'Indian Treks carries a fully stocked first-aid kit at all times, including oxygen cylinders and medications that may be required during the trek.',
        'If a trekker faces serious difficulty, a stretcher is used to evacuate them back toward base camp when needed.',
        'On the Brahmatal Trek, camps are situated close to the tree line, which helps you stay in a more oxygen-friendly environment overnight.',
        'In a medical emergency, seek assistance immediately from your guide or another trekker who is trained to help.',
      ],
    },
  ],
};
