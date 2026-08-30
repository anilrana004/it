import { CONTACT } from '@/lib/contact';

/** FAQ page categories — Exoticamp-style chips, Indian Treks content */
export type FaqCategoryId =
  | 'all'
  | 'registration'
  | 'payment'
  | 'booking'
  | 'basics'
  | 'beginners'
  | 'seniors'
  | 'safety'
  | 'cancellations'
  | 'logistics'
  | 'campsites'
  | 'gear'
  | 'support'
  | 'corporate';

export const FAQ_CATEGORIES: {
  id: FaqCategoryId;
  label: string;
  shortLabel?: string;
  icon: string;
}[] = [
  { id: 'all', label: 'All', icon: 'fa-layer-group' },
  { id: 'registration', label: 'Registration', shortLabel: 'Register', icon: 'fa-clipboard-list' },
  { id: 'payment', label: 'Payment', icon: 'fa-credit-card' },
  { id: 'booking', label: 'Booking', icon: 'fa-calendar-check' },
  { id: 'basics', label: 'Basics', icon: 'fa-circle-info' },
  { id: 'beginners', label: 'Beginners', shortLabel: 'Beginner', icon: 'fa-seedling' },
  { id: 'seniors', label: 'For Seniors', shortLabel: 'Seniors', icon: 'fa-person-cane' },
  { id: 'safety', label: 'Safety', icon: 'fa-shield-halved' },
  { id: 'cancellations', label: 'Cancellations', shortLabel: 'Cancel', icon: 'fa-ban' },
  { id: 'logistics', label: 'Logistics', icon: 'fa-route' },
  { id: 'campsites', label: 'Campsites', shortLabel: 'Camps', icon: 'fa-campground' },
  { id: 'gear', label: 'Gear & Fitness', shortLabel: 'Gear', icon: 'fa-person-hiking' },
  { id: 'support', label: 'Support', icon: 'fa-headset' },
  { id: 'corporate', label: 'Corporate', icon: 'fa-briefcase' },
];

