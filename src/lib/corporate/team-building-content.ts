/**
 * Content for /corporate — Team Building Treks for Companies
 * Structure mirrors IndiaHikes corporate team-building page; brand + copy for Indian Treks.
 */

import { photos } from '@/lib/media';

export type CorporateReview = {
  id: string;
  name: string;
  role: string;
  short: string;
  full: string;
  avatar?: string;
  trekLink?: { label: string; href: string };
};

export const corporateBenefits = [
  'Get to know each other beyond work',
  'See each other in a brand new light',
  'Return with deeper empathy, understanding, and renewed appreciation for one another',
  'Have a fun and meaningful shared experience with colleagues',
  'Learn to collaborate instead of compete — which can increase productivity',
  'Reconnect mindfully with nature and everyone’s part in the larger web of life',
];

export const corporateWhyBetter = [
  {
    title: 'A shared goal',
    body: 'A trek is nothing like playing games at a resort. Scaling a mountain is exhilarating yet challenging for mind and body — and everyone experiences it together. Vulnerability and empathy rise naturally.',
  },
  {
    title: 'More time to bond',
    body: 'The span of a multi-day trek makes it effective for team building. Extended time outdoors lets trust grow as you face joys and challenges side by side.',
  },
  {
    title: 'More room to interact',
    body: 'You meet people outside your usual clique and get to know colleagues who were only familiar by face or name before.',
  },
  {
    title: 'Nature is the ideal backdrop',
    body: 'People are themselves in the outdoors — dropping facades and no longer inhibited by formal structures.',
  },
  {
    title: 'Science confirms it',
    body: 'Research consistently shows that time in nature breaks socially constructed barriers and hierarchies.',
  },
  {
    title: 'Deeper, faster bonding',
    body: 'Being outdoors helps teams bond faster and deeper — something traditional offsites or Zoom meetings rarely achieve.',
  },
];

export const corporateReviews: CorporateReview[] = [
  {
    id: 'nao',
    name: 'Nao Ito',
    role: 'Operating Partner, BEENEXT',
    short:
      'The trek brought a far better understanding — far more than one can experience on a Zoom call. We saw each other’s culture, strengths, and weaknesses.',
    full: 'In the business world, we don’t share things with each other a lot. We don’t have a deeper understanding of each other’s strengths and weaknesses. This was the first time we had a shared experience in nature. And just after three hours on the trek, we were able to observe and “see” each other better. It brought a far better understanding — far more than one can experience on a Zoom call! We saw glimpses of each other’s culture, strengths, and weaknesses. The end result was more team bonding.',
  },
  {
    id: 'shivaram',
    name: 'Shivaram',
    role: 'Team Manager, Palo Alto Networks',
    short:
      'Coming out into nature, out of your comfort zone, and being vulnerable is a better way to hone collaboration within teams.',
    full: 'Most corporate companies conduct team building by taking teams to offsites, restaurants, or resorts. But I feel coming out into nature, out of your comfort zone, and being vulnerable in such a setting is a better way to hone collaboration within teams. The mountains strip away titles and create real conversations.',
  },
  {
    id: 'ankur',
    name: 'Ankur Warikoo',
    role: 'Entrepreneur and Content Creator',
    short:
      'There are hundreds of lessons from a trek that you can pick up and apply in business and real life.',
    full: 'I have a team of 14 people and we are completely remote, spread across the country. Every few months we meet for an off-site. This time everyone voted for a trek. It is unpredictable — you cannot plan everything. You adjust, realign, and stay agile. One step at a time. There are hundreds of lessons from a trek that you can pick up and apply in business and real life. Thank you for all that you do.',
  },
  {
    id: 'aditya',
    name: 'Aditya Rao',
    role: 'Director, Supreem Pharmaceuticals',
    short:
      'Each activity highlighted the strengths and weaknesses of the teams. It gave a clear indication of the areas we need to work on.',
    full: 'My aim for this trek was to get my team together by rising above small conflicts and understanding each other better. Each activity conducted on the trek highlighted the strengths and weaknesses of the teams. It gave a clear indication of the areas we need to work on. We are very happy with how the trek has impacted our team.',
  },
  {
    id: 'priya',
    name: 'Priya Mehta',
    role: 'HR Lead, Product Company',
    short:
      'Our 45-member team came back more connected and motivated than ever. Logistics were seamless and leaders were outstanding.',
    full: 'Indian Treks organised an incredible team-building trek for our 45-member team. From seamless logistics to expert guides, everything was perfect. Our team came back more connected and motivated than ever. This is now our preferred format for annual offsites.',
  },
  {
    id: 'rahul',
    name: 'Rahul Kapoor',
    role: 'Engineering Manager',
    short:
      'Truly helped us get close to each other without the usual filters of a workplace. Already planning the next trek.',
    full: 'Many thanks for everything! This trek was everything I had hoped for and more. Truly helped us get close to each other without the usual filters of a workplace. My admiration for the organisation has gone up another notch. I’m already planning my next trek with the team.',
  },
];

export const corporateDifficulties = [
  'Teams don’t have the time or space to understand each other’s strengths, motivations, and pressures',
  'The inability to strike the right balance between competition and collaboration hampers synergy and productivity',
  'Leadership is often misconstrued as having power over others instead of empowering others',
  'The purpose, timing, and content of traditional team building programmes don’t always align with specific team needs',
];

