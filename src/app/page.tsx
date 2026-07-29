import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import QuickFilters from "@/components/home/QuickFilters";
import UpcomingTrips from "@/components/home/UpcomingTrips";
import BestSellers from "@/components/home/BestSellers";
import CustomizedTours from "@/components/home/CustomizedTours";
import Backpacking from "@/components/home/Backpacking";
import HimalayanTreks from "@/components/home/HimalayanTreks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Reviews from "@/components/Reviews";
import VideoGallery from "@/components/home/VideoGallery";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import Recognitions from "@/components/Recognitions";
import Newsletter from "@/components/Newsletter";
import HowItWorks from "@/components/home/HowItWorks";
import Banners from "@/components/Banners";

const banners = {
  explore: [
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks', title: 'Uttarakhand — Land of Gods & Treks', subtitle: '10 iconic Himalayan treks across Chopta, Kedarkantha, Valley of Flowers & beyond', badge: 'Uttarakhand', discount: 'View All Treks' },
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks?region=himachal', title: 'Himachal — Adventure Capital', subtitle: '8 breathtaking treks — Hampta, Triund, Bhrigu Lake, Kheerganga & more', badge: 'Himachal', discount: 'Explore Himachal' },
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/yatra', title: 'Sacred Yatras — Spiritual Himalaya', subtitle: 'Kedarnath · Do Dham · Char Dham · Panch Kedar — divine journeys', badge: 'Yatra', discount: 'Plan Your Yatra' },
  ],
  book: [
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks', title: 'Book Now, Pay in EMIs', subtitle: 'Reserve your spot with just ₹799 — pay the rest later', badge: '0% EMI', discount: 'Pay Later Available' },
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks', title: 'Flexible Payment Options', subtitle: 'Choose full payment or easy installments at checkout', badge: 'No Cost EMI', discount: 'Check Availability' },
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks', title: 'Gift a Trip', subtitle: 'Give the gift of adventure to your loved ones', badge: 'Gift Cards', discount: 'Buy Gift Card' },
  ],
  sale: [
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/bucket-list-sale', title: 'Bucket List Sale — UPTO 40% OFF', subtitle: 'Limited period discounts on handpicked bucket list treks & yatras', badge: 'Sale Active', discount: 'Grab Your Deal' },
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks', title: 'Best Value Uttarakhand Treks', subtitle: 'Chopta, Dayara Bugyal, Nag Tibba — top-rated at unbeatable prices', badge: 'Best Value', discount: 'Shop Now' },
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/bucket-list-sale', title: 'Flash Sale — Extra ₹3,000 OFF', subtitle: 'Use code BUCKET3000 at checkout on all treks', badge: 'Limited Time', discount: 'Book Now' },
  ],
  customize: [
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/customized', title: 'Customize Your Himalayan Trek', subtitle: 'Tell us your preferences — we will build your dream Uttarakhand or Himachal trip', badge: 'Tailor-Made', discount: 'Plan Your Trip' },
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/customized', title: 'Char Dham Yatra Packages', subtitle: 'Customized pilgrimage tours for groups, families & seniors', badge: 'Yatra Special', discount: 'Enquire Now' },
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/customized', title: 'Nepal Custom Tours', subtitle: 'EBC · ABC · Kathmandu · Chitwan — crafted just for you', badge: 'Nepal', discount: 'View Packages' },
  ],
  international: [
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks?region=nepal', title: 'Nepal — Himalayan Kingdom', subtitle: 'Everest Base Camp · Annapurna · Kathmandu · Pokhara · Chitwan', badge: 'Nepal', discount: 'Explore Nepal' },
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks/everest-base-camp', title: 'Everest Base Camp Trek', subtitle: 'Stand at the foot of the world\'s highest peak', badge: 'Legendary', discount: '13D/12N' },
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks/nepal-backpacking', title: 'Nepal Backpacking Circuit', subtitle: 'Kathmandu · Pokhara · Chitwan — Complete Nepal experience', badge: 'UPTO ₹8,000 OFF', discount: '10D/9N' },
  ],
  trek: [
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks', title: 'Trek the Himalayas', subtitle: 'Valley of Flowers · Kedarkantha · Hampta Pass · Chopta & 18+ more', badge: 'Himalayas', discount: 'View All Treks' },
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks/kedarkantha', title: 'Kedarkantha — Winter Wonderland', subtitle: 'India\'s most popular winter trek with 360° Himalayan panoramas', badge: 'Winter Special', discount: '5D/4N' },
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks/valley-of-flowers', title: 'Valley of Flowers — Blooming Paradise', subtitle: 'UNESCO World Heritage — alpine meadows, rare flora, snow-capped vistas', badge: 'Monsoon Magic', discount: '6D/5N' },
  ],
  community: [
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/treks', title: 'Join 80,000+ Travelers', subtitle: 'Be part of India\'s fastest growing travel community', badge: 'Community', discount: 'Start Your Journey' },
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/blog', title: 'Travel Stories & Guides', subtitle: 'Read experiences from fellow trekkers & yatris', badge: 'Blog', discount: 'Read Stories' },
    { src: 'https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_80,w_1200,h_500,c_fill,g_auto/', href: '/campus-ambassador', title: 'Campus Ambassador Program', subtitle: 'Lead, earn, and travel with TrekRoot', badge: 'Apply Now', discount: 'Know More' },
  ],
};

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Banners items={banners.explore} />
      <QuickFilters />
      <section id="upcoming-trips"><UpcomingTrips /></section>
      <Banners items={banners.book} />
      <BestSellers />
      <Banners items={banners.sale} />
      <section id="customized"><CustomizedTours /></section>
      <Banners items={banners.customize} />
      <section id="backpacking"><Backpacking /></section>
      <Banners items={banners.international} />
      <HimalayanTreks />
      <Banners items={banners.trek} />
      <Reviews />
      <Banners items={banners.community} />
      <WhyChooseUs />
      <HowItWorks />
      <VideoGallery />
      <Blog />
      <FAQ />
      <Recognitions />
      <Newsletter />
    </>
  );
}
