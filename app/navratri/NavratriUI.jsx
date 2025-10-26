'use client'
import React, { useState, useEffect } from "react";
import { FaRegImages, FaHeading, FaTag, FaCheckCircle, FaExclamationCircle,FaTimes } from "react-icons/fa";
import { MdNoteAdd, MdPhotoLibrary, MdGridView, MdSubtitles } from "react-icons/md";
import { RiPriceTag3Fill } from "react-icons/ri";
import EditModal from "./EditModal";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";


const Navratri = ({ username }) => {
  const [active, setActive] = useState("templates");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


  // Completion states
  const [isTemplateSelected, setIsTemplateSelected] = useState(false);
  const [isProductSelected, setIsProductSelected] = useState(false);
  const [isDetailsConfirmed, setIsDetailsConfirmed] = useState(false);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [savedData, setSavedData] = useState({});

  // Sliding panel state
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);

  // Fetch templates and products
  useEffect(() => {
    fetch("/navratri.json")
      .then(res => res.json())
      .then(data => setTemplates(data))
      .catch(err => console.error("Error loading templates:", err));

    fetch("/products.json")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error loading products:", err));
  }, []);

  // Track completion
  useEffect(() => setIsTemplateSelected(!!selectedTemplate), [selectedTemplate]);
  useEffect(() => setIsProductSelected(!!selectedProduct), [selectedProduct]);

  // Handle selections
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsProductSelected(true);
  };

  const handleConfirmDetails = () => {
    setIsDetailsConfirmed(true);
  };

  // Sample images
  const navratri = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    img: `/navratri${i + 1}.jpeg`,
  }));

  // Modal options
  const getOptions = () => {
    if (!selectedTemplate) return [];
    const ps = selectedTemplate.prompt_settings || {};
    switch (modalType) {
      case "headline": return [ps.text_section?.headline, ps.text_section?.font_style, ps.text_section?.font_color];
      case "subtext": return [ps.text_section?.subtext, ps.text_section?.position];
      case "offer": return [ps.offer_tag?.text, ps.offer_tag?.position, ps.offer_tag?.style];
      case "offer_tag": return [ps.call_to_action?.text, ps.call_to_action?.style, ps.call_to_action?.location];
      default: return [];
    }
  };

  // Sidebar items
  const sidebarItems = [
    { key: "templates", icon: <FaRegImages size={20} />, label1: "1. Select", label2: "Templates", completed: isTemplateSelected },
    { key: "product", icon: <MdGridView size={20} />, label1: "2. Select", label2: " Products", completed: isProductSelected },
    { key: "details", icon: <MdNoteAdd size={20} />, label1: "3. Add", label2: "Details", completed: isDetailsConfirmed },
    { key: "gallery", icon: <MdPhotoLibrary size={20} />, label1: "4. Result", label2: "", completed: false },
  ];

  // Disable step logic
  const isDisabled = (key) => {
    if (key === "product" && !isTemplateSelected) return true;
    if (key === "details" && !isProductSelected) return true;
    if (key === "gallery" && !isDetailsConfirmed) return true;
    return false;
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="h-12 sm:h-14 md:h-16 bg-gradient-to-r from-pink-600 to-orange-500 text-white flex items-center justify-center font-semibold text-sm sm:text-base md:text-lg shadow-md">
        Diwali Designer
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col sm:flex-row overflow-hidden relative">
        {/* Sidebar (Desktop) */}
        <div className="hidden sm:flex flex-col w-20 md:w-32 p-4 bg-gray-100 border-r border-gray-200 shadow-xl space-y-4 z-30">
          {sidebarItems.map(item => (
            <div
              key={item.key}
              onClick={() => {
                if (!isDisabled(item.key)) {
                  setActive(item.key);
                  if(item.key === "templates") setLeftPanelOpen(true);
                }
              }}
              className={`cursor-pointer flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 relative group ${
                active === item.key
                  ? "bg-gradient-to-tr from-pink-500 to-orange-400 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              } ${isDisabled(item.key) ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="relative">
                {item.icon}
                {item.completed
                  ? <FaCheckCircle className="absolute -top-1 -left-5 text-green-400 text-sm" />
                  : <FaExclamationCircle className="absolute -top-1 -left-5 text-yellow-500 w-4 h-4" />}
              </div>
              <span className="font-medium text-center text-xs md:text-sm">{item.label1}</span>
              {item.label2 && <span className="font-medium text-center text-xs md:text-sm">{item.label2}</span>}
            </div>
          ))}
        </div>

        {/* Sliding Panel (Desktop & Mobile) */}
        <AnimatePresence>

    {leftPanelOpen && (
  <motion.div
    initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 50 }}
    className="relative w-72 bg-white border-r border-gray-200 shadow-xl flex-shrink-0 p-3 sm:p-5 flex flex-col z-20"
  >
    {/* Close Button */}
    <div className="flex items-center justify-between ">
  <h2 className="text-sm font-semibold text-gray-700 capitalize">
    {active === "templates"
      ? "Templates"
      : active === "product"
      ? "Products"
      : "Panel"}
  </h2>
    <button
  onClick={() => setLeftPanelOpen(false)} // only hide the left panel
  className="cursor-pointer text-gray-500 hover:text-red-500 transition"
>
  <FaTimes size={18} />
</button>
  </div>

    {/* Search Bar for Templates and Products */}
    {(active === "templates" || active === "product") && (
      <input
        type="text"
        placeholder={`Search ${active === "templates" ? "Templates" : "Products"}`}
        className="w-full mt-3 mb-3 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400 outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    )}

    {/* Templates */}
    {active === "templates" && (
      <Masonry
        breakpointCols={{
          default: 2,
          768: 2,
          500: 1,
        }}
        className="flex gap-4"
        columnClassName="flex flex-col gap-4"
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
              onClick={() => setSelectedTemplate(temp)}
              className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-md transition-all duration-300 ${
                selectedTemplate?.id === temp.id
                  ? "ring-4 ring-pink-400 scale-105"
                  : "hover:scale-105 hover:shadow-lg"
              }`}
            >
              <img
                src={navratri[index]?.img}
                alt={temp.name}
                className="w-full object-cover rounded-xl"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition">
                <h5 className="absolute bottom-2 left-2 text-white font-semibold text-xs sm:text-sm">
                  {temp.name}
                </h5>
              </div>
              {selectedTemplate?.id === temp.id && (
                <FaCheckCircle className="absolute top-2 left-2 text-green-400 text-2xl drop-shadow-lg w-4 h-4" />
              )}
            </div>
          ))}
      </Masonry>
    )}

    {/* Products */}
    {active === "product" && (
      <Masonry
        breakpointCols={{
          default: 2,
          768: 2,
          500: 1,
        }}
        className="flex gap-4"
        columnClassName="flex flex-col gap-4"
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
                onClick={() => handleProductSelect(prod)}
                className={`relative border-2 rounded-2xl shadow-md flex flex-col items-center p-3 hover:shadow-lg transition ${
                  isSelected
                    ? "ring-4 ring-pink-200 border-pink-300 scale-105"
                    : "border-gray-200"
                }`}
              >
                {isSelected && (
                  <FaCheckCircle className="absolute top-2 left-2 text-green-500 text-lg drop-shadow-md w-4 h-4" />
                )}
                <img
                  src={prod.imageUrl}
                  alt={prod.product_name}
                  className="w-full object-contain"
                />
                <h4 className="font-semibold text-xs sm:text-sm text-center mt-1">
                  {prod.product_name}
                </h4>
              </div>
            );
          })}
      </Masonry>
    )}

    {/* Details */}
    {active === "details" && (
      <div className="space-y-3 mt-8">
        <h3 className="text-base sm:text-lg font-semibold mb-2">Add Details</h3>
        <input
          type="text"
          placeholder="Enter Name"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
        />
        <input
          type="text"
          placeholder="Enter Mobile Number"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
        />
        <input
          type="text"
          placeholder="Enter Address"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
        />
        <button
          onClick={handleConfirmDetails}
          className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white py-2 rounded-lg shadow-md hover:opacity-90 transition"
        >
          Confirm and Generate
        </button>
      </div>
    )}
  </motion.div>
)}
        </AnimatePresence>



        {/* Right Panel (Desktop) */}
           <motion.div
                         className="flex-1 flex items-center justify-center relative overflow-hidden  p-2 sm:p-4"
                         initial={{ marginLeft: active ? 0 : -70 }}
                         animate={{ marginLeft: active ? 0 : 0 }}
                         transition={{ type: "spring" }}
                       >
                         {selectedTemplate ? (
                           <div className="relative bg-white/80 backdrop-blur-md shadow-2xl w-full max-w-[640px] h-[500px] rounded-xl flex items-center justify-center overflow-hidden">
                             <img
                               src={navratri.find((d) => d.id === selectedTemplate.id)?.img}
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


      </div>

      {/* Bottom Navbar (Mobile) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around py-2">
        {sidebarItems.map(item => (
          <button
            key={item.key}
            onClick={() => !isDisabled(item.key) && setActive(item.key)}
            className={`flex flex-col items-center text-xs ${active === item.key ? "text-pink-600 font-semibold" : "text-gray-600"} ${isDisabled(item.key) ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="relative">
              {item.icon}
              {item.completed
                ? <FaCheckCircle className="absolute -top-1 -right-2 text-green-400 text-xs" />
                : <FaExclamationCircle className="absolute -top-1 -right-2 text-yellow-500 w-3 h-3" />}
            </div>
            {item.label1}
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
          if (!selectedTemplate) return;
          setSavedData(prev => ({
            ...prev,
            [selectedTemplate.id]: { ...(prev[selectedTemplate.id] || {}), [modalType]: val },
          }));
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default Navratri;
