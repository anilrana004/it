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
    { src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=500&fit=crop&q=80', href: '/treks', title: 'Explore All Destinations', subtitle: '50+ handpicked trips across India, Nepal & beyond', badge: 'Discover', discount: 'View All Trips' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=500&fit=crop&q=80', href: '/treks?difficulty=easy', title: 'Weekend Getaways', subtitle: 'Short escapes for every adventurer', badge: 'Long Weekend', discount: 'Easy Trips' },
    { src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=500&fit=crop&q=80', href: '/treks?region=india', title: 'Incredible India', subtitle: 'Explore the diversity of India', badge: 'India', discount: 'Domestic Tours' },
  ],
  book: [
    { src: 'https://images.unsplash.com/photo-1553729459-afe8f2e8edc1?w=1200&h=500&fit=crop&q=80', href: '/treks', title: 'Book Now, Pay in EMIs', subtitle: 'Reserve your spot with just ₹799 — pay the rest later', badge: '0% EMI', discount: 'Pay Later Available' },
    { src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&h=500&fit=crop&q=80', href: '/treks', title: 'Flexible Payment Options', subtitle: 'Choose full payment or easy installments at checkout', badge: 'No Cost EMI', discount: 'Check Availability' },
    { src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&h=500&fit=crop&q=80', href: '/treks', title: 'Gift a Trip', subtitle: 'Give the gift of adventure to your loved ones', badge: 'Gift Cards', discount: 'Buy Gift Card' },
  ],
  sale: [
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=500&fit=crop&q=80', href: '/bucket-list-sale', title: 'Bucket List Sale - UPTO 40% OFF', subtitle: 'Limited period discounts on handpicked bucket list trips', badge: 'Sale Active', discount: 'Grab Your Deal' },
    { src: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&h=500&fit=crop&q=80', href: '/treks', title: 'Best Value Trips', subtitle: 'Top-rated experiences at unbeatable prices', badge: 'Best Value', discount: 'Shop Now' },
    { src: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=1200&h=500&fit=crop&q=80', href: '/bucket-list-sale', title: 'Flash Sale - Extra ₹3,000 OFF', subtitle: 'Use code BUCKET3000 at checkout', badge: 'Limited Time', discount: 'Book Now' },
  ],
  customize: [
    { src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&h=500&fit=crop&q=80', href: '/customized', title: 'Customize Your Perfect Getaway', subtitle: 'Tell us your preferences — we will build your dream trip', badge: 'Tailor-Made', discount: 'Plan Your Trip' },
    { src: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&h=500&fit=crop&q=80', href: '/corporate', title: 'Corporate Retreats & Team Outings', subtitle: 'Customized corporate tours for teams of all sizes', badge: 'Corporate', discount: 'Enquire Now' },
    { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=500&fit=crop&q=80', href: '/honeymoon', title: 'Honeymoon Packages', subtitle: 'Romantic getaways crafted for couples', badge: 'Honeymoon', discount: 'View Packages' },
  ],
  international: [
    { src: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=1200&h=500&fit=crop&q=80', href: '/treks?region=nepal', title: 'International Adventures', subtitle: 'Thailand | Bali | Bhutan | Vietnam | Nepal', badge: 'Global', discount: 'Explore International' },
    { src: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=1200&h=500&fit=crop&q=80', href: '/treks/everest-base-camp', title: 'Everest Base Camp Trek', subtitle: 'Stand at the foot of the world\'s highest peak', badge: 'Legendary', discount: '13D/12N' },
    { src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=500&fit=crop&q=80', href: '/treks/nepal-backpacking', title: 'Thailand Group Tour', subtitle: 'Phuket | Krabi | Full Moon Party', badge: 'UPTO ₹3,500 OFF', discount: '6N/7D' },
  ],
  trek: [
    { src: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1200&h=500&fit=crop&q=80', href: '/treks', title: 'Trek the Himalayas', subtitle: 'Valley of Flowers | Hampta Pass | Kedarkantha & more', badge: 'Himalayas', discount: 'View All Treks' },
    { src: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=1200&h=500&fit=crop&q=80', href: '/treks', title: 'Winter Treks Are Here', subtitle: 'Snow trails, frozen lakes, and starry nights', badge: 'Winter Special', discount: 'Book Winter Treks' },
    { src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=500&fit=crop&q=80', href: '/treks', title: 'Monsoon Magic Treks', subtitle: 'Greenery, waterfalls, and blooming meadows', badge: 'Monsoon', discount: 'Explore Now' },
  ],
  community: [
    { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=500&fit=crop&q=80', href: '/treks', title: 'Join 80,000+ Travelers', subtitle: 'Be part of India\'s fastest growing travel community', badge: 'Community', discount: 'Start Your Journey' },
    { src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=500&fit=crop&q=80', href: '/blog', title: 'Travel Stories & Guides', subtitle: 'Read experiences from fellow travelers', badge: 'Blog', discount: 'Read Stories' },
    { src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&h=500&fit=crop&q=80', href: '/campus-ambassador', title: 'Campus Ambassador Program', subtitle: 'Lead, earn, and travel with TrekRoot', badge: 'Apply Now', discount: 'Know More' },
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
