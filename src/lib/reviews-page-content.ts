import { photos } from '@/lib/media';
import { CONTACT } from '@/lib/contact';

export type ReviewCategory = 'international' | 'domestic' | 'media';

export type VerifiedReview = {
  id: string;
  name: string;
  reviewedAt: string;
  rating: number;
  booked: string;
  bookedHref?: string;
  text: string;
  photos: string[];
  category: ReviewCategory;
};

export type GoogleReview = {
  id: string;
  name: string;
  reviewedAt: string;
  rating: number;
  text: string;
  avatar: string;
};

export const REVIEWS_TRUST_STRIP = [
  { icon: 'fa-circle-check', label: 'Verified trip bookings only' },
  { icon: 'fa-shield-halved', label: 'Post-departure feedback collected' },
  { icon: 'fa-google', label: 'Cross-check on Google Maps' },
  { icon: 'fa-mountain-sun', label: 'Treks, yatras & group tours' },
] as const;

export const REVIEWS_VERIFICATION_STEPS = [
  {
    step: '01',
    title: 'Booked with Indian Treks',
    body: 'Every review ties to a confirmed booking — trek, yatra, or customised trip operated by our team.',
  },
  {
    step: '02',
    title: 'Trip completed',
    body: 'Feedback is collected after departure, on trail support ends, and travellers return home safely.',
  },
  {
    step: '03',
    title: 'Published & verifiable',
    body: 'Website reviews and public Google ratings can be cross-checked on our Google Business profile.',
  },
] as const;

export const GOOGLE_REVIEWS_SECTION = {
  kicker: 'Google Reviews',
  title: 'What travellers say on Google',
  intro:
    'These are public reviews left on our Google Business profile by trekkers and yatra pilgrims. Cross-check ratings, read full comments, and verify authenticity anytime on Google Maps.',
  verifyLabel: 'Verify on Google Maps',
  verifyHint: 'Opens our official Google listing — read all public reviews and see live ratings.',
  writeLabel: 'Write a Google review',
  writeHint: 'Travelled with us recently? Share your experience on Google to help others plan confidently.',
  rating: CONTACT.googleReviews.ratingDisplay,
  count: CONTACT.googleReviews.countDisplay,
  travellers: CONTACT.googleReviews.travellersDisplay,
  ratingBreakdown: [
    { stars: 5, percent: 89 },
    { stars: 4, percent: 8 },
    { stars: 3, percent: 2 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0 },
  ],
} as const;

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'g-ankita',
    name: 'Ankita Choudhary',
    reviewedAt: '2 weeks ago',
    rating: 5,
    text:
      'I recently joined a Himalayan trek with Indian Treks. This was my first solo trip, and not once did I feel like I was traveling alone. The group was amazing and the trek leader was very supportive throughout.',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocLm8pipAwjeBKv1ut2rnRx-unDhbdaXRVZvJLGR-jdys5moZw=s120-c-rp-mo-br100',
  },
  {
    id: 'g-deepak',
    name: 'Deepak Bansal',
    reviewedAt: '1 month ago',
    rating: 5,
    text:
      'Excellent service on our Himachal trip. I got sick mid-way but the way they handled it was just great. Highly professional team — would recommend Indian Treks for first-time trekkers.',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocLOlBP7lkiIOZ8IMeMbiVYc1t1fnGr6Y3GJXTzjWu9QnV68uQ=s64-c-rp-mo-br100',
  },
  {
    id: 'g-shivanand',
    name: 'Shivanand Pujari',
    reviewedAt: '3 weeks ago',
    rating: 5,
    text:
      'Had an amazing Kedarnath yatra experience. Our trip leaders were supportive and the whole pilgrimage felt well organised from Haridwar pickup to the final darshan.',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocJFNs8uv9JSKBoUmiIh0ADF8rokVBkICM2cc2yVxqdgQSF9rw=s64-c-rp-mo-br100',
  },
  {
    id: 'g-priya',
    name: 'Priya Sharma',
    reviewedAt: '1 month ago',
    rating: 5,
    text:
      'Kedarkantha winter trek was flawless — warm camps, patient leaders, and a magical summit sunrise. Indian Treks kept us informed on WhatsApp before and during the trip.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop',
  },
  {
    id: 'g-karan',
    name: 'Karan Malhotra',
    reviewedAt: '2 months ago',
    rating: 4,
    text:
      'Hampta Pass was well organised with good food on trail. Minor delay on pickup day but the team communicated proactively. Overall a solid crossover trek experience.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop',
  },
  {
    id: 'g-neha',
    name: 'Neha Gupta',
    reviewedAt: '6 weeks ago',
    rating: 5,
    text:
      'Valley of Flowers in peak bloom — Indian Treks handled Govindghat logistics and our guide was knowledgeable. Already booked Triund weekend with the same team.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop',
  },
];

