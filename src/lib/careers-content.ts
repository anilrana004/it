/** Careers page — structure mirrored from Thrillophilia careers, copy adapted for Indian Treks */

export type CareerTeam =
  | 'all'
  | 'sales'
  | 'marketing'
  | 'engineering'
  | 'operations'
  | 'others';

export type CareerOpening = {
  id: string;
  title: string;
  team: Exclude<CareerTeam, 'all'>;
  location: string;
  type: string;
};

export const CAREER_TEAMS: { id: CareerTeam; label: string }[] = [
  { id: 'all', label: 'All Teams' },
  { id: 'sales', label: 'Sales & BD' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'operations', label: 'Operations' },
  { id: 'others', label: 'Others' },
];

export const CAREER_HERO = {
  kicker: 'Careers',
  titleLine1: 'Make Indian Treks',
  titleLine2: [
    { text: 'your ', style: 'script' as const },
    { text: 'next ', style: 'serif' as const },
    { text: 'destination', style: 'script' as const },
  ],
  subtitle: 'We believe in a career that is just as adventurous as the treks we lead.',
  cta: 'Take me places',
  image:
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&h=1080&fit=crop',
} as const;

export const CAREER_HERO_FEATURES = [
  {
    icon: 'fa-compass',
    title: 'Purposeful Work',
    sub: 'Be part of journeys that create impact.',
  },
  {
    icon: 'fa-mountain',
    title: 'Growth & Learning',
    sub: 'Learn, explore and grow every single day.',
  },
  {
    icon: 'fa-people-group',
    title: 'Passionate Team',
    sub: 'Work with explorers who inspire you.',
  },
  {
    icon: 'fa-heart-pulse',
    title: 'Life of Adventure',
    sub: 'Experience the thrill, not just talk about it.',
  },
  {
    icon: 'fa-leaf',
    title: 'Make a Difference',
    sub: 'Help people discover the India you love.',
  },
] as const;

export const CAREER_PHILOSOPHY = {
  title: 'The career map is in your hands',
  body:
    'Our work philosophy is simple. We want to grow, and we want you to grow. And to make that happen, we encourage you to explore your journey your own way while we provide the right leadership, resources, and opportunities to you. In the end, all of us work together to bring the same joy to the table—that of helping people explore the Himalayas through memorable treks, sacred yatras, and wholesome travel experiences.',
  cta: 'Explore roles',
  image:
    'https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&h=700&fit=crop',
} as const;

export const CAREER_MISSION = {
  eyebrow: "We're on a mission of",
  title: 'Changing the way India experiences the mountains',
  paragraphs: [
    'Indian Treks started in 2016 with an intention that continues to inspire us years later. We want to help travellers trek farther, safer, and better across Uttarakhand, Himachal, Ladakh, and beyond. Every day, we strive to bring new routes and departures to our community and work towards making each journey with us memorable.',
    "As we continue to grow, we are eager to expand our family with adventurers who are keen on taking up new challenges head-on. If you're one such braveheart who wishes to learn, explore, and grow with us, come join us!",
  ],
  image:
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&h=700&fit=crop',
} as const;

export const CAREER_VALUES = {
  eyebrow: 'At heart,',
  title: "We're the Adventure People",
  intro:
    'We work hard, we play hard, and in whatever we do, we give it our all. Three values drive us to do more and be more.',
  items: [
    {
      title: 'Passion for adventure',
      body: 'A love for the mountains drives us to expand horizons for our team and our trekking community alike.',
    },
    {
      title: 'Integrity',
      body: 'A guiding light for our relationships at work, with trekkers, partners, and everyone in between.',
    },
    {
      title: 'Exceed expectations',
      body: 'We give our all to succeed the expectations of our travellers and adventure seekers on every trail.',
    },
  ],
} as const;

export const CAREER_OPENINGS: CareerOpening[] = [
  { id: 'sbd-associate', title: 'Sales and Business Development Associate', team: 'sales', location: 'Dehradun', type: 'Full Time' },
  { id: 'content-marketing', title: 'Content Marketing Specialist', team: 'marketing', location: 'Dehradun', type: 'Full Time' },
  { id: 'content-writer', title: 'Content Writer', team: 'marketing', location: 'Dehradun', type: 'Full Time' },
  { id: 'full-stack', title: 'Full Stack Developer', team: 'engineering', location: 'Dehradun', type: 'Full Time' },
  { id: 'team-lead-sbd', title: 'Team Lead Sales & BD', team: 'sales', location: 'Dehradun', type: 'Full Time' },
  { id: 'head-cx', title: 'Head of Customer Experiences', team: 'operations', location: 'Dehradun', type: 'Full Time' },
  { id: 'social-media', title: 'Social Media Specialist', team: 'marketing', location: 'Dehradun', type: 'Full Time' },
  { id: 'hr-manager', title: 'HR Executive / Manager', team: 'others', location: 'Dehradun', type: 'Full Time' },
  { id: 'creative-designer', title: 'Creative Designer', team: 'marketing', location: 'Dehradun', type: 'Full Time' },
  { id: 'seo-specialist', title: 'SEO Specialist', team: 'marketing', location: 'Dehradun', type: 'Full Time' },
  { id: 'qa-tester', title: 'Quality Analyst Tester', team: 'engineering', location: 'Dehradun', type: 'Full Time' },
  { id: 'digital-marketing', title: 'Digital Marketing Manager', team: 'marketing', location: 'Dehradun', type: 'Full Time' },
  { id: 'customer-delight', title: 'Customer Delight Associate', team: 'operations', location: 'Dehradun', type: 'Full Time' },
  { id: 'video-editor', title: 'Video Editor', team: 'marketing', location: 'Dehradun', type: 'Full Time' },
  { id: 'bd-associate', title: 'Business Development Associate', team: 'sales', location: 'Dehradun', type: 'Full Time' },
  { id: 'partnerships', title: 'Manager — Strategic Partnerships', team: 'sales', location: 'Dehradun', type: 'Full Time' },
  { id: 'ops-exec', title: 'Operations Executive', team: 'operations', location: 'Dehradun', type: 'Full Time' },
  { id: 'trek-lead', title: 'Freelance Trip Lead', team: 'operations', location: 'Uttarakhand & Himachal', type: 'Freelance' },
  { id: 'sourcing', title: 'Sourcing and Procurement Manager', team: 'operations', location: 'Dehradun', type: 'Full Time' },
  { id: 'talent-culture', title: 'Talent & Culture Manager', team: 'others', location: 'Dehradun', type: 'Full Time' },
];

export const CAREER_ROLES_SECTION = {
  eyebrow: 'Excited to take the joyride?',
  title: "We're always searching for amazing people to join our team.",
  subtitle: 'Take a look at our current opening roles',
} as const;

export const CAREER_BLOG_SECTION = {
  kicker: 'Blogs',
  title: 'Our blogs',
} as const;

export function careerApplyMailto(jobTitle: string) {
  const subject = encodeURIComponent(`Application — ${jobTitle} | Indian Treks`);
  const body = encodeURIComponent(
    `Hi Indian Treks team,\n\nI would like to apply for the role: ${jobTitle}\n\nName:\nPhone:\nLinkedIn / Portfolio:\n\nBrief note:\n`,
  );
  return `mailto:info@indiantreks.in?subject=${subject}&body=${body}`;
}
