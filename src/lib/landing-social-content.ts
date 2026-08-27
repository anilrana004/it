import { photos } from '@/lib/media';
import { blogPath, blogPosts, type BlogPost } from '@/lib/blog';

export type LandingReview = {
  id: string;
  name: string;
  batch: string;
  short: string;
  full: string;
};

export type LandingArticle = {
  href: string;
  title: string;
  read: string;
  excerpt: string;
  image: string;
};

function toArticle(post: BlogPost, excerpt: string): LandingArticle {
  return {
    href: blogPath(post.slug),
    title: post.title,
    read: post.read,
    excerpt,
    image: post.image,
  };
}

function findPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export const backpackingReviews: LandingReview[] = [
  {
    id: 'bp-arjun',
    name: 'Arjun Mehta',
    batch: 'Himachal Backpacking · Manali · Kasol · Jibhi',
    short:
      'The perfect mix of cafés, forests and mountain roads. Felt like real backpacking, not a rushed tour.',
    full: 'The perfect mix of cafés, forests and mountain roads. Felt like real backpacking, not a rushed tour. Small group, flexible days, and enough free time to explore on our own. Logistics were smooth from Delhi to Delhi — I would book another circuit with Indian Treks without thinking twice.',
  },
  {
    id: 'bp-sara',
    name: 'Sara Fernandes',
    batch: 'All Girls Himachal Backpacking',
    short:
      'Safe, social and beautifully paced. The all-girls batch made every day feel easy and fun.',
    full: 'Safe, social and beautifully paced. The all-girls batch made every day feel easy and fun. Leaders were clear and caring, stays were comfortable, and the group vibe was warm from day one. Kasol and Jibhi were highlights — already planning Meghalaya next.',
  },
  {
    id: 'bp-rohan',
    name: 'Rohan Kapoor',
    batch: 'Winter Spiti Trip',
    short:
      'Spiti in winter was surreal. Cold, remote and unforgettable — the team handled everything well.',
    full: 'Spiti in winter was surreal. Cold, remote and unforgettable — the team handled everything well. Briefings on altitude and weather were clear, vehicles and stays were solid, and the landscapes felt otherworldly. A serious adventure done thoughtfully.',
  },
  {
    id: 'bp-isha',
    name: 'Isha Nair',
    batch: 'Meghalaya & Kaziranga Backpacking',
    short:
      'Waterfalls, living-root bridges and safari — a Northeast trip I will talk about for years.',
    full: 'Waterfalls, living-root bridges and safari — a Northeast trip I will talk about for years. The itinerary balanced nature, culture and rest. Guides were knowledgeable and the group became friends quickly. Guwahati pickup made travel simple.',
  },
  {
    id: 'bp-vikram',
    name: 'Vikram Singh',
    batch: 'Uttarakhand Backpacking · Auli · Chopta · Rishikesh',
    short:
      'Mountains, rivers and evenings by the Ganga. Exactly the immersive trip I wanted.',
    full: 'Mountains, rivers and evenings by the Ganga. Exactly the immersive trip I wanted. Indian Treks kept the pace relaxed without wasting days. Chopta views and Rishikesh energy were perfect bookends. Highly recommend for first-time backpackers.',
  },
  {
    id: 'bp-meera',
    name: 'Meera Joshi',
    batch: 'Himachal · McLeodganj · Triund · Bir',
    short:
      'Triund sunrise and Bir cafés — a short Himachal loop that still felt complete.',
    full: 'Triund sunrise and Bir cafés — a short Himachal loop that still felt complete. Great for a week off work. Organisation was crisp, the group was friendly, and I never felt rushed. Will return for Spiti next season.',
  },
];

