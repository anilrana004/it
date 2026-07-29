import { Sun, Moon, Coffee } from 'lucide-react';
import type { ItineraryDay } from '@/lib/data';

export default function ItineraryTimeline({ itinerary }: { itinerary: ItineraryDay[] }) {
  return (
    <div className="relative">
      <div className="absolute left-4 lg:left-5 top-0 bottom-0 w-0.5 bg-[#afde1e]/20" />
      <div className="space-y-6">
        {itinerary.map((day) => (
          <div key={day.day} className="relative pl-10 lg:pl-12">
            <div className="absolute left-2.5 lg:left-3 top-1.5 w-3 h-3 bg-[#afde1e] rounded-full ring-4 ring-white" />
            <div className="bg-white rounded-xl border border-gray-100 p-4 lg:p-6 hover:shadow-md transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 bg-[#afde1e]/10 text-[#afde1e] text-xs font-bold px-3 py-1 rounded-full">
                  Day {day.day}
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                  {day.altitude && <span className="bg-gray-50 px-2 py-0.5 rounded-full">Altitude: {day.altitude}</span>}
                  {day.distance && <span className="bg-gray-50 px-2 py-0.5 rounded-full">Distance: {day.distance}</span>}
                  {day.duration && <span className="bg-gray-50 px-2 py-0.5 rounded-full">Duration: {day.duration}</span>}
                </div>
              </div>
              <h3 className="font-bold text-base lg:text-lg text-[#040921] mb-2">{day.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{day.description}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                {day.meals.includes('Breakfast') && <span className="flex items-center gap-1"><Coffee className="w-3 h-3" />Breakfast</span>}
                {day.meals.includes('Lunch') && <span className="flex items-center gap-1"><Sun className="w-3 h-3" />Lunch</span>}
                {day.meals.includes('Dinner') && <span className="flex items-center gap-1"><Moon className="w-3 h-3" />Dinner</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