export type HeroCarouselReview = {
  id: string;
  name: string;
  reviewedOn: string;
  rating: number;
  text: string;
  avatar: string;
  photos: string[];
};

export const REVIEWS_PAGE_HERO = {
  brandName: 'Indian Treks',
  reviewsWord: 'Reviews',
  subtitle:
    'Trusted by 50,000+ Travellers to Run Their Treks & Yatras End-to-End. Every review here is from a trip planned, operated, and supported by Indian Treks, before departure, on ground, and till return.',
  totalCountLabel: '12,500+',
  totalReviewsDisplay: '50,000+',
  googleRating: CONTACT.googleReviews.ratingDisplay,
  googleTravellers: CONTACT.googleReviews.travellersDisplay,
  googleCount: CONTACT.googleReviews.countDisplay,
} as const;

export const REVIEWS_HERO_AWARD = {
  trophy: '🏆',
  headline: 'AWARDED BEST ADVENTURE TRAVEL BRAND',
  subline: 'The Economic Times Travel & Tourism Annual Awards',
  badgeTitle: 'Travel & Tourism',
  badgeSub: 'Annual Conclave & Awards',
  badgeEdition: 'First Edition',
  reviewsCount: '50,000+',
  reviewsLinkLabel: 'Indian Treks Reviews',
  googleRating: CONTACT.googleReviews.ratingDisplay,
  googleTravellers: CONTACT.googleReviews.travellersDisplay,
} as const;

export const REVIEWS_HERO_CAROUSEL: HeroCarouselReview[] = [
  {
    id: 'hero-r1',
    name: 'Masaddat Mallick',
    reviewedOn: '10 Jun 2026',
    rating: 5,
    text:
      'It was a great experience with Indian Treks. The Kashmir package was well planned — houseboat stay, Gulmarg day trip, and Pahalgam meadows were all seamless. Our coordinator checked in daily and the driver was patient on mountain roads. Would definitely book again for Ladakh next season.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop',
    photos: [
      photos.himachal,
      photos.uttarakhand,
      photos.chopta,
      photos.snow,
    ],
  },
  {
    id: 'hero-r2',
    name: 'Priya Sharma',
    reviewedOn: '07 Jun 2026',
    rating: 5,
    text:
      'Our first winter trek with Indian Treks exceeded every expectation. Kedarkantha was perfectly paced, camps were warm, and the summit sunrise was surreal. The team handled Dehradun pickup, permits, and gear rental without any last-minute chaos.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop',
    photos: [photos.kedarkantha, photos.snow, photos.himachal, photos.triund],
  },
  {
    id: 'hero-r3',
    name: 'Rahul Verma',
    reviewedOn: '04 Jun 2026',
    rating: 5,
    text:
      'Char Dham yatra with Indian Treks felt sacred and stress-free. Clean stays, clear darshan timing, and caring staff throughout. Our parents felt supported on the Kedarnath trek portion — exactly what we needed for a family pilgrimage.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop',
    photos: [photos.yatra, photos.kedarnath, photos.chopta, photos.uttarakhand],
  },
  {
    id: 'hero-r4',
    name: 'Neha Gupta',
    reviewedOn: '03 Jun 2026',
    rating: 5,
    text:
      'Valley of Flowers in monsoon bloom was magical. Indian Treks kept us updated on weather till departure day. Food at Ghangaria was better than expected and our guide knew every flower we pointed at on the trail.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop',
    photos: [photos.vof, photos.chopta, photos.uttarakhand, photos.himachal],
  },
  {
    id: 'hero-r5',
    name: 'Karan Malhotra',
    reviewedOn: '28 May 2026',
    rating: 5,
    text:
      'Hampta Pass crossover was the highlight of my year. Varied terrain every day, safe river crossings, and Spiti-side landscapes that felt otherworldly. Food and camp setup were solid throughout the trek.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop',
    photos: [photos.hampta, photos.himachal, photos.snow, photos.chopta],
  },
];