export const corporateProgrammes = [
  {
    id: 'day-hike',
    title: 'Day hikes',
    blurb: 'An adventurous day of trekking with colleagues to a scenic summit.',
    duration: '1 Day',
    location: 'Near major cities / foothills',
    overview:
      'A day hike that’s the perfect blend of adventure and fun. The outdoors provide the ideal setting for teams to get to know each other better and embark on a meaningful, shared experience — hiking to a summit together.',
    image: photos.triund,
  },
  {
    id: 'overnight',
    title: 'Overnight camping',
    blurb:
      'Disconnect from boardrooms and screens for a night. Trek together, camp under open skies, and reconnect with your team.',
    duration: '2 Days',
    location: 'Himachal / Uttarakhand foothills',
    overview:
      'Teams trek to a stunning viewpoint, spend a night in tents, and immerse themselves outdoors. Sharing sessions and trail activities bring people together like never before — with clear insights into each other’s strengths and working styles.',
    image: photos.chopta,
  },
  {
    id: 'leadership',
    title: 'Collaborative Leadership Programme',
    blurb: 'A challenging leadership programme against the backdrop of a Himalayan trek.',
    duration: '2–4 Days',
    location: 'Uttarakhand',
    overview:
      'Under our guidance, participants plan and execute their own Himalayan trek — from strategy and planning to campsite setup and cooking. The goal is to summit together while tackling specially designed challenges. The mission succeeds only when everyone summits. This programme reshapes notions of leadership, collaboration, teamwork, and success.',
    image: photos.kedarkantha,
  },
];

export const corporateArticles = [
  {
    title: 'How a Himalayan adventure tested and deepened team bonds',
    href: '/blog',
    image: photos.hampta,
    read: '6 min read',
  },
  {
    title: 'Why we prefer focused groups over 300-person offsites',
    href: '/blog',
    image: photos.uttarakhand,
    read: '5 min read',
  },
  {
    title: '4 reasons trekking beats a regular corporate outing',
    href: '/blog',
    image: photos.vof,
    read: '7 min read',
  },
  {
    title: 'Why short treks can make a big difference to team synergy',
    href: '/how-to-prepare',
    image: photos.triund,
    read: '5 min read',
  },
];

export const corporateGallery = [
  { src: photos.hampta, alt: 'Corporate team trekking on a Himalayan ridge' },
  { src: photos.kedarkantha, alt: 'Team celebrating a shared summit moment' },
  { src: photos.chopta, alt: 'Colleagues walking through open meadows' },
  { src: photos.triund, alt: 'Overnight camping under mountain skies' },
];

export const corporateHeroImage = photos.hampta;

export const corporateHero = {
  badge: 'Learning programmes',
  titleMain: 'Team Building Treks for',
  titleAccent: 'Companies',
  lead:
    'Elevating team bonding and collaboration through adventure, challenges and unforgettable experiences.',
  trustLine: 'Trusted by 50+ companies across India',
  avatars: [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
  ],
  tagline: 'Stronger Teams, Stronger Summits',
  panel: [
    { title: 'Stronger Bonds', sub: 'Build trust and deeper connections' },
    { title: 'Real Challenges', sub: 'Step out, challenge limits together' },
    { title: 'Safe & Supported', sub: 'Expert guides and end-to-end support' },
    { title: 'Lasting Impact', sub: 'Experiences that inspire and unite' },
  ],
  stats: [
    { value: '50+ Corporate Groups', sub: 'Trekked With Us' },
    { value: '4.9/5 Average Rating', sub: 'By Companies' },
    { value: '20+ Curated Treks', sub: 'Across Himalayas' },
    { value: '100% Customisable', sub: 'Experiences' },
  ],
  features: [
    { title: 'Flexible Itineraries', sub: 'Tailored to your goals' },
    { title: 'All Group Sizes', sub: 'Small teams to large groups' },
    { title: 'Expert Guidance', sub: 'Experienced & certified team' },
    { title: 'Responsible Travel', sub: 'Sustainable & eco-friendly' },
  ],
} as const;

/**
 * Client logos — leave `logo` empty for a placeholder slot; drop image URLs later.
 */
export const corporateBrands: { id: string; name: string; logo?: string }[] = [
  { id: 'brand-1', name: 'Brand partner' },
  { id: 'brand-2', name: 'Brand partner' },
  { id: 'brand-3', name: 'Brand partner' },
  { id: 'brand-4', name: 'Brand partner' },
  { id: 'brand-5', name: 'Brand partner' },
  { id: 'brand-6', name: 'Brand partner' },
  { id: 'brand-7', name: 'Brand partner' },
  { id: 'brand-8', name: 'Brand partner' },
];

/**
 * Corporate-proven UK + HP routes — shortlisted for group logistics,
 * scenic reward, and workable durations for company offsites.
 */
export const CORPORATE_TREK_IDS = [
  'nag-tibba', // UK
  'chopta-tungnath', // UK
  'dayara-bugyal', // UK
  'kedarkantha', // UK
  'kuari-pass', // UK
  'valley-of-flowers', // UK
  'kheerganga', // HP
  'mcleodganj-trek', // HP
  'bhrigu-lake', // HP
  'hampta-pass', // HP
] as const;
