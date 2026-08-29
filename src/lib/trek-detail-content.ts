import { treks, trekDetailPath, type Trek } from '@/lib/data';
import { photos } from '@/lib/media';
import { GEAR_CATALOG } from '@/lib/gear-rental';
import { safeImage, trekPhoto } from '@/lib/safe-image';
import type { BannerItem } from '@/components/Banners';

/** Packing guide — shared across treks, shown in the "Things to Carry" section. */
export const packingGroups: { title: string; icon: string; items: string[] }[] = [
  {
    title: 'Clothing',
    icon: 'fa-solid fa-shirt',
    items: [
      'Base layer: 2 sets moisture-wicking thermals (top and bottom)',
      'Mid layer: Fleece jacket + down insulated jacket (600-fill or higher)',
      'Outer shell: Windproof, waterproof rain jacket with hood',
      'Trekking trousers: 2 pairs, quick-dry (never jeans)',
      'Rain pants or poncho for wet conditions',
      'Warm hat/beanie + cap with brim (sun protection)',
      'Gloves: waterproof outer gloves',
      'Neck gaiter / buff',
      'Trekking socks: 4-5 pairs (merino wool preferred)',
      'Camp footwear: light sandals or Crocs for evenings',
    ],
  },
  {
    title: 'Footwear',
    icon: 'fa-solid fa-shoe-prints',
    items: [
      'Trekking boots: mid-to-high ankle, waterproof, broken in before the trek',
      'Gaiters to keep boots dry on snow and wet trails',
      'Extra pair of insoles in case your boots get wet inside',
    ],
  },
  {
    title: 'Equipment',
    icon: 'fa-solid fa-briefcase',
    items: [
      'Trekking poles: adjustable, essential for steep descents',
      'Backpack: 40-50 litres with rain cover',
      'Headlamp + spare batteries',
      'Sunglasses: UV400',
      'Sunscreen: SPF 50+ (altitude and snow reflection)',
      'Lip balm with SPF',
      'Reusable water bottle: 2 litres capacity',
      'Dry bags / Ziploc bags to keep clothes and electronics dry',
    ],
  },
  {
    title: 'Health & Hygiene',
    icon: 'fa-solid fa-heart-pulse',
    items: [
      'Paracetamol, ibuprofen, Diamox (consult your doctor first)',
      'ORS sachets',
      'Blister pads, moleskin, antiseptic cream',
      'Insect repellent',
      'Hand sanitizer',
      'Biodegradable soap only',
      'Quick-dry towel',
      'Toilet paper (carry all waste back out)',
      'Feminine hygiene supplies if required',
    ],
  },
  {
    title: 'Documents & Finance',
    icon: 'fa-solid fa-shield-halved',
    items: [
      'Original government photo ID (Aadhaar, Voter ID, Passport) — mandatory for permits',
      'Cash in small denominations (ATMs are unreliable near base villages)',
      'Trek confirmation and emergency contacts (printed copy)',
    ],
  },
];

/** Rental gear catalogue shown in the "Rent a Gear" carousel. */
export const gearRentals = GEAR_CATALOG.map((item) => ({
  id: item.id,
  name: item.name,
  price: String(item.price),
  img: item.img,
}));

export const bookingPolicyRows: [string, string][] = [
  ['Booking Confirmation', 'Your seat is considered confirmed only after the required advance payment is received.'],
  ['Balance Payment', 'The remaining amount must be cleared before departure or as per the reporting instructions shared by the team.'],
  ['Transport Selection', 'Pickup from the base city is applicable only if that option is selected at the time of booking.'],
  ['ID Requirement', 'Every participant should carry a valid government photo ID for verification and trek administration.'],
  ['Operational Changes', 'In case of weather, road, or safety concerns, the itinerary may be adjusted for the well-being of the group.'],
];

export const cancellationPolicyRows: [string, string][] = [
  ['More than 30 days before departure', 'Minimal processing deduction may apply; the remaining amount can be refunded or adjusted as per booking terms.'],
  ['15 to 30 days before departure', 'Partial cancellation charge applicable; remaining balance may be refunded or transferred to a future batch if approved.'],
  ['7 to 14 days before departure', 'Higher cancellation charge applies because transport, permits, and staffing arrangements are usually already blocked.'],
  ['Less than 7 days before departure', 'Booking is generally non-refundable due to final operational commitments.'],
  ['No show / departure missed', 'No refund is usually applicable once reporting is missed without prior written coordination.'],
];

export const addOns: { id: 'offloading' | 'insurance' | 'jumbo'; name: string; price: number; icon: string }[] = [
  { id: 'offloading', name: 'Backpack Offloading', price: 1600, icon: 'fa-solid fa-briefcase' },
  { id: 'insurance', name: 'Insurance', price: 210, icon: 'fa-solid fa-shield-halved' },
  { id: 'jumbo', name: 'Jumbo bag', price: 2500, icon: 'fa-solid fa-briefcase' },
];

