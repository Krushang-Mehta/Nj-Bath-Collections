"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function ProductCard({ product, onSelect }) {
  const cardRef = useRef(null);
  const colorOverlayRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    const card = cardRef.current;
    const colorOverlay = colorOverlayRef.current;
    if (!card || !colorOverlay) return;

    gsap.set(colorOverlay, { clipPath: "inset(100% 0% 0% 0%)" });

    const handleMouseEnter = () => {
      gsap.to(colorOverlay, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(colorOverlay, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 0.5,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onSelect}
      className="group relative w-full aspect-[4/5] cursor-pointer bg-white transform-gpu transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lg"
    >
      {/* 1. BASE LAYER: Grayscale on Desktop, Fallback Full Color on Mobile/Tablet */}
      <div className="absolute inset-0 w-full h-full lg:grayscale lg:contrast-125 transition-all duration-500">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-103"
          draggable="false"
        />
      </div>

      {/* 2. OVERLAY LAYER: Target for the GSAP Bottom-to-Top Color Wipe Reveal */}
      <div 
        ref={colorOverlayRef}
        className="absolute inset-0 w-full h-full z-10 hidden lg:block select-none pointer-events-none"
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
      >
        <Image
          src={product.image}
          alt={`${product.name} Color Profile`}
          fill
          sizes="25vw"
          className="object-cover scale-100 transition-transform duration-700 group-hover:scale-103"
          draggable="false"
        />
      </div>

      {/* Subtle Bottom Ambient Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20 pointer-events-none" />

      {/* 3. FLOATING BADGE LAYER: Styled Prismoglass Pill Container with Reduced Radius */}
      <div className="absolute bottom-4 inset-x-4 z-30 transition-transform duration-500 group-hover:-translate-y-1">
        <div className="prismoglass-card w-full py-3.5 px-4 rounded-md border border-white/30 bg-white/40 backdrop-blur-md shadow-sm transition-colors duration-500 group-hover:bg-white/60 flex items-center justify-between">
          <span className="text-[15px] font-bold tracking-tight text-foreground line-clamp-1">
            {product.name}
          </span>
        </div>
      </div>
    </div>
  );
}