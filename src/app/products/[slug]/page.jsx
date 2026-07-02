import { productSeriesList } from "@/data/data";
import HeroSection from "@/components/shared/HeroSection";
import ProductGrid from "@/components/products/ProductGrid";
import { notFound } from "next/navigation";

/*
 * This tells Next.js exactly what dynamic routes to build statically.
 */
export async function generateStaticParams() {
  return productSeriesList.map((series) => ({
    slug: series.slug,
  }));
}

export default async function ProductSlugPage({ params }) {
  // Asynchronously resolve parameters safely for Next.js 16 workers
  const { slug } = await params;

  // Identify the array element corresponding to this specific slug
  const seriesData = productSeriesList.find((series) => series.slug === slug);

  // Fallback standard error portal path if slug string doesn't match
  if (!seriesData) {
    notFound();
  }

  return (
    <div className="relative w-full overflow-hidden bg-background">
      {/* Populating your existing custom shared hero component with dynamic props parameters */}
      <HeroSection
        title={seriesData.name}
        subtitle={seriesData.slogan}
        bgImage={seriesData.image}
      />

      {/* Modern, high-performance interactive grid showroom container */}
      <ProductGrid products={seriesData.products} />
    </div>
  );
}