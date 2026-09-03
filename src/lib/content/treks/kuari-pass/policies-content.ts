import type { TrekPolicyRows, TrekRichSection } from '@/lib/content/treks/types';

export const KUARI_PASS_BOOKING_POLICY_ROWS: TrekPolicyRows = [
  ['Pickup Time', 'Around 6:30 AM from Rishikesh (Tapovan–Badrinath Road & Railway Station area)'],
  ['Drop Time', 'Evening arrival (~6–7 PM) in Rishikesh / Dehradun'],
  ['Pickup & Drop', 'Dehradun / Rishikesh ↔ Joshimath — Tempo Traveller (Non AC)'],
  ['Food', 'All vegetarian meals during the trek provided by Indian Treks'],
  ['Booking Confirmation', 'Seat confirmed after advance payment is received'],
  ['Balance Payment', 'Remaining amount before departure as instructed by the team'],
  ['ID Requirement', 'Valid government photo ID mandatory for forest permits'],
  ['Operational Changes', 'Itinerary may adjust for weather, road, or safety reasons'],
];

/** Full cancellation & refund policy — shown in the Policy section with Read More. */
export const KUARI_PASS_CANCELLATION_POLICY_SECTION: TrekRichSection = {
  id: 'policy-cancellation',
  kicker: 'Terms & Rules',
  title: 'Cancellation & Refund Policy — Indiantreks',
  blocks: [
    {
      type: 'h3',
      text: 'Cancellation by Participant',
    },
    {
      type: 'h3',
      text: 'Cancellation 30 Days or More Before the Start of the Trip',
    },
    {
      type: 'p',
      text: 'Refund options (voucher / refund):',
    },
    {
      type: 'ul',
      items: [
        '5% deduction of the trek fee.',
        '100% cash voucher for any trek, valid for one year.',
        'Option to transfer the trek (any trek, any date) to a friend.',
      ],
    },
    {
      type: 'h3',
      text: 'Cancellation Between 20 Days and 10 Days Before the Start of the Trip',
    },
    {
      type: 'p',
      text: 'Participants can choose from the following options:',
    },
    {
      type: 'ul',
      items: [
        '30% deduction of the trek fee.',
        '100% cash voucher for the same trek, valid for one year.',
        '100% cash voucher for any trek, valid for one year.',
        'Transfer the trek (same trek, any date) to a friend.',
      ],
    },
    {
      type: 'h3',
      text: 'Cancellation Between 10 Days and 01 Day Before the Start of the Trip',
    },
    {
      type: 'p',
      text: 'Refund options include:',
    },
    {
      type: 'ul',
      items: [
        '50% deduction of the trek fee.',
        '100% cash voucher for the same trek, valid for one year.',
        '50% cash voucher for any trek, valid for one year.',
        'Transfer the trek (same trek, any date) to a friend.',
      ],
    },
    {
      type: 'h3',
      text: 'Cancellation Less Than 5 Days Before the Start of the Trip',
    },
    {
      type: 'p',
      text: 'Refund options are limited to:',
    },
    {
      type: 'ul',
      items: [
        'Full trek cost will not be refundable.',
        '20% cash voucher for the same trek, valid for one year.',
      ],
    },
    {
      type: 'p',
      text: 'Note: If a booking is made using a voucher or discount code, the same voucher/discount policies will apply and cannot be altered.',
    },
    {
      type: 'h3',
      text: 'Cancellation by Indiantreks',
    },
    {
      type: 'p',
      text: 'While cancellations are rare, unforeseen circumstances may require us to cancel a trek before its departure. These situations may include:',
    },
    {
      type: 'ul',
      items: [
        'Continuous rain or snow, thunderstorms, snowstorms, landslides, floods, earthquakes, or other natural calamities that pose safety risks.',
        'Local unrest, curfews, pandemics, lockdowns, government orders, or similar unavoidable events.',
      ],
    },
    {
      type: 'p',
      text: 'In such cases, Indiantreks will issue a voucher equal to the full trek fee, valid for one year for any trek.',
    },
    {
      type: 'p',
      text: 'Important: A voucher will not be issued if you are required to descend due to reasons such as insufficient fitness, AMS symptoms, high blood pressure, health issues, exceeding turnaround time, or violation of trek rules (e.g., smoking or drinking).',
    },
    {
      type: 'h3',
      text: 'Trek Shifting Policy',
    },
    {
      type: 'p',
      text: 'At Indiantreks, we recognize that high-altitude weather is unpredictable and may change suddenly. Other external factors such as natural disasters, political unrest, pandemics, or government restrictions may also affect trek operations.',
    },
    {
      type: 'p',
      text: 'In such cases, we will make every effort to provide an alternative trek that is safer and suitable.',
    },
    {
      type: 'ul',
      items: [
        'If there is a cost difference between the original trek and the alternative trek, a voucher for the difference will be issued, valid for one year.',
        'Cash refunds or reimbursement of the difference will not be provided.',
      ],
    },
    {
      type: 'h3',
      text: 'Important Notes',
    },
    {
      type: 'ul',
      items: [
        'Trek batch changes are subject to availability in the desired batch.',
        'If transferring a trek to a friend, the transferee must meet all mandatory trek requirements set by Indiantreks.',
        'Indiantreks reserves the right to amend or update policies without prior notice.',
        'Cash refunds are applicable only for bookings made without vouchers or promotional offers.',
      ],
    },
    {
      type: 'h3',
      text: 'Cash Voucher — Terms & Conditions',
    },
    {
      type: 'ul',
      items: [
        'Vouchers are non-transferable.',
        'Cannot be combined with any other Indiantreks offer.',
        'Valid only for treks booked directly with Indiantreks in India.',
        'Redemption is possible using your registered phone number or email ID.',
        'All standard trek booking terms and conditions also apply.',
        'Indiantreks reserves the right to modify voucher terms without prior notice.',
      ],
    },
    {
      type: 'h3',
      text: 'Itinerary & Schedule Changes',
    },
    {
      type: 'p',
      text: 'All trek itineraries are designed with the most reliable information available. However, adjustments may be necessary due to:',
    },
    {
      type: 'ul',
      items: [
        'Adverse weather, road conditions, transportation delays, government orders, airline changes, or health-related concerns.',
      ],
    },
    {
      type: 'p',
      text: 'Any additional expenses resulting from such delays or changes will be the responsibility of the participant.',
    },
    {
      type: 'p',
      text: 'Indiantreks also reserves the right to accept or decline any participant at its discretion for safety or operational reasons.',
    },
  ],
};
