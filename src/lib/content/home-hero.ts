import type { BannerItem } from '@/components/Banners';
import type { CategoryItem } from '@/components/home/CategoryScroller';
import { KEDARKANTHA_FEATURE } from '@/lib/content/treks/kedarkantha/gallery-content';
import { photos } from '@/lib/media';

export type HeroMobileBanner = {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
};

export type HeroDesktopSlide = {
  id: string;
  name: string;
  sub: string;
  img: string;
  featureImg: string;
  t: 'trek' | 'yatra';
  rating: string;
  duration: string;
  difficulty: string;
  altitude: string;
  distance: string;
  reviews: string;
  season: string;
  group: string;
};

export const HERO_MOB_BANNERS: HeroMobileBanner[] = [
  { image: photos.himachal, title: 'Himachal Adventures', subtitle: 'Hampta Pass – Triund – Bhrigu Lake & more', cta: 'Explore Himachal', href: '/treks?region=himachal' },
  { image: photos.uttarakhand, title: 'Uttarakhand Treks', subtitle: 'Chopta – Kedarkantha – Valley of Flowers & more', cta: 'Explore Treks', href: '/treks?region=uttarakhand' },
  { image: photos.yatra, title: 'Sacred Yatras', subtitle: 'Kedarnath – Do Dham – Char Dham – Panch Kedar', cta: 'Explore Yatras', href: '/yatra' },
  { image: photos.nepal, title: 'International Expeditions', subtitle: 'EBC – Annapurna – Nepal Backpacking Circuit', cta: 'Explore Global', href: '/treks?region=nepal' },
];

export const HERO_EXPLORE_PROMOS: BannerItem[] = [
  {
    src: photos.choptaSale,
    href: '/treks/chopta-tungnath',
    title: 'Chopta Tungnath Chandrashila',
    designed: true,
  },
  { src: photos.yatra, href: '/yatra', title: 'Sacred Yatras – Spiritual Himalaya', subtitle: 'Kedarnath · Do Dham · Char Dham · Panch Kedar – divine journeys', badge: 'Yatra', discount: 'Plan Your Yatra' },
  { src: photos.uttarakhand, href: '/treks?region=uttarakhand', title: 'Uttarakhand – Land of Gods & Treks', subtitle: '10 iconic Himalayan treks across Chopta, Kedarkantha & beyond', badge: 'Uttarakhand', discount: 'View All Treks' },
  { src: photos.himachal, href: '/treks?region=himachal', title: 'Himachal – Adventure Capital', subtitle: 'Hampta, Triund, Bhrigu Lake, Kheerganga & more', badge: 'Himachal', discount: 'Explore Himachal' },
];

export const HERO_CATEGORY_ITEMS: CategoryItem[] = [
  { n: 'Uttarakhand Treks', h: '/treks?region=uttarakhand', img: photos.uttarakhand },
  { n: 'Himachal Treks', h: '/treks?region=himachal', img: photos.himachal },
  { n: 'Char Dham Yatra', h: '/yatra/char-dham', img: photos.yatra },
  { n: 'Kedarnath Yatra', h: '/yatra/kedarnath-yatra', img: photos.kedarnath },
  { n: 'Everest Base Camp', h: '/treks/everest-base-camp', img: photos.ebc },
  { n: 'Nepal', h: '/treks?region=nepal', img: photos.nepal },
  { n: 'Chopta Tungnath', h: '/treks/chopta-tungnath', img: photos.chopta },
  { n: 'Hampta Pass', h: '/treks/hampta-pass', img: photos.hampta },
  { n: 'Triund Trek', h: '/treks/mcleodganj-trek', img: photos.triund },
  { n: 'Valley of Flowers', h: '/treks/valley-of-flowers', img: photos.vof },
];

export const HERO_DESK_SLIDES: HeroDesktopSlide[] = [
  { id: 'valley-of-flowers', name: 'Valley of Flowers Trek', sub: 'UNESCO Himalayan Paradise - Alpine meadows, rare flora & stunning snow-capped vistas', img: photos.vof, featureImg: photos.vof, t: 'trek', rating: '4.8', duration: '6D/5N', difficulty: 'Moderate', altitude: '14,107 ft', distance: '38 km', reviews: '8k+', season: 'Jul-Sep', group: '6-15' },
  { id: 'kedarkantha', name: 'Kedarkantha Trek', sub: 'Winter Wonderland - Snow-trailed summit with 360- Himalayan panoramas', img: photos.kedarkantha, featureImg: KEDARKANTHA_FEATURE, t: 'trek', rating: '4.9', duration: '5D/4N', difficulty: 'Easy-Moderate', altitude: '12,500 ft', distance: '22 km', reviews: '10k+', season: 'Dec-Apr', group: '6-15' },
  { id: 'kedarnath-yatra', name: 'Kedarnath Yatra', sub: 'Sacred Pilgrimage - One of the 12 Jyotirlingas in the Char Dham circuit', img: photos.yatra, featureImg: photos.yatra, t: 'yatra', rating: '4.8', duration: '6D/5N', difficulty: 'Moderate', altitude: '11,755 ft', distance: '16 km', reviews: '12k+', season: 'May-Oct', group: '10-30' },
  { id: 'everest-base-camp', name: 'Everest Base Camp Trek', sub: 'Ultimate Himalayan Dream - Trek to the foot of the world\'s highest peak', img: photos.ebc, featureImg: photos.ebc, t: 'trek', rating: '4.9', duration: '14D/13N', difficulty: 'Moderate', altitude: '17,598 ft', distance: '130 km', reviews: '20k+', season: 'Mar-May,Oct-Nov', group: '4-12' },
  { id: 'hampta-pass', name: 'Hampta Pass Trek', sub: 'Cross-over Adventure - Lush green Kullu meets barren Spiti valley', img: photos.hampta, featureImg: photos.himachal, t: 'trek', rating: '4.7', duration: '5D/4N', difficulty: 'Moderate', altitude: '14,100 ft', distance: '26 km', reviews: '8k+', season: 'Jun-Oct', group: '6-14' },
];

export const HERO_SEARCH_DESTINATIONS = ['Kedarkantha', 'Valley of Flowers', 'Everest Base Camp', 'Hampta Pass', 'Chopta Tungnath', 'Kedarnath', 'Triund', 'Annapurna'] as const;
