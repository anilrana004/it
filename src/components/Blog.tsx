import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const blogs = [
  { t: 'Why TrekRoot Is the Perfect Choice for Your All-Girls Trip | Safe & Fun Group Travel', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', d: '30 Jul', r: '6 min read', h: '/blog/girls-trip-with-trekroot' },
  { t: 'Book Now Pay Later with TrekRoot | Travel Now, Pay in EMIs', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', d: '25 Jun', r: '5 min read', h: '/blog/book-now-pay-later' },
  { t: 'Why School Trips Are More Than Just Fun Days Out: How TrekRoot Creates Life-Changing Educational Adventures', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', d: '18 Sep', r: '9 min read', h: '/blog/school-trips' },
  { t: '25 Best Places to Visit in India in July', img: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_420,h_280,c_fill,g_auto/', d: '16 Jun', r: '17 min read', h: '/blog/best-places-to-visit-in-india-in-july' },
];

export default function Blog() {
  return (
    <section className="py-8 lg:py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <div>
            <p className="text-[#ffaf21] font-semibold text-xs lg:text-sm tracking-widest uppercase mb-1">BLOGS</p>
            <h2 className="text-xl lg:text-3xl font-bold text-[#000000]">Our Blogs</h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-1 text-xs lg:text-sm font-medium text-[#ffaf21] hover:text-[#d49400]">
            View All <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" />
          </Link>
        </div>

        <div className="lg:hidden overflow-x-auto scrollbar-none -mx-4 px-4">
          <div className="flex gap-3 pb-2 w-max">
            {blogs.map(b => (
              <Link key={b.t} href={b.h} className="group flex w-[320px] shrink-0 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                <div className="w-[120px] shrink-0 overflow-hidden">
                  <img src={b.img} alt={b.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-1">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{b.d}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{b.r}</span>
                  </div>
                  <h3 className="font-semibold text-xs text-gray-900 leading-snug line-clamp-3 group-hover:text-[#ffaf21] transition-colors">{b.t}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          <Link href={blogs[0].h} className="group col-span-2 row-span-2 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
            <div className="relative h-72 overflow-hidden">
              <img src={blogs[0].img} alt={blogs[0].t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2.5 text-xs text-gray-500 mb-1.5">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{blogs[0].d}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blogs[0].r}</span>
              </div>
              <h3 className="font-semibold text-base text-gray-900 leading-snug line-clamp-3 group-hover:text-[#ffaf21] transition-colors">{blogs[0].t}</h3>
            </div>
          </Link>
          {blogs.slice(1).map(b => (
            <Link key={b.t} href={b.h} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="relative h-36 overflow-hidden">
                <img src={b.img} alt={b.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2.5 text-[11px] text-gray-500 mb-1.5">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{b.d}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{b.r}</span>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 leading-snug line-clamp-3 group-hover:text-[#ffaf21] transition-colors">{b.t}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
