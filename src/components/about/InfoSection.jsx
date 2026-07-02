"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function InfoSection() {
  const containerRef = useRef(null);
  const logoWrapperRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const container = containerRef.current;
    if (!container) return;

    // Target rows for structural staggered triggers
    const rows = container.querySelectorAll(".journey-row");

    rows.forEach((row, index) => {
      const chars = row.querySelectorAll(".char-span");
      const fadeElements = row.querySelectorAll(".journey-fade");
      const curtain = row.querySelector(".journey-curtain");
      const image = row.querySelector(".journey-image");

      gsap.killTweensOf([chars, fadeElements, curtain, image]);

      // --- INITIAL STATES ---
      gsap.set(chars, { opacity: 0, y: 25 });
      gsap.set(fadeElements, { opacity: 0, y: 25 });
      if (curtain) gsap.set(curtain, { clipPath: "inset(0% 100% 0% 0%)" });
      if (image) gsap.set(image, { scale: 1.2 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      const isMobileTablet = window.innerWidth < 1024;

      // DELAY FOR SECOND ROW ON HANDHELD DEVICES: Image first, text second
      if (index === 1 && isMobileTablet) {
        if (curtain && image) {
          tl.to(curtain, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.0,
            ease: "power4.inOut",
          }).to(image, {
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          }, "-=1.0");
        }

        if (chars.length > 0) {
          tl.to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.015,
            duration: 0.4,
            ease: "power3.out",
          });
        }

        if (fadeElements.length > 0) {
          tl.to(fadeElements, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
          });
        }
      } else {
        // STANDARD SEQUENCE (Row 1, Row 3, and Desktop Row 2)
        if (chars.length > 0) {
          tl.to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.015,
            duration: 0.4,
            ease: "power3.out",
          });
        }

        if (fadeElements.length > 0) {
          tl.to(fadeElements, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
          }, "-=0.2");
        }

        if (curtain && image) {
          tl.to(curtain, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.0,
            ease: "power4.inOut",
          }, "-=0.5").to(image, {
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          }, "-=1.0");
        }
      }
    });

    // --- SECTION 3: LOGO 3D FLOATING & SHADOW ENGINE ---
    const logoWrapper = logoWrapperRef.current;
    if (logoWrapper) {
      const logoDisk = logoWrapper.querySelector(".floating-logo-disk");
      const logoShadow = logoWrapper.querySelector(".floating-logo-shadow");

      gsap.fromTo(
        logoWrapper,
        { opacity: 0, scale: 0.9, y: 30 },
        {
          scrollTrigger: {
            trigger: logoWrapper,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(logoDisk, {
              y: -12,
              duration: 2.2,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
            });

            gsap.to(logoShadow, {
              scale: 0.85,
              opacity: 0.35,
              duration: 2.2,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
            });
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const block1Heading = "Engineering Pure".split(" ");
  const block2Heading = "Focus On Quality & Efficiency".split(" ");
  const block3Heading = "Trusted in local as well as export markets, creating true".split(" ");

  return (
    <section
      ref={containerRef}
      className="bg-[#f8f6f1] py-16 lg:py-24 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 space-y-16 lg:space-y-24">
        
        {/* ==========================================================================
            BLOCK 1: Glassmorphism Badge & Heading with End Accent Text
            ========================================================================== */}
        <div className="journey-row grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-3">
            {/* Formatted Glass Style Badge */}
            <div className="journey-fade inline-block px-4 py-1.5 rounded-full bg-brandGold/10 backdrop-blur-lg shadow-sm">
              <span className="text-[12px] font-bold uppercase tracking-widest text-brandGold block">
                Welcome To NJ Bath!
              </span>
            </div>
            
            <h2 className="text-h2 font-extrabold text-foreground tracking-tight leading-tight select-none pt-1">
              {block1Heading.map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
                  {word.split("").map((char, cIdx) => (
                    <span key={cIdx} className="char-span inline-block">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
              <span className="inline-block whitespace-nowrap text-brandAccent">
                {"Comfort".split("").map((char, cIdx) => (
                  <span key={cIdx} className="char-span inline-block">
                    {char}
                  </span>
                ))}
              </span>
            </h2>
          </div>
          
          <div className="lg:col-span-7 lg:pt-12 journey-fade">
            <p className="text-[18px] md:text-[19px] lg:text-[20px] font-medium text-textMuted leading-relaxed text-justify">
              Unique Steel Tech is the leading name in Bathroom Accessories having its Manufacturing facilities 
              in Rajkot—the Industrial Hub of Gujarat. Unique Steel Tech under the Brand Name of 
              <strong> &ldquo;NJ Bath Collection&rdquo;</strong> is providing a wide range of solutions to various 
              needs of a Luxurious Bathroom.
            </p>
          </div>
        </div>

        {/* ==========================================================================
            BLOCK 2: Delayed Animation Sequence for Mobile & Restored Gold Header Style
            ========================================================================== */}
        <div className="journey-row grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
            {/* Restored to Gold Label Header Style */}
            <span className="text-[11px] font-bold tracking-widest text-brandGold uppercase block">
              {block2Heading.map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
                  {word.split("").map((char, cIdx) => (
                    <span key={cIdx} className="char-span inline-block">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </span>

            <p className="journey-fade text-[18px] md:text-[19px] lg:text-[20px] font-medium text-textMuted leading-relaxed text-justify">
              The &ldquo;NJ Bath Collection&rdquo; takes equal care of Luxury, Comfort, and Cost all together 
              in order to give a complete Solution and Satisfaction to its Clients. Ever since its existence, 
              the collection has been solely focused on Quality and Cost Efficiency.
            </p>
            <p className="journey-fade text-[18px] md:text-[19px] lg:text-[20px] font-medium text-textMuted leading-relaxed text-justify">
              Our continuous efforts to generate the Best Products in the Market have earned us a loyal base 
              of genuine customers who support us through all market conditions. With the help of this strong 
              client relationship, we deliver better results each time.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2 w-full">
            <div className="journey-curtain w-full aspect-[16/11] lg:aspect-[16/11.5] relative rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-200/40 will-change-transform">
              <Image
                src="/info.jpg"
                alt="NJ Bath Collection Corporate Overview"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="journey-image object-cover will-change-transform"
                draggable="false"
              />
            </div>
          </div>

        </div>

        {/* ==========================================================================
            BLOCK 3: 3D Floating Stamp Object Left & Heading with End Accent Text Right
            ========================================================================== */}
        <div className="journey-row grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-6 border-t border-gray-200/60">
          
          {/* Left Column: 3D Floating Logo Structure with Shadow Shifter */}
          <div 
            ref={logoWrapperRef} 
            className="lg:col-span-4 flex flex-col items-center justify-center transform-gpu will-change-transform pb-6 lg:pb-0"
          >
            <div className="relative w-40 h-44 flex flex-col items-center justify-start">
              
              {/* Primary Floating Object Core */}
              <div className="floating-logo-disk relative w-32 h-32 rounded-full bg-white p-3 shadow-lg border border-brandGold/15 flex items-center justify-center z-10 transform-gpu will-change-transform">
                <Image
                  src="/logocircle.png" 
                  alt="NJ Bath Circular Crest"
                  fill
                  sizes="128px"
                  className="object-contain p-2"
                  draggable="false"
                />
              </div>

              {/* Dynamic Altitude Shadow */}
              <div className="floating-logo-shadow absolute bottom-2 w-24 h-2 bg-slate-900/15 rounded-full blur-sm z-0 transform-gpu will-change-transform origin-center" />
            </div>
          </div>

          {/* Right Column: Narrative with letter animations and custom sizing */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-h3 font-bold text-foreground tracking-tight max-w-2xl text-left select-none leading-tight">
              {block3Heading.map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.22em]">
                  {word.split("").map((char, cIdx) => (
                    <span key={cIdx} className="char-span inline-block">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
              <span className="inline-block whitespace-nowrap text-brandAccent">
                {"win-win environments.".split(" ").map((word, wIdx) => (
                  <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.22em]">
                    {word.split("").map((char, cIdx) => (
                      <span key={cIdx} className="char-span inline-block">
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            </h3>
            
            <div className="journey-fade space-y-4">
              <p className="text-[18px] md:text-[19px] lg:text-[20px] font-medium text-textMuted leading-relaxed text-justify">
                We are glad to inform you that we maintain exceptionally high quality standards, ensuring our products stand out on their own. Our wide catalog features premium selections including Soap Dishes, Liquid Soap Dispensers, and more.
              </p>

              <p className="text-[18px] md:text-[19px] lg:text-[20px] font-medium text-textMuted leading-relaxed text-justify">
                We manufacture these products in high-grade <strong>SS-202</strong> and <strong>SS-304</strong> stainless steel alloys so that long-term cost-efficiency and premium structural lifetime durability are perfectly balanced together.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}