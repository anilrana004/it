import {
  HeartPulse,
  Mountain,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Users,
} from 'lucide-react';
import type { SplLandingContent } from '@/lib/special-programs/landing-types';
import { photos } from '@/lib/media';

export const familyLanding: SplLandingContent = {
  programId: 'family',
  hero: {
    titleBefore: 'Special Treks',
    titleEm: 'for Families',
    tagline: 'Walk together. Grow together. Remember it forever.',
    lead:
      'Family-friendly Himalayan journeys planned for mixed ages — with manageable trails, engaging landscapes, and the kind of shared adventure that becomes a family story.',
    whatsappMsg: 'Hi Indian Treks! I want details for Family Treks.',
    asideKicker: 'Built for all ages',
    asideTitle: 'Why families choose these departures',
    asideBody:
      'Parents want nature without chaos. Children need challenge without overwhelm. These routes balance both — so everyone can enjoy the journey.',
    asideBullets: [
      'Age-aware route recommendations',
      'Meals, camps, and days planned for mixed energy',
      'Shared milestones the whole family can celebrate',
    ],
  },
  story: {
    kicker: 'Why family treks',
    title: 'A few days when everyone walks in the same direction',
    paragraphs: [
      'Modern family life is full of schedules — school, work, screens, and separate rooms under one roof. A family trek creates something rarer: uninterrupted time on the same trail.',
      'Children discover nature by walking through it. Parents rediscover playfulness. Siblings become teammates. And the mountains give everyone a shared challenge that cannot be outsourced to a phone.',
      'At Indian Treks, family departures are chosen for accessible scenery, sensible daily distances, and support that helps the whole group stay safe, curious, and connected.',
    ],
  },
  reviews: {
    kicker: 'Trekker reviews',
    title: 'Stories from the trail',
    intro: 'Families who returned with tired legs, full hearts, and memories that outlasted the mountain view.',
    items: [
      {
        id: 'ananya',
        name: 'Ananya & Rohit Gupta',
        batch: 'Family group · Nag Tibba',
        short:
          'Our kids complained for the first hour — and by evening they were planning the next trek.',
        full:
          'Our kids complained for the first hour — and by evening they were planning the next trek. The trail was manageable, the leaders were patient with questions, and camp felt exciting rather than intimidating. We came home with fewer screens and a lot more conversation.',
      },
      {
        id: 'kavita',
        name: 'Kavita Reddy',
        batch: 'Family group · Chopta Tungnath',
        short:
          'Temple, forest, and open skies — our daughter still talks about the sunrise.',
        full:
          'Temple, forest, and open skies — our daughter still talks about the sunrise. The pace worked for both adults and children, and the team helped us decide rest points without making anyone feel behind. It was the most meaningful holiday we have taken in years.',
      },
      {
        id: 'vivek',
        name: 'Vivek Malhotra',
        batch: 'Family group · Dayara Bugyal',
        short:
          'Meadows made it easy for the kids to feel successful without forcing a hard summit.',
        full:
          'Meadows made it easy for the kids to feel successful without forcing a hard summit. The scenery was generous, the walking days were sensible, and evenings around camp became our favourite part. Highly recommended for families who want nature with structure.',
      },
      {
        id: 'shalini',
        name: 'Shalini Iyer',
        batch: 'Family group · Valley of Flowers',
        short:
          'Soft adventure with big beauty. Exactly what we needed between school terms.',
        full:
          'Soft adventure with big beauty. Exactly what we needed between school terms. The flowers, the walks, and the shared effort changed how our family travels. The organisation was clear and the experience felt carefully chosen for mixed ages.',
      },
      {
        id: 'arjun',
        name: 'Arjun & Meera Shah',
        batch: 'Family group · Kedarkantha',
        short:
          'Snow, teamwork, and a summit our teenager still calls “the best day”.',
        full:
          'Snow, teamwork, and a summit our teenager still calls “the best day”. We prepared with walks at home, followed the team’s guidance, and felt supported throughout. Family trekking gave us a memory we could not have bought in a hotel holiday.',
      },
      {
        id: 'nisha',
        name: 'Nisha Kapoor',
        batch: 'Family group · Kheerganga',
        short:
          'Hot spring, forest trail, and siblings who finally cooperated for three days.',
        full:
          'Hot spring, forest trail, and siblings who finally cooperated for three days. The trek was fun without being reckless, and the kids learned to carry small responsibilities. We will definitely book another family-friendly departure.',
      },
    ],
  },
  eligibility: {
    kicker: 'Whom are these treks meant for?',
    title: 'Families ready for a shared outdoor adventure',
    intro:
      'The best family trek is not the hardest one. It is the one everyone can complete comfortably, safely, and together.',
    items: [
      {
        label: 'Children’s age',
        body:
          'Suitability depends on the route. Many family-friendly trails work well from around 8–10 years with active children — ask us before booking younger kids.',
      },
      {
        label: 'Fitness',
        body:
          'Parents and children should practise regular walking before departure. Short weekend hikes at home make the trail far more enjoyable.',
      },
      {
        label: 'Group comfort',
        body:
          'Choose duration and altitude based on the least experienced family member — not the fittest adult.',
      },
      {
        label: 'Medical & gear',
        body:
          'Carry personal medicines, child-friendly layers, and share any health considerations with our team during booking.',
      },
    ],
  },
  promo: {
    text: 'Planning a school-holiday Himalayan escape the whole family can enjoy?',
    href: '/contact',
    cta: 'Talk to our team →',
  },
  treks: {
    kicker: 'Available treks',
    title: 'Family-friendly routes with scenery children remember',
    intro:
      'Curated for approachable days, beautiful landscapes, and stays that work when parents and children travel together.',
    note:
      'We help you match trek difficulty to age, school holidays, and energy levels — so the journey feels like adventure, not endurance testing.',
  },
  differences: {
    kicker: 'How family treks are different',
    title: 'Adventure designed for mixed ages',
    intro:
      'Family trekking succeeds when the itinerary respects different strengths — and still gives everyone a real mountain experience.',
    items: [
      {
        title: 'Age-aware route choices',
        body:
          'We recommend trails with manageable distances, rewarding views early, and terrain that builds confidence rather than fear.',
        icon: Sparkles,
      },
      {
        title: 'Shared milestones',
        body:
          'Camps, meadows, temples, and summits become family achievements — moments children can retell for years.',
        icon: Users,
      },
      {
        title: 'Practical pacing',
        body:
          'Rest points, snack breaks, and flexible energy management help mixed-age groups stay together without resentment.',
        icon: TimerReset,
      },
      {
        title: 'Learning beyond the classroom',
        body:
          'Children practise patience, teamwork, and nature respect — while parents rediscover unhurried time together.',
        icon: HeartPulse,
      },
    ],
  },
  safety: {
    kicker: 'Safety',
    title: 'How we keep families safe on trail',
    intro:
      'With children on trail, clarity matters. Our approach combines attentive people, simple processes, and the right field equipment.',
    items: [
      {
        title: 'People',
        body:
          'Leaders watch the group’s slowest pace, keep children engaged, and communicate clearly with parents throughout the day.',
        icon: Users,
      },
      {
        title: 'Processes',
        body:
          'Briefings, buddy awareness, hydration reminders, and weather contingency plans reduce surprises on trail.',
        icon: ShieldCheck,
      },
      {
        title: 'Equipment',
        body:
          'Medical kits, communication support, and route-ready gear travel with the group for confident response.',
        icon: Mountain,
      },
    ],
  },
  gallery: [
    { src: photos.vof, alt: 'Family walking through a flower-filled Himalayan meadow' },
    { src: photos.chopta, alt: 'Parents and children on a scenic ridge trail' },
    { src: photos.triund, alt: 'Open mountain views on a family-friendly trek' },
    { src: photos.kedarkantha, alt: 'Snowy family trek milestone in the Himalayas' },
  ],
  articles: {
    kicker: 'Guides & reading',
    title: 'Must read for parents',
    items: [
      {
        title: 'What happens when families trek together?',
        excerpt:
          'The deeper benefits of family trekking — uninterrupted time, confidence, nature, teamwork, and memories that last.',
        href: '/blog/family-trekking-in-india',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=600&fit=crop',
        read: '18 min read',
      },
      {
        title: 'How to prepare for the mountains',
        excerpt:
          'A practical prep guide so parents and children arrive ready — physically and mentally.',
        href: '/how-to-prepare',
        image: photos.chopta,
        read: '8 min read',
      },
      {
        title: 'Fitness training plan',
        excerpt:
          'Simple walking and strength habits the whole family can follow before departure.',
        href: '/fitness-training-plan',
        image: photos.triund,
        read: '7 min read',
      },
      {
        title: 'Altitude awareness guide',
        excerpt:
          'What families should know about height, rest, and when to slow down on Himalayan trails.',
        href: '/altitude-sickness-guide',
        image: photos.uttarakhand,
        read: '6 min read',
      },
    ],
  },
  cta: {
    kicker: 'Still choosing?',
    title: 'Tell us your children’s ages, dates, and comfort level',
    body:
      'We will recommend family-friendly treks that fit school holidays, fitness, and the kind of adventure your family actually wants.',
    whatsappMsg: 'Hi Indian Treks! Please help me choose a Family Trek departure.',
  },
};
