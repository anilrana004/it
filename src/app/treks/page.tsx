import { treks } from '@/lib/data';
import TrekCard from '@/components/TrekCard';

export default async function TreksPage(props: { searchParams?: Promise<{ region?: string; difficulty?: string }> }) {
  const sp = await props.searchParams;
  let filtered = treks.filter(t => t.type === 'trek');
  if (sp?.region) filtered = filtered.filter(t => t.region === sp.region);
  if (sp?.difficulty) filtered = filtered.filter(t => t.difficulty.toLowerCase().includes(sp.difficulty!.toLowerCase()));

  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-[#000000] mb-2">
            {sp?.region ? `${sp.region.charAt(0).toUpperCase()+sp.region.slice(1)} Treks` : sp?.difficulty ? `${sp.difficulty} Treks` : 'All Treks'}
          </h1>
          <p className="text-gray-600">Explore our curated collection of Himalayan treks</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filtered.map(t => <TrekCard key={t.id} trek={t} />)}
        </div>
        {filtered.length === 0 && <div className="text-center py-20 text-gray-500">No treks found in this category.</div>}
      </div>
    </div>
  );
}
