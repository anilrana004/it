import Link from 'next/link';
import { Building2, Users, Heart, Briefcase, Star, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CorporatePage() {
  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] py-12 lg:py-20 mb-10 lg:mb-16">
        <div className="container mx-auto text-center">
          <Building2 className="w-10 h-10 lg:w-14 lg:h-14 text-[#359DFC] mx-auto mb-4" />
          <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white mb-3">Corporate Tours & Retreats</h1>
          <p className="text-white/70 text-sm lg:text-lg max-w-2xl mx-auto mb-6">Build stronger teams, reward your employees, and create unforgettable experiences with TrekRoot&apos;s corporate adventure programs.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:+919999999999" className="inline-flex items-center gap-2 bg-[#359DFC] hover:bg-[#1a7de0] text-white font-semibold px-6 py-3 rounded-full transition-all text-sm">Call Us Now</a>
            <a href="mailto:corporate@trekroot.com" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/20 transition-all text-sm">Email Us</a>
          </div>
        </div>
      </section>

      <div className="container mx-auto">
        {/* Services */}
        <div className="mb-12 lg:mb-20">
          <div className="text-center mb-8">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#1a1a2e] mb-2">Our Corporate Offerings</h2>
            <p className="text-gray-500 text-sm">Tailored programs for teams of all sizes</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {[
              { icon: <Users className="w-6 h-6" />, title: 'Team Building Treks', desc: 'Strengthen bonds and foster collaboration through shared Himalayan adventures. Custom treks designed for team dynamics.', color: 'from-blue-500 to-blue-600' },
              { icon: <Briefcase className="w-6 h-6" />, title: 'Offsites & Retreats', desc: 'Escape the boardroom and find inspiration in the mountains. Productive offsites combined with adventure activities.', color: 'from-emerald-500 to-emerald-600' },
              { icon: <Heart className="w-6 h-6" />, title: 'CSR Activities', desc: 'Give back to mountain communities through meaningful CSR initiatives. Tree plantation, school support, and village development.', color: 'from-purple-500 to-purple-600' },
              { icon: <Star className="w-6 h-6" />, title: 'Incentive Trips', desc: 'Reward top performers with bucket-list adventures. All-inclusive incentive programs that truly motivate and inspire.', color: 'from-amber-500 to-amber-600' },
            ].map(s => (
              <div key={s.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all text-center">
                <div className={`w-14 h-14 bg-gradient-to-br ${s.color} rounded-xl flex items-center justify-center text-white mx-auto mb-4`}>{s.icon}</div>
                <h3 className="font-bold text-base lg:text-lg text-[#1a1a2e] mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Corporate */}
        <div className="bg-gray-50 rounded-2xl p-6 lg:p-10 mb-12 lg:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#1a1a2e] mb-4">Why Choose TrekRoot for Corporate?</h2>
              <ul className="space-y-3">
                {[
                  '9+ years of experience organizing corporate adventure programs',
                  'Certified and experienced trek leaders with first-aid training',
                  'Fully insured and safety-compliant operations',
                  'Customizable itineraries for groups of 10-100+ participants',
                  'End-to-end logistics including transport, meals, and accommodation',
                  'Post-trip documentation and impact reports for CSR initiatives',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-xl overflow-hidden h-64 lg:h-80">
              <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop" alt="Corporate team" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 lg:mb-20">
          {[
            { v: '500+', l: 'Corporate Clients' },
            { v: '50,000+', l: 'Team Members Hosted' },
            { v: '100+', l: 'Custom Programs' },
            { v: '9+ Years', l: 'Experience' },
          ].map(s => (
            <div key={s.l} className="bg-gradient-to-br from-[#359DFC]/10 to-[#359DFC]/5 rounded-xl p-5 text-center border border-[#359DFC]/20">
              <div className="font-bold text-xl lg:text-3xl text-[#359DFC]">{s.v}</div>
              <div className="text-[11px] lg:text-xs text-gray-600 mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="bg-gradient-to-r from-[#359DFC] to-[#1a7de0] rounded-2xl p-6 lg:p-10 text-white mb-12 lg:mb-20">
          <div className="max-w-2xl mx-auto text-center">
            <Star className="w-8 h-8 text-yellow-300 mx-auto mb-3 fill-yellow-300" />
            <p className="text-sm lg:text-lg leading-relaxed italic mb-4">&ldquo;TrekRoot organized an incredible team-building trek for our 45-member team. From seamless logistics to expert guides, everything was perfect. Our team came back more connected and motivated than ever.&rdquo;</p>
            <p className="font-bold text-sm">- HR Director, Leading Tech Company</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#1a1a2e] mb-2">Ready to Plan Your Corporate Adventure?</h2>
          <p className="text-gray-500 text-sm mb-6">Get a free quote for your team&apos;s next offsite or retreat.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+919999999999" className="inline-flex items-center gap-2 bg-[#359DFC] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#1a7de0] transition-all text-sm">Call +91 99 99 99 99 99</a>
            <a href="mailto:corporate@trekroot.com" className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition-all text-sm">corporate@trekroot.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
