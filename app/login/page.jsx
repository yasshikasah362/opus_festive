"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

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
      className="flex items-center justify-center min-h-screen px-4 relative overflow-hidden"
      style={{ background: "var(--primary-gradient)" }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/flowers.png')] opacity-120 mix-blend-overlay"
        aria-hidden="true"
      />

      {/* Motion Login Box */}
      <motion.div
        className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6 z-10"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl font-bold text-center"
          style={{ color: "var(--primary-color)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Welcome Back
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {["email", "password"].map((field) => (
            <motion.input
              key={field}
              type={field}
              placeholder={field === "email" ? "Email" : "Password"}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--input-border)",
                boxShadow: "0 0 0 2px transparent",
              }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            />
          ))}

          <motion.button
            type="submit"
            className="w-full font-semibold py-3 rounded-lg shadow-md transition cursor-pointer"
            style={{
              backgroundColor: "var(--button-bg)",
              color: "var(--button-text)",
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            Sign In
          </motion.button>
        </motion.form>

        {/* Divider */}
        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: "var(--text-gray)" }}
        >
          <hr className="flex-grow border-t" />
          <span>or</span>
          <hr className="flex-grow border-t" />
        </div>

        {/* Google Sign-In */}
        <motion.button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:shadow-lg transition cursor-pointer bg-white text-gray-700"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </motion.button>
      </motion.div>
    </div>
  );
}
