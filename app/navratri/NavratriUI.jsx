'use client'
import React, { useState, useEffect } from "react";
import { FaRegImages } from "react-icons/fa";
import { MdNoteAdd, MdPhotoLibrary, MdGridView } from "react-icons/md";
import { FaHeading, FaTag } from "react-icons/fa";
import { MdSubtitles } from "react-icons/md";
import { RiPriceTag3Fill } from "react-icons/ri";
import EditModal from "./EditModal";
import { FaCheckCircle } from "react-icons/fa";

const Navratri = ({username}) => {
    const [active, setActive] = useState("templates");
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    
    // New state variables for completion status
    const [isTemplateSelected, setIsTemplateSelected] = useState(false);
    const [isProductSelected, setIsProductSelected] = useState(false);
    const [isDetailsConfirmed, setIsDetailsConfirmed] = useState(false);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [savedData, setSavedData] = useState({});

    // Fetch JSON from public folder
    useEffect(() => {
        fetch("/navratri.json")
            .then((res) => res.json())
            .then((data) => setTemplates(data))
            .catch((err) => console.error("Error loading templates:", err));
    }, []);

    // fetch products
    useEffect(() => {
        fetch("/products.json")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Error loading products:", err));
    }, []);

   

    // Update completion state based on user actions
    useEffect(() => {
        if (selectedTemplate) {
            setIsTemplateSelected(true);
        } else {
            setIsTemplateSelected(false);
        }
    }, [selectedTemplate]);

    const handleProductSelect = (product) => {
        // logic to select product
        setIsProductSelected(true);
         setSelectedProduct(product);
        // setActive("details");
    };

    const handleConfirmDetails = () => {
        // logic to save details
        setIsDetailsConfirmed(true);
        // setActive("gallery");
    };

    let navratri = [
        { id: 1, img: "/navratri1.jpeg" },
        { id: 2, img: "/navratri2.jpeg" },
        { id: 3, img: "/navratri3.jpeg" },
        { id: 4, img: "/navratri4.jpeg" },
        { id: 5, img: "/navratri5.jpeg" },
        { id: 6, img: "/navratri6.jpeg" },
        { id: 7, img: "/navratri7.jpeg" },
        { id: 8, img: "/navratri8.jpeg" },
        { id: 9, img: "/navratri9.jpeg" },
        { id: 10, img: "/navratri10.jpeg" },
    ]

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

    const sidebarItems = [
        { key: "templates", icon: <FaRegImages size={20} />, label1: "1. Select", label2: "Templates", completed: isTemplateSelected },
        { key: "product", icon: <MdGridView size={20} />, label1: "2. Products", label2: "", completed: isProductSelected },
        { key: "details", icon: <MdNoteAdd size={20} />, label1: "3. Add", label2: "Details", completed: isDetailsConfirmed },
        { key: "gallery", icon: <MdPhotoLibrary size={20} />, label1: "4. Result", label2: "", completed: false },
    ];

    return (
        <div className="flex flex-col h-screen">
            {/* Navbar */}
            <div className="h-16 bg-gray-800 text-white flex items-center justify-center"></div>

            {/* Main Content */}
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
                            {/* Icon Wrapper for positioning */}
                            <div className="relative">
                                {item.icon}
                                {/* Green tick, positioned absolutely */}
                                {item.completed && (
                                    <FaCheckCircle className="absolute -top-1 -left-8 text-green-400" />
                                )}
                            </div>
                            <span className="font-semibold text-sm text-center">
                                {item.label1}
                            </span>
                            {item.label2 && (
                                <span className="font-semibold text-sm text-center">
                                    {item.label2}
                                </span>
                            )}
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
                                    onClick={() => setSelectedTemplate(temp)}
                                    className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-md transition-all duration-300 ${
                                        selectedTemplate?.id === temp.id
                                            ? "ring-4 ring-pink-400 scale-105"
                                            : "hover:scale-105 hover:shadow-lg"
                                    }`}
                                >
                                    <img
                                        src={navratri[index]?.img}
                                        alt={temp.name || `Template ${temp.id}`}
                                        className="w-full h-40 object-cover"
                                        draggable={false}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition">
                                        <h5 className="absolute bottom-3 left-3 text-white font-semibold text-sm">
                                            {temp.name}
                                        </h5>
                                    </div>
                                    {selectedTemplate?.id === temp.id && (
                                        <FaCheckCircle className="absolute top-3 left-3 text-green-400 text-2xl drop-shadow-lg" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    {active === "product" && (
  
    <div className="grid grid-cols-2 cursor-pointer gap-5">
      {products.map((prod, i) => {
        const isSelected = selectedProduct?.product_name === prod.product_name;
        return (
          <div
            key={i}
            onClick={() => handleProductSelect(prod)}
            className={`relative border-2 rounded-2xl shadow-md flex flex-col items-center p-3 hover:shadow-lg transition 
              ${isSelected ? "ring-4 ring-pink-200 border-pink-300 scale-105" : "border-gray-200"}
            `}
          >
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
                                onClick={handleConfirmDetails}
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

                {/* Right Content */}
                {/* Right Content */}
<div className="flex-1 flex items-center justify-center relative overflow-hidden">
  {selectedTemplate ? (
    <div className="relative bg-gray-200 shadow-lg w-[500px] h-[500px] rounded-xl flex items-center justify-center">
      <img
        src={navratri.find((d) => d.id === selectedTemplate.id)?.img}
        alt={selectedTemplate.name}
        className="w-full h-full object-contain rounded-md"
      />

      {/* get saved data for current template */}
      {(() => {
        const currentSavedData = savedData[selectedTemplate?.id] || {};
        return (
          <div className="absolute top-4 left-4 flex flex-col space-y-3 bg-white/70 p-2 rounded-lg shadow">
            {/* Headline */}
            <button
              onClick={() => {
                setModalType("headline");
                setIsModalOpen(true);
              }}
              className={`p-3 rounded-full shadow-md hover:scale-110 transition relative group
                ${currentSavedData.headline ? "bg-pink-600/70 text-white ring-2 ring-pink-600" : "bg-white text-black"}
              `}
            >
              <FaHeading size={18} />
              <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                Edit Headline
              </span>
            </button>

            {/* Subtext */}
            <button
              onClick={() => {
                setModalType("subtext");
                setIsModalOpen(true);
              }}
              className={`p-3 rounded-full shadow-md hover:scale-110 transition relative group
                ${currentSavedData.subtext ? "bg-pink-600/70 text-white ring-2 ring-pink-600" : "bg-white text-black"}
              `}
            >
              <MdSubtitles size={18} />
              <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                Edit Subtext
              </span>
            </button>

            {/* Offer */}
            <button
              onClick={() => {
                setModalType("offer");
                setIsModalOpen(true);
              }}
              className={`p-3 rounded-full shadow-md hover:scale-110 transition relative group
                ${currentSavedData.offer ? "bg-pink-600/70 text-white ring-2 ring-pink-600" : "bg-white text-black"}
              `}
            >
              <RiPriceTag3Fill size={18} />
              <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                Edit Offer
              </span>
            </button>

            {/* CTA */}
            <button
              onClick={() => {
                setModalType("offer_tag");
                setIsModalOpen(true);
              }}
              className={`p-3 rounded-full shadow-md hover:scale-110 transition relative group
                ${currentSavedData.offer_tag ? "bg-pink-600/70 text-white ring-2 ring-pink-600" : "bg-white text-black"}
              `}
            >
              <FaTag size={18} />
              <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                Edit CTA
              </span>
            </button>
          </div>
        );
      })()}

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

export default Navratri;