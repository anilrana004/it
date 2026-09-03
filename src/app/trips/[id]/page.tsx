import { notFound } from 'next/navigation';
import { treks, getTrekById } from '@/lib/data';
import TrekDetailContent from '@/components/TrekDetailContent';
import { fetchRelatedBlogPosts } from '@/lib/knowledge/adapter';

export const dynamicParams = true;
export const revalidate = 300;

export function generateStaticParams() {
  return treks.map((t) => ({ id: t.id }));
}

export default async function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trek = getTrekById(id);
  if (!trek) notFound();
  const relatedBlogPosts = await fetchRelatedBlogPosts(trek, 3, 'trip');

  return (
    <TrekDetailContent
      trek={trek}
      type="trip"
      relatedBlogPosts={relatedBlogPosts}
    />
  );
}
