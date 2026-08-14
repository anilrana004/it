import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20">
      <section className="relative h-[30vh] min-h-[220px] overflow-hidden mb-10">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80" alt="Contact" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
          <div className="container mx-auto"><h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white mb-2">Contact Us</h1><p className="text-gray-200 text-lg">We&apos;d love to hear from you</p></div>
        </div>
      </section>
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#000000] mb-6">Get in Touch</h2>
            <div className="space-y-5">
              {[{icon:Phone,l:'Phone',v:'+91 99 99 99 99 99',h:'tel:+919999999999'},{icon:Mail,l:'Email',v:'hello@indiantreks.com',h:'mailto:hello@indiantreks.com'},{icon:MapPin,l:'Office',v:'New Delhi, India'},{icon:Clock,l:'Working Hours',v:'Mon - Sat: 10:00 AM - 7:00 PM'}].map(item => (
                <div key={item.l} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#16a34a]/10 rounded-lg flex items-center justify-center shrink-0 mt-1"><item.icon className="w-5 h-5 text-[#16a34a]" /></div>
                  <div><p className="text-sm text-gray-500">{item.l}</p>{item.h ? <a href={item.h} className="font-semibold text-gray-900 hover:text-[#16a34a] transition-colors">{item.v}</a> : <p className="font-semibold text-gray-900">{item.v}</p>}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">First Name</label><input type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] outline-none transition-all" /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label><input type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] outline-none transition-all" /></div></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] outline-none transition-all" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Message</label><textarea rows={4} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] outline-none transition-all resize-none" /></div>
              <button type="submit" className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-6 py-3 rounded-full transition-all">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