export const detailTestimonials: {
  name: string;
  city: string;
  platform: 'Google' | 'Tripadvisor';
  text: string;
}[] = [
  {
    name: 'Ananya Sharma',
    city: 'Delhi',
    platform: 'Google',
    text: 'Every section of the trail was filled with waterfalls, misty mountains, and open meadows. The entire experience felt peaceful, refreshing, and visually unforgettable.',
  },
  {
    name: 'Karan Malhotra',
    city: 'Chandigarh',
    platform: 'Tripadvisor',
    text: 'From lush green trails to the silence at the top, every day felt meaningful and beautifully different. The trek leader kept the group safe and motivated throughout.',
  },
  {
    name: 'Riya Sen',
    city: 'Bengaluru',
    platform: 'Google',
    text: 'This was my first Himalayan trek and it exceeded every expectation. The trails were beginner-friendly and the scenery kept changing constantly.',
  },
  {
    name: 'Aditya Rawat',
    city: 'Pune',
    platform: 'Tripadvisor',
    text: 'Clouds floating through the valley, rivers roaring beside the trail, and camps set up perfectly. One of the most beautiful trekking experiences I have had.',
  },
];

const regionLabel: Record<Trek['region'], string> = {
  uttarakhand: 'Uttarakhand',
  himachal: 'Himachal',
  nepal: 'Nepal',
  kashmir: 'Kashmir',
};

function fromPrice(trek: Trek) {
  return `From ₹${Math.min(...trek.pricing.map((p) => p.price)).toLocaleString('en-IN')}`;
}

function toBanner(trek: Trek, badge?: string): BannerItem {
  return {
    src: safeImage(trek.images[0], trekPhoto(trek.id)),
    href: trekDetailPath(trek),
    title: trek.title,
    subtitle: `${trek.state} · ${trek.duration} · ${trek.difficulty}`,
    badge: badge || trek.badge || regionLabel[trek.region],
    discount: fromPrice(trek),
  };
}

/** Collection offers — these routes exist regardless of the trek being viewed. */
const offerBanners: BannerItem[] = [
  {
    src: photos.snow,
    href: '/bucket-list-sale',
    title: 'Bucket List Sale',
    subtitle: 'Handpicked Himalayan departures at their best prices',
    badge: 'Limited Offer',
    discount: 'Up to 40% off',
  },
  {
    src: photos.himachal,
    href: '/group-trips',
    title: 'Group Trips & Squad Discounts',
    subtitle: 'Travel with friends — bigger group, bigger savings',
    badge: 'Group Offer',
    discount: 'Save up to 20%',
  },
  {
    src: photos.uttarakhand,
    href: '/customized',
    title: 'Customise Your Own Trek',
    subtitle: 'Private dates across Uttarakhand, Himachal & Nepal',
    badge: 'Tailor-Made',
    discount: 'Plan your trip',
  },
  {
    src: photos.yatra,
    href: '/travel-gift-cards',
    title: 'Travel Gift Cards',
    subtitle: 'Valid on every trek and sacred yatra we run',
    badge: 'Gift Cards',
    discount: 'Any amount',
  },
];

/**
 * Three promo strips shown between detail-page sections. Sets are built from
 * live trek data and never link back to the trek being viewed.
 */
export function getPromoBanners(trek: Trek): [BannerItem[], BannerItem[], BannerItem[]] {
  const others = treks.filter((t) => t.id !== trek.id);
  const byRating = [...others].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

  const sameRegion = others.filter((t) => t.region === trek.region).slice(0, 4);
  const nearby = (sameRegion.length >= 2 ? sameRegion : byRating.slice(0, 4)).map((t) =>
    toBanner(t, `More in ${regionLabel[t.region]}`),
  );

  const sameKind = others.filter((t) => t.type === trek.type);
  const topRated = (sameKind.length >= 2 ? sameKind : others)
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 4)
    .map((t) => toBanner(t, `★ ${t.rating} Rated`));

  return [nearby, offerBanners, topRated];
}

/** First word of "X to Y" style route strings. */
function baseCity(trek: Trek) {
  return (trek.startEndPoint || trek.location || '').split(/\s+to\s+/i)[0].trim() || trek.state;
}

/** Last leg of "X to Y" — the on-trail base village where available. */
export function baseCamp(trek: Trek) {
  const parts = (trek.location || '').split(/\s+to\s+/i);
  return (parts[0] || trek.state).trim();
}

export function staysLabel(trek: Trek) {
  return trek.type === 'yatra' ? 'Hotel + Guesthouse' : 'Camps + Guesthouse';
}

