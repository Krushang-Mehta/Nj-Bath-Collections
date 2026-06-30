/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        bgSecondary: "var(--bg-secondary)",
        foreground: "var(--foreground)",
        textMuted: "var(--text-muted)",
        brandHighlight: "var(--brand-highlight)",
        brandAccent: "var(--brand-accent)",
        chromeMetal: "var(--chrome-metal)",
        brandGold: "var(--brand-gold)", // Golden Design Color (Req 5)
        
        // Mapped Component Colors
        navBgScrolled: "var(--nav-bg-scrolled)",
        navBorderScrolled: "var(--nav-border-scrolled)",
        navTextScrolled: "var(--nav-text-scrolled)",
        navBgTransparent: "var(--nav-bg-transparent)",
        navBorderTransparent: "var(--nav-border-transparent)",
        navTextTransparent: "var(--nav-text-transparent)",
        
        navMobileBg: "var(--nav-mobile-bg)",
        navMobileBorder: "var(--nav-mobile-border)",
        navMobileText: "var(--nav-mobile-text)",
        navMobileDivider: "var(--nav-mobile-divider)",
        
        footerBg: "var(--footer-bg)",
        footerBorder: "var(--footer-border)",
        footerText: "var(--footer-text)",
        footerTextMuted: "var(--footer-text-muted)",
        footerCardBg: "var(--footer-card-bg)",
        
        heroOverlayStart: "var(--hero-overlay-start)",
        heroOverlayMid: "var(--hero-overlay-mid)",
        heroBulletInactive: "var(--hero-bullet-inactive)",
      },
      fontFamily: {
        jakarta: ["var(--font-jakarta)", "sans-serif"],
      },
    },
  },
  plugins: [],
};