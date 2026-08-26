import type { LucideIcon } from 'lucide-react';
import {
  Backpack,
  Bike,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  Dumbbell,
  Gift,
  Globe2,
  GraduationCap,
  Heart,
  HelpCircle,
  Map,
  MapPin,
  Megaphone,
  Mountain,
  School,
  Sparkles,
  Star,
  SunMedium,
  Users,
  UserRound,
} from 'lucide-react';
import { TRENDING_NAV_ITEMS } from '@/lib/trending-nav';

export type RichNavItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  Icon: LucideIcon;
  iconTile: string;
  iconColor: string;
  live?: boolean;
};

export const GROUP_TRIPS_RICH: RichNavItem[] = [
  {
    id: 'backpacking',
    title: 'Backpacking Trips',
    subtitle: 'Flexible social circuits',
    href: '/backpacking',
    Icon: Backpack,
    iconTile: 'border-emerald-200 bg-emerald-50',
    iconColor: 'text-[#16a34a]',
  },
  {
    id: 'treks',
    title: 'Treks',
    subtitle: 'Himalayan fixed departures',
    href: '/treks',
    Icon: Mountain,
    iconTile: 'border-teal-200 bg-teal-50',
    iconColor: 'text-teal-700',
  },
  {
    id: 'biking',
    title: 'Biking Trips',
    subtitle: 'Ladakh, Spiti & mountain roads',
    href: '/biking',
    Icon: Bike,
    iconTile: 'border-orange-200 bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    id: 'weekend',
    title: 'Weekend Trips',
    subtitle: '2–3 day short escapes',
    href: '/weekend-trips',
    Icon: SunMedium,
    iconTile: 'border-amber-200 bg-amber-50',
    iconColor: 'text-amber-600',
  },
];

