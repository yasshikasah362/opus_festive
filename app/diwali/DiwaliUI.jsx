"use client";
import React, { useState, useEffect} from "react";
import { motion } from "framer-motion";
import { FaRegImages, FaHeading, FaTag, FaCheckCircle, FaExclamationCircle,FaTimes } from "react-icons/fa";
import { MdNoteAdd, MdPhotoLibrary, MdGridView, MdSubtitles } from "react-icons/md";
import { RiPriceTag3Fill } from "react-icons/ri";
import EditModal from "./EditModal";
import Masonry from "react-masonry-css";

const DiwaliUI = ({ username }) => {
  const [active, setActive] = useState(null); // current active step
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
  const [searchQuery, setSearchQuery] = useState("");


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

  const steps = [
    { key: "templates", icon: <FaRegImages size={22} />, label: "1. Select Template", completed: isTemplateSelected, disabled: false },
    { key: "product", icon: <MdGridView size={22} />, label: "2. Select Products", completed: isProductSelected, disabled: !isTemplateSelected },
    { key: "details", icon: <MdNoteAdd size={22} />, label: "3. Add Details", completed: isDetailsConfirmed, disabled: !isProductSelected },
    { key: "gallery", icon: <MdPhotoLibrary size={22} />, label: "4. Results", completed: false, disabled: !isDetailsConfirmed },
  ];


  return (
    <div className="flex h-screen relative pt-12 sm:pt-14 md:pt-16 ">

      {/* Left-most step sidebar */}
      <div className="hidden sm:flex w-20 md:w-32 flex-col p-4 bg-gray-100 border-r border-gray-200 shadow-xl space-y-4 z-30">
        {steps.map((item) => {
          let enabled = false;
          if (item.key === "templates") enabled = true;
          else if (item.key === "product") enabled = isTemplateSelected;
          else if (item.key === "details") enabled = isProductSelected;
          else if (item.key === "gallery") enabled = isDetailsConfirmed;

          return (
            <div
              key={item.key}
              onClick={() => enabled && setActive(item.key)}
              className={`cursor-pointer flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 relative group ${
                active === item.key
                  ? "bg-gradient-to-tr from-pink-500 to-orange-400 text-white shadow-lg scale-105"
                  : enabled
                  ? "bg-gradient-to-tr from-pink-500 to-orange-400 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.completed ? (
                  <FaCheckCircle className="absolute -top-1 -left-5 text-green-400 w-4 h-4" />
                ) : (
                  <FaExclamationCircle className="absolute -top-1 -left-5 text-yellow-500 w-4 h-4" />
                )}
              </div>
              <span className="font-medium text-center text-xs md:text-sm">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Sliding Panel */}
      <motion.div
  initial={{ x: -300 }}
  animate={{ x: active ? 0 : -300 }}
  transition={{ type: "spring", stiffness: 100, damping: 50 }}
  className="w-72 bg-white border-r border-gray-200 shadow-xl flex-shrink-0 p-3 sm:p-5 flex flex-col z-20 relative"
>
  {/* 🔹 Close Icon */}
  {/* 🔹 Header with Close Button */}
<div className="flex items-center justify-between mb-3">
  <h2 className="text-sm font-semibold text-gray-700 capitalize">
    {active === "templates"
      ? "Templates"
      : active === "product"
      ? "Products"
      : "Panel"}
  </h2>

  <button
    onClick={() => setActive(null)} // close panel
    className="cursor-pointer text-gray-500 hover:text-red-500 transition"
  >
    <FaTimes size={18} />
  </button>
</div>

{/* 🔍 Search bar for templates and products */}
{(active === "templates" || active === "product") && (
  <input
    type="text"
    placeholder={`Search ${
      active === "templates" ? "Templates" : "Products"
    }`}
    className="w-full mb-3 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400 outline-none"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
)}


  {/* Templates Panel */}
  {active === "templates" && (
    <div className="grid gap-3 sm:gap-4 grid-cols-2 mt-8">
      {templates
        .filter((temp) =>
          searchQuery.length >= 3
            ? temp.name.toLowerCase().includes(searchQuery.toLowerCase())
            : true
        )
        .map((temp, index) => (
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
              <FaCheckCircle className="absolute top-2 left-2 text-green-400 text-lg drop-shadow-lg w-4 h-4" />
            )}
          </div>
        ))}
    </div>
  )}

  {/* Products Panel */}
  {active === "product" && (
    <Masonry
      breakpointCols={{ default: 2, 768: 2, 1024: 3 }}
      className="flex w-auto gap-3 sm:gap-4 mt-8"
      columnClassName="bg-clip-padding"
    >
      {products
        .filter((prod) =>
          searchQuery.length >= 3
            ? prod.product_name.toLowerCase().includes(searchQuery.toLowerCase())
            : true
        )
        .map((prod, i) => {
          const isSelected = selectedProduct?.product_name === prod.product_name;
          return (
            <div
              key={i}
              onClick={() => {
                setSelectedProduct(prod);
                setIsProductSelected(true);
              }}
              className={`relative border-2 rounded-2xl shadow-md flex flex-col items-center p-2 hover:shadow-lg transition cursor-pointer mb-4 ${
                isSelected ? "ring-4 ring-pink-200 border-pink-300 scale-105" : "border-gray-300"
              }`}
            >
              {isSelected && (
                <FaCheckCircle className="absolute top-1 left-1 text-green-500 text-sm drop-shadow-md" />
              )}
              <img
                src={prod.imageUrl}
                alt={prod.product_name}
                className="w-full object-contain mb-2"
              />
              <h4 className="font-medium text-xs sm:text-sm text-gray-800 text-center">
                {prod.product_name}
              </h4>
            </div>
          );
        })}
    </Masonry>
  )}

  {/* Details Panel */}
  {active === "details" && (
    <div className="space-y-3 mb-24 mt-8">
      <h3 className="text-base font-semibold mb-2">Add Details</h3>
      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400 outline-none"
      />
      <input
        type="text"
        name="mobileNumber"
        placeholder="Enter Mobile Number"
        className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400 outline-none"
      />
      <input
        type="text"
        name="address"
        placeholder="Enter Address"
        className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400 outline-none"
      />
      <button
        onClick={() => setIsDetailsConfirmed(true)}
        className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white py-2 rounded-lg shadow-md hover:opacity-90 transition text-sm"
      >
        Confirm and Generate
      </button>
    </div>
  )}
</motion.div>


      {/* Canvas Preview */}
      <motion.div
  className="flex-1 flex items-center justify-center relative overflow-hidden p-2 sm:p-4 mr-50"
  initial={false}
  animate={{ marginLeft: active ? 0 : -80 }} // <- move left when active
  transition={{ type: "tween", duration: 0.35 }}
>
  {selectedTemplate ? (
    <div className="relative bg-white/80 backdrop-blur-md shadow-2xl w-full max-w-[640px] h-[500px] rounded-xl flex items-center justify-center overflow-hidden">
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
    <div className="relative bg-gray-200 shadow-inner w-full max-w-[640px] h-[500px] rounded-xl flex items-center justify-center text-gray-500 text-sm">
      No Template Selected
    </div>
  )}
</motion.div>


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
