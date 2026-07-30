import Link from 'next/link';
import { MapPin, Star, Clock, CheckCircle2, ArrowRight, Mountain, Route, Compass } from 'lucide-react';

const imgBase = 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_600,h_400,c_fill,g_auto/';

const himalayanTrek = [
  { name: 'Valley of Flowers Trek', loc: 'Uttarakhand', dur: '6D/5N', price: 8999, diff: 'Moderate', img: imgBase, href: '/treks/valley-of-flowers' },
  { name: 'Kedarkantha Trek', loc: 'Uttarakhand', dur: '5D/4N', price: 6999, diff: 'Easy-Moderate', img: imgBase, href: '/treks/kedarkantha' },
  { name: 'Hampta Pass Trek', loc: 'Himachal', dur: '5D/4N', price: 8499, diff: 'Moderate', img: imgBase, href: '/treks/hampta-pass' },
  { name: 'Chopta Tungnath Trek', loc: 'Uttarakhand', dur: '4D/3N', price: 5999, diff: 'Easy-Moderate', img: imgBase, href: '/treks/chopta-tungnath' },
  { name: 'Triund Trek', loc: 'Himachal', dur: '3D/2N', price: 2499, diff: 'Easy', img: imgBase, href: '/treks/mcleodganj-trek' },
  { name: 'Bhrigu Lake Trek', loc: 'Himachal', dur: '3D/2N', price: 4999, diff: 'Easy-Moderate', img: imgBase, href: '/treks/bhrigu-lake' },
];

const pilgrimageYatra = [
  { name: 'Kedarnath Yatra', loc: 'Uttarakhand', dur: '6D/5N', price: 9999, diff: 'Moderate', img: imgBase, href: '/yatra/kedarnath-yatra' },
  { name: 'Do Dham Yatra', loc: 'Uttarakhand', dur: '7D/6N', price: 14999, diff: 'Moderate', img: imgBase, href: '/yatra/do-dham' },
  { name: 'Char Dham Yatra', loc: 'Uttarakhand', dur: '12D/11N', price: 24999, diff: 'Challenging', img: imgBase, href: '/yatra/char-dham' },
  { name: 'Panch Kedar Yatra', loc: 'Uttarakhand', dur: '10D/9N', price: 19999, diff: 'Moderate', img: imgBase, href: '/yatra/panch-kedar' },
];

const backpackingGets = [
  { name: 'Rishikesh Adventure', loc: 'Uttarakhand', dur: '3D/2N', price: 3999, diff: 'Easy', img: imgBase, href: '/treks' },
  { name: 'Manali Escape', loc: 'Himachal', dur: '4D/3N', price: 5999, diff: 'Easy', img: imgBase, href: '/treks/hampta-pass' },
  { name: 'Kasol & Parvati Valley', loc: 'Himachal', dur: '4D/3N', price: 4999, diff: 'Easy', img: imgBase, href: '/treks/kheerganga' },
  { name: 'Spiti Valley Expedition', loc: 'Himachal', dur: '8D/7N', price: 15999, diff: 'Moderate', img: imgBase, href: '/treks/hampta-pass' },
];

const howSteps = [
  { num: '01', title: 'Choose Your Destination', desc: 'Browse our curated domestic packages across India' },
  { num: '02', title: 'Customize Your Trip', desc: 'Tell us your preferences, group size, and budget' },
  { num: '03', title: 'Get Instant Confirmation', desc: 'Receive detailed itinerary and book with easy EMI options' },
  { num: '04', title: 'Travel with Confidence', desc: 'Expert guides, safe logistics, and 24/7 support' },
];

const whyUs = [
  '9+ years of experience in Himalayan travel',
  'Certified trek leaders with first-aid training',
  'Sustainable and responsible tourism practices',
  '50,000+ happy travelers across India',
  'Flexible booking with free cancellation',
  'Customized private tours available',
];

