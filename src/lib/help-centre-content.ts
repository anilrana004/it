import { CONTACT } from '@/lib/contact';

export type HelpCentreTopic = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  group: 'explore' | 'policies' | 'support';
};

export const HELP_CENTRE_TOPICS: HelpCentreTopic[] = [
  {
    id: 'faqs',
    title: 'FAQs',
    description: 'Booking, gear, safety, yatra logistics, and trek-day questions.',
    href: '/faqs',
    icon: 'fa-circle-question',
    group: 'explore',
  },
  {
    id: 'safety',
    title: 'Safety',
    description: 'How we plan routes, acclimatise groups, and handle emergencies.',
    href: '/safety',
    icon: 'fa-shield-halved',
    group: 'explore',
  },
  {
    id: 'reviews',
    title: 'Reviews',
    description: 'What trekkers and yatra pilgrims say about Indian Treks.',
    href: '/reviews',
    icon: 'fa-star',
    group: 'explore',
  },
  {
    id: 'blogs',
    title: 'Blogs',
    description: 'Trek guides, travel stories, and Himalayan inspiration.',
    href: '/blog',
    icon: 'fa-newspaper',
    group: 'explore',
  },
  {
    id: 'news',
    title: 'News',
    description: 'Trail updates, seasonal openings, and company announcements.',
    href: '/news',
    icon: 'fa-bullhorn',
    group: 'explore',
  },
  {
    id: 'affiliates',
    title: 'Affiliates',
    description: 'Partner with us — creators, colleges, and travel communities.',
    href: '/affiliates',
    icon: 'fa-handshake',
    group: 'explore',
  },
  {
    id: 'about',
    title: 'About Us',
    description: 'Our story, team, certifications, and why travellers trust us.',
    href: '/about',
    icon: 'fa-mountain',
    group: 'explore',
  },
  {
    id: 'contact',
    title: 'Contact Us',
    description: 'Speak with our team for bookings, corporate trips, or custom plans.',
    href: '/contact',
    icon: 'fa-headset',
    group: 'support',
  },
  {
    id: 'payment',
    title: 'Payment Policy',
    description: 'Deposits, balance dues, accepted methods, and secure transactions.',
    href: '/payment-policy',
    icon: 'fa-credit-card',
    group: 'policies',
  },
  {
    id: 'cancellation',
    title: 'Cancellation & Refund',
    description: 'Refund windows, transfer rules, and force-majeure handling.',
    href: '/cancellation-policy',
    icon: 'fa-rotate-left',
    group: 'policies',
  },
  {
    id: 'fraud',
    title: 'Beware of Fraudulent Activities',
    description: 'Spot fake websites, unofficial payments, and scam commission offers.',
    href: '/beware-of-fraudulent-activities',
    icon: 'fa-triangle-exclamation',
    group: 'policies',
  },
];

export const HELP_CENTRE_GROUPS: {
  id: HelpCentreTopic['group'];
  label: string;
}[] = [
  { id: 'explore', label: 'Explore' },
  { id: 'support', label: 'Get help' },
  { id: 'policies', label: 'Policies' },
];

export type PolicySection = {
  title: string;
  body?: string;
  bullets?: string[];
};

export const PAYMENT_POLICY_SECTIONS: PolicySection[] = [
  {
    title: 'Booking confirmation',
    body:
      'Your seat is confirmed only after the required advance payment is received. The deposit amount varies by trek, yatra, or package. Balance payment must be cleared before departure or as per reporting instructions shared by our team.',
  },
  {
    title: 'Payment options',
    bullets: [
      'Full payment — pay the entire amount upfront for a hassle-free experience.',
      'Partial payment (50%) — pay half now and the remaining 50% before the trek start date.',
      'Advance deposit — block your seat with the minimum deposit and pay the balance later.',
    ],
  },
  {
    title: 'Accepted payment methods',
    bullets: [
      'UPI (Google Pay, PhonePe, Paytm, and other UPI apps)',
      'Credit and debit cards',
      'Net banking',
      'Direct bank transfer (NEFT / IMPS / RTGS)',
    ],
  },
  {
    title: 'Balance & reporting',
    body:
      'Final balance must be paid before the reporting date shared in your confirmation email and WhatsApp message. Failure to clear dues may result in cancellation of the booking without refund of the deposit.',
  },
  {
    title: 'GST & invoices',
    body:
      'Tax invoices are issued for all confirmed bookings. Share your billing details at the time of payment if you need a company invoice.',
  },
  {
    title: 'Secure transactions',
    body:
      'All online transactions are processed through secure payment gateways. Indian Treks does not store your card or banking credentials on our servers.',
  },
  {
    title: 'Need payment help?',
    body: `Email ${CONTACT.email} or call ${CONTACT.phoneDisplay} (${CONTACT.hours}). Our team can guide you on instalments, corporate billing, or gift-card redemptions.`,
  },
];

export const CANCELLATION_POLICY_ROWS: [string, string][] = [
  [
    'More than 30 days before departure',
    'Full refund minus minimal processing charges. Alternatively, transfer to another batch once without extra cost (subject to availability).',
  ],
  [
    '15 to 30 days before departure',
    '50% refund of the paid amount. Remaining balance may be transferred to a future batch if approved by operations.',
  ],
  [
    '7 to 14 days before departure',
    'Higher cancellation charge applies — transport, permits, and staffing are usually already blocked. Partial refund or transfer evaluated case by case.',
  ],
  [
    'Less than 7 days before departure',
    'Generally non-refundable due to final operational commitments. Date transfer may be considered only if seats remain and ops approves.',
  ],
  [
    'No show / missed reporting',
    'No refund when a participant misses reporting without prior written coordination with our team.',
  ],
  [
    'Force majeure & weather',
    'Road closures, landslides, or government restrictions may lead to itinerary changes, postponement, or credit toward a future batch instead of cash refund.',
  ],
];

export const CANCELLATION_POLICY_SECTIONS: PolicySection[] = [
  {
    title: 'How to cancel',
    body: `Email ${CONTACT.email} or WhatsApp ${CONTACT.phoneDisplay} with your booking ID, participant name, and reason for cancellation. Our team confirms the cancellation and shares the applicable refund or transfer timeline.`,
  },
  {
    title: 'Refund processing',
    bullets: [
      'Approved refunds are credited to the original payment source within 7–10 working days.',
      'Bank transfers may take an additional 2–3 working days depending on your bank.',
      'Processing fees or gateway charges deducted at booking may not be refundable.',
    ],
  },
  {
    title: 'Date transfer',
    body:
      'One complimentary date transfer is usually allowed for cancellations made 30+ days before departure, subject to seat availability on the new batch. Additional transfers may attract a service charge.',
  },
  {
    title: 'Group & corporate bookings',
    body:
      'Customised group, corporate, and college departures may have separate cancellation clauses outlined in the proposal or agreement shared at confirmation.',
  },
];
