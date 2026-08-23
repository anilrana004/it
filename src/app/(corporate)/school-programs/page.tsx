import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Leaf, Shield, Users } from 'lucide-react';
import { photos } from '@/lib/media';
import { corporateMailtoUrl } from '@/lib/corporate-hub-nav';

export const metadata: Metadata = {
  title: 'School Programs | Indian Treks — Educational Himalayan Outings',
  description:
    'Safe, curriculum-aligned school trekking and outdoor learning programs in the Himalayas — environmental education, leadership, and age-appropriate trails.',
};

const programs = [
  {
    title: 'Nature & Environment Camps',
    desc: 'Forest walks, biodiversity sessions, and sustainability workshops designed for middle and senior school students.',
    icon: Leaf,
  },
  {
    title: 'Leadership & Team Trails',
    desc: 'Moderate Himalayan day hikes and camp experiences that build confidence, teamwork, and resilience.',
    icon: Users,
  },
  {
    title: 'Heritage & Geography Tours',
    desc: 'Curriculum-linked trips covering local culture, river systems, glaciology, and mountain geography.',
    icon: BookOpen,
  },
  {
    title: 'Safety-Led Operations',
    desc: 'Trained leaders, medical kits, parent briefings, consent workflows, and 1:10 leader ratios on youth programs.',
    icon: Shield,
  },
];

export default function SchoolProgramsPage() {
  return (
    <div className="pb-12 lg:pb-20">
      <section className="relative h-[38vh] min-h-[240px] overflow-hidden mb-10">
        <img
          src={photos.uttarakhand}
          alt="School trekking program in the Himalayas"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/30 flex items-center">
          <div className="container mx-auto px-4">
            <p className="text-[#86efac] text-xs font-semibold tracking-widest uppercase mb-2">
              Educational Outings
            </p>
            <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white mb-2">
              School Programs
            </h1>
            <p className="text-white/80 text-sm lg:text-lg max-w-2xl">
              Safe, inspiring Himalayan experiences for students — planned with schools, parents, and educators.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-10">
          {programs.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="w-10 h-10 rounded-full bg-[#dcfce7] flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#16a34a]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 mb-10">
          <h2 className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-gray-900 mb-3">
            What schools receive
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
            {[
              'Pre-trip parent orientation and consent pack',
              'Custom itinerary aligned to group age and fitness',
              'Vegetarian meal planning and hygienic camp stays',
              'Transport coordination from nearest city hub',
              'Post-trip reflection worksheets for students',
              'Dedicated school coordinator on WhatsApp',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <i className="fa-solid fa-check text-[#16a34a] mt-0.5 text-xs" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#14532d] rounded-2xl p-6 lg:p-8 text-white text-center">
          <h2 className="text-xl lg:text-2xl font-bold mb-2">Plan a school outing</h2>
          <p className="text-white/75 text-sm mb-5 max-w-lg mx-auto">
            Share your school name, student count, and preferred month. Our corporate team will propose
            safe trail options and a detailed safety brief.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/919797972175?text=${encodeURIComponent('Hi! We want to plan a school trekking program with Indian Treks.')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-6 py-3 rounded-full transition-all"
            >
              Enquire on WhatsApp <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={corporateMailtoUrl('School program enquiry — Indian Treks')}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-6 py-3 rounded-full transition-all"
            >
              Email corporate team
            </a>
            <Link
              href="/corporate"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-6 py-3 rounded-full transition-all"
            >
              Corporate tours
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
