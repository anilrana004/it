export default function CareersPage() {
  return (
    <div className="pt-20 lg:pt-28 pb-12 lg:pb-20">
      <section className="relative h-[35vh] min-h-[220px] overflow-hidden mb-8">
        <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&h=500&fit=crop" alt="Careers" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
          <div className="container mx-auto px-4"><h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white mb-2">Career With Indian Treks</h1><p className="text-gray-200 text-lg">Where Adventure Meets Opportunity</p></div>
        </div>
      </section>
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-10">
          <p className="text-gray-600 text-sm lg:text-base max-w-2xl mx-auto">We are a vibrant Social Travel Community that brings like-minded explorers together through meticulously organized trips and fixed departures. If you&apos;re eager to make a difference in the travel industry and help others create unforgettable memories, you&apos;ve come to the right place!</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
          {[
            { t: 'Help Build a Community', d: 'Make a positive impact on travelers\' experiences' },
            { t: 'Growth & Learning', d: 'We invest in your personal and professional growth' },
            { t: 'Work-Life Balance', d: 'Flexible work hours and freedom to work from anywhere' },
          ].map(f => (
            <div key={f.t} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
              <h3 className="font-bold text-gray-900 text-sm mb-1">{f.t}</h3>
              <p className="text-xs text-gray-500">{f.d}</p>
            </div>
          ))}
        </div>
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#000000] text-center mb-6">Current Openings</h2>
        <div className="space-y-3">
          {['Operations Executive', 'Freelance Trip Lead', 'Corporate Sales', 'Full Stack Developer', 'Talent & Culture Manager'].map(job => (
            <div key={job} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{job}</h3>
                <p className="text-xs text-gray-500">Full Time · Remote</p>
              </div>
              <button className="bg-[#16a34a] text-white text-xs font-semibold px-5 py-2 rounded-full hover:bg-[#15803d] transition-all">Apply Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
