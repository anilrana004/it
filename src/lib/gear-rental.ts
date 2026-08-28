import { blogPosts, blogPath, getPostBySlug } from '@/lib/blog';

const u = (id: string, w = 900, h = 700) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export type GearCategory = 'all' | 'footwear' | 'warmth' | 'packs' | 'accessories';

export type GearItem = {
  id: string;
  name: string;
  tagline: string;
  category: Exclude<GearCategory, 'all'>;
  /** Flat rental for the full trek / yatra duration. */
  price: number;
  buyPrice: number;
  rentedLastMonth: number;
  sizes?: string[];
  img: string;
  /** Cash security deposit collected at base camp. */
  deposit: number;
};

export const GEAR_CATEGORIES: { id: GearCategory; label: string }[] = [
  { id: 'all', label: 'All gear' },
  { id: 'footwear', label: 'Footwear' },
  { id: 'warmth', label: 'Jackets & layers' },
  { id: 'packs', label: 'Packs' },
  { id: 'accessories', label: 'Trail extras' },
];

const SHOE_SIZES = ['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'];
const APPAREL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const GEAR_CATALOG: GearItem[] = [
  {
    id: 'trek-shoes',
    name: 'Trekking Shoes',
    tagline: 'Waterproof, strong grip, lightweight',
    category: 'footwear',
    price: 800,
    buyPrice: 5000,
    rentedLastMonth: 940,
    sizes: SHOE_SIZES,
    img: u('photo-1606107557195-0e29a4b5b4aa'),
    deposit: 2000,
  },
  {
    id: 'down-jacket',
    name: 'Down Jacket',
    tagline: 'Rated to −10°C, packs small',
    category: 'warmth',
    price: 500,
    buyPrice: 3500,
    rentedLastMonth: 560,
    sizes: APPAREL_SIZES,
    img: u('photo-1591047139829-d91aecb6caea'),
    deposit: 1500,
  },
  {
    id: 'rain-jacket',
    name: 'Rain Jacket',
    tagline: 'Windproof shell for monsoon & snow',
    category: 'warmth',
    price: 400,
    buyPrice: 1800,
    rentedLastMonth: 410,
    sizes: APPAREL_SIZES,
    img: u('photo-1611312449408-fcece27cdbb7'),
    deposit: 1000,
  },
  {
    id: 'rucksack',
    name: '55L Backpack',
    tagline: 'Rain cover included, trail-ready',
    category: 'packs',
    price: 700,
    buyPrice: 4500,
    rentedLastMonth: 370,
    sizes: ['50–55L'],
    img: u('photo-1553062407-98eeb64c6a62'),
    deposit: 2000,
  },
  {
    id: 'daybag',
    name: '30L Daypack',
    tagline: 'Summit days and yatra temple walks',
    category: 'packs',
    price: 300,
    buyPrice: 1800,
    rentedLastMonth: 290,
    sizes: ['25–30L'],
    img: u('photo-1577733968852-0c48bd24fe2a', 900, 700),
    deposit: 800,
  },
  {
    id: 'jumbo-bag',
    name: 'Jumbo Duffel',
    tagline: 'Offload kit while you trek light',
    category: 'packs',
    price: 2500,
    buyPrice: 4500,
    rentedLastMonth: 180,
    sizes: ['80L'],
    img: u('photo-1565026057447-bc90a3dceb87'),
    deposit: 2000,
  },
  {
    id: 'trek-poles',
    name: 'Trekking Poles (Pair)',
    tagline: 'Balance on descents, less knee strain',
    category: 'accessories',
    price: 200,
    buyPrice: 2500,
    rentedLastMonth: 1430,
    img: u('photo-1551632811-561732d1e306'),
    deposit: 500,
  },
  {
    id: 'headlamp',
    name: 'Headlamp',
    tagline: 'Pre-dawn starts — batteries not included',
    category: 'accessories',
    price: 200,
    buyPrice: 800,
    rentedLastMonth: 620,
    img: u('photo-1504280390367-361c6d9f38f4'),
    deposit: 500,
  },
  {
    id: 'trek-pants',
    name: 'Trek Pants',
    tagline: 'Quick-dry, stretch, trail cut',
    category: 'warmth',
    price: 400,
    buyPrice: 1600,
    rentedLastMonth: 240,
    sizes: APPAREL_SIZES,
    img: u('photo-1473963961432-4f0c3f5e2e3e', 900, 700),
    deposit: 800,
  },
  {
    id: 'poncho',
    name: 'Poncho',
    tagline: 'Covers you and the pack in heavy rain',
    category: 'accessories',
    price: 250,
    buyPrice: 1200,
    rentedLastMonth: 580,
    sizes: ['One size'],
    img: u('photo-1527489377706-5bfac8032e08'),
    deposit: 400,
  },
  {
    id: 'water-bottle',
    name: '1L Water Bottle',
    tagline: 'Leak-proof, trail-tough',
    category: 'accessories',
    price: 150,
    buyPrice: 400,
    rentedLastMonth: 240,
    img: u('photo-1602143407151-7111542de6e8'),
    deposit: 200,
  },
  {
    id: 'gaiters',
    name: 'Gaiters',
    tagline: 'Keeps snow and scree out of boots',
    category: 'footwear',
    price: 200,
    buyPrice: 900,
    rentedLastMonth: 310,
    sizes: ['S', 'M', 'L'],
    img: u('photo-1483728642387-6c3bdd6c93e5'),
    deposit: 400,
  },
  {
    id: 'sunglasses',
    name: 'Polarized Sunglasses',
    tagline: 'UV400 for snow glare and high altitude',
    category: 'accessories',
    price: 180,
    buyPrice: 900,
    rentedLastMonth: 210,
    img: u('photo-1511499767150-a48a237ac008'),
    deposit: 400,
  },
  {
    id: 'thermos',
    name: 'Thermos Flask',
    tagline: 'Hot chai at camp, 12 hours',
    category: 'accessories',
    price: 150,
    buyPrice: 700,
    rentedLastMonth: 210,
    img: u('photo-1570784327381-05556ce0b4c8'),
    deposit: 300,
  },
];

