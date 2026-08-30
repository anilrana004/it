export type HomeBackpackingTrip = {
  id: string;
  title: string;
  loc: string;
  dur: string;
  price: number;
  origPrice: number;
  rating: string;
  rev: string;
  img: string;
  href: string;
  badge?: string;
};

export const HOME_BACKPACKING_REGIONS = ['Uttarakhand', 'Himachal', 'International'] as const;

export type HomeBackpackingRegion = (typeof HOME_BACKPACKING_REGIONS)[number];

export const HOME_BACKPACKING_SECTION = {
  kicker: 'BACKPACKING',
  title: 'Backpacking Destinations',
  viewAllLabel: 'View All Backpacking',
  viewAllHref: '/backpacking',
  payLaterLabel: 'Book Now, Pay Later',
} as const;

export const HOME_BACKPACKING_TRIPS: Record<HomeBackpackingRegion, HomeBackpackingTrip[]> = {
  Uttarakhand: [
    { id: 'rishikesh-rafting-yoga', title: 'Rishikesh - River Rafting & Yoga Retreat', loc: 'Rishikesh', dur: '4D/3N', price: 4999, origPrice: 6999, rating: '4.7', rev: '10k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks', badge: 'Popular' },
    { id: 'auli-skiing', title: 'Auli - Skiing & Snow Adventure', loc: 'Auli', dur: '5D/4N', price: 8999, origPrice: 11999, rating: '4.8', rev: '6k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks', badge: 'Winter' },
    { id: 'munsiyari-views', title: 'Munsiyari - Panoramic Himalayan Views', loc: 'Munsiyari', dur: '4D/3N', price: 6999, origPrice: 8999, rating: '4.7', rev: '5k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks', badge: '' },
    { id: 'jim-corbett-safari', title: 'Jim Corbett - Wildlife Safari', loc: 'Jim Corbett', dur: '3D/2N', price: 5999, origPrice: 7999, rating: '4.6', rev: '8k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks', badge: 'Safari' },
    { id: 'jageshwar-nainital', title: 'Jageshwar Nainital - Temple Trails', loc: 'Nainital', dur: '3D/2N', price: 3999, origPrice: 5499, rating: '4.5', rev: '6k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks', badge: '' },
    { id: 'chakrata-weekend', title: 'Chakrata - Offbeat Weekend Escape', loc: 'Chakrata', dur: '3D/2N', price: 4499, origPrice: 5999, rating: '4.6', rev: '4k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks', badge: 'Offbeat' },
  ],
  Himachal: [
    { id: 'manali-adventures', title: 'Manali - Adventures in the Mountains', loc: 'Manali', dur: '4D/3N', price: 5999, origPrice: 7999, rating: '4.7', rev: '12k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/hampta-pass', badge: 'Popular' },
    { id: 'kasol-parvati', title: 'Kasol - Parvati Valley Backpacking', loc: 'Kasol', dur: '4D/3N', price: 4999, origPrice: 6999, rating: '4.6', rev: '8k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/kheerganga', badge: '' },
    { id: 'dharamshala-culture', title: 'Dharamshala McLeod Ganj - Tibetan Culture', loc: 'Dharamshala', dur: '4D/3N', price: 5499, origPrice: 7499, rating: '4.7', rev: '8k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/mcleodganj-trek', badge: '' },
    { id: 'bir-paragliding', title: 'Bir Billing - Paragliding Capital', loc: 'Bir', dur: '3D/2N', price: 3999, origPrice: 5499, rating: '4.8', rev: '10k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks', badge: 'Adventure' },
    { id: 'shimla-hills', title: 'Shimla - Queen of Hills', loc: 'Shimla', dur: '3D/2N', price: 4499, origPrice: 5999, rating: '4.5', rev: '10k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks', badge: '' },
    { id: 'spiti-summer', title: 'Spiti Valley - Summer Expedition', loc: 'Spiti', dur: '8D/7N', price: 15999, origPrice: 19999, rating: '4.8', rev: '6k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/hampta-pass', badge: 'Expedition' },
  ],
  International: [
    { id: 'kathmandu-valley', title: 'Kathmandu Valley Tour', loc: 'Kathmandu', dur: '5D/4N', price: 18999, origPrice: 23999, rating: '4.7', rev: '8k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/kathmandu-tour', badge: 'Cultural' },
    { id: 'pokhara-lakeside', title: 'Pokhara - Lakeside Paradise', loc: 'Pokhara', dur: '4D/3N', price: 15999, origPrice: 19999, rating: '4.8', rev: '6k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/pokhara-tour', badge: '' },
    { id: 'chitwan-safari', title: 'Chitwan - Jungle Safari', loc: 'Chitwan', dur: '4D/3N', price: 21999, origPrice: 27999, rating: '4.7', rev: '5k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/chitwan-safari', badge: 'Wildlife' },
    { id: 'nepal-backpacking', title: 'Nepal Backpacking Circuit', loc: 'Kathmandu', dur: '10D/9N', price: 34999, origPrice: 42999, rating: '4.8', rev: '6k+', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80', href: '/treks/nepal-backpacking', badge: 'Best Value' },
  ],
};
