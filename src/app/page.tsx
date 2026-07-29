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

const bannerSet1 = [
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop&q=80', href: '/bucket-list-sale' },
  { src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=300&fit=crop&q=80', href: '/tour-packages/international' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=300&fit=crop&q=80', href: '/tour-packages/india' },
];

const bannerSet2 = [
  { src: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=300&fit=crop&q=80', href: '/backpacking-trips/india/arunachal-pradesh/ziro-festival' },
  { src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=300&fit=crop&q=80', href: '/tour-packages/international/thailand' },
  { src: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=300&fit=crop&q=80', href: '/tour-packages/international/bali' },
  { src: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=300&fit=crop&q=80', href: '/tour-packages/international/bhutan' },
  { src: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=800&h=300&fit=crop&q=80', href: '/tour-packages/india/ladakh' },
  { src: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=300&fit=crop&q=80', href: '/tour-packages/india/goa' },
  { src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=300&fit=crop&q=80', href: '/tour-packages/international/vietnam' },
  { src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=300&fit=crop&q=80', href: '/tour-packages/international/dubai' },
];

const bannerSet3 = [
  { src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=300&fit=crop&q=80', href: '/backpacking-trips/international/thailand/full-moon-party-group-tour' },
  { src: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&h=300&fit=crop&q=80', href: '/backpacking-trips/international/bali/bali-with-gili-island-group-tour-7n-8d' },
  { src: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=300&fit=crop&q=80', href: '/backpacking-trips/international/bhutan/bhutan-bike-tour' },
  { src: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=300&fit=crop&q=80', href: '/backpacking-trips/india/arunachal-pradesh/bike-and-backpacking-expedition-to-tawang' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop&q=80', href: '/backpacking-trips/india/meghalaya/meghalaya-with-kaziranga-backpacking-trip' },
  { src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=300&fit=crop&q=80', href: '/backpacking-trips/india/meghalaya/all-girls-backpacking-trip-to-meghalaya' },
];

const bannerSet4 = [
  { src: 'https://images.unsplash.com/photo-1586350977770-2598f1b6b7c8?w=800&h=300&fit=crop&q=80', href: '/treks/india/himachal-pradesh/pin-bhaba-pass-trek' },
  { src: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=300&fit=crop&q=80', href: '/treks/india/uttarakhand/valley-of-flowers-trek' },
  { src: 'https://images.unsplash.com/photo-1586350977770-2598f1b6b7c8?w=800&h=300&fit=crop&q=80', href: '/treks/india/himachal-pradesh/hampta-pass-trek' },
];

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Categories />
      <Banners images={bannerSet1} />
      <section id="upcoming-trips"><UpcomingTrips /></section>
      <BestSellers />
      <Banners images={bannerSet2} />
      <section id="customized"><CustomizedTours /></section>
      <Banners images={bannerSet3} />
      <section id="backpacking"><Backpacking /></section>
      <HimalayanTreks />
      <Banners images={bannerSet4} />
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
