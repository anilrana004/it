export type FeaturedVideo = {
  id: string;
  youtubeId: string;
  captionEn: string;
  captionHi: string;
  /** Lower-left pill — month or category */
  badge: string;
  /** Fallback wash behind thumbnail on side cards */
  gradient: string;
};

export const FEATURED_VIDEOS: FeaturedVideo[] = [
  {
    id: 'chopta',
    youtubeId: '1v8ThiFzp9U',
    badge: 'MAY',
    gradient: 'linear-gradient(160deg, #166534, #052e16)',
    captionEn: 'Base camp at Chopta, first light over Tungnath.',
    captionHi: 'चोपता बेस कैंप, तुंगनाथ की पहली किरण।',
  },
  {
    id: 'kedarkantha',
    youtubeId: '97J3LIF3VAI',
    badge: 'JUN',
    gradient: 'linear-gradient(160deg, #15803d, #052e16)',
    captionEn: 'Crossing the ridgeline — Kedarkantha day two.',
    captionHi: 'केदारकांठा — दूसरे दिन रिज पार करते हुए।',
  },
  {
    id: 'kuari-pass',
    youtubeId: 'rmuuxRaCSH0',
    badge: 'JUL',
    gradient: 'linear-gradient(160deg, #14532d, #052e16)',
    captionEn: 'Panoramic views across the Kuari Pass trail.',
    captionHi: 'कुआरी पास — हिमाल की चौहद्दी में।',
  },
  {
    id: 'flowers',
    youtubeId: 'qrMyYGaJA0s',
    badge: 'AUG',
    gradient: 'linear-gradient(160deg, #3f6212, #052e16)',
    captionEn: 'Monsoon greens on the Valley of Flowers trail.',
    captionHi: 'फूलों की घाटी — मानसून की हरियाली।',
  },
  {
    id: 'yatra',
    youtubeId: 'EuRs_GP29Lo',
    badge: 'SEP',
    gradient: 'linear-gradient(160deg, #4d7c0f, #052e16)',
    captionEn: 'Sacred yatra moments in the Garhwal Himalaya.',
    captionHi: 'गढ़वाल हिमालय में पवित्र यात्रा के पल।',
  },
  {
    id: 'nepal',
    youtubeId: '8efveLZ3E24',
    badge: 'OCT',
    gradient: 'linear-gradient(160deg, #166534, #052e16)',
    captionEn: 'High passes and teahouse trails in Nepal.',
    captionHi: 'नेपाल — पास और टी-हाउस रास्तों पर।',
  },
];

/** Signed offset from active index, wrapped for circular carousel */
export function carouselOffset(index: number, active: number, total: number): number {
  let delta = index - active;
  if (delta > total / 2) delta -= total;
  if (delta < -total / 2) delta += total;
  return delta;
}
