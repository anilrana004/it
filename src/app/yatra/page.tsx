import TrekCard from '@/components/TrekCard';
import { treks } from '@/lib/data';

export default async function YatraPage() {
  const yatras = treks.filter(t => t.type === 'yatra');
  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      <section className="relative h-[40vh] min-h-[280px] overflow-hidden mb-10">
        <img src="https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_1920,h_500,c_fill,g_auto/" alt="Sacred Yatras" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
          <div className="container mx-auto">
            <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white mb-2">Sacred Yatras</h1>
            <p className="text-gray-200 text-lg">Spiritual pilgrimages to the Himalayan shrines</p>
          </div>
        </div>
      </section>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {yatras.map(t => <TrekCard key={t.id} trek={t} />)}
        </div>
      </div>
    </div>
  );
}