export const sacredYatraReviews: LandingReview[] = [
  {
    id: 'sy-priya',
    name: 'Priya Deshmukh',
    batch: 'Kedarnath Yatra',
    short:
      'Kedarnath was spiritual and well organised. Clean stays, clear briefings, and caring staff throughout.',
    full: 'Kedarnath was spiritual and well organised. Clean stays, clear briefings, and caring staff throughout. The team helped with trek pacing and darshan timing so elders in our family never felt stressed. A pilgrimage done with respect and care.',
  },
  {
    id: 'sy-amit',
    name: 'Amit Sharma',
    batch: 'Char Dham Yatra',
    short:
      'All four dhams, one seamless journey. Logistics across long drives were handled professionally.',
    full: 'All four dhams, one seamless journey. Logistics across long drives were handled professionally. Temple timings, stays and meal arrangements were clear every day. We could focus on darshan instead of planning — exactly what we needed.',
  },
  {
    id: 'sy-neha',
    name: 'Neha Gupta',
    batch: 'Do Dham Yatra',
    short:
      'Kedarnath and Badrinath in one thoughtful circuit. Pace was right for our parents.',
    full: 'Kedarnath and Badrinath in one thoughtful circuit. Pace was right for our parents. Leaders were patient, vehicles were comfortable, and evening briefings kept everyone aligned. Felt sacred and stress-free at the same time.',
  },
  {
    id: 'sy-ravi',
    name: 'Ravi Patel',
    batch: 'Kedarnath Chopta Tungnath Trip',
    short:
      'Darshan plus Chopta meadows — the perfect mix of pilgrimage and soft mountain days.',
    full: 'Darshan plus Chopta meadows — the perfect mix of pilgrimage and soft mountain days. Tungnath was a highlight. Compact itinerary, good stays, and helpful coordinators from Haridwar onwards. Strongly recommend for families.',
  },
  {
    id: 'sy-anita',
    name: 'Anita Verma',
    batch: 'Kedarnath Badrinath Chopta Tungnath',
    short:
      'Do Dham with Chopta scenery felt complete. Every transfer and stay was organised on time.',
    full: 'Do Dham with Chopta scenery felt complete. Every transfer and stay was organised on time. We got both spiritual depth and Himalayan views without feeling exhausted. The Indian Treks team was responsive and kind throughout.',
  },
  {
    id: 'sy-suresh',
    name: 'Suresh Nair',
    batch: 'Panch Kedar Yatra',
    short:
      'Five abodes of Shiva on quieter trails. Demanding, beautiful, and deeply moving.',
    full: 'Five abodes of Shiva on quieter trails. Demanding, beautiful, and deeply moving. Trek leaders managed altitude and pace carefully. Camps and meals were solid. This is a yatra for those who want devotion and wilderness together.',
  },
];

const groupTravel = findPost('group-travel-himalayas');
const firstTrek = findPost('first-himalayan-trek');
const julyTreks = findPost('best-places-india-july');
const familyTrek = findPost('family-trekking-in-india');
const vofGuide = findPost('valley-of-flowers-guide');

export const backpackingArticles: LandingArticle[] = [
  groupTravel
    ? toArticle(
        groupTravel,
        'Why travelling with a small group makes Himalayan backpacking safer, richer and more affordable.',
      )
    : {
        href: '/blog',
        title: 'Why Group Travel is the Best Way to Explore the Himalayas',
        read: '5 min read',
        excerpt: 'Safety, community and expert guidance on the trail.',
        image: photos.himachal,
      },
  firstTrek
    ? toArticle(
        firstTrek,
        'Training, packing and altitude basics before your first mountain backpacking trip.',
      )
    : {
        href: '/blog',
        title: '5 Essential Tips for Your First Himalayan Trek',
        read: '6 min read',
        excerpt: 'Prepare well before you go.',
        image: photos.uttarakhand,
      },
  julyTreks
    ? toArticle(
        julyTreks,
        'Monsoon landscapes, rain-shadow Spiti and lush Uttarakhand routes worth considering.',
      )
    : {
        href: '/blog',
        title: 'Best Himalayan Treks to Do in July',
        read: '6 min read',
        excerpt: 'Where to go when the mountains turn green.',
        image: photos.snow,
      },
];

export const sacredYatraArticles: LandingArticle[] = [
  groupTravel
    ? toArticle(
        groupTravel,
        'How group pilgrimage keeps temple logistics, safety and companionship together on long Himalayan roads.',
      )
    : {
        href: '/blog',
        title: 'Why Group Travel is the Best Way to Explore the Himalayas',
        read: '5 min read',
        excerpt: 'Pilgrimage is easier — and safer — together.',
        image: photos.yatra,
      },
  familyTrek
    ? toArticle(
        familyTrek,
        'What multi-generation travel teaches families on mountain paths — useful context for yatra planning.',
      )
    : {
        href: '/blog/family-trekking-in-india',
        title: 'The Deeper Benefits of Family Trekking',
        read: '18 min read',
        excerpt: 'Travelling with family in the mountains.',
        image: photos.chopta,
      },
  vofGuide
    ? toArticle(
        vofGuide,
        'A neighbouring Uttarakhand journey many pilgrims combine with Chopta and temple circuits.',
      )
    : {
        href: '/blog',
        title: 'Complete Guide to Valley of Flowers Trek 2026',
        read: '9 min read',
        excerpt: 'Plan a scenic Himalayan extension.',
        image: photos.vof,
      },
];