export type HighlightTone = 'green' | 'amber' | 'sky' | 'rose' | 'slate';

export type HighlightSpec = {
  id: string;
  label: string;
  value: string;
  icon: string;
  tone: HighlightTone;
  href?: string;
  sectionId?: string;
};

function fitnessCriteria(difficulty: Trek['difficulty']) {
  const map: Record<Trek['difficulty'], string> = {
    Easy: '3 km in 35 mins',
    'Easy to Moderate': '4 km in 34 mins',
    Moderate: '5 km in 32 mins',
    'Moderate-Difficult': '5 km in 32 mins',
    Difficult: '5 km in 30 mins',
  };
  return map[difficulty];
}

function suitableForAge(trek: Trek) {
  if (trek.type === 'yatra') return 'All ages with guidance';
  const map: Record<Trek['difficulty'], string> = {
    Easy: '10 to 62 years',
    'Easy to Moderate': '10 to 60 years',
    Moderate: '12 to 58 years',
    'Moderate-Difficult': '12 to 62 years',
    Difficult: '16 to 55 years',
  };
  return map[trek.difficulty];
}

function accommodationDetail(trek: Trek) {
  if (trek.type === 'yatra') return staysLabel(trek);
  const hasCamping = trek.pricing.some((tier) => tier.name === 'Economic');
  return hasCamping ? 'Tents (2 sharing)' : staysLabel(trek);
}

function pickupDetail(
  trek: Trek,
  departure?: { pickupTime: string; location: string },
) {
  if (departure) return `${departure.location} at ${departure.pickupTime}`;
  const point = baseCity(trek);
  return `${point} reporting point at 7:30 AM`;
}

function dropoffDetail(
  trek: Trek,
  departure?: { dropTime: string; location: string },
) {
  if (departure) return `${departure.location} at ${departure.dropTime}`;
  const point = baseCity(trek);
  return `${point} by 8:00 PM`;
}

/** At-a-glance trek facts for the highlight grid (reference-style 4×3 layout). */
export function buildHighlightSpecs(
  trek: Trek,
  kindLabel: string,
  extended?: {
    departure?: { pickupTime: string; dropTime: string; location: string };
    sections?: { id: string }[];
  },
): HighlightSpec[] {
  const hasFitnessSection = extended?.sections?.some((section) => section.id === 'fitness');
  const durationValue = `${trek.days} days / ${trek.distance}`;

  return [
    {
      id: 'difficulty',
      label: `${kindLabel} Difficulty`,
      value: trek.difficulty,
      icon: 'fa-solid fa-signal',
      tone: 'amber',
    },
    {
      id: 'duration',
      label: `${kindLabel} Duration`,
      value: durationValue,
      icon: 'fa-solid fa-stopwatch',
      tone: 'sky',
    },
    {
      id: 'altitude',
      label: 'Highest Altitude',
      value: trek.maxAltitude,
      icon: 'fa-solid fa-mountain',
      tone: 'green',
    },
    {
      id: 'suitable',
      label: 'Suitable For',
      value: suitableForAge(trek),
      icon: 'fa-solid fa-people-group',
      tone: 'rose',
    },
    {
      id: 'basecamp',
      label: 'Basecamp',
      value: `${baseCamp(trek)}, ${trek.state}`,
      icon: 'fa-solid fa-route',
      tone: 'green',
      sectionId: 'how-to-reach',
    },
    {
      id: 'accommodation',
      label: 'Accommodation Type',
      value: accommodationDetail(trek),
      icon: 'fa-solid fa-campground',
      tone: 'amber',
      sectionId: 'inclusion-exclusion',
    },
    {
      id: 'fitness',
      label: 'Fitness Criteria',
      value: fitnessCriteria(trek.difficulty),
      icon: 'fa-solid fa-person-running',
      tone: 'sky',
      sectionId: hasFitnessSection ? 'fitness' : undefined,
      href: hasFitnessSection ? undefined : '/fitness-training-plan',
    },
    {
      id: 'pickup',
      label: 'Pickup Details',
      value: pickupDetail(trek, extended?.departure),
      icon: 'fa-solid fa-clock',
      tone: 'green',
      sectionId: 'how-to-reach',
    },
    {
      id: 'dropoff',
      label: 'Dropoff Details',
      value: dropoffDetail(trek, extended?.departure),
      icon: 'fa-solid fa-clock-rotate-left',
      tone: 'amber',
      sectionId: 'how-to-reach',
    },
    {
      id: 'packing',
      label: 'Packing Checklist',
      value: 'View checklist',
      icon: 'fa-solid fa-suitcase',
      tone: 'slate',
      sectionId: 'things-to-carry',
    },
    {
      id: 'cloakroom',
      label: 'Cloakroom',
      value: trek.type === 'yatra' ? 'At hotel lobby' : 'Available at base',
      icon: 'fa-solid fa-suitcase-rolling',
      tone: 'sky',
    },
    {
      id: 'offloading',
      label: 'Offloading',
      value: trek.type === 'yatra' ? 'Not applicable' : 'Available',
      icon: 'fa-solid fa-horse',
      tone: 'amber',
      sectionId: trek.type === 'yatra' ? undefined : 'rent-gear',
    },
  ];
}

