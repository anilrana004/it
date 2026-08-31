import type { Metadata } from 'next';
import GearRentalPageView from '@/components/rental/GearRentalPageView';
import { getGearRentalLandingArticles } from '@/lib/knowledge/landing-page-articles';

export const metadata: Metadata = {
  title: 'Gear Rental | Indian Treks',
  description:
    'Rent sanitised trekking shoes, jackets, backpacks, poles, and trail extras for Indian Treks Himalayan treks, yatras, and trips. Collect at base camp and travel light.',
};

export default async function GearRentalPage({
  searchParams,
}: {
  searchParams?: Promise<{ trek?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const blogArticles = await getGearRentalLandingArticles();
  return <GearRentalPageView initialTrekId={sp.trek} blogArticles={blogArticles} />;
}
