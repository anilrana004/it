'use client';

import Link from 'next/link';
import { Building2, Users, Heart, Briefcase, Star, ArrowRight, CheckCircle2, MapPin, Clock, Phone, Mail, Send } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { photos } from '@/lib/media';

const corpPkgs = [
  { name: 'Kedarkantha Winter Trek', loc: 'Uttarakhand', dur: '5D/4N', price: 6999, capacity: '10-50 pax', img: photos.kedarkantha, href: '/treks/kedarkantha', badge: 'Best for Teams' },
  { name: 'Hampta Pass Trek', loc: 'Himachal', dur: '5D/4N', price: 8499, capacity: '10-40 pax', img: photos.hampta, href: '/treks/hampta-pass', badge: 'Popular' },
  { name: 'Valley of Flowers Trek', loc: 'Uttarakhand', dur: '6D/5N', price: 8999, capacity: '10-30 pax', img: photos.vof, href: '/treks/valley-of-flowers', badge: 'UNESCO' },
  { name: 'Chopta Tungnath Trek', loc: 'Uttarakhand', dur: '4D/3N', price: 5999, capacity: '10-60 pax', img: photos.chopta, href: '/treks/chopta-tungnath', badge: 'Easy Access' },
  { name: 'Triund & Mcleodganj', loc: 'Himachal', dur: '3D/2N', price: 2499, capacity: '10-100 pax', img: photos.triund, href: '/treks/mcleodganj-trek', badge: 'Large Groups' },
  { name: 'Kedarnath Yatra', loc: 'Uttarakhand', dur: '6D/5N', price: 9999, capacity: '10-50 pax', img: photos.yatra, href: '/yatra/kedarnath-yatra', badge: 'Spiritual' },
];

