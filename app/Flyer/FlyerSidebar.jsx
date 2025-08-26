"use client";
import { useState } from "react";
import { FaRegImages, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { MdGridView, MdNoteAdd,MdPhotoLibrary } from "react-icons/md";
import { Flyer_Prompts } from "./FlyerData";
import { FlyerForm } from "./FlyerForm";
import { generateFlyer } from "../api/generateFlyer/route";

export default function FlyerSidebar({
  activeTab,
  setActiveTab,
  selectedTemplate,
  handleTemplateClick,
  selectedProducts,
  products,
  handleProductSelect,
}) {
  const [flyerForm] = useState(new FlyerForm());
  const [generatedFlyerUrl, setGeneratedFlyerUrl] = useState(null);
  const [lastSelectedProduct, setLastSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flyerImage, setFlyerImage] = useState(null);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [generated, setGenerated] = useState(false);
  const [tabStatus, setTabStatus] = useState({
  product: false,
  details: false,
  gallery: false,
});
const [flyers, setFlyers] = useState([]);
 const handleProductSelectLocal = (product) => {
  handleProductSelect(product); // call parent’s function
  setLastSelectedProduct(product);
  setTabStatus((prev) => ({ ...prev, product: true })); // mark tab done here
};

  
  

 

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
  const data = await generateFlyer(promptText, inputImageUrl);

  if (data.flyerImage) {
    // ✅ Abhi ke liye sirf flyerImage set karo
    setFlyerImage(data.flyerImage);
    setFlyers((prev) => [...prev, data.flyerImage]); 
    setGenerated(true);
  } else {
    console.error("No flyerImage returned from API", data);
    alert("Failed to generate flyer. Try again.");
  }
} catch (err) {
  console.error("Error generating flyer:", err);
  alert("Error while generating flyer.");
} finally {
  setLoading(false);
} 
};

// const handleGenerateFlyer = (newFlyerUrl) => {
//   setFlyers((prev) => [...prev, newFlyerUrl]); // add new flyer
// };



  const menuItems = [
    { id: "templates", icon: <FaRegImages size={20} />, label: "Select Template" },
    { id: "products", icon: <MdGridView size={20} />, label: "Select Product" },
    { id: "detail", icon: <MdNoteAdd size={20} />, label: "Add Detail" },
     { id: "gallery", icon: <MdPhotoLibrary size={20} />, label: "Gallery" },
  ];

  return (
    <>
      {/* Left Sidebar */}
      <aside className="w-24 flex flex-col py-4 bg-gray-200 border-r-2 border-r-gray-100 shadow-2xl pl-2">
        {menuItems.map((item) => {
          let isDone = false;
          if (item.id === "templates") isDone = !!selectedTemplate;
          if (item.id === "products") isDone = selectedProducts.length > 0;
          if (item.id === "detail") isDone = !!flyerImage; 
          return (
            <button
  key={item.id}
  onClick={() => setActiveTab(item.id)}
  className="relative cursor-pointer flex flex-col items-center justify-center w-20 h-24 rounded-lg border-2 border-gray-400 p-2 mb-2"
>
  {item.id !== "gallery" && ( // ✅ Gallery tab me icon mat dikhana
    <span className="absolute top-2 left-1">
      {tabStatus[item.id] ? (
        <FaCheckCircle className="text-green-500 w-5 h-5" />
      ) : (
        <FaExclamationCircle className="text-yellow-500 w-5 h-5" />
      )}
    </span>
  )}
  <span className="text-3xl mb-2">{item.icon}</span>
  <span className="text-xs text-center font-semibold">{item.label}</span>
</button>

          );
        })}
      </aside>

      {/* Right Sidebar */}
      <aside className="w-96 p-4 h-160 flex flex-col overflow-y-auto bg-white border-r-2 border-r-gray-200">
        {/* Templates Tab */}
        {activeTab === "templates" && (
          <div className="grid grid-cols-2 gap-4">
            {Flyer_Prompts.map((template) => (
              <div
                key={template.id}
                className={`rounded-xl cursor-pointer border-2 border-gray-400 transition-transform duration-300 hover:scale-105 ${
                  selectedTemplate?.id === template.id ? "ring-2 ring-[#FC6C87]" : ""
                }`}
                onClick={() => handleTemplateClick(template)}
              >
                <img
                  src={`https://supoassets.s3.ap-south-1.amazonaws.com/public/GoogleStudio/assets/Templates/flyer/v2/${encodeURIComponent(
                    template.name
                  )}.webp`}
                  alt={template.name}
                  className="w-full h-40 object-cover rounded-md"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <div
                key={product.product_name}
                onClick={() => handleProductSelectLocal(product)}
                className="cursor-pointer p-3 border rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-200 bg-white"
              >
                <img
                  src={product.imageUrl}
                  alt={product.product_name}
                  className="w-full h-32 object-contain rounded-md"
                />
                <div className="mt-2 text-center">
                  <p className="text-sm font-semibold">{product.product_name}</p>
                  <p className="text-xs text-gray-500">{product.category_name}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Detail Tab */}
        <div className="flex justify-center items-center h-full">
          {/* Add Detail Tab */}
{activeTab === "detail" && (
  <div className="flex flex-col justify-center items-center h-full w-full">
    <div className="w-full space-y-3">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
      />
      <input
        type="text"
        placeholder="Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
      />
    </div>

    <button
        onClick={handleAddDetails}
        disabled={loading}
        className={`mt-5 px-6 py-3 ${
          loading
            ? "bg-gray-400"
            : generated
            ? "bg-green-500"
            : "bg-[#FC6C87]"
        } text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform`}
      >
        {loading
          ? "Generating..."
          : generated
          ? "Generated"
          : "Confirm & Generate Flyer"}
      </button>
  </div>
)}

        </div>

        {/* Generated Flyer Popup */}
      {flyerImage && (
  <div className=" inset-0  bg-opacity-50 flex justify-center items-center z-50">
    

      {/* gallery tab */}
    {activeTab === "gallery" && flyers.length > 0 && (
  <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
    {flyers.map((img, index) => (
      <div key={index} className="flex justify-center">
        <img
          src={img}
          alt={`Generated Flyer ${index + 1}`}
          className="w-48 h-auto rounded-lg shadow-lg hover:scale-105 transition-transform"
        />
      </div>
    ))}
  </div>
)}


        
      

      
    
  </div>
)}



      </aside>
    </>
  );
}
