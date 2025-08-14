"use client";
import { useState, useEffect } from "react";
import {
  FaRegImages,
  FaFont,
  FaCloudUploadAlt,
  FaShapes,
  FaCrop,
  FaUndo,
  FaRedo,
  FaPalette,
  FaClock,
  FaLayerGroup
} from "react-icons/fa";
import { MdBrandingWatermark, MdEdit } from "react-icons/md";
import productsData from "../../public/products.json";

export default function Flyer() {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedImage, setSelectedImage] = useState(null);
  const [products, setProducts] = useState([]); // store products from JSON

  const menuItems = [
    { id: "templates", icon: <FaRegImages size={20} />, label: "Templates" },
    { id: "products", icon: <FaShapes size={20} />, label: "Products" },
    { id: "text", icon: <FaFont size={20} />, label: "Text" },
    { id: "tags", icon: <MdBrandingWatermark size={20} />, label: "Tags" },
    { id: "color", icon: <FaCloudUploadAlt size={20} />, label: "Color" },
  ];

  // Load products.json when tab changes to "products"
  useEffect(() => {
  if (activeTab === "products") {
    setProducts(productsData);
  }
}, [activeTab]);

  const handleImageClick = (src) => {
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
      <div className=" cursor-pointer flex flex-1 overflow-hidden">
        {/* ICON MENU */}
        <aside className=" cursor-pointer w-16 bg-white border-r flex flex-col items-center py-4 space-y-6">
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
        <aside className="w-64 cursor-pointer bg-white border-r p-4 flex flex-col">
          {activeTab === "templates" && (
            <>
              <h2 className="text-lg font-semibold mb-4">Templates</h2>
              <input
                type="text"
                placeholder="Search templates"
                className="border rounded-lg px-3 py-2 mb-4 w-full"
              />
              <div className="space-y-3 overflow-y-auto flex-1">
                {Array.from({ length: 6 }).map((_, i) => {
                  const src = `/images/flyer${i + 1}.jpg`;
                  const isSelected = selectedImage === src;
                  return (
                    <div
                      key={i}
                      className={`border rounded-lg overflow-hidden cursor-pointer hover:shadow ${
                        isSelected ? "ring-2 ring-[#FC6C87]" : ""
                      }`}
                      onClick={() => handleImageClick(src)}
                    >
                      <img
                        src={src}
                        alt={`Template ${i + 1}`}
                        className="w-full block"
                        draggable={false}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {activeTab === "products" && (
            <>
              <h2 className="text-lg font-semibold mb-4">Products</h2>
              <div className="space-y-3 overflow-y-auto flex-1">
                {products.length > 0 ? (
                  products.map((product, idx) => (
                    <div
                      key={idx}
                      className="border rounded-lg p-2 flex gap-2 items-center hover:shadow cursor-pointer"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.product_name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold text-sm">{product.product_name}</p>
                        <p className="text-xs text-gray-500">{product.category_name}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">Loading products...</p>
                )}
              </div>
            </>
          )}
        </aside>

        {/* CANVAS AREA */}
        <main className="flex-1 flex items-center justify-center bg-gray-50 overflow-auto">
          <div
            className="bg-white border shadow-lg flex items-center justify-center overflow-hidden"
            style={{
              width: "800px",
              height: "500px",
            }}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-cover"
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
