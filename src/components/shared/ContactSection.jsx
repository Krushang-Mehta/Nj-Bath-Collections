"use client";

import { useState, useEffect, useRef } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";

export default function ContactSection({
  badge = "Contact Us",
  title = "Consult our luxury design team.",
  description = "Whether you are selecting bathroom hardware for your dream home or looking for custom project solutions, our expert team is ready to assist.",
}) {
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    userMessage: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Focus state trackers to create the notched-border label effect from your image
  const [focusedField, setFocusedField] = useState({
    fullName: false,
    phoneNumber: false,
    emailAddress: false,
    userMessage: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const section = sectionRef.current;
    if (!section) return;

    const leftBlockElements = section.querySelectorAll(".contact-left-element");
    const rightFormCard = section.querySelector(".contact-form-card");

    gsap.killTweensOf([leftBlockElements, rightFormCard]);

    gsap.set(leftBlockElements, { x: -40, opacity: 0 });
    gsap.set(rightFormCard, { x: 40, opacity: 0, scale: 0.98 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    tl.to(leftBlockElements, {
      x: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: "power2.out",
    }).to(
      rightFormCard,
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (fieldName) => {
    setFocusedField((prev) => ({ ...prev, [fieldName]: true }));
  };

  const handleBlur = (fieldName, value) => {
    // Keep labeled notch raised if the input field contains text
    if (!value) {
      setFocusedField((prev) => ({ ...prev, [fieldName]: false }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
      setFormData({
        fullName: "",
        phoneNumber: "",
        emailAddress: "",
        userMessage: "",
      });
      setFocusedField({
        fullName: false,
        phoneNumber: false,
        emailAddress: false,
        userMessage: false,
      });
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      className="bg-bgSecondary py-20 px-6 md:px-12 lg:px-16 overflow-hidden border-t border-brandGold/10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* ==========================================================================
            LEFT COLUMN: Narrative Stack & Capsule Hover Panels
            ========================================================================== */}
        <div className="space-y-8 flex flex-col items-center text-center md:items-start md:text-left">
          <div className="space-y-4">
            <span className="contact-left-element inline-block text-small font-bold uppercase tracking-widest text-brandGold bg-bgCream border border-brandGold/30 px-4 py-1.5 rounded-full">
              {badge}
            </span>
            <h2 className="contact-left-element text-h2 leading-tight tracking-tight text-foreground font-extrabold max-w-lg">
              {title}
            </h2>
            <p className="contact-left-element text-body text-textMuted leading-relaxed max-w-md">
              {description}
            </p>
          </div>

          {/* Left Reference Links Wrapper */}
          <div className="w-full space-y-4 max-w-lg">
            
            {/* Phone Assistant Card */}
            <div className="contact-left-element group relative flex items-center gap-4 text-left p-4 rounded-2xl border border-transparent hover:border-gray-200 hover:bg-white transition-all duration-300 w-full md:max-w-md">
              <div className="p-3 rounded-xl bg-bgSecondary text-textMuted border border-gray-100 group-hover:bg-brandAccent/10 group-hover:text-brandAccent group-hover:border-transparent transition-all duration-300 shadow-sm shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brandGold leading-none block">
                  PHONE ASSISTANCE
                </span>
                <a href="tel:+919662157189" className="text-body font-bold text-foreground hover:text-brandAccent transition-colors">
                  +91 96621 57189
                </a>
              </div>
            </div>

            {/* Email Support Card */}
            <div className="contact-left-element group relative flex items-center gap-4 text-left p-4 rounded-2xl border border-transparent hover:border-gray-200 hover:bg-white transition-all duration-300 w-full md:max-w-md">
              <div className="p-3 rounded-xl bg-bgSecondary text-textMuted border border-gray-100 group-hover:bg-brandAccent/10 group-hover:text-brandAccent group-hover:border-transparent transition-all duration-300 shadow-sm shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brandGold leading-none block">
                  EMAIL SUPPORT
                </span>
                <a href="mailto:info@njbath.in" className="text-body font-bold text-foreground hover:text-brandAccent transition-colors">
                  info@njbath.in
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="contact-left-element group relative flex items-center gap-4 text-left p-4 rounded-2xl border border-transparent hover:border-gray-200 hover:bg-white transition-all duration-300 w-full md:max-w-md">
              <div className="p-3 rounded-xl bg-bgSecondary text-textMuted border border-gray-100 group-hover:bg-brandAccent/10 group-hover:text-brandAccent group-hover:border-transparent transition-all duration-300 shadow-sm shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brandGold leading-none block">
                  HEADQUARTERS LOCATION
                </span>
                <p className="text-small font-bold text-foreground leading-relaxed">
                  Balaji Industrial Zone-1, Gundasara Road, Ribda, Rajkot - 360311
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================================================
            RIGHT COLUMN: Premium Refactored Minimalist Inquiry Card
            ========================================================================== */}
        <div className="contact-form-card z-20 flex items-center justify-center w-full">
          <div className="w-full max-w-[580px] bg-white border border-gray-200/80 p-6 md:p-10 rounded-[32px] shadow-sm min-h-[500px] flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {!formSuccess ? (
                <motion.div
                  key="contact-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Legend / Subtitle Container Block */}
                  <div className="space-y-1">
                    <h3 className="text-h4 font-bold text-foreground tracking-tight">
                      Submit an Inquiry
                    </h3>
                    <p className="text-small text-textMuted">
                      Fill out the details below. Our design experts respond within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    
                    {/* Input Field: Full Name */}
                    <div className="relative rounded-xl border border-gray-200 focus-within:border-brandGold transition-all duration-200 px-4 py-3 bg-white">
                      <label 
                        className={`absolute left-4 transition-all duration-200 pointer-events-none text-textMuted/60 bg-white px-1 ${
                          focusedField.fullName || formData.fullName
                            ? "-top-2.5 text-[11px] font-bold text-brandAccent"
                            : "top-3.5 text-small"
                        }`}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onFocus={() => handleFocus("fullName")}
                        onBlur={(e) => handleBlur("fullName", e.target.value)}
                        onChange={handleInputChange}
                        className="w-full text-small text-foreground bg-transparent focus:outline-none pt-1"
                      />
                    </div>

                    {/* Symmetrical Half-Row Split */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Input Field: Phone Number */}
                      <div className="relative rounded-xl border border-gray-200 focus-within:border-brandGold transition-all duration-200 px-4 py-3 bg-white">
                        <label 
                          className={`absolute left-4 transition-all duration-200 pointer-events-none text-textMuted/60 bg-white px-1 ${
                            focusedField.phoneNumber || formData.phoneNumber
                              ? "-top-2.5 text-[11px] font-bold text-brandAccent"
                              : "top-3.5 text-small"
                          }`}
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          required
                          value={formData.phoneNumber}
                          onFocus={() => handleFocus("phoneNumber")}
                          onBlur={(e) => handleBlur("phoneNumber", e.target.value)}
                          onChange={handleInputChange}
                          className="w-full text-small text-foreground bg-transparent focus:outline-none pt-1"
                        />
                      </div>

                      {/* Input Field: Email Address */}
                      <div className="relative rounded-xl border border-gray-200 focus-within:border-brandGold transition-all duration-200 px-4 py-3 bg-white">
                        <label 
                          className={`absolute left-4 transition-all duration-200 pointer-events-none text-textMuted/60 bg-white px-1 ${
                            focusedField.emailAddress || formData.emailAddress
                              ? "-top-2.5 text-[11px] font-bold text-brandAccent"
                              : "top-3.5 text-small"
                          }`}
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="emailAddress"
                          required
                          value={formData.emailAddress}
                          onFocus={() => handleFocus("emailAddress")}
                          onBlur={(e) => handleBlur("emailAddress", e.target.value)}
                          onChange={handleInputChange}
                          className="w-full text-small text-foreground bg-transparent focus:outline-none pt-1"
                        />
                      </div>

                    </div>

                    {/* Textarea Field: User Message */}
                    <div className="relative rounded-xl border border-gray-200 focus-within:border-brandGold transition-all duration-200 px-4 py-3 bg-white">
                      <label 
                        className={`absolute left-4 transition-all duration-200 pointer-events-none text-textMuted/60 bg-white px-1 ${
                          focusedField.userMessage || formData.userMessage
                            ? "-top-2.5 text-[11px] font-bold text-brandAccent"
                            : "top-3.5 text-small"
                        }`}
                      >
                        How can we help?
                      </label>
                      <textarea
                        name="userMessage"
                        rows="4"
                        required
                        value={formData.userMessage}
                        onFocus={() => handleFocus("userMessage")}
                        onBlur={(e) => handleBlur("userMessage", e.target.value)}
                        onChange={handleInputChange}
                        className="w-full text-small text-foreground bg-transparent focus:outline-none pt-1 resize-none"
                      />
                    </div>

                    {/* Pill Submit Button from Image Reference */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2.5 w-full py-4 rounded-full bg-white hover:bg-brandGold text-brandGold hover:text-white border border-brandGold font-bold text-small tracking-wider transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="uppercase tracking-widest text-[12px]">SUBMITTING...</span>
                      ) : (
                        <>
                          <span className="text-[12px] uppercase tracking-widest">SEND INQUIRY</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                /* Success Feedback Overlay Panel */
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center text-center p-4 space-y-4"
                >
                  <div className="p-4 rounded-full bg-brandGold/10 text-brandGold animate-bounce">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-h3 font-bold text-foreground">
                      Thank You!
                    </h3>
                    <p className="text-body text-textMuted">
                      Your design inquiry has been submitted successfully. Our premium design consulting division will connect with you shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setFormSuccess(false)}
                    className="px-6 py-2.5 rounded-full border border-brandGold text-brandGold hover:bg-brandGold hover:text-white transition-all duration-300 font-bold text-small cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}