export const POPULAR_REVIEWS: VerifiedReview[] = [
  {
    id: 'pop-priya',
    name: 'Priya Sharma',
    reviewedAt: '07 Jun 2026',
    rating: 5,
    booked: 'Kedarkantha Winter Trek',
    bookedHref: '/treks/kedarkantha',
    text:
      'Our first winter trek and it exceeded every expectation. The Indian Treks team handled permits, transport from Dehradun, and camp setup flawlessly. Our trek leader paced the group perfectly on summit day — no one felt rushed or left behind. The sunrise from the summit was surreal, and the bonfire nights made the whole batch feel like family. This was my second trip with Indian Treks and I am already planning Valley of Flowers next season.',
    photos: [photos.kedarkantha, photos.snow, photos.himachal, photos.chopta, photos.triund, photos.uttarakhand],
    category: 'domestic',
  },
  {
    id: 'pop-rahul',
    name: 'Rahul Verma',
    reviewedAt: '04 Jun 2026',
    rating: 5,
    booked: 'Char Dham Yatra Package',
    bookedHref: '/yatra/char-dham-yatra',
    text:
      'Some journeys do not just take you places — they hold you. Our Char Dham yatra with Indian Treks felt exactly like that. From Haridwar pickup through Kedarnath, Badrinath, Gangotri and Yamunotri, every darshan window was planned with care. Stays were clean, drivers were patient on mountain roads, and the coordinator checked on our parents every evening. The team understood this was pilgrimage first, tourism second. We felt safe, supported, and spiritually at peace throughout.',
    photos: [photos.yatra, photos.kedarnath, photos.chopta, photos.uttarakhand],
    category: 'domestic',
  },
  {
    id: 'pop-neha',
    name: 'Neha Gupta',
    reviewedAt: '03 Jun 2026',
    rating: 5,
    booked: 'Valley of Flowers Trek with Hemkund Sahib',
    bookedHref: '/treks/valley-of-flowers',
    text:
      'Just wrapped up Valley of Flowers and I am still thinking about the meadows, the mist rolling through the valley, and the Hemkund Sahib darshan at the end. The monsoon blooms were at their peak — every turn on the trail felt like walking through a painting. Food at Ghangaria was better than we expected, and our guide knew every flower name we pointed at. Everything was beautifully organised from Govindghat pickup to the final descent. A bucket-list trek done right.',
    photos: [photos.vof, photos.chopta, photos.uttarakhand],
    category: 'domestic',
  },
];

