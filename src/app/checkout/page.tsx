'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { Suspense } from 'react';

function CheckoutInner() {
  const sp = useSearchParams();
  const trekName = sp.get('trek') || 'Trek';
  const pkg = sp.get('pkg') || 'Standard';
  const price = parseInt(sp.get('price') || '0');
  const deposit = parseInt(sp.get('deposit') || '0');
  const persons = parseInt(sp.get('persons') || '1');
  const payment = sp.get('payment') || 'deposit';
  const total = price * persons;
  const nowPay = payment === 'deposit' ? deposit * persons : payment === 'full' ? total : Math.ceil(total/2);

  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="w-16 h-16 bg-[#29C80F]/10 rounded-full flex items-center justify-center mx-auto mb-6"><Check className="w-8 h-8 text-[#29C80F]" /></div>
      <h1 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#1a1a2e] mb-3">Booking Initiated!</h1>
      <p className="text-gray-600 mb-8">Your booking request has been sent. We will contact you within 24 hours.</p>
      <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-3 mb-8">
        <div className="flex justify-between text-sm"><span className="text-gray-500">Trek</span><span className="font-semibold">{trekName}</span></div>
        <div className="flex justify-between text-sm"><span className="text-gray-500">Package</span><span className="font-semibold">{pkg}</span></div>
        <div className="flex justify-between text-sm"><span className="text-gray-500">Persons</span><span className="font-semibold">{persons}</span></div>
        <hr className="border-gray-200" />
        <div className="flex justify-between text-sm"><span className="text-gray-500">Total</span><span className="font-bold text-lg">₹{total.toLocaleString()}</span></div>
        <div className="flex justify-between text-sm"><span className="text-gray-500">Payable Now</span><span className="font-semibold text-[#359DFC]">₹{nowPay.toLocaleString()}</span></div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a href="https://wa.me/919999999999" target="_blank" className="inline-flex items-center justify-center gap-2 bg-[#29C80F] hover:bg-[#22a80d] text-white font-semibold px-8 py-3.5 rounded-full transition-all">Pay via WhatsApp <ArrowRight className="w-4 h-4" /></a>
        <Link href="/treks" className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold px-8 py-3.5 rounded-full hover:border-gray-300 transition-all">Browse More Treks</Link>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen flex items-center">
      <div className="container mx-auto">
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
          <CheckoutInner />
        </Suspense>
      </div>
    </div>
  );
}
