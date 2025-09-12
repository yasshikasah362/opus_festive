"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiLock } from "react-icons/fi";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function OpusLoginModal({ isOpen, onClose, onConfirm, loading }) {
  const [form, setForm] = useState({ username: "", password: "" });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative"
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

        {/* Logo + Brand */}
        {/* Logo + Brand (One line) */}
<div className="flex items-center justify-center gap-2 mb-4">
  <img
    src="https://supoassets.s3.ap-south-1.amazonaws.com/public/assets/icon/favicon.png"
    alt="Opus Logo"
    className="w-10 h-10"
  />
  <div className="flex flex-col leading-tight">
    <span className="text-xl font-bold text-gray-800">Opus</span>
    <span className="text-sm text-gray-500">by omniviewlabs</span>
  </div>
</div>


        {/* Subheading */}
        <p className="text-center mt-4 text-gray-600 font-medium">
          Sign in to your account
        </p>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onConfirm(form);
          }}
          className="mt-6 space-y-4"
        >
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-600 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-600 focus:outline-none"
              required
            />
          </div>

          {/* Keep me signed in + Reset password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" />
              Keep me signed in
            </label>
            <button
              type="button"
              className="text-green-700 hover:underline cursor-pointer"
            >
              Reset password
            </button>
          </div>

          {/* Sign In Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className={`cursor-pointer w-full bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-800"
            }`}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}
          >
            {loading ? "Logging in..." : "Sign In"}
          </motion.button>
        </form>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-6 text-gray-600">
          <a href="#" className="hover:text-pink-500">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="hover:text-blue-600">
            <FaFacebookF size={20} />
          </a>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Powered By omniviewlabs.com
        </p>
      </motion.div>
    </div>
  );
}
