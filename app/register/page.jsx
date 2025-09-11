'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
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
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { name: "name", placeholder: "Full Name", type: "text", icon: <FiUser /> },
    { name: "email", placeholder: "Email Address", type: "email", icon: <FiMail /> },
    { name: "password", placeholder: "Password", type: "password", icon: <FiLock /> },
  ];

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 relative overflow-hidden"
      style={{ background: "var(--primary-gradient)" }}
    >
      {/* Background Texture */}
      <div
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/flowers.png')] opacity-100 mix-blend-overlay"
        aria-hidden="true"
      />

      <motion.div
        className="w-full max-w-sm sm:max-w-md bg-white/90 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 z-10"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Heading */}
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center"
          style={{ color: "var(--primary-color)" }}
        >
          Create Free Account
        </motion.h2>
        <h2 className="text-center text-gray-600 text-sm sm:text-base">
          Every Amazing Journey starts with a new account
        </h2>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-3 sm:space-y-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {inputFields.map((field) => (
            <motion.div
              key={field.name}
              className="flex items-center border rounded-md sm:rounded-lg px-3 py-2 sm:px-4 sm:py-3 focus-within:ring-2 focus-within:ring-[var(--primary-color)] transition"
              style={{ borderColor: "var(--input-border)" }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <span className="text-gray-500 mr-2 sm:mr-3 text-lg">{field.icon}</span>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="flex-1 bg-transparent outline-none text-sm sm:text-base"
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                required
              />
            </motion.div>
          ))}

          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-2.5 sm:py-3 rounded-md sm:rounded-lg shadow-md transition cursor-pointer ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--text-color)",
            }}
            whileHover={!loading ? { scale: 1.03 } : {}}
            whileTap={!loading ? { scale: 0.96 } : {}}
          >
            {loading ? "Registering..." : "Sign Up"}
          </motion.button>
        </motion.form>

        {/* Divider */}
        <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
          <hr className="flex-grow border-t" />
          <span>or</span>
          <hr className="flex-grow border-t" />
        </div>

        {/* Google Sign-in */}
        <motion.button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-2 sm:gap-3 border border-gray-300 text-gray-700 py-2.5 sm:py-3 rounded-md sm:rounded-lg hover:shadow-lg transition cursor-pointer bg-white text-sm sm:text-base"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
          Continue with Google
        </motion.button>
      </motion.div>
    </div>
  );
}
