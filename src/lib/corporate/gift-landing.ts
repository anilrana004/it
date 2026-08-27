import { photos } from '@/lib/media';
import type { LpLandingContent } from '@/lib/corporate/learning-program-types';

export const giftLanding: LpLandingContent = {
  variant: 'gift',
  hero: {
    eyebrow: 'Travel gift cards',
    title: 'Give the Gift of the Mountains',
    lead: 'Skip flowers and gadgets — gift a Himalayan journey they will remember for a lifetime',
    image: photos.vof,
    primaryCta: 'Buy a gift card',
    primaryWhatsapp:
      'Hi Indian Treks! I want to buy a Travel Gift Card.',
    secondaryCta: 'See how it works',
  },
  premiumHero: {
    badge: 'Travel gift cards',
    titleMain: 'Give the Gift of the',
    titleAccent: 'Mountains',
    lead: 'Skip flowers and gadgets — gift a Himalayan journey they will remember for a lifetime.',
    trustLine: 'Trusted by gifters across India',
    avatars: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    ],
    tagline: 'Memories Over Material Gifts',
    panel: [
      { title: 'Choose Any Trek', sub: 'Recipient picks their adventure' },
      { title: 'Instant E-Delivery', sub: 'Perfect for last-minute surprises' },
      { title: '1 Year Validity', sub: 'Redeem when dates align' },
      { title: 'Personal Message', sub: 'Your note travels with the card' },
    ],
    stats: [
      { value: '10K+ Cards Gifted', sub: 'Across India' },
      { value: '4.9/5 Gifter Rating', sub: 'Meaningful & easy' },
      { value: '₹1K–₹25K Amounts', sub: 'Flexible gift values' },
      { value: '100% Redeemable', sub: 'On eligible treks & yatras' },
    ],
    features: [
      { title: 'Instant Delivery', sub: 'E-gift in minutes' },
      { title: 'Any Occasion', sub: 'Birthdays, farewells & more' },
      { title: 'Flexible Amounts', sub: 'From starter credit to full treks' },
      { title: 'Real Adventures', sub: 'Redeem on Himalayan journeys' },
    ],
  },
  brands: {
    kicker: 'Loved by gifters',
    title: 'Trusted for Meaningful Gifting Across the Country',
    intro: 'Families, friends, and teams who choose experiences over clutter.',
    items: Array.from({ length: 8 }, (_, i) => ({
      id: `gift-brand-${i + 1}`,
      name: 'Gifting partner',
    })),
  },
  benefits: {
    kicker: 'Why gift travel',
    title: 'Why a trek gift card beats ordinary presents',
    intro: 'When you gift Indian Treks credit, you give:',
    items: [
      'Freedom to choose any trek or yatra that fits them',
      'A memory that lasts longer than a wrapped box',
      'An easy e-delivery option for last-minute celebrations',
      'A present that encourages health, nature, and adventure',
      'Flexibility — they redeem when dates and fitness align',
      'A thoughtful alternative to flowers, gadgets, and gift hampers',
    ],
    image: photos.kedarkantha,
    imageAlt: 'A Himalayan trek experience gifted to a loved one',
  },
  whyBetter: {
    kicker: 'Better than things',
    title: 'Why experience gifts create deeper joy',
    items: [
      {
        title: 'They choose the adventure',
        body: 'Recipients pick the trail, season, and difficulty that actually fits their life.',
      },
      {
        title: 'No clutter, no guesswork',
        body: 'Skip size charts and unused gadgets — gift possibility instead of shelf space.',
      },
      {
        title: 'Works for every relationship',
        body: 'Perfect for partners, parents, siblings, friends, colleagues, and farewell wishes.',
      },
      {
        title: 'Instant when you need it',
        body: 'E-gift delivery means birthdays and surprises don’t wait on courier timelines.',
      },
      {
        title: 'Long validity',
        body: 'Valid for one year — enough time to plan the right Himalayan escape.',
      },
      {
        title: 'Redeem on real journeys',
        body: 'Use on group treks and customised trips across the Indian Treks catalogue.',
      },
    ],
  },
  reviews: {
    kicker: 'Gifter stories',
    title: 'What people say after gifting the mountains',
    intro: 'Notes from people who gave adventure — and from those who received it.',
    items: [
      {
        id: 'riya-g',
        name: 'Riya Sen',
        role: 'Gifted to her brother',
        short: 'Best birthday gift I’ve ever given. He redeemed it on Nag Tibba and still talks about it.',
        full: 'Best birthday gift I’ve ever given. He redeemed it on Nag Tibba and still talks about it. The e-card arrived instantly with my note — zero stress.',
      },
      {
        id: 'amit-g',
        name: 'Amit Khanna',
        role: 'Received from his team',
        short: 'My team gifted me a card after a tough project. I used it for Chopta — perfect reset.',
        full: 'My team gifted me a card after a tough project. I used it for Chopta — perfect reset. Felt personal in a way a voucher mall gift never does.',
      },
      {
        id: 'sneha-g',
        name: 'Sneha Iyer',
        role: 'Anniversary gift',
        short: 'We redeemed together for a weekend foothill trek. Best anniversary decision.',
        full: 'We redeemed together for a weekend foothill trek. Best anniversary decision. Choosing the trail together became part of the gift.',
      },
      {
        id: 'kabir-g',
        name: 'Kabir Joshi',
        role: 'Farewell gift',
        short: 'Gifted a colleague leaving the city. She booked Triund and sent trail photos for days.',
        full: 'Gifted a colleague leaving the city. She booked Triund and sent trail photos for days. Beats another coffee mug every time.',
      },
      {
        id: 'meera-g',
        name: 'Meera Shah',
        role: 'Parents’ gift',
        short: 'Got parents a card for their 30th anniversary. They’re planning a gentle UK trail now.',
        full: 'Got parents a card for their 30th anniversary. They’re planning a gentle UK trail now. Felt respectful of their pace and curiosity.',
      },
      {
        id: 'dev-g',
        name: 'Dev Patel',
        role: 'Self + partner',
        short: 'Bought two cards during a sale mindset… redeemed as our first Himalayan trip together.',
        full: 'Bought two cards during a sale mindset… redeemed as our first Himalayan trip together. Simple process, clear validity, happy ending.',
      },
    ],
  },
  difficulties: {
    kicker: 'Gifting puzzles',
    title: 'Why choosing the right gift is harder than it looks',
    intro: 'Most presents miss the mark — experiences solve the usual traps.',
    items: [
      'Physical gifts often go unused or create clutter',
      'You rarely know someone’s exact size, taste, or schedule',
      'Last-minute celebrations need something meaningful and fast',
      'You want a gift that says care — not obligation',
    ],
    image: photos.hampta,
    imageAlt: 'Open mountain views waiting to be gifted',
  },
  programmes: {
    kicker: 'How gift cards work',
    title: 'Three simple steps from purchase to trail',
    intro: 'Buy, personalise, and let them redeem whenever the mountains call.',
    enquirePrefix: 'Hi Indian Treks! Question about gift cards —',
    items: [
      {
        id: 'choose-amount',
        title: 'Choose an amount',
        blurb: 'Pick a value that fits the occasion — from a thoughtful starter credit to a full trek contribution.',
        duration: '2 minutes',
        location: 'Online',
        overview:
          'Select from preset amounts starting at ₹1,000. Top up later if you want — the goal is flexibility for the recipient.',
        image: photos.triund,
      },
      {
        id: 'personalise',
        title: 'Personalise & send',
        blurb: 'Add a name, email, and a short message. E-gift delivery makes surprises easy.',
        duration: 'Instant',
        location: 'Inbox delivery',
        overview:
          'Your note travels with the card. Perfect for birthdays, farewells, anniversaries, festivals, and “just because”.',
        image: photos.chopta,
      },
      {
        id: 'redeem',
        title: 'They redeem on any trek',
        blurb: 'At checkout, enter the code — the amount applies toward group or customised trips.',
        duration: 'Valid 1 year',
        location: 'Indian Treks catalogue',
        overview:
          'Recipients browse departures, pick what fits, and redeem. Unused balance rules stay transparent at purchase.',
        image: photos.kedarkantha,
      },
    ],
  },
  treks: {
    kicker: 'Gift inspiration',
    title: 'Journeys people love to redeem toward',
    intro: 'Popular UK & HP trails that make fantastic gift redemptions.',
    note: 'Gift cards can be used across eligible treks and yatras — these are simply crowd favourites.',
    ids: [
      'nag-tibba',
      'chopta-tungnath',
      'kedarkantha',
      'dayara-bugyal',
      'valley-of-flowers',
      'kheerganga',
      'mcleodganj-trek',
      'bhrigu-lake',
      'hampta-pass',
      'kuari-pass',
    ],
  },
  gallery: {
    kicker: 'Moments worth gifting',
    title: 'The kind of memories a card can unlock',
    items: [
      { src: photos.vof, alt: 'Flower meadows on a gifted Himalayan trek' },
      { src: photos.kedarkantha, alt: 'Snow summit experience redeemed from a gift card' },
      { src: photos.triund, alt: 'Weekend trail gifted to a friend' },
      { src: photos.hampta, alt: 'Mountain light on a redeemed adventure' },
    ],
  },
  cta: {
    kicker: 'Give adventure',
    title: 'Ready to gift a Himalayan memory?',
    body: 'Buy a card in minutes — or WhatsApp us if you want help choosing an amount for a trek.',
    primaryWhatsapp: 'Hi Indian Treks! Help me choose a Travel Gift Card amount.',
    primaryLabel: 'WhatsApp for help',
    secondaryHref: '#gift-purchase',
    secondaryLabel: 'Buy a gift card',
  },
  articles: {
    kicker: 'Help them prepare',
    title: 'Useful reads to send with your gift',
    items: [
      {
        title: 'How to prepare for a Himalayan trek',
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
        title: 'Family trekking ideas',
        href: '/blog/family-trekking-in-india',
        image: photos.hampta,
        read: '18 min read',
      },
      {
        title: 'Altitude awareness',
        href: '/altitude-sickness-guide',
        image: photos.uttarakhand,
        read: '6 min read',
      },
    ],
  },
  inquiry: {
    kicker: 'Need help?',
    title: 'Ask about bulk or corporate gifting',
    intro: 'HR teams and event planners — tell us volume and occasion for a bulk gift-card plan.',
    orgLabel: 'Company / organisation',
    sizeLabel: 'Number of cards',
    sizeOptions: ['5–10', '11–25', '26–50', '51–100', '100+'],
    programmeLabel: 'Occasion',
    whatsappFallback: 'Hi Indian Treks! I need help with Travel Gift Cards (bulk / custom).',
    successBody: 'Thanks! Our gifting team will reach out within 24 hours.',
  },
  gift: {
    amounts: [1000, 2500, 5000, 10000, 15000, 25000],
    howSteps: [
      { title: 'Choose amount', body: 'Pick a value that matches the occasion.' },
      { title: 'Personalise', body: 'Add recipient details and a short message.' },
      { title: 'They redeem', body: 'Code applies at checkout on eligible trips.' },
    ],
    occasions: [
      { title: 'Birthdays', body: 'Give a trail instead of another cake candle.' },
      { title: 'Anniversaries', body: 'Plan a shared mountain escape together.' },
      { title: 'Farewells', body: 'Send colleagues off with adventure credit.' },
      { title: 'Festivals', body: 'A thoughtful alternative to hampers.' },
      { title: 'Congratulations', body: 'Celebrate promotions with a summit fund.' },
      { title: 'Just because', body: 'Surprise someone with open trail possibilities.' },
    ],
    faqs: [
      {
        q: 'What is an Indian Treks Travel Gift Card?',
        a: 'A prepaid gift card that can be used to book eligible treks or yatras on Indian Treks — an easy way to gift a travel experience.',
      },
      {
        q: 'How do I redeem my gift card?',
        a: 'Select your trek, proceed to booking, and enter your unique gift card code at checkout. The amount is deducted automatically.',
      },
      {
        q: 'What is the validity?',
        a: 'Gift cards are valid for one year from the date of purchase.',
      },
      {
        q: 'Can I use it for any trek?',
        a: 'Yes — gift cards can be used on eligible group trips and customised trips available on Indian Treks.',
      },
    ],
  },
};
