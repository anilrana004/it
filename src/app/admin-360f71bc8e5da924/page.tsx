'use client';
import Link from 'next/link';
import { bookings, contacts, users, subscribers, getGiftCards, getBlogPosts } from '@/lib/admin/store';
import { treks } from '@/lib/data';
import { LayoutDashboard, MapPin, CalendarCheck, Users, MessageSquare, Gift, Mail, TrendingUp, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Treks', value: treks.length, icon: MapPin, color: 'bg-blue-500', href: '/admin-360f71bc8e5da924/treks' },
    { label: 'Bookings', value: bookings.length, icon: CalendarCheck, color: 'bg-green-500', href: '/admin-360f71bc8e5da924/bookings' },
    { label: 'Users', value: users.length, icon: Users, color: 'bg-purple-500', href: '/admin-360f71bc8e5da924/users' },
    { label: 'Contacts', value: contacts.length, icon: MessageSquare, color: 'bg-orange-500', href: '/admin-360f71bc8e5da924/contacts' },
    { label: 'Gift Cards', value: getGiftCards().length, icon: Gift, color: 'bg-pink-500', href: '/admin-360f71bc8e5da924/gift-cards' },
    { label: 'Subscribers', value: subscribers.length, icon: Mail, color: 'bg-teal-500', href: '/admin-360f71bc8e5da924/newsletter' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000]">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome to TrekRoot Admin Panel</p>
        </div>
        <Link href="/" className="text-sm text-[#16a34a] hover:underline hidden lg:block">View Site &rarr;</Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map(s => (
          <Link key={s.label} href={s.href} className="bg-white rounded-2xl p-4 lg:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-[#000000]">{s.value}</p>
            <p className="text-xs lg:text-sm text-gray-500 mt-0.5">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg text-[#000000]">Recent Bookings</h2>
          <Link href="/admin-360f71bc8e5da924/bookings" className="text-sm text-[#16a34a] hover:underline flex items-center gap-1">View All <ArrowRight className="w-3 h-3" /></Link>
        </div>
        {bookings.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">No bookings yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-100 text-gray-500 text-left"><th className="pb-3 font-medium">Name</th><th className="pb-3 font-medium">Trek</th><th className="pb-3 font-medium">Package</th><th className="pb-3 font-medium">Amount</th><th className="pb-3 font-medium">Status</th></tr></thead>
              <tbody>{bookings.slice(0, 5).map(b => (
                <tr key={b.id} className="border-b border-gray-50"><td className="py-3 font-medium text-gray-800">{b.name}</td><td className="py-3 text-gray-600">{b.trekTitle}</td><td className="py-3 text-gray-600">{b.package}</td><td className="py-3 text-gray-800 font-semibold">₹{b.amount.toLocaleString()}</td><td className="py-3"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : b.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{b.status}</span></td></tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6">
        <h2 className="font-bold text-lg text-[#000000] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { l: 'Add Trek', h: '/admin-360f71bc8e5da924/treks', icon: MapPin },
            { l: 'View Bookings', h: '/admin-360f71bc8e5da924/bookings', icon: CalendarCheck },
            { l: 'New Blog Post', h: '/admin-360f71bc8e5da924/blog', icon: MessageSquare },
            { l: 'Manage Gift Cards', h: '/admin-360f71bc8e5da924/gift-cards', icon: Gift },
          ].map(a => (
            <Link key={a.l} href={a.h} className="flex items-center gap-3 p-3 lg:p-4 bg-gray-50 rounded-xl hover:bg-[#16a34a]/5 hover:border-[#16a34a]/20 border border-transparent transition-all">
              <div className="w-9 h-9 bg-[#16a34a]/10 rounded-lg flex items-center justify-center"><a.icon className="w-4 h-4 text-[#16a34a]" /></div>
              <span className="text-sm font-medium text-gray-700">{a.l}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
