import AboutSection from "@/components/home/AboutSection";
import HeroCarousel from "@/components/home/HeroCarousel";
import OurSeries from "@/components/home/OurSeries";
import RecentProducts from "@/components/home/RecentProducts";
import ContactSection from "@/components/shared/ContactSection";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      {/*  Video Hero Carousel */}
      <HeroCarousel />

      {/* About Section */}
      <AboutSection />

      {/* Our Series Section */}
      <OurSeries />

      {/* Autoplay loop recent products  */}
      <RecentProducts />

      {/* Contact Form */}
      <ContactSection />
      
    </div>
  );
}