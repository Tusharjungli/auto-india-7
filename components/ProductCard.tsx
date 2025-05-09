import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-md transition hover:scale-105 cursor-pointer">
        <div className="relative w-full h-48">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </div>
        <div className="p-4">
          <h2 className="font-semibold text-lg">{product.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{product.description}</p>
          <p className="mt-2 font-bold text-black dark:text-white">₹ {product.price.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
}