function CardGrid({ items }: { items: typeof himalayanTrek }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
      {items.map(d => (
        <Link key={d.name} href={d.href} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
          <div className="relative h-40 lg:h-48 overflow-hidden">
            <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="p-4">
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-1"><MapPin className="w-3 h-3" />{d.loc} · {d.dur}</div>
            <h3 className="font-bold text-base lg:text-lg text-[#000000] group-hover:text-[#ffaf21] transition-colors">{d.name}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[#ffaf21] font-bold text-base">₹{d.price.toLocaleString()}+</span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{d.diff}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function DomesticToursPage() {
  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      <section className="bg-gradient-to-r from-[#000000] to-[#000000] py-10 lg:py-16 mb-10 lg:mb-16">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Compass className="w-6 h-6 lg:w-8 lg:h-8 text-[#ffaf21]" />
            <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white">Domestic Tours — Explore India</h1>
          </div>
          <p className="text-white/70 text-sm lg:text-lg max-w-2xl mx-auto">From the Himalayan peaks of Uttarakhand to the spiritual trails of Char Dham, discover the best of India with handpicked domestic tour packages.</p>
        </div>
      </section>

      <div className="container mx-auto">
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Mountain className="w-6 h-6 lg:w-7 lg:h-7 text-[#ffaf21]" />
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000]">Himalayan Trekking Packages</h2>
              <p className="text-gray-500 text-sm">Conquer the trails that define India&apos;s wild beauty</p>
            </div>
          </div>
          <CardGrid items={himalayanTrek} />
        </div>

        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Route className="w-6 h-6 lg:w-7 lg:h-7 text-[#ffaf21]" />
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000]">Pilgrimage Yatra Packages</h2>
              <p className="text-gray-500 text-sm">Sacred journeys through the divine Himalayas</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {pilgrimageYatra.map(d => (
              <Link key={d.name} href={d.href} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                <div className="relative h-40 lg:h-48 overflow-hidden">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1"><MapPin className="w-3 h-3" />{d.loc} · {d.dur}</div>
                  <h3 className="font-bold text-base lg:text-lg text-[#000000] group-hover:text-[#ffaf21] transition-colors">{d.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[#ffaf21] font-bold text-base">₹{d.price.toLocaleString()}+</span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{d.diff}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Compass className="w-6 h-6 lg:w-7 lg:h-7 text-[#ffaf21]" />
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000]">Backpacking &amp; Weekend Getaways</h2>
              <p className="text-gray-500 text-sm">Short escapes that leave you refreshed and inspired</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {backpackingGets.map(d => (
              <Link key={d.name} href={d.href} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                <div className="relative h-40 lg:h-48 overflow-hidden">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1"><MapPin className="w-3 h-3" />{d.loc} · {d.dur}</div>
                  <h3 className="font-bold text-base lg:text-lg text-[#000000] group-hover:text-[#ffaf21] transition-colors">{d.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[#ffaf21] font-bold text-base">₹{d.price.toLocaleString()}+</span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{d.diff}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 lg:p-10 mb-12 lg:mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-[#000000] text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howSteps.map(s => (
              <div key={s.num} className="text-center">
                <div className="w-12 h-12 bg-[#ffaf21] text-gray-900 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">{s.num}</div>
                <h3 className="font-bold text-sm lg:text-base text-[#000000] mb-1.5">{s.title}</h3>
                <p className="text-gray-500 text-xs lg:text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12 lg:mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000] text-center mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyUs.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#ffaf21] shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm lg:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#ffaf21] to-[#d49400] rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mb-2">Ready to Explore India?</h2>
          <p className="text-white/80 text-sm lg:text-base mb-6 max-w-lg mx-auto">Get in touch with our travel experts and receive a free quote within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+919797972175" className="inline-flex items-center gap-2 bg-white text-[#ffaf21] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-all text-sm"><ArrowRight className="w-4 h-4" />Call +91 97 97 97 21 75</a>
            <a href="mailto:hello@trekroot.com" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/20 transition-all text-sm">Email Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
