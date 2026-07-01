import AboutSection from "@/components/home/AboutSection";
import HeroCarousel from "@/components/home/HeroCarousel";
import OurSeries from "@/components/home/OurSeries";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      {/*  Video Hero Carousel */}
      <HeroCarousel />

      {/* About Section */}
      <AboutSection />

      {/* Our Series Section */}
      <OurSeries />
      
    </div>
  );
}