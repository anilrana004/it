import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';
import { getSiteTreks, getSiteYatras, getSiteExpeditions } from '@/lib/catalog';

export default function DomesticToursPage() {
  const treks = getSiteTreks().filter((t) => t.region !== 'nepal');
  const yatras = getSiteYatras();
  const expeditions = getSiteExpeditions();

  const sections = [
    { title: 'Himalayan Treks', items: treks },
    { title: 'Yatra Packages', items: yatras },
    { title: 'Expeditions', items: expeditions },
  ].filter((s) => s.items.length > 0);

  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      <div className="container mx-auto">
        <div className="mb-8 lg:mb-12">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-[#000000] mb-2">Domestic Tours</h1>
          <p className="text-gray-600 text-sm lg:text-base max-w-2xl">
            All Himalayan treks, yatras and expeditions from the Indian Treks catalog — same packages as{' '}
            <a href="https://indiantreks.in/" className="text-[#16a34a] font-medium hover:underline" target="_blank" rel="noreferrer">
              indiantreks.in
            </a>
            .
          </p>
        </div>

        {sections.map((section) => (
          <div key={section.title} className="mb-12">
            <h2 className="text-xl lg:text-2xl font-bold text-[#000000] mb-5">{section.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
              {section.items.map((d) => (
                <Link
                  key={d.id}
                  href={d.href}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={d.img} alt={d.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-xs lg:text-sm text-gray-900 group-hover:text-[#16a34a] line-clamp-2">{d.title}</h3>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] lg:text-xs text-gray-500">
                      <span className="inline-flex items-center gap-0.5"><MapPin className="w-3 h-3" />{d.region}</span>
                      <span className="inline-flex items-center gap-0.5"><Clock className="w-3 h-3" />{d.dur}</span>
                    </div>
                    <div className="mt-2 text-[#16a34a] font-bold text-sm">Starts @ ₹{d.price.toLocaleString()}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