export const bikingReviews: LandingReview[] = [
  {
    id: 'bk-karan',
    name: 'Karan Malhotra',
    batch: 'Ladakh Bike Trip · 8D/7N',
    short:
      'Khardung La and long highway days done right. Support vehicle and marshals made the ride feel safe.',
    full: 'Khardung La and long highway days done right. Support vehicle and marshals made the ride feel safe. Bikes were sorted, briefings were clear, and the group energy was excellent. The 8-day circuit is the one I would recommend if you want the full Ladakh feel.',
  },
  {
    id: 'bk-divya',
    name: 'Divya Rao',
    batch: 'Ladakh Bike Trip · 6D/5N',
    short:
      'Short but intense. Perfect when you have one week and still want iconic Ladakh roads.',
    full: 'Short but intense. Perfect when you have one week and still want iconic Ladakh roads. Organisation was crisp from Manali onwards. I was a moderately experienced rider and never felt left behind. Would book the 7-day next time.',
  },
  {
    id: 'bk-amit',
    name: 'Amit Joshi',
    batch: 'Spiti Valley Tour',
    short:
      'Spiti roads are raw and beautiful. The team handled altitude, fuel stops and stays smoothly.',
    full: 'Spiti roads are raw and beautiful. The team handled altitude, fuel stops and stays smoothly. Monasteries, cold desert views and evening rider chats made this unforgettable. Highly recommend for anyone who wants Spiti on two wheels.',
  },
  {
    id: 'bk-neha',
    name: 'Neha Kapoor',
    batch: 'Ladakh Bike Trip · 7D/6N',
    short:
      'Balanced itinerary — enough riding without feeling crushed every evening.',
    full: 'Balanced itinerary — enough riding without feeling crushed every evening. Captains were patient with newer riders in the group. Stays were clean and food was solid. Ladakh on a Royal Enfield with Indian Treks was a bucket-list tick.',
  },
  {
    id: 'bk-rahul',
    name: 'Rahul Verma',
    batch: 'Spiti Valley Tour',
    short:
      'Manali to Kaza and back felt epic. Support jeep was always nearby when we needed it.',
    full: 'Manali to Kaza and back felt epic. Support jeep was always nearby when we needed it. Photography stops, monastery visits and group dinners were well paced. A professional Himalayan bike trip from start to finish.',
  },
  {
    id: 'bk-sara',
    name: 'Sara Khan',
    batch: 'Ladakh Bike Trip · 8D/7N',
    short:
      'First high-altitude bike trip — the briefings and marshals gave me real confidence.',
    full: 'First high-altitude bike trip — the briefings and marshals gave me real confidence. Weather changed fast but the team adapted routes calmly. Scenery was unreal and the group became friends for life.',
  },
];

export const bikingArticles: LandingArticle[] = [
  groupTravel
    ? toArticle(
        groupTravel,
        'Why riding the Himalayas with a supported group is safer, simpler and more fun than going alone.',
      )
    : {
        href: '/blog',
        title: 'Why Group Travel is the Best Way to Explore the Himalayas',
        read: '5 min read',
        excerpt: 'Support, safety and camaraderie on mountain roads.',
        image: photos.himachal,
      },
  firstTrek
    ? toArticle(
        firstTrek,
        'Fitness, packing and altitude basics that translate well to Himalayan bike expeditions.',
      )
    : {
        href: '/blog',
        title: '5 Essential Tips for Your First Himalayan Trek',
        read: '6 min read',
        excerpt: 'Prepare before you ride high.',
        image: photos.snow,
      },
  julyTreks
    ? toArticle(
        julyTreks,
        'Season notes for Spiti and high Himalayan routes when summer windows open.',
      )
    : {
        href: '/blog',
        title: 'Best Himalayan Treks to Do in July',
        read: '6 min read',
        excerpt: 'When mountain roads come alive.',
        image: photos.uttarakhand,
      },
];

