/** Contact-page copy & options — UX mirrored from https://roopkundheaven.in/contact-us/ */

export const CONTACT_TREK_OPTIONS = [
  'Kedarkantha Trek',
  'Valley of Flowers Trek',
  'Hampta Pass Trek',
  'Har Ki Dun Trek',
  'Kuari Pass Trek',
  'Chopta Tungnath Trek',
  'Everest Base Camp',
  'Kedarnath / Badrinath Yatra',
  'Do Dham / Char Dham Yatra',
  'Hemkund Sahib',
  'B2B / Agency partnership',
  'Custom / Not sure yet',
] as const;

export type ContactTeamId = 'b2b' | 'trekking' | 'spiritual' | 'general';

export const CONTACT_TEAMS: {
  id: ContactTeamId;
  icon: string;
  section: string;
  title: string;
  audience: string;
  intro: string[];
  helpsTitle: string;
  helpsWith: string[];
  prompt: string;
  cta: string;
  formLabel: string;
  waPrefill: string;
}[] = [
  {
    id: 'b2b',
    icon: 'fa-handshake',
    section: 'B2B & Travel Partnerships',
    title: 'Partner with Indian Treks',
    audience: 'For Travel Agents, Tour Operators, Corporate Travel Teams & Business Partners',
    intro: [
      'Indian Treks works with travel professionals and businesses looking to offer reliable Himalayan travel experiences to their customers. Whether you are a travel agency planning departures for your clients, a tour operator looking for a dependable local partner, or a business interested in building a long-term travel partnership, our B2B team is here to help.',
      'We can support partners with trekking packages, customized itineraries, group departures, transportation, accommodation, local coordination, and end-to-end travel arrangements across the Himalayan region.',
      'Our team can work with you to design travel programs around your requirements, group size, preferred dates, budget, and customer profile — from individual bookings and small groups to larger departures and recurring business requirements.',
    ],
    helpsTitle: 'What We Can Help With',
    helpsWith: [
      'Trek and tour packages for your customers',
      'Customized Himalayan itineraries',
      'Group and corporate departures',
      'Transportation and local transfers',
      'Accommodation arrangements',
      'Trek logistics and ground coordination',
      'Pilgrimage and spiritual tour arrangements',
      'Recurring B2B travel requirements',
      'Long-term partnerships with travel businesses',
    ],
    prompt: 'Planning a partnership with Indian Treks? Share your requirements with our B2B team and let us explore how we can work together.',
    cta: 'Contact B2B Team',
    formLabel: 'B2B & Travel Partnerships',
    waPrefill: 'Hi Indian Treks! I am reaching out about a B2B / travel partnership.',
  },
  {
    id: 'trekking',
    icon: 'fa-person-hiking',
    section: 'Himalayan Treks & Backpacking',
    title: 'Plan Your Next Himalayan Adventure',
    audience: 'For Treks, Camping, Backpacking & Peak Expeditions',
    intro: [
      'The Himalayas offer experiences for every kind of traveller — from first-time trekkers looking for a comfortable introduction to the mountains to experienced adventurers seeking challenging high-altitude routes and expeditions.',
      'The Indian Treks trekking team can help you choose and plan the right Himalayan experience based on your travel dates, experience level, fitness, group size, preferred difficulty, and interests.',
      'Whether you are planning a weekend mountain escape, a multi-day trek with friends, a family adventure, a group departure, or a more demanding high-altitude expedition, our team can assist with the practical details required for your journey. Explore experiences including Kedarkantha, Valley of Flowers, Hampta Pass, Har Ki Dun, Kuari Pass, Chopta–Tungnath, and other Himalayan trekking destinations.',
    ],
    helpsTitle: 'Our Trekking Team Can Assist With',
    helpsWith: [
      'Trek selection and itinerary planning',
      'Private and customized trekking experiences',
      'Group departures',
      'Camping and accommodation arrangements',
      'Transportation and local transfers',
      'Trek logistics and coordination',
      'Seasonal and route-related guidance',
      'Customized backpacking experiences',
      'High-altitude and expedition enquiries',
    ],
    prompt: 'Not sure which trek is right for you? Tell us about your experience, preferred dates, group size and expectations. Our trekking team can help you find an experience that suits your journey.',
    cta: 'Contact Trekking Team',
    formLabel: 'Himalayan Treks & Backpacking',
    waPrefill: 'Hi Indian Treks! I need help planning a Himalayan trek or backpacking trip.',
  },
  {
    id: 'spiritual',
    icon: 'fa-place-of-worship',
    section: 'Spiritual & Pilgrimage Journeys',
    title: 'Travel to the Sacred Himalayas',
    audience: 'For Char Dham, Kedarnath, Badrinath & Spiritual Tours',
    intro: [
      'For generations, the Himalayas have been a destination of faith, reflection and spiritual journeys. Indian Treks helps travellers plan pilgrimage experiences with practical assistance for transportation, accommodation, itineraries and local coordination.',
      'Whether you are planning a journey to Kedarnath or Badrinath, a Do Dham or Char Dham Yatra, a visit to Hemkund Sahib, or a customized spiritual journey through the Himalayan region, our team can help you organize the important elements of your trip.',
      'We understand that pilgrimage travel can involve different requirements depending on the age and size of your group, travel dates, route preferences and level of assistance required. Our team can work with you to create a practical itinerary suited to your journey.',
    ],
    helpsTitle: 'Pilgrimage & Spiritual Travel Assistance',
    helpsWith: [
      'Kedarnath pilgrimage tours',
      'Badrinath pilgrimage tours',
      'Do Dham Yatra',
      'Char Dham Yatra',
      'Hemkund Sahib journeys',
      'Customized spiritual itineraries',
      'Transportation and local transfers',
      'Accommodation coordination',
      'Group pilgrimage arrangements',
      'Personalized travel planning',
    ],
    prompt: 'Planning a spiritual journey to the Himalayas? Contact our spiritual travel team with your preferred dates, group details and destinations, and we will help you plan the journey.',
    cta: 'Contact Spiritual Team',
    formLabel: 'Spiritual & Pilgrimage Journeys',
    waPrefill: 'Hi Indian Treks! I am planning a spiritual / pilgrimage journey and need assistance.',
  },
  {
    id: 'general',
    icon: 'fa-comments',
    section: 'Not Sure Which Team to Contact?',
    title: "We're Here to Help",
    audience: 'For trekking, pilgrimage, customized tours, or B2B partnerships',
    intro: [
      'If you are unsure whether your enquiry is related to trekking, pilgrimage travel, customized tours, or B2B partnerships, simply get in touch with us.',
      'Tell us what you are planning, where you would like to travel, your preferred dates, and the number of travellers. Our team will direct your enquiry to the right department and help you with the next steps.',
    ],
    helpsTitle: 'What to Share',
    helpsWith: [
      'Where you want to travel',
      'Preferred travel dates',
      'Number of travellers',
      'Trip type (trek, yatra, custom, B2B)',
      'Any special requirements',
    ],
    prompt: 'Your journey starts with a conversation.',
    cta: 'Contact Indian Treks',
    formLabel: 'General enquiry',
    waPrefill: 'Hi Indian Treks! I am not sure which team to contact — here is what I am planning.',
  },
];

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
