import { photos } from '@/lib/media';

export type PrepCalloutTone = 'info' | 'warn' | 'tip';

export type PrepSection = {
  id: string;
  title: string;
  lead?: string;
  body?: string[];
  bullets?: string[];
  steps?: { title: string; detail: string }[];
  weeks?: { week: string; focus: string; sessions: string[] }[];
  callout?: { tone: PrepCalloutTone; title: string; body: string };
  grid?: { title: string; icon: string; items: string[] }[];
  table?: { headers: [string, string]; rows: [string, string][] };
  checklist?: string[];
};

export type PrepGuideId =
  | 'how-to-prepare'
  | 'fitness-training-plan'
  | 'altitude-sickness-guide';

export type PrepPremiumRoadmapStep = {
  step: number;
  title: string;
  sub: string;
  targetId: string;
};

export type PrepPremiumEarlySign = {
  title: string;
  sub: string;
  targetId?: string;
};

export type PrepPremiumPreventionItem = {
  title: string;
  sub: string;
  targetId: string;
};

export type PrepPremiumHero = {
  variant?: 'default' | 'fitness' | 'altitude';
  brandLabel: string;
  eyebrow: string;
  eyebrowIcon?: 'clipboard' | 'heart' | 'mountain';
  titleMain: string;
  titleAccent: string;
  titleSuffix?: string;
  titleAccentStyle?: 'underline' | 'script' | 'inline';
  guidanceBadge: string;
  quote?: { text: string; attribution: string };
  earlySigns?: {
    title: string;
    items: readonly PrepPremiumEarlySign[];
    warning: string;
  };
  roadmapTitle?: string;
  roadmap?: readonly PrepPremiumRoadmapStep[];
  preventionBar?: {
    title: string;
    items: readonly PrepPremiumPreventionItem[];
  };
  handwritingNote?: string;
  ctaKicker?: string;
  ctaLead?: string;
  ctaSubtitle?: string;
  ctaLabel?: string;
  ctaTargetId?: string;
  trustPills?: readonly { title: string; sub: string }[];
};

/** Dedicated routes for each guide (opened from More dropdown) */
export const PREP_HUB_PATH = '/trek-preparation';

export type PrepGuide = {
  id: PrepGuideId;
  href: string;
  title: string;
  shortTitle: string;
  navLabel: string;
  eyebrow: string;
  lead: string;
  heroImage: string;
  readTime: string;
  icon: string;
  metaTitle: string;
  metaDescription: string;
  highlights: { label: string; value: string }[];
  premiumHero?: PrepPremiumHero;
  sections: PrepSection[];
};

