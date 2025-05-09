"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-10 border-t border-gray-800 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold uppercase mb-3">Auto India</h3>
          <p className="text-gray-400 text-sm">
            Premium spare parts for every Indian road journey.
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-2">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/products" className="hover:text-white">Products</Link></li>
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div className="text-sm text-gray-500 sm:text-right">
          &copy; {year} Auto India. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