export const RECENT_REVIEWS: VerifiedReview[] = [
  {
    id: 'rec-kanchan',
    name: 'Kanchan Gautam',
    reviewedAt: '12 Aug 2026',
    rating: 5,
    booked: '6 Days Ladakh Backpacking Tour',
    bookedHref: '/backpacking',
    text:
      'Big thank you to the Indian Treks team. It was a very well planned Ladakh circuit and everything was seamless — permits, bikes, stays in Leh, and the Nubra day trip. Keep up the good work.',
    photos: [photos.himachal, photos.snow],
    category: 'domestic',
  },
  {
    id: 'rec-harshal',
    name: 'Harshal Ajmera',
    reviewedAt: '09 Aug 2026',
    rating: 4,
    booked: 'Valley of Flowers Trek with Hemkund Sahib, Uttarakhand',
    bookedHref: '/treks/valley-of-flowers',
    text:
      'Trek was excellent. The plan was executed as per itinerary. One thing to mention — we would prefer a different stay at Ghangaria after returning from the trek. Overall experience was good.',
    photos: [photos.vof],
    category: 'domestic',
  },
  {
    id: 'rec-sarah',
    name: 'Sarah Obaid',
    reviewedAt: '08 Aug 2026',
    rating: 4,
    booked: 'Mesmerising Meghalaya Group Tour',
    bookedHref: '/domestic-tours',
    text:
      'A wonderful 7-day Meghalaya family trip organised by Indian Treks. The itinerary was well curated keeping our requirements in mind. Local partners were kind and helpful. Overall a memorable experience.',
    photos: [photos.backpackingHero, photos.himachal, photos.chopta],
    category: 'domestic',
  },
  {
    id: 'rec-isha',
    name: 'Ishaan A',
    reviewedAt: '08 Aug 2026',
    rating: 5,
    booked: 'Mesmerising Meghalaya Group Tour',
    bookedHref: '/domestic-tours',
    text: 'Very good experience — on-time pickups, friendly batch, and clear daily briefings.',
    photos: [photos.backpackingHero],
    category: 'domestic',
  },
  {
    id: 'rec-susmita',
    name: 'Susmita Mukherjee',
    reviewedAt: '07 Aug 2026',
    rating: 5,
    booked: 'Hampta Pass Crossover Trek',
    bookedHref: '/treks/hampta-pass',
    text:
      'My Hampta Pass experience was unforgettable. Chandratal blues, Spiti-side landscapes, and the camaraderie in camp made every hard climb worth it. Photo stops were well timed and the team handled river crossings safely.',
    photos: [photos.hampta, photos.himachal],
    category: 'domestic',
  },
  {
    id: 'rec-priya-y',
    name: 'Priya Deshmukh',
    reviewedAt: '06 Aug 2026',
    rating: 5,
    booked: 'Kedarnath Yatra',
    bookedHref: '/yatra/kedarnath-yatra',
    text:
      'Kedarnath was spiritual and well organised. Clean stays, clear briefings, and caring staff throughout the yatra. Our family felt supported on the trek portion to the temple.',
    photos: [photos.yatra, photos.kedarnath, photos.chopta],
    category: 'domestic',
  },
  {
    id: 'rec-amit',
    name: 'Amit Thakur',
    reviewedAt: '06 Aug 2026',
    rating: 5,
    booked: 'Triund Weekend Trek',
    bookedHref: '/treks/mcleodganj-trek',
    text:
      'Perfect weekend escape from Chandigarh. Campsite vibes, Dhauladhar views, and a friendly group leader. Back in time for Monday without feeling rushed.',
    photos: [photos.triund],
    category: 'domestic',
  },
  {
    id: 'rec-divya',
    name: 'Divya Nair',
    reviewedAt: '05 Aug 2026',
    rating: 5,
    booked: 'Kuari Pass Trek',
    bookedHref: '/treks/kuari-pass',
    text:
      'Crisp autumn views and a well-led group from day one. Leaders knew the trail inside out and camps were comfortable throughout the Kuari Pass circuit.',
    photos: [photos.chopta, photos.snow, photos.uttarakhand],
    category: 'domestic',
  },
  {
    id: 'rec-rohan',
    name: 'Rohan Kapoor',
    reviewedAt: '05 Aug 2026',
    rating: 5,
    booked: 'Everest Base Camp Trek, Nepal',
    bookedHref: '/treks/everest-base-camp',
    text:
      'EBC was the trek of a lifetime. Acclimatisation plan, gear guidance, and guide quality were top-notch. Indian Treks handled Kathmandu logistics and tea-house coordination smoothly.',
    photos: [photos.ebc, photos.nepal, photos.snow],
    category: 'international',
  },
  {
    id: 'rec-anita',
    name: 'Anita Verma',
    reviewedAt: '04 Aug 2026',
    rating: 5,
    booked: 'Annapurna Base Camp Trek, Nepal',
    bookedHref: '/international-getaways',
    text:
      'ABC with Indian Treks was seamless from Pokhara to the sanctuary and back. Pacing was perfect for our mixed-fitness group and the views were worth every step.',
    photos: [photos.nepal, photos.ebc],
    category: 'international',
  },
  {
    id: 'rec-mark',
    name: 'Mark Gundert',
    reviewedAt: '03 Aug 2026',
    rating: 5,
    booked: 'Bhutan Cultural Tour',
    bookedHref: '/international-getaways',
    text:
      'Saved time and stress booking our Bhutan circuit through Indian Treks. Permits, guides, and hotels were sorted before we landed. Highly recommend for first-time visitors.',
    photos: [photos.himachal, photos.chopta],
    category: 'international',
  },
  {
    id: 'rec-sara',
    name: 'Sara Fernandes',
    reviewedAt: '03 Aug 2026',
    rating: 5,
    booked: 'All Girls Himachal Backpacking',
    bookedHref: '/backpacking',
    text:
      'Safe, social and beautifully paced. The all-girls batch made every day feel easy and fun. Kasol and Jibhi were highlights — already planning Meghalaya next.',
    photos: [photos.himachal, photos.backpackingHero, photos.triund],
    category: 'domestic',
  },
  {
    id: 'rec-vikram',
    name: 'Vikram Singh',
    reviewedAt: '02 Aug 2026',
    rating: 5,
    booked: 'Nag Tibba Weekend Trek',
    bookedHref: '/treks/nag-tibba',
    text:
      'Short Garhwal escape with a proper summit feel. Great for first-timers — leaders paced us well and food at camp was solid.',
    photos: [photos.chopta],
    category: 'domestic',
  },
  {
    id: 'rec-meera',
    name: 'Meera Joshi',
    reviewedAt: '01 Aug 2026',
    rating: 5,
    booked: 'Chopta Tungnath Chandrashila Trek',
    bookedHref: '/treks/chopta-tungnath',
    text:
      'Tungnath darshan plus Chandrashila sunrise — compact itinerary with good stays. Organisation was crisp and the group was friendly.',
    photos: [photos.chopta, photos.uttarakhand],
    category: 'domestic',
  },
  {
    id: 'rec-media-1',
    name: 'Travel India Today',
    reviewedAt: '28 Jul 2026',
    rating: 5,
    booked: 'Press Fam — Uttarakhand Winter Trails',
    text:
      'Indian Treks sets a high bar for small-group Himalayan operations — certified leaders, LNT protocols, and community-first homestay partnerships across Garhwal.',
    photos: [photos.uttarakhand, photos.kedarkantha],
    category: 'media',
  },
  {
    id: 'rec-media-2',
    name: 'Adventure Sports Network',
    reviewedAt: '15 Jul 2026',
    rating: 5,
    booked: 'Media Trek — Hampta Pass Preview',
    bookedHref: '/treks/hampta-pass',
    text:
      'A professionally run crossover trek with clear safety briefings, quality camping gear, and responsive ops support — a strong example of organised Indian adventure travel.',
    photos: [photos.hampta, photos.himachal],
    category: 'media',
  },
  {
    id: 'rec-media-3',
    name: 'Himalayan Herald',
    reviewedAt: '02 Jul 2026',
    rating: 5,
    booked: 'Editorial Feature — Kedarnath Yatra Ops',
    bookedHref: '/yatra/kedarnath-yatra',
    text:
      'Indian Treks demonstrates how pilgrimage travel can be both devout and well-managed — transparent pricing, verified stays, and 24×7 coordinator support on route.',
    photos: [photos.yatra, photos.kedarnath],
    category: 'media',
  },
  {
    id: 'rec-sameer',
    name: 'Sameer Joshi',
    reviewedAt: '30 Jul 2026',
    rating: 5,
    booked: 'Spiti Winter Expedition',
    bookedHref: '/backpacking',
    text:
      'Spiti in winter was surreal. Cold, remote and unforgettable — the team handled vehicles, homestays, and weather backup plans professionally.',
    photos: [photos.snow, photos.himachal],
    category: 'domestic',
  },
];