/** Seasonal guide derived from the trek's best season window. */
export function getSeasonGuide(trek: Trek): { title: string; body: string; bullets: string[] }[] {
  const season = trek.bestSeason;
  const isWinter = /dec|jan|feb|mar/i.test(season);
  const isMonsoon = /jul|aug|sep/i.test(season);

  const peak = {
    title: `${season}: Peak Season`,
    body: `This is the window ${trek.title} is built around. Trails are at their best, campsites are fully operational, and departures run every month with the largest choice of dates.`,
    bullets: [
      isWinter
        ? 'Daytime temperature: 6°C – 12°C'
        : isMonsoon
          ? 'Daytime temperature: 10°C – 15°C'
          : 'Daytime temperature: 12°C – 18°C',
      isWinter ? 'Night temperature: -5°C – 4°C' : 'Night temperature: 4°C – 10°C',
      isMonsoon
        ? 'Rainfall: frequent — expect rain most days and slippery trails'
        : isWinter
          ? 'Snow: consistent snow cover on the upper trail'
          : 'Rainfall: occasional afternoon showers',
      'Crowds: high on weekends, quieter on weekday batches',
    ],
  };

  const shoulder = {
    title: 'Shoulder Season: Fewer Crowds',
    body: `Just before and after the ${season} window the route stays open but the groups are smaller. Conditions are slightly less predictable, and the reward is a much quieter trail.`,
    bullets: [
      'Daytime temperature: 10°C – 18°C',
      'Night temperature: 2°C – 8°C',
      'Rainfall: light and infrequent',
      'Crowds: low to moderate',
    ],
  };

  const off = {
    title: 'Off Season: Limited Access',
    body: `Outside the main window the higher sections can be blocked by snow, monsoon damage, or forest department closures. Departures are paused and we recommend planning inside the ${season} window instead.`,
    bullets: [
      'Trail access: partial or closed on the upper route',
      'Views: can be excellent on clear days',
      'Support: limited stays and transport near the base',
      'Crowds: very low',
    ],
  };

  return [peak, shoulder, off];
}

/** Multi-stage travel plan to the trek base, derived from the trek route. */
export function getReachSteps(trek: Trek): {
  title: string;
  items: { label: string; text: string }[];
}[] {
  const city = baseCity(trek);
  const camp = baseCamp(trek);
  const isNepal = trek.region === 'nepal';

  return [
    {
      title: `Reach ${city}`,
      items: [
        {
          label: 'By Air',
          text: isNepal
            ? 'Fly into Kathmandu (TIA), then take a domestic flight or tourist coach onward to the trek gateway.'
            : 'Nearest airport is Jolly Grant, Dehradun for Uttarakhand routes and Bhuntar, Kullu for Himachal routes. Taxis are available at both.',
        },
        {
          label: 'By Train',
          text: isNepal
            ? 'Trains run up to Gorakhpur or Raxaul on the Indian side, followed by a road transfer across the border.'
            : 'Haridwar, Dehradun, and Chandigarh are the closest well-connected railheads, each with onward buses and taxis.',
        },
        {
          label: 'By Road',
          text: `Overnight buses and private cabs connect Delhi and nearby cities to ${city}. Book the earliest arrival so you reach before the reporting time.`,
        },
      ],
    },
    {
      title: `${city} to ${camp}`,
      items: [
        { label: 'Route', text: `${trek.startEndPoint || trek.location} through the main highway and hill roads.` },
        { label: 'Drive Time', text: 'Typically 7–11 hours depending on traffic, weather, and road conditions.' },
        { label: 'Vehicle', text: 'Shared taxi, private cab, or the operator-arranged Tempo Traveller included in your package.' },
        { label: 'Last ATM & Network', text: 'Withdraw cash and download offline maps at the last major town — connectivity beyond the base is unreliable.' },
      ],
    },
    {
      title: `${camp} to the trailhead`,
      items: [
        { label: 'Transfer', text: `A short local transfer brings you from ${camp} to the official starting point.` },
        { label: 'Reporting', text: 'Reach the base a night before departure so the team can complete document checks and a fitness briefing.' },
        { label: 'Trek begins', text: `From here you cover ${trek.distance} over ${trek.days} days, topping out at ${trek.maxAltitude}.` },
      ],
    },
  ];
}
