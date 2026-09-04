import { photos } from '@/lib/media';
import { treks, trekDetailPath } from '@/lib/data';
import { SPECIAL_PROGRAMS } from '@/lib/special-programs-content';

/** Experience kinds shown as separate review lanes on /reviews. */
export type ExperienceKind = 'trek' | 'yatra' | 'trip' | 'corporate' | 'special' | 'learning';

export type ExperienceOption = {
  id: string;
  label: string;
  href: string;
  kind: ExperienceKind;
};

export type ExperienceReview = {
  id: string;
  name: string;
  avatar: string;
  reviewedAt: string;
  rating: number;
  kind: ExperienceKind;
  experienceId: string;
  experienceName: string;
  experienceHref: string;
  text: string;
  photos: string[];
  /** Client-submitted reviews pending team moderation */
  pending?: boolean;
};

export const EXPERIENCE_KIND_TABS: {
  id: ExperienceKind;
  label: string;
  icon: string;
  blurb: string;
}[] = [
  { id: 'trek', label: 'Treks', icon: 'fa-person-hiking', blurb: 'Summit days, camps & Himalayan trails' },
  { id: 'yatra', label: 'Yatras', icon: 'fa-om', blurb: 'Pilgrimage journeys with end-to-end care' },
  { id: 'trip', label: 'Trips', icon: 'fa-suitcase', blurb: 'Backpacking, weekends & group tours' },
  { id: 'corporate', label: 'Corporate', icon: 'fa-building', blurb: 'Team outs, schools & campus partners' },
  { id: 'special', label: 'Special', icon: 'fa-star', blurb: 'Women-only, seniors, families & beginners' },
  { id: 'learning', label: 'Learning', icon: 'fa-book-open', blurb: 'Prep guides, fitness & altitude know-how' },
];

const HUB_OPTIONS: ExperienceOption[] = [
  { id: 'trip-backpacking', label: 'Himalayan Backpacking', href: '/backpacking', kind: 'trip' },
  { id: 'trip-weekend', label: 'Weekend Trips', href: '/weekend-trips', kind: 'trip' },
  { id: 'trip-domestic', label: 'Domestic Tours', href: '/domestic-tours', kind: 'trip' },
  { id: 'trip-international', label: 'International Getaways', href: '/international-getaways', kind: 'trip' },
  { id: 'trip-biking', label: 'Himalayan Biking', href: '/biking', kind: 'trip' },
  { id: 'trip-group', label: 'Group Trips', href: '/group-trips', kind: 'trip' },

  { id: 'corp-team', label: 'Corporate Team Building', href: '/corporate', kind: 'corporate' },
  { id: 'corp-school', label: 'School Outdoor Programs', href: '/school-programs', kind: 'corporate' },
  { id: 'corp-campus', label: 'Campus Ambassador', href: '/campus-ambassador', kind: 'corporate' },
  { id: 'corp-gifts', label: 'Travel Gift Cards', href: '/travel-gift-cards', kind: 'corporate' },

  { id: 'learn-prep', label: 'Trek Preparation Hub', href: '/trek-preparation', kind: 'learning' },
  { id: 'learn-how', label: 'How to Prepare for a Trek', href: '/how-to-prepare', kind: 'learning' },
  { id: 'learn-fitness', label: 'Fitness Training Plan', href: '/fitness-training-plan', kind: 'learning' },
  { id: 'learn-altitude', label: 'Altitude Sickness Guide', href: '/altitude-sickness-guide', kind: 'learning' },
];

function trekOptions(): ExperienceOption[] {
  return treks
    .filter((t) => t.type === 'trek')
    .slice(0, 40)
    .map((t) => ({
      id: t.id,
      label: t.title,
      href: trekDetailPath(t),
      kind: 'trek' as const,
    }));
}

function yatraOptions(): ExperienceOption[] {
  return treks
    .filter((t) => t.type === 'yatra')
    .map((t) => ({
      id: t.id,
      label: t.title,
      href: trekDetailPath(t),
      kind: 'yatra' as const,
    }));
}

function specialOptions(): ExperienceOption[] {
  return SPECIAL_PROGRAMS.map((p) => ({
    id: p.id,
    label: p.title,
    href: p.href,
    kind: 'special' as const,
  }));
}

