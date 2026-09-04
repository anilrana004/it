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
