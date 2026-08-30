'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { HOME_REVIEWS, HOME_REVIEWS_SECTION } from '@/lib/content/home-reviews';

export default function Reviews() {
  const [cur, setCur] = useState(0);
  const r = HOME_REVIEWS[cur];

  return (
    <section id="reviews" className="py-8 lg:py-16 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-6 lg:mb-8">
          <p className="text-[#16a34a] font-semibold text-xs lg:text-sm tracking-[0.25em] uppercase mb-1">{HOME_REVIEWS_SECTION.kicker}</p>
          <h2 className="text-xl lg:text-3xl font-bold text-[#000000]">{HOME_REVIEWS_SECTION.title}</h2>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            </div>
            <span className="text-lg font-bold text-[#000000]">{HOME_REVIEWS_SECTION.ratingLabel}</span>
            <span className="text-gray-400 text-sm">{HOME_REVIEWS_SECTION.countLabel}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 lg:p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-3">
                <img src={r.avatar} alt={r.name} className="w-11 h-11 lg:w-14 lg:h-14 rounded-full object-cover ring-2 ring-gray-200" />
                <div>
                  <h4 className="font-bold text-sm lg:text-base text-gray-900">{r.name}</h4>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 lg:w-3.5 lg:h-3.5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-3 line-clamp-4">&ldquo;{r.text}&rdquo;</p>
              <Link href="/reviews" className="inline-flex items-center gap-1 text-xs lg:text-sm text-[#16a34a] hover:text-[#15803d] font-medium">
                {HOME_REVIEWS_SECTION.readMoreLabel}
              </Link>
            </div>
            <div className="lg:w-1/2">
              <Link href={r.tripHref} className="group block">
                <div className="relative rounded-xl overflow-hidden mb-2">
                  <img src={r.tripImg} alt={r.trip} referrerPolicy="no-referrer" className="w-full h-40 lg:h-52 object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <p className="text-xs lg:text-sm font-semibold text-gray-800 group-hover:text-[#16a34a] transition-colors">{r.trip}</p>
                <span className="text-[11px] lg:text-xs text-[#16a34a] font-medium">{HOME_REVIEWS_SECTION.tryLabel} &rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-5 lg:mt-6">
          {HOME_REVIEWS.map((review, i) => (
            <button key={review.id} type="button" onClick={() => setCur(i)}
              className={`h-2 rounded-full transition-all ${i === cur ? 'bg-[#16a34a] w-8' : 'bg-gray-300 w-2'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
