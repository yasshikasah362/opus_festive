"use client";
import { useState , useMemo} from "react";
import { FaRegImages, FaExclamationCircle, FaCheckCircle,FaTimes } from "react-icons/fa";
import { MdGridView, MdNoteAdd, MdPhotoLibrary } from "react-icons/md";
import { Flyer_Prompts } from "./FlyerData";
import { FlyerForm } from "./FlyerForm";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css"; 

export default function FlyerSidebar({
  activeTab,
  setActiveTab,
  selectedTemplate,
  handleTemplateClick,
  selectedProducts,
  products,
  handleProductSelect,
  selectedProduct,
  panelOpen,
  setPanelOpen,
}) {

  const openPanel = () => {
    setPanelOpen(true);
  };


  const [flyerForm] = useState(new FlyerForm());
  const [lastSelectedProduct, setLastSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [generated, setGenerated] = useState(false);
  const [flyers, setFlyers] = useState([]);
   const [searchQuery, setSearchQuery] = useState("");

  const [tabStatus, setTabStatus] = useState({
    templates: false,
    products: false,
    detail: false,
    gallery: false,
  });



   // ✅ Use panelOpen from parent instead of showRightPanel
  const handleTemplateClickLocal = (template) => {
    handleTemplateClick(template);
     setPanelOpen(true);
    setTabStatus((prev) => ({ ...prev, templates: true }));
  };

  const handleProductSelectLocal = (product) => {
    handleProductSelect(product);
    setLastSelectedProduct(product);
    setTabStatus((prev) => ({ ...prev, products: true }));
  };

   // Filtered templates based on search (at least 3 letters)
  const filteredTemplates = useMemo(() => {
    if (searchQuery.length < 3) return Flyer_Prompts;
    return Flyer_Prompts.filter((t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Filtered products based on search (at least 3 letters)
  const filteredProducts = useMemo(() => {
    if (searchQuery.length < 3) return products;
    return products.filter((p) =>
      p.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  function generateFlyerPrompt(settings) {
    let prompt = "Generate a marketing flyer for the uploaded image with these settings -\n\n";
    prompt += `Aspect Ratio: ${settings.aspect_ratio}\n`;
    if (settings.text_section) {
      prompt += `Text Section:\n`;
      prompt += `- Headline: "${settings.text_section.headline}"\n`;
      prompt += `- Font Style: ${settings.text_section.font_style}, Color: ${settings.text_section.font_color}\n`;
      prompt += `- Position: ${settings.text_section.position}\n`;
      prompt += `- Subtext: "${settings.text_section.subtext}"\n\n`;
    }
    if (settings.offer_tag) {
      prompt += `Offer Tag:\n`;
      prompt += `- Text: "${settings.offer_tag.text}"\n`;
      prompt += `- Position: ${settings.offer_tag.position}\n`;
      prompt += `- Style: ${settings.offer_tag.style}\n\n`;
    }
    if (settings.call_to_action) {
      prompt += `Call to Action:\n`;
      prompt += `- Text: "${settings.call_to_action.text}"\n`;
      prompt += `- Style: ${settings.call_to_action.style}\n`;
      prompt += `- Location: ${settings.call_to_action.location}\n\n`;
    }
    if (settings.optional) prompt += `Optional: ${settings.optional}\n`;
    if (settings.mood) prompt += `Mood: ${settings.mood}\n`;
    return prompt.trim();
  }

  const handleAddDetails = async () => {
    if (!lastSelectedProduct) {
      alert("Select a product first.");
      return;
    }

    setLoading(true);

    const inputImageUrl = lastSelectedProduct.imageUrl;
    flyerForm.setInputImage(inputImageUrl);

    const settings = {
      aspect_ratio: "4:5",
      theme: "Soft White Minimal",
      border_design: "Thin rounded lines with soft corners",
      border_thickness: "2px",
      background_style: "Solid color",
      background_colors: "ivory or light beige",
      logo_placement: "Top-left",
      main_image_placement: "center",
      image_size: "60% of width",
      text_section: {
        headline: "Elegant Comfort for Every Home",
        font_style: "Serif, Thin weight",
        font_color: "Soft charcoal",
        position: "Top 30%, centered",
        subtext: "Introducing our new handcrafted lounger series.",
      },
      offer_tag: {
        text: "Launch Offer 15% OFF",
        position: "top-right",
        style: "subtle circle badge",
      },
      call_to_action: {
        text: "Shop Now",
        style: "pill-shaped button, muted green",
        location: "bottom center",
      },
      optional: "add soft shadow",
      mood: "calm, clean, timeless",
    };

    const promptText = generateFlyerPrompt(settings);

    try {
      const res = await fetch("/api/generateFlyer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptText, inputImageUrl }),
      });

      const data = await res.json();

      if (data.flyerImage) {
        setFlyers((prev) => [...prev, data.flyerImage]);
        setGenerated(true);
        setTabStatus((prev) => ({ ...prev, detail: true }));

        const existing = JSON.parse(localStorage.getItem("flyers") || "[]");
        const updated = [...existing, data.flyerImage];
        localStorage.setItem("flyers", JSON.stringify(updated));
      } else {
        console.error("No flyerImage returned", data);
        alert("Failed to generate flyer. Try again.");
      }
    } catch (err) {
      console.error("Error generating flyer:", err);
      alert("Error while generating flyer.");
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { id: "templates", icon: <FaRegImages size={20} />, label: "1. Select Templates" },
    { id: "products", icon: <MdGridView size={20} />, label: "2. Select Product" },
    { id: "detail", icon: <MdNoteAdd size={20} />, label: "3. Add Details" },
    { id: "gallery", icon: <MdPhotoLibrary size={20} />, label: "4. Result" },
  ];

  return (
   <>
   <div className="flex h-screen">

  {/* Left Sidebar */}
  <aside
    className="
      hidden sm:flex w-20 md:w-32 flex-col p-4 bg-gray-100 border-r border-gray-200 shadow-xl space-y-4 z-30
    "
  >
    {menuItems.map((item) => {
      const isActive = activeTab === item.id;
      const isCompleted = tabStatus[item.id];

      // Step unlock logic
      let isDisabled = false;
      if (item.id === "products" && !tabStatus.templates) isDisabled = true;
      if (item.id === "detail" && !tabStatus.products) isDisabled = true;
      if (item.id === "gallery" && !tabStatus.detail) isDisabled = true;

      return (
        <button
          key={item.id}
          onClick={() => {
            if (!isDisabled) setActiveTab(item.id);
            openPanel();
          }}
          disabled={isDisabled}
          className={`cursor-pointer flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 relative group
            ${
              isActive
                ? "bg-gradient-to-tr from-pink-500 to-orange-400 text-white shadow-lg scale-105 border-pink-400"
                : isDisabled
                ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                : "bg-gradient-to-tr from-pink-500 to-orange-400 text-white shadow-lg scale-105 border-pink-400"
            }`}
        >
          {item.id !== "gallery" && (
            <span className="absolute top-2 left-1">
              {isCompleted ? (
                <FaCheckCircle className="text-green-500 w-4 h-4" />
              ) : (
                <FaExclamationCircle className="text-yellow-500 w-4 h-4" />
              )}
            </span>
          )}
          <span className="text-3xl mb-2">{item.icon}</span>
          <span className="font-medium text-center text-xs md:text-sm">
            {item.label}
          </span>
        </button>
      );
    })}
  </aside>

 
   
    {/* 🟣 Sliding Right Panel */}
     <AnimatePresence>
  {panelOpen && (
    <motion.aside
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 50 }}
      className="w-full md:w-80 p-4 md:h-[43rem] flex flex-col overflow-y-auto bg-white border-l border-gray-100 shadow-xl"
    >
      {/* Close Button */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-700 capitalize">
          {activeTab === "templates"
            ? "Templates"
            : activeTab === "products"
            ? "Products"
            : activeTab === "detail"
            ? "Details"
            : "Gallery"}
        </h2>
        <button
          onClick={() => setPanelOpen(false)}
          className="cursor-pointer text-gray-500 hover:text-red-500 transition"
        >
          <FaTimes size={18} />
        </button>
      </div>

      {/* Search Bar for Templates and Products */}
      {(activeTab === "templates" || activeTab === "products") && (
        <input
          type="text"
          placeholder={`Search ${activeTab === "templates" ? "Templates" : "Products"}`}
          className="w-full mb-4 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-pink-400 outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      )}

      {/* Templates */}
      {activeTab === "templates" && (
        <Masonry
              breakpointCols={{
                default: 2,
                768: 2,
                500: 1,
              }}
              className="flex gap-3 sm:gap-4"
              columnClassName="flex flex-col gap-3 sm:gap-4"
            >
          {filteredTemplates
            .filter((template) =>
              searchQuery.length >= 3
                ? template.name.toLowerCase().includes(searchQuery.toLowerCase())
                : true
            )
            .map((template) => (
              <div
                key={template.id}
                className={`relative rounded-xl cursor-pointer border-2 transition-transform duration-300 hover:scale-105 ${
                  selectedTemplate?.id === template.id
                    ? "ring-4 ring-pink-200 border-pink-300 scale-105"
                    : "border-gray-300"
                }`}
                onClick={() => handleTemplateClickLocal(template)}
              >
                {selectedTemplate?.id === template.id && (
                  <FaCheckCircle className="absolute top-2 left-2 text-green-500 w-4 h-4" />
                )}
                <img
                  src={`https://supoassets.s3.ap-south-1.amazonaws.com/public/GoogleStudio/assets/Templates/flyer/v2/${encodeURIComponent(
                    template.name
                  )}.webp`}
                  alt={template.name}
                  className="w-full h-32 sm:h-40 object-cover rounded-md"
                  draggable={false}
                />
              </div>
            ))}
        </Masonry>
      )}

      {/* Products */}
      {activeTab === "products" && (
        <Masonry
              breakpointCols={{
                default: 2,
                768: 2,
                500: 1,
              }}
              className="flex gap-3 sm:gap-4"
              columnClassName="flex flex-col gap-3 sm:gap-4"
            >
          {filteredProducts
            .filter((product) =>
              searchQuery.length >= 3
                ? product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
                : true
            )
            .map((product) => {
              const isSelected = selectedProduct?.product_name === product.product_name;
              return (
                <div
                  key={product.product_name}
                  onClick={() => handleProductSelectLocal(product)}
                  className={`relative cursor-pointer border rounded-lg shadow-sm transition-transform duration-200 bg-white ${
                    isSelected
                      ? "ring-4 ring-pink-200 border-pink-300 scale-105"
                      : "border-gray-300 hover:shadow-md hover:scale-105"
                  }`}
                >
                  {isSelected && (
                    <FaCheckCircle className="absolute top-2 left-2 text-green-500 w-5 h-5" />
                  )}
                  <img
                    src={product.imageUrl}
                    alt={product.product_name}
                    className="w-full h-24 sm:h-32 object-contain rounded-md"
                  />
                  <div className="mt-2 text-center mb-4">
                    <p className="text-sm font-semibold">{product.product_name}</p>
                  </div>
                </div>
              );
            })}
        </Masonry>
      )}

      {/* Details */}
      {activeTab === "detail" && (
        <div className="flex flex-col justify-center items-center h-full w-full">
          <div className="w-full space-y-3">
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
            <input
              type="text"
              placeholder="Enter Mobile Number"
              name="mobile number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
            <input
              type="text"
              placeholder="Enter Address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          <button
            onClick={handleAddDetails}
            disabled={loading}
            className={`cursor-pointer mt-5 px-6 py-3 ${
              loading
                ? "bg-gray-400"
                : generated
                ? "bg-green-500"
                : "bg-gradient-to-r from-pink-500 to-orange-400"
            } text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform`}
          >
            {loading ? "Generating..." : generated ? "Generated" : "Confirm & Generate Flyer"}
          </button>
        </div>
      )}

      {/* Gallery */}
      {activeTab === "gallery" && flyers.length > 0 && (
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {flyers.map((img, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={img}
                alt={`Generated Flyer ${index + 1}`}
                className="w-32 sm:w-48 h-auto rounded-lg shadow-lg hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      )}
    </motion.aside>
  )}
</AnimatePresence>

   </div>




  
   

   


</>
  );
}
