"use client";
import React, { useState, useEffect } from "react";
import {
  FaRegImages,
  FaHeading,
  FaTag,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { MdNoteAdd, MdPhotoLibrary, MdGridView, MdSubtitles } from "react-icons/md";
import { RiPriceTag3Fill } from "react-icons/ri";
import { motion } from "framer-motion";
import EditModal from "./EditModal";
import Masonry from "react-masonry-css";

const Gandhijayanti = ({ username }) => {
  const [active, setActive] = useState("null"); // current active step
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isTemplateSelected, setIsTemplateSelected] = useState(false);
  const [isProductSelected, setIsProductSelected] = useState(false);
  const [isDetailsConfirmed, setIsDetailsConfirmed] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [savedData, setSavedData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");


  // Sliding panel visibility
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isTemplatePanelOpen, setIsTemplatePanelOpen] = useState(false);
  

  useEffect(() => {
    fetch("/gandhijayanti.json")
      .then((res) => res.json())
      .then((data) => setTemplates(data))
      .catch((err) => console.error(err));

    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const templateImages = [
    { id: 1, img: "/gandhi1.jpeg" },
    { id: 2, img: "/gandhi2.jpeg" },
    { id: 3, img: "/gandhi3.jpeg" },
    { id: 4, img: "/gandhi4.jpeg" },
    { id: 5, img: "/gandhi5.jpeg" },
    { id: 6, img: "/gandhi6.jpeg" },
    { id: 7, img: "/gandhi7.jpeg" },
    { id: 8, img: "/gandhi8.jpeg" },
    { id: 9, img: "/gandhi9.jpeg" },
    { id: 10, img: "/gandhi10.jpeg" },
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

  const sidebarItems = [
    { key: "templates", icon: <FaRegImages size={20} />, label: "1. Select Templates", completed: isTemplateSelected, enabled: true },
    { key: "product", icon: <MdGridView size={20} />, label: "2. Products", completed: isProductSelected, enabled: isTemplateSelected },
    { key: "details", icon: <MdNoteAdd size={20} />, label: "3. Add Details", completed: isDetailsConfirmed, enabled: isProductSelected },
    { key: "gallery", icon: <MdPhotoLibrary size={20} />, label: "4. Result", completed: false, enabled: isDetailsConfirmed },
  ];

 const handleSidebarClick = (item) => {
  if (!item.enabled) return;

  setActive(item.key);

  // Open template panel only once
  if (item.key === "templates" && !isTemplatePanelOpen) {
    setIsTemplatePanelOpen(true);
  }
};


  


  return (
     <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="h-12 sm:h-14 md:h-16 bg-gradient-to-r from-pink-600 to-orange-500 text-white flex items-center justify-center text-sm sm:text-base md:text-lg font-semibold shadow-md">
        
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <div className="hidden sm:flex w-20 md:w-32 flex-col py-4 bg-gray-100 border-r border-gray-200 shadow-xl space-y-4 z-30">
          {sidebarItems.map((item) => (
            <div
              key={item.key}
              onClick={() => handleSidebarClick(item)}
              className={`cursor-pointer flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 relative group ${
                active === item.key
                  ? "bg-gradient-to-tr from-pink-500 to-orange-400 text-white shadow-lg scale-105"
                  : item.enabled
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
          ))}
        </div>

      {/* Sliding Panel */}
     <motion.div
  initial={{ x: -300, opacity: 0 }}
  animate={{
    x: isTemplatePanelOpen ? 0 : -300,
    opacity: isTemplatePanelOpen ? 1 : 0,
  }}
  transition={{ type: "spring", stiffness: 120, damping: 20 }}
  className="w-72 border-r border-gray-200 shadow-xl flex-shrink-0 p-3 sm:p-5 flex flex-col z-20"
>
  {/* Search bar for templates and products */}
  {(active === "templates" || active === "product") && (
    <input
      type="text"
      placeholder={`Search ${active === "templates" ? "Templates" : "Products"}`}
      className="w-full mb-3 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400 outline-none"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  )}

  {/* Templates Panel */}
  {active === "templates" && (
    <Masonry
      breakpointCols={{
        default: 2,
        768: 2,
        500: 1,
      }}
      className="flex gap-3 sm:gap-4"
      columnClassName="flex flex-col gap-3 sm:gap-4"
    >
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
              src={templateImages[index]?.img}
              alt={temp.name || `Template ${temp.id}`}
              className="w-full h-24 sm:h-28 md:h-32 object-cover rounded-xl"
            />
            {selectedTemplate?.id === temp.id && (
              <FaCheckCircle className="absolute top-2 left-2 text-green-400 text-lg drop-shadow-lg w-4 h-4" />
            )}
          </div>
        ))}
    </Masonry>
  )}

  {/* Products Panel */}
  {active === "product" && (
    <Masonry
      breakpointCols={{
        default: 2,
        768: 2,
        1024: 3,
      }}
      className="flex w-auto gap-3 sm:gap-4"
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
                style={{ width: "100%", height: "auto" }}
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
    <div className="space-y-3 mb-24">
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
        className="flex-1 flex items-center justify-center relative overflow-hidden  p-2 sm:p-4"
        animate={{ marginLeft: active ? 72 : 0 }}
        transition={{ type: "tween", duration: 0.35 }}
      >
        {selectedTemplate ? (
          <div className="relative  backdrop-blur-md shadow-2xl w-full max-w-[640px] h-[500px] rounded-xl flex items-center justify-center overflow-hidden">
            <img
              src={templateImages.find((d) => d.id === selectedTemplate.id)?.img}
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
    </div>
  );
};

export default Gandhijayanti;