export const GEAR_HERO_IMAGE = u('photo-1478131143081-268f3bcba263', 1600, 1000);

export const GEAR_FALLBACK_IMAGE = u('photo-1551632811-561732d1e306');

export const GEAR_HERO_HIGHLIGHTS = [
  {
    title: 'Sanitised & safe',
    body: 'Every item is cleaned and quality-checked before every trip.',
    icon: 'fa-shield-heart',
  },
  {
    title: 'Trail tested',
    body: 'Used by experts, built for the trails. Reliable. Durable.',
    icon: 'fa-mountain',
  },
  {
    title: 'Premium gear',
    body: 'Top brands, perfect for every Himalayan adventure you chase.',
    icon: 'fa-gem',
  },
  {
    title: 'Easy & hassle-free',
    body: 'Book online, pick up at base camp, return after your trek.',
    icon: 'fa-backpack',
  },
] as const;

export const GEAR_WHY_RENT = [
  {
    title: 'Save money',
    body: 'Pay a fraction of the cost. Perfect for occasional trekkers and first-timers.',
    icon: 'fa-indian-rupee-sign',
  },
  {
    title: 'Travel light',
    body: 'Carry less, enjoy more. Lighten your backpack and hike with ease.',
    icon: 'fa-leaf',
  },
  {
    title: 'One-time use?',
    body: "Why buy what you'll use only once? Rent it for the trek, return it after.",
    icon: 'fa-clock',
  },
  {
    title: 'Sustainable choice',
    body: 'Reduce waste. Share quality gear instead of buying kit that sits in a cupboard.',
    icon: 'fa-earth-asia',
  },
  {
    title: 'Support local',
    body: 'Empowering base-camp teams and trekking communities across the Himalayas.',
    icon: 'fa-people-group',
  },
] as const;

