"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { productSeriesList } from "@/data/data";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  // Monitor screen vertical scroll to change header background states
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsMobileDropdownOpen(false); // Reset dropdown when closing/opening drawer
  };

  return (
    <header className="fixed top-6 left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 max-w-7xl mx-auto z-50">
      
      {/* Floating Capsule Navbar Container */}
      <div
        className={`w-full  border transition-all duration-300 ease-in-out px-6 py-3.5 flex items-center justify-between ${
          isScrolled
            ? "bg-navBgScrolled border-navBorderScrolled text-navTextScrolled shadow-lg shadow-black/[0.03] backdrop-blur-xl rounded-xl"
            : "bg-navBgTransparent border-navBorderTransparent text-navTextTransparent backdrop-blur-sm rounded-md"
        }`}
      >
        {/* Left Side: Brand Logo Link */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="NJ Bath Collection"
            // OPTIMIZATION: Explicit layout footprints completely eliminate layout shift (CLS)
            width={180}
            height={48}
            // OPTIMIZATION: The logo is the highest-priority visual asset on initialization
            priority
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Center Side: Desktop Nav Menu Links */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link
            href="/"
            className={`text-body-desktop font-semibold transition-colors duration-200 ${
              isScrolled ? "text-white hover:text-white/80" : "text-navTextTransparent hover:text-navTextTransparent/80"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-body-desktop font-semibold transition-colors duration-200 ${
              isScrolled ? "text-white hover:text-white/80" : "text-navTextTransparent hover:text-navTextTransparent/80"
            }`}
          >
            About us
          </Link>

          {/* Product Hover Trigger (Contains invisible envelope to bridge hover gaps) */}
          <div className="relative group py-2">
            <button
              className={`flex items-center gap-1 text-body-desktop font-semibold transition-colors duration-200 focus:outline-none cursor-pointer ${
                isScrolled ? "text-white hover:text-white/80" : "text-navTextTransparent hover:text-navTextTransparent/80"
              }`}
            >
              <span>Products</span>
              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
            </button>

            {/* Hover Floating Box Dropdown (Uses top padding of 'pt-2' to eliminate the cursor break gap) */}
            <div className="absolute top-full left-0 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-out transform translate-y-1 group-hover:translate-y-0 z-50">
              <div
                className={`w-64 rounded-xl border p-2.5 shadow-xl ${
                  isScrolled
                    ? "bg-navBgScrolled border-white/10 text-white"
                    : "bg-background border-navBorderScrolled text-foreground"
                }`}
              >
                {/* Full list layout display option for clean rendering on desktops & tablets */}
                <div className="flex flex-col space-y-0.5 pr-1">
                  {productSeriesList.map((series, idx) => (
                    <Link
                      key={idx}
                      href={`/products/${series.slug}`}
                      className={`block px-4 py-2.5 text-small font-medium rounded-lg transition-colors duration-150 ${
                        isScrolled
                          ? "text-white/85 hover:bg-white/10 hover:text-white"
                          : "text-foreground hover:bg-brandHighlight hover:text-white"
                      }`}
                    >
                      {series.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/contact"
            className={`text-body-desktop font-semibold transition-colors duration-200 ${
              isScrolled ? "text-white hover:text-white/80" : "text-navTextTransparent hover:text-navTextTransparent/80"
            }`}
          >
            Contact us
          </Link>
        </div>

        {/* Right Side: Action CTA and Menu toggles */}
        <div className="flex items-center gap-3">
          
          {/* Desktop CTA Call Button */}
          <Link
            href="tel:+919662157189"
            className={`hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-sm ${
              isScrolled
                ? "bg-background text-navMobileBg hover:bg-bgSecondary hover:shadow-md"
                : "bg-white text-foreground hover:bg-bgSecondary"
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>Book A Call</span>
          </Link>

          {/* Mobile Hamburger Trigger (Square Button Box) */}
          <button
            onClick={toggleMobileMenu}
            className={`lg:hidden p-2.5 rounded-xl border transition-all duration-200 ${
              isMenuOpen
                ? "bg-background border-background text-foreground shadow-md cursor-pointer"
                : isScrolled
                ? "bg-navBgScrolled border-white/20 text-white shadow-sm cursor-pointer hover:bg-navBgScrolled/90"
                : "bg-background border-background text-foreground shadow-md cursor-pointer"
            }`}
            aria-label="Toggle Navigation Drawer Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Floating Dropdown Mobile Menu Drawer (Framer Motion Integration) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden lg:hidden w-full mt-2 p-6 rounded-2xl bg-navMobileBg border border-navMobileBorder shadow-2xl flex flex-col space-y-4 text-navMobileText z-40 origin-top"
          >
            <Link
              onClick={toggleMobileMenu}
              href="/"
              className="text-body-mobile font-semibold text-navMobileText/90 hover:text-brandAccent py-2 border-b border-navMobileDivider"
            >
              Home
            </Link>
            <Link
              onClick={toggleMobileMenu}
              href="/about"
              className="text-body-mobile font-semibold text-navMobileText/90 hover:text-brandAccent py-2 border-b border-navMobileDivider"
            >
              About Us
            </Link>

            {/* Mobile Product Accordion */}
            <div className="flex flex-col">
              <button
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                className="flex items-center justify-between text-body-mobile font-semibold text-navMobileText/90 hover:text-brandAccent py-2 border-b border-navMobileDivider focus:outline-none"
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-800 ${
                    isMobileDropdownOpen ? "rotate-180 text-brandAccent" : ""
                  }`}
                />
              </button>

              {isMobileDropdownOpen && (
                <div className="mt-2 pl-4 max-h-48 overflow-y-auto border-l border-white/15 bg-white/5 rounded-lg p-2.5 space-y-1">
                  {productSeriesList.map((series, idx) => (
                    <Link
                      key={idx}
                      onClick={toggleMobileMenu}
                      href={`/products/${series.slug}`}
                      className="block py-1.5 text-small font-medium text-navMobileText/70 hover:text-brandAccent"
                    >
                      {series.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              onClick={toggleMobileMenu}
              href="/contact"
              className="text-body-mobile font-semibold text-navMobileText/90 hover:text-brandAccent py-2"
            >
              Contact us
            </Link>

            {/* Drawer Book call link */}
            <div className="pt-2">
              <Link
                onClick={toggleMobileMenu}
                href="tel:+919662157189"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold bg-background text-foreground hover:bg-background/90 transition-colors shadow-lg"
              >
                <PhoneCall className="w-4.5 h-4.5 text-brandHighlight" />
                <span>Book A Call</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}