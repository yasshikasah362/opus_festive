"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";

export default function OpusLoginModal({ isOpen, onClose, onConfirm, loading }) {
  const [form, setForm] = useState({ username: "", password: "" });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-4 text-[var(--primary-color)]">
          Login with your Opus Account
        </h2>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onConfirm(form);
          }}
          className="space-y-4"
        >
          {/* Username */}
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:outline-none"
              required
            />
          </div>

          {/* Confirm Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-lg shadow-md transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--text-color)",
            }}
            whileHover={!loading ? { scale: 1.03 } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}
          >
            {loading ? "Logging in..." : "Confirm"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