export const internationalReviews: LandingReview[] = [
  {
    id: 'ig-rahul',
    name: 'Rahul Sharma',
    batch: 'Everest Base Camp',
    short:
      'Everest Base Camp was the trek of a lifetime. Acclimatisation, gear support and guide quality were top-notch.',
    full: 'Everest Base Camp was the trek of a lifetime. Acclimatisation, gear support and guide quality were top-notch. The Lukla flight, Namche days and Kala Patthar sunrise felt perfectly paced. Indian Treks made a dream itinerary feel achievable and safe.',
  },
  {
    id: 'ig-ankita',
    name: 'Ankita Choudhary',
    batch: 'Annapurna Base Camp Trek',
    short:
      'Sanctuary views, tea houses and a warm group. ABC was the perfect first Nepal trek.',
    full: 'Sanctuary views, tea houses and a warm group. ABC was the perfect first Nepal trek. Leaders managed altitude carefully and evenings felt social without being overwhelming. I came back confident enough to eye Everest next.',
  },
  {
    id: 'ig-vikram',
    name: 'Vikram Singh',
    batch: 'Annapurna Circuit Trek',
    short:
      'Long days, changing landscapes and a proper high-pass finish. The circuit felt epic end to end.',
    full: 'Long days, changing landscapes and a proper high-pass finish. The circuit felt epic end to end. Logistics across villages were smooth and the team kept morale high on tougher stretches. A classic Nepal adventure done professionally.',
  },
  {
    id: 'ig-meera',
    name: 'Meera Iyer',
    batch: 'Everest Base Camp',
    short:
      'Clear briefings and patient leaders. High altitude felt managed, not scary.',
    full: 'Clear briefings and patient leaders. High altitude felt managed, not scary. Tea-house stays were organised well and the group looked after each other. Standing at Base Camp was emotional — and the planning from India was effortless.',
  },
  {
    id: 'ig-deepak',
    name: 'Deepak Bansal',
    batch: 'Annapurna Base Camp Trek',
    short:
      'Poon Hill sunrise and Base Camp amphitheatre — unforgettable. Strongly recommend.',
    full: 'Poon Hill sunrise and Base Camp amphitheatre — unforgettable. Strongly recommend. Food, pacing and permits were handled without fuss. Perfect for anyone who wants Nepal’s classic beauty without overcomplicating logistics.',
  },
  {
    id: 'ig-sara',
    name: 'Sara Fernandes',
    batch: 'Annapurna Circuit Trek',
    short:
      'Culture, altitude and scenery in one loop. Exactly the international trek I wanted.',
    full: 'Culture, altitude and scenery in one loop. Exactly the international trek I wanted. The team was responsive before departure and solid on trail. I would book another Nepal departure with Indian Treks again.',
  },
];

export const internationalArticles: LandingArticle[] = [
  groupTravel
    ? toArticle(
        groupTravel,
        'Why Nepal’s big Himalayan trails are safer and richer when you trek with a supported group.',
      )
    : {
        href: '/blog',
        title: 'Why Group Travel is the Best Way to Explore the Himalayas',
        read: '5 min read',
        excerpt: 'Safety and camaraderie on international trails.',
        image: photos.nepal,
      },
  firstTrek
    ? toArticle(
        firstTrek,
        'Training, packing and altitude basics before EBC, ABC or the Annapurna Circuit.',
      )
    : {
        href: '/blog',
        title: '5 Essential Tips for Your First Himalayan Trek',
        read: '6 min read',
        excerpt: 'Prepare before you fly to Nepal.',
        image: photos.ebc,
      },
  julyTreks
    ? toArticle(
        julyTreks,
        'Season context for Himalayan itineraries when planning your Nepal window.',
      )
    : {
        href: '/blog',
        title: 'Best Himalayan Treks to Do in July',
        read: '6 min read',
        excerpt: 'When to go and what to expect.',
        image: photos.himachal,
      },
];

