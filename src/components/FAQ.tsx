'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: "What does Indian Treks Mean?", a: "Indian Treks stands for authentic Himalayan adventure and offbeat travel across India  -  a community rooted in treks, yatras, and meaningful journeys. If you are looking for experiences that go beyond ordinary tourism, Indian Treks is your destination." },
  { q: "Who are the Travelers of Indian Treks?", a: "Indian Treks, as a social travel community, gives more importance to community building and bringing together like-minded people. The travelers you meet will be people of your own age who share the love for exploring new places." },
  { q: "What Destinations does Indian Treks cover?", a: "Indian Treks covers a wide range of products including group departures to North India and North East India, bike and backpacking trips, weekend getaways, All Girls trips, International Escapes, Himalayan Treks, Corporate Tours, and Customized Tours." },
  { q: "How experienced are Indian Treks' Trip Captains?", a: "All of our key trip leaders are certified with AMC or BMC qualifications and are trained in first-aid procedures to ensure traveler safety. They will ensure you have a worry-free journey." },
  { q: "I am a Solo Traveler, can I join a Group Departure?", a: "Absolutely! Many of our travelers join group departures as solo wanderers and find their tribe during the journey. Carefully curated itineraries and hand-picked stays make Indian Treks the perfect choice for solo travelers." },
  { q: "What do you mean by All Girls Trips?", a: "All Girls Trips are a unique offering where women from different backgrounds come together to explore hidden places. The trip is headed by a female trip lead who is experienced and expert in the field." },
  { q: "Which International Destinations does Indian Treks operate?", a: "Indian Treks' International section opens doors to global adventures. Currently, we curate trips to Dubai, Thailand, Maldives, Bali, Vietnam, and Nepal." },
  { q: "What is the booking process for an Indian Treks Trip?", a: "The booking process is simple  -  explore available trips like Backpacking, Treks, Weekend Getaways, and International packages, select your trip, read the details, and proceed to booking." },
  { q: "Give me four simple reasons to travel with Indian Treks?", a: "1) Experience of more than 9 years. 2) Certifications and industry recognition. 3) Thousands of successful trips with outstanding reviews. 4) A community built on shared love for travel." },
  { q: "What are some notable achievements of Indian Treks?", a: "Indian Treks has been incubated by IIM Bangalore | NSRCEL, holds membership with tourism boards, won the TripAdvisor Travelers Choice Award, and has been recognized as a top travel enterprise." },
  { q: "What is the 'Indian Treks Community'?", a: "Once you travel with Indian Treks, you become part of a trusted travel community. You'll receive the newest travel updates, exclusive offers, and connect with fellow travelers who share your passion." },
  { q: "Does Indian Treks have an on-ground team?", a: "Yes! We have a dedicated team with 24-hour local support, ensuring we have all the information about routes and destinations before you travel. Your safety and comfort are our top priorities." },
  { q: "How unique are Indian Treks' biking trips?", a: "Our biking trips are unmatched! We run trips on India's most iconic routes including Khardungla, Umling La, Spiti Circuit, and the classic Manali to Leh highway. Expert marshals and Royal Enfield bikes come standard." },
  { q: "How to learn more about Indian Treks?", a: "Check out our Instagram, Facebook, YouTube, and Twitter channels for daily updates, travel stories, and community highlights. Our blog also features detailed travel guides and destination insights." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-10 lg:py-16 bg-gray-50">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#000000] mb-2">Have any Doubts</h2>
          <p className="text-gray-500 text-sm">Find answers to commonly asked questions</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <button onClick={() => setOpen(open===i?null:i)} className="w-full flex items-center justify-between gap-4 p-4 lg:p-6 text-left">
                <span className="font-semibold text-sm lg:text-base text-gray-900">{f.q}</span>
                <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${open===i?'rotate-180 text-[#16a34a]':'text-gray-400'}`} />
              </button>
              {open===i && <div className="px-4 lg:px-6 pb-4 lg:pb-6"><p className="text-gray-600 text-sm leading-relaxed">{f.a}</p></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
