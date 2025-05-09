"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Signup successful! You can now login.");
      router.push("/login");
    } else {
      const { error } = await res.json();
      alert(error || "Signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white dark:bg-black">
      <div className="w-full max-w-md space-y-6 bg-gray-100 dark:bg-neutral-900 p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold">Create Account</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignup}
          className="w-full bg-black text-white p-3 rounded hover:bg-gray-800"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
