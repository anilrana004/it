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
    id: 'affiliates',
    title: 'Affiliates',
    description: 'Partner with IndianTreks — B2B agents, campus ambassadors, corporate groups, and referral programmes.',
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
    description: 'Trek vouchers, refund windows, date changes, free trek policy, and force majeure handling.',
    href: '/cancellation-policy',
    icon: 'fa-rotate-left',
    group: 'policies',
  },
  {
    id: 'terms',
    title: 'Terms & Conditions',
    description: 'Booking agreement, cancellation vouchers, safety, liability, and legal terms.',
    href: '/terms',
    icon: 'fa-file-contract',
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
