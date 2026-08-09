'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, CalendarCheck, Heart, User } from 'lucide-react';

const items = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Explore', href: '/treks', icon: Compass },
  { label: 'Bookings', href: '/bookings', icon: CalendarCheck },
  { label: 'Wishlist', href: '/wishlist', icon: Heart },
  { label: 'Profile', href: '/login', icon: User },
];

/** Detail / checkout pages use their own sticky Book CTA instead of tab bar. */
function shouldHideNav(path: string) {
  if (path.startsWith('/booking/')) return true;
  if (/^\/treks\/[^/]+\/?$/.test(path)) return true;
  if (/^\/yatra\/[^/]+\/?$/.test(path)) return true;
  return false;
}

export default function MobileBottomNav() {
  const path = usePathname();
  if (shouldHideNav(path)) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-around h-[62px]">
        {items.map(i => {
          const active = i.href === '/' ? path === '/' : path.startsWith(i.href);
          return (
            <Link key={i.label} href={i.href}
              className={`flex flex-col items-center justify-center gap-0.5 w-full h-full transition-colors relative ${active ? 'text-[#16a34a]' : 'text-gray-400 hover:text-gray-600'}`}>
              {active && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#16a34a] rounded-full" />}
              <i.icon className={`w-[22px] h-[22px] ${active ? 'fill-[#16a34a]/15' : ''}`} />
              <span className={`text-[10px] ${active ? 'font-bold' : 'font-medium'}`}>{i.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
