"use client"
import React, { useState, useEffect } from "react";
import { FaRegImages, FaHeading, FaTag, FaCheckCircle } from "react-icons/fa";
import { MdNoteAdd, MdPhotoLibrary, MdGridView, MdSubtitles } from "react-icons/md";
import { RiPriceTag3Fill } from "react-icons/ri";
import EditModal from "./EditModal";

const Gandhijayanti = ({username}) => {
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

  const template = [
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

  // helper: get dropdown options based on modalType
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
    if (!selectedTemplate) {
      alert("Please select a template first");
      return;
    }
    if (!selectedProduct) {
      alert("Please select a product");
      return;
    }

    const payload = {
      imageUrl: selectedProduct.imageUrl,
      prompt_settings: {
        ...selectedTemplate.prompt_settings,
        ...(savedData[selectedTemplate.id] || {}),
      },
    };

    console.log("sending data to backend", payload);

    try {
      const res = await fetch("http://localhost:5000/api/generate-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Generated Template from Gemini:", data.generatedImage);
      setActive("gallery"); // Switch to gallery view after generation
    } catch (err) {
      console.error("Error generating template:", err);
    }
  };

  const sidebarItems = [
    { key: "templates", icon: <FaRegImages size={20} />, label: "1. Select Templates", completed: isTemplateSelected },
    { key: "product", icon: <MdGridView size={20} />, label: "2. Products", completed: isProductSelected },
    { key: "details", icon: <MdNoteAdd size={20} />, label: "3. Add Details", completed: isDetailsConfirmed },
    { key: "gallery", icon: <MdPhotoLibrary size={20} />, label: "4. Result", completed: false },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="h-16 bg-gray-800 text-white flex items-center justify-center"></div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-30 flex flex-col py-3 bg-gray-200 border-r-2 border-r-gray-100 shadow-2xl space-y-4 pl-2 pr-2">
          {sidebarItems.map((item) => (
            <div
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`cursor-pointer flex flex-col items-center gap-1 p-3 rounded-xl shadow-md transition-all duration-200 relative ${
                active === item.key
                  ? "bg-gradient-to-tr from-pink-500 to-orange-400 text-white shadow-lg scale-105"
                  : "bg-white hover:shadow-lg hover:scale-105 text-gray-700"
              }`}
            >
              <div className="relative mb-1">
                {item.icon}
                {item.completed && <FaCheckCircle className="absolute -top-1 -left-8 text-green-400" />}
              </div>
              <span className="font-semibold text-sm text-center">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Middle Panel */}
        <div className="w-[420px] bg-white border-r border-gray-200 p-5 overflow-y-auto">
          {active === "templates" && (
            <div className="grid gap-6 sm:grid-cols-2">
              {templates.map((temp, index) => (
                <div
                  key={temp.id}
                  onClick={() => {
                    setSelectedTemplate(temp);
                    setIsTemplateSelected(true);
                  }}
                  className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-md transition-all duration-300 ${
                    selectedTemplate?.id === temp.id ? "ring-4 ring-pink-400 scale-105" : "hover:scale-105 hover:shadow-lg"
                  }`}
                >
                  <img
                    src={template[index]?.img}
                    alt={temp.name || `Template ${temp.id}`}
                    className="w-full h-40 object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition">
                    <h5 className="absolute bottom-3 left-3 text-white font-semibold text-sm">{temp.name}</h5>
                  </div>
                  {selectedTemplate?.id === temp.id && (
                    <FaCheckCircle className="absolute top-3 left-3 text-green-400 text-2xl drop-shadow-lg" />
                  )}
                </div>
              ))}
            </div>
          )}

          {active === "product" && (
  <div className="grid grid-cols-2 cursor-pointer gap-4">
    {products.map((prod, i) => {
      const isSelected = selectedProduct?.product_name === prod.product_name;
      return (
        <div
          key={i}
          onClick={() => {
            setSelectedProduct(prod);
            setIsProductSelected(true);
          }}
          className={`relative border-2 rounded-2xl shadow-md flex flex-col items-center p-3 hover:shadow-lg transition 
            ${isSelected ? "ring-4 ring-pink-200 border-pink-300 scale-105" : "border-gray-200"}
          `}
        >
          {/* ✅ Green tick only if selected */}
          {isSelected && (
            <FaCheckCircle className="absolute top-2 left-2 text-green-500 text-lg drop-shadow-md" />
          )}

          <img
            src={prod.imageUrl}
            alt={prod.product_name}
            className="w-full h-20 object-contain"
          />
          <h4 className="font-semibold">{prod.product_name}</h4>
        </div>
      );
    })}
  </div>
)}


          {active === "details" && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold mb-3">Add Details</h3>
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
                onClick={() => {
                  setIsDetailsConfirmed(true);
                  generateTemplate();
                }}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white py-2 rounded-lg shadow-md hover:opacity-90 transition"
              >
                Confirm and Generate
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

        {/* Right Panel */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden">
          {selectedTemplate ? (
            <div className="relative bg-gray-200 shadow-lg w-[500px] h-[500px] rounded-xl flex items-center justify-center">
              <img
                src={template.find((d) => d.id === selectedTemplate.id)?.img}
                alt={selectedTemplate.name}
                className="w-full h-full object-contain rounded-md"
              />
              <div className="absolute top-4 left-4 flex flex-col space-y-3">
                {[
                  { icon: <FaHeading size={20} />, type: "headline", label: "Edit Headline" },
                  { icon: <MdSubtitles size={20} />, type: "subtext", label: "Edit Subtext" },
                  { icon: <RiPriceTag3Fill size={20} />, type: "offer", label: "Edit Offer" },
                  { icon: <FaTag size={20} />, type: "offer_tag", label: "Edit CTA" },
                ].map((btn, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setModalType(btn.type);
                      setIsModalOpen(true);
                    }}
                    className={`p-3 rounded-full shadow-md hover:scale-110 transition relative group 
                      ${savedData[selectedTemplate?.id]?.[btn.type] ? "bg-pink-600/70 text-white ring-2 ring-pink-600" : "bg-white text-black"}
                    `}
                  >
                    {btn.icon}
                    <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                      {btn.label}
                    </span>
                  </button>
                ))}
              </div>
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
            <div className="relative bg-gray-200 shadow-lg w-[500px] h-[500px] rounded-xl flex items-center justify-center">
              No Template Selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gandhijayanti;
