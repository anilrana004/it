import {
  HeartHandshake,
  Mountain,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Users,
} from 'lucide-react';
import type { SplLandingContent } from '@/lib/special-programs/landing-types';
import { photos } from '@/lib/media';

export const womenOnlyLanding: SplLandingContent = {
  programId: 'women-only',
  hero: {
    titleBefore: 'Special Treks',
    titleEm: 'for Women',
    tagline: 'Travel freely. Trek confidently. Belong completely.',
    lead:
      'Women-focused Himalayan departures designed for safety, sisterhood, and the quiet confidence that comes from walking with a supportive all-women group.',
    whatsappMsg: 'Hi Indian Treks! I want details for Women-Only Treks.',
    asideKicker: 'Built for comfort & trust',
    asideTitle: 'Why women choose these departures',
    asideBody:
      'Solo travellers, first-timers, and groups of friends join these batches for clear protocols, thoughtful pacing, and a welcoming trail culture.',
    asideBullets: [
      'Women-friendly camp and briefing protocols',
      'Experienced leaders with safety-first culture',
      'A group that feels supportive from day one',
    ],
  },
  story: {
    kicker: 'Why women-only treks',
    title: 'Freedom to move, speak, rest, and explore without holding back',
    paragraphs: [
      'Many women love the idea of the Himalayas — and still hesitate. Will the group feel safe? Will I be the only woman? Will I be able to ask for space, rest, or help without awkwardness?',
      'Women-only departures answer that with intention. These journeys bring like-minded travellers together on carefully chosen trails, with leaders who understand privacy, pace, and emotional ease on the mountain.',
      'The result is more than a trek. It is friendship on the trail, confidence after every climb, and the feeling that you can show up fully — tired, curious, joyful — and still belong.',
    ],
  },
  reviews: {
    kicker: 'Trekker reviews',
    title: 'Stories from the trail',
    intro: 'Notes from women who found safety, friendship, and mountain courage on these departures.',
    items: [
      {
        id: 'neha',
        name: 'Neha Sharma',
        batch: "Women's group · Kedarkantha",
        short:
          'I travelled alone and never felt alone. The group energy made the summit feel shared.',
        full:
          'I travelled alone and never felt alone. From the first briefing to the summit morning, the group energy made everything feel shared. The leaders checked in without hovering, and the women around me made space for both quiet moments and loud laughter. This is how I wanted my first winter trek to feel.',
      },
      {
        id: 'aisha',
        name: 'Aisha Khan',
        batch: "Women's group · Valley of Flowers",
        short:
          'Safe, scenic, and beautifully paced. I finally stopped overthinking every step.',
        full:
          'Safe, scenic, and beautifully paced. I finally stopped overthinking every step. The trail was stunning, the stays felt considered, and the group made it easy to ask questions. I came back with photographs, friends, and a lot more confidence about travelling on my own.',
      },
      {
        id: 'priya',
        name: 'Priya Menon',
        batch: "Women's group · Chopta Tungnath",
        short:
          'What I valued most was the respect — for pace, privacy, and personal space.',
        full:
          'What I valued most was the respect — for pace, privacy, and personal space. Nobody rushed anyone. The leaders were clear and calm. Evenings felt warm without being overwhelming. It was exactly the kind of women-centred mountain trip I had been looking for.',
      },
      {
        id: 'ritu',
        name: 'Ritu Banerjee',
        batch: "Women's group · Nag Tibba",
        short:
          'Sisterhood on trail is real. We encouraged each other through every steep stretch.',
        full:
          'Sisterhood on trail is real. We encouraged each other through every steep stretch, shared snacks, and talked for hours under the stars. I joined for the mountains and left with a circle of women I still message. The organisation was solid and the vibe was kind.',
      },
      {
        id: 'meenal',
        name: 'Meenal Joshi',
        batch: "Women's group · Kuari Pass",
        short:
          'As a first-timer, I needed clarity and care. This group gave me both.',
        full:
          'As a first-timer, I needed clarity and care. This group gave me both. Packing advice, trail briefings, and on-route check-ins made me feel looked after without feeling managed. The views were incredible — and so was waking up knowing I belonged in the mountains.',
      },
      {
        id: 'sara',
        name: 'Sara Fernandes',
        batch: "Women's group · Hampta Pass",
        short:
          'Strong leadership, thoughtful logistics, and a group that felt like home.',
        full:
          'Strong leadership, thoughtful logistics, and a group that felt like home. Crossing landscapes together as an all-women batch made the adventure feel empowering rather than intimidating. I would book another women-only departure without thinking twice.',
      },
    ],
  },
  eligibility: {
    kicker: 'Whom are these treks meant for?',
    title: 'Open to women who want a supportive Himalayan experience',
    intro:
      'These departures welcome solo travellers, friend groups, and first-time trekkers — as long as the chosen route matches your fitness and comfort.',
    items: [
      {
        label: 'Who can join',
        body:
          'Women of all ages are welcome. Choose a trek that matches your fitness, altitude comfort, and available dates.',
      },
      {
        label: 'Fitness',
        body:
          'Be able to walk regularly before departure. For most easy-to-moderate routes, aim for 4–5 km walks with light elevation practice.',
      },
      {
        label: 'Solo travellers',
        body:
          'Solo women are very common on these batches. You will never be left out of briefings, buddy systems, or group logistics.',
      },
      {
        label: 'Medical note',
        body:
          'Share relevant medical history with us before booking, especially for higher-altitude routes, and carry your regular medicines.',
      },
    ],
  },
  promo: {
    text: 'Looking for a women-friendly Himalayan trek with clear safety culture and good company?',
    href: '/contact',
    cta: 'Talk to our team →',
  },
  treks: {
    kicker: 'Available treks',
    title: 'Departures that work beautifully for women travellers',
    intro:
      'Shortlisted for manageable days, scenic reward, and a trail culture where women feel confident from the first briefing to the last goodbye.',
    note:
      'Women-focused batches emphasise privacy protocols, clearer communication, and a supportive group dynamic — without turning the mountains into a watered-down experience.',
  },
  differences: {
    kicker: 'How women-only treks are different',
    title: 'Designed around trust, not just logistics',
    intro:
      'These are real Himalayan treks — planned with the details that help women feel safe, heard, and free to enjoy the journey.',
    items: [
      {
        title: 'Safety-first trail culture',
        body:
          'Clear briefings, buddy awareness, camp etiquette, and leaders who take privacy and personal comfort seriously every day.',
        icon: ShieldCheck,
      },
      {
        title: 'Supportive group energy',
        body:
          'Walk with women who understand the same questions and hesitations — so asking for rest, help, or space feels natural.',
        icon: Users,
      },
      {
        title: 'Thoughtful pacing & planning',
        body:
          'Routes and walking days are chosen for confidence-building progress, not ego climbs or unnecessary rush.',
        icon: TimerReset,
      },
      {
        title: 'Confidence that travels home',
        body:
          'Many women leave with more than summit photos — they leave knowing they can travel, decide, and adventure on their own terms.',
        icon: Sparkles,
      },
    ],
  },
  safety: {
    kicker: 'Safety',
    title: 'How we keep women travellers safe on trail',
    intro:
      'Safety here means proactive systems — people, processes, and equipment — so support is present before a problem appears.',
    items: [
      {
        title: 'People',
        body:
          'Experienced trek leaders and mountain staff coordinate the group closely, with attention to pace, hydration, and camp comfort.',
        icon: Users,
      },
      {
        title: 'Processes',
        body:
          'Pre-trek briefings, daily check-ins, clear emergency protocols, and transparent communication keep the group aligned.',
        icon: HeartHandshake,
      },
      {
        title: 'Equipment',
        body:
          'Medical essentials, communication coordination, and route-appropriate support gear travel with every departure.',
        icon: Mountain,
      },
    ],
  },
  gallery: [
    { src: photos.kedarkantha, alt: 'Women trekkers on a snowy Himalayan trail' },
    { src: photos.vof, alt: 'Wildflower meadows on a women-friendly trek' },
    { src: photos.hampta, alt: 'High mountain views during a women-only departure' },
    { src: photos.chopta, alt: 'Sunrise ridge walk with a supportive women group' },
  ],
  articles: {
    kicker: 'Guides & reading',
    title: 'Must read before you go',
    items: [
      {
        title: 'How to prepare for your first Himalayan trek',
        excerpt:
          'Fitness, packing, mindset, and the small habits that make your first mountain journey feel calmer and stronger.',
        href: '/how-to-prepare',
        image: photos.triund,
        read: '8 min read',
      },
      {
        title: 'A practical fitness training plan',
        excerpt:
          'Build stamina without overtraining — so you arrive trail-ready and excited, not exhausted.',
        href: '/fitness-training-plan',
        image: photos.chopta,
        read: '7 min read',
      },
      {
        title: 'Altitude awareness for new trekkers',
        excerpt:
          'What to expect at height, how to pace yourself, and when to slow down so the mountains stay enjoyable.',
        href: '/altitude-sickness-guide',
        image: photos.uttarakhand,
        read: '6 min read',
      },
      {
        title: 'What happens when families trek together?',
        excerpt:
          'If you are planning with sisters, mothers, or daughters — start with the deeper benefits of shared mountain time.',
        href: '/blog/family-trekking-in-india',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=600&fit=crop',
        read: '18 min read',
      },
    ],
  },
  cta: {
    kicker: 'Still choosing?',
    title: 'Tell us your dates, fitness, and whether you are travelling solo',
    body:
      'We will shortlist women-friendly departures that match your comfort level — with clear guidance on difficulty, altitude, and group size.',
    whatsappMsg: 'Hi Indian Treks! Please help me choose a Women-Only Trek departure.',
  },
};
