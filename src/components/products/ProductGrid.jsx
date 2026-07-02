"use client";

import { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProductGrid({ products = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const gridContainerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const container = gridContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(".scroll-target-card");
    gsap.killTweensOf(cards);

    // Initial state: Masked tightly into the center point of each card
    gsap.set(cards, { clipPath: "inset(50% 50% 50% 50%)", opacity: 0.3 });

    // Item-by-item center mask wipe as each card enters the viewport
    cards.forEach((card) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        duration: 0.9,
        ease: "power4.inOut",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [products]);

  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeIndex]);

  if (!products || products.length === 0) {
    return (
      <div className="w-full text-center py-24 bg-bgCream">
        <p className="text-body text-textMuted font-medium">No premium hardware additions found inside this series.</p>
      </div>
    );
  }

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-bgCream py-16 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Sync Meta Label Grid Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <span className="text-small font-bold uppercase tracking-widest text-brandGold">
            // Collection Catalog
          </span>
          <span className="text-small font-medium text-textMuted">
            Showing {products.length} Items
          </span>
        </div>

        {/* Refined 4-Column Symmetrical Grid */}
        <div 
          ref={gridContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {products.map((product, idx) => (
            <div key={product.id} className="scroll-target-card will-change-transform rounded-md overflow-hidden">
              <ProductCard 
                product={product} 
                onSelect={() => setActiveIndex(idx)} 
              />
            </div>
          ))}
        </div>

        {/* ==========================================================================
            RESPONSIVE LIGHTBOX EXPANSION SLIDER (Standard Modal Opening)
            ========================================================================== */}
        {activeIndex !== null && (
          <div 
            onClick={() => setActiveIndex(null)}
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Left Nav Arrow */}
            <button 
              onClick={handlePrev}
              className="absolute left-4 lg:left-8 z-50 p-3 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Modal Content Frame */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[90vw] max-h-[60vh] sm:max-w-[80vw] sm:max-h-[70vh] lg:max-w-4xl lg:max-h-[80vh] rounded-md overflow-hidden bg-white shadow-2xl border border-white/10 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-200"
            >
              <button 
                onClick={() => setActiveIndex(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white border border-white/10 transition-transform hover:scale-105"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full h-full min-h-[40vh] sm:min-h-[50vh] lg:min-h-[70vh]">
                <img
                  src={products[activeIndex].image}
                  alt={products[activeIndex].name}
                  className="w-full h-full object-contain bg-neutral-900"
                  draggable="false"
                />
              </div>

              <div className="w-full bg-white py-4 px-6 border-t border-gray-100 text-center">
                <h4 className="text-[16px] font-bold text-foreground tracking-tight">
                  {products[activeIndex].name}
                </h4>
              </div>
            </div>

            {/* Right Nav Arrow */}
            <button 
              onClick={handleNext}
              className="absolute right-4 lg:right-8 z-50 p-3 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}