export const domesticReviews: LandingReview[] = [
  {
    id: 'dt-swapnita',
    name: 'Swapnita Swain',
    batch: 'Customised Ladakh trip',
    short:
      'We booked a customised Ladakh trip for two and they planned a perfect itinerary — smooth and unforgettable.',
    full: 'We booked a customised Ladakh trip for two and they did a commendable job. Planned a perfect itinerary which made our journey smooth and unforgettable. Stays, transfers and pacing all felt thoughtful.',
  },
  {
    id: 'dt-karthik',
    name: 'Karthik Raja K',
    batch: 'Himachal customised trip',
    short:
      'Amazing Manali–Shimla style Himachal trip. Well-planned package, comfortable stays, great support throughout.',
    full: 'Had an amazing Himachal trip with Indian Treks! The customised package was well-planned, stays were comfortable, and the entire journey was smooth. Great support from the team throughout. Highly recommended!',
  },
  {
    id: 'dt-gautam',
    name: 'Gautam Bagra',
    batch: 'Uttarakhand trek',
    short:
      'If you are planning with friends or family, this is a great choice — smooth, scenic and well organised.',
    full: 'If you are planning a customised trip with friends or family, Indian Treks is a great choice. Our Uttarakhand trek was smooth and well-organised, and the views made it truly unforgettable. Hoping for more treks with you in the future!',
  },
  {
    id: 'dt-simica',
    name: 'Simica Das',
    batch: 'Uttarakhand · Tungnath region',
    short:
      'Customised Uttarakhand trip felt hassle-free. The team resolved even tiny issues quickly.',
    full: 'We recently went on a customised trip to Uttarakhand and it was an amazing experience. The team helped plan the entire trip smoothly, taking care of details, and stayed supportive throughout. Arrangements were well-managed and professional — we would definitely recommend Indian Treks.',
  },
  {
    id: 'dt-shreeyash',
    name: 'Shreeyash Nage',
    batch: 'Affordable domestic package',
    short:
      'Really affordable customised packages with excellent arrangement and professional guides.',
    full: 'They arrange really affordable customised tour packages! Excellent arrangement and very professional guides. Trip leaders add a lot of value and the team is friendly and supportive. Indian Treks is an excellent travel choice.',
  },
  {
    id: 'dt-neha',
    name: 'Neha Gupta',
    batch: 'Weekend Himachal escape',
    short:
      'Triund-style weekend escape was perfect — great campsite energy and stunning views.',
    full: 'A short Himachal escape was perfect for a weekend. Great campsite, friendly group, and stunning mountain views. Organisation was crisp and I never felt rushed.',
  },
];

export const domesticArticles: LandingArticle[] = [
  julyTreks
    ? toArticle(
        julyTreks,
        'Season ideas across Uttarakhand, Himachal and rain-shadow Spiti when planning India trips.',
      )
    : {
        href: '/blog',
        title: 'Best Himalayan Treks to Do in July',
        read: '6 min read',
        excerpt: 'Where to go across India this season.',
        image: photos.uttarakhand,
      },
  groupTravel
    ? toArticle(
        groupTravel,
        'Why customised and group Himalayan trips are safer, simpler and more memorable.',
      )
    : {
        href: '/blog',
        title: 'Why Group Travel is the Best Way to Explore the Himalayas',
        read: '5 min read',
        excerpt: 'Plan India your way — with support.',
        image: photos.himachal,
      },
  familyTrek
    ? toArticle(
        familyTrek,
        'Useful reading if you are planning a family-friendly domestic mountain holiday.',
      )
    : {
        href: '/blog/family-trekking-in-india',
        title: 'The Deeper Benefits of Family Trekking',
        read: '18 min read',
        excerpt: 'Travel India with your family.',
        image: photos.chopta,
      },
];

export const bestSellersReviews: LandingReview[] = [
  {
    id: 'bs-priya',
    name: 'Priya Sharma',
    batch: 'Kedarkantha · Jan 2026',
    short: 'Our best-seller pick did not disappoint — smooth logistics and an incredible summit sunrise.',
    full: 'Our best-seller pick did not disappoint — smooth logistics and an incredible summit sunrise. The group size was perfect, leaders were patient with first-timers, and every camp was well organised. Already booked Valley of Flowers for monsoon.',
  },
  {
    id: 'bs-amit',
    name: 'Amit Desai',
    batch: 'Kedarnath Yatra · Sep 2025',
    short: 'Most booked for a reason — darshan, stays and transport were handled end to end.',
    full: 'Most booked for a reason — darshan, stays and transport were handled end to end. Briefings were clear, the tour manager was always reachable, and our family felt safe throughout. Highly recommend for first-time yatris.',
  },
  {
    id: 'bs-neha',
    name: 'Neha Reddy',
    batch: 'Everest Base Camp · Oct 2025',
    short: 'EBC lives up to the hype. Indian Treks made a complex trek feel manageable.',
    full: 'EBC lives up to the hype. Indian Treks made a complex trek feel manageable with acclimatisation days, strong guides and reliable teahouse coordination. The international bestseller badge is well earned.',
  },
  {
    id: 'bs-karan',
    name: 'Karan Malhotra',
    batch: 'Hampta Pass · Jun 2025',
    short: 'Classic bestseller trek — varied terrain every day and a great group vibe.',
    full: 'Classic bestseller trek — varied terrain every day and a great group vibe. Food was better than expected, river crossings were supervised well, and the Spiti-side landscapes were the highlight of my year.',
  },
];

