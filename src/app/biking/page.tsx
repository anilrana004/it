import Link from 'next/link';
import { ArrowRight, Bike, MapPin, Clock } from 'lucide-react';
import { photos } from '@/lib/media';

const rides = [
  {
    title: 'Spiti Valley Bike Expedition',
    loc: 'Manali – Kaza – Manali',
    dur: '8D/7N',
    price: 24999,
    img: photos.snow,
    href: '/treks/hampta-pass',
    badge: 'Popular',
  },
  {
    title: 'Leh Ladakh Bike Trip',
    loc: 'Manali – Leh – Manali',
    dur: '11D/10N',
    price: 34999,
    img: photos.himachal,
    href: '/customized',
    badge: 'Bucket List',
  },
  {
    title: 'Uttarakhand Hills Ride',
    loc: 'Rishikesh – Chopta Circuit',
    dur: '5D/4N',
    price: 14999,
    img: photos.chopta,
    href: '/treks/chopta-tungnath',
    badge: 'Weekend',
  },
  {
    title: 'Nepal Motorbike Circuit',
    loc: 'Kathmandu – Pokhara',
    dur: '7D/6N',
    price: 42999,
    img: photos.nepal,
    href: '/treks/nepal-backpacking',
    badge: 'International',
  },
];

export default function BikingPage() {
  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      <section className="relative h-[38vh] min-h-[240px] overflow-hidden mb-10">
        <img src={photos.snow} alt="Biking Trips" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/25 flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-[#86efac] text-xs font-semibold tracking-widest uppercase mb-2">
              <Bike className="w-4 h-4" /> Biking Expeditions
            </div>
            <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white mb-2">
              Mountain Bike Trips
            </h1>
            <p className="text-white/80 text-sm lg:text-lg max-w-xl">
              Group rides across Spiti, Ladakh, Uttarakhand and Nepal — with support vehicles, stays and expert captains.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rides.map(r => (
            <Link key={r.title} href={r.href} className="group relative rounded-2xl overflow-hidden aspect-[3/4]">
              <img src={r.img} alt={r.title} referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full bg-[#16a34a] text-white">{r.badge}</span>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-1 text-white/70 text-[11px] mb-1">
                  <MapPin className="w-3 h-3" />{r.loc}
                </div>
                <h3 className="text-white font-bold text-sm leading-snug mb-1">{r.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-white/70 text-[11px]"><Clock className="w-3 h-3" />{r.dur}</span>
                  <span className="text-[#86efac] font-bold text-sm">₹{r.price.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/customized" className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-7 py-3 rounded-full transition-all">
            Customise a Bike Trip <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
