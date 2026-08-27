import {
  Compass,
  Mountain,
  Route,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Users,
} from 'lucide-react';
import type { SplLandingContent } from '@/lib/special-programs/landing-types';
import { photos } from '@/lib/media';

export const beginnerLanding: SplLandingContent = {
  programId: 'beginner',
  premiumHero: {
    badge: 'Special programmes',
    titleMain: 'Special Treks for',
    titleAccent: 'Beginners',
    tagline: {
      before: 'Start simple. Walk ',
      highlight: 'strong',
      after: '. Fall in love with the mountains.',
    },
    lead: 'First Himalayan treks chosen for clear trails, gradual climbs, and leaders who know how to turn first-timers into confident mountain travellers.',
    trustLine: 'Trusted by 30,000+ first-time trekkers across India',
    avatars: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    ],
    pathTagline: 'One step at a time, all the way up.',
    panelKicker: 'Built for first steps',
    panel: [
      {
        title: 'Easy & easy-to-moderate trail grades',
        sub: 'Clear paths, gradual climbs & scenic early rewards',
      },
      {
        title: 'Experienced leaders who teach on trail',
        sub: 'Packing, pacing & altitude basics explained as you go',
      },
      {
        title: 'A supportive group for first-timers',
        sub: 'No ego climbs — learn together, celebrate together',
      },
      {
        title: 'Shorter days & well-marked routes',
        sub: 'Ideal stepping stones before bigger adventures',
      },
    ],
    panelPromise: 'Curious. Supported. Summit-ready. That’s the Indian Treks promise.',
    features: [
      { title: 'Handpicked Treks', sub: 'Beginner-friendly UK & HP routes' },
      { title: 'Safety First', sub: '24/7 support, medical backup & certified guides' },
      { title: 'Learn As You Trek', sub: 'Leaders who build confidence on trail' },
      { title: 'Responsible Travel', sub: 'Eco-conscious treks that give back to the mountains' },
    ],
  },
  hero: {
    titleBefore: 'Special Treks',
    titleEm: 'for Beginners',
    tagline: 'Start simple. Walk strong. Fall in love with the mountains.',
    lead:
      'First Himalayan treks chosen for clear trails, gradual climbs, and leaders who know how to turn first-timers into confident mountain travellers.',
    whatsappMsg: 'Hi Indian Treks! I want details for Beginner-Friendly Treks.',
    asideKicker: 'Built for first steps',
    asideTitle: 'Why beginners start here',
    asideBody:
      'You do not need prior trek experience — just curiosity, basic fitness, and a willingness to learn on trail with the right support.',
    asideBullets: [
      'Easy and easy-to-moderate grades',
      'Shorter days and well-marked routes',
      'Ideal stepping stones before bigger adventures',
    ],
  },
  story: {
    kicker: 'Why beginner-friendly treks',
    title: 'Your first mountain journey should feel exciting — not overwhelming',
    paragraphs: [
      'The Himalayas can look intimidating from a city desk. Beginner-friendly treks are designed to change that — with trails that teach rhythm, packing sense, and altitude awareness without throwing you into an extreme expedition.',
      'These departures favour scenic reward early, clearer daily goals, and leaders who explain the “why” behind pace, hydration, and layering. You learn by doing — safely.',
      'Start here, and the mountains stop being a distant dream. They become a habit — one strong walk at a time.',
    ],
  },
  reviews: {
    kicker: 'Trekker reviews',
    title: 'Stories from the trail',
    intro: 'First-timers who arrived nervous and left already asking about the next trek.',
    items: [
      {
        id: 'dev',
        name: 'Dev Patel',
        batch: 'Beginner group · Triund / McLeodganj',
        short:
          'Perfect first trek. Hard enough to feel proud, easy enough to enjoy every view.',
        full:
          'Perfect first trek. Hard enough to feel proud, easy enough to enjoy every view. The leaders explained everything clearly, the group was friendly, and I finally understood what people mean by “trail rhythm”. Already looking at my next easy-moderate route.',
      },
      {
        id: 'isha',
        name: 'Isha Nair',
        batch: 'Beginner group · Nag Tibba',
        short:
          'I had zero trek experience. The team made me feel capable from day one.',
        full:
          'I had zero trek experience. The team made me feel capable from day one. Packing tips, rest cues, and a patient pace turned my nerves into excitement. Summit morning felt huge — and completely earned.',
      },
      {
        id: 'rahul',
        name: 'Rahul Verma',
        batch: 'Beginner group · Chopta Tungnath',
        short:
          'Temple trail, forest air, and a climb that taught me I can do hard things.',
        full:
          'Temple trail, forest air, and a climb that taught me I can do hard things. As a beginner, I appreciated the structure and the honest difficulty guidance. No ego, just good mountains and good company.',
      },
      {
        id: 'tanya',
        name: 'Tanya Bose',
        batch: 'Beginner group · Kheerganga',
        short:
          'Hot spring reward after a beautiful forest walk — ideal for first-timers.',
        full:
          'Hot spring reward after a beautiful forest walk — ideal for first-timers. The trail taught me layering, hydration, and how to enjoy slow progress. I came back sore, happy, and hooked.',
      },
      {
        id: 'amit',
        name: 'Amit Khanna',
        batch: 'Beginner group · Dayara Bugyal',
        short:
          'Meadows for days. The kind of beauty that makes beginners fall in love with trekking.',
        full:
          'Meadows for days. The kind of beauty that makes beginners fall in love with trekking. Days felt achievable, nights felt magical, and the team kept the learning light. Best decision for my first Himalayan trip.',
      },
      {
        id: 'pooja',
        name: 'Pooja Desai',
        batch: 'Beginner group · Kedarkantha',
        short:
          'Snow summit as a first big trek — with preparation and guidance that actually worked.',
        full:
          'Snow summit as a first big trek — with preparation and guidance that actually worked. I followed the fitness tips, trusted the leaders, and finished proud. If you are starting out, this style of departure is the right door into the mountains.',
      },
    ],
  },
  eligibility: {
    kicker: 'Whom are these treks meant for?',
    title: 'Anyone ready to begin — with honest fitness basics',
    intro:
      'Beginner-friendly does not mean effortless. It means the challenge is learnable, supported, and matched to first-time mountain travel.',
    items: [
      {
        label: 'Experience',
        body:
          'No prior trek experience required. Weekend walking or light cardio before departure will make the journey far more enjoyable.',
      },
      {
        label: 'Fitness baseline',
        body:
          'Aim to walk 4–5 km comfortably before you go. Add stairs or gentle incline walks 3–4 times a week for 3–4 weeks if possible.',
      },
      {
        label: 'Mindset',
        body:
          'Come ready to listen to briefings, pace with the group, and ask questions. Mountains reward curiosity more than bravado.',
      },
      {
        label: 'Medical',
        body:
          'Share relevant medical history, especially for routes with higher camps, and carry personal medication as advised by your doctor.',
      },
    ],
  },
  promo: {
    text: 'Ready for your first Himalayan trek but unsure which route fits?',
    href: '/contact',
    cta: 'Talk to our team →',
  },
  treks: {
    kicker: 'Available treks',
    title: 'First-trek favourites our leaders recommend',
    intro:
      'Well-marked trails, gradual learning curves, and scenery that makes the effort feel worthwhile from the first day.',
    note:
      'Use these as your foundation. After one confident beginner trek, moderate routes become a natural next step — not a leap into the unknown.',
  },
  differences: {
    kicker: 'How beginner treks are different',
    title: 'Designed to teach the mountains, not test your ego',
    intro:
      'Great first treks balance beauty, learnable effort, and clear guidance — so you finish proud and eager for more.',
    items: [
      {
        title: 'Clear difficulty matching',
        body:
          'We help you pick Easy or Easy-to-Moderate routes where daily goals feel achievable and progress feels visible.',
        icon: Compass,
      },
      {
        title: 'Learning on trail',
        body:
          'Leaders explain pacing, layering, hydration, and camp rhythm — skills you will reuse on every future trek.',
        icon: Route,
      },
      {
        title: 'Confidence-building days',
        body:
          'Shorter walking windows and scenic milestones help first-timers stay motivated without burning out.',
        icon: TimerReset,
      },
      {
        title: 'A path to bigger adventures',
        body:
          'These departures are intentional stepping stones — the right start before higher passes and longer expeditions.',
        icon: Sparkles,
      },
    ],
  },
  safety: {
    kicker: 'Safety',
    title: 'How we keep first-timers safe on trail',
    intro:
      'Beginners need clarity. Our safety system keeps people, processes, and equipment working together from briefing to descent.',
    items: [
      {
        title: 'People',
        body:
          'Trek leaders watch energy closely, set a sustainable group pace, and make space for questions without judgement.',
        icon: Users,
      },
      {
        title: 'Processes',
        body:
          'Pre-trek guidance, daily briefings, weather checks, and contingency planning reduce avoidable risk.',
        icon: ShieldCheck,
      },
      {
        title: 'Equipment',
        body:
          'Medical essentials and communication support travel with the group so response stays ready if conditions change.',
        icon: Mountain,
      },
    ],
  },
  gallery: [
    { src: photos.triund, alt: 'Beginner trekkers on a scenic Himalayan ridge' },
    { src: photos.chopta, alt: 'First-time trekker views above the tree line' },
    { src: photos.kedarkantha, alt: 'Snow trail suitable as a confident first big trek' },
    { src: photos.hampta, alt: 'Mountain light on a beginner-friendly Himalayan journey' },
  ],
  articles: {
    kicker: 'Guides & reading',
    title: 'Must read before your first trek',
    items: [
      {
        title: 'How to prepare for your first Himalayan trek',
        excerpt:
          'The essentials — fitness, packing, mindset, and what “ready” actually looks like for beginners.',
        href: '/how-to-prepare',
        image: photos.triund,
        read: '8 min read',
      },
      {
        title: 'Fitness training plan',
        excerpt:
          'A simple plan so you build stamina without overdoing it in the weeks before departure.',
        href: '/fitness-training-plan',
        image: photos.chopta,
        read: '7 min read',
      },
      {
        title: 'Altitude sickness guide',
        excerpt:
          'Understand height, symptoms, and smart pacing — especially useful before your first higher camp.',
        href: '/altitude-sickness-guide',
        image: photos.uttarakhand,
        read: '6 min read',
      },
      {
        title: 'Family trekking benefits',
        excerpt:
          'Bringing family on your first trek? Read how shared trails build confidence and connection.',
        href: '/blog/family-trekking-in-india',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=600&fit=crop',
        read: '18 min read',
      },
    ],
  },
  cta: {
    kicker: 'Still choosing?',
    title: 'Tell us your fitness level, month, and how many days you can travel',
    body:
      'We will recommend the best beginner-friendly departure for your first Himalayan trek — with honest difficulty guidance.',
    whatsappMsg: 'Hi Indian Treks! Please help me choose a Beginner-Friendly Trek departure.',
  },
};
