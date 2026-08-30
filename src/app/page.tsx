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
import { HOME_BANNERS } from "@/lib/content/home-banners";
import Banners from "@/components/Banners";

const banners = HOME_BANNERS;

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
