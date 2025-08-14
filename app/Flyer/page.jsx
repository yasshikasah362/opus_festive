"use client";
import { useState } from "react";
import { FaRegImages, FaFont, FaCloudUploadAlt, FaTools, FaFolder, FaShapes, FaCrop, FaUndo, FaRedo, FaPalette, FaClock, FaLayerGroup } from "react-icons/fa";
import { MdBrandingWatermark, MdEdit } from "react-icons/md";

export default function Flyer() {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgDimensions, setImgDimensions] = useState(null);

  const menuItems = [
    { id: "templates", icon: <FaRegImages size={20} />, label: "Templates" },
    { id: "elements", icon: <FaShapes size={20} />, label: "Elements" },
    { id: "text", icon: <FaFont size={20} />, label: "Text" },
    { id: "brand", icon: <MdBrandingWatermark size={20} />, label: "Brand" },
    { id: "uploads", icon: <FaCloudUploadAlt size={20} />, label: "Uploads" },
    { id: "tools", icon: <FaTools size={20} />, label: "Tools" },
    { id: "projects", icon: <FaFolder size={20} />, label: "Projects" },
  ];

  const handleImageClick = (src) => {
    // Just set the src; we’ll read natural size when the <img> in the canvas finishes loading
    setSelectedImage(src);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#FFB199] to-[#FC6C87] text-white px-4 py-4 flex items-center justify-between mt-16">
        <div className="flex items-center gap-4 text-xl">
          <FaCrop className="cursor-pointer hover:text-[#FC6C87]" title="Resize" />
          <MdEdit className="cursor-pointer hover:text-[#FC6C87]" title="Editing" />
          <FaUndo className="cursor-pointer hover:text-[#FC6C87]" title="Undo" />
          <FaRedo className="cursor-pointer hover:text-[#FC6C87]" title="Redo" />
        </div>
        <div className="flex items-center gap-4 text-xl">
          <FaPalette className="cursor-pointer hover:text-[#FFB199]" title="Color" />
          <FaClock className="cursor-pointer hover:text-[#FFB199]" title="Duration" />
          <FaLayerGroup className="cursor-pointer hover:text-[#FFB199]" title="Position" />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        {/* ICON MENU */}
        <aside className="w-16 bg-white border-r flex flex-col items-center py-4 space-y-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center text-gray-600 hover:text-[#FC6C87] ${
                activeTab === item.id ? "text-blue-500" : ""
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span className="text-[10px] mt-1">{item.label}</span>
            </button>
          ))}
        </aside>

        {/* SIDEBAR CONTENT */}
        <aside className="w-64 bg-white border-r p-4 flex flex-col">
          {activeTab === "templates" ? (
            <>
              <h2 className="text-lg font-semibold mb-4">Templates</h2>
              <input
                type="text"
                placeholder="Search templates"
                className="border rounded-lg px-3 py-2 mb-4 w-full"
              />
              <div className="space-y-3 overflow-y-auto flex-1">
                {Array.from({ length: 6 }).map((_, i) => {
                  const src = `/images/flyer${i + 1}.jpg`; // place images in /public/images/
                  const isSelected = selectedImage === src;
                  return (
                    <div
                      key={i}
                      className={`border rounded-lg overflow-hidden cursor-pointer hover:shadow ${
                        isSelected ? "ring-2 ring-[#FC6C87]" : ""
                      }`}
                      onClick={() => handleImageClick(src)}
                    >
                      <img src={src} alt={`Template ${i + 1}`} className="w-full block" draggable={false} />
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Content
            </div>
          )}
        </aside>

        {/* CANVAS AREA */}
       <main className="flex-1 flex items-center justify-center bg-gray-50 overflow-auto">
  <div
    className="bg-white border shadow-lg flex items-center justify-center overflow-hidden"
    style={{
      width: "800px", // fixed size
      height: "500px",
    }}
  >
    {selectedImage ? (
      <img
        src={selectedImage}
        alt="Selected"
        className="w-full h-full object-cover" // 👈 fills the div completely
        draggable={false}
      />
    ) : (
      <span className="text-gray-400">No Template Selected</span>
    )}
  </div>
</main>



      </div>

      {/* FOOTER TOOLBAR */}
      <footer className="bg-white border-t px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="px-3 py-1 rounded hover:bg-gray-100">Notes</button>
          <button className="px-3 py-1 rounded hover:bg-gray-100">Duration</button>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded hover:bg-gray-100">-</button>
          <span>48%</span>
          <button className="px-3 py-1 rounded hover:bg-gray-100">+</button>
        </div>
      </footer>
    </div>
  );
}
