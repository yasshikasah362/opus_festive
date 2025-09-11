"use client";
import React, { useState, useEffect } from "react";
import { FaRegImages, FaHeading, FaTag, FaCheckCircle } from "react-icons/fa";
import { MdNoteAdd, MdPhotoLibrary, MdGridView, MdSubtitles } from "react-icons/md";
import { RiPriceTag3Fill } from "react-icons/ri";
import EditModal from "./EditModal";

const DiwaliUI = ({ username }) => {
  const [active, setActive] = useState("templates");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [savedData, setSavedData] = useState({});
  const [isTemplateSelected, setIsTemplateSelected] = useState(false);
  const [isProductSelected, setIsProductSelected] = useState(false);
  const [isDetailsConfirmed, setIsDetailsConfirmed] = useState(false);

  useEffect(() => {
    fetch("/diwali.json")
      .then((res) => res.json())
      .then((data) => setTemplates(data))
      .catch((err) => console.error("Error loading templates:", err));
  }, []);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  let diwali = [
    { id: 1, img: "/diwali1.jpeg" },
    { id: 2, img: "/diwali2.jpeg" },
    { id: 3, img: "/diwali3.jpeg" },
    { id: 4, img: "/diwali4.jpeg" },
    { id: 5, img: "/diwali5.jpeg" },
    { id: 6, img: "/diwali6.jpeg" },
    { id: 7, img: "/diwali7.jpeg" },
    { id: 8, img: "/diwali8.jpeg" },
    { id: 9, img: "/diwali9.jpeg" },
    { id: 10, img: "/diwali10.jpeg" },
  ];

  const getOptions = () => {
    if (!selectedTemplate) return [];
    const ps = selectedTemplate.prompt_settings;
    switch (modalType) {
      case "headline":
        return [ps.text_section.headline, ps.text_section.font_style, ps.text_section.font_color];
      case "subtext":
        return [ps.text_section.subtext, ps.text_section.position];
      case "offer":
        return [ps.offer_tag.text, ps.offer_tag.position, ps.offer_tag.style];
      case "offer_tag":
        return [ps.call_to_action.text, ps.call_to_action.style, ps.call_to_action.location];
      default:
        return [];
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="h-14 sm:h-16 bg-gradient-to-r from-pink-600 to-orange-500 text-white flex items-center justify-center text-base sm:text-lg font-semibold shadow-md">
        🎉 Diwali Designer
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-20 sm:w-28 flex flex-col py-3 sm:py-4 bg-gray-100 border-r border-gray-200 shadow-xl space-y-4">
          {[
            { key: "templates", icon: <FaRegImages size={20} />, label: "1. Select Templates", completed: isTemplateSelected },
            { key: "product", icon: <MdGridView size={20} />, label: "2.Products", completed: isProductSelected },
            { key: "details", icon: <MdNoteAdd size={20} />, label: "3. Add Details", completed: isDetailsConfirmed },
            { key: "gallery", icon: <MdPhotoLibrary size={20} />, label: "4. Result", completed: false },
          ].map((item) => (
            <div
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`cursor-pointer flex flex-col items-center gap-1 p-2 sm:p-3 rounded-xl transition-all duration-200 relative group ${
                active === item.key
                  ? "bg-gradient-to-tr from-pink-500 to-orange-400 text-white shadow-lg scale-105"
                  : "bg-white hover:shadow-md hover:scale-105 text-gray-700"
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.completed && (
                  <FaCheckCircle className="absolute -top-1 -left-6 sm:-left-8 text-green-400" />
                )}
              </div>
              <span className="font-medium text-center text-xs sm:text-sm">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Middle Panel */}
        <div className="w-full sm:w-[280px] md:w-[350px] lg:w-[420px] bg-white border-r border-gray-200 p-3 sm:p-5 overflow-y-auto">
          {active === "templates" && (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
              {templates.map((temp, index) => (
                <div
                  key={temp.id}
                  onClick={() => {
                    setSelectedTemplate(temp);
                    setIsTemplateSelected(true);
                  }}
                  className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-md transition-all duration-300 ${
                    selectedTemplate?.id === temp.id
                      ? "ring-4 ring-pink-400 scale-105"
                      : "hover:scale-105 hover:shadow-lg"
                  }`}
                >
                  <img
                    src={diwali[index]?.img}
                    alt={temp.name || `Template ${temp.id}`}
                    className="w-full h-28 sm:h-40 object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition">
                    <h5 className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-white font-semibold text-xs sm:text-sm">
                      {temp.name}
                    </h5>
                  </div>
                  {selectedTemplate?.id === temp.id && (
                    <FaCheckCircle className="absolute top-2 left-2 text-green-400 text-xl sm:text-2xl drop-shadow-lg" />
                  )}
                </div>
              ))}
            </div>
          )}

          {active === "product" && (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {products.map((prod, i) => {
                const isSelected = selectedProduct?.product_name === prod.product_name;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedProduct(prod);
                      setIsProductSelected(true);
                    }}
                    className={`relative border-2 rounded-2xl shadow-md flex flex-col items-center p-2 sm:p-3 hover:shadow-lg transition cursor-pointer ${
                      isSelected ? "ring-4 ring-pink-200 border-pink-300 scale-105" : "border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <FaCheckCircle className="absolute top-1 left-1 sm:top-2 sm:left-2 text-green-500 text-base sm:text-lg drop-shadow-md" />
                    )}
                    <img
                      src={prod.imageUrl}
                      alt={prod.product_name}
                      className="w-full h-20 sm:h-24 object-contain mb-1 sm:mb-2"
                    />
                    <h4 className="font-medium text-xs sm:text-sm text-gray-800">{prod.product_name}</h4>
                  </div>
                );
              })}
            </div>
          )}

          {active === "details" && (
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-semibold mb-2">Add Details</h3>
              <input type="text" placeholder="Enter Name" className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-pink-400 outline-none" />
              <input type="text" placeholder="Enter Mobile Number" className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-pink-400 outline-none" />
              <input type="text" placeholder="Enter Address" className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-pink-400 outline-none" />
              <button onClick={() => setIsDetailsConfirmed(true)} className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white py-2 rounded-lg shadow-md hover:opacity-90 transition">
                Confirm and Generate
              </button>
            </div>
          )}

          {active === "gallery" && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Gallery</h3>
              <p className="text-xs sm:text-sm text-gray-600">Gallery images yaha show hongi...</p>
            </div>
          )}
        </div>

        {/* Right Content (Preview) */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-gray-50">
          {selectedTemplate ? (
            <div className="relative bg-white/80 backdrop-blur-md shadow-2xl w-full sm:w-[320px] md:w-[400px] lg:w-[500px] h-64 sm:h-80 md:h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl flex items-center justify-center overflow-hidden">
              <img
                src={diwali.find((d) => d.id === selectedTemplate.id)?.img}
                alt={selectedTemplate.name}
                className="w-full h-full object-cover rounded-md"
              />
              {/* Floating Edit Buttons */}
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 flex flex-col gap-2 sm:gap-3">
                {[
                  { icon: <FaHeading size={16} />, type: "headline", label: "Edit Headline" },
                  { icon: <MdSubtitles size={16} />, type: "subtext", label: "Edit Subtext" },
                  { icon: <RiPriceTag3Fill size={16} />, type: "offer", label: "Edit Offer" },
                  { icon: <FaTag size={16} />, type: "offer_tag", label: "Edit CTA" },
                ].map((btn, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setModalType(btn.type);
                      setIsModalOpen(true);
                    }}
                    className={`p-2 sm:p-3 rounded-full shadow-md hover:scale-110 transition relative group ${
                      savedData[selectedTemplate?.id]?.[btn.type]
                        ? "bg-pink-600/70 text-white ring-2 ring-pink-600"
                        : "bg-white text-black"
                    }`}
                  >
                    {btn.icon}
                    <span className="absolute left-10 sm:left-12 top-1/2 -translate-y-1/2 bg-black text-white text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                      {btn.label}
                    </span>
                  </button>
                ))}
              </div>
              {/* Modal */}
              <EditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type={modalType}
                options={getOptions()}
                onSave={(val) => {
                  setSavedData((prev) => ({
                    ...prev,
                    [selectedTemplate.id]: {
                      ...(prev[selectedTemplate.id] || {}),
                      [modalType]: val,
                    },
                  }));
                  setIsModalOpen(false);
                }}
              />
            </div>
          ) : (
            <div className="relative bg-gray-200 shadow-inner w-full sm:w-[320px] md:w-[400px] lg:w-[500px] h-64 sm:h-80 md:h-[400px] lg:h-[500px] rounded-xl flex items-center justify-center text-gray-500 text-xs sm:text-sm">
              No Template Selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiwaliUI;
