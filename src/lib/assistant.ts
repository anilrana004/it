import { treks, type Trek } from '@/lib/data';

export type AssistantReply = {
  text: string;
  quickReplies?: string[];
  links?: { label: string; href: string }[];
  /** When true, UI shows Continue on WhatsApp for a human agent */
  handoff?: boolean;
};

const WA_NUMBER = '919999999999';

export function whatsappUrl(prefill?: string) {
  const text = encodeURIComponent(prefill || 'Hi TrekRoot! I need help with a trek.');
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}

const quickStarters = [
  'Popular treks',
  'All destinations',
  'How to book',
  'Best for beginners',
  'Cancellation policy',
  'Talk to a human',
];

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function minPrice(trek: Trek) {
  return Math.min(...trek.pricing.map((p) => p.price));
}

function trekPath(trek: Trek) {
  return trek.type === 'yatra' ? `/yatra/${trek.id}` : `/treks/${trek.id}`;
}

function formatTrekCard(trek: Trek): string {
  return (
    `- *${trek.title}* (${trek.duration})\n` +
    `  ${trek.state} | ${trek.difficulty} | ${trek.maxAltitude}\n` +
    `  from Rs ${minPrice(trek).toLocaleString('en-IN')} | Rating ${trek.rating}`
  );
}

function formatFullTrek(trek: Trek, focus?: string): string {
  const packages = trek.pricing
    .map(
      (p) =>
        `  - ${p.name}: Rs ${p.price.toLocaleString('en-IN')}` +
        (p.originalPrice ? ` (was Rs ${p.originalPrice.toLocaleString('en-IN')})` : '') +
        `\n    Deposit: Rs ${p.deposit.toLocaleString('en-IN')}` +
        (p.badge ? ` | ${p.badge}` : '') +
        (p.inclusions?.length ? `\n    Includes: ${p.inclusions.slice(0, 4).join('; ')}` : ''),
    )
    .join('\n');

  const highlights = trek.highlights.slice(0, 5).map((h) => `  - ${h}`).join('\n');
  const inclusions = trek.inclusions.slice(0, 8).map((h) => `  - ${h}`).join('\n');
  const exclusions = trek.exclusions.slice(0, 6).map((h) => `  - ${h}`).join('\n');
  const itinerary = trek.itinerary
    .slice(0, 8)
    .map((d) => {
      const meta = [d.altitude, d.distance, d.duration].filter(Boolean).join(' | ');
      return `  Day ${d.day}: ${d.title}${meta ? ` (${meta})` : ''}\n    Meals: ${d.meals}`;
    })
    .join('\n');
  const faqBits = trek.faq
    .slice(0, 3)
    .map((f) => `  Q: ${f.q}\n  A: ${f.a}`)
    .join('\n\n');

  const header =
    `*${trek.title}*\n` +
    `${trek.subtitle}\n\n` +
    `${trek.brief}\n\n` +
    `Type: ${trek.type === 'yatra' ? 'Yatra' : 'Trek'}\n` +
    `Region: ${trek.state} (${trek.region})\n` +
    `Route: ${trek.location}\n` +
    `Start/End: ${trek.startEndPoint}\n` +
    `Duration: ${trek.duration} (${trek.nights}N/${trek.days}D)\n` +
    `Max altitude: ${trek.maxAltitude}\n` +
    `Distance: ${trek.distance}\n` +
    `Difficulty: ${trek.difficulty}\n` +
    `Best season: ${trek.bestSeason}\n` +
    `Group size: ${trek.groupSize}\n` +
    `Rating: ${trek.rating} (${trek.reviewCount} reviews)\n` +
    `Starting price: Rs ${minPrice(trek).toLocaleString('en-IN')} + 5% GST`;

  if (focus === 'itinerary') {
    return `${header}\n\n*Day-by-day itinerary*\n${itinerary}\n\nNeed a custom date or private group? Talk to a human.`;
  }
  if (focus === 'inclusions') {
    return (
      `*${trek.title} - Inclusions*\n${inclusions}\n\n` +
      `*Exclusions*\n${exclusions}\n\n` +
      `Packages:\n${packages}`
    );
  }
  if (focus === 'price') {
    return `*${trek.title} - Pricing*\nPackages (+ 5% GST):\n${packages}\n\nDeposit confirms your seat. Balance before departure.`;
  }

  return (
    `${header}\n\n` +
    `*Highlights*\n${highlights}\n\n` +
    `*Packages*\n${packages}\n\n` +
    `*Key inclusions*\n${inclusions}\n\n` +
    `*Key exclusions*\n${exclusions}\n\n` +
    `*Itinerary snapshot*\n${itinerary}` +
    (faqBits ? `\n\n*Trek FAQs*\n${faqBits}` : '') +
    `\n\nOpen the full page for photos, batches, and booking - or ask me anything else.`
  );
}

