import { CONTACT } from '@/lib/contact';
import type { PolicyDocMeta, PolicyDocSection } from '@/lib/content/cancellation-content';

export const PAYMENT_POLICY_META: PolicyDocMeta = {
  eyebrow: 'Policies',
  title: 'Payment Policy – IndianTreks',
  lead: 'Simple, secure and transparent booking payments — deposits, balances, bank/UPI details, cancellation charges, and what happens when mountain conditions change.',
  lastUpdated: 'September 2026',
  footerTagline: 'Trusted Himalayan Trekking & Travel Experiences',
  address: 'Kargi Chowk, Narayan Vihar Road, Dehradun – 248001, Uttarakhand, India',
  email: CONTACT.email,
  phones: '+91 73009 00108 / 7310954451 / 7668578221',
};

export const PAYMENT_POLICY_SECTIONS: PolicyDocSection[] = [
  {
    number: 1,
    title: 'PAY SAFELY WITH US',
    paragraphs: [
      'At IndianTreks, we aim to keep the booking and payment process simple, secure and transparent. Payments made through our online payment gateway are processed through secure technology, with payment information encrypted and transmitted using an SSL (Secure Sockets Layer) protocol.',
      'To book a trek or trip, customers are required to complete their registration directly through the IndianTreks website. Once the booking payment has been successfully received and the registration is confirmed, an invoice/payment receipt will be automatically sent to the email address provided during registration. IndianTreks will also receive confirmation of the successful payment.',
      'Customers are advised to keep the payment receipt and invoice safely for future reference.',
    ],
  },
  {
    number: 2,
    title: 'ONLINE PAYMENT METHODS',
    paragraphs: [
      'IndianTreks accepts the following online payment methods:',
    ],
    bullets: ['Debit Card', 'Credit Card', 'Net Banking', 'UPI'],
    paragraphsAfter: [
      'Payments can also be made directly to the company’s designated bank account or through the available UPI/payment options mentioned below.',
    ],
  },
  {
    number: 3,
    title: 'INITIAL BOOKING AMOUNT',
    paragraphs: [
      'A booking amount is required in advance to confirm your participation in a trip or trek.',
      'The applicable booking amount depends on the type and duration of the trip.',
    ],
  },
  {
    number: 4,
    title: 'WEEKEND GETAWAYS — 1N/2D & 2N/3D',
    paragraphs: ['For weekend getaways:'],
    table: {
      title: 'Weekend booking amounts',
      headers: ['Trip duration', 'Booking amount'],
      rows: [
        ['1 Night / 2 Days', '₹2,000 per person'],
        ['2 Nights / 3 Days', '₹3,000 per person'],
      ],
    },
    paragraphsAfter: [
      'The remaining balance must be paid by Wednesday evening.',
      'The booking is considered confirmed once the applicable booking amount has been received and payment confirmation has been completed.',
    ],
  },
  {
    number: 5,
    title: 'LONG TRIPS AND TREKS',
    paragraphs: ['For long trips and treks:'],
    table: {
      title: 'Payment timeline',
      headers: ['Stage', 'Amount due'],
      rows: [
        [
          'Initial booking amount',
          '₹4,000 / ₹5,000 per person, depending on the trip or trek',
        ],
        [
          '20 days before departure',
          '75% of the total trip/trek cost must be paid',
        ],
        [
          '10 days before departure',
          'Remaining balance — completing 100% of the total trip/trek cost',
        ],
      ],
    },
    paragraphsAfter: [
      'Customers are responsible for ensuring that the required payment is completed within the specified timeline.',
    ],
  },
  {
    number: 6,
    title: 'INDEPENDENT TREKS',
    paragraphs: ['For independent treks:'],
    table: {
      title: 'Payment timeline',
      headers: ['Stage', 'Amount due'],
      rows: [
        ['Booking amount', '50% of the total trip amount'],
        ['30 days before departure', 'A further 25% must be paid'],
        ['25 days before departure', 'Full amount must be paid'],
      ],
    },
    paragraphsAfter: [
      'This payment structure allows the booking and arrangements for the independent trek to be completed in advance.',
    ],
  },
  {
    number: 7,
    title: 'BANK ACCOUNT, PAYMENT GATEWAY OR UPI',
    paragraphs: [
      'Payment can be made through the IndianTreks payment gateway, directly to the company’s bank account, or through the available UPI payment options.',
    ],
    bullets: [
      'Name: INDIANTREKS',
      'Bank: STATE BANK OF INDIA',
      'Account Type: CURRENT',
      'Account Number: 40554281367',
      'IFSC Code: SBIN0018979',
      'BHIM SBI PAY: INDIANTREKS@SBI',
      'Paytm: 7310954451',
      'PhonePe: 7310954451',
    ],
    paragraphsAfter: [
      'Customers may also use the QR codes provided by IndianTreks on the website to complete their payment.',
      'After making a direct bank or UPI payment, retain the transaction confirmation for your records.',
    ],
  },
  {
    number: 8,
    title: 'CANCELLATION POLICY — HOW TO CANCEL',
    paragraphs: [
      'Cancellation requests must be made through the prescribed email communication process.',
      'Cancellation requests will not be accepted over telephone calls or WhatsApp messages.',
      'To request a cancellation, reply to the payment receipt/booking email received at the time of booking or send the cancellation request to exploreindiantreks@gmail.com.',
      'The cancellation request should be made from the appropriate email account so that the booking and payment details can be identified and processed correctly.',
      'The applicable cancellation amount depends on the number of days remaining before the scheduled departure date.',
    ],
  },
  {
    number: 9,
    title: 'CANCELLATION — 4 NIGHTS / 5 DAYS AND ABOVE',
    paragraphs: [
      'For trips and treks of 4 Nights / 5 Days and above, the following cancellation schedule applies:',
    ],
    table: {
      title: 'Cancellation schedule',
      headers: ['Window before departure', 'Charge'],
      rows: [
        [
          'More than 60 days',
          'Free cancellation is available up to 60 days before the departure date.',
        ],
        [
          '59 to 45 days',
          '10% of the total trip cost. The booking amount is non-refundable.',
        ],
        [
          '44 to 30 days',
          '25% of the total trip cost as the cancellation charge.',
        ],
        [
          '29 to 15 days',
          '50% of the total trip cost as the cancellation charge.',
        ],
        [
          '15 to 8 days',
          '75% of the total trip cost as the cancellation charge.',
        ],
        [
          '7 days before departure',
          '100% of the total trip cost will be applicable.',
        ],
        [
          'No Show',
          'If a customer does not arrive for the scheduled trip or trek, it is treated as a No Show. No refund will be provided.',
        ],
      ],
    },
  },
  {
    number: 10,
    title: 'TRANSPORTATION',
    paragraphs: [
      'Along with trek services, IndianTreks also provides transportation services between the nearest city with a railway station or airport and the trek basecamp, where applicable.',
      'Transportation services are intended to make the journey to and from the trekking basecamp more convenient for customers.',
      'IndianTreks also provides selected trekking gear on rent, subject to availability.',
    ],
  },
  {
    number: 11,
    title: 'BOOKING TRANSPORTATION AND RENTAL GEAR',
    paragraphs: [
      'When registering for a trek, customers are required to make the booking with the trek fee only.',
      'Once the registration and required trek payment have been completed, the trek booking is confirmed.',
      'Transportation and rental gear are treated separately from the trek registration.',
      'Approximately 15 days before the scheduled trek date, IndianTreks will contact the customer regarding available transportation and rental gear requirements.',
      'These services are optional.',
    ],
    bullets: [
      'Confirm the transportation and/or rental gear requirements with IndianTreks, or',
      'Make your own transportation and equipment arrangements.',
    ],
    paragraphsAfter: [
      'Customers choosing to use IndianTreks transportation or rental gear should confirm their requirements within the requested timeframe.',
    ],
  },
  {
    number: 12,
    title: 'AVAILABILITY AND PAYMENT CONFIRMATION',
    paragraphs: [
      'Transportation and rental equipment are subject to availability and payment confirmation.',
      'Submitting a request does not by itself guarantee availability.',
      'Customers are therefore expected to respond to the transportation and rental gear communication in a timely manner and complete the applicable payment and confirmation process.',
    ],
  },
  {
    number: 13,
    title: 'GOVERNMENT ORDERS, WEATHER OR UNFORESEEN CIRCUMSTANCES',
    paragraphs: [
      'Mountain travel is dependent on weather, road conditions, government regulations and other factors that may be outside the control of IndianTreks.',
      'In circumstances such as government orders, severe or harsh weather conditions, protests, landslides, road blockages, natural events, or other unforeseen circumstances, IndianTreks will work towards finding the best possible alternative plan, route, activity or trip/trek arrangement based on the circumstances.',
      'The safety and feasibility of the trip will determine the alternative arrangements available at that time.',
      'In certain circumstances, particular activities may have to be cancelled or modified. Where possible, IndianTreks will provide the best available alternative.',
      'No refund will be provided solely because an individual activity is cancelled or modified due to such circumstances when an alternative arrangement is provided.',
    ],
  },
  {
    number: 14,
    title: 'TREK CALLED OFF BEFORE DEPARTURE',
    paragraphs: [
      'If a trek is called off at the last moment because of a natural calamity or unforeseen circumstance — such as heavy rain, snowfall, earthquake, landslide, strike, bandh, or other circumstances beyond the reasonable control of IndianTreks — IndianTreks will issue a trek voucher for the full amount paid.',
      'Where possible, IndianTreks may also offer an alternate trek based on the circumstances and availability.',
    ],
  },
  {
    number: 15,
    title: 'TREK VOUCHER VALIDITY',
    paragraphs: [
      'The voucher can be redeemed for the same amount towards the same trek or another trek offered by IndianTreks.',
      'The voucher will remain valid for 365 days from the original trek departure date.',
      'The voucher is intended to allow the customer to reschedule their trekking experience rather than lose the amount paid when a departure has to be called off because of circumstances beyond the company’s control.',
    ],
  },
  {
    number: 16,
    title: 'TREK OR TRIP INTERRUPTED OR NOT COMPLETED',
    paragraphs: [
      'If a trek or trip cannot be completed because of a natural calamity or unforeseen circumstance, including rain, snowfall, earthquake, landslide, strike, bandh or similar circumstances beyond the control of IndianTreks, no refund will be provided.',
      'Mountain conditions can change unexpectedly, and completing the original itinerary may sometimes become impossible or unsafe.',
      'In such situations, the trekking team will work towards the safest and most practical arrangement possible based on the circumstances.',
    ],
  },
  {
    number: 17,
    title: 'ADDITIONAL EXPENSES DUE TO UNFORESEEN CIRCUMSTANCES',
    paragraphs: [
      'Unforeseen events can sometimes result in additional expenses during a mountain trip.',
      'For example, changes in transportation, route, accommodation, evacuation, additional travel or other arrangements may become necessary because of circumstances beyond the control of IndianTreks.',
      'Any additional expenses arising directly from such natural calamities or unforeseen circumstances will be borne by the customer.',
    ],
    bullets: [
      'Heavy rain',
      'Snowfall',
      'Earthquakes',
      'Landslides',
      'Strikes',
      'Bandhs',
      'Road closures',
      'Government restrictions',
      'Other unforeseen events',
    ],
    paragraphsAfter: [
      'IndianTreks will make reasonable efforts to identify the most practical alternative arrangement available under the circumstances; however, the company will not be liable for additional costs arising from events beyond its control.',
    ],
  },
  {
    number: 18,
    title: 'PEAK SEASON AND POPULAR DESTINATIONS',
    paragraphs: [
      'The cancellation policy may differ during peak seasons and for highly popular destinations.',
      'Certain treks and travel destinations experience significantly higher demand during particular periods of the year. During these periods, operational arrangements, accommodation, transportation and other services may need to be secured considerably in advance.',
      'Therefore, the applicable cancellation terms for a particular booking may vary during peak season or for specific popular destinations.',
      'Customers should carefully review the cancellation conditions applicable to their particular trip or trek at the time of booking.',
    ],
  },
  {
    number: 19,
    title: 'IMPORTANT PAYMENT & CANCELLATION REMINDER',
    paragraphs: [
      'Before making a booking with IndianTreks, customers are advised to carefully read and understand the applicable payment, cancellation, transportation and unforeseen-circumstances policies.',
      'By completing a booking and making payment, the customer acknowledges that they have read and understood the applicable terms associated with their trip or trek.',
      'For any clarification regarding payment or cancellation, customers should contact IndianTreks through the official communication channels provided on the website.',
    ],
  },
];
