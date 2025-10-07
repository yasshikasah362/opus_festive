'use client'
import React, { useState, useEffect } from "react";
import { FaRegImages, FaHeading, FaTag, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { MdNoteAdd, MdPhotoLibrary, MdGridView, MdSubtitles } from "react-icons/md";
import { RiPriceTag3Fill } from "react-icons/ri";
import EditModal from "./EditModal";

const Navratri = ({ username }) => {
  const [active, setActive] = useState("templates");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Completion states
  const [isTemplateSelected, setIsTemplateSelected] = useState(false);
  const [isProductSelected, setIsProductSelected] = useState(false);
  const [isDetailsConfirmed, setIsDetailsConfirmed] = useState(false);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [savedData, setSavedData] = useState({});

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
    { key: "product", icon: <MdGridView size={20} />, label1: "2. Products", label2: "", completed: isProductSelected },
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
      <div className="flex flex-1 flex-col sm:flex-row overflow-hidden">
        {/* Sidebar (Desktop) */}
        <div className="hidden sm:flex flex-col w-20 md:w-32 py-4 bg-gray-100 border-r border-gray-200 shadow-xl space-y-4">
          {sidebarItems.map(item => (
            <div
              key={item.key}
              onClick={() => !isDisabled(item.key) && setActive(item.key)}
              className={`cursor-pointer flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 relative group ${
                active === item.key
                  ? "bg-gradient-to-tr from-pink-500 to-orange-400 text-white shadow-lg scale-105"
                  : "bg-white hover:shadow-md hover:scale-105 text-gray-700"
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

        {/* Mobile Preview */}
        {selectedTemplate && (
          <div className="sm:hidden w-full p-2 bg-gray-50 flex justify-center mt-3">
            <div className="relative w-full max-w-[95%] h-auto rounded-xl flex items-center justify-center shadow-md overflow-hidden">
              <img
                src={navratri.find(d => d.id === selectedTemplate.id)?.img}
                alt={selectedTemplate.name}
                className="w-full h-auto object-cover rounded-xl max-h-[250px]"
                draggable={false}
              />
              {/* Edit Buttons */}
              <div className="absolute top-2 left-2 flex flex-col gap-2 z-50">
                {[
                  { icon: <FaHeading size={14} />, type: "headline" },
                  { icon: <MdSubtitles size={14} />, type: "subtext" },
                  { icon: <RiPriceTag3Fill size={14} />, type: "offer" },
                  { icon: <FaTag size={14} />, type: "offer_tag" },
                ].map((btn, i) => {
                  const isSaved = savedData[selectedTemplate?.id]?.[btn.type];
                  return (
                    <button
                      key={i}
                      onClick={() => { setModalType(btn.type); setIsModalOpen(true); }}
                      className={`p-2 rounded-full shadow-md hover:scale-110 transition relative group ${isSaved ? "bg-pink-600/70 text-white ring-2 ring-pink-600" : "bg-white text-black"}`}
                    >
                      {btn.icon}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Middle Panel */}
        <div className="flex-1 sm:flex-[0.35] mt-3 p-4 flex flex-col overflow-y-auto pb-24">
          {/* Templates */}
          {active === "templates" && (
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              {templates.map((temp, index) => (
                <div
                  key={temp.id}
                  onClick={() => setSelectedTemplate(temp)}
                  className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-md transition-all duration-300 ${
                    selectedTemplate?.id === temp.id ? "ring-4 ring-pink-400 scale-105" : "hover:scale-105 hover:shadow-lg"
                  }`}
                >
                  <img src={navratri[index]?.img} alt={temp.name} className="w-full h-40 object-cover" draggable={false} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition">
                    <h5 className="absolute bottom-2 left-2 text-white font-semibold text-xs sm:text-sm">{temp.name}</h5>
                  </div>
                  {selectedTemplate?.id === temp.id && <FaCheckCircle className="absolute top-2 left-2 text-green-400 text-2xl drop-shadow-lg w-4 h-4" />}
                </div>
              ))}
            </div>
          )}

          {/* Products */}
          {active === "product" && (
            <div className="grid grid-cols-2 gap-4 cursor-pointer">
              {products.map((prod, i) => {
                const isSelected = selectedProduct?.product_name === prod.product_name;
                return (
                  <div
                    key={i}
                    onClick={() => handleProductSelect(prod)}
                    className={`relative border-2 rounded-2xl shadow-md flex flex-col items-center p-3 hover:shadow-lg transition ${isSelected ? "ring-4 ring-pink-200 border-pink-300 scale-105" : "border-gray-200"}`}
                  >
                    {isSelected && <FaCheckCircle className="absolute top-2 left-2 text-green-500 text-lg drop-shadow-mdw- h-4" />}
                    <img src={prod.imageUrl} alt={prod.product_name} className="w-full h-20 object-contain" />
                    <h4 className="font-semibold text-xs sm:text-sm text-center mt-1">{prod.product_name}</h4>
                  </div>
                );
              })}
            </div>
          )}

          {/* Details */}
         {active === "details" && (
  <div className="space-y-3">
    <h3 className="text-base sm:text-lg font-semibold mb-2">Add Details</h3>

    <input
      type="text"
      name="name"
      placeholder="Enter Name"
      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
    />

    <input
      type="text"
      name="mobileNumber"
      placeholder="Enter Mobile Number"
      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
    />

    <input
      type="text"
      name="address"
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


          {/* Gallery */}
          {active === "gallery" && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Gallery</h3>
              <p className="text-sm text-gray-600">Gallery images yaha show hongi...</p>
            </div>
          )}
        </div>

        {/* Right Panel (Desktop) */}
        <div className="hidden sm:flex flex-1 items-center justify-center relative overflow-hidden bg-gray-50 p-2 sm:p-4">
          {selectedTemplate ? (
            <div className="relative bg-white/80 backdrop-blur-md shadow-2xl w-full max-w-[640px] h-60 sm:h-72 md:h-[380px] lg:h-[500px] rounded-xl flex items-center justify-center overflow-hidden">
              <img src={navratri.find(d => d.id === selectedTemplate.id)?.img} alt={selectedTemplate.name} className="w-full h-full object-cover rounded-md" />
              {/* Edit Buttons */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {[
                  { icon: <FaHeading size={14} />, type: "headline" },
                  { icon: <MdSubtitles size={14} />, type: "subtext" },
                  { icon: <RiPriceTag3Fill size={14} />, type: "offer" },
                  { icon: <FaTag size={14} />, type: "offer_tag" },
                ].map((btn, i) => (
                  <button
                    key={i}
                    onClick={() => { setModalType(btn.type); setIsModalOpen(true); }}
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
            <div className="relative bg-gray-200 shadow-inner w-full max-w-[640px] h-60 sm:h-72 md:h-[380px] lg:h-[500px] rounded-xl flex items-center justify-center text-gray-500 text-sm">
              No Template Selected
            </div>
          )}
        </div>
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
