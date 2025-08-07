"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

 const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify({
      ...form,
      password: bcrypt.hashSync(form.password, 10),
    }),
  });

  if (res.ok) {
    // Automatically sign in the user using their credentials
    const loginRes = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (loginRes?.ok) {
      router.push("/dashboard");
    } else {
      alert("Auto-login failed. Please try logging in manually.");
    }
  } else {
    alert("User already exists or registration failed.");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-t" />
          <span className="mx-2 text-gray-400">or</span>
          <hr className="flex-grow border-t" />
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
