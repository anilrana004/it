import { treks, trekDetailPath, type Trek } from '@/lib/data';
import { CONTACT, mailtoUrl, telUrl, whatsappUrl } from '@/lib/contact';

export type AssistantChannel = {
  type: 'whatsapp' | 'email' | 'phone';
  label: string;
  href: string;
};

export type AssistantReply = {
  text: string;
  quickReplies?: string[];
  links?: { label: string; href: string }[];
  /** When true, UI shows helpline actions (WhatsApp / Call / Email) */
  handoff?: boolean;
  channels?: AssistantChannel[];
};

export { whatsappUrl };

const quickStarters = [
  'Popular treks',
  'Best for beginners',
  'How to book',
  'All destinations',
  'Talk to support',
];

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function minPrice(trek: Trek) {
  return Math.min(...trek.pricing.map((p) => p.price));
}

function formatTrekCard(trek: Trek): string {
  return (
    `- *${trek.title}* (${trek.duration})\n` +
    `  ${trek.state} · ${trek.difficulty} · ${trek.maxAltitude}\n` +
    `  from ₹${minPrice(trek).toLocaleString('en-IN')} · ★ ${trek.rating}`
  );
}

function formatFullTrek(trek: Trek, focus?: string): string {
  const packages = trek.pricing
    .map(
      (p) =>
        `  • ${p.name}: ₹${p.price.toLocaleString('en-IN')}` +
        (p.originalPrice ? ` (was ₹${p.originalPrice.toLocaleString('en-IN')})` : '') +
        `\n    Deposit: ₹${p.deposit.toLocaleString('en-IN')}` +
        (p.badge ? ` · ${p.badge}` : '') +
        (p.inclusions?.length ? `\n    Includes: ${p.inclusions.slice(0, 4).join('; ')}` : ''),
    )
    .join('\n');

  const highlights = trek.highlights.slice(0, 6).map((h) => `  • ${h}`).join('\n');
  const inclusions = trek.inclusions.slice(0, 10).map((h) => `  • ${h}`).join('\n');
  const exclusions = trek.exclusions.slice(0, 8).map((h) => `  • ${h}`).join('\n');
  const itinerary = trek.itinerary
    .map((d) => {
      const meta = [d.altitude, d.distance, d.duration].filter(Boolean).join(' · ');
      return `  Day ${d.day}: ${d.title}${meta ? ` (${meta})` : ''}\n    Meals: ${d.meals}`;
    })
    .join('\n');
  const faqBits = trek.faq
    .slice(0, 4)
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
    `Rating: ★ ${trek.rating} (${trek.reviewCount} reviews)\n` +
    `Starting price: ₹${minPrice(trek).toLocaleString('en-IN')} + 5% GST`;

  if (focus === 'itinerary') {
    return (
      `*${trek.title} — Day-by-day itinerary*\n\n${itinerary}\n\n` +
      `Want packages or inclusions next? Ask me, or open the full page to book.`
    );
  }
  if (focus === 'inclusions') {
    return (
      `*${trek.title} — Inclusions*\n${inclusions}\n\n` +
      `*Exclusions*\n${exclusions}\n\n` +
      `*Packages*\n${packages}`
    );
  }
  if (focus === 'price') {
    return (
      `*${trek.title} — Pricing* (+ 5% GST)\n${packages}\n\n` +
      `Deposit confirms your seat. Balance before departure.\n` +
      `Need a private group quote? I can connect you to support.`
    );
  }
  if (focus === 'faq') {
    return (
      `*${trek.title} — FAQs*\n\n` +
      (faqBits || 'No FAQ listed yet — ask me anything or talk to support.') +
      `\n\nStill stuck? Support can confirm live seats and custom dates.`
    );
  }

  return (
    `${header}\n\n` +
    `*Highlights*\n${highlights}\n\n` +
    `*Packages*\n${packages}\n\n` +
    `*Key inclusions*\n${inclusions}\n\n` +
    `*Key exclusions*\n${exclusions}\n\n` +
    `*Itinerary snapshot*\n${itinerary}` +
    (faqBits ? `\n\n*Trek FAQs*\n${faqBits}` : '') +
    `\n\nAsk me for itinerary, price, inclusions, dates — or say "book this" and I'll guide you.`
  );
}

