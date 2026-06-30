/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Outputs a static HTML/CSS/JS export in the out/ directory
  images: {
    unoptimized: true, // Required for static exporting since NextJS image optimization server is not available
  },
};

export default nextConfig;