function findTreks(query: string): Trek[] {
  const q = normalize(query);
  const tokens = q.split(' ').filter((t) => t.length > 2);
  const stop = new Set([
    'trek',
    'treks',
    'yatra',
    'price',
    'cost',
    'how',
    'what',
    'when',
    'where',
    'best',
    'tell',
    'about',
    'details',
    'detail',
    'full',
    'info',
    'information',
    'please',
    'want',
    'need',
    'show',
    'give',
  ]);

  return treks
    .map((trek) => {
      const hay = normalize(
        `${trek.id} ${trek.title} ${trek.subtitle} ${trek.state} ${trek.location} ${trek.region} ${trek.brief} ${trek.highlights.join(' ')}`,
      );
      let score = 0;
      if (hay.includes(q) && q.length > 3) score += 12;
      for (const t of tokens) {
        if (stop.has(t)) continue;
        if (hay.includes(t)) score += 3;
        if (normalize(trek.id).includes(t) || normalize(trek.title).includes(t)) score += 4;
      }
      return { trek, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((x) => x.trek);
}

function withHumanFallback(reply: AssistantReply, context: string): AssistantReply {
  return {
    ...reply,
    quickReplies: [...(reply.quickReplies || []).filter((x) => x !== 'Talk to a human'), 'Talk to a human'].slice(0, 6),
    links: [
      ...(reply.links || []),
      ...(reply.handoff
        ? []
        : []),
    ],
    // keep existing handoff; callers set it when needed
  };
}

function humanHandoff(userMessage: string, reason?: string): AssistantReply {
  return {
    text:
      (reason ||
        'I could not fully solve that with the info I have.') +
      '\n\nA TrekRoot teammate can help manually on WhatsApp - share your dates, trek name, and group size for a fast reply.',
    handoff: true,
    quickReplies: ['Popular treks', 'How to book', 'All destinations'],
    links: [
      {
        label: 'Chat with human on WhatsApp',
        href: whatsappUrl(`Hi TrekRoot! I need manual help.\n\nMy question: ${userMessage}`),
      },
    ],
  };
}

const topicKnowledge: { keywords: string[]; answer: string; handoff?: boolean }[] = [
  {
    keywords: ['solo', 'alone', 'single traveller', 'single traveler'],
    answer:
      'Solo travelers are welcome on almost every departure.\n\n' +
      '- Book 1 seat on any open batch\n' +
      '- Mixed groups; many guests join solo\n' +
      '- Trip captains help everyone settle in\n' +
      '- Shared tents/rooms unless you upgrade\n\n' +
      'Tell me a trek name if you want solo-friendly beginner options.',
  },
  {
    keywords: ['book', 'booking', 'how to book', 'reserve', 'payment', 'deposit', 'pay'],
    answer:
      '*How booking works at TrekRoot*\n\n' +
      '1) Choose trek/yatra on the website\n' +
      '2) Pick a monthly batch + package (Economic / Standard / Premium)\n' +
      '3) Fill traveler details and pay the deposit\n' +
      '4) We confirm on WhatsApp/email\n' +
      '5) Pay remaining balance before departure (as guided)\n\n' +
      '*Payment notes*\n' +
      '- Prices shown are base; +5% GST usually applies\n' +
      '- Deposit locks your seat\n' +
      '- No card details are stored on our servers for WhatsApp payment flow\n\n' +
      'Need help choosing dates? Send trek name + month.',
  },
  {
    keywords: ['cancel', 'refund', 'cancellation', 'reschedule', 'postpone'],
    answer:
      '*Cancellation / refund policy (typical)*\n\n' +
      '- 30+ days before departure: mostly refundable (small processing fee)\n' +
      '- 15-30 days: partial cancellation charge\n' +
      '- 7-14 days: higher charge (permits/transport/staff locked)\n' +
      '- Under 7 days / no-show: usually non-refundable\n\n' +
      'Weather or safety changes may lead to itinerary adjustment.\n' +
      'For a specific booking ID, talk to a human for exact calculation.',
    handoff: true,
  },
  {
    keywords: ['fitness', 'difficulty', 'beginner', 'first trek', 'easy trek', 'preparation'],
    answer:
      '*Fitness & difficulty guide*\n\n' +
      '- Easy: weekend trails, light backpack (Nag Tibba, Triund, Beas Kund)\n' +
      '- Easy to Moderate: Kedarkantha, Chopta Tungnath, Dayara Bugyal\n' +
      '- Moderate: Valley of Flowers, Hampta Pass, ABC\n' +
      '- Difficult: Everest Base Camp, Bali Pass, Buran Ghati\n\n' +
      '*Prep tips*\n' +
      '- Walk/jog 3-4x weekly for 3-4 weeks\n' +
      '- Practice with a loaded daypack\n' +
      '- Share medical conditions before booking\n\n' +
      'Ask "best for beginners" for curated picks.',
  },
  {
    keywords: ['gear', 'rent', 'carry', 'packing', 'what to bring', 'shoes', 'jacket'],
    answer:
      '*What to carry (core list)*\n\n' +
      '- Broken-in trekking shoes\n' +
      '- Layered clothing (base + fleece + down + rain shell)\n' +
      '- Trekking pants, wool socks, gloves, beanie\n' +
      '- 40-50L backpack + rain cover\n' +
      '- Headlamp, sunglasses, SPF 50, water bottle\n' +
      '- Personal medicines + ID\n\n' +
      '*Common rentals*\n' +
      'Shoes, down jacket, poles, poncho (availability varies by trek).\n' +
      'Open any trek page > Things to Carry / Rent a Gear for exact list.',
  },
  {
    keywords: ['girls', 'women', 'all girls', 'ladies'],
    answer:
      'Yes - All Girls trips are available with experienced female trip leads.\n' +
      'Safe, social, and designed for women joining solo or with friends.\n' +
      'Ask for current All Girls departures and a human can share open batches.',
    handoff: true,
  },
  {
    keywords: ['international', 'bali', 'thailand', 'dubai', 'maldives', 'vietnam', 'abroad'],
    answer:
      '*International getaways*\n' +
      'We curate trips to Bali, Thailand, Dubai, Maldives, Vietnam, Nepal and more.\n\n' +
      'Browse /international-getaways or tell me destination + budget + month.\n' +
      'For custom itineraries, talk to a human.',
    handoff: true,
  },
  {
    keywords: ['yatra', 'temple', 'pilgrimage', 'kedarnath', 'badrinath', 'char dham', 'yamunotri', 'do dham'],
    answer:
      '*Sacred yatras*\n' +
      'We operate Kedarnath, Badrinath, Do Dham, Char Dham, Panch Kedar and related packages.\n\n' +
      'Usually includes hotels, meals (as listed), private/shared transport, permits, and on-ground support.\n' +
      'Send a yatra name for full packages and inclusions.',
  },
  {
    keywords: ['price', 'cost', 'budget', 'cheap', 'affordable', 'starting', 'gst'],
    answer:
      '*Pricing overview*\n\n' +
      '- Packages: Economic / Standard / Premium\n' +
      '- Many Himalayan treks start ~Rs 4,499 to Rs 8,999\n' +
      '- Nepal classics (ABC/EBC) are higher\n' +
      '- Quote + 5% GST unless stated\n' +
      '- Deposit confirms seat; balance before departure\n\n' +
      'Send a trek name for exact package prices.',
  },
  {
    keywords: ['safety', 'oxygen', 'altitude', 'sick', 'medical', 'insurance'],
    answer:
      '*Safety standards*\n\n' +
      '- Certified trip captains / first-aid trained leads\n' +
      '- First-aid kit; oxygen on high-altitude routes\n' +
      '- Acclimatization-friendly itineraries where needed\n' +
      '- Weather/road contingency planning\n\n' +
      'Always declare asthma, heart issues, recent surgery, or pregnancy before booking.\n' +
      'Travel insurance is recommended (ask a human for partner options).',
    handoff: true,
  },
  {
    keywords: ['group', 'community', 'who joins', 'age', 'age limit'],
    answer:
      '*Who joins TrekRoot trips*\n\n' +
      '- Social travel community; solo joiners are common\n' +
      '- Typical adult groups; family/custom options available\n' +
      '- Exact age limits can vary by trek difficulty\n\n' +
      'For under-18 or 50+ guests on high-altitude treks, talk to a human for fitness clearance.',
    handoff: true,
  },
  {
    keywords: ['contact', 'phone', 'call', 'support', 'help desk', 'email'],
    answer:
      'You can get help here anytime for trek info and booking steps.\n\n' +
      'For confirmations, payments stuck, custom dates, or urgent changes - a human on WhatsApp is best.',
    handoff: true,
  },
  {
    keywords: ['corporate', 'office', 'team building', 'company'],
    answer:
      'We run corporate treks and team-building Himalayan programs (custom dates, group discounts).\n' +
      'Share company size, city, preferred month, and budget - a human will propose options.',
    handoff: true,
  },
  {
    keywords: ['custom', 'customize', 'private', 'honeymoon', 'family trip'],
    answer:
      'Customized private trips, honeymoon getaways, and family itineraries are available.\n' +
      'Tell us destination, dates, group size, and budget - a human planner will craft it.',
    handoff: true,
  },
  {
    keywords: ['winter', 'snow', 'december', 'january', 'february'],
    answer:
      '*Popular winter options*\n' +
      '- Kedarkantha (classic snow trek)\n' +
      '- Chopta Tungnath / Brahmatal-style winters (seasonal)\n' +
      '- Selected Himachal weekend snow escapes\n\n' +
      'Ask for a trek name + month for open batches.',
  },
  {
    keywords: ['documents', 'id proof', 'aadhaar', 'passport', 'permit'],
    answer:
      '*Documents usually needed*\n\n' +
      '- Government photo ID (Aadhaar / Voter ID / Passport)\n' +
      '- For Nepal: passport + required permits (handled as per package)\n' +
      '- Carry a printed booking confirmation when possible\n\n' +
      'Exact permit list is on each trek page under How to Reach / Policy.',
  },
  {
    keywords: ['pickup', 'drop', 'how to reach', 'transport', 'dehradun', 'manali', 'rishikesh', 'kathmandu'],
    answer:
      'Most treks start from a base city (Dehradun, Rishikesh, Manali, Kasol, Pokhara, Kathmandu, etc.).\n\n' +
      'Package may include shared transport from base to trailhead - check inclusions.\n' +
      'Send a trek name and I will share start/end point and transport notes.',
  },
  {
    keywords: ['inclusion', 'exclude', 'exclusion', 'what is included', 'meals', 'stay', 'camping'],
    answer:
      'Inclusions vary by trek and package, but commonly include:\n' +
      '- Accommodation (tent/guesthouse/hotel as listed)\n' +
      '- Meals on trek days\n' +
      '- Trek leader / guide\n' +
      '- Permits & camping fees (where applicable)\n' +
      '- Basic first aid\n\n' +
      'Usually excluded: personal gear, tips, travel to base city, insurance, porter (unless package says).\n' +
      'Send a trek name for exact inclusions/exclusions.',
  },
  {
    keywords: ['batch', 'dates', 'departure', 'availability', 'seats'],
    answer:
      'Each trek has monthly batch departures with live seat status on the trek page.\n' +
      'Open the trek > Batches to pick dates, or tell me trek + month and I will guide you.\n' +
      'For last-minute seats, talk to a human.',
    handoff: true,
  },
  {
    keywords: ['gift', 'gift card', 'voucher'],
    answer:
      'TrekRoot travel gift cards can be used on treks and yatras.\n' +
      'Visit /travel-gift-cards or ask a human to issue one for a specific amount.',
    handoff: true,
  },
  {
    keywords: ['about', 'trekroot', 'who are you', 'company'],
    answer:
      'TrekRoot is a Himalayan treks, yatras, and adventure travel community.\n' +
      'We run group departures across Uttarakhand, Himachal, Nepal, plus domestic/international getaways.\n' +
      'Focus: safety, community, and well-organized fixed departures.',
  },
];

export function getWelcome(): AssistantReply {
  return {
    text:
      "Hi! I'm *TrekRoot Help* - your trek assistant.\n\n" +
      'I can share full trek details (price, itinerary, inclusions, difficulty, season), booking steps, policies, and recommendations.\n\n' +
      'If I cannot solve it, I will connect you to a human on WhatsApp.\n\n' +
      'Try a trek name (e.g. Kedarkantha) or pick an option below.',
    quickReplies: quickStarters,
  };
}

export function getAssistantReply(message: string): AssistantReply {
  const q = normalize(message);
  const original = message.trim();

  if (!q) {
    return {
      text: 'Type a question - for example "Kedarkantha full details", "Hampta Pass itinerary", or "cancellation policy".',
      quickReplies: quickStarters,
    };
  }

  // Explicit human handoff
  if (
    q.includes('human') ||
    q.includes('whatsapp') ||
    q.includes('agent') ||
    q.includes('talk to') ||
    q.includes('call me') ||
    q.includes('manual') ||
    q.includes('customer care') ||
    q.includes('executive')
  ) {
    return humanHandoff(original, 'Connecting you to a TrekRoot teammate for manual help.');
  }

  // Catalog / destinations
  if (
    q.includes('all destination') ||
    q.includes('all trek') ||
    q.includes('list trek') ||
    q.includes('what do you offer') ||
    q === 'destinations' ||
    q === 'all destinations'
  ) {
    const byRegion: Record<string, Trek[]> = { uttarakhand: [], himachal: [], nepal: [] };
    for (const t of treks) {
      (byRegion[t.region] || (byRegion[t.region] = [])).push(t);
    }
    const block = (name: string, list: Trek[]) =>
      `*${name}* (${list.length})\n` +
      list
        .slice(0, 8)
        .map((t) => `- ${t.title} | ${t.duration} | from Rs ${minPrice(t).toLocaleString('en-IN')}`)
        .join('\n') +
      (list.length > 8 ? `\n- ...and ${list.length - 8} more` : '');

    return withHumanFallback(
      {
        text:
          `Here is our live catalog snapshot:\n\n` +
          `${block('Uttarakhand', byRegion.uttarakhand)}\n\n` +
          `${block('Himachal', byRegion.himachal)}\n\n` +
          `${block('Nepal', byRegion.nepal)}\n\n` +
          `Send any trek/yatra name for full details.`,
        quickReplies: ['Kedarkantha', 'Valley of Flowers', 'Everest Base Camp', 'Char Dham', 'Talk to a human'],
        links: [
          { label: 'Browse all treks', href: '/treks' },
          { label: 'Browse yatras', href: '/yatra' },
        ],
      },
      original,
    );
  }

  if (q.includes('popular') || q.includes('recommend') || q.includes('suggest') || q === 'popular treks') {
    const picks = [...treks].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice(0, 6);
    return withHumanFallback(
      {
        text:
          `Top-rated picks right now:\n\n${picks.map(formatTrekCard).join('\n\n')}\n\n` +
          `Reply with a name for full details (itinerary, packages, inclusions).`,
        quickReplies: picks.slice(0, 4).map((t) => t.title.replace(/ Trek| Yatra/g, '')).concat(['Talk to a human']),
        links: picks.slice(0, 4).map((t) => ({ label: t.title, href: trekPath(t) })),
      },
      original,
    );
  }

  if (q.includes('beginner') || q.includes('first trek') || (q.includes('easy') && !findTreks(q).length)) {
    const easy = treks.filter((t) => /easy/i.test(t.difficulty)).slice(0, 6);
    return withHumanFallback(
      {
        text:
          `Best starter options:\n\n${easy.map(formatTrekCard).join('\n\n')}\n\n` +
          `Kedarkantha is our most loved winter beginner trek. Ask for "full details" on any name.`,
        quickReplies: easy.slice(0, 3).map((t) => t.title).concat(['How to book', 'Talk to a human']),
        links: easy.slice(0, 4).map((t) => ({ label: t.title, href: trekPath(t) })),
      },
      original,
    );
  }

  // Trek-focused intents
  const matched = findTreks(q);
  if (matched.length) {
    const primary = matched[0];
    const wantsItinerary = /itinerary|day by day|schedule|daywise|plan/.test(q);
    const wantsIncl = /inclusion|exclusion|include|exclude|what is included|meals|stay/.test(q);
    const wantsPrice = /price|cost|budget|fee|how much|rs\b|rupee|package|deposit/.test(q);
    const wantsFull = /full|detail|complete|everything|info|about|overview/.test(q) || matched.length === 1;

    if (matched.length > 1 && !wantsFull && !wantsPrice && !wantsItinerary && !wantsIncl) {
      return withHumanFallback(
        {
          text:
            `I found multiple matches:\n\n${matched.map(formatTrekCard).join('\n\n')}\n\n` +
            `Reply with the exact name for full details.`,
          quickReplies: matched.map((t) => t.title.replace(/ Trek| Yatra/g, '')).concat(['Talk to a human']),
          links: matched.map((t) => ({ label: t.title, href: trekPath(t) })),
        },
        original,
      );
    }

    const focus = wantsItinerary ? 'itinerary' : wantsIncl ? 'inclusions' : wantsPrice ? 'price' : undefined;
    const text = formatFullTrek(primary, focus);

    return withHumanFallback(
      {
        text,
        quickReplies: [
          `${primary.title.replace(/ Trek| Yatra/g, '')} itinerary`,
          'How to book',
          'Talk to a human',
          'Popular treks',
        ],
        links: [
          { label: `Open ${primary.title}`, href: trekPath(primary) },
          {
            label: 'Book help on WhatsApp',
            href: whatsappUrl(`Hi! I want details/booking help for ${primary.title}.`),
          },
        ],
      },
      original,
    );
  }

  // Topic FAQs
  for (const item of topicKnowledge) {
    if (item.keywords.some((k) => q.includes(normalize(k)))) {
      const reply: AssistantReply = {
        text: item.answer,
        quickReplies: ['Popular treks', 'How to book', 'All destinations', 'Talk to a human'],
        links: [{ label: 'Chat on WhatsApp', href: whatsappUrl(`Hi! Question: ${original}`) }],
        handoff: item.handoff,
      };
      return reply;
    }
  }

  if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q === 'help' || q === 'menu') {
    return getWelcome();
  }

  // Unresolved -> always manual human handoff
  return humanHandoff(
    original,
    'I could not find a confident answer for that in my trek database.',
  );
}
