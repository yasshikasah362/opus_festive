"use client"
import React, { useState, useEffect } from "react";
import { FaRegImages, FaHeading, FaTag, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { MdNoteAdd, MdPhotoLibrary, MdGridView, MdSubtitles } from "react-icons/md";
import { RiPriceTag3Fill } from "react-icons/ri";
import EditModal from "./EditModal";

const Gandhijayanti = ({ username }) => {
  const [active, setActive] = useState("templates");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ State for tracking completion
  const [isTemplateSelected, setIsTemplateSelected] = useState(false);
  const [isProductSelected, setIsProductSelected] = useState(false);
  const [isDetailsConfirmed, setIsDetailsConfirmed] = useState(false);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  // ✅ Saved data should be per-template
  const [savedData, setSavedData] = useState({});

  // fetch templates
  useEffect(() => {
    fetch("/gandhijayanti.json")
      .then((res) => res.json())
      .then((data) => setTemplates(data))
      .catch((err) => console.error("Error loading templates:", err));
  }, []);

  // fetch products
  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
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

  const generateTemplate = async () => {
    if (!selectedTemplate) return alert("Please select a template first");
    if (!selectedProduct) return alert("Please select a product");

    const payload = {
      imageUrl: selectedProduct.imageUrl,
      prompt_settings: {
        ...selectedTemplate.prompt_settings,
        ...(savedData[selectedTemplate.id] || {}),
      },
    };

    try {
      const res = await fetch("http://localhost:5000/api/generate-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("Generated Template:", data.generatedImage);
      setActive("gallery");
    } catch (err) {
      console.error("Error generating template:", err);
    }
  };

  // Sidebar items with process logic
  const sidebarItems = [
    { key: "templates", icon: <FaRegImages size={20} />, label: "1. Select Templates", completed: isTemplateSelected, enabled: true },
    { key: "product", icon: <MdGridView size={20} />, label: "2. Products", completed: isProductSelected, enabled: isTemplateSelected },
    { key: "details", icon: <MdNoteAdd size={20} />, label: "3. Add Details", completed: isDetailsConfirmed, enabled: isProductSelected },
    { key: "gallery", icon: <MdPhotoLibrary size={20} />, label: "4. Result", completed: false, enabled: isDetailsConfirmed },
  ];

  return (
    <div className="flex flex-col h-screen">
  {/* Navbar */}
  <div className="h-12 sm:h-14 md:h-16 bg-gradient-to-r from-pink-600 to-orange-500 text-white flex items-center justify-center text-sm sm:text-base md:text-lg font-semibold shadow-md">
   
  </div>

  <div className="flex flex-1 flex-col sm:flex-row overflow-hidden">
    {/* Sidebar (Desktop) */}
    <div className="hidden sm:flex w-20 md:w-32 flex-col py-4 bg-gray-100 border-r border-gray-200 shadow-xl space-y-4">
      {sidebarItems.map((item) => (
        <div
          key={item.key}
          onClick={() => item.enabled && setActive(item.key)}
          className={`cursor-pointer flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 relative group ${
            active === item.key
              ? "bg-gradient-to-tr from-pink-500 to-orange-400 text-white shadow-lg scale-105"
              : item.enabled
              ? "bg-white hover:shadow-md hover:scale-105 text-gray-700"
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

    {/* Middle Panel */}
    <div className="flex flex-col w-full sm:w-[320px] md:w-[360px] lg:w-[400px] xl:w-[440px] overflow-y-auto p-3 sm:p-5 bg-white">
      {/* Mobile: Selected Template Preview */}
      <div className="sm:hidden mb-3">
        {selectedTemplate ? (
          <div className="relative w-full max-w-full h-[220px] rounded-xl shadow-md overflow-hidden flex justify-center">
            <img
              src={templateImages.find((d) => d.id === selectedTemplate.id)?.img}
              alt={selectedTemplate.name}
              className="w-full h-full object-cover rounded-xl"
              draggable={false}
            />
            {/* Floating Edit Buttons */}
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
                    onClick={() => {
                      setModalType(btn.type);
                      setIsModalOpen(true);
                    }}
                    className={`p-2 rounded-full shadow-md hover:scale-110 transition ${
                      isSaved
                        ? "bg-pink-600/70 text-white ring-2 ring-pink-600"
                        : "bg-white text-black"
                    }`}
                  >
                    {btn.icon}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="w-full h-[220px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-sm">
            No Template Selected
          </div>
        )}
      </div>

      {/* Templates */}
      {active === "templates" && (
        <div className="grid grid-cols-2 gap-3 justify-center">
          {templates.map((temp, index) => (
            <div
              key={temp.id}
              onClick={() => {
                setSelectedTemplate(temp);
                setIsTemplateSelected(true);
              }}
              className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-md transition-all duration-300 w-[140px] h-[140px] ${
                selectedTemplate?.id === temp.id ? "ring-4 ring-pink-400 scale-105" : "hover:scale-105 hover:shadow-lg"
              }`}
            >
              <img src={templateImages[index]?.img} alt={temp.name || `Template ${temp.id}`} className="w-full h-full object-cover" />
              {selectedTemplate?.id === temp.id && (
                <FaCheckCircle className="absolute top-2 left-2 text-green-400 text-lg drop-shadow-lg w-4 h-4" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Products */}
      {active === "product" && (
        <div className="grid grid-cols-2 gap-3 justify-center">
          {products.map((prod, i) => {
            const isSelected = selectedProduct?.product_name === prod.product_name;
            return (
              <div
                key={i}
                onClick={() => {
                  setSelectedProduct(prod);
                  setIsProductSelected(true);
                }}
                className={`relative border-2 rounded-2xl shadow-md flex flex-col items-center p-2 hover:shadow-lg transition cursor-pointer w-[140px] h-[140px] ${
                  isSelected ? "ring-4 ring-pink-200 border-pink-300 scale-105" : "border-gray-300"
                }`}
              >
                {isSelected && (
                  <FaCheckCircle className="absolute top-1 left-1 text-green-500 text-sm drop-shadow-md" />
                )}
                <img src={prod.imageUrl} alt={prod.product_name} className="w-full h-full object-contain" />
                <h4 className="font-medium text-xs sm:text-sm text-gray-800 text-center mt-1">{prod.product_name}</h4>
              </div>
            );
          })}
        </div>
      )}

      {/* Details */}
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

      {/* Gallery */}
      {active === "gallery" && (
        <div>
          <h3 className="text-base font-semibold mb-2">Gallery</h3>
          <p className="text-sm text-gray-600">Gallery images yaha show hongi...</p>
        </div>
      )}
    </div>

    {/* Right Panel Preview (Desktop Only) */}
    <div className="hidden sm:flex flex-1 items-center justify-center relative overflow-hidden bg-gray-50 p-2 sm:p-4">
      {selectedTemplate ? (
        <div className="relative bg-white/80 backdrop-blur-md shadow-2xl w-full max-w-[640px] h-60 sm:h-72 md:h-[380px] lg:h-[500px] rounded-xl flex items-center justify-center overflow-hidden">
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
        <div className="relative bg-gray-200 shadow-inner w-full max-w-[640px] h-60 sm:h-72 md:h-[380px] lg:h-[500px] rounded-xl flex items-center justify-center text-gray-500 text-sm">
          No Template Selected
        </div>
      )}
    </div>
  </div>

  {/* Mobile Bottom Navbar */}
  <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around py-2">
    {sidebarItems.map((item) => {
      let enabled = false;
      if (item.key === "templates") enabled = true;
      else if (item.key === "product") enabled = isTemplateSelected;
      else if (item.key === "details") enabled = isProductSelected;
      else if (item.key === "gallery") enabled = isDetailsConfirmed;

      return (
        <button
          key={item.key}
          onClick={() => enabled && setActive(item.key)}
          className={`flex flex-col items-center text-xs cursor-pointer transition ${
            active === item.key
              ? "text-pink-600 font-semibold"
              : enabled
              ? "text-gray-600"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          <div className="relative">
            {item.icon}
            {item.completed ? (
              <FaCheckCircle className="absolute -top-1 -right-2 text-green-400 text-xs" />
            ) : (
              <FaExclamationCircle className={`absolute -top-1 -right-2 text-yellow-500 text-xs ${!enabled ? "opacity-40" : ""}`} />
            )}
          </div>
          {item.label1}
        </button>
      );
    })}
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

export default Gandhijayanti;
