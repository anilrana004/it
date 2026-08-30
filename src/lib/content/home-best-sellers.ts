export const HOME_BEST_SELLERS_TABS = [
  'Top Treks',
  'Yatras & Pilgrimages',
  'International Adventures',
] as const;

export type HomeBestSellersTab = (typeof HOME_BEST_SELLERS_TABS)[number];

export const HOME_BEST_SELLERS_SECTION = {
  kicker: 'BEST SELLERS',
  title: 'Our Best Selling Trips',
  viewAllLabel: 'View All Best Sellers',
  viewAllHref: '/best-sellers',
  payLaterLabel: 'Book Now, Pay Later',
} as const;

export const HOME_BEST_SELLERS_PROMO = {
  title: 'Bucket List Sale Active!',
  subtitle: 'Limited period discounts on handpicked trips',
  discountLabel: 'UP TO 40% OFF',
} as const;
