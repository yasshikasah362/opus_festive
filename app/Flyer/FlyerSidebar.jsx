"use client";
import { useState } from "react";
import { FaRegImages, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { MdGridView, MdNoteAdd } from "react-icons/md";
import { Flyer_Prompts } from "./FlyerData";
import { FlyerForm } from "./FlyerForm"; // import your FlyerForm class

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

  const handleProductSelectLocal = (product) => {
  handleProductSelect(product); // keep parent handler
  setLastSelectedProduct(product); // track latest selection
};


  // Generate the flyer prompt
  function generateFlyerPrompt(settings) {
    let prompt = "Generate a marketing flyer for the uploaded image with these settings -\n\n";

    prompt += `Aspect Ratio: ${settings.aspect_ratio}\n`;
    prompt += `Theme: ${settings.theme}\n`;
    prompt += `Border Design: ${settings.border_design}, Thickness: ${settings.border_thickness}\n`;
    prompt += `Background Style: ${settings.background_style}, Colors: ${settings.background_colors}\n`;
    prompt += `Logo Placement: ${settings.logo_placement}\n`;
    prompt += `Main Image Placement: ${settings.main_image_placement}, Size: ${settings.image_size}\n\n`;

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

  // Handle Add Details button click
  const handleAddDetails = async () => {
  if (!lastSelectedProduct) {
    alert("Select a product first.");
    return;
  }

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
    // API call to generate flyer image
   const res = await fetch("/api/generateFlyer", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ 
    prompt: promptText, 
    inputImageUrl: lastSelectedProduct.imageUrl  // <-- must be a valid URL
  }),
});


    const data = await res.json();
  if (data.imageUrl) {
  flyerForm.setOutputImage(data.imageUrl);
  setGeneratedFlyerUrl(data.imageUrl); // <-- use the generated flyer
} else {
  console.error("No image returned from API");
}


  } catch (err) {
    console.error("Error generating flyer:", err);
  }
};


  const menuItems = [
    { id: "templates", icon: <FaRegImages size={20} />, label: "Select Template" },
    { id: "products", icon: <MdGridView size={20} />, label: "Select Product" },
    { id: "detail", icon: <MdNoteAdd size={20} />, label: "Add Detail" },
  ];

  return (
    <>
      {/* Left Sidebar */}
      <aside className="w-24 flex flex-col py-4 bg-gray-200 border-r-2 border-r-gray-100 shadow-2xl pl-2">
        {menuItems.map((item) => {
          let isDone = false;
          if (item.id === "templates") isDone = !!selectedTemplate;
          if (item.id === "products") isDone = selectedProducts.length > 0;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative cursor-pointer flex flex-col items-center justify-center w-20 h-24 rounded-lg border-2 border-gray-400 p-2 mb-2"
            >
              <span className="absolute top-2 left-1">
                {isDone ? (
                  <FaCheckCircle className="text-green-500 w-5 h-5" />
                ) : (
                  <FaExclamationCircle className="text-yellow-500 w-5 h-5" />
                )}
              </span>
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
          {activeTab === "detail" && (
            <button
              onClick={handleAddDetails}
              className="px-6 py-3 bg-[#FC6C87] text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform"
            >
              Add Details
            </button>
          )}
        </div>

        {/* Generated Flyer Popup */}
     {generatedFlyerUrl && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded-xl shadow-lg relative">
      <button
        className="absolute top-2 right-2 text-red-500 font-bold"
        onClick={() => setGeneratedFlyerUrl(null)}
      >
        X
      </button>
      <img
        src={generatedFlyerUrl}
        alt="Generated Flyer"
        className="w-96 h-auto rounded-md"
      />
    </div>
  </div>
)}


      </aside>
    </>
  );
}
