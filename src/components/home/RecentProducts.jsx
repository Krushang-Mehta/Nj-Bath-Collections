"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { latestProductList } from "@/data/data";

export default function RecentProducts() {
  const totalOriginalItems = latestProductList.length;

  // Symmetrical starting point in the exact center block of our triplicated array
  const [activeIndex, setActiveIndex] = useState(totalOriginalItems);
  const [windowWidth, setWindowWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(340);
  const [cardGap, setCardGap] = useState(24);

  const trackRef = useRef(null);
  const autoplayRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);
  const isAnimating = useRef(false); 

  // Triplicate list to facilitate seamless infinite wrapping
  const infiniteSlides = [...latestProductList, ...latestProductList, ...latestProductList];

  // 1. Maintain dynamic browser width & layout parameter tracking
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleLayout = () => {
        setWindowWidth(window.innerWidth);
        if (window.innerWidth < 768) {
          setCardWidth(280); // Mobile card width
          setCardGap(16);
        } else if (window.innerWidth < 1024) {
          setCardWidth(310); // Tablet card width
          setCardGap(20);
        } else {
          setCardWidth(340); // Desktop card width
          setCardGap(24);
        }
      };

      handleLayout();
      window.addEventListener("resize", handleLayout);
      return () => window.removeEventListener("resize", handleLayout);
    }
  }, []);

  // 2. Autoplay Timer
  const resetAutoplayTimer = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    autoplayRef.current = setInterval(() => {
      handleNext();
    }, 3500);
  };

  useEffect(() => {
    resetAutoplayTimer();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [activeIndex]);

  const handleNext = () => {
    if (isAnimating.current) return;
    setActiveIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isAnimating.current) return;
    setActiveIndex((prev) => prev - 1);
  };

  // 3. Touch Swipe Gesture Handlers
  const handleTouchStart = (e) => {
    if (isAnimating.current) return;
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    isSwiping.current = false;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    isSwiping.current = true;
  };

  const handleTouchEnd = () => {
    if (isSwiping.current && !isAnimating.current) {
      const diff = touchStartX.current - touchEndX.current;
      const minSwipeDistance = 50;

      if (Math.abs(diff) > minSwipeDistance) {
        if (diff > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
    isSwiping.current = false;
  };

  // 4. Mathematical Central Alignment Tracking Engine
  const getTrackX = (index) => {
    const centerOffset = windowWidth / 2;
    return centerOffset - (index * (cardWidth + cardGap)) - (cardWidth / 2);
  };

  // 5. Unified Hardware Accelerated Transition & Instant Snap Engine
  useEffect(() => {
    if (!trackRef.current || windowWidth === 0) return;

    isAnimating.current = true;
    const targetX = getTrackX(activeIndex);

    gsap.to(trackRef.current, {
      x: targetX,
      duration: 0.65,
      ease: "power2.out",
      onComplete: () => {
        // --- SEAMLESS BOUNDARY CHECK CRADLE ---
        if (activeIndex >= totalOriginalItems * 2) {
          const resetIndex = activeIndex - totalOriginalItems;
          const resetX = getTrackX(resetIndex);
          
          gsap.set(trackRef.current, { x: resetX });
          setActiveIndex(resetIndex);
        } 
        else if (activeIndex < totalOriginalItems) {
          const resetIndex = activeIndex + totalOriginalItems;
          const resetX = getTrackX(resetIndex);
          
          gsap.set(trackRef.current, { x: resetX });
          setActiveIndex(resetIndex);
        }
        
        isAnimating.current = false;
      },
    });
  }, [activeIndex, cardWidth, cardGap, windowWidth, totalOriginalItems]);

  return (
    <section className="bg-bgCream py-20 overflow-hidden relative border-t border-brandGold/15">
      <div className="space-y-12">
        
        {/* Header Block */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
          <div className="text-center md:text-left space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-12 h-[1px] bg-brandGold/45" />
              <span className="text-small font-bold tracking-widest text-brandGold uppercase">
                Our Latest Products
              </span>
            </div>
            <h2 className="text-h2 font-extrabold text-foreground tracking-tight">
              Our Recent <span className="text-brandAccent">Products</span>
            </h2>
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl border border-brandGold/40 bg-white/10 hover:bg-brandHighlight hover:text-white transition-all duration-300 text-foreground cursor-pointer shadow-sm"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-xl border border-brandGold/40 bg-white/10 hover:bg-brandHighlight hover:text-white transition-all duration-300 text-foreground cursor-pointer shadow-sm"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* UNIFIED CAROUSEL TRACK */}
        <div className="relative w-full h-[520px] overflow-hidden">
          <div
            ref={trackRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex items-center absolute left-0 top-0 h-full"
            style={{
              width: `${infiniteSlides.length * (cardWidth + cardGap)}px`,
              gap: `${cardGap}px`,
            }}
          >
            {infiniteSlides.map((slide, idx) => {
              // FIX: Modulus calculation flags cloned identical cards as active concurrently
              const isActive = (idx % totalOriginalItems) === (activeIndex % totalOriginalItems);
              
              return (
                <div
                  key={idx}
                  style={{ width: `${cardWidth}px` }}
                  className={`relative rounded-2xl overflow-hidden border shrink-0 select-none transition-all duration-700 ease-out origin-center h-[380px] sm:h-[420px] ${
                    isActive
                      ? "border-brandGold opacity-100 shadow-2xl shadow-black/10 z-10 scale-y-[1.12] scale-x-[1.05]"
                      : "border-brandGold/15 opacity-80 scale-y-[0.88] scale-x-[0.92] blur-none z-0"
                  }`}
                >
                  {/* Slide Background Image */}
                  <Image
                    src={slide.image}
                    alt={slide.name}
                    fill
                    sizes={`${cardWidth}px`}
                    className="object-cover"
                    draggable="false"
                    priority={isActive}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent z-10" />

                  {/* Floating Prismoglass Card details */}
                  <div
                    className={`absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white space-y-3 z-20 shadow-lg transition-all duration-500 ease-out ${
                      isActive
                        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                        : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-brandGold leading-none block">
                        New Collection
                      </span>
                      <h3 className="text-small sm:text-h4 font-bold tracking-tight">
                        {slide.name}
                      </h3>
                    </div>
                    
                    <Link
                      href={`/products/${slide.slug}`}
                      className="flex items-center justify-between w-full px-4 py-2 sm:py-2.5 rounded-lg bg-brandGold/60 text-white font-bold text-[12px] sm:text-small hover:bg-brandGold transition-all duration-300"
                    >
                      <span>Explore Space</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}