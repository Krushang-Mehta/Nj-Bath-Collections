import HeroSection from "@/components/shared/HeroSection";
import InfoSection from "@/components/about/InfoSection";

export default function AboutPage() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Reusable Shared Hero Section populated with About Page parameters */}
      <HeroSection
        title="About Company"
        subtitle="About Us"
        bgImage="/abouthero.png" 
      />

      {/* Production-ready Brand Narrative & Dynamic Scroll Section */}
      <InfoSection />
    </div>
  );
}