import { dummyProducts } from "@/lib/dummyProducts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Params {
  params: { id: string };
}

export default function ProductDetail({ params }: Params) {
  const product = dummyProducts.find((item) => item.id === params.id);

  if (!product) return notFound();

  return (
    <main className="p-6 max-w-4xl mx-auto bg-white dark:bg-black min-h-screen">
      <Link href="/products" className="text-blue-500 underline mb-4 block">
        ← Back to Products
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="md:w-1/2 space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
          <p className="text-xl font-semibold text-black dark:text-white">₹ {product.price.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Stock: {product.stock}</p>
        </div>
      </div>
    </main>
  );
}