export const GEAR_STATS = [
  { value: '18,000+', label: 'Happy trekkers', icon: 'fa-users' },
  { value: '4.8 / 5', label: 'Average rating', icon: 'fa-star' },
  { value: '150+', label: 'Treks covered', icon: 'fa-location-dot' },
  { value: '100%', label: 'Trusted & reliable', icon: 'fa-shield-halved' },
] as const;

export const GEAR_TRUST_AVATARS = [
  { initials: 'NK', hue: 145 },
  { initials: 'PS', hue: 160 },
  { initials: 'AR', hue: 130 },
  { initials: 'DM', hue: 155 },
] as const;

export const GEAR_VALUE_PROPS = [
  {
    title: '70% cheaper',
    body: 'Skip the cost of buying technical gear you will use once a year.',
    icon: 'fa-indian-rupee-sign',
  },
  {
    title: 'Trail tested',
    body: 'Every piece is field-checked for Himalayan weather before it goes out.',
    icon: 'fa-mountain-sun',
  },
  {
    title: '₹0 upkeep',
    body: 'We clean, waterproof, and service the kit. You just trek.',
    icon: 'fa-soap',
  },
  {
    title: 'Travel light',
    body: 'Collect sanitised gear at base camp. Fly or bus with a daypack.',
    icon: 'fa-suitcase-rolling',
  },
] as const;

/** Top kit items for rent-vs-buy comparison (synced with catalog). */
export const GEAR_RENT_VS_BUY = GEAR_CATALOG.slice()
  .sort((a, b) => b.rentedLastMonth - a.rentedLastMonth)
  .slice(0, 8)
  .map((item) => ({ id: item.id, rent: item.price, buy: item.buyPrice }));

export const GEAR_TIMELINE = [
  {
    year: '2014',
    title: 'Indian Treks begins',
    body: 'Guided Himalayan treks start — trekkers ask for affordable gear at every base camp.',
  },
  {
    year: '2019',
    title: 'Rental pilot',
    body: 'Shoes, jackets, and poles available at Sankri and Dehradun for winter batches.',
  },
  {
    year: '2022',
    title: 'Base-camp stores',
    body: 'Dedicated rental counters at major reporting points across Uttarakhand and Himachal.',
  },
  {
    year: '2026',
    title: '18,000+ rentals / season',
    body: 'Full online booking, size reservation, and sanitised handoff on day 1 of every departure.',
  },
] as const;

export const GEAR_STEPS = [
  {
    n: '01',
    title: 'Book online',
    body: 'Pick shoes, jackets, packs, and extras for your departure.',
  },
  {
    n: '02',
    title: 'Select size',
    body: 'Lock UK shoe size or apparel fit so it is reserved for you.',
  },
  {
    n: '03',
    title: 'Pickup at base',
    body: 'Collect sanitised gear on day 1. Duffels stay in the cloakroom.',
  },
  {
    n: '04',
    title: 'Return & relax',
    body: 'Hand it back at the end. Deposit is returned after a quick check.',
  },
] as const;

export const GEAR_STORES = [
  {
    name: 'Dehradun',
    detail: 'Kargi Chowk office — reporting, briefing, and city pickups',
  },
  {
    name: 'Sankri / Mori',
    detail: 'Kedarkantha, Har Ki Dun, Bali Pass, and nearby winter trails',
  },
  {
    name: 'Joshimath / Chopta',
    detail: 'Valley of Flowers, Kuari Pass, Tungnath, and sacred yatras',
  },
  {
    name: 'Manali / Kullu',
    detail: 'Hampta Pass, Bhrigu Lake, and Himachal weekend treks',
  },
] as const;

