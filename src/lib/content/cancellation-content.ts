import { CONTACT } from '@/lib/contact';

export type PolicyDocSection = {
  number: number;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: {
    title?: string;
    headers: [string, string];
    rows: [string, string][];
  };
  paragraphsAfter?: string[];
};

export type PolicyDocMeta = {
  eyebrow: string;
  title: string;
  lead: string;
  lastUpdated: string;
  footerTagline: string;
  address: string;
  email: string;
  phones: string;
};

export const CANCELLATION_META: PolicyDocMeta = {
  eyebrow: 'Policies',
  title: 'IndianTreks – Trek Cancellation Policy',
  lead: 'A fair, transparent, and practical cancellation policy designed to ensure clarity and convenience for our trekkers.',
  lastUpdated: 'August 2026',
  footerTagline: 'Trusted Himalayan Trekking & Travel Experiences',
  address: 'Kargi Chowk, Narayan Vihar Road, Dehradun – 248001, Uttarakhand, India',
  email: CONTACT.email,
  phones: '+91 73009 00108',
};

export const CANCELLATION_SECTIONS: PolicyDocSection[] = [
  {
    number: 1,
    title: 'INTRODUCTION',
    paragraphs: [
      'Planning a trek brings immense excitement and joy. However, when plans get cancelled, it can be disappointing. At IndianTreks, we manage our trekking operations with dedicated ground teams and operational partners, which means trek cancellations from our end are relatively rare. However, if a trek is cancelled due to personal reasons, weather conditions, government regulations, or any other circumstances beyond our control, our cancellation policy will apply as outlined below.',
      'We have designed a fair, transparent, and practical cancellation policy to ensure clarity and convenience for our trekkers.',
    ],
  },
  {
    number: 2,
    title: 'BOOKING TIP',
    paragraphs: [
      'We recommend making your booking at least two months in advance to secure your preferred trek and departure date and to allow sufficient time for smooth coordination.',
    ],
  },
  {
    number: 3,
    title: 'HOW TO CANCEL',
    paragraphs: [
      'To cancel your trek, you must submit a written cancellation request through the official IndianTreks communication channel.',
      `Email: ${CONTACT.email}`,
      'Cancellation charges will be effective from the date IndianTreks receives your written cancellation request.',
    ],
  },
  {
    number: 4,
    title: 'CANCELLATION & REFUND POLICY',
    table: {
      title: 'Cancellation Before Departure',
      headers: ['Cancellation Window', 'Refund / Voucher'],
      rows: [
        [
          'Cancellation 21 Days or More Before Trek Start Date',
          '10% deduction of the invoice amount towards applicable GST, transaction, and administrative charges. 90% of the eligible amount will be refunded in the form of a Trek Voucher valid for 1 year.',
        ],
        [
          'Cancellation 15–20 Days Before Trek Start Date',
          '30% deduction of the invoice amount towards applicable GST, transaction fees, base accommodation, ration, and other committed operational costs. 70% of the eligible amount will be refunded in the form of a Trek Voucher valid for 1 year.',
        ],
        [
          'Cancellation 7–14 Days Before Trek Start Date',
          '50% deduction of the invoice amount towards applicable GST, transaction charges, accommodation, trek leaders, permits, equipment, and other committed operational costs. 50% of the eligible amount will be refunded in the form of a Trek Voucher valid for 1 year.',
        ],
        [
          'Cancellation 1–6 Days Before Trek Start Date',
          '100% deduction of the invoice amount. No refund or voucher will be provided as the required arrangements, resources, accommodation, transportation, equipment, food, and operational planning have already been finalized.',
        ],
      ],
    },
  },
  {
    number: 5,
    title: 'CASH REFUNDS',
    bullets: [
      "No cash refund will generally be made if a trek is cancelled or affected due to external factors beyond IndianTreks' reasonable control, including weather conditions, natural disasters, government restrictions, road closures, or other force majeure events.",
      'Cash refunds may be issued where IndianTreks cancels a trek without an operational or safety-related justification, or where the required minimum group size is not achieved, subject to the applicable circumstances and company policy.',
    ],
  },
  {
    number: 6,
    title: 'FORCE MAJEURE / UNFORESEEN CIRCUMSTANCES',
    paragraphs: [
      'In the event of cancellation due to circumstances beyond our control, such as natural disasters, sudden government orders, severe weather conditions, or other unforeseen events, IndianTreks will assess the situation and provide the best possible alternative, which may include a Trek Voucher or rescheduling option, wherever applicable.',
    ],
  },
  {
    number: 7,
    title: 'TREK VOUCHER POLICY',
    paragraphs: [
      'To offer flexibility and ease in case of cancellations, IndianTreks provides a Trek Voucher with a validity of 12 months from the date of issue.',
      'The following terms explain how the Trek Voucher can be used.',
    ],
  },
  {
    number: 8,
    title: 'WHAT IS A TREK VOUCHER?',
    paragraphs: [
      'When a trek is cancelled, the cancellation is processed according to the applicable IndianTreks Cancellation Policy.',
      'As per the applicable cancellation schedule, the relevant cancellation charges are deducted and the remaining eligible balance is issued in the form of a Trek Voucher.',
      'The voucher may be used for eligible treks, tours, or yatras operated by IndianTreks within 12 months from the date of issue.',
    ],
  },
  {
    number: 9,
    title: 'HOW TO RECEIVE A TREK VOUCHER',
    paragraphs: [
      'To cancel a trek, submit a written cancellation request to:',
      `Email: ${CONTACT.email}`,
      'Within the applicable processing period, IndianTreks will send a confirmation of the cancellation and, where applicable, the Trek Voucher.',
      'The voucher communication may contain:',
    ],
    bullets: [
      'Booking ID',
      'Name of the booking person',
      'Number of persons booked',
      'Invoice amount',
      'Amount paid',
      'Applicable cancellation fee',
      'Refunded voucher amount',
      'Trek Voucher number',
      'Voucher amount',
      'Voucher issue date',
      'Voucher expiry date',
    ],
  },
  {
    number: 10,
    title: 'TERMS & CONDITIONS OF TREK VOUCHER',
    bullets: [
      'Once issued, the Trek Voucher cannot ordinarily be reissued, altered, or revalidated.',
      'The voucher is valid for 12 months from the date of issue.',
      'The voucher amount may be used for eligible treks, tours, or yatras operated by IndianTreks.',
      'The voucher may generally be redeemed for the same number of participants for whom it was originally issued.',
      'The voucher may be used to settle the balance amount of a new booking but cannot ordinarily be used to create a new booking without any additional payment or booking requirement.',
      'Where permitted by IndianTreks, the voucher may be gifted to a family member.',
      'The voucher cannot ordinarily be extended beyond its expiry date unless specifically permitted under the IndianTreks Voucher Extension Policy.',
      'Once a voucher has been redeemed, the redeemed amount becomes non-refundable, even if the new trip is subsequently cancelled.',
      'To redeem a Trek Voucher, participants should contact IndianTreks at least 15–20 days before the preferred trek date, subject to seat availability.',
      'Trek Vouchers are applicable to eligible IndianTreks departures and travel products as communicated by the company.',
    ],
  },
  {
    number: 11,
    title: 'TREK VOUCHER EXTENSION POLICY',
    paragraphs: [
      'At IndianTreks, we understand that unforeseen circumstances can sometimes prevent trekkers from utilizing their voucher within the standard validity period.',
      'Where applicable, IndianTreks may provide an option to extend the validity of a Trek Voucher for an additional fee.',
    ],
  },
  {
    number: 12,
    title: 'EXTENSION OPTIONS',
    bullets: [
      '6-Month Extension: The voucher validity may be extended by 6 months for a fee equivalent to 15% of the voucher amount. Example: If the voucher value is ₹10,000, the 6-month extension fee will be ₹1,500.',
      '12-Month Extension: The voucher validity may be extended by 12 months for a fee equivalent to 30% of the voucher amount. Example: If the voucher value is ₹10,000, the 12-month extension fee will be ₹3,000.',
      'In both cases, the extended voucher will retain its original voucher value and may be used within the new validity period.',
    ],
  },
  {
    number: 13,
    title: 'IMPORTANT NOTES — VOUCHER EXTENSION',
    bullets: [
      'Request Deadline: Extension requests must be submitted at least 15 days before the voucher expiry date. Late requests may not be accepted, and the voucher may expire if no extension request is received before the expiry date.',
      `How to Apply: Contact IndianTreks through Email: ${CONTACT.email}. Provide: Voucher number, Original booking ID, Voucher amount, Requested extension period. Specify whether you wish to extend the voucher by 6 or 12 months.`,
      'Payment Process: The applicable extension fee must be paid through the payment method provided by IndianTreks. Once payment is confirmed, the voucher validity will be updated and a confirmation will be provided.',
      'Non-Refundable Fee: The voucher extension fee is non-refundable, even if the extended voucher remains unused.',
      'One-Time Extension: Each voucher may generally be extended only once. No further extension will ordinarily be allowed after the extended validity period.',
    ],
  },
  {
    number: 14,
    title: 'VOUCHER USE TERMS',
    bullets: [
      'The extended voucher may be used for eligible IndianTreks trekking or travel services.',
      'If the selected trek has a higher value than the voucher, the difference must be paid by the participant.',
      'The voucher can be used toward the applicable booking amount.',
      'Voucher redemption remains subject to seat availability and the applicable booking terms.',
    ],
  },
  {
    number: 15,
    title: 'TREK DATE CHANGE POLICY',
    paragraphs: [
      'At IndianTreks, we understand that plans can change. While treks are scheduled with detailed logistics and coordination, we do our best to accommodate genuine date-change requests wherever operationally possible.',
    ],
  },
  {
    number: 16,
    title: 'ELIGIBILITY FOR DATE CHANGE',
    bullets: [
      'Date-change requests must be submitted at least 15 days prior to the original trek start date.',
      'All date changes are subject to availability and written confirmation from IndianTreks.',
      'Date changes are not automatically confirmed until IndianTreks provides written confirmation.',
    ],
  },
  {
    number: 17,
    title: 'HOW TO REQUEST A DATE CHANGE',
    paragraphs: [
      'To request a date change, submit a written request to:',
      `Email: ${CONTACT.email}`,
      'Please include:',
    ],
    bullets: [
      'Booking ID',
      "Booking person's name",
      'Trek name',
      'Existing trek date',
      'Requested new trek date',
    ],
  },
  {
    number: 18,
    title: 'DATE CHANGE FEE',
    paragraphs: [
      'A 10% charge of the total invoice amount will generally be applicable per approved date-change request.',
    ],
  },
  {
    number: 19,
    title: 'CONDITIONS FOR APPROVAL',
    bullets: [
      'The new date should generally fall within the same trekking season as the original booking.',
      'The requested date must have available seats.',
      'The request is subject to operational feasibility.',
      'If the trek price is higher on the new date, the applicable price difference must be paid before the date change is confirmed.',
    ],
  },
  {
    number: 20,
    title: 'NON-ELIGIBILITY FOR DATE CHANGE',
    paragraphs: ['Date-change requests will generally not be accepted:'],
    bullets: [
      'Within 15 days of the original trek start date.',
      'After the trek has already commenced.',
      'In cases where the trek has been cancelled or suspended due to natural disasters, government restrictions, or force majeure circumstances.',
      'In case of no-show or failure to report on the scheduled date without prior written communication.',
    ],
  },
  {
    number: 21,
    title: 'IMPORTANT NOTES — DATE CHANGE',
    bullets: [
      'If the requested date is unavailable, the participant may request a Trek Voucher of equivalent eligible value, subject to the applicable policy.',
      'Once a date change has been processed, the booking will generally no longer be eligible for cancellation or another date change.',
      'Only written requests submitted by the booking person will be considered valid.',
      'Verbal requests or informal communication will not be considered confirmed until acknowledged in writing by IndianTreks.',
    ],
  },
  {
    number: 22,
    title: 'FREE TREK POLICY',
    paragraphs: [
      'At IndianTreks, your journey means more to us than simply reaching a destination. We understand that the mountains are unpredictable, and sometimes circumstances beyond a trekker\'s control can interrupt a journey.',
      'To provide additional flexibility to our trekkers, IndianTreks may offer a Free Trek Policy in eligible situations where a trek cannot be completed due to circumstances covered under this policy.',
    ],
  },
  {
    number: 23,
    title: 'WHEN THE FREE TREK POLICY MAY APPLY',
    paragraphs: [
      'If, during the trek, a participant is unable to complete the journey due to circumstances such as:',
    ],
    bullets: [
      'Route closure or safety concerns',
      'Government or administrative orders',
      'Certain medical conditions',
      'Personal or family emergency',
      "Other unforeseen circumstances beyond the participant's reasonable control",
    ],
    paragraphsAfter: [
      'the participant may be eligible for a Free Trek Voucher for the same trek, subject to the terms below and assessment by IndianTreks.',
    ],
  },
  {
    number: 24,
    title: 'TERMS & CONDITIONS FOR AVAILING FREE TREK',
    bullets: [
      'Avail Free Trek: The participant will need to make a new booking according to the normal booking procedure and pay the applicable trek amount. After successfully completing the eligible trek, the equivalent eligible trek fee may be reimbursed according to the Free Trek Policy.',
      'Applicability: The Free Trek benefit is applicable only to the same trek that was left incomplete.',
      'Non-Transferable: The Free Trek benefit is issued in the name of the original trekker and cannot ordinarily be sold, transferred, or gifted.',
      'Voucher Value: The benefit covers the eligible trek fee only and generally excludes transportation, permits, rental equipment, insurance, personal expenses, and optional services.',
      'Validity: The Free Trek Voucher must generally be utilized within 24 months from the date of issue.',
      'Additional Costs: The trekker shall be responsible for transportation to/from the base camp, applicable trek permits and entry fees, insurance, personal gear or rental equipment, and other excluded expenses.',
      'Trek Cost Difference: If the applicable trek fee increases at the time of re-booking, the participant must pay the difference.',
      'Advance Booking: Free Trek redemption must generally be confirmed at least 30 days before the intended trek departure, subject to availability.',
      'One-Time Use: The Free Trek benefit is valid for one redemption only.',
      'Force Majeure: If the re-booked trek is again affected by natural calamities, government restrictions, political unrest, or other force majeure circumstances, IndianTreks will assess the situation under the applicable policy. A second Free Trek benefit will not automatically be issued.',
      'No Cash Refund: The Free Trek Voucher cannot be encashed, transferred for cash, adjusted against unrelated services, or combined with other discounts unless specifically approved by IndianTreks.',
    ],
  },
  {
    number: 25,
    title: 'CANCELLATION AND REFUND FOR FREE TREK',
    bullets: [
      'If the replacement trek under the Free Trek Policy is cancelled by IndianTreks due to operational reasons, severe weather, natural calamity, or other circumstances covered under the applicable policy, the participant\'s payment will be handled according to the applicable cancellation or force majeure policy.',
      'If the participant cancels the replacement trek due to personal reasons, the standard IndianTreks Cancellation Policy shall apply.',
    ],
  },
  {
    number: 26,
    title: 'UNFORESEEN CIRCUMSTANCES POLICY',
    paragraphs: [
      'At IndianTreks, the safety and well-being of our trekkers remain our highest priorities.',
      'While we make every reasonable effort to operate each trek according to the published schedule, trekking in the Himalayas is inherently subject to unpredictable natural, environmental, administrative, and operational conditions.',
    ],
  },
  {
    number: 27,
    title: 'CIRCUMSTANCE 1: PRE-TREK CANCELLATION BEFORE COMMENCEMENT',
    paragraphs: [
      'A trek may be cancelled before commencement due to circumstances including:',
    ],
    bullets: [
      'Government or local administration orders',
      'Severe weather conditions',
      'Red alerts',
      'Heavy rainfall',
      'Excessive snowfall',
      'Landslides',
      'Road closures',
      'Safety concerns',
      'Other circumstances beyond reasonable control',
    ],
    paragraphsAfter: [
      'In such circumstances, IndianTreks may provide the following options, depending on the situation:',
      'Option 1: A Trek Voucher/Travel Credit for the eligible amount, valid for 12 months from the date of issue.',
      'Option 2: Rescheduling the trek to the next available batch or suitable alternative date, subject to availability.',
      'Where applicable and approved by IndianTreks, another reasonable alternative may also be offered.',
    ],
  },
  {
    number: 28,
    title: 'CIRCUMSTANCE 2: TREK CANCELLATION AFTER REACHING BASE CAMP',
    paragraphs: [
      'If a trek is cancelled after participants have reached the base camp due to sudden weather changes, administrative restrictions, route conditions, safety concerns, or other unforeseen circumstances:',
    ],
    bullets: [
      'Participants may be eligible for the Free Trek Policy, subject to the circumstances and eligibility criteria.',
      'The Free Trek benefit will generally apply to the eligible trek fee and may exclude transportation, permits, insurance, rental equipment, and other additional expenses.',
    ],
  },
  {
    number: 29,
    title: 'CIRCUMSTANCE 3: INCOMPLETE TREK / SUMMIT NOT ACHIEVED',
    paragraphs: [
      'IndianTreks understands that reaching the final destination or summit is sometimes affected by circumstances beyond a trekker\'s control.',
      'Where an eligible trek cannot be completed because of safety concerns, route closure, government restrictions, severe weather, medical emergency, or other qualifying unforeseen circumstances, the participant may be eligible for the Free Trek Policy, subject to assessment and the specific conditions of the trek.',
      'The Free Trek Policy does not guarantee a refund for personal decisions to leave a trek, lack of preparation, voluntary withdrawal, or failure to follow reasonable instructions.',
    ],
  },
  {
    number: 30,
    title: 'CIRCUMSTANCE 4: CANCELLATION AFTER REACHING THE PICKUP POINT',
    paragraphs: [
      'If a trek is cancelled after trekkers have arrived at the designated pickup point, such as Rishikesh, Dehradun, or another notified location, due to sudden natural calamities, government orders, safety concerns, or other circumstances beyond IndianTreks\' reasonable control:',
    ],
    bullets: [
      'Option 1: Eligible amount may be provided as a Trek Voucher, generally valid for 12 months from the date of issue.',
      'Option 2: Participants may be offered an opportunity to reschedule to the next available batch, subject to availability.',
      'The exact resolution may depend on the stage of the trip, services already utilized, third-party commitments, and the circumstances that caused the cancellation.',
    ],
  },
  {
    number: 31,
    title: 'IMPORTANT NOTE ON UNFORESEEN CIRCUMSTANCES',
    paragraphs: [
      'IndianTreks understands the effort, excitement, time, and financial planning involved in preparing for a Himalayan trek.',
      'However, certain situations remain beyond human control. Our policies are designed to provide reasonable flexibility while ensuring that the operational commitments made for each trek are also fairly considered.',
      'We encourage all trekkers to approach Himalayan travel with patience, flexibility, and an understanding that mountain conditions can change quickly.',
      'Participant safety will always remain our primary consideration.',
      'Where reasonably possible, IndianTreks and its ground teams will provide assistance and guidance during unforeseen situations.',
      'However, any additional costs arising from emergency accommodation, transportation, evacuation, medical assistance, route changes, or other unforeseen arrangements shall generally be borne by the participant unless otherwise covered by applicable insurance or law.',
      'We strongly recommend that every participant purchase suitable travel and adventure insurance covering trekking, medical emergencies, evacuation, trip interruption, and other potential unforeseen expenses.',
    ],
  },
];
