'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

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
      className="flex items-center justify-center min-h-screen px-4 relative overflow-hidden"
      style={{ background: "var(--primary-gradient)" }}
    >
      {/* Background Texture */}
      <div
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/flowers.png')] opacity-120 mix-blend-overlay"
        aria-hidden="true"
      />

      {/* Motion Wrapper */}
      <motion.div
        className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6 z-10"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl font-bold text-center"
          style={{ color: "var(--primary-color)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Create an Account
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
          {["name", "email", "password"].map((field, index) => (
            <motion.input
              key={field}
              type={field === "password" ? "password" : field}
              placeholder={
                field === "name"
                  ? "Full Name"
                  : field === "email"
                  ? "Email"
                  : "Password"
              }
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition"
              style={{
                borderColor: "var(--input-border)",
                focusRingColor: "var(--focus-ring)",
              }}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
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
              backgroundColor: "var(--primary-color)",
              color: "var(--text-color)",
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            Register
          </motion.button>
        </motion.form>

        <div className="flex items-center gap-2 text-gray-400">
          <hr className="flex-grow border-t" />
          <span className="text-sm">or</span>
          <hr className="flex-grow border-t" />
        </div>

        <motion.button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 text-gray-700 py-3 rounded-lg hover:shadow-lg transition cursor-pointer bg-white"
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
