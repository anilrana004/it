export default function Recognitions() {
  const logos = [
    { name: 'Startup India', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Startup_India_logo.svg/200px-Startup_India_logo.svg.png' },
    { name: 'MSME', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/MSME_Logo.svg/200px-MSME_Logo.svg.png' },
    { name: 'ATOAI', img: 'https://www.atoai.org/wp-content/uploads/2020/01/atoai-logo.png' },
    { name: 'IIM Bangalore', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/27/IIM_Bangalore_logo.svg/200px-IIM_Bangalore_logo.svg.png' },
    { name: 'TripAdvisor', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/TripAdvisor_logo.svg/200px-TripAdvisor_logo.svg.png' },
    { name: 'Bengal Tourism', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Seal_of_West_Bengal.svg/120px-Seal_of_West_Bengal.svg.png' },
    { name: 'Uttarakhand Tourism', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Uttarakhand_Seal.svg/200px-Uttarakhand_Seal.svg.png' },
    { name: 'Business Standard', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Business_Standard_Logo.svg/200px-Business_Standard_Logo.svg.png' },
    { name: 'Himachal Tourism', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Himachal_Pradesh_Seal.svg/120px-Himachal_Pradesh_Seal.svg.png' },
  ];

  return (
    <section className="py-8 lg:py-16">
      <div className="container mx-auto">
        <div className="text-center mb-6 lg:mb-8">
          <p className="text-[#afde1e] font-semibold text-xs lg:text-sm tracking-widest uppercase mb-1">RECOGNITIONS</p>
          <h2 className="text-xl lg:text-3xl font-bold text-[#040921]">Recognitions By Govt.</h2>
          <p className="text-gray-500 text-xs lg:text-sm mt-1 max-w-xl mx-auto">Recognized by Startup India, registered with ATOAI, and recipient of the TripAdvisor Travelers Choice Award.</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-6">
          {logos.map(l => (
            <div key={l.name} className="bg-white rounded-xl px-4 lg:px-6 py-3 lg:py-4 shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-center justify-center">
              <img src={l.img} alt={l.name} className="h-6 lg:h-8 object-contain grayscale hover:grayscale-0 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
