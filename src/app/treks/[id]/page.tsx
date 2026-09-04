import { notFound, redirect } from 'next/navigation';
import { treks, getTrekById, trekDetailPath } from '@/lib/data';
import TrekDetailContent from '@/components/TrekDetailContent';
import { fetchRelatedBlogPosts } from '@/lib/knowledge/adapter';
import { getPromoBanners } from '@/lib/trek-detail-content';

export const dynamicParams = true;
export const revalidate = 300;

export function generateStaticParams() {
  return treks.filter((t) => t.type === 'trek').map((t) => ({ id: t.id }));
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

  // Canonicalize aliased / legacy slugs (e.g. /treks/triund → /treks/mcleodganj-trek)
  const canonical = trekDetailPath(trek);
  if (trek.type === 'yatra') {
    redirect(canonical);
  }
  if (id !== trek.id) {
    const qs = new URLSearchParams();
    if (sp?.guests) qs.set('guests', sp.guests);
    if (sp?.date) qs.set('date', sp.date);
    const suffix = qs.toString() ? `?${qs.toString()}` : '';
    redirect(`${canonical}${suffix}`);
  }

  const guests = Number(sp?.guests || '');
  const initialGuests = Number.isFinite(guests) && guests >= 1 ? Math.min(20, Math.floor(guests)) : 1;
  const relatedBlogPosts = await fetchRelatedBlogPosts(trek, 3, 'trek');
  const promoBanners = getPromoBanners(trek);

  return (
    <TrekDetailContent
      trek={trek}
      type="trek"
      initialGuests={initialGuests}
      relatedBlogPosts={relatedBlogPosts}
      promoBanners={promoBanners}
    />
  );
}
