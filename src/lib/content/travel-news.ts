export type TravelNewsItem = {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  tag: string;
  image?: string;
};

export const travelNewsItems: TravelNewsItem[] = [
  {
    slug: 'india-immigration-boarding-pass-stamping',
    title: "India's Immigration to End Boarding Pass Stamping from September 1",
    publishedAt: '2026-08-27',
    summary:
      'From September 2026, international travellers departing India may no longer need physical boarding pass stamps at immigration — what it means for your next Himalayan trip.',
    tag: 'Travel Policy',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=675&fit=crop',
  },
  {
    slug: 'maharashtra-adventure-tourism-policy',
    title:
      'Maharashtra Adventure Tourism Policy: Key Safety Guidelines for Travelers & Operators',
    publishedAt: '2026-08-26',
    summary:
      'New safety frameworks for trekking, camping, and adventure activities across Maharashtra — a quick guide for travellers and outfitters.',
    tag: 'Policy',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=675&fit=crop',
  },
  {
    slug: 'kerala-renamed-keralam',
    title: 'Kerala Is Now Keralam: President Murmu Gives Assent to the Bill',
    publishedAt: '2026-08-21',
    summary:
      'The official name change and what it means for travel documents, signage, and planning trips to God\'s Own Country.',
    tag: 'India News',
    image: 'https://images.unsplash.com/photo-1593693411515-074ea5b7a870?w=1200&h=675&fit=crop',
  },
  {
    slug: 'abu-dhabi-free-visa-indian-tourists-2026',
    title: 'Abu Dhabi Free Visa Offer for Indian Tourists: Everything You Need to Know in 2026',
    publishedAt: '2026-08-20',
    summary:
      'Eligibility, validity windows, and how Indian passport holders can use the latest UAE visa incentives for stopovers and holidays.',
    tag: 'International',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&h=675&fit=crop',
  },
  {
    slug: 'butter-festival-dayara-bugyal',
    title: 'Why Is the Butter Festival of Dayara Bugyal, Uttarakhand, in the News?',
    publishedAt: '2026-08-12',
    summary:
      'The ancient Anduri Utsav returns to the meadows of Dayara Bugyal — dates, rituals, and how to combine it with a trek.',
    tag: 'Uttarakhand',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=675&fit=crop',
  },
  {
    slug: 'indian-treks-winter-departures-2026',
    title: 'Indian Treks Expands Winter Departures Across Uttarakhand',
    publishedAt: '2026-01-15',
    summary:
      'New Kedarkantha, Kuari Pass, and Chopta–Tungnath fixed departures added for the winter season with enhanced snow-route support.',
    tag: 'Company',
    image: 'https://images.unsplash.com/photo-1483728642387-6bc3bb38baf6?w=1200&h=675&fit=crop',
  },
  {
    slug: 'char-dham-kedarnath-yatra-2026',
    title: 'Char Dham & Kedarnath Yatra Assistance for 2026',
    publishedAt: '2025-12-10',
    summary:
      'Dedicated pilgrimage desk now supports Do Dham, Char Dham, and customised yatra planning with transport and stay coordination.',
    tag: 'Yatra',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&h=675&fit=crop',
  },
];

export function travelNewsDateLong(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function travelNewsPath(slug: string) {
  return `/blog/news/${slug}`;
}
