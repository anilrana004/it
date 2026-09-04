import type { TrekRichSection } from '@/lib/content/treks/types';

/** Notes — offloading, special offer & terms for Har Ki Dun. */
export const HAR_KI_DUN_NOTE_SECTION: TrekRichSection = {
  id: 'note',
  kicker: 'Important Note',
  title: 'Note',
  intro:
    'In the normal course of things, IndianTreks anticipates that you will be the one to carry your own personal gear; but, if you want to unload your backpack, you may give it to the mule.',
  blocks: [
    {
      type: 'h3',
      text: 'Charge of offloading Backpack',
    },
    {
      type: 'ul',
      items: [
        '₹2,000 INR, provided that the payment is made online ten days in advance',
        '₹2,500 INR if you inform us after reaching Sankri',
        'There is a need for a waterproof cover on the backpack; luggage and stroller bags are not permitted',
      ],
    },
    {
      type: 'h3',
      text: 'Special offers',
    },
    {
      type: 'p',
      text: 'You just need to make one payment, and you may go on the tour as many times as you want.',
    },
    {
      type: 'p',
      text: 'If you schedule a trek with Indiantreks and are unable to finish that trek, or if you have successfully completed that journey and wish to do it again, you are free to repeat that trek an unlimited number of times without incurring any additional fees for doing so.',
    },
    {
      type: 'h3',
      text: 'Terms and conditions',
    },
    {
      type: 'ul',
      items: [
        'You may not sell or give away this offer in any way',
        'You may take advantage of this deal on any of Indiantrek’s limited trips that are already scheduled',
        'You have three years from the date you booked to take advantage of this promotion',
        'The participant is unable to receive this offer if they have already been given a cash refund or voucher at the time of cancellation',
        'The cost of the walk is covered for participants, but they are responsible for paying for their own transportation to and from the starting point',
        'To book a trek or an adventure programme, please use our online booking form; if you prefer, you may also give us a call at the number provided. To confirm your reservation, you will need to wire a deposit in addition to the original payment',
      ],
    },
  ],
};
