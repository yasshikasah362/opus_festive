"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      router.push(path);
      setLoading(false);
    }, 500);
  };

  return (
    <>
      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-opacity-50 backdrop-blur-sm transition-all duration-300">
          <div className="flex flex-col items-center space-y-6 animate-fade-in">
            <div className="relative">
              <div className="h-16 w-16 border-4 border-t-transparent border-#FC6C87 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-#FC6C87 text-lg font-semibold">F</span>
              </div>
            </div>
            <p className="text-#FC6C87 text-sm font-medium tracking-wide animate-pulse">
              Loading Festimaker...
            </p>
          </div>
        </div>
      )}

      <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left - Logo & Nav Links */}
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                className="text-2xl font-bold tracking-tight cursor-pointer transition-colors text-[var(--primary-color)] hover:opacity-90 hover:scale-105 duration-200"
              >
                FastiveMaker
              </Link>

              {/* Common Links for both logged in and logged out */}
              {[
                { label: "Create Templates", href: "/templates" },
                { label: "Features", href: "/features" },
                { label: "Dashboard", href: "/dashboard" },
              ].map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className="font-medium relative px-2 py-1 transition-all duration-200 text-[var(--text-default)] hover:text-[var(--primary-color)] hover:scale-105 hover:underline hover:underline-offset-4 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
  {session ? (
    <>
      {/* Username Show */}
       <FaUserCircle className="text-2xl text-gray-700" />
      <span className="font-medium text-gray-700">
        {session.user?.name || "User"}
      </span>

      <button
        onClick={() => signOut()}
        className="px-5 py-2 rounded-full transition-all duration-300 shadow cursor-pointer bg-[var(--primary-color)] text-[var(--button-bg)] hover:bg-[var(--primary-color)] hover:shadow-lg hover:scale-105"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => handleNavigation("/login")}
        className="font-medium relative px-2 py-1 transition-all duration-200 text-[var(--text-default)] hover:text-[var(--primary-color)] hover:scale-105 hover:underline hover:underline-offset-4 cursor-pointer"
      >
        Log In
      </button>
      <button
        onClick={() => handleNavigation("/register")}
        className="px-5 py-2 rounded-full transition-all duration-300 shadow cursor-pointer bg-[var(--primary-color)] text-[var(--button-bg)] hover:bg-[var(--primary-color)] hover:shadow-lg hover:scale-105"
      >
        Sign Up Free
      </button>
    </>
  )}
</div>


          </div>
        </div>
      </nav>
    </>
  );
}
