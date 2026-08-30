import { HOME_RECOGNITION_LOGOS, HOME_RECOGNITIONS_SECTION } from '@/lib/content/home-recognitions';

export default function Recognitions() {
  return (
    <section className="py-8 lg:py-16">
      <div className="container mx-auto">
        <div className="text-center mb-6 lg:mb-8">
          <p className="text-[#16a34a] font-semibold text-xs lg:text-sm tracking-widest uppercase mb-1">{HOME_RECOGNITIONS_SECTION.kicker}</p>
          <h2 className="text-xl lg:text-3xl font-bold text-[#000000]">{HOME_RECOGNITIONS_SECTION.title}</h2>
          <p className="text-gray-500 text-xs lg:text-sm mt-1 max-w-xl mx-auto">{HOME_RECOGNITIONS_SECTION.subtitle}</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-6">
          {HOME_RECOGNITION_LOGOS.map(l => (
            <div key={l.id} className="bg-white rounded-xl px-4 lg:px-6 py-3 lg:py-4 shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-center justify-center">
              <img src={l.img} alt={l.name} className="h-6 lg:h-8 object-contain grayscale hover:grayscale-0 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
