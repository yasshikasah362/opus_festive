'use client'
import React, { useState } from "react";

import { FaRegImages } from "react-icons/fa";
import { MdNoteAdd, MdPhotoLibrary } from "react-icons/md";

const FestivesUI = () => {
  const [active, setActive] = useState("templates");

  return (
    <div className="flex flex-col h-screen">
  {/* Navbar placeholder (height 16) */}
  <div className="h-16 bg-gray-800">Navbar</div>

  {/* Main Content */}
  <div className="flex flex-1 overflow-hidden">
    {/* Left Panel */}
    <div className="w-28 flex flex-col py-3 bg-gray-200 border-r-2 border-r-gray-100 shadow-2xl space-y-4 pl-2 pr-2">
      {/* Templates Card */}
      <div
        onClick={() => setActive("templates")}
        className={`cursor-pointer flex items-center gap-1 p-3 rounded-xl shadow-md transition-all duration-200 ${
          active === "templates"
            ? "bg-[#FC6C87] text-white shadow-lg scale-105"
            : "bg-white hover:shadow-lg hover:scale-105"
        }`}
      >
        <div className="flex flex-col items-center pb-2">
          <FaRegImages size={20} />
          <span className="font-semibold text-sm">Select</span>
          <span className="font-semibold text-sm">Templates</span>
        </div>
      </div>

      {/* Add Details Card */}
      <div
        onClick={() => setActive("details")}
        className={`cursor-pointer flex items-center gap-1 p-3 rounded-xl shadow-md transition-all duration-200 ${
          active === "details"
            ? "bg-[#FC6C87] text-white shadow-lg scale-105"
            : "bg-white hover:shadow-lg hover:scale-105"
        }`}
      >
        <div className="flex flex-col items-center ml-2">
          <MdNoteAdd size={20} />
          <span className="font-semibold text-sm">Add</span>
          <span className="font-semibold text-sm">Details</span>
        </div>
      </div>

      {/* Gallery Card */}
      <div
        onClick={() => setActive("gallery")}
        className={`cursor-pointer flex items-center gap-3 p-3 rounded-xl shadow-md transition-all duration-200 ${
          active === "gallery"
            ? "bg-[#FC6C87] text-white shadow-lg scale-105"
            : "bg-white hover:shadow-lg hover:scale-105"
        }`}
      >
        <div className="flex flex-col items-center pb-2 ml-1">
          <MdPhotoLibrary size={20} />
          <span className="font-semibold text-sm pt-2">Gallery</span>
        </div>
      </div>
    </div>

    {/* Sub Panel */}
    <div className="w-75 bg-white border-r-2 border-r-gray-200 p-4 overflow-auto">
      {active === "templates" && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Templates</h3>
          {/* <p className="text-sm text-gray-600">Template list yaha show hogi...</p> */}
        </div>
      )}

      {active === "details" && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Add Details</h3>
          <input
            type="text"
            placeholder="Enter Name"
            className="w-full border rounded px-3 py-2 mb-2"
          />
          <input
            type="text"
            placeholder="Enter Mobile Number"
            className="w-full border rounded px-3 py-2 mb-2"
          />
          <input
            type="text"
            placeholder="Enter Address"
            className="w-full border rounded px-3 py-2 mb-2"
          />
          <button className="w-full bg-[#FC6C87] text-white py-2 rounded-md">
            Confirm
          </button>
        </div>
      )}

      {active === "gallery" && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Gallery</h3>
          <p className="text-sm text-gray-600">Gallery images yaha show hongi...</p>
        </div>
      )}
    </div>

    {/* Right Content */}
    <div className="flex-1 flex items-center justify-center relative overflow-hidden">
      <div className="relative bg-gray-200 shadow-lg w-200 h-120 rounded-xl flex items-center justify-center">
        No Template Selected
      </div>
    </div>
  </div>
</div>



  );
};

export default FestivesUI;
