import { Award, Calendar, Heart, Shield, Users } from 'lucide-react';

/** Lucide icons referenced by homepage content via stable string keys. */
export const HERO_COLLAB_LUCIDE_ICONS = {
  heart: Heart,
  users: Users,
  award: Award,
  shield: Shield,
  calendar: Calendar,
} as const;

export type HeroCollabIconKey = keyof typeof HERO_COLLAB_LUCIDE_ICONS;
