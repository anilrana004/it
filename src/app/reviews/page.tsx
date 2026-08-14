import Link from 'next/link';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { photos } from '@/lib/media';

const reviews = [
  {
    name: 'Ankita Choudhary',
    city: 'Delhi',
    rating: 5,
    text: 'My first solo trip with Indian Treks and I never felt alone. The group was warm, logistics were smooth, and the guides made every day memorable.',
    trip: 'Valley of Flowers Trek',
    href: '/treks/valley-of-flowers',
    img: photos.vof,
  },
  {
    name: 'Deepak Bansal',
    city: 'Jaipur',
    rating: 5,
    text: 'Excellent service on the Himachal circuit. When I fell sick mid-trip, the team handled everything professionally. Highly recommended.',
    trip: 'Hampta Pass Trek',
    href: '/treks/hampta-pass',
    img: photos.hampta,
  },
  {
    name: 'Priya Deshmukh',
    city: 'Pune',
    rating: 5,
    text: 'Kedarnath Yatra was spiritual and well organised. Clean stays, clear briefings, and caring staff throughout.',
    trip: 'Kedarnath Yatra',
    href: '/yatra/kedarnath-yatra',
    img: photos.yatra,
  },
  {
    name: 'Rahul Sharma',
    city: 'Bengaluru',
    rating: 5,
    text: 'Everest Base Camp was the trek of a lifetime. Acclimatisation plan, gear support, and guide quality were top-notch.',
    trip: 'Everest Base Camp',
    href: '/treks/everest-base-camp',
    img: photos.ebc,
  },
  {
    name: 'Neha Gupta',
    city: 'Lucknow',
    rating: 5,
    text: 'Triund was perfect for a weekend escape. Great campsite, friendly group, and stunning Dhauladhar views.',
    trip: 'Triund Trek',
    href: '/treks/mcleodganj-trek',
    img: photos.triund,
  },
  {
    name: 'Amit Thakur',
    city: 'Chandigarh',
    rating: 5,
    text: 'As a solo traveller I was anxious, but Indian Treks made me feel safe. Made friends for life on Kedarkantha.',
    trip: 'Kedarkantha Trek',
    href: '/treks/kedarkantha',
    img: photos.kedarkantha,
  },
];

export default function ReviewsPage() {
  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      <section className="bg-gradient-to-br from-[#14532d] via-[#166534] to-[#16a34a] py-12 lg:py-16 mb-8 lg:mb-12">
        <div className="container mx-auto text-center px-4">
          <p className="text-white/80 text-xs font-semibold tracking-[0.25em] uppercase mb-2">Reviews</p>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white mb-3">
            What Travellers Say
          </h1>
          <div className="flex items-center justify-center gap-2 text-white">
            <div className="flex">{[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}</div>
            <span className="font-bold text-lg">4.8</span>
            <span className="text-white/70 text-sm">(10k+ verified reviews)</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {reviews.map(r => (
            <article key={r.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="relative h-36">
                <img src={r.img} alt={r.trip} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <Quote className="absolute bottom-3 left-3 w-5 h-5 text-white/80" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-0.5 mb-2">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{r.name}</div>
                    <div className="text-xs text-gray-400">{r.city}</div>
                  </div>
                  <Link href={r.href} className="text-xs font-semibold text-[#16a34a] hover:text-[#15803d] inline-flex items-center gap-1 shrink-0">
                    {r.trip} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/treks" className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-7 py-3 rounded-full transition-all">
            Explore Treks <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