export const GEAR_FAQS: { q: string; a: string }[] = [
  {
    q: 'When should I book rental gear?',
    a: 'Reserve online at least 3 days before your departure. Base-camp walk-ins are first-come and sizes can run out on winter and weekend batches.',
  },
  {
    q: 'Where do I collect and return the gear?',
    a: 'Pickup is at the reporting base on day 1 of your trek or yatra. Return it to the same team at the end of the trail — or at the finish point on crossing treks such as Hampta Pass.',
  },
  {
    q: 'Do I pay online or at base camp?',
    a: 'Rental charges are added to your trip booking. A refundable cash deposit is collected at base camp and returned when the kit comes back in good condition.',
  },
  {
    q: 'Can I change the size later?',
    a: 'Yes, subject to stock. Message us on WhatsApp before you travel, or swap at the base-camp store during briefing if a better size is available.',
  },
  {
    q: 'What if gear is damaged or lost?',
    a: 'Normal trail wear is on us. Loss or damage beyond fair use is charged from the security deposit. Tell the trek leader immediately if something fails on the trail — we carry spares on most departures.',
  },
  {
    q: 'I have not booked a trip yet. Can I still rent?',
    a: 'Gear is reserved against an Indian Treks departure. Pick your trek, yatra, or trip first, then add rentals so the kit is waiting at the correct base.',
  },
];

export const GEAR_REVIEWS = [
  {
    name: 'Neema',
    trip: 'Chopta Tungnath',
    text: 'The booking flow was simple and the shoes were more comfortable than my own pair. Poles, headlamp, and bottle were all in good shape. Travelling light from Delhi was the real win.',
  },
  {
    name: 'Omkar Bhagavat',
    trip: 'Kedarkantha Trek',
    text: 'Clean, well maintained, reasonably priced, and available in the sizes I needed. I will rent again for the next winter batch.',
  },
  {
    name: 'Deepak Edakkalathil',
    trip: 'Hampta Pass',
    text: 'One place for poles, pack, bottle, and extras. Affordable pricing and a smooth handoff at base camp.',
  },
] as const;

export const GEAR_PAGE_TOC = [
  { id: 'why-rent', title: 'Why rent' },
  { id: 'rent-or-buy', title: 'Rent vs buy' },
  { id: 'how-renting-works', title: 'How it works' },
  { id: 'rental-store', title: 'Shop from here', live: true },
  { id: 'pickup-points', title: 'Pickup points' },
  { id: 'rental-policies', title: 'Policies' },
  { id: 'gear-reviews', title: 'Trekker reviews' },
  { id: 'gear-blog', title: 'Trail guides' },
] as const;

export const GEAR_PAGE_HERO = {
  brandLabel: 'Indian Treks',
  eyebrow: 'Gear rental',
  titleMain: "Don't buy trek gear.",
  titleAccent: 'Rent it.',
  titleAccentStyle: 'script' as const,
  lead:
    'Sanitised, trail-tested kit waiting at base camp. Travel light, save up to 80%, and skip the cupboard of gear you will use once a year.',
  readTime: '5 min browse',
  guidanceBadge: 'Base-camp rental',
  quote: {
    text: 'Travel light. Trek strong. Return the kit — we handle the rest.',
    attribution: '— Indian Treks base-camp team',
  },
  roadmapTitle: 'How renting works',
  roadmap: [
    {
      step: 1,
      title: 'Book online',
      sub: 'Pick shoes, jackets, packs & extras',
      targetId: 'rental-store',
    },
    {
      step: 2,
      title: 'Select size',
      sub: 'Lock UK shoe size or apparel fit',
      targetId: 'rental-store',
    },
    {
      step: 3,
      title: 'Pickup at base',
      sub: 'Collect sanitised gear on day 1',
      targetId: 'pickup-points',
    },
    {
      step: 4,
      title: 'Return & relax',
      sub: 'Hand it back — deposit returned',
      targetId: 'rental-policies',
    },
  ],
  ctaKicker: 'Ready when you are',
  ctaLead: 'Reserve kit against your departure. Sizes are held until briefing day.',
  ctaLabel: 'Browse rental store',
  ctaTargetId: 'rental-store',
  trustPills: [
    { title: '70% cheaper', sub: 'Than buying full kit' },
    { title: 'Trail tested', sub: 'Cleaned after every trek' },
    { title: '18,000+ trekkers', sub: 'Rent with us each season' },
  ],
} as const;

