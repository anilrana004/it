import { CONTACT } from '@/lib/contact';

export type AffiliateDestination = {
  title: string;
  paragraphs: string[];
};

export type AffiliateHighlight = {
  title: string;
  body: string;
};

export type AffiliateSection = {
  id: string;
  title: string;
  subtitle?: string;
  paragraphs?: string[];
  paragraphsAfter?: string[];
  bullets?: string[];
  destinations?: AffiliateDestination[];
  highlights?: AffiliateHighlight[];
  flow?: string;
  taglines?: string[];
  cta?: { label: string; href: string; icon: string };
};

export const AFFILIATES_HERO = {
  eyebrow: 'Affiliates',
  title: 'Partner With IndianTreks',
  subtitle: 'Build Himalayan Experiences With a Trusted Ground Partner',
  stats: [
    { value: '2015', label: 'Operating since' },
    { value: 'B2B', label: 'Agent partnerships' },
    { value: 'End-to-end', label: 'Ground operations' },
    { value: 'Uttarakhand+', label: 'Himalayan network' },
  ],
  intro: [
    'Since 2015, IndianTreks has been building and operating Himalayan travel experiences with a strong focus on safety, quality, reliable ground operations, and responsible mountain travel.',
    'We work with travel agencies, tour operators, educational institutions, student communities, corporate groups, and travel partners who are looking for a dependable Himalayan partner capable of managing everything from itinerary planning to on-ground execution.',
    'Unlike a partner that only sells trekking packages, IndianTreks operates its own ground infrastructure across key Himalayan destinations. Our local presence, accommodation network, transportation resources, campsites, trained ground teams, and destination-level coordination allow us to provide better control over the overall travel experience.',
    'From Kedarkantha and Har Ki Dun in Sankri to Valley of Flowers and Kuari Pass around Joshimath, Chopta in Uttarakhand, and major Char Dham destinations, our teams work directly on the ground to coordinate accommodation, transportation, trekking operations, meals, logistics, and guest support.',
  ],
};

