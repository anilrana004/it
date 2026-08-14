import Link from 'next/link';
import { Sparkles, Globe, MapPin, Users } from 'lucide-react';

const filters = [
  { label: 'New Launches', href: '/treks', icon: Sparkles },
  { label: 'International', href: '/treks?region=nepal', icon: Globe },
  { label: 'India', href: '/treks?region=india', icon: MapPin },
  { label: 'Group Trips', href: '/treks', icon: Users },
];

export default function QuickFilters() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {filters.map(f => (
            <Link key={f.label} href={f.href}
              className="flex items-center gap-1.5 shrink-0 px-4 py-2 rounded-lg bg-gray-50 hover:bg-[#16a34a] hover:text-white border-2 border-[#16a34a] text-xs font-semibold text-gray-700 transition-all">
              <f.icon className="w-3.5 h-3.5" />
              {f.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
