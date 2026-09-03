/** Shared story-review shape for carousel sections site-wide. */

export type StoryReview = {
  id: string;
  name: string;
  subtitle: string;
  short: string;
  full: string;
  avatar?: string;
  trekLink?: { label: string; href: string };
};

const AVATAR_POOL = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=160&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=160&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=160&q=80',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=160&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=160&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=160&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=160&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=160&q=80',
] as const;

const TREK_LINK_RULES: { pattern: RegExp; label: string; href: string }[] = [
  { pattern: /kedarkantha/i, label: 'Kedarkantha Trek', href: '/treks/kedarkantha' },
  { pattern: /hampta pass/i, label: 'Hampta Pass Trek', href: '/treks/hampta-pass' },
  { pattern: /valley of flowers/i, label: 'Valley of Flowers Trek', href: '/treks/valley-of-flowers' },
  { pattern: /chopta|tungnath/i, label: 'Chopta Tungnath Trek', href: '/treks/chopta-tungnath' },
  { pattern: /nag tibba/i, label: 'Nag Tibba Trek', href: '/treks/nag-tibba' },
  { pattern: /triund|mcleodganj/i, label: 'Triund Trek', href: '/treks/mcleodganj-trek' },
  { pattern: /kheerganga/i, label: 'Kheerganga Trek', href: '/treks/kheerganga' },
  { pattern: /kuari pass/i, label: 'Kuari Pass Trek', href: '/treks/kuari-pass' },
  { pattern: /dayara bugyal/i, label: 'Dayara Bugyal Trek', href: '/treks/dayara-bugyal' },
  { pattern: /everest base camp|ebc/i, label: 'Everest Base Camp', href: '/treks/everest-base-camp' },
  { pattern: /annapurna|abc/i, label: 'Annapurna Base Camp', href: '/treks/annapurna-base-camp' },
  { pattern: /roopkund/i, label: 'Roopkund Trek', href: '/treks/roopkund' },
  { pattern: /pangarchulla/i, label: 'Pangarchulla Trek', href: '/treks/pangarchulla' },
  { pattern: /har ki dun/i, label: 'Har Ki Dun Trek', href: '/treks/har-ki-dun' },
  { pattern: /kedarnath/i, label: 'Kedarnath Yatra', href: '/yatra/kedarnath-yatra' },
  { pattern: /char dham/i, label: 'Char Dham Yatra', href: '/yatra/char-dham' },
  { pattern: /spiti/i, label: 'Spiti Backpacking', href: '/backpacking' },
  { pattern: /meghalaya/i, label: 'Meghalaya Backpacking', href: '/backpacking' },
  { pattern: /himachal backpacking/i, label: 'Himachal Backpacking', href: '/backpacking' },
  { pattern: /uttarakhand backpacking/i, label: 'Uttarakhand Backpacking', href: '/backpacking' },
  { pattern: /backpacking/i, label: 'Backpacking Trips', href: '/backpacking' },
  { pattern: /ladakh|leh/i, label: 'Ladakh Biking', href: '/biking' },
  { pattern: /manali|spiti.*bik/i, label: 'Himalayan Biking', href: '/biking' },
  { pattern: /bali/i, label: 'International Getaways', href: '/international-getaways' },
  { pattern: /bhutan/i, label: 'International Getaways', href: '/international-getaways' },
  { pattern: /nepal/i, label: 'Nepal Treks', href: '/treks?region=nepal' },
  { pattern: /beginner/i, label: 'Beginner-Friendly Treks', href: '/beginner-friendly-treks' },
  { pattern: /senior/i, label: 'Senior Citizen Treks', href: '/senior-citizen-treks' },
  { pattern: /corporate|team/i, label: 'Corporate Team Building', href: '/corporate' },
  { pattern: /campus|ambassador/i, label: 'Campus Ambassador', href: '/campus-ambassador' },
];

function avatarFromId(id: string): string {
  const idx =
    id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % AVATAR_POOL.length;
  return AVATAR_POOL[idx];
}

export function inferTrekLink(
  text: string,
  explicit?: { label: string; href: string },
): { label: string; href: string } | undefined {
  if (explicit) return explicit;
  for (const rule of TREK_LINK_RULES) {
    if (rule.pattern.test(text)) return { label: rule.label, href: rule.href };
  }
  return undefined;
}

export function normalizeStoryReview(input: {
  id: string;
  name: string;
  subtitle: string;
  short: string;
  full: string;
  avatar?: string;
  trekLink?: { label: string; href: string };
}): StoryReview {
  const subtitle = input.subtitle;
  return {
    ...input,
    avatar: input.avatar ?? avatarFromId(input.id),
    trekLink: inferTrekLink(`${subtitle} ${input.short}`, input.trekLink),
  };
}

export function reviewInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
