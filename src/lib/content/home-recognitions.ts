export type HomeRecognitionLogo = {
  id: string;
  name: string;
  img: string;
};

export const HOME_RECOGNITIONS_SECTION = {
  kicker: 'RECOGNITIONS',
  title: 'Recognitions By Govt.',
  subtitle: 'Recognized by Startup India, registered with ATOAI, and recipient of the TripAdvisor Travelers Choice Award.',
} as const;

export const HOME_RECOGNITION_LOGOS: HomeRecognitionLogo[] = [
  { id: 'startup-india', name: 'Startup India', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Startup_India_logo.svg/200px-Startup_India_logo.svg.png' },
  { id: 'msme', name: 'MSME', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/MSME_Logo.svg/200px-MSME_Logo.svg.png' },
  { id: 'atoai', name: 'ATOAI', img: 'https://www.atoai.org/wp-content/uploads/2020/01/atoai-logo.png' },
  { id: 'iim-bangalore', name: 'IIM Bangalore', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/27/IIM_Bangalore_logo.svg/200px-IIM_Bangalore_logo.svg.png' },
  { id: 'tripadvisor', name: 'TripAdvisor', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/TripAdvisor_logo.svg/200px-TripAdvisor_logo.svg.png' },
  { id: 'bengal-tourism', name: 'Bengal Tourism', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Seal_of_West_Bengal.svg/120px-Seal_of_West_Bengal.svg.png' },
  { id: 'uttarakhand-tourism', name: 'Uttarakhand Tourism', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Uttarakhand_Seal.svg/200px-Uttarakhand_Seal.svg.png' },
  { id: 'business-standard', name: 'Business Standard', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Business_Standard_Logo.svg/200px-Business_Standard_Logo.svg.png' },
  { id: 'himachal-tourism', name: 'Himachal Tourism', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Himachal_Pradesh_Seal.svg/120px-Himachal_Pradesh_Seal.svg.png' },
];
