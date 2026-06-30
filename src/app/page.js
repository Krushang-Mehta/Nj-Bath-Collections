import HeroCarousel from "@/components/home/HeroCarousel";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Immersive Video Hero Carousel */}
      <HeroCarousel />

      {/* Temporary spacing box so we can test page scrolling and watch the Navbar state change */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-h2">Experience Luxurious Design</h2>
        <p className="text-body max-w-2xl mx-auto">
          Our products are manufactured in Rajkot using high-grade stainless steel to ensure your luxury, comfort, and longevity are fully taken care of.
        </p>
      </section>
    </div>
  );
}