export const GEAR_STORY_REVIEWS = [
  {
    id: 'neema-chopta',
    name: 'Neema',
    subtitle: 'Chopta Tungnath · Winter batch',
    short:
      'The booking flow was simple and the shoes were more comfortable than my own pair. Travelling light from Delhi was the real win.',
    full: 'The booking flow was simple and the shoes were more comfortable than my own pair. Poles, headlamp, and bottle were all in good shape. Travelling light from Delhi was the real win — I did not miss lugging boots on the Shatabdi.',
    trekLink: { label: 'Chopta Tungnath', href: '/treks/chopta-tungnath' },
  },
  {
    id: 'omkar-kedarkantha',
    name: 'Omkar Bhagavat',
    subtitle: 'Kedarkantha · December batch',
    short:
      'Clean, well maintained, reasonably priced, and available in the sizes I needed. I will rent again for the next winter batch.',
    full: 'Clean, well maintained, reasonably priced, and available in the sizes I needed. Jacket and shoes were dry and ready at Sankri. I will rent again for the next winter batch instead of buying gear I barely use.',
    trekLink: { label: 'Kedarkantha', href: '/treks/kedarkantha' },
  },
  {
    id: 'deepak-hampta',
    name: 'Deepak Edakkalathil',
    subtitle: 'Hampta Pass · Monsoon crossing',
    short:
      'One place for poles, pack, bottle, and extras. Affordable pricing and a smooth handoff at base camp.',
    full: 'One place for poles, pack, bottle, and extras. Affordable pricing and a smooth handoff at Manali base camp. The rain jacket saved me twice on the pass — glad I did not buy one for a single trek.',
    trekLink: { label: 'Hampta Pass', href: '/treks/hampta-pass' },
  },
  {
    id: 'priya-vof',
    name: 'Priya Sharma',
    subtitle: 'Valley of Flowers · August bloom',
    short:
      'Rented a daypack and poles for the Hemkund day — perfect condition and easy to add from the trek page.',
    full: 'Rented a daypack and poles for the Hemkund day — perfect condition and easy to add from the trek page. Pickup at Govindghat was quick during briefing. Deposit came back the same evening we returned.',
    trekLink: { label: 'Valley of Flowers', href: '/treks/valley-of-flowers' },
  },
] as const;

export type GearBlogArticle = {
  href: string;
  title: string;
  read: string;
  image: string;
  excerpt: string;
};

const GEAR_BLOG_SLUGS = ['first-himalayan-trek', 'valley-of-flowers-guide', 'family-trekking-in-india'] as const;

function excerptFromBlog(content: string, max = 140) {
  const plain = content
    .replace(/\*\*/g, '')
    .replace(/\n+/g, ' ')
    .trim();
  if (plain.length <= max) return plain;
  return `${plain.slice(0, max).trim()}…`;
}

export function getGearBlogArticles(): GearBlogArticle[] {
  return GEAR_BLOG_SLUGS.map((slug) => {
    const post = getPostBySlug(slug);
    if (!post) return null;
    return {
      href: blogPath(post.slug),
      title: post.title,
      read: post.read,
      image: post.image,
      excerpt: excerptFromBlog(post.content),
    };
  }).filter((item): item is GearBlogArticle => item !== null);
}