/** Catalog for the post-review picker (filtered by kind). */
export function experienceOptionsForKind(kind: ExperienceKind): ExperienceOption[] {
  switch (kind) {
    case 'trek':
      return trekOptions();
    case 'yatra':
      return yatraOptions();
    case 'special':
      return specialOptions();
    case 'trip':
      return HUB_OPTIONS.filter((o) => o.kind === 'trip');
    case 'corporate':
      return HUB_OPTIONS.filter((o) => o.kind === 'corporate');
    case 'learning':
      return HUB_OPTIONS.filter((o) => o.kind === 'learning');
    default:
      return [];
  }
}

export function findExperienceOption(kind: ExperienceKind, id: string): ExperienceOption | undefined {
  return experienceOptionsForKind(kind).find((o) => o.id === id);
}

export const EXPERIENCE_REVIEWS_SECTION = {
  kicker: 'By experience',
  title: 'Reviews for every kind of journey',
  intro:
    'Browse verified feedback by trek, yatra, trip, corporate outing, special program, or learning guide — then open that experience and try it yourself.',
  ctaLabel: 'Try yourself',
  formTitle: 'Share your experience',
  formIntro:
    'Travelled with us? Post your review with your photo, trip photos, and the trek / yatra / trip you did. Our team moderates new posts before they go fully public.',
  formSuccess: 'Thanks — your review is live on this device and sent to our team for moderation.',
} as const;

