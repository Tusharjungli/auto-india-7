"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) router.push("/products");
    else alert("Invalid credentials");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white dark:bg-black">
      <div className="w-full max-w-md space-y-6 bg-gray-100 dark:bg-neutral-900 p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold">Login</h2>
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
          onClick={handleLogin}
          className="w-full bg-black text-white p-3 rounded hover:bg-gray-800"
        >
          Login
        </button>
      </div>
    </div>
  );
}
