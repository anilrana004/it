'use client';
import { useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Shield, Check } from 'lucide-react';
import { treks } from '@/lib/data';

export default function BookingPage() {
  const params = useParams();
  const sp = useSearchParams();
  const trek = treks.find(t => t.id === params.id);
  const [form, setForm] = useState({ name: '', email: '', phone: '', persons: '1', date: '', pkg: sp.get('pkg') || 'Standard', payment: 'deposit', notes: '' });

  if (!trek) return <div className="pt-28 text-center py-20">Trek not found. <Link href="/treks" className="text-[#359DFC]">Browse treks</Link></div>;

  const pkg = trek.pricing.find(p => p.name === form.pkg) || trek.pricing[0];
  const total = pkg.price * parseInt(form.persons);
  const deposit = pkg.deposit * parseInt(form.persons);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Booking - ${trek.title}
Package: ${form.pkg} (${form.payment})
Persons: ${form.persons} | Date: ${form.date}
Amount: ₹${form.payment==='deposit'?deposit:form.payment==='full'?total:Math.ceil(total/2)}
Name: ${form.name} | Phone: ${form.phone}`;
    window.open(`https://wa.me/919999999999?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#1a1a2e] mb-2">Complete Your Booking</h1>
        <p className="text-gray-500 mb-8">{trek.title} - {trek.duration}</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-lg mb-4">Personal Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label><input type="text" required value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#359DFC] outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input type="email" required value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#359DFC] outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label><input type="tel" required value={form.phone} onChange={e => setForm(f=>({...f,phone:e.target.value}))} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#359DFC] outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Travel Date *</label><input type="date" required value={form.date} onChange={e => setForm(f=>({...f,date:e.target.value}))} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#359DFC] outline-none" /></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-lg mb-4">Booking Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Package</label>
                  <div className="flex gap-2 flex-wrap">{trek.pricing.map(p => <button key={p.name} type="button" onClick={() => setForm(f=>({...f,pkg:p.name}))} className={`px-4 py-2 rounded-xl border-2 text-sm transition-all ${form.pkg===p.name?'border-[#359DFC] bg-[#359DFC]/5 font-semibold':'border-gray-100'}`}>{p.name} - ₹{p.price.toLocaleString()}</button>)}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Persons</label><select value={form.persons} onChange={e => setForm(f=>({...f,persons:e.target.value}))} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none">{Array.from({length:10},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}</select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Payment Option</label><select value={form.payment} onChange={e => setForm(f=>({...f,payment:e.target.value}))} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none"><option value="deposit">Advance Deposit (₹{(pkg.deposit*parseInt(form.persons)).toLocaleString()})</option><option value="full">Full Payment (₹{total.toLocaleString()})</option><option value="half">50% Now (₹{Math.ceil(total/2).toLocaleString()})</option></select></div>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label><textarea rows={2} value={form.notes} onChange={e => setForm(f=>({...f,notes:e.target.value}))} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none resize-none" /></div>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#29C80F] hover:bg-[#22a80d] text-white font-semibold px-8 py-3.5 rounded-full transition-all flex items-center justify-center gap-2 text-base">
              <Check className="w-5 h-5" /> Confirm Booking via WhatsApp <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-lg mb-4">Booking Summary</h3>
                <div className="relative rounded-xl overflow-hidden mb-4 h-32"><img src={trek.images[0]} alt={trek.title} className="w-full h-full object-cover" /></div>
                <h4 className="font-semibold text-sm mb-3">{trek.title}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Duration</span><span>{trek.duration}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Package</span><span className="font-semibold text-[#359DFC]">{form.pkg}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Persons</span><span>{form.persons}</span></div>
                  <hr className="border-gray-100" />
                  <div className="flex justify-between"><span className="text-gray-500">Total</span><span className="font-bold text-lg">₹ {total.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Payable Now</span><span className="font-bold text-[#359DFC]">₹ {form.payment==='deposit'?deposit.toLocaleString():form.payment==='full'?total.toLocaleString():Math.ceil(total/2).toLocaleString()}</span></div>
                </div>
              </div>
              <div className="bg-[#1a1a2e] rounded-2xl p-5 text-white text-sm space-y-2"><Shield className="w-5 h-5 text-[#29C80F]" /><p className="text-gray-300">Your booking is confirmed after payment. You will receive a confirmation via WhatsApp and email within 24 hours.</p></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
