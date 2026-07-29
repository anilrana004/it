'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';

const reviews = [
  { name: 'Ankita Choudhary', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLm8pipAwjeBKv1ut2rnRx-unDhbdaXRVZvJLGR-jdys5moZw=s120-c-rp-mo-br100', text: 'I recently joined the Bali community trip organized by TrekRoot. This was my first solo trip, and not once did I feel like I was traveling alone. The group was amazing, and a special thanks to Nishant for ensuring everyone had a fantastic time.', trip: 'Bali with Gili Island Group Tour', tripImg: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=420&h=280&fit=crop', tripHref: '/treks' },
  { name: 'Deepak Bansal', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLOlBP7lkiIOZ8IMeMbiVYc1t1fnGr6Y3GJXTzjWu9QnV68uQ=s64-c-rp-mo-br100', text: 'Excellent service, I had Spiti bike trip with TrekRoot on 6th June 2026. They provided a very nice bike and no doubt best service I ever had. I got sick between the trip but the way they handled it was just great.', trip: 'Spiti Valley Bike and Backpacking Trip', tripImg: 'https://images.unsplash.com/photo-1586350977770-2598f1b6b7c8?w=420&h=280&fit=crop', tripHref: '/treks' },
  { name: 'Shivanand Pujari', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJFNs8uv9JSKBoUmiIh0ADF8rokVBkICM2cc2yVxqdgQSF9rw=s64-c-rp-mo-br100', text: 'Had been there for the Bhutan Bike & Backpacking trip from 14th to 21st March 2026. Had an amazing riding experience. Our trip leaders Prajwal and Abhishek were very supportive.', trip: 'Bhutan Bike and Backpacking', tripImg: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=420&h=280&fit=crop', tripHref: '/treks' },
];

export default function Reviews() {
  const [cur, setCur] = useState(0);
  const r = reviews[cur];

  return (
    <section className="py-8 lg:py-16 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-6 lg:mb-8">
          <p className="text-[#359DFC] font-semibold text-xs lg:text-sm tracking-[0.25em] uppercase mb-1">REVIEWS</p>
          <h2 className="text-xl lg:text-3xl font-bold text-[#1a1a2e]">What our Clients Say About Us</h2>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_,i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            </div>
            <span className="text-lg font-bold text-[#1a1a2e]">4.8 Rating</span>
            <span className="text-gray-400 text-sm">10,000+ Verified Reviews</span>
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
                    {[...Array(5)].map((_,i) => <Star key={i} className="w-3 h-3 lg:w-3.5 lg:h-3.5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-3 line-clamp-4">&ldquo;{r.text}&rdquo;</p>
              <a href="#" className="inline-flex items-center gap-1 text-xs lg:text-sm text-[#359DFC] hover:text-[#1a7de0] font-medium">
                Read more
              </a>
            </div>
            <div className="lg:w-1/2">
              <Link href={r.tripHref} className="group block">
                <div className="relative rounded-xl overflow-hidden mb-2">
                  <img src={r.tripImg} alt={r.trip} className="w-full h-40 lg:h-52 object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <p className="text-xs lg:text-sm font-semibold text-gray-800 group-hover:text-[#359DFC] transition-colors">{r.trip}</p>
                <span className="text-[11px] lg:text-xs text-[#359DFC] font-medium">Try Yourself &rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-5 lg:mt-6">
          {reviews.map((_, i) => (
            <button key={i} onClick={() => setCur(i)}
              className={`h-2 rounded-full transition-all ${i===cur?'bg-[#359DFC] w-8':'bg-gray-300 w-2'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
