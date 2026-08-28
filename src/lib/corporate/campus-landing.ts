import { photos } from '@/lib/media';
import type { LpLandingContent } from '@/lib/corporate/learning-program-types';

export const campusLanding: LpLandingContent = {
  variant: 'campus',
  hero: {
    eyebrow: 'Student program',
    title: 'Campus Ambassador Program',
    lead: 'Lead your campus travel community, earn trek credits, and grow real-world skills with Indian Treks',
    image: photos.hampta,
    primaryCta: 'Apply on WhatsApp',
    primaryWhatsapp:
      'Hi Indian Treks! I want to apply for the Campus Ambassador Program.',
    secondaryCta: 'Play video',
    youtubeId: '9vb3QfUth58',
  },
  premiumHero: {
    badge: 'Student program',
    titleMain: 'Campus Ambassador',
    titleAccent: 'Program',
    lead: 'Lead your campus travel community, earn trek credits, and grow real-world skills with Indian Treks.',
    trustLine: 'Trusted by student leaders across India',
    avatars: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    ],
    tagline: 'Lead Your Campus, Reach the Summit',
    panel: [
      { title: 'Real Travel Rewards', sub: 'Earn trek credits for every referral' },
      { title: 'Leadership Skills', sub: 'Run events and mentor peers on campus' },
      { title: 'Brand Mentorship', sub: 'Learn from trip leaders and the team' },
      { title: 'Nationwide Network', sub: 'Connect with ambassadors across India' },
    ],
    stats: [
      { value: '100+ Campus Ambassadors', sub: 'Active across India' },
      { value: '4.9/5 Program Rating', sub: 'By student leaders' },
      { value: '20+ Partner Colleges', sub: 'Building explorer communities' },
      { value: '100% Remote Friendly', sub: 'Work around your schedule' },
    ],
    features: [
      { title: 'Flexible Commitment', sub: 'Balance academics and ambassadorship' },
      { title: 'Any College', sub: 'Pan-India campuses welcome' },
      { title: 'Expert Mentorship', sub: 'Guidance from the Indian Treks team' },
      { title: 'Trek Credits', sub: 'Redeem rewards on Himalayan journeys' },
    ],
  },
  brands: {
    kicker: 'Campuses we work with',
    title: 'Trusted by Student Leaders Across the Country',
    intro: 'Ambassadors building explorer communities from campuses nationwide.',
    items: Array.from({ length: 8 }, (_, i) => ({
      id: `campus-brand-${i + 1}`,
      name: 'Campus partner',
    })),
  },
  benefits: {
    kicker: 'Why join',
    title: 'How do campus ambassadors benefit?',
    intro: 'Beyond a title on LinkedIn, ambassadors:',
    items: [
      'Earn travel credits and exclusive trek discounts',
      'Build leadership by running campus communities',
      'Gain mentorship from trip leaders and the brand team',
      'Create portfolio-ready campaigns and events',
      'Network with explorers across colleges',
      'Represent a purpose-led travel brand they believe in',
    ],
    image: photos.kedarkantha,
    imageAlt: 'Campus ambassadors on a Himalayan trek',
  },
  whyBetter: {
    kicker: 'Why this program',
    title: 'Why campus ambassadorship beats generic college clubs',
    items: [
      {
        title: 'Real travel rewards',
        body: 'Successful referrals unlock trek credits — experience you can actually take to the mountains.',
      },
      {
        title: 'Leadership you can show',
        body: 'Run activations, briefings, and peer mentoring with measurable outcomes for your CV.',
      },
      {
        title: 'Brand & ops mentorship',
        body: 'Learn how a travel company works — storytelling, safety culture, and community building.',
      },
      {
        title: 'Nationwide peer network',
        body: 'Connect with ambassadors from other campuses who share the same outdoor curiosity.',
      },
      {
        title: 'Certificate & recognition',
        body: 'Finish with a certificate and projects you can showcase to recruiters or internship panels.',
      },
      {
        title: 'Purpose over posters',
        body: 'You are not selling random merch — you are inviting peers into meaningful Himalayan journeys.',
      },
    ],
  },
  reviews: {
    kicker: 'Ambassador stories',
    title: 'What campus leaders have to say',
    intro: 'Students who built communities — and earned their way onto the trail.',
    items: [
      {
        id: 'isha-c',
        name: 'Isha Nair',
        role: 'Ambassador · Bengaluru',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=160&q=80',
        trekLink: { label: 'Kedarkantha Trek', href: '/treks/kedarkantha' },
        short: 'I went from shy fresher to leading trek briefings on campus. The credits helped me join Kedarkantha.',
        full: 'I went from shy fresher to leading trek briefings on campus. The credits helped me join Kedarkantha with friends I met through the program. Mentorship was practical, not fluff.',
      },
      {
        id: 'dev-c',
        name: 'Dev Malhotra',
        role: 'Ambassador · Delhi',
        avatar:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=160&q=80',
        trekLink: { label: 'Hampta Pass Trek', href: '/treks/hampta-pass' },
        short: 'Best leadership experience of college. Real targets, real community, real mountains.',
        full: 'Best leadership experience of college. Real targets, real community, real mountains. I learned event planning and storytelling while helping batchmates book their first trek.',
      },
      {
        id: 'sara-c',
        name: 'Sara Fernandes',
        role: 'Ambassador · Pune',
        avatar:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=160&q=80',
        trekLink: { label: 'Backpacking Trips', href: '/backpacking' },
        short: 'The network is gold. Ambassadors from other cities still message me about trails.',
        full: 'The network is gold. Ambassadors from other cities still message me about trails and batch tips. Indian Treks treated us like partners, not free labour.',
      },
      {
        id: 'arjun-c',
        name: 'Arjun Mehta',
        role: 'Ambassador · Chandigarh',
        avatar:
          'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=160&q=80',
        trekLink: { label: 'Chopta Tungnath Trek', href: '/treks/chopta-tungnath' },
        short: 'Certificate plus trek credits made this the most useful campus role I’ve had.',
        full: 'Certificate plus trek credits made this the most useful campus role I’ve had. Clear playbooks, WhatsApp support, and freedom to run creative campus ideas.',
      },
      {
        id: 'tanya-c',
        name: 'Tanya Bose',
        role: 'Ambassador · Hyderabad',
        avatar:
          'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=160&q=80',
        trekLink: { label: 'Beginner-Friendly Treks', href: '/beginner-friendly-treks' },
        short: 'I helped 18 classmates take their first Himalayan trek. That still feels surreal.',
        full: 'I helped 18 classmates take their first Himalayan trek. That still feels surreal. The program gave structure; the mountains gave meaning.',
      },
      {
        id: 'kabir-c',
        name: 'Kabir Shah',
        role: 'Ambassador · Mumbai',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=160&q=80',
        trekLink: { label: 'Browse All Treks', href: '/treks' },
        short: 'If you love outdoors and people, apply. You’ll grow faster than in any classroom club.',
        full: 'If you love outdoors and people, apply. You’ll grow faster than in any classroom club — communication, ownership, and confidence included.',
      },
    ],
  },
  difficulties: {
    kicker: 'The campus reality',
    title: 'What makes student travel communities hard to build?',
    intro: 'Students want adventure — but time, money, and trust get in the way.',
    items: [
      'Peers hesitate without trusted recommendations and clear safety info',
      'Generic clubs lack real travel rewards and outdoor expertise',
      'Busy calendars need flexible, well-communicated plans',
      'First-timers need guidance from someone who has actually trekked',
    ],
    image: photos.triund,
    imageAlt: 'Students preparing for a campus trek briefing',
  },
  programmes: {
    kicker: 'How the program works',
    title: 'A clear path from application to trail',
    intro: 'Whether you want to lead quietly or host big campus meets — there’s a lane for you.',
    enquirePrefix: 'Hi Indian Treks! I’m interested in the campus track:',
    items: [
      {
        id: 'apply-onboard',
        title: 'Apply & onboard',
        blurb: 'Share your campus, year, and why you want to lead. We shortlist and onboard on WhatsApp.',
        duration: '1–2 weeks',
        location: 'Pan-India campuses',
        overview:
          'Selected ambassadors get a starter kit: brand guidelines, trek cheat-sheets, referral flow, and a buddy from the team.',
        image: photos.uttarakhand,
      },
      {
        id: 'activate',
        title: 'Activate your campus',
        blurb: 'Run stalls, reels, briefings, and peer mentoring that help first-timers start strong.',
        duration: 'Semester-long',
        location: 'Your campus',
        overview:
          'You choose formats that fit your college culture. We support content, FAQs, and safety answers so conversations stay credible.',
        image: photos.chopta,
      },
      {
        id: 'earn-trek',
        title: 'Earn & trek',
        blurb: 'Convert referrals into travel credits, certificates, and your own Himalayan journeys.',
        duration: 'Ongoing',
        location: 'UK & HP departures',
        overview:
          'Top ambassadors unlock trek seats, merch, and recognition. The goal is simple: grow a community that actually goes outdoors.',
        image: photos.kedarkantha,
      },
    ],
  },
  treks: {
    kicker: 'Ambassador favourites',
    title: 'Treks campus communities love',
    intro: 'Great first and second Himalayan journeys to recommend to peers.',
    note: 'Ambassadors often start peers on Easy / Easy-Moderate UK & HP routes before bigger adventures.',
    ids: [
      'nag-tibba',
      'kheerganga',
      'mcleodganj-trek',
      'chopta-tungnath',
      'dayara-bugyal',
      'kedarkantha',
      'bhrigu-lake',
      'hampta-pass',
      'kuari-pass',
      'beas-kund',
    ],
  },
  gallery: {
    kicker: 'Campus to summit',
    title: 'From college grounds to the mountains',
    items: [
      { src: photos.hampta, alt: 'Campus group on a Himalayan pass trek' },
      { src: photos.kedarkantha, alt: 'Students celebrating a winter summit' },
      { src: photos.triund, alt: 'Overnight campus trek camping' },
      { src: photos.chopta, alt: 'Ambassador-led batch on trail' },
    ],
  },
  cta: {
    kicker: 'Apply now',
    title: 'Ready to lead your campus explorer community?',
    body: 'Tell us your college and city — we’ll share the ambassador brief and next steps on WhatsApp.',
    primaryWhatsapp:
      'Hi Indian Treks! I want to apply for the Campus Ambassador Program.',
    primaryLabel: 'Apply on WhatsApp',
    secondaryHref: '#inquiry',
    secondaryLabel: 'Submit interest form',
  },
  articles: {
    kicker: 'Start exploring',
    title: 'Reading for new ambassadors',
    items: [
      {
        title: 'How to prepare for your first Himalayan trek',
        href: '/how-to-prepare',
        image: photos.triund,
        read: '8 min read',
      },
      {
        title: 'Beginner-friendly treks',
        href: '/beginner-friendly-treks',
        image: photos.chopta,
        read: 'Guide',
      },
      {
        title: 'Fitness training plan',
        href: '/fitness-training-plan',
        image: photos.kedarkantha,
        read: '7 min read',
      },
      {
        title: 'Family & friend group trekking',
        href: '/blog/family-trekking-in-india',
        image: photos.hampta,
        read: '18 min read',
      },
    ],
  },
  inquiry: {
    kicker: 'Apply',
    title: 'Campus ambassador interest form',
    intro: 'Share your details — our student partnerships team will reply within 24 hours.',
    orgLabel: 'College / university',
    sizeLabel: 'Year of study',
    sizeOptions: ['1st year', '2nd year', '3rd year', 'Final year', 'Postgrad'],
    programmeLabel: 'Interest track',
    whatsappFallback: 'Hi Indian Treks! I want to join as a Campus Ambassador.',
    successBody: 'Thanks for applying! Our campus team will WhatsApp you within 24 hours.',
  },
};
