import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaBehance } from "react-icons/fa6";

// DRY Optimizations: Data arrays for link groups
const productSeries = [
  "METRIX SERIES", "OCTRA SERIES", "ALPHA SERIES", 
  "PYRAMID SERIES", "LUNOX SERIES", "NEXA SERIES", 
  "UNIQUE SERIES", "DREAM SERIES", "METRO SERIES"
];

const collections = [
  "CORNER & SELF COLLECTION", "KHUTI COLLECTION"
];

const quickLinks = [
  { label: "ABOUT US", href: "/about" },
  { label: "HOME", href: "/" },
  { label: "CONTACT US", href: "/contact" }
];

const socialLinks = [
  { icon: FaFacebookF, label: "Facebook Link" },
  { icon: FaTwitter, label: "Twitter Link" },
  { icon: FaBehance, label: "Behance Link" },
  { icon: FaYoutube, label: "YouTube Link" },
  { icon: FaLinkedinIn, label: "LinkedIn Link" }
];

export default function Footer() {
  return (
    <footer className="bg-footerBg text-white pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* Horizontal Divider Line with Center Brand Crest */}
        <div className="relative w-full h-[2px] bg-brandGold/30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1 rounded-full bg-footerBg border-2 border-brandGold shadow-xl z-20">
            <Image
              src="/logo.png"
              alt="NJ Bath Collection Logo"
              // OPTIMIZATION: Explicit dimensions matching the exact 80px container constraint
              width={80}
              height={80}
              // OPTIMIZATION: Automatically handled progressive loading only when entering viewport
              loading="lazy"
              className="rounded-full object-contain bg-footerBg h-20 w-20"
            />
          </div>
        </div>

        {/* Top Grid Area with Symmetrical Center-Split */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pt-6 pb-2">
          
          {/* Vertical Divider dropping from the Center Logo (Desktop only) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-brandGold/20 -translate-x-1/2 hidden md:block z-10" />

          {/* Left Column Section: Stacked Contacts & Social Media Circles */}
          <div className="flex flex-col items-center justify-center space-y-8 z-20">
            
            {/* Phone & Email Rows Side by Side */}
            <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 items-center justify-center w-full">
              
              {/* Phone Block */}
              <div className="flex flex-col items-center text-center space-y-3">
                <Link
                  href="tel:+919662157189"
                  className="p-4 rounded-full border-2 border-brandAccent hover:bg-brandHighlight/20 transition-all duration-300 shadow-md group"
                >
                  <Phone className="w-6 h-6 text-brandAccent group-hover:scale-110 transition-transform" />
                </Link>
                <span className="text-small font-medium tracking-wide text-white/90">
                  <a href="tel:+919662157189">+91 96621 57189</a>
                </span>
              </div>

              {/* Email Block */}
              <div className="flex flex-col items-center text-center space-y-3">
                <Link
                  href="mailto:info@njbath.in"
                  className="p-4 rounded-full border-2 border-brandAccent hover:bg-brandHighlight/20 transition-all duration-300 shadow-md group"
                >
                  <Mail className="w-6 h-6 text-brandAccent group-hover:scale-110 transition-transform" />
                </Link>
                <span className="text-small font-medium tracking-wide text-white/90">
                  <a href="mailto:info@njbath.in">info@njbath.in</a>
                </span>
              </div>

            </div>

            {/* Social Platform Icon Circles */}
            <div className="flex gap-4 items-center justify-center pt-2">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href="#"
                    className="p-3 rounded-full bg-white/5 hover:bg-brandHighlight hover:text-white transition-all duration-300 border border-white/10 hover:border-transparent text-white"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

          </div>

          {/* Right Column Section: Balaji Address Box & Active Google Maps Iframe */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12 z-20">
            
            {/* Balaji Address Box wrapped in an elegant rounded outline */}
            <div className="border border-brandGold/40 rounded-xl p-6 max-w-[260px] text-center bg-footerBg/50 backdrop-blur-sm shadow-md">
              <p className="text-small font-bold text-gray-300 leading-relaxed uppercase">
                Balaji Industrial Zone-1, Gundasara Road, Ribda, Rajkot- 360311
              </p>
            </div>

            {/* Google Map Embedded Frame block */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-58 h-28 rounded-xl overflow-hidden border border-brandGold/40 shadow-lg hover:border-brandGold transition-all duration-300 bg-footerCardBg">
                <iframe
                  title="Unique Steel Tech Google Maps Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1847.9966390702996!2d70.79226137865648!3d22.12623199265219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395835d7089a9985%3A0xfa80e9cefe967405!2sUNIQUE%20STEEL%20TECH!5e0!3m2!1sen!2sin!4v1666364727920!5m2!1sen!2sin"
                  className="w-full h-full border-0 opacity-90 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Horizontal Divider Line */}
        <hr className="border-brandGold/30" />

        {/* Bathroom Series & Collections segment */}
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            
            {/* Row 1: Series List */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-small font-bold tracking-wider text-white">
              {productSeries.map((series) => (
                <a key={series} href="#" className="hover:text-brandGold transition-colors uppercase">
                  {series}
                </a>
              ))}
            </div>

            {/* Row 2: Secondary collection lists */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-small font-bold tracking-wider text-white">
              {collections.map((collection) => (
                <a key={collection} href="#" className="hover:text-brandGold transition-colors uppercase">
                  {collection}
                </a>
              ))}
            </div>

          </div>
        </div>

        {/* Centered QUICK LINKS segment */}
        <div className="space-y-4 pt-1">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-small font-bold tracking-widest text-brandGold uppercase">
              Quick Links
            </span>
            <div className="flex flex-wrap justify-center items-center gap-4 text-small font-bold text-white uppercase">
              {quickLinks.map((link, index) => (
                <div key={link.href} className="flex items-center gap-4">
                  <a href={link.href} className="hover:text-brandGold transition-colors">
                    {link.label}
                  </a>
                  {index < quickLinks.length - 1 && <span className="text-gray-600">|</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider Bar */}
        <hr className="border-brandGold/30" />

        {/* Bottom copyright line */}
        <div className="text-center">
          <p className="text-small font-medium tracking-wide text-gray-400">
            &copy; 2022 NJ Bath . All Rights Reserved. 
          </p>
        </div>

      </div>
    </footer>
  );
}