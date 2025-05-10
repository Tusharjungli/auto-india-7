"use client";

import { useCartStore } from "@/lib/store/cartStore";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen p-6 bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty. <Link href="/products" className="text-blue-500 underline">Browse products</Link></p>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 items-center border-b pb-4">
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">₹ {item.price.toLocaleString()}</p>
                <div className="flex items-center mt-2 gap-2">
                  <label htmlFor="qty">Qty:</label>
                  <input
                    id="qty"
                    type="number"
                    min={1}
                    className="w-16 text-center border rounded p-1 dark:bg-neutral-800 dark:border-gray-700"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6 text-right">
            <p className="text-xl font-bold">Total: ₹ {total.toLocaleString()}</p>
            <button
              onClick={clearCart}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