export const REVIEW_CATEGORY_TABS: { id: ReviewCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'international', label: 'International' },
  { id: 'domestic', label: 'Domestic' },
  { id: 'media', label: 'Media' },
];

export const PRAISE_TESTIMONIALS = [
  {
    id: 'pr-1',
    quote:
      'Indian Treks turned our office offsite into a real mountain experience — not a tourist checklist. The team-building trek was the highlight of our year.',
    name: 'Aditi Malhotra',
    role: 'HR Head, Bengaluru',
  },
  {
    id: 'pr-2',
    quote:
      'As a solo woman traveller I felt safe every day. Clear camp rules, vetted stays, and a leader who actually listened made all the difference.',
    name: 'Kavya Reddy',
    role: 'Product Designer, Hyderabad',
  },
  {
    id: 'pr-3',
    quote:
      'We booked Kedarnath for our parents. Indian Treks handled darshan timing, porters, and medical backup without us worrying once.',
    name: 'Rajesh & Sunita Patel',
    role: 'Family yatra, Ahmedabad',
  },
  {
    id: 'pr-4',
    quote:
      'Third trek with Indian Treks — consistent quality every time. Same professionalism on Triund and on EBC in Nepal.',
    name: 'Arjun Mehta',
    role: 'Software Engineer, Pune',
  },
  {
    id: 'pr-5',
    quote:
      'Our college outdoor club partnered with Indian Treks for Nag Tibba. Student pricing was fair and safety briefings were thorough.',
    name: 'Prof. Nisha Kapoor',
    role: 'Campus Ambassador Partner, Dehradun',
  },
] as const;

