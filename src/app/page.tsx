import Hero from "@/components/Hero";
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
import { photos } from "@/lib/media";
import Banners from "@/components/Banners";

const banners = {
  explore: [
    { src: photos.uttarakhand, href: '/treks?region=uttarakhand', title: 'Uttarakhand  -  Land of Gods & Treks', subtitle: '10 iconic Himalayan treks across Chopta, Kedarkantha, Valley of Flowers & beyond', badge: 'Uttarakhand', discount: 'View All Treks' },
    { src: photos.himachal, href: '/treks?region=himachal', title: 'Himachal  -  Adventure Capital', subtitle: '8 breathtaking treks  -  Hampta, Triund, Bhrigu Lake, Kheerganga & more', badge: 'Himachal', discount: 'Explore Himachal' },
    { src: photos.yatra, href: '/yatra', title: 'Sacred Yatras  -  Spiritual Himalaya', subtitle: 'Kedarnath · Do Dham · Char Dham · Panch Kedar  -  divine journeys', badge: 'Yatra', discount: 'Plan Your Yatra' },
  ],
  book: [
    { src: photos.kedarkantha, href: '/treks', title: 'Book Now, Pay in EMIs', subtitle: 'Reserve your spot with just ₹799  -  pay the rest later', badge: '0% EMI', discount: 'Pay Later Available' },
    { src: photos.himachal, href: '/treks', title: 'Flexible Payment Options', subtitle: 'Choose full payment or easy installments at checkout', badge: 'No Cost EMI', discount: 'Check Availability' },
    { src: photos.vof, href: '/travel-gift-cards', title: 'Gift a Trip', subtitle: 'Give the gift of adventure to your loved ones', badge: 'Gift Cards', discount: 'Buy Gift Card' },
  ],
  sale: [
    { src: photos.ebc, href: '/bucket-list-sale', title: 'Bucket List Sale  -  UPTO 40% OFF', subtitle: 'Limited period discounts on handpicked bucket list treks & yatras', badge: 'Sale Active', discount: 'Grab Your Deal' },
    { src: photos.uttarakhand, href: '/treks', title: 'Best Value Uttarakhand Treks', subtitle: 'Chopta, Dayara Bugyal, Nag Tibba  -  top-rated at unbeatable prices', badge: 'Best Value', discount: 'Shop Now' },
    { src: photos.snow, href: '/bucket-list-sale', title: 'Flash Sale  -  Extra ₹3,000 OFF', subtitle: 'Use code BUCKET3000 at checkout on all treks', badge: 'Limited Time', discount: 'Book Now' },
  ],
  customize: [
    { src: photos.chopta, href: '/customized', title: 'Customize Your Himalayan Trek', subtitle: 'Tell us your preferences  -  we will build your dream Uttarakhand or Himachal trip', badge: 'Tailor-Made', discount: 'Plan Your Trip' },
    { src: photos.yatra, href: '/customized', title: 'Char Dham Yatra Packages', subtitle: 'Customized pilgrimage tours for groups, families & seniors', badge: 'Yatra Special', discount: 'Enquire Now' },
    { src: photos.nepal, href: '/customized', title: 'Nepal Custom Tours', subtitle: 'EBC · ABC · Kathmandu · Chitwan  -  crafted just for you', badge: 'Nepal', discount: 'View Packages' },
  ],
  international: [
    { src: photos.nepal, href: '/treks?region=nepal', title: 'Nepal  -  Himalayan Kingdom', subtitle: 'Everest Base Camp · Annapurna · Kathmandu · Pokhara · Chitwan', badge: 'Nepal', discount: 'Explore Nepal' },
    { src: photos.ebc, href: '/treks/everest-base-camp', title: 'Everest Base Camp Trek', subtitle: 'Stand at the foot of the world\'s highest peak', badge: 'Legendary', discount: '13D/12N' },
    { src: photos.hampta, href: '/treks/nepal-backpacking', title: 'Nepal Backpacking Circuit', subtitle: 'Kathmandu · Pokhara · Chitwan  -  Complete Nepal experience', badge: 'UPTO ₹8,000 OFF', discount: '10D/9N' },
  ],
  trek: [
    { src: photos.uttarakhand, href: '/treks', title: 'Trek the Himalayas', subtitle: 'Valley of Flowers · Kedarkantha · Hampta Pass · Chopta & 18+ more', badge: 'Himalayas', discount: 'View All Treks' },
    { src: photos.kedarkantha, desktopSrc: photos.kedarkantha, href: '/treks/kedarkantha', title: 'Kedarkantha  -  Winter Wonderland', subtitle: 'India\'s most popular winter trek with 360° Himalayan panoramas', badge: 'Winter Special', discount: '5D/4N' },
    { src: photos.vof, href: '/treks/valley-of-flowers', title: 'Valley of Flowers  -  Blooming Paradise', subtitle: 'UNESCO World Heritage  -  alpine meadows, rare flora, snow-capped vistas', badge: 'Monsoon Magic', discount: '6D/5N' },
  ],
  community: [
    { src: photos.triund, href: '/treks', title: 'Join 80,000+ Travelers', subtitle: 'Be part of India\'s fastest growing travel community', badge: 'Community', discount: 'Start Your Journey' },
    { src: photos.chopta, href: '/blog', title: 'Travel Stories & Guides', subtitle: 'Read experiences from fellow trekkers & yatris', badge: 'Blog', discount: 'Read Stories' },
    { src: photos.himachal, href: '/campus-ambassador', title: 'Campus Ambassador Program', subtitle: 'Lead, earn, and travel with Indian Treks', badge: 'Apply Now', discount: 'Know More' },
  ],
};

export default function Home() {
  return (
    <>
      <Hero />
      <div className="hidden lg:block">
        <Banners items={banners.explore} />
      </div>
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
