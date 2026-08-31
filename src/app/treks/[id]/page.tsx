import { notFound } from 'next/navigation';
import { treks, getTrekById } from '@/lib/data';
import TrekDetailContent from '@/components/TrekDetailContent';
import { fetchRelatedBlogPosts } from '@/lib/knowledge/adapter';

export const dynamicParams = true;
export const revalidate = 300;

export function generateStaticParams() {
  return treks.map((t) => ({ id: t.id }));
}

export default async function TrekDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ guests?: string; date?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const trek = getTrekById(id);
  if (!trek) notFound();
  const guests = Number(sp?.guests || '');
  const initialGuests = Number.isFinite(guests) && guests >= 1 ? Math.min(20, Math.floor(guests)) : 1;
  const relatedBlogPosts = await fetchRelatedBlogPosts(trek, 3, 'trek');

  return (
    <TrekDetailContent
      trek={trek}
      type={trek.type === 'yatra' ? 'yatra' : 'trek'}
      initialGuests={initialGuests}
      relatedBlogPosts={relatedBlogPosts}
    />
  );
}
