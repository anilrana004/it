import { notFound } from 'next/navigation';
import { treks } from '@/lib/data';
import TrekDetailContent from '@/components/TrekDetailContent';

export default async function TrekDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trek = treks.find(t => t.id === id);
  if (!trek) notFound();
  return <TrekDetailContent trek={trek} type="trek" />;
}
