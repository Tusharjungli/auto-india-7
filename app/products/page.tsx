import { dummyProducts } from "@/lib/dummyProducts";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  return (
    <main className="p-6 bg-white dark:bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
