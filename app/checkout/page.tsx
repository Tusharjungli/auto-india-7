"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const { items, clearCart } = useCartStore();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const router = useRouter();

  const [form, setForm] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!session) {
      alert("Please log in to place your order.");
      return router.push("/login");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items, total }),
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Order placed successfully!");
        clearCart();
        router.push("/products");
      } else {
        alert("❌ Failed to place order.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-white dark:bg-black text-black dark:text-white max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Address Form */}
        <div className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-neutral-800 dark:border-gray-700"
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-neutral-800 dark:border-gray-700"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-neutral-800 dark:border-gray-700"
          />
          <textarea
            name="address"
            placeholder="Full Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-neutral-800 dark:border-gray-700"
          />
          <div className="flex gap-4">
            <input
              name="pincode"
              placeholder="PIN Code"
              value={form.pincode}
              onChange={handleChange}
              className="w-1/2 border p-2 rounded dark:bg-neutral-800 dark:border-gray-700"
            />
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-1/2 border p-2 rounded dark:bg-neutral-800 dark:border-gray-700"
            />
          </div>
          <input
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-neutral-800 dark:border-gray-700"
          />
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-4 w-full bg-neutral-900 text-white dark:bg-white dark:text-black py-2 rounded hover:opacity-90 transition"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-3">
              <div className="relative w-16 h-16">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover rounded" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ₹ {item.price.toLocaleString()} × {item.quantity}
                </p>
              </div>
            </div>
          ))}
          <p className="text-right text-lg font-bold mt-4">Total: ₹ {total.toLocaleString()}</p>
        </div>
      </div>
    </main>
  );
}