export const PREP_GUIDES: PrepGuide[] = [
  {
    id: 'how-to-prepare',
    href: '/how-to-prepare',
    title: 'How to Prepare for a Himalayan Trek',
    shortTitle: 'How to Prepare',
    navLabel: 'How to Prepare',
    eyebrow: 'Trek preparation',
    lead:
      'A clear, practical roadmap — from choosing the right trail to packing, paperwork, and the week before you leave — so you arrive trail-ready, not trail-stressed.',
    heroImage: photos.prepHero,
    readTime: '12 min read',
    icon: 'fa-list-check',
    metaTitle: 'How to Prepare for a Himalayan Trek | Indian Treks',
    metaDescription:
      'Complete trek preparation guide — choose the right route, packing checklist, documents, travel insurance, and a day-by-day plan before your Himalayan trek with Indian Treks.',
    premiumHero: {
      brandLabel: 'Indian Treks',
      eyebrow: 'Trek preparation',
      titleMain: 'How to Prepare for',
      titleAccent: 'a Himalayan Trek',
      guidanceBadge: 'Field-tested guidance',
      roadmap: [
        {
          step: 1,
          title: 'Choose Your Trek',
          sub: 'Pick the right trail based on season, difficulty & experience',
          targetId: 'choose-right',
        },
        {
          step: 2,
          title: 'Plan & Prepare',
          sub: 'Train, build fitness, and get mentally trail-ready',
          targetId: 'timeline',
        },
        {
          step: 3,
          title: 'Permits & Paperwork',
          sub: 'Understand permits, ID proofs and essential documents',
          targetId: 'documents',
        },
        {
          step: 4,
          title: 'Packing Smart',
          sub: 'Carry only what you need. Light, layered & efficient',
          targetId: 'packing',
        },
        {
          step: 5,
          title: 'The Week Before',
          sub: 'Final checklist, weather check and last-minute tips',
          targetId: 'reporting',
        },
      ],
      ctaLead: 'Preparation today, unforgettable stories tomorrow. Let’s get you trail-ready!',
      ctaLabel: 'Start Preparing',
      ctaTargetId: 'choose-right',
    },
    highlights: [
      { label: 'Start', value: '4–8 weeks out' },
      { label: 'Focus', value: 'Gear · Docs · Mindset' },
      { label: 'Best for', value: 'First & returning trekkers' },
    ],
    sections: [
      {
        id: 'choose-right',
        title: '1. Choose a trek that matches you',
        lead: 'Most struggle on trail starts with the wrong route — not lack of willpower.',
        body: [
          'Match difficulty, max altitude, daily distance, and season to your fitness and experience. An easy–moderate trek at 10,000–12,500 ft is a stronger first step than jumping straight to a high pass.',
          'Read the trek page carefully: grade, best months, who it suits, and what’s included. If you are unsure, ask our team — we would rather place you on the right departure than push a harder one.',
        ],
        bullets: [
          'Beginners: 4–6 day easy–moderate routes under ~13,000 ft',
          'Returning trekkers: add distance, snow, or a higher pass gradually',
          'Families / 50+: prefer conservative altitude gain and rest days',
          'High season fills early — book when your dates and fitness align',
        ],
        callout: {
          tone: 'tip',
          title: 'Quick fit check',
          body: 'If you can walk 8–10 km with a light daypack on rolling terrain without finishing exhausted, you are in a good place for most beginner Himalayan treks — then train specifically for climbs.',
        },
      },
      {
        id: 'timeline',
        title: '2. Preparation timeline',
        lead: 'Spread the work. Cramming gear and fitness into the last week is what creates problems.',
        steps: [
          {
            title: '8–6 weeks before',
            detail:
              'Confirm trek & dates. Start the fitness plan. Book flights/trains to the reporting city. Arrange travel insurance that covers high-altitude trekking and evacuation.',
          },
          {
            title: '5–4 weeks before',
            detail:
              'Buy or rent boots and break them in on weekend walks. Build your packing list. Complete any medical check-ups. Share dietary needs and emergency contacts with Indian Treks.',
          },
          {
            title: '3–2 weeks before',
            detail:
              'Do longer weekend hikes with a loaded pack. Finalise documents (ID, insurance copy). Practise layering and rain-cover packing. Confirm pickup / reporting instructions.',
          },
          {
            title: 'Final week',
            detail:
              'Ease training volume. Sleep well. Pack by category. Carry cash in small notes. Download offline maps only if advised — follow your trek leader’s briefing on the ground.',
          },
          {
            title: 'Day before reporting',
            detail:
              'Light meal, hydrate, charge devices, keep documents and medicines in your daypack. Reach the base a night early when the itinerary recommends it.',
          },
        ],
      },
      {
        id: 'documents',
        title: '3. Documents & insurance',
        grid: [
          {
            title: 'Carry originals + copies',
            icon: 'fa-id-card',
            items: [
              'Government photo ID (Aadhaar / Voter ID / Passport)',
              'Trek confirmation & emergency contact sheet',
              'Insurance policy PDF (printed or offline on phone)',
              'Any doctor clearance letters if advised',
            ],
          },
          {
            title: 'Insurance must cover',
            icon: 'fa-shield-halved',
            items: [
              'High-altitude trekking (check altitude limit)',
              'Emergency medical treatment',
              'Helicopter / mountain evacuation where relevant',
              'Trip interruption for medical reasons',
            ],
          },
        ],
        callout: {
          tone: 'warn',
          title: 'Mandatory for expeditions',
          body: 'Travel insurance covering high-altitude trekking and emergency evacuation is mandatory on our expeditions. Policies that exclude “mountaineering” or altitudes above your trek’s max height will not help when you need them.',
        },
      },
      {
        id: 'packing',
        title: '4. Packing that actually works',
        lead: 'Pack light, layered, and dry. Weight and wet cotton are the two most common on-trail regrets.',
        body: [
          'Use a 40–50 L backpack with a rain cover. Keep a small day essentials kit (water, snacks, rain shell, sunscreen, meds, ID) always accessible. Offload bulk to mule/porter support only when your package includes it — never assume.',
        ],
        grid: [
          {
            title: 'Clothing system',
            icon: 'fa-shirt',
            items: [
              'Moisture-wicking base layers (not cotton)',
              'Fleece mid-layer + insulated jacket',
              'Waterproof hooded shell',
              'Quick-dry trek pants (never jeans)',
              'Beanie, sun cap, gloves, buff',
              '4–5 pairs merino / trek socks',
            ],
          },
          {
            title: 'Trail essentials',
            icon: 'fa-person-hiking',
            items: [
              'Broken-in ankle-support boots',
              'Trekking poles (huge on descents)',
              'Headlamp + spare batteries',
              '2 L water capacity + ORS',
              'SPF 50+ sunscreen & lip balm',
              'Sunglasses (UV400)',
            ],
          },
          {
            title: 'Health kit',
            icon: 'fa-heart-pulse',
            items: [
              'Personal prescription medicines',
              'Pain relief (as advised by your doctor)',
              'Blister care & antiseptic',
              'Hand sanitizer & wet wipes',
              'Quick-dry towel',
              'Diamox only if your doctor recommends it',
            ],
          },
          {
            title: 'Money & misc',
            icon: 'fa-wallet',
            items: [
              'Cash in small denominations',
              'Power bank (cold drains batteries)',
              'Dry bags / zip pouches',
              'Light camp sandals',
              'Reusable bottle / soft flask',
              'Trash bag — pack out what you pack in',
            ],
          },
        ],
        callout: {
          tone: 'info',
          title: 'Rent what you will not reuse',
          body: 'Down jackets, poles, and packs are available to rent on many departures. Boots should ideally be yours and already broken in — rental boots on day one are a classic blister recipe.',
        },
      },
      {
        id: 'mind-body',
        title: '5. Body, food & sleep before you go',
        bullets: [
          'Sleep 7–8 hours in the final week — recovery matters more than last-minute gym heroics',
          'Hydrate steadily; cut heavy alcohol 48–72 hours before reporting',
          'Eat familiar, balanced meals; avoid experimental “detox” diets right before the trek',
          'Treat any cold, fever, or infection before travel — do not trek while unwell',
          'Practise nasal breathing on climbs; slow and steady beats racing the group',
        ],
      },
      {
        id: 'reporting',
        title: '6. Reporting day checklist',
        checklist: [
          'Arrive at the meeting point on time with ID and confirmation',
          'Introduce yourself to the trek leader; share medical notes privately',
          'Attend the full briefing — pace, water, signals, leave-no-trace',
          'Weigh and adjust your pack; keep rain gear on top',
          'Save the leader’s emergency contact and Indian Treks support number',
          'Start slow on day one — the mountain rewards patience',
        ],
      },
      {
        id: 'common-mistakes',
        title: '7. Mistakes we see every season',
        bullets: [
          'New boots worn first on the trek',
          'Overpacking “just in case” and underpacking layers that actually work',
          'Skipping insurance or buying a policy that excludes altitude',
          'Comparing your pace to the fastest person in the group',
          'Ignoring early headache / nausea instead of telling the leader',
          'Relying only on phone maps and dead batteries in cold weather',
        ],
      },
    ],
  },
  {
    id: 'fitness-training-plan',
    href: '/fitness-training-plan',
    title: 'Fitness Training Plan for Treks',
    shortTitle: 'Fitness Training Plan',
    navLabel: 'Fitness Plan',
    eyebrow: 'Strength & stamina',
    lead:
      'An 8-week progressive plan built for Himalayan trails — climbing legs, lung capacity, pack strength, and recovery — without needing a fancy gym.',
    heroImage: photos.fitnessHero,
    readTime: '14 min read',
    icon: 'fa-heart-pulse',
    metaTitle: 'Trek Fitness Training Plan (8 Weeks) | Indian Treks',
    metaDescription:
      '8-week Himalayan trek fitness plan — cardio, strength, stair climbs, pack walks, and recovery so you enjoy the trail instead of surviving it.',
    premiumHero: {
      variant: 'fitness',
      brandLabel: 'Indian Treks',
      eyebrow: 'Strength & stamina',
      eyebrowIcon: 'heart',
      titleMain: 'Fitness Training Plan for',
      titleAccent: 'Treks',
      titleAccentStyle: 'script',
      guidanceBadge: 'Field-tested guidance',
      quote: {
        text: 'Train smart today, trek stronger tomorrow.',
        attribution: '— Indian Treks',
      },
      roadmapTitle: 'Your 8-week progress journey',
      roadmap: [
        {
          step: 1,
          title: 'Build the Base',
          sub: 'Improve stamina, mobility & consistency',
          targetId: 'goals',
        },
        {
          step: 2,
          title: 'Build Endurance',
          sub: 'Boost lung capacity & cardiovascular fitness',
          targetId: 'cardio',
        },
        {
          step: 3,
          title: 'Build Strength',
          sub: 'Focus on legs, core & upper body strength',
          targetId: 'strength',
        },
        {
          step: 4,
          title: 'Trek Simulation',
          sub: 'Practice with load, terrain & endurance',
          targetId: 'week-plan',
        },
        {
          step: 5,
          title: 'Peak & Prepare',
          sub: 'Taper smart, recover well & get trail-ready',
          targetId: 'recovery',
        },
      ],
      ctaKicker: 'Stronger every step',
      ctaLead: 'Follow the plan. Trust the process. Conquer the Himalayas.',
      ctaLabel: 'Start Your 8-Week Plan',
      ctaTargetId: 'goals',
      trustPills: [
        { title: 'No Gym Required', sub: 'Stairs, walks & bodyweight' },
        { title: 'Expert Designed', sub: 'Built for Himalayan trails' },
        { title: 'Trek-Tested Results', sub: 'Used by thousands' },
      ],
    },
    highlights: [
      { label: 'Duration', value: '8 weeks' },
      { label: 'Sessions', value: '4–5 per week' },
      { label: 'Gear', value: 'Shoes · stairs · daypack' },
    ],
    sections: [
      {
        id: 'goals',
        title: 'What “trek fit” actually means',
        body: [
          'On trail you need sustained uphill capacity, stable knees on long descents, a core that carries a pack without collapsing posture, and enough aerobic base to recover overnight.',
          'You do not need marathon times. You need consistency: weekly climbing volume, strength that protects joints, and the habit of moving with a pack on your back.',
        ],
        callout: {
          tone: 'tip',
          title: 'Baseline test (week 0)',
          body: 'Walk continuously for 45–60 minutes on an incline or stairs. Note breathing, knee comfort, and recovery the next day. Retest every two weeks — progress should feel easier, not just longer.',
        },
      },
      {
        id: 'rules',
        title: 'Training rules that keep you healthy',
        bullets: [
          'Warm up 5–8 minutes before every session; cool down and stretch after',
          'Increase weekly volume by ~10% — jump spikes cause injury',
          'One full rest day per week is non-negotiable',
          'Pain that alters your gait = stop and reassess (soreness is fine; sharp pain is not)',
          'Train in the shoes/boots you will trek in at least twice a week',
          'If you have heart, joint, or respiratory conditions, get medical clearance first',
        ],
      },
      {
        id: 'week-plan',
        title: '8-week progressive plan',
        lead: 'Four pillars each week: cardio climb, strength, long pack walk, and mobility/recovery.',
        weeks: [
          {
            week: 'Weeks 1–2 · Base',
            focus: 'Build the habit and joint tolerance',
            sessions: [
              '2× brisk walks or easy jogs — 30–40 min',
              '2× stair / incline sessions — 20–25 min continuous',
              '2× strength: squats, step-ups, glute bridges, planks (2–3 sets)',
              '1× long easy walk — 60–75 min, light daypack (4–6 kg)',
              'Daily: ankle circles, hip openers, calf stretches (8–10 min)',
            ],
          },
          {
            week: 'Weeks 3–4 · Build',
            focus: 'Add climb volume and pack familiarity',
            sessions: [
              '2× cardio: 40–50 min (include hills or treadmill incline 8–12%)',
              '2× stairs: 30–35 min; try 5–8 min intervals hard / easy',
              '2× strength: add lunges, Romanian deadlifts (light), side planks',
              '1× pack hike — 90 min, 6–8 kg; practise poles if you will use them',
              '1× mobility + foam roll or long stretch session',
            ],
          },
          {
            week: 'Weeks 5–6 · Trek-specific',
            focus: 'Simulate trail days',
            sessions: [
              '1× long pack day — 2.5–3.5 hrs on trails/stairs with 8–10 kg',
              '1× back-to-back shorter climb day the next morning (60–75 min) to practise fatigue',
              '2× strength focusing on single-leg stability and core anti-rotation',
              '1× tempo climb: 35–45 min at “can talk in short sentences” effort',
              'Keep one full rest day; sleep becomes part of training',
            ],
          },
          {
            week: 'Weeks 7–8 · Peak & taper',
            focus: 'Sharpen, then arrive fresh',
            sessions: [
              'Week 7: one solid long pack hike (3–4 hrs) mid-week, then normal strength',
              'Week 8: cut volume ~40–50%; keep short easy climbs for freshness',
              'No new exercises, no PR attempts, no race-day ego',
              'Final 3 days: walk easy, hydrate, pack, sleep — do not crush the gym',
              'Arrive at reporting point feeling slightly undertrained, not wiped out',
            ],
          },
        ],
      },
      {
        id: 'strength',
        title: 'Strength circuit (30–40 min)',
        lead: 'Do this twice a week. Quality over heavy load.',
        table: {
          headers: ['Move', 'Prescription'],
          rows: [
            ['Bodyweight or goblet squat', '3×12–15'],
            ['Step-ups (knee-high box/stair)', '3×10 each leg'],
            ['Reverse lunges', '3×8–10 each leg'],
            ['Hip hinge / light RDL', '3×10'],
            ['Calf raises', '3×15–20'],
            ['Glute bridge or hip thrust', '3×12'],
            ['Front plank', '3×30–45 sec'],
            ['Side plank', '2×20–30 sec each side'],
            ['Dead bug or bird-dog', '3×8 each side'],
          ],
        },
        callout: {
          tone: 'info',
          title: 'No gym? No problem',
          body: 'Stairs, a filled backpack, a park bench, and resistance bands cover 90% of what trek fitness needs. Consistency beats equipment.',
        },
      },
      {
        id: 'cardio',
        title: 'Cardio that transfers to the mountains',
        bullets: [
          'Prioritise incline walking, stair climber, hill repeats, and outdoor trails',
          'Keep most sessions conversational; add short harder intervals once a week',
          'Swim or cycle on recovery days if joints feel beat up',
          'Practise nasal breathing on easy climbs — it calms pacing on real trails',
          'Once a week, finish a climb with 10 quiet minutes of easy walking to teach recovery',
        ],
      },
      {
        id: 'by-difficulty',
        title: 'Adjust by trek difficulty',
        grid: [
          {
            title: 'Easy / beginner',
            icon: 'fa-seedling',
            items: [
              '6 weeks may be enough if you are already active',
              'Focus on stairs + one long weekend walk',
              'Pack weight 4–6 kg in training is plenty',
            ],
          },
          {
            title: 'Moderate / passes',
            icon: 'fa-mountain',
            items: [
              'Full 8 weeks recommended',
              'Include back-to-back weekend efforts',
              'Train with 8–10 kg; poles on descents',
            ],
          },
          {
            title: 'High altitude / long',
            icon: 'fa-arrow-trend-up',
            items: [
              'Start 10–12 weeks out if possible',
              'Build aerobic base before intensity',
              'Medical check + acclimatisation awareness essential',
            ],
          },
        ],
      },
      {
        id: 'recovery',
        title: 'Recovery, food & red flags',
        bullets: [
          'Protein-aware meals after strength days; carbs before long climb sessions',
          'Hydrate across the day — not only during workouts',
          'Foam roll calves, quads, and glutes 2–3× weekly',
          'Stop and get checked for chest pain, dizziness, unusual breathlessness, or swelling',
          'Coming back from illness: restart at 50–60% volume for a week',
        ],
        callout: {
          tone: 'warn',
          title: 'This is coaching guidance, not a medical prescription',
          body: 'If you have cardiovascular disease, asthma, recent surgery, pregnancy, or chronic joint issues, consult a qualified doctor or physiotherapist before following this plan.',
        },
      },
    ],
  },
  {
    id: 'altitude-sickness-guide',
    href: '/altitude-sickness-guide',
    title: 'Altitude Sickness Guide',
    shortTitle: 'Altitude Sickness Guide',
    navLabel: 'Altitude Guide',
    eyebrow: 'High-altitude safety',
    lead:
      'Understand AMS, recognise early signs, prevent problems with smart pacing, and know exactly what to do — because the right response at altitude is simple, decisive, and often just: go down.',
    heroImage: photos.altitudeHero,
    readTime: '11 min read',
    icon: 'fa-mountain',
    metaTitle: 'Altitude Sickness Guide (AMS) | Indian Treks',
    metaDescription:
      'Practical altitude sickness guide for Himalayan treks — AMS symptoms, prevention, Diamox notes, when to descend, and how Indian Treks manages high-altitude safety.',
    premiumHero: {
      variant: 'altitude',
      brandLabel: 'Indian Treks',
      eyebrow: 'High-altitude safety',
      eyebrowIcon: 'mountain',
      titleMain: 'Altitude',
      titleAccent: 'Sickness',
      titleSuffix: 'Guide',
      titleAccentStyle: 'inline',
      guidanceBadge: 'Field-tested guidance',
      earlySigns: {
        title: 'Recognise early signs',
        items: [
          {
            title: 'Headache',
            sub: 'Persistent pain that does not ease with rest',
            targetId: 'symptoms',
          },
          {
            title: 'Nausea',
            sub: 'Loss of appetite or queasy stomach',
            targetId: 'symptoms',
          },
          {
            title: 'Fatigue',
            sub: 'Unusual tiredness beyond normal trek soreness',
            targetId: 'symptoms',
          },
          {
            title: 'Dizziness',
            sub: 'Light-headedness or feeling unsteady',
            targetId: 'symptoms',
          },
        ],
        warning: 'If symptoms worsen, descend immediately and seek help.',
      },
      preventionBar: {
        title: 'Smart Prevention. Safe Journey.',
        items: [
          {
            title: 'Hydrate Well',
            sub: 'Drink regularly even when not thirsty',
            targetId: 'prevent',
          },
          {
            title: 'Ascend Gradually',
            sub: 'Follow acclimatisation days in the itinerary',
            targetId: 'prevent',
          },
          {
            title: 'Pack Smart',
            sub: 'Carry layers, meds & essentials for high altitude',
            targetId: 'prevent',
          },
          {
            title: 'Eat Right',
            sub: 'Keep snacking even if appetite dips',
            targetId: 'prevent',
          },
          {
            title: 'Rest & Recover',
            sub: 'Protect sleep and pace like a local',
            targetId: 'prevent',
          },
        ],
      },
      handwritingNote: 'Stay Aware. Stay Ahead.',
    },
    highlights: [
      { label: 'Risk rises', value: 'Above ~8,000 ft' },
      { label: 'Best fix', value: 'Descend early' },
      { label: 'Mindset', value: 'Tell your leader' },
    ],
    sections: [
      {
        id: 'what-is',
        title: 'What altitude sickness is',
        body: [
          'As you gain elevation, air pressure drops and each breath delivers less oxygen. Your body needs time to adapt. When ascent outpaces adaptation, you can develop Acute Mountain Sickness (AMS) — and in rarer cases, more serious forms that affect the brain or lungs.',
          'Fitness helps you hike, but it does not make you immune. Strong athletes get AMS. Slow, honest pacing and early reporting protect you better than ego.',
        ],
        callout: {
          tone: 'info',
          title: 'How we plan itineraries',
          body: 'Indian Treks builds acclimatisation into high-altitude routes, monitors groups with trained leaders, and carries pulse oximeters and supplemental oxygen where required. Descent remains the primary treatment when symptoms worsen.',
        },
      },
      {
        id: 'symptoms',
        title: 'Know the signs — early vs serious',
        lead: 'Tell your trek leader at the first persistent symptoms. Early honesty prevents emergencies.',
        grid: [
          {
            title: 'Common AMS signs',
            icon: 'fa-notes-medical',
            items: [
              'Headache that does not ease with rest/hydration',
              'Nausea or loss of appetite',
              'Unusual fatigue or weakness',
              'Dizziness or light-headedness',
              'Poor sleep / restless night at new altitude',
            ],
          },
          {
            title: 'Emergency red flags',
            icon: 'fa-triangle-exclamation',
            items: [
              'Severe headache + confusion or clumsiness',
              'Vomiting that prevents hydration',
              'Shortness of breath at rest',
              'Tight chest, persistent cough, frothy sputum',
              'Inability to walk straight (ataxia)',
            ],
          },
        ],
        callout: {
          tone: 'warn',
          title: 'Do not “sleep it off” if red flags appear',
          body: 'Worsening neurological or breathing symptoms are a descend-now situation. Never ascend with progressive AMS. Never leave a symptomatic teammate alone.',
        },
      },
      {
        id: 'prevent',
        title: 'Prevention that works on real treks',
        steps: [
          {
            title: 'Ascend gradually',
            detail:
              'Follow the itinerary’s acclimatisation days. “Climb high, sleep low” when the route allows. Do not skip rest days to “save time.”',
          },
          {
            title: 'Pace like a local',
            detail:
              'Use a slow, sustainable rhythm. If you cannot speak a short sentence, you are going too fast. Poles help regulate effort on climbs.',
          },
          {
            title: 'Hydrate & eat',
            detail:
              'Drink regularly even if you are not thirsty. Keep taking snacks — appetite often dips at altitude, but empty fuel tanks worsen symptoms.',
          },
          {
            title: 'Sleep & substances',
            detail:
              'Protect sleep. Avoid alcohol and sleeping tablets that suppress breathing. Quit smoking before the trip if you can.',
          },
          {
            title: 'Listen & report',
            detail:
              'Share headaches, nausea, or weird fatigue immediately. Leaders would rather adjust pace than evacuate later.',
          },
        ],
      },
      {
        id: 'response',
        title: 'What to do if symptoms start',
        table: {
          headers: ['Situation', 'Action'],
          rows: [
            [
              'Mild headache after a big gain day',
              'Rest, hydrate, light snack, tell the leader; reassess in a few hours',
            ],
            [
              'AMS symptoms that persist or worsen',
              'Do not go higher; rest at current altitude or descend as advised',
            ],
            [
              'Symptoms at night / poor coordination',
              'Wake the leader; prepare to descend — do not wait for morning ego debates',
            ],
            [
              'Breathing trouble at rest or confusion',
              'Emergency descent + oxygen/medical protocol; evacuate as directed',
            ],
          ],
        },
        body: [
          'The single most effective treatment for AMS is descent. Medicines and oxygen can support, but they are not a green light to climb higher while sick.',
        ],
      },
      {
        id: 'diamox',
        title: 'About Diamox (acetazolamide)',
        body: [
          'Some doctors prescribe Diamox to aid acclimatisation for susceptible travellers. It is not a substitute for slow ascent, and it is not harmless for everyone.',
          'Only take it if a qualified doctor recommends it for you. Discuss side effects (tingling, taste changes, increased urination), sulfa allergies, pregnancy, and kidney issues before the trip — not on the trail.',
        ],
        callout: {
          tone: 'warn',
          title: 'Not medical advice',
          body: 'Indian Treks does not prescribe medication. This guide is educational. Personal drug decisions belong with your physician.',
        },
      },
      {
        id: 'who-risk',
        title: 'Who should be extra careful',
        bullets: [
          'Anyone with previous AMS on a similar altitude profile',
          'Travellers flying directly to high cities then trekking immediately',
          'People with heart, lung, or blood-pressure conditions (get clearance)',
          'Those recovering from infection, anaemia, or poor sleep debt',
          'Anyone tempted to hide symptoms to “not delay the group”',
        ],
      },
      {
        id: 'on-trail',
        title: 'How Indian Treks supports you at altitude',
        bullets: [
          'Leaders trained in wilderness first aid and high-altitude awareness',
          'Itineraries with conservative gains and acclimatisation where needed',
          'Pulse oximeter checks and supplemental oxygen on relevant routes',
          'Clear briefings on symptoms, water, and pace from day one',
          'Authority to turn around or descend when safety requires it',
        ],
        callout: {
          tone: 'tip',
          title: 'Your job on the mountain',
          body: 'Be honest, stay hydrated, pace kindly, and respect the leader’s call. The summit is optional. Coming home well is not.',
        },
      },
    ],
  },
];

export function getPrepGuide(id: PrepGuideId) {
  return PREP_GUIDES.find((g) => g.id === id)!;
}

export const PREP_GUIDE_NAV = PREP_GUIDES.map((g) => ({
  l: g.navLabel,
  h: g.href,
  id: g.id,
  icon: g.icon,
  shortTitle: g.shortTitle,
}));
