"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HomeIcon,
  PhotoIcon,
  WrenchScrewdriverIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

function MenuItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer">
      {icon}
      <span>{label}</span>
    </div>
  );
}

export default function DashboardUI({ username }) {
  const [category, setCategory] = useState("All Category");
  const categories = ["All Category", "Flyer", "Menu", "Brochure", "Poster"];
  const tabs = ["My Creations", "My Images",  "My Uploads"];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-[#ffb0a4] text-white flex flex-col">
        <div className="flex items-center justify-center py-4 text-xl font-bold border-b border-gray-700">
          Home
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <MenuItem icon={<HomeIcon className="w-6 h-6" />} label="Home" />
          <MenuItem icon={<PhotoIcon className="w-6 h-6" />} label="My Design" />
          <MenuItem icon={<WrenchScrewdriverIcon className="w-6 h-6" />} label="Tools" />
          <MenuItem icon={<Cog6ToothIcon className="w-6 h-6" />} label="Account" />
        </nav>
        <div className="p-4 border-t border-gray-700">
          <MenuItem icon={<QuestionMarkCircleIcon className="w-6 h-6" />} label="Guide" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
       



        {/* Search Section */}
        <div className="bg-[#FC6C87] p-6 text-center text-white mt-14">
          <h1 className="text-2xl font-bold mb-4">
            What would you like to design?
          </h1>
          <div className="flex justify-center items-center gap-2">
            {/* Dropdown */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 rounded bg-white text-black"
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Search */}
            <input
              type="text"
              placeholder="Search thousands of templates..."
              className="p-2 rounded w-80 bg-white text-black"
            />
            <button className="bg-white text-black p-2 rounded">
              <FunnelIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Tags */}
         <div className="mt-4 flex justify-center gap-2 flex-wrap">
      {[
        { label: "Flyer", href: "/Flyer" },
        { label: "Discount Post" },
        { label: "Poster" },
        { label: "Social Media Post" },
        { label: "Festive Greetings" },
      ].map((tag, i) =>
        tag.href ? (
          <Link key={i} href={tag.href}>
            <span className="bg-[#ffb0a4] px-3 py-1 rounded cursor-pointer text-sm">
              {tag.label}
            </span>
          </Link>
        ) : (
          <span
            key={i}
            className="bg-[#ffb0a4] px-3 py-1 rounded cursor-pointer text-sm"
          >
            {tag.label}
          </span>
        )
      )}
    </div>

        </div>

        {/* Tabs */}
        <div className="bg-white p-4 flex gap-4 border-b">
          {tabs.map((tab, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded ${
                i === 0 ? "bg-[#FC6C87] text-white" : "bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Upcoming Events */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
            <button className="bg-[#FC6C87] text-white px-4 py-1 rounded">
              Edit Keywords
            </button>
          </div>
          <div className="text-gray-500">No events available</div>
        </div>
      </div>
    </div>
  );
}
