"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection({
  title = "Default Title",
  bgImage = "/abouthero.png",
  subtitle = "NJ Bath Collection",
}) {
  const containerRef = useRef(null);
  const bgImageRef = useRef(null);
  const breadcrumbsRef = useRef(null);
  const titleRef = useRef(null);
  const scrollBadgeRef = useRef(null);

  // Convert string to array of letters for the typing reveal
  const words = title.split(" ");

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const container = containerRef.current;
    const bgImage = bgImageRef.current;
    const titleNode = titleRef.current;
    const breadcrumbsNode = breadcrumbsRef.current;
    const scrollBadgeNode = scrollBadgeRef.current;

    if (!container || !bgImage || !titleNode || !breadcrumbsNode) return;

    const letters = titleNode.querySelectorAll(".char-span");

    // Clean up active animations to prevent glitches during navigation transitions
    gsap.killTweensOf([bgImage, breadcrumbsNode, letters, scrollBadgeNode]);

    // 1. Initial State Setup
    gsap.set(bgImage, { scale: 1.25 });
    gsap.set(breadcrumbsNode, { y: 15, opacity: 0 });
    gsap.set(letters, { opacity: 0, y: 15, scale: 0.9 });
    
    if (scrollBadgeNode) {
      gsap.set(scrollBadgeNode, { opacity: 0, y: 20 });
    }

    const entranceTimeline = gsap.timeline();

    // 2. Typing & Load-in Cascade Transition
    entranceTimeline
      .to(bgImage, {
        scale: 1,
        duration: 1.8,
        ease: "power3.out",
      })
      .to(
        breadcrumbsNode,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=1.4"
      )
      .to(
        letters,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.03,
          ease: "power2.out",
        },
        "-=1.1"
      );

    // Fade in the scroll badge cleanly right after the text finishes typing
    if (scrollBadgeNode) {
      entranceTimeline.to(
        scrollBadgeNode,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            // Initiate a continuous gentle luxury bouncing loop once visible
            gsap.to(scrollBadgeNode.querySelector(".badge-arrow"), {
              y: 6,
              duration: 0.8,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
            });
          },
        },
        "-=0.4"
      );
    }

    // 3. Parallax Scroll Behavior
    gsap.to(bgImage, {
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      yPercent: 20,
      ease: "none",
    });

    // Fade out the scroll badge dynamically as the user scrolls down past the fold
    if (scrollBadgeNode) {
      gsap.to(scrollBadgeNode, {
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "20% top",
          scrub: true,
        },
        opacity: 0,
        y: -10,
        ease: "none",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [title]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[45vh] lg:h-screen overflow-hidden bg-black flex items-end"
    >
      {/* Background Image Wrapper */}
      <div ref={bgImageRef} className="absolute inset-0 w-full h-full will-change-transform">
        <Image
          src={bgImage}
          alt={`${title} Background View`}
          fill
          priority
          sizes="100vw"
          className="object-cover z-0 opacity-65"
          draggable="false"
        />
      </div>

      {/* Shadow Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

      {/* Content Area */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-12 lg:pb-24 flex flex-col justify-between h-full pt-24 lg:pt-0">
        
        {/* Spacer to push text content down dynamically */}
        <div className="flex-grow flex items-end">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-4 max-w-4xl w-full">
            
            {/* Breadcrumbs Navigation Stack */}
            <div
              ref={breadcrumbsRef}
              className="flex items-center gap-2 text-small font-semibold text-brandGold/90 uppercase tracking-widest bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">{subtitle}</span>
            </div>

            {/* Large Page Title Heading with HTML Splitting */}
            <h1
              ref={titleRef}
              className="text-[36px] sm:text-[52px] lg:text-[72px] font-medium text-white leading-tight tracking-tight drop-shadow-md select-none"
            >
              {words.map((word, wordIdx) => (
                <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
                  {word.split("").map((char, charIdx) => (
                    <span key={charIdx} className="char-span inline-block origin-bottom">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

          </div>
        </div>

        {/* ==========================================================================
            SCROLL BADGE INDICATOR (Hidden on mobile/tablet, only functional on desktop h-screen)
            ========================================================================== */}
        <div 
          ref={scrollBadgeRef}
          className="hidden lg:flex flex-col items-center gap-2 self-center lg:self-start mt-8"
        >
          <span className="text-[10px] font-bold tracking-widest text-brandGold/85 uppercase">
            Scroll to Explore
          </span>
          <div className="flex items-center justify-center w-8 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm p-1 shadow-md">
            <ArrowDown className="badge-arrow w-4 h-4 text-white" />
          </div>
        </div>

      </div>
    </section>
  );
}