'use client'
import React, { useState } from "react";
import { FaRegImages } from "react-icons/fa";
import { MdNoteAdd, MdPhotoLibrary } from "react-icons/md";

const FestivesUI = () => {
  const [active, setActive] = useState("templates");

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar placeholder (height 16) */}
      <div className="h-14 sm:h-16 bg-gray-800 flex items-center justify-center text-white text-base sm:text-lg font-semibold">
        Navbar
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-20 sm:w-28 flex flex-col py-3 bg-gray-200 border-r-2 border-r-gray-100 shadow-lg space-y-3 sm:space-y-4 px-2">
          {/* Templates Card */}
          <div
            onClick={() => setActive("templates")}
            className={`cursor-pointer flex items-center justify-center sm:justify-start gap-1 p-2 sm:p-3 rounded-xl shadow-md transition-all duration-200 ${
              active === "templates"
                ? "bg-[#FC6C87] text-white shadow-lg scale-105"
                : "bg-white hover:shadow-lg hover:scale-105"
            }`}
          >
            <div className="flex flex-col items-center sm:items-center text-xs sm:text-sm">
              <FaRegImages size={18} className="sm:size-20" />
              <span className="font-semibold">Select</span>
              <span className="font-semibold">Templates</span>
            </div>
          </div>

          {/* Add Details Card */}
          <div
            onClick={() => setActive("details")}
            className={`cursor-pointer flex items-center justify-center sm:justify-start gap-1 p-2 sm:p-3 rounded-xl shadow-md transition-all duration-200 ${
              active === "details"
                ? "bg-[#FC6C87] text-white shadow-lg scale-105"
                : "bg-white hover:shadow-lg hover:scale-105"
            }`}
          >
            <div className="flex flex-col items-center text-xs sm:text-sm">
              <MdNoteAdd size={18} />
              <span className="font-semibold">Add</span>
              <span className="font-semibold">Details</span>
            </div>
          </div>

          {/* Gallery Card */}
          <div
            onClick={() => setActive("gallery")}
            className={`cursor-pointer flex items-center justify-center sm:justify-start gap-1 p-2 sm:p-3 rounded-xl shadow-md transition-all duration-200 ${
              active === "gallery"
                ? "bg-[#FC6C87] text-white shadow-lg scale-105"
                : "bg-white hover:shadow-lg hover:scale-105"
            }`}
          >
            <div className="flex flex-col items-center text-xs sm:text-sm">
              <MdPhotoLibrary size={18} />
              <span className="font-semibold">Gallery</span>
            </div>
          </div>
        </div>

        {/* Sub Panel */}
        <div className="w-64 sm:w-80 md:w-96 bg-white border-r-2 border-r-gray-200 p-3 sm:p-4 overflow-auto">
          {active === "templates" && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3">Templates</h3>
              {/* Template list yaha show hogi */}
            </div>
          )}

          {active === "details" && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3">Add Details</h3>
              <input
                type="text"
                placeholder="Enter Name"
                className="w-full border rounded px-3 py-2 mb-2 text-sm sm:text-base"
              />
              <input
                type="text"
                placeholder="Enter Mobile Number"
                className="w-full border rounded px-3 py-2 mb-2 text-sm sm:text-base"
              />
              <input
                type="text"
                placeholder="Enter Address"
                className="w-full border rounded px-3 py-2 mb-2 text-sm sm:text-base"
              />
              <button className="w-full bg-[#FC6C87] text-white py-2 rounded-md text-sm sm:text-base">
                Confirm
              </button>
            </div>
          )}

          {active === "gallery" && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3">Gallery</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Gallery images yaha show hongi...
              </p>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden p-2 sm:p-4">
          <div className="relative bg-gray-200 shadow-lg w-full max-w-[500px] h-64 sm:h-96 md:h-[28rem] rounded-xl flex items-center justify-center text-sm sm:text-base text-gray-600">
            No Template Selected
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivesUI;
