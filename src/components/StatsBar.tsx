import { MessageSquare, Users, MapPin, Calendar } from 'lucide-react';

const stats = [
  { value: '10000+', label: 'Reviews', icon: MessageSquare },
  { value: '80000+', label: 'Satisfied Travelers', icon: Users },
  { value: '50+', label: 'Destinations', icon: MapPin },
  { value: '9 Years+', label: 'Experience', icon: Calendar },
];

export default function StatsBar() {
  return (
    <section className="bg-gradient-to-r from-[#000000] to-[#000000] py-8 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:flex lg:flex-row gap-4 lg:gap-8">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 lg:p-6 text-center border border-white/10">
                <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-[#ffaf21] mx-auto mb-2" />
                <div className="font-bold text-lg lg:text-2xl text-white">{s.value}</div>
                <div className="text-[10px] lg:text-xs text-white/60 mt-0.5">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
