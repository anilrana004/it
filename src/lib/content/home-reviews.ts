import { photos } from '@/lib/media';

export type HomeReview = {
  id: string;
  name: string;
  avatar: string;
  text: string;
  trip: string;
  tripImg: string;
  tripHref: string;
};

export const HOME_REVIEWS_SECTION = {
  kicker: 'REVIEWS',
  title: 'What our Clients Say About Us',
  ratingLabel: '4.8 Rating',
  countLabel: '10,000+ Verified Reviews',
  readMoreLabel: 'Read more reviews',
  tryLabel: 'Try Yourself',
} as const;

export const HOME_REVIEWS: HomeReview[] = [
  {
    id: 'ankita-choudhary',
    name: 'Ankita Choudhary',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLm8pipAwjeBKv1ut2rnRx-unDhbdaXRVZvJLGR-jdys5moZw=s120-c-rp-mo-br100',
    text: 'I recently joined a Himalayan trek with Indian Treks. This was my first solo trip, and not once did I feel like I was traveling alone. The group was amazing.',
    trip: 'Valley of Flowers Trek',
    tripImg: photos.vof,
    tripHref: '/treks/valley-of-flowers',
  },
  {
    id: 'deepak-bansal',
    name: 'Deepak Bansal',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLOlBP7lkiIOZ8IMeMbiVYc1t1fnGr6Y3GJXTzjWu9QnV68uQ=s64-c-rp-mo-br100',
    text: 'Excellent service on our Himachal trip. I got sick mid-way but the way they handled it was just great. Highly professional team.',
    trip: 'Hampta Pass Trek',
    tripImg: photos.hampta,
    tripHref: '/treks/hampta-pass',
  },
  {
    id: 'shivanand-pujari',
    name: 'Shivanand Pujari',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJFNs8uv9JSKBoUmiIh0ADF8rokVBkICM2cc2yVxqdgQSF9rw=s64-c-rp-mo-br100',
    text: 'Had an amazing Kedarnath yatra experience. Our trip leaders were supportive and the whole pilgrimage felt well organised.',
    trip: 'Kedarnath Yatra',
    tripImg: photos.yatra,
    tripHref: '/yatra/kedarnath-yatra',
  },
];