export const bestSellersArticles: LandingArticle[] = [
  groupTravel
    ? toArticle(groupTravel, 'Why our most-booked group trips keep filling every season.')
    : {
        href: '/blog',
        title: 'Why Group Travel is the Best Way to Explore the Himalayas',
        read: '5 min read',
        excerpt: 'What makes bestseller batches work.',
        image: photos.himachal,
      },
  julyTreks
    ? toArticle(julyTreks, 'Season planning for top domestic departures.')
    : {
        href: '/blog',
        title: 'Best Himalayan Treks to Do in July',
        read: '6 min read',
        excerpt: 'Pick the right month for your trek.',
        image: photos.uttarakhand,
      },
  familyTrek
    ? toArticle(familyTrek, 'Family-friendly picks from our bestseller list.')
    : {
        href: '/blog/family-trekking-in-india',
        title: 'The Deeper Benefits of Family Trekking',
        read: '18 min read',
        excerpt: 'Travel India with your family.',
        image: photos.chopta,
      },
];

export const upcomingTripsReviews: LandingReview[] = [
  {
    id: 'ut-divya',
    name: 'Divya Nair',
    batch: 'Valley of Flowers · Sep batch',
    short: 'Booking an upcoming batch gave us fixed dates — no last-minute chaos.',
    full: 'Booking an upcoming batch gave us fixed dates — no last-minute chaos. The September window was perfect for meadows in bloom. Indian Treks kept us updated on weather and packing till departure day.',
  },
  {
    id: 'ut-rahul',
    name: 'Rahul Verma',
    batch: 'Kuari Pass · Oct batch',
    short: 'October departure meant crisp views and a full group from day one.',
    full: 'October departure meant crisp views and a full group from day one. Leaders knew the trail well, camps were comfortable, and the Book Now Pay Later option made planning easier for our office group.',
  },
  {
    id: 'ut-ananya',
    name: 'Ananya Iyer',
    batch: 'Annapurna Base Camp · Nov batch',
    short: 'International upcoming batch was seamless from briefing to Lukla flights.',
    full: 'International upcoming batch was seamless from briefing to Lukla flights. Having confirmed dates helped us align leave from work. ABC sunrise from base camp was unforgettable.',
  },
  {
    id: 'ut-manish',
    name: 'Manish Gupta',
    batch: 'Triund · Sep weekend batch',
    short: 'Short upcoming weekend trip — exactly what we needed from Delhi.',
    full: 'Short upcoming weekend trip — exactly what we needed from Delhi. Quick trek, friendly batch, and clear communication on pickup timing. Will watch for the next September slot.',
  },
];

export const upcomingTripsArticles: LandingArticle[] = [
  julyTreks
    ? toArticle(julyTreks, 'Match your departure month to the right trail.')
    : {
        href: '/blog',
        title: 'Best Himalayan Treks to Do in July',
        read: '6 min read',
        excerpt: 'Season windows for fixed batches.',
        image: photos.uttarakhand,
      },
  groupTravel
    ? toArticle(groupTravel, 'Why fixed departures work for busy schedules.')
    : {
        href: '/blog',
        title: 'Why Group Travel is the Best Way to Explore the Himalayas',
        read: '5 min read',
        excerpt: 'Plan around confirmed dates.',
        image: photos.himachal,
      },
  familyTrek
    ? toArticle(familyTrek, 'Family batches on upcoming calendars.')
    : {
        href: '/blog/family-trekking-in-india',
        title: 'The Deeper Benefits of Family Trekking',
        read: '18 min read',
        excerpt: 'Book ahead with confidence.',
        image: photos.chopta,
      },
];

export const newLaunchesReviews: LandingReview[] = backpackingReviews.slice(0, 4);

export const newLaunchesArticles: LandingArticle[] = backpackingArticles.slice(0, 3);

