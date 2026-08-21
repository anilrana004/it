/** Contact-page copy & options — UX mirrored from https://roopkundheaven.in/contact-us/ */

export const CONTACT_TREK_OPTIONS = [
  'Kedarkantha Trek',
  'Valley of Flowers Trek',
  'Hampta Pass Trek',
  'Har Ki Dun Trek',
  'Chopta Tungnath Trek',
  'Everest Base Camp',
  'Kedarnath Yatra',
  'Custom / Not sure yet',
] as const;

export const CONTACT_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const CONTACT_GROUP_SIZES = [
  'Solo (1)',
  '2–4 people',
  '5–10 people',
  '11–20 people',
  '20+ people',
] as const;

export const CONTACT_STATS = [
  { v: '20,000+', l: 'Trekkers Every Year' },
  { v: '4.9★', l: 'Avg. Rating' },
  { v: 'Since 2016', l: 'Trusted Company' },
] as const;

export type ContactFaqCategory = 'All' | 'Booking' | 'Gear & Fitness' | 'Safety' | 'Logistics';

export const CONTACT_FAQ_CATEGORIES: ContactFaqCategory[] = [
  'All',
  'Booking',
  'Gear & Fitness',
  'Safety',
  'Logistics',
];

export const CONTACT_FAQS: {
  q: string;
  a: string;
  cat: Exclude<ContactFaqCategory, 'All'>;
}[] = [
  {
    cat: 'Booking',
    q: 'How do I book a trek with Indian Treks?',
    a: 'You can book directly through our website, call/WhatsApp us, or fill in the contact form on this page. We’ll send you a detailed itinerary and a booking link within 24 hours of your enquiry.',
  },
  {
    cat: 'Booking',
    q: 'What is the cancellation and refund policy?',
    a: 'Cancellations made 30+ days before the trek date receive a full refund minus processing fees. 15–29 days: 50% refund. Less than 15 days: no refund, but you can transfer your booking to another date free of charge once (subject to availability).',
  },
  {
    cat: 'Booking',
    q: 'What is included in the trek package price?',
    a: 'Our packages typically include certified guides, permits, tented accommodation, all meals on trek, porter support as listed, and first-aid support. Travel to/from the base camp is not included unless specified on the trek page.',
  },
  {
    cat: 'Gear & Fitness',
    q: 'What fitness level is required for high-altitude treks?',
    a: 'For treks above 4,000 m, you should be able to walk 6–8 km per day with a light backpack. We recommend 3–4 weeks of cardio training (running, cycling, stair climbing) before your departure date.',
  },
  {
    cat: 'Gear & Fitness',
    q: 'What essential gear should I carry?',
    a: 'Key items: layered clothing (base, fleece, waterproof jacket), trekking poles, sturdy ankle-support boots, a sleeping bag rated for cold nights, headlamp, sunscreen SPF 50+, and personal medication. We share a detailed packing list after booking.',
  },
  {
    cat: 'Gear & Fitness',
    q: 'Can I rent equipment instead of buying?',
    a: 'Yes. Trekking poles, sleeping bags, crampons, gaiters, and headlamps are commonly available on a rental basis for many departures. Mention this while booking so we can pre-reserve gear for you.',
  },
  {
    cat: 'Safety',
    q: 'How do you handle altitude sickness?',
    a: 'Our guides are trained in wilderness first aid and carry supplemental oxygen and a pulse oximeter on high-altitude itineraries. We build in acclimatisation days. At the first sign of AMS, we descend — safety always comes first.',
  },
  {
    cat: 'Safety',
    q: 'Is travel insurance mandatory?',
    a: 'Yes — travel insurance that covers high-altitude trekking and emergency evacuation is mandatory for our expeditions. We can recommend policy types if you’re unsure where to start.',
  },
  {
    cat: 'Logistics',
    q: 'How do I reach the trek base camp?',
    a: 'Each trek page lists the exact base point and transfer options. Common railheads include Dehradun, Haridwar, Kathgodam, and Chandigarh. We can arrange group transfers from major cities — ask while booking.',
  },
  {
    cat: 'Logistics',
    q: 'Is there mobile network coverage on the trek?',
    a: 'Coverage is limited and usually stops beyond the last roadhead or major village. Our teams carry emergency communication for critical situations. Inform your family about expected blackout periods before departure.',
  },
];
