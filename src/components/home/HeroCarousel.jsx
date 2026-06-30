"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

const heroSlidesData = [
  {
    title: "Make the Aesthetic Choice",
    ctaText: "Explore More",
    ctaLink: "/products/lunox-series",
  },
  {
    title: "There's Beauty within Imperfection",
    ctaText: "Explore More",
    ctaLink: "/products/alpha-series",
  },
  {
    title: "Shaping Up Beautifully",
    ctaText: "Explore More",
    ctaLink: "/products/octra-series",
  },
];

// Reusable styling configurations stored as variables to maintain DRY code standards
const carouselStyles = {
  // Bold light-colored heading (Uses flex wrap to handle text breaks gracefully on all viewport widths)
  heroTitle: "text-[28px] md:text-[48px] lg:text-[64px] font-light text-white leading-[1.2] tracking-tight drop-shadow-lg max-w-[640px] flex flex-wrap justify-center md:justify-start",
  
  // Premium blue-accented Prismatic Glass CTA Button with glowing hover transformations
  ctaButton: "hero-prismoglass-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold backdrop-blur-md bg-brandAccent/15 border border-brandAccent/40 hover:bg-brandAccent/30 hover:border-brandAccent/60 hover:scale-[1.03] transition-all duration-300 ease-out shadow-lg shadow-brandAccent/10 hover:shadow-brandAccent/25 hover:shadow-[0_0_25px_rgba(2,132,199,0.3)] cursor-pointer"
};

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const heroContainerRef = useRef(null);

  // 1. Cycle slides with a fixed timer of 3.33 seconds (3330 ms)
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlidesData.length);
    }, 5000);

    return () => clearInterval(slideTimer);
  }, []);

  // 2. Trigger typographic stagger reveal using GSAP when activeSlide changes
  useEffect(() => {
    if (!heroContainerRef.current) return;

    // Target split word elements and the CTA button
    const words = heroContainerRef.current.querySelectorAll(".hero-word");
    const ctaButton = heroContainerRef.current.querySelector(".hero-prismoglass-btn");

    // Clear any active anims on these nodes to prevent overlap or timing conflicts
    gsap.killTweensOf([words, ctaButton]);

    // Initial State: Mask words down below container limits, hide CTA button
    gsap.set(words, { y: "105%", opacity: 0 });
    gsap.set(ctaButton, { y: 25, opacity: 0 });

    // GSAP Reveal Timeline
    const activeTimeline = gsap.timeline();

    activeTimeline
      .to(words, {
        y: "0%",
        opacity: 1,
        duration: 0.65,
        stagger: 0.05, // One by one sequential delay reveal
        ease: "power3.out",
      })
      .to(
        ctaButton,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.35" // Overlaps timeline slightly for premium fluid motion
      );

  }, [activeSlide]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-end">
      
      {/* Background Full Screen Loop Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-65"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Solid/Gradient Overlay to secure high contrast readability (Uses variables from globals.css) */}
      <div className="absolute inset-0 bg-gradient-to-t from-heroOverlayStart via-heroOverlayMid to-transparent z-10" />

      {/* Main Content Card Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
        
        {/* Animated Slide Content Box */}
        <div
          ref={heroContainerRef}
          className="flex flex-col items-center text-center md:items-start md:text-left space-y-8 max-w-5xl"
        >
          {/* Split heading text into distinct inline-blocks for vertical masking animation */}
          <h1 className={carouselStyles.heroTitle}>
            {heroSlidesData[activeSlide].title.split(" ").map((word, idx) => (
              <span
                key={idx}
                className="inline-block overflow-hidden mr-[0.25em] last:mr-0 align-middle"
              >
                <span className="hero-word inline-block origin-left">
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* Dynamic CTA button with entry slide animations */}
          <Link
            href={heroSlidesData[activeSlide].ctaLink}
            className={carouselStyles.ctaButton}
          >
            <span>{heroSlidesData[activeSlide].ctaText}</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}