export const weekendTripsReviews: LandingReview[] = [
  {
    id: 'wk-rita',
    name: 'Rita Kapoor',
    batch: 'Triund · Weekend batch',
    short: 'Perfect Friday–Sunday reset — campsite vibes and Dhauladhar views.',
    full: 'Perfect Friday–Sunday reset — campsite vibes and Dhauladhar views. Pickup was on time, the group was friendly, and we were back for Monday without feeling rushed. Ideal first mountain weekend.',
  },
  {
    id: 'wk-sameer',
    name: 'Sameer Joshi',
    batch: 'Nag Tibba · 3D/2N',
    short: 'Short Garhwal escape with a proper summit feel. Great for first-timers.',
    full: 'Short Garhwal escape with a proper summit feel. Great for first-timers. Leaders paced us well, food was solid, and the views from the top made the climb worth every step.',
  },
  {
    id: 'wk-anjali',
    name: 'Anjali Rao',
    batch: 'Kheerganga · Weekend',
    short: 'Hot springs after the trek — the best long-weekend decision this year.',
    full: 'Hot springs after the trek — the best long-weekend decision this year. Kasol pickup was smooth and the trail felt social without being crowded. Booking through Indian Treks was hassle-free.',
  },
  {
    id: 'wk-vikas',
    name: 'Vikas Mehta',
    batch: 'Chopta Tungnath · Long weekend',
    short: 'Temple trail plus sunrise — short days, big payoff.',
    full: 'Temple trail plus sunrise — short days, big payoff. Exactly the weekend format we needed for our office group. Clear briefings and reliable transport from Rishikesh.',
  },
];

export const weekendTripsArticles: LandingArticle[] = [
  groupTravel
    ? toArticle(groupTravel, 'Why short group weekends work for busy schedules.')
    : {
        href: '/blog',
        title: 'Why Group Travel is the Best Way to Explore the Himalayas',
        read: '5 min read',
        excerpt: 'Plan a weekend with support.',
        image: photos.himachal,
      },
  julyTreks
    ? toArticle(julyTreks, 'Match your long weekend to the right short trail.')
    : {
        href: '/blog',
        title: 'Best Himalayan Treks to Do in July',
        read: '6 min read',
        excerpt: 'Season tips for short escapes.',
        image: photos.uttarakhand,
      },
  familyTrek
    ? toArticle(familyTrek, 'Family-friendly weekend mountain ideas.')
    : {
        href: '/blog/family-trekking-in-india',
        title: 'The Deeper Benefits of Family Trekking',
        read: '18 min read',
        excerpt: 'Short trails for all ages.',
        image: photos.chopta,
      },
];

export const bucketListSaleReviews: LandingReview[] = [
  {
    id: 'sale-meera',
    name: 'Meera Shah',
    batch: 'Kedarkantha · Sale batch',
    short: 'Grabbed the sale seat and still got the full winter trek experience.',
    full: 'Grabbed the sale seat and still got the full winter trek experience. Camps, food and leaders were excellent — the discount felt like a bonus, not a compromise.',
  },
  {
    id: 'sale-arjun',
    name: 'Arjun Patel',
    batch: 'Valley of Flowers · Sale',
    short: 'Sale pricing made the monsoon trek doable for our friend group.',
    full: 'Sale pricing made the monsoon trek doable for our friend group. Logistics were smooth and the meadows were unreal. Glad we booked during Bucket List Sale.',
  },
  {
    id: 'sale-nidhi',
    name: 'Nidhi Verma',
    batch: 'Kedarnath Yatra · Sale',
    short: 'Yatra on sale without cutting corners — stays and darshan support were solid.',
    full: 'Yatra on sale without cutting corners — stays and darshan support were solid. Tour manager was reachable throughout. Would book another sale yatra again.',
  },
  {
    id: 'sale-rohit',
    name: 'Rohit Singh',
    batch: 'ABC · International sale',
    short: 'International sale deal on ABC — confirmed dates and clear inclusions.',
    full: 'International sale deal on ABC — confirmed dates and clear inclusions. Paying less didn’t mean fewer services. Base camp sunrise was worth every rupee.',
  },
];

