import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { HOME_BLOG_SECTION, HOME_FEATURED_BLOG_POSTS } from '@/lib/content/home-blog';

export default function Blog() {
  const blogs = HOME_FEATURED_BLOG_POSTS;
  const featured = blogs[0];

  return (
    <section className="py-8 lg:py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <div>
            <p className="text-[#16a34a] font-semibold text-xs lg:text-sm tracking-widest uppercase mb-1">{HOME_BLOG_SECTION.kicker}</p>
            <h2 className="text-xl lg:text-3xl font-bold text-[#000000]">{HOME_BLOG_SECTION.title}</h2>
          </div>
          <Link href={HOME_BLOG_SECTION.viewAllHref} className="inline-flex items-center gap-1 text-xs lg:text-sm font-medium text-[#16a34a] hover:text-[#15803d]">
            {HOME_BLOG_SECTION.viewAllLabel} <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" />
          </Link>
        </div>

        <div className="lg:hidden overflow-x-auto scrollbar-none -mx-4 px-4">
          <div className="flex gap-3 pb-2 w-max">
            {blogs.map(b => (
              <Link key={b.id} href={b.href} className="group flex w-[320px] shrink-0 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                <div className="w-[120px] shrink-0 overflow-hidden">
                  <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-1">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{b.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{b.read}</span>
                  </div>
                  <h3 className="font-semibold text-xs text-gray-900 leading-snug line-clamp-3 group-hover:text-[#16a34a] transition-colors">{b.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          <Link href={featured.href} className="group col-span-2 row-span-2 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
            <div className="relative h-72 overflow-hidden">
              <img src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2.5 text-xs text-gray-500 mb-1.5">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{featured.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.read}</span>
              </div>
              <h3 className="font-semibold text-base text-gray-900 leading-snug line-clamp-3 group-hover:text-[#16a34a] transition-colors">{featured.title}</h3>
            </div>
          </Link>
          {blogs.slice(1).map(b => (
            <Link key={b.id} href={b.href} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="relative h-36 overflow-hidden">
                <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2.5 text-[11px] text-gray-500 mb-1.5">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{b.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{b.read}</span>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 leading-snug line-clamp-3 group-hover:text-[#16a34a] transition-colors">{b.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
