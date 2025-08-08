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
    <div
      className="flex items-center justify-center min-h-screen px-4"
      style={{ background: "var(--primary-gradient)" }}
    >
      <div
    className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/flowers.png')] opacity-120 mix-blend-overlay"
    aria-hidden="true"
  />
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6">
        <h2
          className="text-3xl font-bold text-center"
          style={{ color: "var(--primary-color)" }}
        >
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition"
            style={{
              borderColor: "var(--input-border)",
              focusRingColor: "var(--focus-ring)",
            }}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition"
            style={{
              borderColor: "var(--input-border)",
              focusRingColor: "var(--focus-ring)",
            }}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition"
            style={{
              borderColor: "var(--input-border)",
              focusRingColor: "var(--focus-ring)",
            }}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full font-semibold py-3 rounded-lg shadow-md transition cursor-pointer"
            style={{
              backgroundColor: "var(--button-bg)",
              color: "var(--button-text)",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--button-bg-hover)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--button-bg)")
            }
          >
            Register
          </button>
        </form>

        <div className="flex items-center gap-2 text-gray-400">
          <hr className="flex-grow border-t" />
          <span className="text-sm">or</span>
          <hr className="flex-grow border-t" />
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 text-gray-700 py-3 rounded-lg hover:shadow-lg transition cursor-pointer bg-white"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
