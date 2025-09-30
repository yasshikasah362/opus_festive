"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import OpusLoginModal from "./OpusLoginModal";
import { signin } from "../api/auth/auth";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [loading, setLoading] = useState(false);
  const [isOpusOpen, setIsOpusOpen] = useState(false);

  const [savedUsers, setSavedUsers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  
  const { data: session } = useSession();

  // Redirect if logged in
  useEffect(() => {
    if (session) router.push("/dashboard");
  }, [session]);

  // Load saved users for autofill
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedUsers") || "[]");
    setSavedUsers(saved);

    // Autofill if any remembered user
    const remembered = saved.find(u => u.remember);
    if (remembered) {
      setForm({ email: remembered.email, password: remembered.password, remember: true });
    }
  }, []);

  // Handle email input change + suggestions
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, email: value });

    if (!value) {
      setSuggestions([]);
      return;
    }

    const filtered = savedUsers.filter(user =>
      user.email.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSelectSuggestion = (user) => {
    setForm({ email: user.email, password: user.password, remember: true });
    setSuggestions([]);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
        remember: form.remember,
      });

      if (res?.ok || res?.status === 200) {
        // Save user if "Remember Me" checked
        if (form.remember) {
          const newSaved = savedUsers.filter(u => u.email !== form.email);
          newSaved.push({ ...form });
          localStorage.setItem("savedUsers", JSON.stringify(newSaved));
        }
        router.push("/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Opus login handler
  const handleOpusConfirm = async ({ username, password }) => {
    setLoading(true);
    try {
      const res = await signin(username, password);

      if (res.data && res.data.status === 200) {
        localStorage.setItem("opusToken", res.data.token ?? "");
        window.dispatchEvent(new Event("opus-login"));
        setIsOpusOpen(false);
        router.push("/dashboard/ui");
      } else {
        alert(res.data?.message || "Opus Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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

      <motion.div
        className="mt-15 w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6 z-10"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl font-bold text-center"
          style={{ color: "var(--primary-color)" }}
        >
          Login
        </motion.h2>
        <h4>Please enter your email address and password</h4>

        {/* Login Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial="hidden"
          autoComplete="on"
          method="post"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {/* Email */}
          <motion.div
            className="relative"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              autoComplete="off"
              value={form.email}
              onChange={handleEmailChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2"
              style={{ borderColor: "var(--input-border)" }}
              required
            />
            {/* Autofill Suggestions */}
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-lg z-20 max-h-40 overflow-auto">
                {suggestions.map((user, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectSuggestion(user)}
                  >
                    {user.email}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          {/* Password */}
          <motion.div
            className="relative"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2"
              style={{ borderColor: "var(--input-border)" }}
              required
            />
          </motion.div>

          {/* Remember Me */}
          <motion.div
            className="flex items-center space-x-2"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <input
              type="checkbox"
              id="remember"
              checked={form.remember}
              onChange={(e) => setForm({ ...form, remember: e.target.checked })}
              className="h-4 w-4 text-[var(--primary-color)] focus:ring-[var(--primary-color)] border-gray-300 rounded cursor-pointer"
            />
            <label
              htmlFor="remember"
              className="text-sm text-gray-600 cursor-pointer"
            >
              Remember Me
            </label>
          </motion.div>

          {/* Login Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-lg shadow-md transition cursor-pointer ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--text-color)",
            }}
            whileHover={!loading ? { scale: 1.03 } : {}}
            whileTap={!loading ? { scale: 0.96 } : {}}
          >
            {loading ? "Logging in..." : "Login"}
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
          Login with Google
        </motion.button>

        {/* Opus Button */}
        <motion.button
          onClick={() => setIsOpusOpen(true)}
          className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-lg hover:shadow-lg transition cursor-pointer bg-white text-gray-700"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
        >
          <img
            src="https://supoassets.s3.ap-south-1.amazonaws.com/public/assets/icon/favicon.png"
            alt="Opus"
            className="w-6 h-6 mr-2"
          />
          Login with Opus Account
        </motion.button>

        {/* Modal */}
        <OpusLoginModal
          isOpen={isOpusOpen}
          onClose={() => setIsOpusOpen(false)}
          onConfirm={handleOpusConfirm}
          loading={loading}
        />

        {/* Sign Up Redirect */}
        <div className="text-center text-sm mt-4 text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-[var(--primary-color)] font-medium hover:underline cursor-pointer"
          >
            Sign Up now
          </button>
        </div>
      </motion.div>
    </div>
  );
}