export const EXPERIENCE_REVIEWS: ExperienceReview[] = [
  {
    id: 'ex-trek-priya',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop',
    reviewedAt: '07 Jun 2026',
    rating: 5,
    kind: 'trek',
    experienceId: 'kedarkantha',
    experienceName: 'Kedarkantha Winter Trek',
    experienceHref: '/treks/kedarkantha',
    text:
      'First winter trek and it exceeded every expectation. Warm camps, patient leaders, and a summit sunrise we will never forget. Indian Treks handled Dehradun pickup and gear rental without chaos.',
    photos: [photos.kedarkantha, photos.snow, photos.himachal],
  },
  {
    id: 'ex-trek-susmita',
    name: 'Susmita Mukherjee',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop',
    reviewedAt: '07 Aug 2026',
    rating: 5,
    kind: 'trek',
    experienceId: 'hampta-pass',
    experienceName: 'Hampta Pass Crossover Trek',
    experienceHref: '/treks/hampta-pass',
    text:
      'Chandratal blues, Spiti-side landscapes, and safe river crossings. Photo stops were well timed and camp food was solid throughout.',
    photos: [photos.hampta, photos.himachal],
  },
  {
    id: 'ex-trek-neha',
    name: 'Neha Gupta',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop',
    reviewedAt: '03 Jun 2026',
    rating: 5,
    kind: 'trek',
    experienceId: 'valley-of-flowers',
    experienceName: 'Valley of Flowers Trek',
    experienceHref: '/treks/valley-of-flowers',
    text:
      'Monsoon blooms at peak — every turn felt like a painting. Guide knew every flower we pointed at. Beautifully organised from Govindghat pickup.',
    photos: [photos.vof, photos.chopta, photos.uttarakhand],
  },
  {
    id: 'ex-yatra-rahul',
    name: 'Rahul Verma',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop',
    reviewedAt: '04 Jun 2026',
    rating: 5,
    kind: 'yatra',
    experienceId: 'char-dham',
    experienceName: 'Char Dham Yatra',
    experienceHref: '/yatra/char-dham',
    text:
      'Pilgrimage first, tourism second. Clean stays, clear darshan windows, and caring staff for our parents on the Kedarnath trek portion.',
    photos: [photos.yatra, photos.kedarnath, photos.chopta],
  },
  {
    id: 'ex-yatra-priya',
    name: 'Priya Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
    reviewedAt: '06 Aug 2026',
    rating: 5,
    kind: 'yatra',
    experienceId: 'kedarnath-yatra',
    experienceName: 'Kedarnath Yatra',
    experienceHref: '/yatra/kedarnath-yatra',
    text:
      'Spiritual and well organised. Clean stays, clear briefings, and caring staff throughout. Our family felt supported on the trek to the temple.',
    photos: [photos.yatra, photos.kedarnath],
  },
  {
    id: 'ex-trip-kanchan',
    name: 'Kanchan Gautam',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop',
    reviewedAt: '12 Aug 2026',
    rating: 5,
    kind: 'trip',
    experienceId: 'trip-backpacking',
    experienceName: 'Ladakh Backpacking Circuit',
    experienceHref: '/backpacking',
    text:
      'Very well planned Ladakh circuit — permits, stays in Leh, and the Nubra day trip were seamless. Would book again for Spiti.',
    photos: [photos.himachal, photos.snow],
  },
  {
    id: 'ex-trip-sara',
    name: 'Sara Fernandes',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop',
    reviewedAt: '03 Aug 2026',
    rating: 5,
    kind: 'trip',
    experienceId: 'trip-backpacking',
    experienceName: 'All Girls Himachal Backpacking',
    experienceHref: '/backpacking',
    text:
      'Safe, social and beautifully paced. Kasol and Jibhi were highlights — already planning Meghalaya next.',
    photos: [photos.himachal, photos.backpackingHero, photos.triund],
  },
  {
    id: 'ex-corp-aditi',
    name: 'Aditi Malhotra',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop',
    reviewedAt: '18 Jul 2026',
    rating: 5,
    kind: 'corporate',
    experienceId: 'corp-team',
    experienceName: 'Corporate Team Building',
    experienceHref: '/corporate',
    text:
      'Turned our office offsite into a real mountain experience — not a tourist checklist. Safety briefings and facilitation were HR-grade professional.',
    photos: [photos.himachal, photos.chopta],
  },
  {
    id: 'ex-corp-nisha',
    name: 'Prof. Nisha Kapoor',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop',
    reviewedAt: '22 Jun 2026',
    rating: 5,
    kind: 'corporate',
    experienceId: 'corp-campus',
    experienceName: 'Campus Ambassador Partner',
    experienceHref: '/campus-ambassador',
    text:
      'Our outdoor club partnered for Nag Tibba. Student pricing was fair and safety briefings were thorough.',
    photos: [photos.chopta],
  },
  {
    id: 'ex-special-kavya',
    name: 'Kavya Reddy',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&h=120&fit=crop',
    reviewedAt: '11 Jul 2026',
    rating: 5,
    kind: 'special',
    experienceId: 'women-only',
    experienceName: 'Women-Only Treks',
    experienceHref: '/women-only-treks',
    text:
      'As a solo woman traveller I felt safe every day. Clear camp rules, vetted stays, and a leader who actually listened.',
    photos: [photos.womenTrek, photos.kedarkantha],
  },
  {
    id: 'ex-special-ramesh',
    name: 'Ramesh Iyer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop',
    reviewedAt: '02 Jul 2026',
    rating: 5,
    kind: 'special',
    experienceId: 'senior-citizen',
    experienceName: 'Senior Citizen Treks',
    experienceHref: '/senior-citizen-treks',
    text:
      'Chopta–Tungnath at our pace. Leaders never rushed us and the itinerary respected rest days. Perfect for 60+ first-timers.',
    photos: [photos.chopta, photos.uttarakhand],
  },
  {
    id: 'ex-learn-arjun',
    name: 'Arjun Mehta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop',
    reviewedAt: '28 Jun 2026',
    rating: 5,
    kind: 'learning',
    experienceId: 'learn-fitness',
    experienceName: 'Fitness Training Plan',
    experienceHref: '/fitness-training-plan',
    text:
      'Followed the 6-week plan before Kedarkantha. Summit day felt manageable — the stair and cardio blocks actually work.',
    photos: [photos.kedarkantha],
  },
  {
    id: 'ex-learn-meera',
    name: 'Meera Joshi',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop',
    reviewedAt: '15 Jun 2026',
    rating: 5,
    kind: 'learning',
    experienceId: 'learn-altitude',
    experienceName: 'Altitude Sickness Guide',
    experienceHref: '/altitude-sickness-guide',
    text:
      'Clear, practical advice on AMS — what to watch for and when to descend. Helped our group stay calm on Hampta.',
    photos: [photos.hampta, photos.snow],
  },
];

export const CLIENT_REVIEWS_STORAGE_KEY = 'it_experience_reviews_v1';
