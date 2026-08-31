import type { LandingArticle } from '@/lib/landing-social-content';
import {
  backpackingArticles,
  bestSellersArticles,
  bikingArticles,
  bucketListSaleArticles,
  careersArticles,
  domesticArticles,
  internationalArticles,
  newLaunchesArticles,
  sacredYatraArticles,
  treksArticles,
  upcomingTripsArticles,
  weekendTripsArticles,
} from '@/lib/landing-social-content';
import { corporateArticles } from '@/lib/corporate/team-building-content';
import { campusLanding } from '@/lib/corporate/campus-landing';
import { giftLanding } from '@/lib/corporate/gift-landing';
import { schoolLanding } from '@/lib/corporate/school-landing';
import { getGearBlogArticlesSafe } from '@/lib/gear-rental';
import { beginnerLanding } from '@/lib/special-programs/beginner-landing';
import { familyLanding } from '@/lib/special-programs/family-landing';
import { womenOnlyLanding } from '@/lib/special-programs/women-only-landing';
import { fetchLandingBlogArticles } from '@/lib/knowledge/landing-placements';
export { mergeLandingArticles } from '@/lib/knowledge/landing-articles-utils';

function toArticles(
  items: Array<{ href: string; title: string; read: string; image: string; excerpt?: string }>,
): LandingArticle[] {
  return items.map((item) => ({
    href: item.href,
    title: item.title,
    read: item.read,
    image: item.image,
    excerpt: item.excerpt ?? '',
  }));
}

export async function getTreksLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-treks', treksArticles, limit);
}

export async function getBackpackingLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-backpacking', backpackingArticles, limit);
}

export async function getYatraLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-yatra', sacredYatraArticles, limit);
}

export async function getBikingLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-biking', bikingArticles, limit);
}

export async function getDomesticLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-domestic', domesticArticles, limit);
}

export async function getInternationalLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-international', internationalArticles, limit);
}

export async function getBestSellersLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-best-sellers', bestSellersArticles, limit);
}

export async function getUpcomingTripsLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-upcoming-trips', upcomingTripsArticles, limit);
}

export async function getNewLaunchesLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-new-launches', newLaunchesArticles, limit);
}

export async function getWeekendTripsLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-weekend-trips', weekendTripsArticles, limit);
}

export async function getBucketListSaleLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-bucket-list-sale', bucketListSaleArticles, limit);
}

export async function getCareersLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-careers', careersArticles, limit);
}

export async function getGearRentalLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-gear-rental', getGearBlogArticlesSafe(), limit);
}

export async function getCorporateLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-corporate', toArticles(corporateArticles), limit);
}

export async function getSchoolProgramsLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-school-programs', toArticles(schoolLanding.articles.items), limit);
}

export async function getCampusAmbassadorLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-campus-ambassador', toArticles(campusLanding.articles.items), limit);
}

export async function getTravelGiftCardsLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-travel-gift-cards', toArticles(giftLanding.articles.items), limit);
}

export async function getFamilyTreksLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-family-treks', toArticles(familyLanding.articles.items), limit);
}

export async function getBeginnerTreksLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-beginner-treks', toArticles(beginnerLanding.articles.items), limit);
}

export async function getWomenOnlyTreksLandingArticles(limit = 3) {
  return fetchLandingBlogArticles('landing-women-only-treks', toArticles(womenOnlyLanding.articles.items), limit);
}

export async function getSpecialProgramsHubLandingArticles(limit = 3) {
  const fallback: LandingArticle[] = [
    ...toArticles(familyLanding.articles.items),
    ...toArticles(beginnerLanding.articles.items),
    ...toArticles(womenOnlyLanding.articles.items),
  ].slice(0, limit);
  return fetchLandingBlogArticles('landing-special-programs-hub', fallback, limit);
}

/** Senior citizen page uses a bespoke article shape — mapped at the page level. */
export async function getSeniorCitizenLandingArticles(limit = 3) {
  const fallback: LandingArticle[] = [
    {
      href: '/blog/family-trekking-in-india',
      title: 'Family trekking in India — planning tips',
      read: '8 min read',
      excerpt: 'How to choose routes, pace, and stays when trekking with parents or children.',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=600&fit=crop',
    },
    {
      href: '/blog/first-himalayan-trek',
      title: '5 essential tips for your first Himalayan trek',
      read: '6 min read',
      excerpt: 'Training, packing, hydration, and choosing the right beginner route.',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=600&fit=crop',
    },
    {
      href: '/how-to-prepare',
      title: 'How to prepare for a Himalayan trek',
      read: '5 min read',
      excerpt: 'Fitness, gear, and altitude basics before you leave home.',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=600&fit=crop',
    },
  ];
  return fetchLandingBlogArticles('landing-senior-citizen', fallback, limit);
}
