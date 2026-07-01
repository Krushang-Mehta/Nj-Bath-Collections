"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutSection, aboutFeatures } from "@/data/AboutData";

export default function AboutSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        const section = sectionRef.current;
        if (!section) return;

        const revealMask = section.querySelector(".about-reveal-mask");
        const revealImg = section.querySelector(".about-reveal-img");
        const textElements = section.querySelectorAll(".about-text-element");
        const featureCards = section.querySelectorAll(".about-feature-card");

        // Prevent animation conflicts on fast re-renders
        gsap.killTweensOf([revealMask, revealImg, textElements, featureCards]);

        // Initial States
        gsap.set(revealMask, { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });
        gsap.set(revealImg, { scale: 1.2 });
        gsap.set(textElements, { y: 30, opacity: 0 });

        // Give cards plenty of runway from the right side
        gsap.set(featureCards, { x: 350, opacity: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 70%", 
                toggleActions: "play none none none",
            },
        });

        // Animation Sequence
        tl.to(revealMask, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.4,
            ease: "power4.inOut",
        })
        .to(revealImg, {
            scale: 1,
            duration: 1.4,
            ease: "power4.inOut",
        }, "<")
        .to(
            textElements,
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
            },
            "-=0.8"
        )
        .to(
            featureCards,
            {
                x: 0,
                opacity: 1,
                duration: 1.2,       // Longer duration allows the "queue" to glide fluidly
                stagger: 0.18,       // Keeps a clear, distinct separation between each card's arrival
                ease: "power4.out",  // A silky, elegant deceleration curve that stops jittering
            },
            "-=0.7"              // Overlaps perfectly as the header text settles
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
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Main Grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Column: Styled Brand Image Capsule with Wiping Reveal */}
                    {/* Note: Added "relative" layout context so Next.js absolute positioning functions perfectly */}
                    <div className="about-reveal-mask relative w-full h-[300px] sm:h-[400px] lg:h-[480px] rounded-2xl overflow-hidden shadow-lg border border-black/[0.03] bg-neutral-200">
                        <Image
                            src="/about.png"
                            alt="Luxury Sanitary Ware Showcase"
                            fill
                            priority
                            quality={75}
                            // Matches layout: 100vw on mobile, roughly 50vw on desktops maxing out inside a 1280px wrapper
                            sizes="(max-width: 1024px) 100vw, 600px"
                            className="about-reveal-img object-cover will-change-transform"
                        />
                    </div>

                    {/* Right Column: Text narrative content blocks */}
                    <div className="flex flex-col space-y-6">

                        <span className="about-text-element inline-block self-start text-small font-bold uppercase tracking-widest text-brandAccent bg-brandAccent/10 px-4 py-1.5 rounded-full">
                            {aboutSection.badge}
                        </span>

                        <h2 className="about-text-element text-h2 leading-tight tracking-tight text-foreground font-extrabold">
                            {aboutSection.title}{" "}
                            <span className="text-brandAccent">
                                {aboutSection.highlightedTitle}
                            </span>
                        </h2> 

                        <div className="space-y-4">
                            <p className="about-text-element text-body text-textMuted leading-relaxed">
                                {aboutSection.description}
                            </p>
                            <p className="about-text-element text-body text-textMuted leading-relaxed">
                                {aboutSection.description2}
                            </p>
                        </div>

                    </div>

                </div>

                {/* Bottom Area: Insight Feature Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {aboutFeatures.map((feature) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={feature.id}
                                className="about-feature-card flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-white to-bgSecondary/50 shadow-md shadow-black/[0.02] hover:shadow-lg hover:shadow-black/[0.04] transition-all duration-300"
                            >
                                {/* Rounded Icon Box */}
                                <div className="p-3 rounded-xl bg-bgSecondary text-brandAccent shrink-0">
                                    <IconComponent className="w-5 h-5" />
                                </div>

                                {/* Text Block */}
                                <div className="space-y-1">
                                    <h4 className="text-small font-bold text-foreground">
                                        {feature.title}
                                    </h4>
                                    <p className="text-[13px] text-textMuted leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}