export const bucketListSaleArticles: LandingArticle[] = [
  groupTravel
    ? toArticle(groupTravel, 'Why sale-season group batches still deliver a great trip.')
    : {
        href: '/blog',
        title: 'Why Group Travel is the Best Way to Explore the Himalayas',
        read: '5 min read',
        excerpt: 'Book smart during sale windows.',
        image: photos.himachal,
      },
  julyTreks
    ? toArticle(julyTreks, 'Match sale departures to the right season.')
    : {
        href: '/blog',
        title: 'Best Himalayan Treks to Do in July',
        read: '6 min read',
        excerpt: 'Season tips before you book a deal.',
        image: photos.uttarakhand,
      },
  familyTrek
    ? toArticle(familyTrek, 'Family-friendly picks often featured in sales.')
    : {
        href: '/blog/family-trekking-in-india',
        title: 'The Deeper Benefits of Family Trekking',
        read: '18 min read',
        excerpt: 'Plan a discounted family escape.',
        image: photos.chopta,
      },
];

export const treksReviews: LandingReview[] = [
  {
    id: 'trk-priya',
    name: 'Priya Sharma',
    batch: 'Kedarkantha · Jan 2026',
    short: 'Our first winter trek — smooth logistics and an incredible summit sunrise.',
    full: 'Our first winter trek — smooth logistics and an incredible summit sunrise. The group size was perfect, leaders were patient with first-timers, and every camp was well organised. Already booked Valley of Flowers for monsoon.',
  },
  {
    id: 'trk-rahul',
    name: 'Rahul Verma',
    batch: 'Kuari Pass · Oct 2025',
    short: 'Crisp autumn views and a full group from day one. Leaders knew the trail inside out.',
    full: 'Crisp autumn views and a full group from day one. Leaders knew the trail inside out, camps were comfortable, and the Book Now Pay Later option made planning easier for our office group.',
  },
  {
    id: 'trk-rita',
    name: 'Rita Kapoor',
    batch: 'Triund · Weekend batch',
    short: 'Perfect first mountain weekend — campsite vibes and Dhauladhar views.',
    full: 'Perfect first mountain weekend — campsite vibes and Dhauladhar views. Pickup was on time, the group was friendly, and we were back for Monday without feeling rushed. Ideal introduction to trekking with Indian Treks.',
  },
  {
    id: 'trk-sameer',
    name: 'Sameer Joshi',
    batch: 'Nag Tibba · 3D/2N',
    short: 'Short Garhwal escape with a proper summit feel. Great for first-timers.',
    full: 'Short Garhwal escape with a proper summit feel. Great for first-timers. Leaders paced us well, food was solid, and the views from the top made the climb worth every step.',
  },
  {
    id: 'trk-karan',
    name: 'Karan Malhotra',
    batch: 'Hampta Pass · Jun 2025',
    short: 'Varied terrain every day and a great group vibe — the classic crossover trek done right.',
    full: 'Varied terrain every day and a great group vibe — the classic crossover trek done right. Food was better than expected, river crossings were supervised well, and the Spiti-side landscapes were the highlight of my year.',
  },
  {
    id: 'trk-divya',
    name: 'Divya Nair',
    batch: 'Valley of Flowers · Sep batch',
    short: 'Fixed dates, no last-minute chaos — meadows in full bloom and a well-led group.',
    full: 'Fixed dates, no last-minute chaos — meadows in full bloom and a well-led group. Indian Treks kept us updated on weather and packing till departure day. The September window was perfect.',
  },
];

export const treksArticles: LandingArticle[] = [
  firstTrek
    ? toArticle(
        firstTrek,
        'Training, packing and altitude basics before your first Himalayan trek.',
      )
    : {
        href: '/blog',
        title: '5 Essential Tips for Your First Himalayan Trek',
        read: '6 min read',
        excerpt: 'Prepare well before you go.',
        image: photos.uttarakhand,
      },
  julyTreks
    ? toArticle(
        julyTreks,
        'Monsoon landscapes, rain-shadow Spiti and lush Uttarakhand routes worth considering.',
      )
    : {
        href: '/blog',
        title: 'Best Himalayan Treks to Do in July',
        read: '6 min read',
        excerpt: 'Where to go when the mountains turn green.',
        image: photos.snow,
      },
  vofGuide
    ? toArticle(
        vofGuide,
        'Season windows, fitness prep and what to expect on one of Uttarakhand’s most-loved trails.',
      )
    : {
        href: '/blog',
        title: 'Complete Guide to Valley of Flowers Trek 2026',
        read: '8 min read',
        excerpt: 'Plan the meadows trek with confidence.',
        image: photos.chopta,
      },
];
