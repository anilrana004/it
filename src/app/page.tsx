import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Categories from "@/components/Categories";
import Banners from "@/components/Banners";
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

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Categories />
      <Banners />
      <section id="upcoming-trips"><UpcomingTrips /></section>
      <BestSellers />
      <Banners />
      <section id="customized"><CustomizedTours /></section>
      <Banners />
      <section id="backpacking"><Backpacking /></section>
      <HimalayanTreks />
      <Banners />
      <Reviews />
      <WhyChooseUs />
      <VideoGallery />
      <Blog />
      <FAQ />
      <Recognitions />
      <Newsletter />
    </>
  );
}