export const CUSTOMIZED_RICH: RichNavItem[] = [
  {
    id: 'domestic',
    title: 'Domestic Tours',
    subtitle: 'Custom India packages',
    href: '/domestic-tours',
    Icon: MapPin,
    iconTile: 'border-lime-200 bg-lime-50',
    iconColor: 'text-lime-700',
  },
  {
    id: 'international',
    title: 'International Getaways',
    subtitle: 'Nepal, EBC & beyond',
    href: '/international-getaways',
    Icon: Globe2,
    iconTile: 'border-indigo-200 bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
];

export const TRENDING_RICH: RichNavItem[] = TRENDING_NAV_ITEMS.map((item) => {
  const Icon =
    item.icon === 'star' ? Star : item.icon === 'calendar' ? Calendar : Megaphone;
  return {
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    href: item.href,
    Icon,
    iconTile: item.iconTile,
    iconColor: item.iconColor,
    live: item.live,
  };
});

export const YATRA_RICH: RichNavItem[] = [
  {
    id: 'all-yatra',
    title: 'All Sacred Yatras',
    subtitle: 'Browse every pilgrimage',
    href: '/yatra',
    Icon: Heart,
    iconTile: 'border-rose-200 bg-rose-50',
    iconColor: 'text-rose-600',
  },
  {
    id: 'char-dham',
    title: 'Char Dham Yatra',
    subtitle: 'Complete sacred circuit',
    href: '/yatra/char-dham',
    Icon: Map,
    iconTile: 'border-orange-200 bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    id: 'do-dham',
    title: 'Do Dham Yatra',
    subtitle: 'Kedarnath & Badrinath',
    href: '/yatra/do-dham',
    Icon: Mountain,
    iconTile: 'border-amber-200 bg-amber-50',
    iconColor: 'text-amber-700',
  },
  {
    id: 'kedarnath',
    title: 'Kedarnath Yatra',
    subtitle: 'Classic temple trek',
    href: '/yatra/kedarnath-yatra',
    Icon: Sparkles,
    iconTile: 'border-emerald-200 bg-emerald-50',
    iconColor: 'text-[#16a34a]',
  },
  {
    id: 'do-dham-chopta',
    title: 'Do Dham + Chopta Tungnath',
    subtitle: 'Pilgrimage with meadows',
    href: '/yatra/do-dham-chopta',
    Icon: SunMedium,
    iconTile: 'border-teal-200 bg-teal-50',
    iconColor: 'text-teal-700',
  },
  {
    id: 'kedarnath-chopta',
    title: 'Kedarnath + Chopta Tungnath',
    subtitle: 'Temple & Tungnath trail',
    href: '/yatra/kedarnath-chopta',
    Icon: Mountain,
    iconTile: 'border-sky-200 bg-sky-50',
    iconColor: 'text-sky-700',
  },
  {
    id: 'panch-kedar',
    title: 'Panch Kedar',
    subtitle: 'Five sacred Kedars',
    href: '/yatra/panch-kedar',
    Icon: Star,
    iconTile: 'border-violet-200 bg-violet-50',
    iconColor: 'text-violet-600',
  },
];

export const LEARNING_RICH: RichNavItem[] = [
  {
    id: 'corporate',
    title: 'Corporate Tours',
    subtitle: 'Team building in the Himalayas',
    href: '/corporate',
    Icon: Building2,
    iconTile: 'border-slate-200 bg-slate-50',
    iconColor: 'text-slate-700',
  },
  {
    id: 'campus',
    title: 'Campus Ambassador',
    subtitle: 'Student partnerships',
    href: '/campus-ambassador',
    Icon: GraduationCap,
    iconTile: 'border-blue-200 bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    id: 'schools',
    title: 'School Programs',
    subtitle: 'Educational outdoor trips',
    href: '/school-programs',
    Icon: School,
    iconTile: 'border-cyan-200 bg-cyan-50',
    iconColor: 'text-cyan-700',
  },
  {
    id: 'gifts',
    title: 'Travel Gift Cards',
    subtitle: 'Gift a Himalayan adventure',
    href: '/travel-gift-cards',
    Icon: Gift,
    iconTile: 'border-pink-200 bg-pink-50',
    iconColor: 'text-pink-600',
  },
];

export const SPECIAL_RICH: RichNavItem[] = [
  {
    id: 'family',
    title: 'Family Treks',
    subtitle: 'Trails for parents & kids',
    href: '/family-treks',
    Icon: Users,
    iconTile: 'border-amber-200 bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    id: 'beginner',
    title: 'Beginner-Friendly Treks',
    subtitle: 'First Himalayan trek',
    href: '/beginner-friendly-treks',
    Icon: Sparkles,
    iconTile: 'border-emerald-200 bg-emerald-50',
    iconColor: 'text-[#16a34a]',
  },
  {
    id: 'senior',
    title: 'Senior Citizen Treks',
    subtitle: 'Gentle paced journeys',
    href: '/senior-citizen-treks',
    Icon: UserRound,
    iconTile: 'border-sky-200 bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    id: 'women',
    title: 'Women-Only Treks',
    subtitle: 'All-girls batches',
    href: '/women-only-treks',
    Icon: Heart,
    iconTile: 'border-rose-200 bg-rose-50',
    iconColor: 'text-rose-600',
  },
];

export const MORE_RICH: RichNavItem[] = [
  {
    id: 'prepare',
    title: 'How to Prepare',
    subtitle: 'Packing & trek readiness',
    href: '/how-to-prepare',
    Icon: BookOpen,
    iconTile: 'border-emerald-200 bg-emerald-50',
    iconColor: 'text-[#16a34a]',
  },
  {
    id: 'fitness',
    title: 'Fitness Training Plan',
    subtitle: 'Get trail-ready',
    href: '/fitness-training-plan',
    Icon: Dumbbell,
    iconTile: 'border-orange-200 bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    id: 'altitude',
    title: 'Altitude Sickness Guide',
    subtitle: 'Stay safe up high',
    href: '/altitude-sickness-guide',
    Icon: Mountain,
    iconTile: 'border-sky-200 bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    id: 'careers',
    title: 'Careers With Us',
    subtitle: 'Join the Indian Treks team',
    href: '/careers',
    Icon: Briefcase,
    iconTile: 'border-violet-200 bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    id: 'help',
    title: 'Help Centre',
    subtitle: 'FAQs & support',
    href: '/help-centre',
    Icon: HelpCircle,
    iconTile: 'border-slate-200 bg-slate-50',
    iconColor: 'text-slate-600',
  },
];

/** Plain {l,h} for any code still expecting simple links */
export function richToPlain(items: RichNavItem[]) {
  return items.map((item) => ({ l: item.title, h: item.href }));
}
