import Link from 'next/link';
import { ArrowRight, GraduationCap, Users, Gift, Megaphone } from 'lucide-react';
import { photos } from '@/lib/media';

const perks = [
  { icon: Gift, title: 'Travel Credits', desc: 'Earn free trek slots and exclusive discounts for every successful referral.' },
  { icon: Megaphone, title: 'Campus Leadership', desc: 'Represent Indian Treks at your college and build a real travel community.' },
  { icon: Users, title: 'Network & Mentorship', desc: 'Learn from trip leaders and grow with a nationwide student network.' },
  { icon: GraduationCap, title: 'Certificate & Experience', desc: 'Get a certificate, internship credit support, and portfolio-ready projects.' },
];

export default function CampusAmbassadorPage() {
  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      <section className="relative h-[38vh] min-h-[240px] overflow-hidden mb-10">
        <img src={photos.uttarakhand} alt="Campus Ambassador" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/30 flex items-center">
          <div className="container mx-auto px-4">
            <p className="text-[#86efac] text-xs font-semibold tracking-widest uppercase mb-2">Student Program</p>
            <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white mb-2">Campus Ambassador</h1>
            <p className="text-white/80 text-sm lg:text-lg max-w-xl">Lead, earn, and travel with Indian Treks — build your campus community of explorers.</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-10">
          {perks.map(p => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="w-10 h-10 rounded-full bg-[#dcfce7] flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#16a34a]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-[#14532d] rounded-2xl p-6 lg:p-8 text-white text-center">
          <h2 className="text-xl lg:text-2xl font-bold mb-2">Ready to apply?</h2>
          <p className="text-white/75 text-sm mb-5 max-w-lg mx-auto">Tell us about your campus and interest. Our team will reach out on WhatsApp within 24 hours.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/919797972175?text=${encodeURIComponent("Hi! I want to apply for the Indian Treks Campus Ambassador Program.")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-6 py-3 rounded-full transition-all"
            >
              Apply on WhatsApp <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/careers" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-6 py-3 rounded-full transition-all">
              View Careers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
