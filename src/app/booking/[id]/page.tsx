'use client';
import { useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, Suspense } from 'react';
import { ArrowRight, Shield, Check, ChevronRight, Star, Clock, Users, Phone, Calendar, CreditCard, Lock, Wallet, Percent, Gift, Loader, Ban } from 'lucide-react';
import { treks } from '@/lib/data';

function BookingContent() {
  const params = useParams();
  const sp = useSearchParams();
  const trek = treks.find(t => t.id === params.id);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', persons: '1', date: sp.get('date') || '',
    pkg: sp.get('pkg') || 'Standard', payment: 'deposit', notes: ''
  });

  if (!trek) return (
    <div className="pt-28 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4"><Ban className="w-8 h-8 text-red-500" /></div>
        <h2 className="text-xl font-bold text-[#000000] mb-2">Trek Not Found</h2>
        <p className="text-gray-500 mb-6">The trek you are looking for does not exist or has been removed.</p>
        <Link href="/treks" className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-6 py-3 rounded-full transition-all">Browse All Treks <ArrowRight className="w-4 h-4" /></Link>
      </div>
    </div>
  );

  const selectedPkg = trek.pricing.find(p => p.name === form.pkg) || trek.pricing[0];
  const total = selectedPkg.price * parseInt(form.persons);
  const depositAmt = selectedPkg.deposit * parseInt(form.persons);
  const payableNow = form.payment === 'deposit' ? depositAmt : form.payment === 'full' ? total : Math.ceil(total / 2);

  const steps = [
    { num: 1, label: 'Package & Date', icon: Calendar },
    { num: 2, label: 'Your Details', icon: Users },
    { num: 3, label: 'Confirm', icon: Check },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) { setStep(s => s + 1); return; }
    const msg = `*New Booking - Indian Treks*\n\n*Trek:* ${trek.title}\n*Duration:* ${trek.duration}\n*Package:* ${form.pkg}\n*Persons:* ${form.persons}\n*Date:* ${form.date}\n*Payment:* ${form.payment === 'deposit' ? 'Advance Deposit' : form.payment === 'full' ? 'Full Payment' : '50% Now'}\n*Amount:* ₹${payableNow.toLocaleString()}\n*Name:* ${form.name}\n*Email:* ${form.email}\n*Phone:* ${form.phone}\n${form.notes ? `*Notes:* ${form.notes}` : ''}`;
    window.open(`https://wa.me/919999999999?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="pt-20 lg:pt-24 pb-12 lg:pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-6 lg:mb-8">
          <Link href={`/treks/${trek.id}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#16a34a] transition-colors mb-4">
            <ChevronRight className="w-4 h-4 rotate-180" /> Back to {trek.title}
          </Link>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000]">Complete Your Booking</h1>
          <p className="text-gray-500 text-sm mt-1">{trek.title} &middot; {trek.duration} &middot; {trek.location}</p>
        </div>

        <div className="flex items-center justify-center gap-1 lg:gap-3 mb-8 lg:mb-10">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center gap-1 lg:gap-3">
              <div className={`flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 rounded-full transition-all ${step >= s.num ? 'bg-[#16a34a] text-white shadow-sm shadow-[#16a34a]/30' : 'bg-white text-gray-400 border border-gray-200'}`}>
                <div className={`w-6 h-6 lg:w-7 lg:h-7 rounded-full flex items-center justify-center text-xs lg:text-sm font-bold ${step > s.num ? 'bg-white text-[#16a34a]' : ''}`}>
                  {step > s.num ? <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4" /> : s.num}
                </div>
                <span className={`text-xs lg:text-sm font-semibold hidden sm:inline ${step >= s.num ? 'text-white' : 'text-gray-500'}`}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className={`w-6 lg:w-10 h-0.5 ${step > s.num ? 'bg-[#16a34a]' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-5">
            {step === 1 && (
              <>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:p-7">
                  <h2 className="font-bold text-lg text-[#000000] mb-5">Select Package</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {trek.pricing.map(p => (
                      <button key={p.name} type="button" onClick={() => setForm(f => ({ ...f, pkg: p.name }))}
                        className={`relative p-4 rounded-xl border-2 text-center transition-all ${form.pkg === p.name ? 'border-[#16a34a] bg-[#16a34a]/5 shadow-sm' : 'border-gray-100 hover:border-gray-200 bg-white'}`}>
                        {p.badge && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#16a34a] text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">{p.badge}</span>}
                        <div className="mt-1">
                          <div className="font-bold text-sm text-[#000000]">{p.name}</div>
                          <div className="text-xl lg:text-2xl font-bold text-[#16a34a] mt-1">₹{p.price.toLocaleString()}</div>
                          <div className="text-xs text-gray-400">per person</div>
                          {p.originalPrice && <div className="text-xs text-gray-400 line-through mt-1">₹{p.originalPrice.toLocaleString()}</div>}
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="text-xs font-semibold text-[#16a34a]">Deposit ₹{p.deposit.toLocaleString()}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:p-7">
                  <h2 className="font-bold text-lg text-[#000000] mb-5">Trip Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Travel Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="date" required value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Number of Persons</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select value={form.persons} onChange={e => setForm(f => ({ ...f, persons: e.target.value }))}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all text-sm appearance-none bg-white">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n} Person{n > 1 ? 's' : ''}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:p-7">
                  <h2 className="font-bold text-lg text-[#000000] mb-5">Payment Mode</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { v: 'deposit', l: 'Advance Deposit', d: `Pay ₹${depositAmt.toLocaleString()} now`, sub: 'Secure your spot' },
                      { v: 'half', l: '50% Now, 50% Later', d: `Pay ₹${Math.ceil(total / 2).toLocaleString()} now`, sub: 'Split payment' },
                      { v: 'full', l: 'Full Payment', d: `Pay ₹${total.toLocaleString()} now`, sub: 'Best value' },
                    ].map(o => (
                      <button key={o.v} type="button" onClick={() => setForm(f => ({ ...f, payment: o.v }))}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${form.payment === o.v ? 'border-[#16a34a] bg-[#16a34a]/5 shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}>
                        <div className="text-xs font-semibold text-gray-700">{o.l}</div>
                        <div className="text-sm font-bold text-[#000000] mt-1">{o.d}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{o.sub}</div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                    <Lock className="w-3.5 h-3.5 text-[#16a34a]" /> Secure payment via WhatsApp. No card details stored.
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:p-7">
                <h2 className="font-bold text-lg text-[#000000] mb-5">Your Contact Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                    <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all text-sm" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-red-400">*</span></label>
                    <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all text-sm" placeholder="email@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="tel" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all text-sm" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                    <input type="text" value={form.notes.split(',')[0] || ''} onChange={e => setForm(f => ({ ...f, notes: e.target.value + (f.notes.includes(',') ? f.notes.substring(f.notes.indexOf(',')) : '') }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all text-sm" placeholder="Your city" />
                  </div>
                </div>
                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Special Requests <span className="text-gray-400">(optional)</span></label>
                  <textarea rows={2} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all text-sm resize-none" placeholder="Dietary needs, health conditions, room preferences..." />
                </div>
                <div className="mt-5 bg-[#16a34a]/5 rounded-xl p-4 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#16a34a] shrink-0 mt-0.5" />
                  <div className="text-xs text-gray-600 leading-relaxed">Your information is secure. We will contact you via WhatsApp within 24 hours to confirm your booking and process the payment. No card details are stored on our servers.</div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:p-7">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-[#16a34a]/10 rounded-full flex items-center justify-center mx-auto mb-3"><Check className="w-7 h-7 text-[#16a34a]" /></div>
                  <h2 className="font-bold text-xl text-[#000000]">Review & Confirm</h2>
                  <p className="text-gray-500 text-sm mt-1">Please verify all details before submitting</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0"><img src={trek.images[0]} alt="" className="w-full h-full object-cover" /></div>
                    <div><h4 className="font-semibold text-sm text-[#000000]">{trek.title}</h4><p className="text-xs text-gray-500">{trek.duration} &middot; {trek.difficulty}</p></div>
                  </div>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Package</span><span className="font-semibold">{form.pkg} - ₹{selectedPkg.price.toLocaleString()}/person</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Travel Date</span><span className="font-semibold">{form.date}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Persons</span><span className="font-semibold">{form.persons}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="font-semibold">{form.name || 'Not provided'}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Phone</span><span className="font-semibold">{form.phone || 'Not provided'}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Payment Mode</span><span className="font-semibold">{form.payment === 'deposit' ? 'Advance Deposit' : form.payment === 'full' ? 'Full Payment' : '50% Now'}</span></div>
                    {form.notes && <div className="flex justify-between"><span className="text-gray-500">Notes</span><span className="font-semibold text-right max-w-[60%]">{form.notes}</span></div>}
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between items-center"><span className="text-gray-600 font-medium">Total Amount</span><span className="font-bold text-xl text-[#000000]">₹{total.toLocaleString()}</span></div>
                  <div className="flex justify-between items-center"><span className="text-gray-500 text-sm">Payable Now</span><span className="font-bold text-lg text-[#16a34a]">₹{payableNow.toLocaleString()}</span></div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {step > 1 && (
                <button type="button" onClick={() => setStep(s => s - 1)}
                  className="px-6 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-gray-300 hover:bg-white transition-all">
                  Back
                </button>
              )}
              <button type="submit" className={`flex-1 flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-full transition-all text-sm shadow-sm ${step === 3 ? 'bg-[#16a34a] hover:bg-[#15803d] text-white shadow-[#16a34a]/25' : 'bg-[#16a34a] hover:bg-[#15803d] text-white shadow-[#16a34a]/25'}`}>
                {step === 1 ? 'Continue to Details' : step === 2 ? 'Review Booking' : 'Confirm & Send via WhatsApp'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="relative h-36 overflow-hidden">
                  <img src={trek.images[0]} alt={trek.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-bold text-sm text-white drop-shadow-sm">{trek.title}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-white/80 mt-0.5">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{trek.rating} ({trek.reviewCount})
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-4 h-4 text-[#16a34a]" /><span>{trek.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Users className="w-4 h-4 text-[#16a34a]" /><span>{trek.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-4 h-4 text-[#16a34a]" /><span className="truncate">{trek.location}</span>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Package</span>
                    <span className="text-[#16a34a] font-medium text-xs">{form.pkg}</span>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-lg text-[#000000]">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs text-gray-500">Payable Now</span>
                    <span className="font-bold text-[#16a34a]">₹{payableNow.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#000000] rounded-2xl p-5 text-white text-sm space-y-3">
                <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#16a34a]" /><span className="font-semibold text-xs">Secure Booking</span></div>
                <p className="text-gray-300 text-xs leading-relaxed">Your booking will be confirmed via WhatsApp. Our team will reach out within 24 hours to process your payment and share trip details.</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <CreditCard className="w-3.5 h-3.5" /> EMI options available
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Percent className="w-3.5 h-3.5" /> Group discounts available
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Gift className="w-3.5 h-3.5" /> Gift cards accepted
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h4 className="font-semibold text-xs text-gray-400 uppercase tracking-wider mb-3">Need Help?</h4>
                <a href="tel:+919999999999" className="flex items-center gap-3 text-sm text-[#000000] hover:text-[#16a34a] transition-colors mb-3">
                  <Phone className="w-4 h-4 text-[#16a34a]" /> +91 99999 99999
                </a>
                <Link href="/contact" className="text-xs text-[#16a34a] font-medium hover:text-[#15803d] transition-colors">Contact Support &rarr;</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="pt-28 min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-[#16a34a]" />
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}

const MapPin = ({ className, children, ...props }: { className?: string; children?: React.ReactNode }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