function findTreks(query: string): Trek[] {
  const q = normalize(query);
  const tokens = q.split(' ').filter((t) => t.length > 2);
  const stop = new Set([
    'trek',
    'treks',
    'yatra',
    'yatras',
    'trip',
    'trips',
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
    'help',
    'with',
    'from',
    'this',
    'that',
    'which',
    'book',
    'booking',
  ]);

  return treks
    .map((trek) => {
      const hay = normalize(
        `${trek.id} ${trek.title} ${trek.subtitle} ${trek.state} ${trek.location} ${trek.region} ${trek.brief} ${trek.highlights.join(' ')} ${trek.difficulty}`,
      );
      let score = 0;
      if (hay.includes(q) && q.length > 3) score += 14;
      const idNorm = normalize(trek.id);
      const titleNorm = normalize(trek.title);
      if (idNorm === q || titleNorm === q) score += 20;
      for (const t of tokens) {
        if (stop.has(t)) continue;
        if (hay.includes(t)) score += 3;
        if (idNorm.includes(t) || titleNorm.includes(t)) score += 5;
      }
      return { trek, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((x) => x.trek);
}

function searchTrekFaqs(query: string): { trek: Trek; q: string; a: string; score: number }[] {
  const q = normalize(query);
  const tokens = q.split(' ').filter((t) => t.length > 2);
  const hits: { trek: Trek; q: string; a: string; score: number }[] = [];

  for (const trek of treks) {
    for (const faq of trek.faq) {
      const hay = normalize(`${faq.q} ${faq.a} ${trek.title}`);
      let score = 0;
      if (hay.includes(q) && q.length > 4) score += 8;
      for (const t of tokens) {
        if (hay.includes(t)) score += 2;
      }
      if (score >= 4) hits.push({ trek, q: faq.q, a: faq.a, score });
    }
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 3);
}

function helplineChannels(userMessage: string): AssistantChannel[] {
  return [
    {
      type: 'whatsapp',
      label: 'WhatsApp',
      href: whatsappUrl(
        `Hi ${CONTACT.brand}! I need help from the website assistant.\n\nMy question:\n${userMessage}`,
      ),
    },
    {
      type: 'phone',
      label: 'Call',
      href: telUrl(),
    },
    {
      type: 'email',
      label: 'Email',
      href: mailtoUrl(
        `Help request — ${CONTACT.brand}`,
        `Hi Indian Treks team,\n\nI need help with:\n${userMessage}\n\nThanks!`,
      ),
    },
  ];
}

function attachSupportHint(reply: AssistantReply): AssistantReply {
  const chips = [...(reply.quickReplies || [])];
  if (!chips.some((c) => /support|human|whatsapp|agent/i.test(c))) {
    chips.push('Talk to support');
  }
  return { ...reply, quickReplies: chips.slice(0, 6) };
}

function humanHandoff(userMessage: string, reason?: string): AssistantReply {
  return {
    text:
      (reason ||
        "I've helped as far as I can with the info on hand.") +
      `\n\n*Connect with ${CONTACT.brand} support*\n` +
      `• WhatsApp: fastest for booking & seat checks\n` +
      `• Call: ${CONTACT.phoneDisplay}\n` +
      `• Email: ${CONTACT.email}\n` +
      `• Hours: ${CONTACT.hours}\n\n` +
      'Share your trek name, preferred dates, and group size — the team will take over.',
    handoff: true,
    channels: helplineChannels(userMessage),
    quickReplies: ['Popular treks', 'How to book', 'Best for beginners'],
    links: [
      {
        label: 'Chat on WhatsApp now',
        href: whatsappUrl(`Hi ${CONTACT.brand}! Manual help needed.\n\n${userMessage}`),
      },
    ],
  };
}

/** Soft handoff: answer given, but offer human channels without forcing */
function softHandoff(reply: AssistantReply, userMessage: string): AssistantReply {
  return attachSupportHint({
    ...reply,
    handoff: true,
    channels: reply.channels || helplineChannels(userMessage),
  });
}

const topicKnowledge: {
  keywords: string[];
  answer: string;
  softHandoff?: boolean;
  hardHandoff?: boolean;
}[] = [
  {
    keywords: ['solo', 'alone', 'single traveller', 'single traveler'],
    answer:
      '*Solo travelers — yes, you are welcome*\n\n' +
      '• Book 1 seat on any open batch\n' +
      '• Mixed groups; many guests join solo\n' +
      '• Trip captains help everyone settle in\n' +
      '• Shared tents/rooms unless you upgrade\n\n' +
      'Tell me a trek name for solo-friendly beginner options.',
  },
  {
    keywords: ['book', 'booking', 'how to book', 'reserve', 'payment', 'deposit', 'pay', 'book this'],
    answer:
      `*How booking works at ${CONTACT.brand}*\n\n` +
      '1) Choose trek/yatra on the website\n' +
      '2) Pick a monthly batch + package (Economic / Standard / Premium)\n' +
      '3) Fill traveler details and pay the deposit\n' +
      '4) We confirm on WhatsApp / email\n' +
      '5) Pay remaining balance before departure\n\n' +
      '*Payment notes*\n' +
      '• Prices shown are base; +5% GST usually applies\n' +
      '• Deposit locks your seat\n' +
      '• For payment stuck / UPI issues, use support channels below\n\n' +
      'Send trek name + month and I will guide the next step.',
    softHandoff: true,
  },
  {
    keywords: ['cancel', 'refund', 'cancellation', 'reschedule', 'postpone'],
    answer:
      '*Cancellation / refund (typical)*\n\n' +
      '• 30+ days before departure: mostly refundable (small processing fee)\n' +
      '• 15–30 days: partial cancellation charge\n' +
      '• 7–14 days: higher charge (permits/transport/staff locked)\n' +
      '• Under 7 days / no-show: usually non-refundable\n\n' +
      'Weather or safety changes may adjust itinerary.\n' +
      'For a *specific booking ID*, support can calculate the exact refund.',
    softHandoff: true,
  },
  {
    keywords: ['fitness', 'difficulty', 'beginner', 'first trek', 'easy trek', 'preparation', 'train'],
    answer:
      '*Fitness & difficulty guide*\n\n' +
      '• Easy: weekend trails (Nag Tibba, Triund, Beas Kund)\n' +
      '• Easy to Moderate: Kedarkantha, Chopta Tungnath, Dayara Bugyal\n' +
      '• Moderate: Valley of Flowers, Hampta Pass, ABC\n' +
      '• Difficult: Everest Base Camp, Bali Pass, Buran Ghati\n\n' +
      '*Prep tips*\n' +
      '• Walk/jog 3–4× weekly for 3–4 weeks\n' +
      '• Practice with a loaded daypack\n' +
      '• Share medical conditions before booking\n\n' +
      'Say "best for beginners" for curated picks.',
  },
  {
    keywords: ['gear', 'rent', 'carry', 'packing', 'what to bring', 'shoes', 'jacket', 'backpack'],
    answer:
      '*What to carry (core list)*\n\n' +
      '• Broken-in trekking shoes\n' +
      '• Layers: base + fleece + down + rain shell\n' +
      '• Trekking pants, wool socks, gloves, beanie\n' +
      '• 40–50L backpack + rain cover\n' +
      '• Headlamp, sunglasses, SPF 50, water bottle\n' +
      '• Personal medicines + govt ID\n\n' +
      '*Common rentals*\n' +
      'Shoes, down jacket, poles, poncho (varies by trek).\n' +
      'Open any trek page → Things to Carry / Rent a Gear.',
  },
  {
    keywords: ['girls', 'women', 'all girls', 'ladies', 'female'],
    answer:
      '*All Girls trips*\n' +
      'Available with experienced female trip leads — safe, social, great for solo women.\n' +
      'Ask for current All Girls departures; support can share open batches.',
    softHandoff: true,
  },
  {
    keywords: ['international', 'bali', 'thailand', 'dubai', 'maldives', 'vietnam', 'abroad', 'foreign'],
    answer:
      '*International getaways*\n' +
      'We curate Bali, Thailand, Dubai, Maldives, Vietnam, Nepal and more.\n\n' +
      'Browse /international-getaways or tell me destination + budget + month.\n' +
      'Custom itineraries are handled by our planners on WhatsApp/email.',
    softHandoff: true,
  },
  {
    keywords: ['yatra', 'temple', 'pilgrimage', 'kedarnath', 'badrinath', 'char dham', 'yamunotri', 'do dham', 'panch kedar'],
    answer:
      '*Sacred yatras*\n' +
      'Kedarnath, Badrinath, Do Dham, Char Dham, Panch Kedar and related packages.\n\n' +
      'Usually includes hotels, meals (as listed), transport, permits, and on-ground support.\n' +
      'Send a yatra name for full packages and inclusions.',
  },
  {
    keywords: ['price', 'cost', 'budget', 'cheap', 'affordable', 'starting', 'gst', 'how much'],
    answer:
      '*Pricing overview*\n\n' +
      '• Packages: Economic / Standard / Premium\n' +
      '• Many Himalayan treks start ~₹4,499 to ₹8,999\n' +
      '• Nepal classics (ABC/EBC) are higher\n' +
      '• Quote + 5% GST unless stated\n' +
      '• Deposit confirms seat; balance before departure\n\n' +
      'Send a trek name for exact package prices.',
  },
  {
    keywords: ['safety', 'oxygen', 'altitude', 'sick', 'medical', 'insurance', 'ams'],
    answer:
      '*Safety standards*\n\n' +
      '• Certified trip captains / first-aid trained leads\n' +
      '• First-aid kit; oxygen on high-altitude routes\n' +
      '• Acclimatization-friendly itineraries where needed\n' +
      '• Weather/road contingency planning\n\n' +
      'Always declare asthma, heart issues, recent surgery, or pregnancy before booking.\n' +
      'Travel insurance is recommended — support can suggest partner options.',
    softHandoff: true,
  },
  {
    keywords: ['group', 'community', 'who joins', 'age', 'age limit', 'kids', 'children'],
    answer:
      `*Who joins ${CONTACT.brand} trips*\n\n` +
      '• Social travel community; solo joiners are common\n' +
      '• Typical adult groups; family/custom options available\n' +
      '• Exact age limits vary by trek difficulty\n\n' +
      'For under-18 or 50+ on high-altitude treks, support can confirm fitness clearance.',
    softHandoff: true,
  },
  {
    keywords: ['contact', 'phone', 'call', 'support', 'help desk', 'email', 'helpline', 'customer care', 'customer service'],
    answer:
      `*${CONTACT.brand} helpline*\n\n` +
      `• WhatsApp / Call: ${CONTACT.phoneDisplay}\n` +
      `• Email: ${CONTACT.email}\n` +
      `• Hours: ${CONTACT.hours}\n\n` +
      'I can still answer trek info here — use the buttons below anytime you want a human.',
    softHandoff: true,
  },
  {
    keywords: ['corporate', 'office', 'team building', 'company', 'offsite'],
    answer:
      'We run corporate treks and team-building Himalayan programs (custom dates, group discounts).\n' +
      'Share company size, city, preferred month, and budget — a planner will propose options.',
    softHandoff: true,
  },
  {
    keywords: ['custom', 'customize', 'private', 'honeymoon', 'family trip', 'tailor'],
    answer:
      'Customized private trips, honeymoon getaways, and family itineraries are available.\n' +
      'Tell me destination, dates, group size, and budget — support will craft it.',
    softHandoff: true,
  },
  {
    keywords: ['winter', 'snow', 'december', 'january', 'february'],
    answer:
      '*Popular winter options*\n' +
      '• Kedarkantha (classic snow trek)\n' +
      '• Chopta Tungnath / Brahmatal-style winters (seasonal)\n' +
      '• Selected Himachal weekend snow escapes\n\n' +
      'Ask for a trek name + month for open batches.',
  },
  {
    keywords: ['documents', 'id proof', 'aadhaar', 'passport', 'permit', 'visa'],
    answer:
      '*Documents usually needed*\n\n' +
      '• Government photo ID (Aadhaar / Voter ID / Passport)\n' +
      '• For Nepal: passport + required permits (as per package)\n' +
      '• Carry a printed booking confirmation when possible\n\n' +
      'Exact permit list is on each trek page.',
  },
  {
    keywords: ['pickup', 'drop', 'how to reach', 'transport', 'dehradun', 'manali', 'rishikesh', 'kathmandu', 'train', 'flight'],
    answer:
      'Most treks start from a base city (Dehradun, Rishikesh, Manali, Kasol, Pokhara, Kathmandu, etc.).\n\n' +
      'Package may include shared transport from base to trailhead — check inclusions.\n' +
      'Send a trek name and I will share start/end point and transport notes.',
  },
  {
    keywords: ['inclusion', 'exclude', 'exclusion', 'what is included', 'meals', 'stay', 'camping', 'tent'],
    answer:
      'Inclusions vary by trek and package, but commonly include:\n' +
      '• Accommodation (tent/guesthouse/hotel as listed)\n' +
      '• Meals on trek days\n' +
      '• Trek leader / guide\n' +
      '• Permits & camping fees (where applicable)\n' +
      '• Basic first aid\n\n' +
      'Usually excluded: personal gear, tips, travel to base city, insurance, porter (unless package says).\n' +
      'Send a trek name for exact inclusions/exclusions.',
  },
  {
    keywords: ['batch', 'dates', 'departure', 'availability', 'seats', 'slots'],
    answer:
      'Each trek has monthly batch departures with live seat status on the trek page.\n' +
      'Open the trek → Batches to pick dates, or tell me trek + month and I will guide you.\n' +
      'For last-minute seats, WhatsApp support is fastest.',
    softHandoff: true,
  },
  {
    keywords: ['gift', 'gift card', 'voucher'],
    answer:
      `${CONTACT.brand} travel gift cards can be used on treks and yatras.\n` +
      'Visit /travel-gift-cards or ask support to issue one for a specific amount.',
    softHandoff: true,
  },
  {
    keywords: ['about', 'indiantreks', 'indian treks', 'who are you', 'company', 'what is indian treks'],
    answer:
      `*About ${CONTACT.brand}*\n` +
      'Himalayan treks, sacred yatras, and adventure travel community.\n' +
      'Group departures across Uttarakhand, Himachal, Nepal — plus domestic & international getaways.\n' +
      'Focus: safety, community, and well-organized fixed departures.',
  },
  {
    keywords: ['thanks', 'thank you', 'thx', 'great', 'awesome', 'perfect'],
    answer:
      "You're welcome! Ask anytime about treks, prices, or booking.\n" +
      'If you need a human later, say "Talk to support".',
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later'],
    answer: `Safe travels! ${CONTACT.brand} is here whenever you need trek help.`,
  },
];

function regionFilter(q: string): Trek[] | null {
  if (/\buttarakhand\b|\buk\b/.test(q)) return treks.filter((t) => t.region === 'uttarakhand');
  if (/\bhimachal\b|\bhp\b/.test(q)) return treks.filter((t) => t.region === 'himachal');
  if (/\bnepal\b/.test(q)) return treks.filter((t) => t.region === 'nepal');
  if (/\byatra\b|\byatras\b/.test(q) && !findTreks(q).length) return treks.filter((t) => t.type === 'yatra');
  return null;
}

export function getWelcome(): AssistantReply {
  return {
    text:
      `Hi! I'm *${CONTACT.brand} AI Help* — your trek assistant.\n\n` +
      'I know our full catalog: prices, itineraries, inclusions, difficulty, seasons, and booking steps.\n\n' +
      `If I cannot finish your request, I'll connect you to support via *WhatsApp*, *Call* (${CONTACT.phoneDisplay}), or *Email* (${CONTACT.email}).\n\n` +
      'Try a trek name (e.g. Kedarkantha) or pick an option below.',
    quickReplies: quickStarters,
  };
}

type HistoryItem = { role: 'user' | 'assistant'; text: string };

function resolveWithHistory(message: string, history?: HistoryItem[]): string {
  if (!history?.length) return message;
  const q = normalize(message);
  const shortFollowUp =
    q.length < 40 &&
    /^(and |also |what about |how about |itinerary|price|cost|inclusion|exclusion|faq|dates|batch|book|yes|no|same|that one|this one)/.test(
      q,
    );

  if (!shortFollowUp) return message;

  for (let i = history.length - 1; i >= 0; i--) {
    const m = history[i];
    if (m.role !== 'user') continue;
    const prev = findTreks(m.text);
    if (prev[0]) return `${prev[0].title} ${message}`;
  }
  return message;
}

export function getAssistantReply(message: string, history?: HistoryItem[]): AssistantReply {
  const original = message.trim();
  const enriched = resolveWithHistory(original, history);
  const q = normalize(enriched);

  if (!q) {
    return {
      text: 'Type a question — for example "Kedarkantha full details", "Hampta Pass itinerary", or "cancellation policy".',
      quickReplies: quickStarters,
    };
  }

  // Explicit human handoff
  if (
    /\b(human|agent|executive|customer care|customer service|helpline|talk to support|talk to a human|manual help|real person)\b/.test(
      q,
    ) ||
    q.includes('whatsapp') ||
    q.includes('call me') ||
    q.includes('call us') ||
    (q.includes('email') && q.includes('support'))
  ) {
    return humanHandoff(original, `Connecting you to the ${CONTACT.brand} team.`);
  }

  if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q === 'help' || q === 'menu' || q === 'start') {
    return getWelcome();
  }

  // Prefer specific trek matches before region browse
  const earlyMatch = findTreks(q);
  const isBrowseRegion =
    !earlyMatch.length &&
    !!regionFilter(q) &&
    (q.includes('trek') ||
      q.includes('list') ||
      q.includes('show') ||
      q.includes('all') ||
      q.includes('destination') ||
      q.includes('yatra') ||
      /uttarakhand|himachal|nepal/.test(q));

  // Region / type browse
  const regionList = isBrowseRegion ? regionFilter(q) : null;
  if (regionList) {
    const title =
      /\byatra/.test(q) && regionList.every((t) => t.type === 'yatra')
        ? 'Sacred yatras'
        : regionList[0]?.region
          ? `${regionList[0].region.charAt(0).toUpperCase()}${regionList[0].region.slice(1)} options`
          : 'Matching options';

    return attachSupportHint({
      text:
        `*${title}* (${regionList.length})\n\n` +
        regionList.slice(0, 8).map(formatTrekCard).join('\n\n') +
        (regionList.length > 8 ? `\n\n…and ${regionList.length - 8} more` : '') +
        `\n\nReply with any name for full details.`,
      quickReplies: regionList
        .slice(0, 4)
        .map((t) => t.title.replace(/ Trek| Yatra/g, ''))
        .concat(['Talk to support']),
      links: [
        { label: 'Browse all treks', href: '/treks' },
        { label: 'Browse yatras', href: '/yatra' },
        ...regionList.slice(0, 3).map((t) => ({ label: t.title, href: trekDetailPath(t) })),
      ],
    });
  }

  // Catalog / destinations
  if (
    q.includes('all destination') ||
    q.includes('all trek') ||
    q.includes('list trek') ||
    q.includes('what do you offer') ||
    q === 'destinations' ||
    q === 'all destinations' ||
    q === 'catalog'
  ) {
    const byRegion: Record<string, Trek[]> = { uttarakhand: [], himachal: [], nepal: [] };
    for (const t of treks) {
      (byRegion[t.region] || (byRegion[t.region] = [])).push(t);
    }
    const block = (name: string, list: Trek[]) =>
      `*${name}* (${list.length})\n` +
      list
        .slice(0, 8)
        .map((t) => `• ${t.title} · ${t.duration} · from ₹${minPrice(t).toLocaleString('en-IN')}`)
        .join('\n') +
      (list.length > 8 ? `\n• …and ${list.length - 8} more` : '');

    return attachSupportHint({
      text:
        `Here is our live catalog:\n\n` +
        `${block('Uttarakhand', byRegion.uttarakhand)}\n\n` +
        `${block('Himachal', byRegion.himachal)}\n\n` +
        `${block('Nepal', byRegion.nepal)}\n\n` +
        `Send any trek/yatra name for full details.`,
      quickReplies: ['Kedarkantha', 'Valley of Flowers', 'Everest Base Camp', 'Char Dham', 'Talk to support'],
      links: [
        { label: 'Browse all treks', href: '/treks' },
        { label: 'Browse yatras', href: '/yatra' },
      ],
    });
  }

  if (q.includes('popular') || q.includes('recommend') || q.includes('suggest') || q === 'popular treks') {
    const picks = [...treks].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice(0, 6);
    return attachSupportHint({
      text:
        `Top-rated picks right now:\n\n${picks.map(formatTrekCard).join('\n\n')}\n\n` +
        `Reply with a name for full details (itinerary, packages, inclusions).`,
      quickReplies: picks
        .slice(0, 4)
        .map((t) => t.title.replace(/ Trek| Yatra/g, ''))
        .concat(['Talk to support']),
      links: picks.slice(0, 4).map((t) => ({ label: t.title, href: trekDetailPath(t) })),
    });
  }

  if (q.includes('cheapest') || q.includes('lowest price') || q.includes('budget trek')) {
    const cheap = [...treks].sort((a, b) => minPrice(a) - minPrice(b)).slice(0, 6);
    return attachSupportHint({
      text: `Most affordable options:\n\n${cheap.map(formatTrekCard).join('\n\n')}\n\nAsk for any name for packages.`,
      quickReplies: cheap.slice(0, 3).map((t) => t.title.replace(/ Trek| Yatra/g, '')).concat(['Talk to support']),
      links: cheap.slice(0, 4).map((t) => ({ label: t.title, href: trekDetailPath(t) })),
    });
  }

  if (q.includes('beginner') || q.includes('first trek') || (q.includes('easy') && !findTreks(q).length)) {
    const easy = treks.filter((t) => /easy/i.test(t.difficulty)).slice(0, 6);
    return attachSupportHint({
      text:
        `Best starter options:\n\n${easy.map(formatTrekCard).join('\n\n')}\n\n` +
        `Kedarkantha is our most loved winter beginner trek. Ask for "full details" on any name.`,
      quickReplies: easy.slice(0, 3).map((t) => t.title).concat(['How to book', 'Talk to support']),
      links: easy.slice(0, 4).map((t) => ({ label: t.title, href: trekDetailPath(t) })),
    });
  }

  // Compare two treks
  if (q.includes('compare') || q.includes(' vs ') || q.includes(' versus ')) {
    const parts = enriched.split(/\bvs\.?\b|\bversus\b|\bcompare\b/i).map((s) => s.trim()).filter(Boolean);
    const a = findTreks(parts[0] || q)[0];
    const b = findTreks(parts[1] || '')[0] || findTreks(q).find((t) => t.id !== a?.id);
    if (a && b) {
      return attachSupportHint({
        text:
          `*${a.title}* vs *${b.title}*\n\n` +
          `| | ${a.title} | ${b.title} |\n` +
          `Duration: ${a.duration} vs ${b.duration}\n` +
          `Difficulty: ${a.difficulty} vs ${b.difficulty}\n` +
          `Max altitude: ${a.maxAltitude} vs ${b.maxAltitude}\n` +
          `From: ₹${minPrice(a).toLocaleString('en-IN')} vs ₹${minPrice(b).toLocaleString('en-IN')}\n` +
          `Season: ${a.bestSeason} vs ${b.bestSeason}\n\n` +
          `Ask for full details on either, or talk to support for a personal recommendation.`,
        quickReplies: [a.title.replace(/ Trek| Yatra/g, ''), b.title.replace(/ Trek| Yatra/g, ''), 'Talk to support'],
        links: [
          { label: a.title, href: trekDetailPath(a) },
          { label: b.title, href: trekDetailPath(b) },
        ],
      });
    }
  }

  // Trek-focused intents
  const matched = findTreks(q);
  if (matched.length) {
    const primary = matched[0];
    const wantsItinerary = /itinerary|day by day|schedule|daywise|plan/.test(q);
    const wantsIncl = /inclusion|exclusion|include|exclude|what is included|meals|stay/.test(q);
    const wantsPrice = /price|cost|budget|fee|how much|rs\b|rupee|package|deposit|₹/.test(q);
    const wantsFaq = /\bfaq\b|frequently|common question/.test(q);
    const wantsBook = /\bbook\b|reserve|enroll|join this|i want to go/.test(q);
    const wantsFull =
      /full|detail|complete|everything|info|about|overview/.test(q) || matched.length === 1;

    if (matched.length > 1 && !wantsFull && !wantsPrice && !wantsItinerary && !wantsIncl && !wantsFaq && !wantsBook) {
      return attachSupportHint({
        text:
          `I found multiple matches:\n\n${matched.map(formatTrekCard).join('\n\n')}\n\n` +
          `Reply with the exact name for full details.`,
        quickReplies: matched.map((t) => t.title.replace(/ Trek| Yatra/g, '')).concat(['Talk to support']),
        links: matched.map((t) => ({ label: t.title, href: trekDetailPath(t) })),
      });
    }

    if (wantsBook) {
      return softHandoff(
        {
          text:
            `Great choice — *${primary.title}*!\n\n` +
            `Starting from ₹${minPrice(primary).toLocaleString('en-IN')} + 5% GST.\n` +
            `Duration: ${primary.duration} · ${primary.difficulty} · ${primary.maxAltitude}\n\n` +
            '*Next steps*\n' +
            `1) Open the trek page and pick a batch\n` +
            `2) Or WhatsApp us with preferred month + group size for a manual booking\n\n` +
            `Start/End: ${primary.startEndPoint}`,
          quickReplies: ['How to book', `${primary.title.replace(/ Trek| Yatra/g, '')} price`, 'Talk to support'],
          links: [
            { label: `Open ${primary.title}`, href: trekDetailPath(primary) },
            {
              label: 'Book on WhatsApp',
              href: whatsappUrl(
                `Hi! I want to book ${primary.title}. Preferred month: ____. Group size: ____.`,
              ),
            },
          ],
        },
        original,
      );
    }

    const focus = wantsItinerary
      ? 'itinerary'
      : wantsIncl
        ? 'inclusions'
        : wantsPrice
          ? 'price'
          : wantsFaq
            ? 'faq'
            : undefined;
    const text = formatFullTrek(primary, focus);

    return attachSupportHint({
      text,
      quickReplies: [
        `${primary.title.replace(/ Trek| Yatra/g, '')} itinerary`,
        `${primary.title.replace(/ Trek| Yatra/g, '')} price`,
        'How to book',
        'Talk to support',
      ],
      links: [
        { label: `Open ${primary.title}`, href: trekDetailPath(primary) },
        {
          label: 'Book help on WhatsApp',
          href: whatsappUrl(`Hi! I want details/booking help for ${primary.title}.`),
        },
      ],
    });
  }

  // Cross-trek FAQ search
  const faqHits = searchTrekFaqs(q);
  if (faqHits.length) {
    return attachSupportHint({
      text:
        `Here's what I found:\n\n` +
        faqHits
          .map(
            (h) =>
              `*${h.trek.title}*\nQ: ${h.q}\nA: ${h.a}`,
          )
          .join('\n\n') +
        `\n\nNeed more? Ask about a specific trek or talk to support.`,
      quickReplies: faqHits.map((h) => h.trek.title.replace(/ Trek| Yatra/g, '')).concat(['Talk to support']),
      links: faqHits.map((h) => ({ label: h.trek.title, href: trekDetailPath(h.trek) })),
    });
  }

  // Topic FAQs
  for (const item of topicKnowledge) {
    if (item.keywords.some((k) => q.includes(normalize(k)))) {
      const reply: AssistantReply = {
        text: item.answer,
        quickReplies: ['Popular treks', 'How to book', 'All destinations', 'Talk to support'],
        links: [
          { label: 'WhatsApp support', href: whatsappUrl(`Hi! Question: ${original}`) },
          { label: 'Email us', href: mailtoUrl('Website assistant question', original) },
        ],
      };
      if (item.hardHandoff) return humanHandoff(original, item.answer);
      if (item.softHandoff) return softHandoff(reply, original);
      return attachSupportHint(reply);
    }
  }

  // Unresolved — still try to be useful before handoff
  return humanHandoff(
    original,
    "I couldn't find a confident match in our trek database for that.",
  );
}