export const AFFILIATES_SECTIONS: AffiliateSection[] = [
  {
    id: 'why-partner',
    title: 'Why Partner With IndianTreks?',
    subtitle: 'Built on Ground-Level Experience Since 2015',
    paragraphs: [
      'For us, Himalayan travel is not simply about selling a package. It is about knowing the destination, understanding the terrain, maintaining local relationships, and being present when our guests need support.',
      'Our experience since 2015 has helped us develop a strong operational network across Uttarakhand, Himachal Pradesh, and selected Himalayan destinations in Nepal.',
    ],
    bullets: [
      'Direct ground-level coordination',
      'Experienced local teams',
      'Destination-specific operational knowledge',
      'Reliable transportation arrangements',
      'Accommodation and campsite infrastructure',
      'Trek leaders and support staff',
      'Customised itineraries and departures',
      'Group and private departures',
      'B2B pricing and partner support',
      'Flexible itinerary planning',
      'End-to-end trip coordination',
      'Dedicated support before and during the trip',
    ],
  },
  {
    id: 'infrastructure',
    title: 'Our Own Ground Infrastructure',
    paragraphs: [
      'One of the biggest advantages of working with IndianTreks is our direct involvement in the ground operations.',
      'We have developed our own accommodation, camps, transportation resources, and local operational network at important Himalayan destinations.',
    ],
    destinations: [
      {
        title: 'Sankri – Kedarkantha & Har Ki Dun',
        paragraphs: [
          'Sankri is one of our key operating bases in Uttarakhand.',
          'For treks such as Kedarkantha and Har Ki Dun, we have our own accommodation presence in the Sankri base area, allowing us to maintain better control over guest stays, pre-trek coordination, team briefing, luggage management, and departure operations.',
          'Our local team understands the routes, villages, weather conditions, trekking logistics, and seasonal requirements of the region.',
        ],
      },
      {
        title: 'Chopta – Tungnath & Chandrashila',
        paragraphs: [
          'Chopta is another important operating destination for IndianTreks.',
          'We have our own Swiss camp accommodation setup in Chopta, allowing us to provide a more controlled and comfortable stay experience for trekking and adventure groups.',
          'From Chopta–Tungnath–Chandrashila departures to customised group programs, our local team manages accommodation, meals, transportation, trek coordination, and on-ground support.',
        ],
      },
      {
        title: 'Valley of Flowers & Hemkund Sahib',
        paragraphs: [
          'For Valley of Flowers, Hemkund Sahib and related Himalayan programs, our operations are supported through our own accommodation network and local teams around the Joshimath–Pandukeshwar–Ghangaria region.',
          'This local presence helps us coordinate guest stays, transportation, trekking arrangements, meals, luggage support, permits and other operational requirements efficiently during the season.',
        ],
      },
      {
        title: 'Kuari Pass',
        paragraphs: [
          'Kuari Pass is another important Himalayan destination where our local network around Joshimath and the surrounding region supports trekking operations.',
          'Our destination-level understanding allows us to design both fixed departures and customised group itineraries depending on the requirements of our partners.',
        ],
      },
      {
        title: 'Char Dham & Spiritual Travel',
        paragraphs: [
          'IndianTreks also operates Char Dham, Do Dham and other spiritual travel programs across Uttarakhand.',
          'We work with established hotels and local service providers across the pilgrimage circuit and have dedicated teams for transportation, accommodation coordination, guest assistance and itinerary management.',
          'For B2B partners, this means you can offer Himalayan pilgrimage programs through a team that understands the destination and manages the trip on the ground.',
        ],
      },
    ],
  },
  {
    id: 'transportation',
    title: 'Our Transportation Network',
    paragraphs: [
      'Transportation is one of the most important parts of Himalayan travel.',
      'IndianTreks has its own Tempo Travellers and transportation resources, supported by a wider network of trusted local transport partners.',
      'This allows us to manage:',
    ],
    bullets: [
      'Airport and railway station transfers',
      'Dehradun and Rishikesh pickups',
      'Trek base transfers',
      'Inter-destination transportation',
      'Group transportation',
      'Private vehicle arrangements',
      'Tempo Traveller requirements',
      'Char Dham transportation',
      'Custom group movements',
    ],
    paragraphsAfter: [
      'Having direct access to transportation gives us greater flexibility when managing group departures and customised itineraries.',
    ],
  },
  {
    id: 'ground-team',
    title: 'A Strong On-Ground Team',
    paragraphs: [
      'A Himalayan trip requires much more than a booking confirmation.',
      'Our on-ground teams, trek leaders, drivers, local coordinators and support staff work together to manage the practical requirements of every departure.',
      'From the moment a group arrives at the pickup point to their return journey, our teams coordinate the key elements of the trip.',
      'This includes:',
    ],
    flow: 'Transportation → Accommodation → Meals → Trek Operations → Local Coordination → Guest Support → Return Transfers',
    paragraphsAfter: [
      'Our goal is simple: our B2B partners should be able to sell the experience with confidence while our team takes care of the ground execution.',
    ],
  },
  {
    id: 'b2b',
    title: 'B2B Travel Agents & Tour Operators',
    paragraphs: [
      'If you are a travel agency, tour operator, DMC, reseller or independent travel professional, IndianTreks can become your reliable Himalayan ground partner.',
      'We provide:',
    ],
    bullets: [
      'B2B trekking packages',
      'Fixed group departures',
      'Private departures',
      'Customised itineraries',
      'Group pricing',
      'Custom quotations',
      'Ground handling',
      'Hotel and campsite coordination',
      'Transportation',
      'Trek leaders and support teams',
      'Spiritual and pilgrimage programs',
      'Corporate group travel',
      'Student and educational trips',
    ],
    paragraphsAfter: [
      'You can bring your clients to us with your requirements, and our team can help design and execute the trip according to your market, group size, budget and travel dates.',
    ],
    taglines: ['Your Clients. Our Ground Team.', 'You focus on your customers, sales and relationships.', 'We take care of the Himalayan ground operations.'],
    cta: {
      label: 'Contact B2B team',
      href: '/contact',
      icon: 'fa-handshake',
    },
  },
  {
    id: 'campus',
    title: 'Campus Ambassador Program',
    paragraphs: [
      'Our Campus Ambassador Program is designed for students who are passionate about travel, trekking and building communities.',
      'As an IndianTreks Campus Ambassador, you can represent the brand at your college, create a trekking and travel community, participate in campaigns and help more students discover responsible Himalayan travel.',
      'Ambassadors receive opportunities to:',
    ],
    bullets: [
      'Build a travel community',
      'Organise college trekking groups',
      'Work with the IndianTreks team',
      'Learn about travel and outdoor operations',
      'Receive mentorship from experienced trek leaders',
      'Earn rewards and program credits',
      'Develop leadership and communication skills',
    ],
    paragraphsAfter: [
      'Whether you are a student leader, trekking enthusiast or someone who wants to build experience in the travel industry, the program gives you an opportunity to grow with IndianTreks.',
    ],
    cta: {
      label: 'Apply as a Campus Ambassador',
      href: '/campus-ambassador',
      icon: 'fa-graduation-cap',
    },
  },
  {
    id: 'corporate',
    title: 'Corporate & Team Outings',
    paragraphs: [
      'IndianTreks helps companies plan corporate treks, team outings, adventure programs and customised Himalayan experiences.',
      'We can customise programs according to your team size, preferred destination, duration and budget.',
      'Our corporate programs can include:',
    ],
    bullets: [
      'Private departures',
      'Custom durations',
      'Transportation',
      'Accommodation',
      'Meals',
      'Trek leaders',
      'On-ground support',
      'Team-building activities',
      'Certificates',
      'Branded kits',
      'Custom group experiences',
    ],
    paragraphsAfter: [
      'From a short Himalayan getaway to a multi-day trekking experience, our team can design and execute the program end-to-end.',
    ],
    cta: {
      label: 'Corporate treks',
      href: '/corporate',
      icon: 'fa-briefcase',
    },
  },
  {
    id: 'referral',
    title: 'Referral & Affiliate Partnerships',
    paragraphs: [
      'If you are a content creator, travel community, blogger, social media page, student community, trekking enthusiast or travel professional, you can explore referral and affiliate opportunities with IndianTreks.',
      'Tell us about your:',
    ],
    bullets: [
      'Audience',
      'Region',
      'Community size',
      'Travel interests',
      'Preferred destinations',
      'Partnership model',
    ],
    paragraphsAfter: [
      'Our team can discuss a suitable collaboration model based on your audience and requirements.',
    ],
  },
  {
    id: 'why-indiantreks',
    title: 'Why IndianTreks?',
    highlights: [
      {
        title: 'Since 2015',
        body: 'Years of experience in Himalayan trekking, adventure and spiritual travel.',
      },
      {
        title: 'Government Registered',
        body: "IndianTreks is registered with Uttarakhand Tourism, reflecting our commitment to operating within the state's tourism framework.",
      },
      {
        title: 'Our Own Infrastructure',
        body: 'Own and directly operated accommodation and camping infrastructure at key Himalayan destinations, along with a strong network of local stays.',
      },
      {
        title: 'Our Own Vehicles',
        body: 'Access to our own Tempo Travellers and a trusted transportation network for group and private departures.',
      },
      {
        title: 'Local Expertise',
        body: 'Our teams operate directly across important Himalayan destinations and understand the local terrain, routes and seasonal conditions.',
      },
      {
        title: 'End-to-End Operations',
        body: 'From pickup to accommodation, meals, trekking operations, transportation and return transfers, we can coordinate the complete journey.',
      },
      {
        title: 'Customised Solutions',
        body: "We don't believe every group should travel on the same itinerary. We create programs according to your group, budget, dates and requirements.",
      },
      {
        title: 'Reliable B2B Support',
        body: 'Our team works closely with partners before, during and after the trip to ensure smooth communication and execution.',
      },
    ],
  },
];

export const AFFILIATES_CLOSING = {
  title: 'Partner With a Company That Operates on the Ground',
  paragraphs: [
    'When you partner with IndianTreks, you are not simply purchasing a trekking package.',
    'You are partnering with a team that has local experience, operational infrastructure, transportation resources, accommodation networks and destination-level knowledge.',
    'We understand that your reputation is connected to the experience your clients receive.',
    'That is why we focus on transparent communication, dependable operations, quality accommodation, experienced teams and responsible Himalayan travel.',
    "Let's Build Better Himalayan Experiences Together.",
    'Whether you are a travel agency, tour operator, college representative, corporate HR/team leader, travel community, content creator or destination partner, we would be happy to explore a long-term collaboration.',
    'Partner with IndianTreks and bring your clients to the Himalayas with confidence.',
  ],
  ctaLabel: 'Contact Our B2B Team',
  email: CONTACT.email,
  whatsapp: CONTACT.phoneDisplay,
};
