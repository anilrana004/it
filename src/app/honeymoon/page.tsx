import Link from 'next/link';
import { MapPin, Star, Clock, Heart, Camera, Home, CheckCircle2, ArrowRight } from 'lucide-react';

const trekkingPkg = [
  { name: 'Chopta Tungnath Trek', loc: 'Uttarakhand  -  Mini Switzerland', dur: '4D/3N', price: 18500, tag: 'Most Romantic', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_600,h_400,c_fill,g_auto/', href: '/treks/chopta-tungnath' },
  { name: 'Triund Trek', loc: 'Himachal  -  Dhauladhar Views', dur: '3D/2N', price: 12999, tag: 'Couples Choice', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_600,h_400,c_fill,g_auto/', href: '/treks/mcleodganj-trek' },
  { name: 'Dayara Bugyal Trek', loc: 'Uttarakhand  -  Alpine Meadows', dur: '5D/4N', price: 16999, tag: 'Scenic', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_600,h_400,c_fill,g_auto/', href: '/treks/dayara-bugyal' },
  { name: 'Nag Tibba Trek', loc: 'Uttarakhand  -  Weekend Trek', dur: '2D/1N', price: 7999, tag: 'Quick Escape', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_600,h_400,c_fill,g_auto/', href: '/treks/nag-tibba' },
  { name: 'Kheerganga Trek', loc: 'Himachal  -  Hot Springs', dur: '3D/2N', price: 9999, tag: 'Hot Springs', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_600,h_400,c_fill,g_auto/', href: '/treks/kheerganga' },
  { name: 'Beas Kund Trek', loc: 'Himachal  -  Solang Valley', dur: '4D/3N', price: 14999, tag: 'Valley Trek', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_600,h_400,c_fill,g_auto/', href: '/treks/beas-kund' },
];

const getawayPkg = [
  { name: 'Valley of Flowers Trek', loc: 'Uttarakhand', dur: '6D/5N', price: 8999, tag: 'UNESCO Paradise', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_600,h_400,c_fill,g_auto/', href: '/treks/valley-of-flowers' },
  { name: 'Kedarkantha Trek', loc: 'Uttarakhand', dur: '5D/4N', price: 6999, tag: 'Winter Wonderland', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_600,h_400,c_fill,g_auto/', href: '/treks/kedarkantha' },
  { name: 'Annapurna Base Camp', loc: 'Nepal', dur: '8D/7N', price: 34999, tag: 'International', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_600,h_400,c_fill,g_auto/', href: '/treks/annapurna-base-camp' },
  { name: 'Sar Pass Trek', loc: 'Himachal', dur: '5D/4N', price: 6999, tag: 'Scenic', img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_600,h_400,c_fill,g_auto/', href: '/treks/sar-pass' },
];

const highlights = [
  { icon: Heart, title: 'Private Candlelight Dinners', desc: 'Romantic dinners with Himalayan views at our exclusive campsites' },
  { icon: Star, title: 'Stargazing Nights', desc: 'Sleep under the clearest skies  -  Chopta and Tirthan Valley are known for celestial views' },
  { icon: Camera, title: 'Photography Coverage', desc: 'Capture your special moments with optional professional photography' },
  { icon: Home, title: 'Premium Accommodation', desc: 'Handpicked boutique stays, riverside cottages, and luxury camps' },
];

const reasons = [
  'Intimate group sizes (max 8-10 people)',
  'Private tent accommodations for couples',
  'Easy to moderate difficulty  -  no prior experience needed',
  'Flexible itineraries  -  add spa, private transfers, or extended stays',
  'All meals included with special couple dining arrangements',
];

function PackageCard({ pkg, roseTag }: { pkg: typeof trekkingPkg[0]; roseTag?: boolean }) {
  return (
    <Link href={pkg.href} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
      <div className="relative h-44 lg:h-48 overflow-hidden">
        <img src={pkg.img} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className={`absolute top-3 right-3 text-white text-[10px] font-semibold px-3 py-1 rounded-full ${roseTag ? 'bg-gradient-to-r from-rose-500 to-pink-600' : 'bg-[#16a34a]/90'}`}>{pkg.tag}</div>
      </div>
      <div className="p-4 lg:p-5">
        <div className="flex items-center gap-1 text-gray-400 text-[11px] lg:text-xs mb-1">
          <MapPin className="w-3 h-3" />{pkg.loc}
        </div>
        <h3 className="font-bold text-sm lg:text-base text-[#000000] group-hover:text-[#16a34a] transition-colors line-clamp-1">{pkg.name}</h3>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1.5 mb-3">
          <Clock className="w-3 h-3" />{pkg.dur}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-[#16a34a] font-bold text-sm lg:text-base">₹{pkg.price.toLocaleString()}</span>
          <span className="text-[#16a34a] group-hover:translate-x-1 transition-transform"><ArrowRight className="w-4 h-4" /></span>
        </div>
      </div>
    </Link>
  );
}

export default function HoneymoonPage() {
  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#000000] to-[#000000] py-10 lg:py-16 mb-10 lg:mb-16">
        <div className="container mx-auto text-center">
          <Heart className="w-10 h-10 lg:w-14 lg:h-14 text-[#16a34a] mx-auto mb-4" />
          <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white mb-3">Honeymoon Trips  -  Romantic Himalayan Escapes</h1>
          <p className="text-white/70 text-sm lg:text-lg max-w-2xl mx-auto">Celebrate your love amidst snow-capped peaks, serene meadows, and starlit skies. Handpicked romantic getaways for couples.</p>
        </div>
      </section>

      <div className="container mx-auto">
        {/* Section 1: Romantic Trekking Experiences */}
        <div className="mb-12 lg:mb-20">
          <div className="text-center mb-8 lg:mb-10">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000] mb-2">Romantic Trekking Experiences</h2>
            <p className="text-gray-500 text-sm">Handpicked treks designed for couples seeking adventure & intimacy</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {trekkingPkg.map(p => (
              <PackageCard key={p.name} pkg={p} roseTag />
            ))}
          </div>
        </div>

        {/* Section 2: Romantic Hill Station Getaways */}
        <div className="mb-12 lg:mb-20">
          <div className="text-center mb-8 lg:mb-10">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000] mb-2">Romantic Hill Station Getaways</h2>
            <p className="text-gray-500 text-sm">Scenic escapes perfect for honeymooners looking to relax & explore</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {getawayPkg.map(p => (
              <PackageCard key={p.name} pkg={p} />
            ))}
          </div>
        </div>

        {/* Section 3: Honeymoon Highlights */}
        <div className="mb-12 lg:mb-20">
          <div className="text-center mb-8 lg:mb-10">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000] mb-2">Honeymoon Highlights</h2>
            <p className="text-gray-500 text-sm">Special touches that make your romantic getaway unforgettable</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {highlights.map(h => {
              const Icon = h.icon;
              return (
                <div key={h.title} className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-sm lg:text-base text-[#000000] mb-2">{h.title}</h3>
                  <p className="text-gray-500 text-xs lg:text-sm leading-relaxed">{h.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Perfect for Couples */}
        <div className="bg-gray-50 rounded-2xl p-6 lg:p-10 mb-12 lg:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000] mb-4">Perfect for Couples</h2>
              <p className="text-gray-500 text-sm mb-6">Every detail is designed to make your honeymoon as romantic and stress-free as possible.</p>
              <ul className="space-y-3">
                {reasons.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-xl overflow-hidden h-64 lg:h-80">
              <img src="https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_600,h_400,c_fill,g_auto/" alt="Couple in the Himalayas" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mb-2">Plan Your Romantic Escape</h2>
          <p className="text-white/80 text-sm lg:text-base mb-6 max-w-lg mx-auto">Let us craft the perfect honeymoon itinerary for you.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+919999999999" className="inline-flex items-center gap-2 bg-white text-rose-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-all text-sm">Call +91 99 99 99 99 99</a>
            <a href="mailto:hello@indiantreks.com" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/20 transition-all text-sm">Email Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
