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
  <div className="h-12 sm:h-14 md:h-16 bg-gradient-to-r from-pink-600 to-orange-500 text-white flex items-center justify-center text-sm sm:text-base md:text-lg font-semibold shadow-md">
   
  </div>

  {/* Main Content */}
  <div className="flex flex-1 flex-col sm:flex-row overflow-hidden">
    {/* Sidebar for desktop/tablet */}
    <div className="hidden sm:flex w-20 md:w-32 flex-col py-4 bg-gray-100 border-r border-gray-200 shadow-xl space-y-4">
      {[
        { key: "templates", icon: <FaRegImages size={22} />, label: "Templates", completed: isTemplateSelected },
        { key: "product", icon: <MdGridView size={22} />, label: "Products", completed: isProductSelected },
        { key: "details", icon: <MdNoteAdd size={22} />, label: "Details", completed: isDetailsConfirmed },
        { key: "gallery", icon: <MdPhotoLibrary size={22} />, label: "Result", completed: false },
      ].map((item) => (
        <div
          key={item.key}
          onClick={() => setActive(item.key)}
          className={`cursor-pointer flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 relative group ${
            active === item.key
              ? "bg-gradient-to-tr from-pink-500 to-orange-400 text-white shadow-lg scale-105"
              : "bg-white hover:shadow-md hover:scale-105 text-gray-700"
          }`}
        >
          <div className="relative">
            {item.icon}
            {item.completed && (
              <FaCheckCircle className="absolute -top-1 -left-5 text-green-400 text-sm" />
            )}
          </div>
          <span className="font-medium text-center text-xs md:text-sm">{item.label}</span>
        </div>
      ))}
    </div>

    {/* Middle Panel */}
    <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
      {/* Mobile Selected Template */}
      {selectedTemplate && (
        <div className="sm:hidden w-full p-1 bg-gray-50 flex justify-center ">
          <div className="relative mt-4 w-full max-w-[95%] h-auto max-h-[40vh] rounded-xl flex items-center justify-center">
            <img
              src={diwali.find((d) => d.id === selectedTemplate.id)?.img}
              alt={selectedTemplate.name}
              className="w-full h-full object-cover rounded-xl shadow-md"
            />
            {/* Floating edit buttons */}
            <div className="absolute top-2 left-2 flex flex-col gap-2 z-50">
              {[
                { icon: <FaHeading size={14} />, type: "headline" },
                { icon: <MdSubtitles size={14} />, type: "subtext" },
                { icon: <RiPriceTag3Fill size={14} />, type: "offer" },
                { icon: <FaTag size={14} />, type: "offer_tag" },
              ].map((btn, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setModalType(btn.type);
                    setIsModalOpen(true);
                  }}
                  className={`p-2 rounded-full shadow-md hover:scale-110 transition relative group ${
                    savedData[selectedTemplate?.id]?.[btn.type]
                      ? "bg-pink-600/70 text-white ring-2 ring-pink-600"
                      : "bg-white text-black"
                  }`}
                >
                  {btn.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div className="w-full sm:w-64 md:w-72 lg:w-80 bg-white border-r border-gray-200 p-3 sm:p-5 overflow-y-auto flex flex-col">
    
        {active === "templates" && (
          <div className="grid gap-3 sm:gap-4 grid-cols-2">
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
                  className="w-full h-24 sm:h-28 md:h-32 object-cover"
                />
                {selectedTemplate?.id === temp.id && (
                  <FaCheckCircle className="absolute top-2 left-2 text-green-400 text-lg drop-shadow-lg" />
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
                  className={`relative border-2 rounded-2xl shadow-md flex flex-col items-center p-2 hover:shadow-lg transition cursor-pointer ${
                    isSelected ? "ring-4 ring-pink-200 border-pink-300 scale-105" : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <FaCheckCircle className="absolute top-1 left-1 text-green-500 text-sm drop-shadow-md" />
                  )}
                  <img
                    src={prod.imageUrl}
                    alt={prod.product_name}
                    className="w-full h-20 sm:h-24 object-contain mb-2"
                  />
                  <h4 className="font-medium text-xs sm:text-sm text-gray-800 text-center">
                    {prod.product_name}
                  </h4>
                </div>
              );
            })}
          </div>
        )}

        {active === "details" && (
          <div className="space-y-3 mb-24">
            <h3 className="text-base font-semibold mb-2">Add Details</h3>
            <input type="text" placeholder="Enter Name" className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400 outline-none" />
            <input type="text" placeholder="Enter Mobile Number" className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400 outline-none" />
            <input type="text" placeholder="Enter Address" className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400 outline-none" />
            <button
              onClick={() => setIsDetailsConfirmed(true)}
              className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white py-2 rounded-lg shadow-md hover:opacity-90 transition text-sm"
            >
              Confirm and Generate
            </button>
          </div>
        )}

        {active === "gallery" && (
          <div>
            <h3 className="text-base font-semibold mb-2">Gallery</h3>
            <p className="text-sm text-gray-600">Gallery images yaha show hongi...</p>
          </div>
        )}
      </div>

      {/* Right Content (Desktop preview) */}
      <div className="hidden sm:flex flex-1 items-center justify-center relative overflow-hidden bg-gray-50 p-2 sm:p-4">
        {selectedTemplate ? (
          <div className="relative bg-white/80 backdrop-blur-md shadow-2xl w-full max-w-[360px] md:max-w-[440px] lg:max-w-[520px] xl:max-w-[640px] h-60 sm:h-72 md:h-[380px] lg:h-[500px] rounded-xl flex items-center justify-center overflow-hidden">
            <img
              src={diwali.find((d) => d.id === selectedTemplate.id)?.img}
              alt={selectedTemplate.name}
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {[
                { icon: <FaHeading size={14} />, type: "headline" },
                { icon: <MdSubtitles size={14} />, type: "subtext" },
                { icon: <RiPriceTag3Fill size={14} />, type: "offer" },
                { icon: <FaTag size={14} />, type: "offer_tag" },
              ].map((btn, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setModalType(btn.type);
                    setIsModalOpen(true);
                  }}
                  className={`p-2 rounded-full shadow-md hover:scale-110 transition relative group ${
                    savedData[selectedTemplate?.id]?.[btn.type]
                      ? "bg-pink-600/70 text-white ring-2 ring-pink-600"
                      : "bg-white text-black"
                  }`}
                >
                  {btn.icon}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative bg-gray-200 shadow-inner w-full max-w-[360px] md:max-w-[440px] lg:max-w-[520px] xl:max-w-[640px] h-60 sm:h-72 md:h-[380px] lg:h-[500px] rounded-xl flex items-center justify-center text-gray-500 text-sm">
            No Template Selected
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Bottom navbar for mobile */}
  <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around py-2">
    {[
      { key: "templates", icon: <FaRegImages size={18} />, label: "Templates", completed: isTemplateSelected },
      { key: "product", icon: <MdGridView size={18} />, label: "Products", completed: isProductSelected },
      { key: "details", icon: <MdNoteAdd size={18} />, label: "Details", completed: isDetailsConfirmed },
      { key: "gallery", icon: <MdPhotoLibrary size={18} />, label: "Result", completed: false },
    ].map((item) => (
      <button
        key={item.key}
        onClick={() => setActive(item.key)}
        className={`cursor-pointer flex flex-col items-center text-xs ${
          active === item.key ? "text-pink-600 font-semibold" : "text-gray-600"
        }`}
      >
        <div className="relative">
          {item.icon}
          {item.completed && (
            <FaCheckCircle className="absolute -top-1 -right-2 text-green-400 text-xs" />
          )}
        </div>
        {item.label}
      </button>
    ))}
  </div>

  {/* Edit Modal */}
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









  );
};

export default DiwaliUI;
