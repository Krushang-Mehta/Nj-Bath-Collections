"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { productSeriesList } from "@/data/data";

export default function OurSeries() {
  const sectionRef = useRef(null);
  const homeSeriesList = productSeriesList.slice(0, 8);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const section = sectionRef.current;
    if (!section) return;

    const curtains = section.querySelectorAll(".series-reveal-curtain");
    const images = section.querySelectorAll(".series-image");

    gsap.killTweensOf([curtains, images]);

    gsap.set(curtains, { transformOrigin: "right center", scaleX: 1 });
    gsap.set(images, { scale: 1.15 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    tl.to(curtains, {
      scaleX: 0,
      duration: 0.95,
      stagger: 0.12,
      ease: "power3.inOut",
    }).to(
      images,
      {
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        // FIX: Clear GSAP's inline scale so CSS/Tailwind transitions can work afterwards
        clearProps: "scale", 
      },
      "-=0.95"
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-bgCream py-20 px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Block */}
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-[1px] bg-brandGold/45" />
            <span className="text-small font-bold tracking-widest text-brandGold uppercase">
              Our Series
            </span>
            <div className="w-12 h-[1px] bg-brandGold/45" />
          </div>
          <h2 className="text-h2 font-extrabold text-foreground tracking-tight">
            Types of luxury <span className="text-brandAccent">products</span>
          </h2>
        </div>

        {/* Series Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeSeriesList.map((series, idx) => (
            <Link
              key={idx}
              href={`/products/${series.slug}`}
              className="series-card group relative aspect-square rounded-2xl overflow-hidden border border-brandGold/35 hover:border-brandGold/70 hover:shadow-lg transition-all duration-500 bg-[#0B0F19] z-20"
            >
              {/* GSAP Reveal Curtain Overlay */}
              <div className="series-reveal-curtain absolute inset-0 bg-[#0B0F19] z-25" />

              {/* Responsive Mapped NextJS Optimization Image */}
              <Image
                src={series.image}
                alt={series.name}
                fill
                // OPTIMIZATION: Striking a balance between high-res display and fast download
                quality={70} 
                // OPTIMIZATION: Helps Next.js calculate exact pixel density targets
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                // FIX: Changed hover:scale-125 to group-hover:scale-125
                className="series-image object-cover scale-100 group-hover:scale-125 transition-transform duration-700 ease-out z-0"
              />

              {/* Volumetric Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10" />

              {/* Bottom Card Content Block */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between z-30">
                <div className="space-y-1">
                  <h3 className="text-h4 font-bold text-white tracking-tight">
                    {series.name}
                  </h3>
                  <p className="text-[12px] font-medium text-brandGold/85 tracking-wide leading-none">
                    {series.slogan}
                  </p>
                </div>
                <div className="p-2.5 rounded-full bg-brandGold text-white group-hover:bg-brandAccent transition-all duration-300 transform group-hover:scale-110 shadow-md">
                  <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}