/** Fallback when blog slugs change — always returns at least three cards. */
export function getGearBlogArticlesSafe(): GearBlogArticle[] {
  const picked = getGearBlogArticles();
  if (picked.length >= 3) return picked;
  return [...blogPosts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3)
    .map((post) => ({
      href: blogPath(post.slug),
      title: post.title,
      read: post.read,
      image: post.image,
      excerpt: excerptFromBlog(post.content),
    }));
}

export type GearCartLine = {
  gearId: string;
  trekId: string;
  qty: number;
  size?: string;
};

const STORAGE_KEY = 'it-gear-rental-cart';
const CART_EVENT = 'it-gear-cart';

export function getGearById(id: string) {
  return GEAR_CATALOG.find((item) => item.id === id);
}

export function gearSave(item: GearItem) {
  return Math.max(0, item.buyPrice - item.price);
}

export function cashDepositForTotal(rentalTotal: number) {
  if (rentalTotal <= 0) return 0;
  if (rentalTotal <= 500) return 1000;
  if (rentalTotal <= 1000) return 2000;
  if (rentalTotal <= 2000) return 3000;
  return 4000;
}

function emitCart() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(CART_EVENT));
}

export function readGearCart(): GearCartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as GearCartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line) =>
        line &&
        typeof line.gearId === 'string' &&
        typeof line.trekId === 'string' &&
        Number.isFinite(line.qty) &&
        line.qty >= 1,
    );
  } catch {
    return [];
  }
}

export function writeGearCart(lines: GearCartLine[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  emitCart();
}

export function cartForTrek(trekId: string, lines = readGearCart()) {
  return lines.filter((line) => line.trekId === trekId);
}

export function upsertGearLine(line: GearCartLine) {
  const qty = Math.max(1, Math.min(8, Math.floor(line.qty)));
  const next = readGearCart().filter(
    (item) => !(item.gearId === line.gearId && item.trekId === line.trekId),
  );
  next.push({ ...line, qty });
  writeGearCart(next);
}

export function removeGearLine(gearId: string, trekId: string) {
  writeGearCart(readGearCart().filter((item) => !(item.gearId === gearId && item.trekId === trekId)));
}

export function lineKey(line: Pick<GearCartLine, 'gearId' | 'trekId'>) {
  return `${line.trekId}:${line.gearId}`;
}

export function cartSubtotal(lines: GearCartLine[]) {
  return lines.reduce((sum, line) => {
    const item = getGearById(line.gearId);
    return sum + (item ? item.price * line.qty : 0);
  }, 0);
}

export function encodeGearQuery(lines: GearCartLine[]) {
  return lines
    .map((line) => `${line.gearId}~${line.size ?? ''}~${line.qty}`)
    .join(',');
}

export function parseGearQuery(raw: string | null | undefined, trekId: string): GearCartLine[] {
  if (!raw) return [];
  const lines: GearCartLine[] = [];
  for (const chunk of raw.split(',')) {
    const [gearId, size, qtyRaw] = chunk.split('~');
    const qty = Number(qtyRaw);
    if (!gearId || !getGearById(gearId) || !Number.isFinite(qty) || qty < 1) continue;
    const line: GearCartLine = {
      gearId,
      trekId,
      qty: Math.min(8, Math.floor(qty)),
    };
    if (size) line.size = size;
    lines.push(line);
  }
  return lines;
}

export function subscribeGearCart(onChange: () => void) {
  if (typeof window === 'undefined') return () => {};
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onChange();
  };
  window.addEventListener(CART_EVENT, onChange);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(CART_EVENT, onChange);
    window.removeEventListener('storage', onStorage);
  };
}

export function formatGearLines(lines: GearCartLine[]) {
  return lines
    .map((line) => {
      const item = getGearById(line.gearId);
      if (!item) return '';
      const size = line.size ? ` ${line.size}` : '';
      const qty = line.qty > 1 ? ` ×${line.qty}` : '';
      return `${item.name}${size}${qty}`;
    })
    .filter(Boolean)
    .join(', ');
}
