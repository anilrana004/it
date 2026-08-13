import { notFound } from 'next/navigation';
import { treks, getTrekById } from '@/lib/data';
import TrekDetailContent from '@/components/TrekDetailContent';

export const dynamicParams = true;

export function generateStaticParams() {
  return treks.map((t) => ({ id: t.id }));
}

export default async function TrekDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trek = getTrekById(id);
  if (!trek) notFound();
  return <TrekDetailContent trek={trek} type={trek.type === 'yatra' ? 'yatra' : 'trek'} />;
}
