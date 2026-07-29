import Link from 'next/link';
import { MapPin, Star, CheckCircle2 } from 'lucide-react';

const intlPkg = [
  { name: 'Nepal Treks', count: 6, img: 'https://images.unsplash.com/photo-1543429257-3eb0b65d9c10?w=600&h=400&fit=crop', price: 18500, href: '/treks?region=nepal' },
  { name: 'Everest Base Camp', count: 5, img: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&h=400&fit=crop', price: 74999, href: '/treks/everest-base-camp' },
  { name: 'Annapurna Trek', count: 4, img: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=600&h=400&fit=crop', price: 34999, href: '/treks/annapurna-base-camp' },
  { name: 'Chitwan Safari', count: 3, img: 'https://images.unsplash.com/photo-1549366021-9f761d450616?w=600&h=400&fit=crop', price: 21999, href: '/treks/chitwan-safari' },
  { name: 'Pokhara Tour', count: 4, img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop', price: 19999, href: '/treks/pokhara-tour' },
  { name: 'Kathmandu Tour', count: 3, img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop', price: 19999, href: '/treks/kathmandu-tour' },
  { name: 'Nepal Circuit', count: 4, img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop', price: 34999, href: '/treks/nepal-backpacking' },
];

const indiaPkg = [
  { name: 'Uttarakhand', count: 13, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop', price: 2499, href: '/treks?region=uttarakhand' },
  { name: 'Himachal', count: 16, img: 'https://images.unsplash.com/photo-1586350977770-2598f1b6b7c8?w=600&h=400&fit=crop', price: 2499, href: '/treks?region=himachal' },
  { name: 'Char Dham Yatra', count: 12, img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop', price: 34999, href: '/yatra/char-dham' },
  { name: 'Kedarnath Yatra', count: 8, img: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=600&h=400&fit=crop', price: 9999, href: '/yatra/kedarnath-yatra' },
  { name: 'Valley of Flowers', count: 6, img: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&h=400&fit=crop', price: 8999, href: '/treks/valley-of-flowers' },
  { name: 'Kedarkantha Trek', count: 5, img: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=400&fit=crop', price: 6999, href: '/treks/kedarkantha' },
  { name: 'Spiti Valley', count: 8, img: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=600&h=400&fit=crop', price: 9999, href: '/treks?region=himachal' },
  { name: 'Kasol & Parvati', count: 6, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop', price: 2999, href: '/treks/kheerganga' },
];

export default function CustomizedPage() {
  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#040921] to-[#040921] py-10 lg:py-16 mb-10 lg:mb-16">
        <div className="container mx-auto text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white mb-3">Customised Tour Packages</h1>
          <p className="text-white/70 text-sm lg:text-lg max-w-2xl mx-auto">Tailor-made travel experiences designed around your preferences, budget, and dreams. Tell us where you want to go and we&apos;ll craft the perfect journey.</p>
        </div>
      </section>

      <div className="container mx-auto">
        {/* International Section */}
        <div className="mb-12 lg:mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">✈️</span>
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#040921]">Customised Nepal Tour Packages</h2>
              <p className="text-gray-500 text-sm">Starting from ₹18,500 per person</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {intlPkg.map(d => (
              <Link key={d.name} href={d.href} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                <div className="relative h-36 lg:h-40 overflow-hidden">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-base lg:text-lg text-[#040921] group-hover:text-[#afde1e] transition-colors">{d.name}</h3>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-gray-500">{d.count}+ Packages</span>
                    <span className="text-[#afde1e] font-bold text-sm">₹{d.price.toLocaleString()}+</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* India Section */}
        <div className="mb-12 lg:mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">🇮🇳</span>
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#040921]">Customised India Tour Packages</h2>
              <p className="text-gray-500 text-sm">Starting from ₹2,499 per person</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {indiaPkg.map(d => (
              <Link key={d.name} href={d.href} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                <div className="relative h-36 lg:h-40 overflow-hidden">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-base lg:text-lg text-[#040921] group-hover:text-[#afde1e] transition-colors">{d.name}</h3>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-gray-500">{d.count}+ Packages</span>
                    <span className="text-[#afde1e] font-bold text-sm">₹{d.price.toLocaleString()}+</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-gray-50 rounded-2xl p-6 lg:p-10 mb-12 lg:mb-20">
          <h2 className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-[#040921] text-center mb-8">How Customised Tour Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Tell Us Your Preferences', desc: 'Share your dream destination, travel dates, group size, and budget preferences with our travel experts.' },
              { step: '02', title: 'Get a Tailored Itinerary', desc: 'Our team designs a personalized itinerary crafted around your interests, pace, and requirements.' },
              { step: '03', title: 'Review & Refine', desc: 'Review the proposed plan, suggest changes, and refine it until it matches your vision perfectly.' },
              { step: '04', title: 'Book & Travel', desc: 'Confirm your booking and embark on a seamless, stress-free journey crafted just for you.' },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-[#afde1e] text-gray-900 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">{s.step}</div>
                <h3 className="font-bold text-sm lg:text-base text-[#040921] mb-1.5">{s.title}</h3>
                <p className="text-gray-500 text-xs lg:text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#afde1e] to-[#8cb818] rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold mb-2">Ready to Plan Your Dream Trip?</h2>
          <p className="text-white/80 text-sm lg:text-base mb-6 max-w-lg mx-auto">Get in touch with our travel experts and receive a free, no-obligation quote within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+919999999999" className="inline-flex items-center gap-2 bg-white text-[#afde1e] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-all text-sm">Call +91 99 99 99 99 99</a>
            <a href="mailto:hello@trekroot.com" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/20 transition-all text-sm">Email Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
