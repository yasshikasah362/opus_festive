"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  HomeIcon,
  PhotoIcon,
  WrenchScrewdriverIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { FaDownload, FaShareAlt,FaSearchPlus,FaSearchMinus, FaTrash, FaEye } from "react-icons/fa";

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
  const tabs = ["Upcoming Events", "My Creations", "My Uploads"];

  // ✅ Flyers from localStorage
  const [flyers, setFlyers] = useState([]);
  const [activeTab, setActiveTab] = useState("Upcoming Events");
  const [selectedFlyer, setSelectedFlyer] = useState(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("flyers") || "[]");
    setFlyers(stored);

    // live update jab FlyerSidebar me naye flyers add ho
    const handleStorage = () => {
      const updated = JSON.parse(localStorage.getItem("flyers") || "[]");
      setFlyers(updated);
    };
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // ✅ Delete Function
  const handleDelete = (idx) => {
    const updated = flyers.filter((_, i) => i !== idx);
    setFlyers(updated);
    localStorage.setItem("flyers", JSON.stringify(updated));
  };

  // ✅ Share Function (Web Share API)
 const handleShare = async (flyer) => {
  try {
    // Convert base64/URL into a blob
    const response = await fetch(flyer);
    const blob = await response.blob();

    const file = new File([blob], "flyer.jpg", { type: blob.type });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: "Check out my flyer",
        text: "Here is my creation!",
        files: [file],
      });
    } else {
      // Fallback: copy link
      navigator.clipboard.writeText(flyer);
      alert("Flyer link copied to clipboard!");
    }
  } catch (error) {
    console.error("Share failed:", error);
    alert("Sharing failed. Try downloading instead.");
  }
};

//Zoom Control
const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));


  return (
   <div className="flex flex-col md:flex-row h-screen bg-gray-100">
  {/* Sidebar */}
  <aside className="w-full md:w-60 bg-[#ffb0a4] text-white flex flex-col">
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
      <h1 className="text-2xl font-bold mb-4">What would you like to design?</h1>
      
      {/* Responsive Search Controls */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded bg-white text-black w-full sm:w-auto"
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search thousands of templates..."
          className="p-2 rounded w-full sm:w-80 bg-white text-black"
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
          { label: "Festive Greetings", href: "/Festives" },
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
    <div className="bg-white p-4 flex flex-wrap gap-2 border-b">
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={() => setActiveTab(tab)}
          className={`cursor-pointer px-4 py-2 rounded ${
            activeTab === tab ? "bg-[#FC6C87] text-white" : "bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* Active Tab Content */}
    <div className="p-6 flex-1 overflow-auto">
      {activeTab === "Upcoming Events" && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
            <button className="bg-[#FC6C87] text-white px-4 py-1 rounded">
              Edit Keywords
            </button>
          </div>

          {/* Events grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Example cards */}
            <Link href="/diwali">
              <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:-rotate-1 cursor-pointer">
                <img
                  src="/diwali.jpg"
                  alt="Diwali"
                  className="w-32 h-32 object-cover rounded-xl mb-3"
                />
                <h3 className="text-lg font-semibold">Diwali</h3>
                <p className="text-sm text-gray-500">20th October 2025</p>
              </div>
            </Link>

            <Link href="/gandhijayanti">
              <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:rotate-1">
                <img
                  src="/gandhijayanti.jpg"
                  alt="Gandhi Jayanti"
                  className="w-32 h-32 object-cover rounded-xl mb-3"
                />
                <h3 className="text-lg font-semibold">Gandhi Jayanti</h3>
                <p className="text-sm text-gray-500">2nd October 2025</p>
              </div>
            </Link>

            <Link href="/navratri">
              <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:rotate-2">
                <img
                  src="/navratri.jpg"
                  alt="Navratri"
                  className="w-32 h-32 object-cover rounded-xl mb-3"
                />
                <h3 className="text-lg font-semibold">Navratri</h3>
                <p className="text-sm text-gray-500">2nd October 2025</p>
              </div>
            </Link>

            <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:-rotate-2">
              <img
                src="/govardhanpuja.jpg"
                alt="Govardhan Puja"
                className="w-32 h-32 object-cover rounded-xl mb-3"
              />
              <h3 className="text-lg font-semibold">Govardhan Puja</h3>
              <p className="text-sm text-gray-500">21st Oct 2025</p>
            </div>
          </div>
        </>
      )}

      {activeTab === "My Creations" && (
        <>
          {flyers.length === 0 ? (
            <p className="text-gray-500">No flyers generated yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {flyers.map((flyer, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-xl overflow-hidden shadow-md"
                >
                  <img
                    src={flyer}
                    alt={`Flyer ${idx}`}
                    className="w-full h-80 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <button
                        onClick={() => setSelectedFlyer(flyer)}
                        className="cursor-pointer p-2 bg-white rounded-full shadow hover:bg-gray-400"
                      >
                        <FaEye className="text-gray-800" />
                      </button>

                      <a
                        href={flyer}
                        download={`flyer-${idx}.jpg`}
                        className="p-2 bg-white rounded-full shadow hover:bg-gray-400"
                      >
                        <FaDownload className="text-gray-800" />
                      </a>

                      <button
                        onClick={() => handleShare(flyer)}
                        className="cursor-pointer p-2 bg-white rounded-full shadow hover:bg-gray-400"
                      >
                        <FaShareAlt className="text-gray-800" />
                      </button>

                      <button
                        onClick={() => handleDelete(idx)}
                        className="cursor-pointer p-2 bg-white rounded-full shadow hover:bg-gray-400"
                      >
                        <FaTrash className="text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "My Uploads" && (
        <p className="text-gray-500">Uploads section coming soon...</p>
      )}
    </div>
  </div>

  {/* ✅ Modal for Viewing Image */}
  {selectedFlyer && (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded-xl w-full max-w-5xl max-h-[90vh] flex flex-col items-center">
        <button
          onClick={() => setSelectedFlyer(null)}
          className="absolute top-2 right-2 text-black bg-gray-200 p-2 rounded-full"
        >
          ✖
        </button>

        <div className="flex gap-3 mb-2">
          <button
            onClick={zoomIn}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <FaSearchPlus />
          </button>
          <button
            onClick={zoomOut}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <FaSearchMinus />
          </button>
        </div>

        <div className="overflow-auto max-h-[75vh] w-full">
          <img
            src={selectedFlyer}
            alt="Selected Flyer"
            style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
            className="transition-transform duration-300 rounded-xl mx-auto max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  )}
</div>

  );
}
