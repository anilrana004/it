import { Award, Heart, Users } from 'lucide-react';

const features = [
  {
    title: 'Trusted Experience',
    desc: "We don't just organize trips - we create experiences backed by expertise and thousands of successful departures.",
    img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/',
  },
  {
    title: 'Safety First',
    desc: 'Every itinerary is designed with safety and responsible operations at its core so you can travel worry-free.',
    img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/',
  },
  {
    title: 'Award-Winning Excellence',
    desc: 'Our commitment to quality has earned recognition from industry leaders and our travelers.',
    img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/',
  },
  {
    title: 'More Than Just Travel',
    desc: 'Indian Treks is a community where strangers become friends and every trip creates lifelong stories.',
    img: 'https://res.cloudinary.com/pg8uhzw0/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-8 lg:py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-8 lg:mb-10">
          <p className="text-[#16a34a] font-semibold text-xs lg:text-sm tracking-widest uppercase mb-1">WHY CHOOSE US</p>
          <h2 className="text-xl lg:text-3xl font-bold text-[#000000] mb-3">Why Choose Indian Treks?</h2>
          <p className="text-gray-600 text-xs lg:text-sm max-w-3xl mx-auto leading-relaxed">
            Travel has the power to transform perspectives, build meaningful connections, and create stories that last a lifetime. At Indian Treks, we&apos;ve dedicated the last decade to making those experiences accessible, safe, and unforgettable. With a thriving community of over 80,000 travelers and thousands of successfully curated journeys, we continue to inspire people to explore beyond destinations.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-8 lg:mb-10">
          {features.map((f) => (
            <div key={f.title} className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={f.img} alt={f.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3 lg:p-5">
                <h3 className="font-bold text-xs lg:text-base text-[#000000] mb-1">{f.title}</h3>
                <p className="text-gray-600 text-[10px] lg:text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#000000] to-[#000000] rounded-2xl p-6 lg:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <h3 className="font-bold text-lg lg:text-2xl mb-1">10+ Years of Building Meaningful Journeys</h3>
            <p className="text-white/60 text-sm">Make Your Plan Now!</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            <div className="text-center">
              <Users className="w-8 h-8 lg:w-10 lg:h-10 text-[#16a34a] mx-auto mb-1" />
              <div className="font-bold text-sm lg:text-base">80,000+</div>
              <div className="text-[10px] lg:text-xs text-white/70">Happy Travelers</div>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 lg:w-10 lg:h-10 text-[#16a34a] mx-auto mb-1" />
              <div className="font-bold text-sm lg:text-base">15,000+</div>
              <div className="text-[10px] lg:text-xs text-white/70">Curated Trips</div>
            </div>
            <div className="text-center">
              <Heart className="w-8 h-8 lg:w-10 lg:h-10 text-[#16a34a] mx-auto mb-1" />
              <div className="font-bold text-sm lg:text-base">10,000+</div>
              <div className="text-[10px] lg:text-xs text-white/70">Verified Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
