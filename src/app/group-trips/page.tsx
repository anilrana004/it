import Link from 'next/link';
import { ArrowRight, Users, Mountain, Bike, Heart } from 'lucide-react';
import { photos } from '@/lib/media';

const categories = [
  { title: 'Himalayan Treks', desc: 'Valley of Flowers, Kedarkantha, Hampta & more', href: '/treks', img: photos.uttarakhand, icon: Mountain },
  { title: 'Sacred Yatras', desc: 'Kedarnath, Do Dham, Char Dham pilgrimages', href: '/yatra', img: photos.yatra, icon: Heart },
  { title: 'Backpacking Trips', desc: 'Kasol, Manali, Spiti & Nepal circuits', href: '/backpacking', img: photos.himachal, icon: Users },
  { title: 'Biking Expeditions', desc: 'Mountain roads, group rides & scenic routes', href: '/biking', img: photos.snow, icon: Bike },
  { title: 'Weekend Trips', desc: '2–3 day escapes — Triund, Nag Tibba & more', href: '/weekend-trips', img: photos.triund, icon: Mountain },
  // Available under Customized / Trending — keep routes for later:
  // { title: 'Domestic Tours', desc: 'Curated India packages for every group', href: '/domestic-tours', img: photos.chopta, icon: Users },
  // { title: 'International Getaways', desc: 'Nepal, EBC, Annapurna & beyond', href: '/international-getaways', img: photos.nepal, icon: Mountain },
];

export default function GroupTripsPage() {
  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      <section className="bg-gradient-to-br from-[#000000] to-[#14532d] py-12 lg:py-16 mb-8 lg:mb-12">
        <div className="container mx-auto text-center px-4">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white mb-3">Group Trips</h1>
          <p className="text-white/70 text-sm lg:text-lg max-w-2xl mx-auto">
            Join fixed departures with like-minded travellers — treks, yatras, backpacking and biking adventures.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(c => {
            const Icon = c.icon;
            return (
              <Link key={c.title} href={c.href} className="group relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img src={c.img} alt={c.title} referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="w-9 h-9 rounded-full bg-[#16a34a] flex items-center justify-center mb-2">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-white font-bold text-lg">{c.title}</h2>
                  <p className="text-white/75 text-xs mt-1 mb-2">{c.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[#86efac] text-xs font-semibold">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
