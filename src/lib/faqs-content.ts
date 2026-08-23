import { CONTACT } from '@/lib/contact';

/** FAQ page categories — Exoticamp-style chips, Indian Treks content */
export type FaqCategoryId =
  | 'all'
  | 'safety'
  | 'cancellations'
  | 'booking'
  | 'basics'
  | 'support'
  | 'logistics'
  | 'gear'
  | 'corporate'
  | 'yatra';

export const FAQ_CATEGORIES: {
  id: FaqCategoryId;
  label: string;
  icon: string;
}[] = [
  { id: 'all', label: 'All', icon: 'fa-layer-group' },
  { id: 'safety', label: 'Safety', icon: 'fa-shield-halved' },
  { id: 'cancellations', label: 'Cancellations', icon: 'fa-ban' },
  { id: 'booking', label: 'Booking', icon: 'fa-calendar-check' },
  { id: 'basics', label: 'Basics', icon: 'fa-circle-info' },
  { id: 'support', label: 'Support', icon: 'fa-headset' },
  { id: 'logistics', label: 'Logistics', icon: 'fa-route' },
  { id: 'gear', label: 'Gear & Fitness', icon: 'fa-person-hiking' },
  { id: 'corporate', label: 'Corporate', icon: 'fa-briefcase' },
  { id: 'yatra', label: 'Yatra', icon: 'fa-place-of-worship' },
];

