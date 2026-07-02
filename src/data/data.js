/*
 * Static Data Registry for NJ Bath Collection
 * Mapped central list arrays to preserve DRY standard across Header & Footer.
 */

export const quickLinksList = [
  { name: "Home", path: "/" },
  { name: "Company Profile", path: "/about" },
  { name: "Our Products", path: "/products" },
  { name: "Contact Us", path: "/contact" },
];

export const socialLinksList = [
  { platform: "Facebook", path: "https://facebook.com/dummy" },
  { platform: "Twitter", path: "https://twitter.com/dummy" },
  { platform: "Behance", path: "https://behance.net/dummy" },
  { platform: "YouTube", path: "https://youtube.com/dummy" },
  { platform: "LinkedIn", path: "https://linkedin.com/dummy" },
];

export const productSeriesList = [
  { 
    name: "Metrix Series", 
    slug: "metrix-series", 
    slogan: "Modern. Clean. Timeless.",
    image: "/metrix.png",
    products: [
      { id: "m1", name: "Metrix Soap Dish", image: "/info.jpg" }, // Reuse available images or updates
      { id: "m2", name: "Metrix Liquid Soap Dispenser", image: "/info.jpg" },
      { id: "m3", name: "Metrix Towel Rail", image: "/info.jpg" },
      { id: "m4", name: "Metrix Double Robe Hook", image: "/info.jpg" },
    ]
  },
  { 
    name: "Octra Series", 
    slug: "octra-series", 
    slogan: "Bold Design. Premium Finish.",
    image: "/octra.png",
    products: [
      { id: "o1", name: "Octra Soap Dish", image: "/info.jpg" },
      { id: "o2", name: "Octra Liquid Soap", image: "/info.jpg" },
      { id: "o3", name: "Octra Tumbler Holder", image: "/info.jpg" },
      { id: "o4", name: "Octra Coat Hook", image: "/info.jpg" },
    ]
  },
  { 
    name: "Alpha Series", 
    slug: "alpha-series", 
    slogan: "Performance. Style. Luxury.",
    image: "/alpha.png",
    products: [
      { id: "a1", name: "Alpha Premium Grab Bar", image: "/info.jpg" },
      { id: "a2", name: "Alpha Dual Soap Tray", image: "/info.jpg" },
    ]
  }
  // All other series entries stay identical, just ensure they have a 'products: []' array...
];

export const latestProductList = [
  {
    name: "Alpha Series",
    slug: "alpha-series",
    slogan: "Performance. Style. Luxury.",
    image: "/alphalatest.png" 
  },
  {
    name: "Metrix Series",
    slug: "metrix-series",
    slogan: "Modern. Clean. Timeless.",
    image: "/metrixlatest.png" 
  },
  {
    name: "Octra Series",
    slug: "octra-series",
    slogan: "Bold Design. Premium Finish.",
    image: "/octralatest.png" 
  },
  {
    name: "Nexa Series",
    slug: "nexa-series",
    slogan: "Next Gen. Next Level.",
    image: "/nexalatest.png" 
  },
  {
    name: "Pyramid Series",
    slug: "pyramid-series",
    slogan: "Elegant Shape. Perfect Utility.",
    image: "/pyramidlatest.png" 
  },
  {
    name: "Unique Series",
    slug: "unique-series",
    slogan: "Different by Design.",
    image: "/uniquelatest.png" 
  }
];


