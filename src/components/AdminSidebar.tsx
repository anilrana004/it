'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MapPin, CalendarCheck, Users, MessageSquare, FileText, Gift, Mail, LogOut, Menu, X, ChevronDown } from 'lucide-react';

const sidebarItems = [
  { label: 'Dashboard', href: '/admin-360f71bc8e5da924', icon: LayoutDashboard },
  { label: 'Treks', href: '/admin-360f71bc8e5da924/treks', icon: MapPin },
  { label: 'Bookings', href: '/admin-360f71bc8e5da924/bookings', icon: CalendarCheck },
  { label: 'Users', href: '/admin-360f71bc8e5da924/users', icon: Users },
  { label: 'Contacts', href: '/admin-360f71bc8e5da924/contacts', icon: MessageSquare },
  { label: 'Blog', href: '/admin-360f71bc8e5da924/blog', icon: FileText },
  { label: 'Gift Cards', href: '/admin-360f71bc8e5da924/gift-cards', icon: Gift },
  { label: 'Newsletter', href: '/admin-360f71bc8e5da924/newsletter', icon: Mail },
];

export default function AdminSidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button onClick={() => setOpen(!open)} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200">
        {open ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
      </button>

      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-[#040921] text-white transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-white/10">
          <Link href="/admin-360f71bc8e5da924" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#afde1e] to-[#afde1e] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TR</span>
            </div>
            <span className="font-bold text-lg">Admin Panel</span>
          </Link>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
          {sidebarItems.map(item => {
            const active = item.href === '/admin-360f71bc8e5da924' ? path === '/admin-360f71bc8e5da924' : path.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${active ? 'bg-[#afde1e] text-gray-900 font-semibold' : 'text-gray-300 hover:bg-white/5'}`}>
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}

          <hr className="my-3 border-white/10" />

          <Link href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-white/5 transition-all">
            <LogOut className="w-5 h-5" />
            Back to Site
          </Link>
        </nav>
      </aside>
    </>
  );
}