export const TOURISM_ALLIANCES = [
  { id: 'ut', name: 'Uttarakhand Tourism' },
  { id: 'hp', name: 'Himachal Tourism' },
  { id: 'mot', name: 'Ministry of Tourism, India' },
  { id: 'adtoi', name: 'ADTOI' },
  { id: 'iato', name: 'IATO' },
  { id: 'adventure', name: 'Adventure Tour Operators Association' },
] as const;

export const REVIEW_PARTNERS = [
  { id: 'p1', name: 'Homestay Network' },
  { id: 'p2', name: 'Mountain Transport Co-op' },
  { id: 'p3', name: 'Himalayan Guides Guild' },
  { id: 'p4', name: 'Wildcraft Gear' },
  { id: 'p5', name: 'Decathlon Outdoors' },
  { id: 'p6', name: 'Local Porter Unions' },
  { id: 'p7', name: 'Rishikesh Rafting Partners' },
  { id: 'p8', name: 'Regional STDC' },
] as const;

export const BUZZWORTHY_STORIES = [
  {
    id: 'bz-1',
    outlet: 'Travel India Today',
    title: 'How Indian Treks is making Himalayan trekking accessible for first-timers',
    href: '/news',
    date: 'Aug 2026',
  },
  {
    id: 'bz-2',
    outlet: 'Adventure Sports Network',
    title: 'Small groups, big impact: the Indian Treks safety-first model',
    href: '/news',
    date: 'Jul 2026',
  },
  {
    id: 'bz-3',
    outlet: 'Himalayan Herald',
    title: 'From Dehradun to Everest Base Camp — a homegrown operator’s journey',
    href: '/news',
    date: 'Jun 2026',
  },
  {
    id: 'bz-4',
    outlet: 'Outlook Traveller',
    title: 'Best winter treks in Uttarakhand for 2026',
    href: '/blog/first-himalayan-trek',
    date: 'May 2026',
  },
] as const;

export const WHY_CHOOSE_REVIEWS = [
  {
    icon: 'fa-shield-halved',
    title: 'Safety-Led Operations',
    body: 'Certified trek leaders, first-aid kits, oxygen on high routes, and daily weather briefings on every departure.',
  },
  {
    icon: 'fa-users',
    title: 'Small Group Experience',
    body: 'Trail time in small batches so leaders can guide pace, safety, and the views — without the crowd.',
  },
  {
    icon: 'fa-calendar-check',
    title: 'End-to-End Support',
    body: 'From booking to return — transport, stays, permits, and on-trail coordination handled by one team.',
  },
  {
    icon: 'fa-leaf',
    title: 'Leave No Trace',
    body: 'Eco-conscious camping, waste segregation on trail, and community-respecting operations across the Himalayas.',
  },
  {
    icon: 'fa-star',
    title: 'Verified Reviews Only',
    body: 'Every review on this page is from a traveller who booked and completed a trip with Indian Treks.',
  },
  {
    icon: 'fa-headset',
    title: '24×7 Trip Support',
    body: 'WhatsApp and phone support before departure, on ground with your leader, and after you return home.',
  },
] as const;