export default function CorporatePage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', groupSize: '', preferredTrek: '', date: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${form.name} (${form.company}, ${form.groupSize} pax)`,
          email: form.email,
          phone: form.phone,
          message: `Trek: ${form.preferredTrek || 'Not specified'}\nPreferred Dates: ${form.date || 'Not specified'}\nMessage: ${form.message}`,
        }),
      });
      if (res.ok) setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pb-12 lg:pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#000000] to-[#000000] py-12 lg:py-20 mb-10 lg:mb-16">
        <div className="container mx-auto text-center">
          <Building2 className="w-10 h-10 lg:w-14 lg:h-14 text-[#16a34a] mx-auto mb-4" />
          <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white mb-3">Corporate Tours & Retreats</h1>
          <p className="text-white/70 text-sm lg:text-lg max-w-2xl mx-auto mb-6">Build stronger teams, reward your employees, and create unforgettable experiences with Indian Treks&apos; corporate adventure programs.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:+919797972175" className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-6 py-3 rounded-full transition-all text-sm">Call Us Now</a>
            <a href="mailto:corporate@indiantreks.com" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/20 transition-all text-sm">Email Us</a>
          </div>
        </div>
      </section>

      <div className="container mx-auto">
        {/* Services */}
        <div className="mb-12 lg:mb-20">
          <div className="text-center mb-8">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000] mb-2">Our Corporate Offerings</h2>
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
                <h3 className="font-bold text-base lg:text-lg text-[#000000] mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Corporate */}
        <div className="bg-gray-50 rounded-2xl p-6 lg:p-10 mb-12 lg:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000] mb-4">Why Choose Indian Treks for Corporate?</h2>
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
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80" alt="Corporate team" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Corporate Packages */}
        <div className="mb-12 lg:mb-20">
          <div className="text-center mb-8">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000] mb-2">Corporate Trek Packages</h2>
            <p className="text-gray-500 text-sm">Handpicked Himalayan treks perfect for corporate groups & team offsites</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {corpPkgs.map(p => (
              <Link key={p.name} href={p.href} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                <div className="relative h-40 lg:h-44 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {p.badge && <span className="absolute top-3 left-3 bg-[#16a34a] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{p.badge}</span>}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <MapPin className="w-3 h-3" />{p.loc} - <Clock className="w-3 h-3" />{p.dur}
                  </div>
                  <h3 className="font-bold text-base lg:text-lg text-[#000000] group-hover:text-[#16a34a] transition-colors">{p.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="text-[#16a34a] font-bold text-base">₹{p.price.toLocaleString()}</span>
                      <span className="text-gray-400 text-xs ml-1">/person</span>
                    </div>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">{p.capacity}</span>
                  </div>
                </div>
              </Link>
            ))}
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
            <div key={s.l} className="bg-gradient-to-br from-[#16a34a]/10 to-[#16a34a]/5 rounded-xl p-5 text-center border border-[#16a34a]/20">
              <div className="font-bold text-xl lg:text-3xl text-[#16a34a]">{s.v}</div>
              <div className="text-[11px] lg:text-xs text-gray-600 mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="bg-gradient-to-r from-[#16a34a] to-[#15803d] rounded-2xl p-6 lg:p-10 text-white mb-12 lg:mb-20">
          <div className="max-w-2xl mx-auto text-center">
            <Star className="w-8 h-8 text-yellow-300 mx-auto mb-3 fill-yellow-300" />
            <p className="text-sm lg:text-lg leading-relaxed italic mb-4">&ldquo;Indian Treks organized an incredible team-building trek for our 45-member team. From seamless logistics to expert guides, everything was perfect. Our team came back more connected and motivated than ever.&rdquo;</p>
            <p className="font-bold text-sm">- HR Director, Leading Tech Company</p>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="mb-12 lg:mb-20" id="inquiry">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000] mb-2">Request a Quote</h2>
              <p className="text-gray-500 text-sm mb-6">Tell us about your team&apos;s requirements and we&apos;ll create the perfect corporate adventure package.</p>
              <div className="space-y-4">
                {[
                  { icon: Phone, l: 'Call Us', v: '+91 99 99 99 99 99', h: 'tel:+919999999999' },
                  { icon: Mail, l: 'Email', v: 'corporate@indiantreks.com', h: 'mailto:corporate@indiantreks.com' },
                ].map(item => (
                  <div key={item.l} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#16a34a]/10 rounded-lg flex items-center justify-center shrink-0"><item.icon className="w-5 h-5 text-[#16a34a]" /></div>
                    <div><p className="text-xs text-gray-400">{item.l}</p><a href={item.h} className="font-semibold text-sm text-gray-900 hover:text-[#16a34a] transition-colors">{item.v}</a></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h3 className="font-bold text-lg text-green-800 mb-1">Thank You!</h3>
                  <p className="text-sm text-green-600">Your inquiry has been received. Our corporate team will reach out within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                      <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input type="text" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] outline-none transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] outline-none transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Group Size</label>
                      <select value={form.groupSize} onChange={e => setForm(f => ({ ...f, groupSize: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] outline-none transition-all bg-white">
                        <option value="">Select...</option>
                        {['10-20', '21-40', '41-60', '61-80', '81-100', '100+'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Trek</label>
                      <select value={form.preferredTrek} onChange={e => setForm(f => ({ ...f, preferredTrek: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] outline-none transition-all bg-white">
                        <option value="">Not decided yet</option>
                        {corpPkgs.map(p => <option key={p.name}>{p.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Dates</label>
                    <input type="text" placeholder="e.g. March 2027 or 15-20 April 2027" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
                    <textarea rows={3} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] outline-none transition-all resize-none" />
                  </div>
                  <button type="submit" disabled={sending}
                    className="w-full bg-[#16a34a] hover:bg-[#15803d] disabled:bg-gray-300 text-white font-semibold px-6 py-3 rounded-full transition-all text-sm flex items-center justify-center gap-2">
                    {sending ? 'Sending...' : <><Send className="w-4 h-4" /> Send Inquiry</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000] mb-2">Ready to Plan Your Corporate Adventure?</h2>
          <p className="text-gray-500 text-sm mb-6">Get a free quote for your team&apos;s next offsite or retreat.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+919999999999" className="inline-flex items-center gap-2 bg-[#16a34a] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#15803d] transition-all text-sm">Call +91 99 99 99 99 99</a>
            <a href="mailto:corporate@indiantreks.com" className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition-all text-sm">corporate@indiantreks.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
