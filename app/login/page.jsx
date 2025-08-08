"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res.ok || res.status === 200) {
      router.push("/dashboard");
    } else {
      alert("Login failed");
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
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2"
            style={{
              borderColor: "var(--input-border)",
              boxShadow: "0 0 0 2px transparent",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2"
            style={{
              borderColor: "var(--input-border)",
              boxShadow: "0 0 0 2px transparent",
            }}
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
            Sign In
          </button>
        </form>

        <div className="flex items-center gap-2" style={{ color: "var(--text-gray)" }}>
          <hr className="flex-grow border-t" />
          <span className="text-sm">or</span>
          <hr className="flex-grow border-t" />
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:shadow-lg transition cursor-pointer bg-white text-gray-700"
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