export type FaqItem = {
  id: string;
  category: Exclude<FaqCategoryId, 'all'>;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'trek-fee-higher',
    category: 'basics',
    question: 'Why Is Your Trek Fee Higher Than Other Trekking Companies?',
    answer:
      'Our pricing reflects the overall quality and safety of the experience we provide. We focus on trained trek leaders, proper ground support, quality accommodation, reliable transportation, meals, permits, safety equipment and well-managed logistics. We also believe in transparent pricing with no hidden charges. The cheapest trek is not always the safest or best-managed trek.',
  },
  {
    id: 'solo-trekker-join',
    category: 'booking',
    question: 'Can I Join Your Groups as a Solo Trekker?',
    answer:
      'Absolutely! Solo travellers are welcome on our fixed-departure group treks. You can join a group of like-minded travellers and enjoy the trek with the support of our trek leader and ground team.',
  },
  {
    id: 'solo-woman-safe',
    category: 'safety',
    question: "I'm a Solo Woman. Is It Safe for Me?",
    answer:
      "Yes. Solo women are welcome to join our group treks. Our treks are led by experienced trek leaders and supported by our ground team. We maintain group coordination and safety protocols throughout the trek. However, mountain travel always carries natural risks, so following the trek leader's instructions is essential.",
  },
  {
    id: 'register-in-advance',
    category: 'registration',
    question: 'Why Do I Have to Register So Much in Advance?',
    answer:
      'Advance registration helps us arrange permits, accommodation, transportation, meals, trek leaders, support staff and other logistics properly. Popular treks can fill quickly, especially during peak seasons, so early booking also helps secure your preferred departure date.',
  },
  {
    id: 'easy-treks-beginners',
    category: 'beginners',
    question: 'What Are Some Easy Treks for Beginners?',
    answer:
      'Some good options for beginners include Kedarkantha, Valley of Flowers, Chopta–Tungnath–Chandrashila and other easy-to-moderate seasonal treks. The right trek depends on your fitness, experience, altitude tolerance and the season. Our team can help you choose the most suitable option.',
  },
  {
    id: 'obese-bmi-high',
    category: 'gear',
    question: "I'm Obese and My BMI Is High. Can I Trek With You?",
    answer:
      'A higher BMI does not automatically mean you cannot trek. What matters is your overall fitness, mobility, stamina and ability to handle altitude and long walking days. Some treks may be suitable, while others may not be recommended. We may ask for additional fitness information before confirming your booking.',
  },
  {
    id: 'strict-fitness-approvals',
    category: 'safety',
    question: 'Why Are You So Strict About Fitness Approvals?',
    answer:
      'Mountain trekking is very different from normal travel. Long walking hours, steep climbs, high altitude, cold weather and changing terrain can put significant physical demands on the body. Our fitness requirements are primarily about your safety and the safety of the entire group, not about restricting participation.',
  },
  {
    id: 'group-discounts',
    category: 'booking',
    question: 'Do You Have Any Group Discounts?',
    answer:
      'Yes, group discounts may be available depending on the group size, trek, departure date and package. For larger groups, schools, colleges, corporates and private groups, you can contact our team for a customised quotation.',
  },
  {
    id: 'health-issues-bp-asthma',
    category: 'gear',
    question: 'I Have Health Issues Like BP, Asthma or Diabetes. Can I Trek?',
    answer:
      "It depends on your individual condition, fitness level and the difficulty and altitude of the trek. If you have a medical condition, we strongly recommend consulting your doctor before booking. Please inform our team honestly about your medical history and medications so we can assess whether the trek is appropriate. Do not stop or change prescribed medication without your doctor's advice.",
  },
  {
    id: 'toilets-worried',
    category: 'campsites',
    question: "What Are Toilets Like? I'm Worried!",
    answer:
      'Toilet facilities vary depending on the trek and campsite location. At hotels and established campsites, you may have regular attached or common toilets. On remote trekking routes, basic temporary or dry toilet facilities may be available. Facilities become more basic as you go deeper into the mountains, so we recommend being prepared for simple conditions.',
  },
  {
    id: 'register-how',
    category: 'registration',
    question: 'How Do I Register for a Trek?',
    answer:
      'Choose your preferred trek and departure date, then complete the booking process through our website or by contacting the IndianTreks team. A booking amount is required to confirm your slot. Once your payment is received, our team will share your booking confirmation and further trek details.',
  },
  {
    id: 'block-slot-without-pay',
    category: 'registration',
    question: 'Can You Block a Slot for Me Without Paying the Trek Fee?',
    answer:
      'Slots are generally confirmed only after receiving the required booking amount. We may accommodate short-term slot holds in specific cases, subject to availability and approval from our team. An unpaid slot should not be considered a confirmed booking.',
  },
  {
    id: 'date-full-waitlist',
    category: 'registration',
    question: "The Date I'm Looking for Is Full. What Should I Do?",
    answer:
      'You can ask our team about the waitlist or the next available departure. If a confirmed participant cancels and a slot becomes available, we may offer it to travellers on the waitlist according to our booking process.',
  },
  {
    id: 'add-participant-after-booking',
    category: 'registration',
    question: 'Once I Complete My Booking, Can I Add Another Participant?',
    answer:
      "Yes, you can request to add another participant, subject to availability. The additional participant's booking will need to be confirmed separately, and the same trek terms and applicable fees will apply.",
  },
  {
    id: 'after-register-what-happens',
    category: 'registration',
    question: 'What Happens After I Register for a Trek?',
    answer:
      'Once your booking is confirmed, our team will share the relevant booking confirmation, trek itinerary, reporting details, pickup information, packing list, fitness guidelines and other important instructions. Before departure, you will also receive the final operational details from our team.',
  },
  {
    id: 'payment-transaction-failed',
    category: 'payment',
    question: 'My Transaction Failed. What Should I Do?',
    answer:
      'If your payment fails, please check your internet connection, payment details and available balance, then try again. If the issue continues, contact the IndianTreks team with your name, trek name, departure date and payment screenshot/error message. Our team will help you complete the booking.',
  },
  {
    id: 'payment-debited-no-confirmation',
    category: 'payment',
    question: 'My Amount Got Debited, but I Did Not Get a Confirmation. What Should I Do?',
    answer:
      "Don't make another payment immediately. Sometimes the bank or payment gateway may take some time to update the transaction status. Please share your payment screenshot/transaction ID with our team. We will verify the payment and confirm your booking status.",
  },
  {
    id: 'payment-modes',
    category: 'payment',
    question: 'What Payment Modes Do You Accept?',
    answer:
      'We accept the payment methods available through our authorised payment channels, which may include UPI,net banking and bank transfers. The available options may vary depending on the payment gateway and transaction type.',
  },
  {
    id: 'partial-payments',
    category: 'payment',
    question: 'Do You Accept Partial Payments?',
    answer:
      'Yes. For most treks, you can confirm your booking by paying the specified booking amount, with the remaining balance payable according to the payment schedule shared by our team. The required advance may vary depending on the trek and package.',
  },
  {
    id: 'pay-through-emi',
    category: 'payment',
    question: 'Can I Pay Through EMI?',
    answer:
      'EMI availability depends on the payment gateway, bank/card provider and applicable transaction eligibility. If an EMI option is available for your transaction, it will be displayed during payment. You can also contact our team to check whether an alternative payment arrangement is available.',
  },
  {
    id: 'good-treks-beginners',
    category: 'beginners',
    question: 'What Are Some Good Treks for Beginners?',
    answer:
      'If you are trekking for the first time, we recommend starting with easy to moderate treks that match your fitness level. Popular beginner-friendly options include Kedarkantha, Valley of Flowers and Chopta–Tungnath–Chandrashila. The right choice also depends on the season, altitude, duration and your physical fitness.',
  },
  {
    id: 'best-months-snowfall',
    category: 'beginners',
    question: 'What Are the Best Months to See Snowfall?',
    answer:
      'Snow conditions vary every year depending on weather and snowfall patterns. Generally, December to March offers good opportunities for experiencing snow on suitable Himalayan treks such as Kedarkantha and other winter routes. However, snowfall cannot be guaranteed on any particular departure.',
  },
  {
    id: 'beginner-tougher-treks',
    category: 'beginners',
    question: 'As a Beginner, Is It Wise to Choose Tougher Treks?',
    answer:
      'We generally recommend starting with an easy or moderate trek rather than choosing a difficult trek without preparation. Tougher treks can involve longer walking hours, steeper climbs, higher altitude and more challenging weather conditions. If you are physically fit and properly prepared, our team can help you determine whether a more challenging trek is suitable.',
  },
  {
    id: 'upper-age-limit',
    category: 'beginners',
    question: 'What Is the Upper Age Limit for Booking a Trek With IndianTreks?',
    answer:
      "There is no single upper age limit for every trek. Eligibility depends on the trek's difficulty, altitude, duration and your individual fitness and medical condition. Senior trekkers may be asked to provide additional fitness or medical clearance before booking certain treks.",
  },
  {
    id: 'never-trekked-experience-needed',
    category: 'beginners',
    question: 'I Have Never Trekked Before. Do I Need Previous Trekking Experience?',
    answer:
      'No. Previous trekking experience is not mandatory for most beginner-friendly IndianTreks departures. What is important is having an appropriate level of fitness and being prepared for the physical demands of the selected trek. Our trek leaders will guide you throughout the journey.',
  },
  {
    id: 'no-fitness-routine',
    category: 'beginners',
    question: 'I Do Not Have a Fitness Routine. Should I Become Fit Before Booking a Trek?',
    answer:
      "Yes, we strongly recommend preparing before your trek. You don't need to be an athlete, but regular walking, jogging, cycling, stair climbing or other endurance activities can make the experience safer and more enjoyable. Ideally, start preparing several weeks before your departure.",
  },
  {
    id: 'fitness-mandatory',
    category: 'beginners',
    question: 'Is Fitness Mandatory to Go on the Trek?',
    answer:
      'Yes. A basic level of physical fitness is important for Himalayan trekking. Depending on the trek, you may need to walk for several hours a day, climb steep sections and deal with altitude and changing weather. Our fitness guidelines are designed primarily for your safety and overall trekking experience.',
  },
  {
    id: 'bmi-high-can-trek',
    category: 'gear',
    question: 'My BMI Is High. Can I Trek?',
    answer:
      "A high BMI does not automatically mean that you cannot trek. Your overall fitness, mobility, stamina and ability to handle the trek's altitude and terrain are more important factors. Some treks may be suitable, while others may not be recommended. Our team can help you select an appropriate trek based on your fitness level.",
  },
  {
    id: 'asthmatic-problem',
    category: 'gear',
    question: 'I Am Asthmatic. Will I Face Any Problem on the Trek?',
    answer:
      'Asthma can affect people differently, particularly at higher altitudes and in cold or strenuous conditions. If you have asthma, please consult your doctor before booking, especially for high-altitude treks. Inform our team about your condition and carry any prescribed medication or inhaler as advised by your doctor.',
  },
  {
    id: 'heart-condition-can-trek',
    category: 'gear',
    question: 'I Have a Heart Condition. Can I Trek?',
    answer:
      'High-altitude trekking can place additional stress on the cardiovascular system. If you have a heart condition, you should consult your cardiologist/doctor before booking any trek and obtain medical clearance if recommended. Our team may require medical fitness confirmation depending on the trek. Your safety takes priority, and we will not recommend a trek if the associated risks are considered unsuitable.',
  },
  {
    id: 'safety-approach',
    category: 'safety',
    question: 'How Does IndianTreks Look at Safety?',
    answer:
      'Safety is one of the most important parts of every IndianTreks trek. We assess the route, weather, altitude, terrain and overall conditions before and during the trek. Our experienced trek leaders and support teams monitor the group and can modify the itinerary when conditions are unsafe. For example, during adverse weather or road conditions, our team may change or skip a planned section rather than take unnecessary risks.\nWe also require trekkers to meet the appropriate fitness and medical requirements because Himalayan trekking involves genuine risks related to altitude, weather and remote terrain.',
  },
  {
    id: 'safety-equipment',
    category: 'safety',
    question: 'What Safety Equipment Is Used by IndianTreks?',
    answer:
      'The equipment depends on the trek and terrain, but our safety setup can include first-aid and medical kits, oxygen cylinders, pulse oximeters, walkie-talkies/radios, stretchers and technical equipment such as ropes, helmets, harnesses, ice axes, gaiters, crampons and microspikes, wherever required.\nOur trek teams also include experienced trek leaders and support staff, with qualified leaders available on applicable routes.',
  },
  {
    id: 'family-updates-trek',
    category: 'safety',
    question: 'Will You Give Updates to My Family About My Trek?',
    answer:
      'Yes, our operations and trek teams maintain communication and group coordination throughout the trek wherever network or communication facilities are available. Our base-camp team can also coordinate with additional staff when required. However, many Himalayan routes have areas with limited or no mobile network, so continuous live communication cannot always be guaranteed.\nBefore departure, we also recommend that trekkers share the relevant emergency contact and itinerary information with their family.',
  },
  {
    id: 'solo-woman-safe-on-trek',
    category: 'safety',
    question: 'I Am a Solo Woman Trekker. Is It Safe for Me on the Trek?',
    answer:
      "Yes. Solo women are welcome to join our group departures. You will trek with an experienced trek leader and support team rather than being left to manage the route alone. IndianTreks also has experienced women associated with its trekking and mountaineering operations.\nHowever, Himalayan trekking always involves natural risks. We expect every trekker—including solo women—to follow the trek leader's instructions, stay with the group and follow the prescribed safety procedures.",
  },
  {
    id: 'cancellation-policy',
    category: 'cancellations',
    question: 'What Is Your Cancellation Policy?',
    answer:
      'Our cancellation policy depends on how far in advance you cancel your trek. The applicable cancellation amount is calculated based on the original booking and scheduled departure date. Cancellation requests must be submitted in writing to our team. Applicable processing or cancellation charges will be deducted before the refund is issued.',
  },
  {
    id: 'cancel-how-many-days',
    category: 'cancellations',
    question: 'How Many Days in Advance Should I Cancel My Trek?',
    answer:
      'We recommend cancelling as early as possible if your plans change. The cancellation charges increase as the departure date approaches, and bookings cancelled within the final 7 days are generally non-refundable under our current policy.',
  },
  {
    id: 'indiantreks-cancels-trek',
    category: 'cancellations',
    question: 'What Happens If IndianTreks Cancels My Trek?',
    answer:
      'If IndianTreks has to cancel or significantly modify a trek because of unsafe weather, route conditions, government restrictions or other operational circumstances, our team will communicate the available options to you. Depending on the situation, this may include transferring your booking to another scheduled departure of the same trek or other applicable arrangements.',
  },
  {
    id: 'cancel-how',
    category: 'cancellations',
    question: 'How Do I Cancel My Trek?',
    answer:
      'Please contact your trip coordinator or send us a written cancellation request by email. Once we receive your request, our team will verify the booking and calculate the applicable refund according to the cancellation policy.',
  },
  {
    id: 'refund-how-long',
    category: 'cancellations',
    question: 'How Long Does the Refund Process Take?',
    answer:
      "Once your cancellation and refund are approved, the refund is generally processed within 7 working days and credited back to the customer's account/payment source, subject to applicable processing charges.",
  },
  {
    id: 'no-show-trek-again',
    category: 'cancellations',
    question: 'If I Don\'t Show Up for My Trek, Does the "Trek Again" Policy Apply?',
    answer:
      'No. The “Trek Again” benefit is specifically related to certain situations where adverse weather prevents you from completing the journey. It should not be considered applicable to a simple no-show or failure to report for the trek.',
  },
  {
    id: 'small-group-cancel',
    category: 'cancellations',
    question: 'If My Group Does Not Get Full, Will IndianTreks Cancel My Trek?',
    answer:
      'IndianTreks does not cancel a confirmed departure simply because the group is smaller than expected. Trek departures are managed according to operational feasibility, route conditions, permits, weather and safety requirements. If circumstances require any change or cancellation, our team will inform you in advance and explain the available options.',
  },
  {
    id: 'transport-basecamp-included',
    category: 'logistics',
    question: 'Is Transportation to and From Basecamp Included in the Trek Fee?',
    answer:
      'It depends on the trek and package you choose. Some IndianTreks packages include transportation from the designated pickup point to the basecamp and back, while some are basecamp-to-basecamp packages. Please check the individual trek itinerary for exact transportation inclusions.',
  },
  {
    id: 'cab-fee-whom-pay',
    category: 'logistics',
    question: 'Whom Do We Have to Pay the Cab Fee?',
    answer:
      'If transportation is included in your package, there is no separate cab payment for the included transfer. If a local/shared cab transfer is not included in your trek package, the applicable fare will be communicated by our team in advance, along with the payment process.',
  },
  {
    id: 'vehicle-types',
    category: 'logistics',
    question: 'What Kind of Vehicles Are Available?',
    answer:
      'Vehicle selection depends on the route, road conditions, group size and local availability. Depending on the trek, transportation may be arranged using Tempo Travellers, SUVs, local taxis or other suitable vehicles. Our priority is to use vehicles appropriate for the mountain route and group size.',
  },
  {
    id: 'same-city-travellers',
    category: 'logistics',
    question: 'I Am Travelling Alone. Can You Put Me in Touch With Others From the Same City?',
    answer:
      'If other participants from your city are travelling on the same departure, you can contact our team and we can check whether they are comfortable connecting with you. We cannot guarantee that participants from the same city will be available or that their personal contact details can be shared without their consent.',
  },
  {
    id: 'cab-cost-sharing',
    category: 'logistics',
    question: 'How Are We Sharing the Cab Cost?',
    answer:
      'For shared local transportation, the applicable fare is generally divided among the passengers travelling in that vehicle. The exact calculation depends on the route, vehicle type and number of passengers. Our team will communicate the applicable cost before the journey.',
  },
  {
    id: 'cab-people-count',
    category: 'logistics',
    question: 'How Many People Will Be Travelling in One Cab?',
    answer:
      "This depends on the vehicle, group size, luggage and local transportation arrangements. We aim to keep the journey comfortable and suitable for the vehicle's permitted capacity rather than overcrowding the vehicle. The exact vehicle and seating arrangement may vary depending on the trek and road conditions.",
  },
  {
    id: 'toilets-washroom-facilities',
    category: 'campsites',
    question: 'What Are the Toilets/Washroom Facilities Like on the Trek?',
    answer:
      'Washroom facilities vary depending on the trek, campsite and altitude. At hotels and established campsites, you can generally expect regular washrooms. At remote campsites and higher-altitude locations, facilities are more basic and may include temporary or dry toilets. As you move deeper into the mountains, please be prepared for limited facilities.',
  },
  {
    id: 'bath-on-trek',
    category: 'campsites',
    question: 'Can I Take a Bath on the Trek or at the Basecamp?',
    answer:
      'Bathing facilities depend on the location and trek. Hot showers may be available at some hotels or campsites, while remote high-altitude camps generally do not have regular bathing facilities. We recommend carrying quick-dry clothing and planning for limited bathing during the trekking days.',
  },
  {
    id: 'wet-wipes-toilet',
    category: 'campsites',
    question: 'Should I Get Wet Wipes to Clean After Using the Toilet?',
    answer:
      'Yes, carrying biodegradable wet wipes, tissues and hand sanitiser is recommended, especially on longer or remote treks. Please do not leave wipes or other waste on the trail. Pack all non-biodegradable waste and dispose of it only at designated collection points.',
  },
  {
    id: 'tent-occupancy',
    category: 'campsites',
    question: 'How Many Trekkers Stay in a Tent?',
    answer:
      'Tent occupancy depends on the trek, campsite, weather conditions and package. Generally, 2–3 trekkers may share a tent, while some departures or specific campsites may have different arrangements. The exact accommodation configuration will be communicated in your trek itinerary.',
  },
  {
    id: 'group-size',
    category: 'campsites',
    question: 'What Is the Group Size on an IndianTreks Trek?',
    answer:
      'Group size depends on the trek, departure date and operational requirements. Our fixed departures generally operate as small to medium-sized groups, allowing our trek leaders and support team to manage the group effectively while maintaining safety and a better trekking experience. For the exact group size of your departure, please check with our team before booking.',
  },
  {
    id: 'carry-laptop',
    category: 'campsites',
    question: 'Can I Carry My Laptop on the Trek?',
    answer:
      'Yes, you can carry your laptop, but we strongly recommend avoiding it unless necessary. Himalayan treks involve long walking hours, changing weather and uneven terrain, and carrying extra weight can make the trek more difficult. If you need a laptop for essential work, please keep it safely protected from rain, dust and cold.',
  },
  {
    id: 'charging-basecamp',
    category: 'campsites',
    question: 'Are There Charging Points at the Basecamp?',
    answer:
      'Charging facilities depend on the basecamp and available electricity. Some basecamps may have limited charging points, while remote campsites may have no regular electricity. Charging availability can also be affected by weather and power supply. We recommend carrying a power bank and keeping your devices fully charged before starting the trek.',
  },
  {
    id: 'tents-at-basecamp',
    category: 'campsites',
    question: 'Will We Stay in Tents at the Basecamp?',
    answer:
      'This depends on the specific trek and package. At some basecamps, accommodation may be provided in hotels, guesthouses, camps or tents. Your trek itinerary will clearly mention the type of accommodation included.',
  },
  {
    id: 'separate-room-basecamp',
    category: 'campsites',
    question: 'Can I Get a Separate Room at the Basecamp for an Additional Cost?',
    answer:
      'Subject to availability, a private room may be possible at certain basecamps. Any additional cost will depend on the property and room availability. Please request a private room before your trek, as it may not be possible to arrange one at the last minute.',
  },
  {
    id: 'mobile-network-basecamp',
    category: 'campsites',
    question: 'Will I Get Mobile Network at the Basecamp?',
    answer:
      'Mobile connectivity varies significantly across the Himalayas. Some basecamps have network coverage, while others may have weak, intermittent or no mobile network. We recommend informing your family about possible communication gaps before starting the trek.',
  },
  {
    id: 'cloakroom-basecamp',
    category: 'campsites',
    question: 'Will There Be a Cloakroom at the Basecamp?',
    answer:
      'Cloakroom or luggage-storage facilities depend on the trek and basecamp accommodation. Where available, you can leave luggage that you do not need on the trail. However, storage arrangements and availability vary by location, so please confirm with our team before departure. Avoid leaving valuables, cash, electronics or important documents in stored luggage.',
  },
  {
    id: 'menu-on-trek',
    category: 'campsites',
    question: 'What Does the Menu Look Like on Your Trek?',
    answer:
      'Our trek meals are designed to be simple, nutritious, filling and suitable for trekking conditions. Depending on the trek and campsite, meals may include items such as poha, upma, paratha, rice, dal, roti, vegetables, khichdi, noodles, soup, tea and snacks. The exact menu can vary depending on the trek, altitude, weather and availability of ingredients.',
  },
  {
    id: 'jain-gluten-vegan-food',
    category: 'campsites',
    question: 'Do You Serve Jain, Gluten-Free or Vegan Food on Your Treks?',
    answer:
      'We can accommodate Jain, vegetarian and certain dietary preferences when informed in advance. Vegan and gluten-free meals may also be possible on selected treks, but availability depends on the route and kitchen facilities. Please inform our team at the time of booking so we can assess and plan accordingly.\nFor severe allergies or medically required diets, we recommend carrying suitable backup food and clearly informing the trek leader.',
  },
  {
    id: 'non-veg-on-trek',
    category: 'campsites',
    question: 'Do You Serve Non-Veg on the Trek?',
    answer:
      'Our standard trek meals are generally vegetarian, particularly at high-altitude camps. Non-vegetarian food is not routinely served during the trekking days due to transportation, storage, hygiene and altitude-related logistical considerations.',
  },
  {
    id: 'carry-cutlery-lunchbox',
    category: 'campsites',
    question: 'Should I Carry Cutlery Along With a Lunch Box?',
    answer:
      "You generally do not need to carry your own full set of cutlery if it is provided as part of your trek's meal arrangements. However, carrying a personal spoon, reusable cup and lightweight bowl can be useful and hygienic.",
  },
  {
    id: 'snacks-for-trek',
    category: 'campsites',
    question: 'Should I Get Some Snacks for the Trek?',
    answer:
      'Yes. We recommend carrying a few lightweight, energy-rich snacks such as dry fruits, nuts, energy bars, chocolates, dates or biscuits. Keep them easily accessible in your daypack for quick energy during the trek.\nPlease avoid excessive packaging and carry all wrappers and waste back with you.',
  },
  {
    id: 'multi-level-lunchbox',
    category: 'campsites',
    question: 'Can I Carry a Multi-Level Lunchbox for My Trek?',
    answer:
      'Yes, you can carry a lightweight, reusable lunchbox if you prefer. However, avoid heavy or bulky containers because every extra kilogram matters during a Himalayan trek. A compact, leak-proof lunchbox is ideal.',
  },
  {
    id: 'water-potable',
    category: 'campsites',
    question: 'Is the Water Source on the Trek Potable/Drinkable?',
    answer:
      'Not every natural water source should be considered safe to drink directly. Water quality can vary depending on the location and season. Do not drink untreated water from streams, rivers or natural sources unless your trek team has confirmed that it is safe. Our team will guide you regarding safe drinking-water sources and refilling points.',
  },
  {
    id: 'hot-drinking-water',
    category: 'campsites',
    question: 'Will I Get Hot Drinking Water on the Trek?',
    answer:
      'Hot drinking water availability depends on the campsite, altitude and trek facilities. At many camps, hot water may be available at specific times, but it should not be assumed to be available throughout the day. Your trek leader or camp team will guide you about the arrangements.',
  },
  {
    id: 'carry-water-bottles',
    category: 'campsites',
    question: 'Do I Need to Carry Water Bottles for the Trek?',
    answer:
      'Yes. Every trekker should carry a reusable water bottle or hydration system, preferably with sufficient capacity for the route. We recommend avoiding single-use plastic bottles and refilling only from sources approved or recommended by the trek team.',
  },
  {
    id: 'women-treks-safe',
    category: 'safety',
    question: 'How Safe Are IndianTreks Treks for Women?',
    answer:
      "The safety of every trekker is a priority at IndianTreks. Women can join our fixed-departure group treks as solo travellers, and our trek leaders and support teams remain responsible for group coordination throughout the trek.\nWe follow route-specific safety procedures, maintain group discipline and monitor weather and trail conditions. However, Himalayan trekking involves natural risks, so every participant is expected to follow the trek leader's instructions and safety guidelines.",
  },
  {
    id: 'woman-trek-leader-before-booking',
    category: 'safety',
    question: 'Can I Know Which Trek Batch Will Have a Woman Trek Leader Before Booking My Trek?',
    answer:
      'Yes, you can ask our team about the trek leader and support-team details for your planned departure before booking. Trek-leader allocation can sometimes change due to operational requirements, weather or other unforeseen circumstances, so a specific leader cannot always be guaranteed unless confirmed by our team.',
  },
  {
    id: 'trek-menstruating',
    category: 'safety',
    question: "Can I Trek When I'm Menstruating? Can I Trek With Periods?",
    answer:
      'Yes. Many women successfully trek while menstruating. Whether you should trek depends on your comfort, overall health, fitness and how you normally feel during your period.\nWe recommend carrying your preferred menstrual products, adequate personal hygiene supplies, prescribed medication if applicable, and extra disposal bags. Please inform the trek leader or a female member of the support team if you need assistance.\nAlways follow responsible waste-disposal practices and never leave sanitary products or other menstrual waste on the trail.',
  },
  {
    id: 'other-women-in-group',
    category: 'safety',
    question: 'Are There Other Women in the Group? How Many Women Are Usually in a Trek Group?',
    answer:
      'Yes, women regularly join our group departures, including solo women travellers. The exact number of women in a group varies from one departure to another and cannot be guaranteed in advance.\nIf you are travelling solo and would prefer to know the approximate group composition before booking, you can contact our team and we will share whatever information is available.',
  },
  {
    id: 'tent-sharing-arranged',
    category: 'safety',
    question: 'How Is Tent Sharing Arranged?',
    answer:
      'Tent sharing depends on the trek, campsite and accommodation arrangement. Generally, women and men are accommodated separately, and women are assigned tents with other women wherever the group composition allows.\nThe final tent allocation is handled by the trek/camp team based on the group size and available tents. If you have a specific accommodation requirement, please inform us before the trek begins so we can check what is possible.',
  },
  {
    id: 'never-trekked-over-55',
    category: 'beginners',
    question: 'I Have Never Trekked. Can I Trek Now?',
    answer:
      'Yes, being above 55 and having no previous trekking experience does not automatically mean you cannot trek. Many first-time senior trekkers successfully enjoy Himalayan trails. However, you should choose a trek that matches your fitness, walking ability, altitude and overall health. We strongly recommend consulting your doctor before undertaking a high-altitude trek, especially if you have any existing medical concerns.',
  },
  {
    id: 'trek-in-cold',
    category: 'beginners',
    question: 'Can I Trek in the Cold (Less Than 10°C)?',
    answer:
      'Yes, provided you are physically prepared and properly equipped. Temperatures in the Himalayas can drop significantly, particularly at night and at higher camps. You should carry proper thermal layers, a warm jacket, gloves, woollen socks, a cap and other appropriate winter gear. Your trek leader will also guide you regarding weather and safety conditions.',
  },
  {
    id: 'come-trek-alone-senior',
    category: 'seniors',
    question: 'Can I Come to the Trek on My Own?',
    answer:
      'Absolutely. Senior travellers can join our fixed-departure group treks as solo participants. You will travel and trek with the group under the guidance of our trek leader and support team. However, we recommend choosing a suitable beginner-friendly trek rather than a challenging route for your first experience.',
  },
  {
    id: 'treks-suitable-over-55',
    category: 'seniors',
    question: 'Which Treks Are Suitable for First-Time Trekkers Above 55 Years?',
    answer:
      'For a first Himalayan trek after 55, we generally recommend starting with easy to moderate routes rather than high-altitude or technically difficult treks. Depending on your fitness and the season, options such as Valley of Flowers, Chopta–Tungnath–Chandrashila or other suitable easy-to-moderate treks may be considered.\nThe final choice should be based on your walking capacity, fitness, altitude tolerance and medical clearance, rather than age alone. Our team can help you select a trek that is appropriate for your experience and fitness level.',
  },
  {
    id: 'need-support-what-to-do',
    category: 'support',
    question: 'What Should I Do If I Need Support?',
    answer:
      'If you need any assistance before, during or after your trek, you can contact the IndianTreks support team. For urgent assistance during the trek, immediately inform your trek leader, camp staff or ground support team so they can assess the situation and assist you.\nFor booking, payment, itinerary or general queries, you can contact our support team directly.',
  },
  {
    id: 'support-at-campsite',
    category: 'support',
    question: 'How Do I Get Support at the Campsite?',
    answer:
      'Every IndianTreks campsite is supported by our ground team. If you need help with accommodation, food, water, medical assistance, luggage, washroom facilities or any other campsite-related concern, please speak to the camp staff or trek leader.\nFor any urgent safety or medical concern, inform the trek leader immediately rather than waiting to contact the office.',
  },
  {
    id: 'email-whatsapp-queries',
    category: 'support',
    question: 'Can I Reach Out via Email or WhatsApp for Any Queries?',
    answer: `Yes. You can contact IndianTreks for booking, trek, payment and general queries through WhatsApp or email.\nWhatsApp: ${CONTACT.phoneDisplay}\nEmail: ${CONTACT.email}\nOur team will respond as soon as possible during working hours. For an emergency during an ongoing trek, please contact your trek leader or ground team first.`,
  },
  {
    id: 'review-feedback-campsite',
    category: 'campsites',
    question: 'How Can I Review or Share Feedback About a Campsite?',
    answer:
      'We value feedback from every trekker. You can share your experience with us after your trek by contacting our support team or through the review platform provided by IndianTreks.\nWhen sharing feedback, you can mention your experience with cleanliness, food, accommodation, staff behaviour, washroom facilities, location and overall service. Your feedback helps us identify areas for improvement and maintain better standards across our campsites.',
  },
  {
    id: 'campsite-verification',
    category: 'campsites',
    question: 'How Are IndianTreks Campsites Verified?',
    answer:
      'Every campsite used on our treks is checked for safety, accessibility, sanitation, water availability, shelter quality and overall suitability for the group size and altitude. Our ground team inspects camps before the season begins and monitors conditions during departures. If a campsite no longer meets our standards due to weather, infrastructure or safety concerns, we adjust the itinerary or camp location accordingly.',
  },
  {
    id: 'campsite-types',
    category: 'campsites',
    question: 'What Types of Campsites Will I Stay At on a Trek?',
    answer:
      'Campsite types vary by trek and altitude. You may stay at organised basecamp tents, alpine camps with basic facilities, guesthouses near trailheads or mixed arrangements that combine hotels and camping on different nights. Your trek itinerary will mention the accommodation type for each night. Higher-altitude camps are generally more basic, while lower camps and basecamps may offer better amenities.',
  },
  {
    id: 'corp-team-treks',
    category: 'corporate',
    question: 'Do You Organise Corporate Team-Building Treks?',
    answer:
      'Yes. IndianTreks organises corporate outings and team-building treks for companies looking for an outdoor, collaborative experience in the Himalayas. We can arrange fixed-departure group participation or dedicated corporate batches depending on your team size, dates and preferred trek difficulty. Contact our team with your headcount, preferred month and fitness level so we can suggest suitable options.',
  },
  {
    id: 'corp-custom-itinerary',
    category: 'corporate',
    question: 'Can We Get a Custom Corporate Trek Itinerary?',
    answer:
      'Yes. For corporate groups, schools and institutions, we can customise the trek route, duration, accommodation, meals, transport and on-trail activities within operational and permit limits. Custom programs may include leadership activities, team challenges, briefing sessions and flexible camp schedules. Share your objectives, group profile and preferred dates with our team for a tailored proposal.',
  },
  {
    id: 'corp-school-college',
    category: 'corporate',
    question: 'Do You Conduct Treks for Schools and College Groups?',
    answer:
      'Yes. We conduct educational and adventure treks for schools, colleges and youth groups under appropriate supervision and safety protocols. Group size, trek difficulty, parental consent, medical readiness and permit requirements are reviewed before confirmation. Our team can recommend beginner-friendly Himalayan routes suitable for student groups and help plan transport, meals and campsite arrangements end to end.',
  },
];

export function faqsByCategory(category: FaqCategoryId): FaqItem[] {
  if (category === 'all') return FAQ_ITEMS;
  return FAQ_ITEMS.filter((item) => item.category === category);
}
