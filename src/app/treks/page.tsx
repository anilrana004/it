import { Suspense } from 'react';
import type { Metadata } from 'next';
import AllTreksExplorer from '@/components/treks/AllTreksExplorer';
import { getTreksLandingArticles } from '@/lib/knowledge/landing-page-articles';
import { getAllListingTreks, getTopCategories } from '@/lib/treks-listing';
import { WINTER_TREKS_SEO } from '@/lib/content/winter-treks-guide';

const DEFAULT_META = {
  title: 'Upcoming Treks 2026 | All Himalayan Treks | Indian Treks',
  description:
    'Browse upcoming Himalayan treks by month, difficulty, season, duration and region. Fixed departures across Uttarakhand, Himachal, Kashmir and Nepal with Indian Treks.',
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ season?: string }>;
}): Promise<Metadata> {
  const { season } = await searchParams;
  if (season === 'winter') {
    return {
      title: WINTER_TREKS_SEO.title,
      description: WINTER_TREKS_SEO.description,
    };
  }
  return DEFAULT_META;
}

function TreksFallback() {
  return (
    <div className="min-h-[50vh] bg-[#f6f8f6] py-16">
      <div className="container mx-auto text-center text-sm text-gray-500">Loading treks…</div>
    </div>
  );
}

export default async function TreksPage() {
  const listings = getAllListingTreks();
  const categories = getTopCategories(listings);
  const blogArticles = await getTreksLandingArticles();

  return (
    <Suspense fallback={<TreksFallback />}>
      <AllTreksExplorer
        treks={listings}
        categories={categories}
        year={2026}
        blogArticles={blogArticles}
      />
    </Suspense>
  );
}