export type FaqItem = {
  id: string;
  category: Exclude<FaqCategoryId, 'all'>;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'book-how',
    category: 'booking',
    question: 'How do I book a trek with Indian Treks?',
    answer:
      'You can book directly from any trek page on our website, call/WhatsApp us, or fill the contact form. We share a detailed itinerary, inclusions, and a secure booking link within 24 hours of your enquiry.',
  },
  {
    id: 'book-include',
    category: 'booking',
    question: 'What is included in the trek package price?',
    answer:
      'Most packages include certified trek leaders, forest/trek permits, tented stay on trail, meals on trek days, first-aid support, and porter/mule support as listed on the trek page. Travel to/from the base camp is usually excluded unless mentioned otherwise.',
  },
  {
    id: 'book-dates',
    category: 'booking',
    question: 'Can I change my trek dates after booking?',
    answer:
      'Yes, date changes are usually possible once, subject to availability and notice period. Reach out to our support team with your booking reference. Last-minute changes may attract a rescheduling fee depending on the departure and season.',
  },
  {
    id: 'book-solo',
    category: 'booking',
    question: 'Can I join as a solo traveller?',
    answer:
      'Absolutely. Most of our fixed departures welcome solo travellers. You share tents/rooms as per the package norms and trek with a mixed group of like-minded people under our trek leaders.',
  },
  {
    id: 'cancel-how',
    category: 'cancellations',
    question: 'How do I cancel my booking?',
    answer:
      `Email ${CONTACT.email} or WhatsApp ${CONTACT.phoneDisplay} with your booking ID and reason for cancellation. Our team confirms the cancellation and shares the refund timeline as per policy.`,
  },
  {
    id: 'cancel-refund',
    category: 'cancellations',
    question: 'What is the cancellation and refund policy?',
    answer:
      'Cancellations 30+ days before departure: full refund minus processing fees. 15–29 days: 50% refund. Less than 15 days: no cash refund, but you can usually transfer once to another date (subject to availability). Force majeure and weather-led cancellations are handled case by case.',
  },
  {
    id: 'cancel-weather',
    category: 'cancellations',
    question: 'What if the trek is cancelled due to weather or trail closure?',
    answer:
      'If we cancel a departure for safety, weather, or official trail closure, we offer a free date shift or credit toward another trek. Refund options (if any) depend on costs already locked with vendors and are confirmed in writing.',
  },
  {
    id: 'safety-ams',
    category: 'safety',
    question: 'How do you handle altitude sickness?',
    answer:
      'Our trek leaders are trained in wilderness first aid and carry pulse oximeters and supplemental oxygen on high-altitude itineraries. We build acclimatisation into the plan. At the first serious signs of AMS, we descend — safety always comes first.',
  },
  {
    id: 'safety-insurance',
    category: 'safety',
    question: 'Is travel insurance mandatory?',
    answer:
      'Yes. Travel insurance covering high-altitude trekking and emergency evacuation is mandatory for our expeditions. We can guide you on suitable policy types if you are unsure where to start.',
  },
  {
    id: 'safety-women',
    category: 'safety',
    question: 'Are your treks safe for women and families?',
    answer:
      'Yes. We run mixed groups with trained leaders, clear camp protocols, and vetted stay partners. Many solo women and families trek with us every season. Read trek-specific difficulty, age guidelines, and safety notes on each trek page before booking.',
  },
  {
    id: 'safety-how',
    category: 'safety',
    question: 'How do you ensure safety on the trail?',
    answer:
      'We use certified leaders, briefings before every day, weather monitoring, proper gear checks, first-aid kits, and emergency communication. Risky stretches are paced carefully. Any forest or restricted zone activity is done only with valid permits.',
  },
  {
    id: 'basics-difficulty',
    category: 'basics',
    question: 'Are the treks difficult?',
    answer:
      'Difficulty varies by route. Weekend and beginner treks are paced for most fitness levels; high passes and winter snow treks need better stamina. Each trek page lists grade, max altitude, daily distance, and who it is best suited for.',
  },
  {
    id: 'basics-food',
    category: 'basics',
    question: 'What food is served on the trek?',
    answer:
      'On-trail meals are typically simple, hygienic, and energy-focused — vegetarian by default on most Himalayan treks, with eggs where possible. Special dietary needs (vegan, Jain, allergies) should be shared at booking so the kitchen team can plan.',
  },
  {
    id: 'basics-age',
    category: 'basics',
    question: 'What is the ideal age to trek?',
    answer:
      'Many easy treks suit ages 10–55 with decent fitness. High-altitude and winter treks often have stricter age and medical guidelines. Minors must trek with a parent/guardian. Check the trek page or ask our team for route-specific advice.',
  },
  {
    id: 'basics-carry',
    category: 'basics',
    question: 'What should I carry for a trek?',
    answer:
      'Carry personal medicines, a headlamp/torch, sunscreen, cap, sturdy trekking shoes, layered clothing, reusable water bottle, and ID proofs. For winter/high altitude add thermals and a warm jacket. We share a full packing list after booking.',
  },
  {
    id: 'support-after',
    category: 'support',
    question: 'What should I do if I need support after booking?',
    answer:
      `For booking changes or payments, contact us on WhatsApp ${CONTACT.phoneDisplay} or email ${CONTACT.email}. For pre-trek prep (how to reach, what to pack), use your confirmation message and trek page. On trail, coordinate with your trek leader first; escalate to our desk if needed.`,
  },
  {
    id: 'support-channels',
    category: 'support',
    question: 'Can I reach you on call, email, or WhatsApp?',
    answer:
      `Yes. Call ${CONTACT.phoneDisplay}, email ${CONTACT.email}, or WhatsApp the same number. Support hours: ${CONTACT.hours}. We aim to reply within 24 hours on email.`,
  },
  {
    id: 'support-feedback',
    category: 'support',
    question: 'How can I share feedback or a review?',
    answer:
      'After your trek we send a feedback link on WhatsApp/email. You can also write to us anytime or leave a public review on Google. Honest feedback helps us improve and helps other travellers choose confidently.',
  },
  {
    id: 'logistics-reach',
    category: 'logistics',
    question: 'How do I reach the trek base?',
    answer:
      'Each trek page lists the base point and recommended rail/road options (for example Dehradun, Haridwar, Kathgodam, or Chandigarh). Group transfers from major cities can often be arranged — ask while booking.',
  },
  {
    id: 'logistics-network',
    category: 'logistics',
    question: 'Is there mobile network on the trek?',
    answer:
      'Coverage usually drops after the last roadhead or major village. Our teams carry emergency communication for critical situations. Inform family about expected offline periods before you leave.',
  },
  {
    id: 'logistics-stay',
    category: 'logistics',
    question: 'What kind of stay is provided?',
    answer:
      'On trek days you typically stay in alpine tents (twin/triple share). Some itineraries include guest houses or homestays at roadheads. Exact stay type is listed on each trek page under inclusions.',
  },
  {
    id: 'gear-fitness',
    category: 'gear',
    question: 'What fitness level is required?',
    answer:
      'For treks above 4,000 m, you should be comfortable walking 6–8 km a day with a light backpack. We recommend 3–4 weeks of cardio (running, cycling, stairs) before departure. Beginner treks need less preparation but still benefit from regular walks.',
  },
  {
    id: 'gear-rent',
    category: 'gear',
    question: 'Can I rent equipment instead of buying?',
    answer:
      'Yes. Trekking poles, sleeping bags, crampons, gaiters, and headlamps are commonly available on rent for many departures. Mention rental needs while booking so we can reserve gear for you.',
  },
  {
    id: 'gear-provided',
    category: 'gear',
    question: 'Is camping gear provided on the trek?',
    answer:
      'Group camping equipment (tents, kitchen, common gear) is provided by us. Personal clothing, shoes, and toiletries are your responsibility. Rental options are available for select personal items.',
  },
  {
    id: 'corp-good',
    category: 'corporate',
    question: 'Do you organise corporate and team treks?',
    answer:
      'Yes. We design offsites, team treks, and outbound programmes with custom itineraries, private departures, and logistics support. Share headcount, dates, and goals with our B2B team via the contact page.',
  },
  {
    id: 'corp-custom',
    category: 'corporate',
    question: 'Can itineraries be customised for groups?',
    answer:
      'Yes. For private groups and corporates we can adjust duration, difficulty, stay style, and add-ons (transport, certificates, branded kits). Minimum group size depends on the route and season.',
  },
  {
    id: 'yatra-plan',
    category: 'yatra',
    question: 'Do you organise Char Dham and Kedarnath yatras?',
    answer:
      'Yes. We assist with Kedarnath, Badrinath, Do Dham, Char Dham, Hemkund Sahib, and customised spiritual itineraries — including transport, stays, and local coordination suited to your group size and pace.',
  },
  {
    id: 'yatra-elderly',
    category: 'yatra',
    question: 'Are pilgrimage trips suitable for elderly travellers?',
    answer:
      'Many yatra plans can be paced for senior travellers with comfortable stays and optional helicopter/pony segments where available. Share age profile and mobility needs when you enquire so we suggest a practical itinerary.',
  },
];

export function faqsByCategory(category: FaqCategoryId): FaqItem[] {
  if (category === 'all') return FAQ_ITEMS;
  return FAQ_ITEMS.filter((item) => item.category === category);
}
