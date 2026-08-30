import { CONTACT } from '@/lib/contact';

export type TermsSection = {
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

export const TERMS_META = {
  eyebrow: 'Policies',
  title: 'Terms & Conditions – IndianTreks',
  lead: 'Please read these terms carefully before booking. Electronic acceptance constitutes a legally binding agreement between you and IndianTreks.',
  lastUpdated: 'August 2026',
  footerTagline: 'Trusted Himalayan Trekking & Travel Experiences',
  address: 'Kargi Chowk, Narayan Vihar Road, Dehradun – 248001, Uttarakhand, India',
  email: CONTACT.email,
  phones: '+91 73009 00108 / 7310954451 / 7668578221',
};

export const TERMS_SECTIONS: TermsSection[] = [
  {
    number: 1,
    title: 'COMPANY DETAILS',
    bullets: [
      'IndianTreks',
      'Registered Office: Kargi Chowk, Narayan Vihar Road, Dehradun – 248001, Uttarakhand, India',
      'Uttarakhand Tourism Development Board Registration Certificate No.: UTTR/DEHRADUN/13-2021/004674',
      'Directorate General of Foreign Trade (DGFT), Ministry of Commerce & Industry, Government of India Registration Certificate No.: Y00068508AM25',
      'Udyam Registration No.: UDYAM-UK-05-0029681, Ministry of Micro, Small & Medium Enterprises, Government of India',
      'ISO Certification: ISO 9001:2015',
      `Email: ${CONTACT.email}`,
      `Contact: ${CONTACT.phoneDisplay}`,
    ],
  },
  {
    number: 2,
    title: 'LEGAL FRAMEWORK',
    paragraphs: [
      'These Terms & Conditions shall be governed and interpreted in accordance with the applicable laws of India, including:',
    ],
    bullets: [
      'Indian Contract Act, 1872',
      'Information Technology Act, 2000',
      'Consumer Protection Act, 2019',
      'Other applicable rules, regulations and statutory provisions in force in India',
    ],
    paragraphsAfter: [
      'Electronic acceptance of these Terms & Conditions constitutes a legally binding agreement between IndianTreks and the participant.',
    ],
  },
  {
    number: 3,
    title: 'ACCEPTANCE OF TERMS',
    paragraphs: ['By making a booking with IndianTreks, the participant:'],
    bullets: [
      'Confirms that they are 18 years of age or above, or that the booking is being made with the required consent of a parent/guardian where applicable.',
      'Accepts these Terms & Conditions on behalf of themselves and all participants included in the booking.',
      'Confirms that they have read, understood and agreed to the applicable booking, cancellation, safety and operational policies.',
      'Acknowledges that these Terms & Conditions form a binding agreement upon confirmation of the booking.',
    ],
  },
  {
    number: 4,
    title: 'CONTRACT FORMATION',
    paragraphs: ['A booking contract shall be considered confirmed only when:'],
    bullets: [
      'The required partial or full payment has been received by IndianTreks; and',
      'A booking confirmation or confirmation invoice has been issued by IndianTreks.',
    ],
    paragraphsAfter: [
      'Payment alone does not constitute final confirmation until the booking is acknowledged by IndianTreks.',
    ],
  },
  {
    number: 5,
    title: 'BOOKING & PAYMENT POLICY',
    bullets: [
      'A 30% advance payment is required at the time of booking unless otherwise specified for a particular package.',
      'The remaining 70% balance must be paid at least 7 days before the scheduled trek/departure date.',
      'Failure to clear the outstanding balance within the specified period may result in cancellation of the booking without refund, subject to the applicable cancellation policy.',
      'All payments should be made through the payment methods officially provided or authorized by IndianTreks.',
      'Payment processing may be subject to the terms and conditions of the respective payment gateway or financial institution.',
    ],
  },
  {
    number: 6,
    title: 'PRICING & TAXATION',
    bullets: [
      'Package prices are subject to change until the booking is officially confirmed.',
      'Applicable GST and other statutory taxes shall be charged as per prevailing Indian laws.',
      'Any additional charges arising due to changes in government regulations, permits, taxes, transportation costs, entry fees or other statutory requirements may be payable by the participant.',
      'Any optional services or personal expenses not specifically included in the package shall be charged separately.',
    ],
  },
  {
    number: 7,
    title: 'CANCELLATION & REFUND POLICY',
    paragraphs: [
      'All cancellation requests must be submitted to IndianTreks in writing through the registered contact details.',
    ],
    table: {
      title: 'Cancellation Before Departure',
      headers: ['Cancellation Before Departure', 'Refund/Credit'],
      rows: [
        ['21 days or more', '90% voucher'],
        ['15–20 days', '70% voucher'],
        ['7–14 days', '50% voucher'],
        ['0–6 days', 'No refund'],
      ],
    },
    paragraphsAfter: [
      'Vouchers issued under this policy shall be valid for 12 months from the date of issue.',
      'Unless otherwise required by applicable law, refunds under this policy shall generally be provided in the form of a travel voucher/credit rather than cash.',
      'Any applicable payment gateway, transaction, permit, or non-refundable third-party charges may be deducted where applicable.',
      'Once the departure has commenced, no refund shall be applicable for voluntarily leaving the trip or for unused services.',
    ],
  },
  {
    number: 8,
    title: 'RESCHEDULING POLICY',
    bullets: [
      'One date change may be permitted without an additional rescheduling fee if requested at least 7 days before departure, subject to availability.',
      'Additional date changes may attract a 10% rescheduling fee.',
      'Once a booking has been rescheduled, it shall become non-refundable, except where otherwise required by applicable law or expressly approved by IndianTreks.',
      'Rescheduling is subject to availability and operational feasibility.',
    ],
  },
  {
    number: 9,
    title: 'ITINERARY & OPERATIONAL CHANGES',
    paragraphs: [
      'IndianTreks reserves the right to modify, postpone, alter, or cancel any part of an itinerary where reasonably necessary due to circumstances including, but not limited to:',
    ],
    bullets: [
      'Adverse weather conditions',
      'Heavy rainfall, snowfall or landslides',
      'Natural disasters',
      'Government restrictions or instructions',
      'Road closures',
      'Safety concerns',
      'Local conditions',
      'Other circumstances beyond the reasonable control of IndianTreks',
    ],
    paragraphsAfter: [
      'Any additional cost arising from such changes, where applicable, may be borne by the participant.',
    ],
  },
  {
    number: 10,
    title: 'MINIMUM GROUP SIZE',
    bullets: [
      'Certain departures may require a minimum number of participants to operate.',
      'Where a minimum group size is not achieved, IndianTreks may merge the departure with another group, reschedule the departure, or cancel the departure.',
      'In such circumstances, IndianTreks may provide an alternative date, alternative arrangement, or applicable travel credit, subject to the circumstances and applicable policy.',
    ],
  },
  {
    number: 11,
    title: 'FITNESS & MEDICAL DISCLOSURE',
    paragraphs: ['Participants are required to:'],
    bullets: [
      'Be physically and mentally fit for the selected trek or activity.',
      'Disclose relevant medical conditions, allergies, medications, previous injuries, or other conditions that may affect their participation.',
      'Follow the instructions provided by trek leaders, guides and operational staff.',
    ],
    paragraphsAfter: [
      'Failure to disclose relevant medical information or failure to follow safety instructions may result in the participant being restricted from continuing the trek/activity, without refund, where reasonably necessary for safety.',
    ],
  },
  {
    number: 12,
    title: 'ASSUMPTION OF RISK',
    paragraphs: [
      'Trekking, hiking, mountaineering, camping and other outdoor adventure activities involve inherent risks.',
      'These may include, but are not limited to:',
    ],
    bullets: [
      'Injury, illness or death',
      'Altitude sickness and altitude-related conditions',
      'Falls and physical injuries',
      'Extreme weather conditions',
      'Snow, rain, cold and other environmental hazards',
      'Landslides, rockfall and natural hazards',
      'Remote terrain and limited access to medical facilities',
      'Delays, route changes and unforeseen circumstances',
    ],
    paragraphsAfter: [
      'By participating in the activity, the participant acknowledges these inherent risks and voluntarily agrees to undertake the activity with reasonable care and responsibility.',
    ],
  },
  {
    number: 13,
    title: 'LIMITATION OF LIABILITY',
    paragraphs: ['To the maximum extent permitted by applicable law:'],
    bullets: [
      "IndianTreks' liability, where legally applicable, shall be limited to the amount paid by the participant for the relevant service.",
      'IndianTreks shall not be liable for indirect, incidental, special or consequential losses, except where such limitation is prohibited by law.',
      'Nothing in these Terms & Conditions shall exclude or limit any liability that cannot legally be excluded or limited under applicable law.',
    ],
  },
  {
    number: 14,
    title: 'INDEMNITY',
    paragraphs: [
      'To the extent permitted by applicable law, the participant agrees to indemnify and hold harmless IndianTreks, its employees, representatives, guides and authorized personnel from claims, damages, losses, liabilities or reasonable legal costs arising from:',
    ],
    bullets: [
      "The participant's intentional or negligent actions;",
      'Violation of these Terms & Conditions;',
      'Violation of safety instructions;',
      'Misconduct or unlawful activity;',
      'Damage caused by the participant to property or equipment.',
    ],
  },
  {
    number: 15,
    title: 'INSURANCE',
    bullets: [
      'Travel, trekking and adventure insurance is not included unless specifically mentioned in the package.',
      'Participants are strongly advised to obtain appropriate travel and adventure insurance covering trekking, medical emergencies, evacuation and other relevant risks.',
      "IndianTreks shall not be responsible for insurance claims, exclusions, rejected claims, or coverage limitations imposed by the participant's insurance provider.",
    ],
  },
  {
    number: 16,
    title: 'CODE OF CONDUCT',
    paragraphs: ['The following activities are strictly prohibited during the trip:'],
    bullets: [
      'Consumption or possession of illegal drugs or prohibited substances',
      'Excessive alcohol consumption or behavior affecting safety',
      'Misconduct, harassment, violence or abusive behavior',
      'Unsafe behavior or deliberate violation of safety instructions',
      'Any unlawful activity',
      'Behavior that creates risk or inconvenience for other participants or staff',
    ],
    paragraphsAfter: [
      'Violation of the Code of Conduct may result in removal from the trip without refund, subject to applicable law.',
    ],
  },
  {
    number: 17,
    title: 'ACCOMMODATION & EQUIPMENT',
    bullets: [
      'Accommodation shall be provided as specified in the selected package.',
      'Accommodation in remote mountain areas may be basic and may differ from standard urban accommodation.',
      'Equipment provided by IndianTreks is maintained and checked to the extent reasonably practicable.',
      'Participants are responsible for the proper use and care of equipment provided to them.',
      'Any loss or damage caused by the participant may be chargeable.',
    ],
  },
  {
    number: 18,
    title: 'TRANSPORTATION',
    bullets: [
      'Transportation shall be arranged according to the group size, itinerary and operational requirements.',
      'Vehicle type may vary depending on road conditions, group size and availability.',
      'IndianTreks shall make reasonable efforts to provide the scheduled transportation.',
      'Delays caused by traffic, road conditions, weather, vehicle breakdowns, government restrictions or third-party service providers may occur and shall not automatically constitute grounds for a refund.',
    ],
  },
  {
    number: 19,
    title: 'LUGGAGE & OFFLOADING',
    bullets: [
      'Participants are responsible for the safety and security of their personal belongings.',
      'IndianTreks shall not be responsible for loss or damage to personal luggage or valuables, except where liability is imposed by applicable law.',
      'Offloading/mule/porter services, where available, shall be subject to the applicable weight limits, route conditions and operational policies.',
      'Participants are responsible for valuables, documents, electronics, cash and other personal items.',
    ],
  },
  {
    number: 20,
    title: 'RENTAL GEAR POLICY',
    bullets: [
      'Trekking equipment provided on a rental basis shall be subject to the applicable rental terms.',
      'Rental charges are generally non-refundable once the equipment has been booked or allocated.',
      'Any loss, misuse or damage beyond normal wear and tear may be chargeable to the participant.',
      'Equipment must be returned in the condition in which it was provided, subject to normal wear and tear.',
    ],
  },
  {
    number: 21,
    title: 'FORCE MAJEURE',
    paragraphs: [
      'IndianTreks shall not be liable for failure, delay or modification of services caused by circumstances beyond its reasonable control, including:',
    ],
    bullets: [
      'Natural disasters',
      'Severe weather conditions',
      'Landslides, floods or heavy snowfall',
      'Government restrictions or orders',
      'Road closures',
      'Strikes or civil disturbances',
      'Other unforeseen circumstances beyond reasonable control',
    ],
    paragraphsAfter: [
      'Depending on the circumstances, IndianTreks may offer an alternative arrangement, rescheduled departure, travel credit or other reasonable solution.',
    ],
  },
  {
    number: 22,
    title: 'UNUSED SERVICES',
    paragraphs: [
      'No refund shall generally be provided for services that are included in the package but voluntarily unused by the participant, including:',
    ],
    bullets: [
      'Accommodation',
      'Meals',
      'Transportation',
      'Trek services',
      'Permits or other included services',
    ],
    paragraphsAfter: [
      'This includes situations where a participant voluntarily leaves the trip, arrives late, misses a scheduled service, or chooses not to use an included service.',
    ],
  },
  {
    number: 23,
    title: 'MEDICAL EMERGENCIES',
    bullets: [
      'In case of a medical emergency, IndianTreks and its ground team may provide reasonable assistance and coordination.',
      'All medical treatment, hospitalization, evacuation, transportation, rescue and related expenses shall be borne by the participant unless otherwise covered by applicable insurance or law.',
      'Decisions regarding evacuation or medical assistance may be taken based on safety considerations and the advice of qualified medical or local authorities.',
      'IndianTreks shall not be financially responsible for medical or evacuation expenses except where liability is imposed by applicable law.',
    ],
  },
  {
    number: 24,
    title: 'THIRD-PARTY SERVICES',
    paragraphs: [
      'Certain services may involve independent or third-party service providers, including:',
    ],
    bullets: [
      'Guides',
      'Porters',
      'Local transport operators',
      'Accommodation providers',
      'Equipment providers',
      'Other local service providers',
    ],
    paragraphsAfter: [
      'IndianTreks will make reasonable efforts to engage reliable service providers but shall not be responsible for independent acts or omissions of third parties beyond the extent of its legal responsibility.',
    ],
  },
  {
    number: 25,
    title: 'MEDIA CONSENT',
    bullets: [
      'By participating in an IndianTreks trip, participants may be photographed or recorded during the activity.',
      'Where permitted by applicable law, participants provide consent for IndianTreks to use such photographs or videos for legitimate promotional, marketing, social media, website and communication purposes.',
      'Participants may contact IndianTreks regarding specific concerns about the use of their identifiable media.',
    ],
  },
  {
    number: 26,
    title: 'DATA PROTECTION',
    bullets: [
      'Personal information collected during booking may be used for booking, operational, communication, safety, payment, documentation and legal purposes.',
      'Personal information may be shared with relevant service providers or authorities where reasonably required to provide the services or comply with applicable law.',
      'IndianTreks will take reasonable measures to protect participant information against unauthorized access or misuse.',
    ],
  },
  {
    number: 27,
    title: 'BLACKLISTING POLICY',
    paragraphs: ['IndianTreks reserves the right, subject to applicable law, to:'],
    bullets: [
      'Cancel or refuse a booking;',
      'Restrict participation;',
      'Suspend or ban future bookings;',
    ],
    paragraphsAfter: [
      'where a participant is involved in serious misconduct, fraud, harassment, unsafe behavior, repeated violation of company policies, or any activity that may endanger staff, participants, local communities or property.',
    ],
  },
  {
    number: 28,
    title: 'COMPLAINTS & DISPUTES',
    bullets: [
      'Any operational issue or complaint should be reported to the IndianTreks team as soon as reasonably possible during the trip so that an opportunity is available to address the matter.',
      'Formal written complaints should preferably be submitted within 7 days of completion of the trip.',
      'Complaints should include relevant booking details and supporting information where applicable.',
      'IndianTreks will make reasonable efforts to review and resolve genuine complaints in a fair and timely manner.',
    ],
  },
  {
    number: 29,
    title: 'ELECTRONIC CONSENT',
    paragraphs: [
      'By completing an online booking, making payment, submitting a booking form, or otherwise electronically accepting these Terms & Conditions, the participant acknowledges that such electronic acceptance constitutes valid consent and acceptance under applicable Indian law.',
    ],
  },
  {
    number: 30,
    title: 'SEVERABILITY',
    paragraphs: [
      'If any provision of these Terms & Conditions is found to be invalid, unlawful or unenforceable by a competent authority, such provision shall be modified or severed to the extent necessary, and the remaining provisions shall continue to remain valid and enforceable.',
    ],
  },
  {
    number: 31,
    title: 'ENTIRE AGREEMENT',
    paragraphs: [
      'These Terms & Conditions, together with the applicable booking confirmation, invoice and package-specific policies, constitute the entire agreement between the participant and IndianTreks concerning the relevant services.',
      'They supersede prior verbal or written communications relating to the same subject matter, except where specifically agreed in writing by IndianTreks.',
    ],
  },
  {
    number: 32,
    title: 'GOVERNING LAW & JURISDICTION',
    paragraphs: [
      'These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India.',
      'Subject to applicable law, any dispute arising in connection with these Terms & Conditions or the services provided by IndianTreks shall be subject to the jurisdiction of the competent courts in Dehradun, Uttarakhand, India.',
    ],
  },
];
