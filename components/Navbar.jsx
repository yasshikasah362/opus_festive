"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-[#fff7f9] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left - Logo & Nav Links */}
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-2xl font-bold text-[#FC6C87] tracking-tight hover:opacity-90 transition"
            >
              FestivalApp
            </Link>
            <Link
              href="/register"
              className="text-gray-700 hover:text-[#FC6C87] font-medium transition"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="text-gray-700 hover:text-[#FC6C87] font-medium transition"
            >
              Login
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-[#FC6C87] font-medium transition"
            >
              Dashboard
            </Link>
          </div>

          {/* Right - SignIn / SignOut */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-sm text-gray-600 hidden sm:block">
                  {session.user?.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-200 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="bg-[#FC6C87] text-white px-5 py-2 rounded-full shadow hover:bg-[#e85c75] transition"
              >
                Sign In with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
