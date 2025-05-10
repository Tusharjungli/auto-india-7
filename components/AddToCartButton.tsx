"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { Product } from "@/types/product";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCartStore();

  return (
    <button
      onClick={() => addToCart(product)}
      className="w-full bg-neutral-900 text-white dark:bg-white dark:text-black py-2 rounded hover:opacity-90 transition"
    >
      Add to Cart
    </button>
  );
}
