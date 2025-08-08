"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
                className="text-2xl font-bold tracking-tight transition-colors text-[var(--primary-color)] hover:opacity-90 hover:scale-105 duration-200"
              >
                FestivalApp
              </Link>

              {[
                { label: "Register", href: "/register" },
                { label: "Login", href: "/login" },
                { label: "Create Templates", href: "/templates" },
                { label: "Features", href: "/features" },
              ].map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className="font-medium relative px-2 py-1 transition-all duration-200 text-[var(--text-default)] hover:text-[var(--primary-color)] hover:scale-105 hover:underline hover:underline-offset-4"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right - SignIn / SignOut */}
            <div className="flex items-center space-x-4">
              {session ? (
                <>
                  {/* <span className="text-sm hidden sm:block text-[var(--text-muted)]">
                    {session.user?.email}
                  </span> */}
                  <button
                    onClick={() => signOut()}
                    className="px-5 py-2 rounded-full transition-all duration-300 shadow cursor-pointer bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-[var(--button-bg-hover)] hover:shadow-lg hover:scale-105"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="px-5 py-2 rounded-full transition-all duration-300 shadow cursor-pointer bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-[var(--button-bg-hover)] hover:shadow-lg hover:scale-105"
                >
                  Sign In with Google
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
