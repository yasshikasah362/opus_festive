"use client";
import { useState, useEffect, useRef } from "react";
import { FaRegImages, FaEdit, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { MdGridView, MdNoteAdd } from "react-icons/md";
import { Flyer_Prompts } from "./FlyerData";
import productsData from "../../public/products.json";

export default function Flyer() {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgInfo, setImgInfo] = useState(null); // image ka size + offset save karne ke liye

  const imgRef = useRef(null);

  const menuItems = [
    { id: "templates", icon: <FaRegImages size={20} />, label: "Select Template" },
    { id: "products", icon: <MdGridView size={20} />, label: "Select Product" },
    { id: "detail", icon: <MdNoteAdd size={20} />, label: "Add Detail" },
  ];

  useEffect(() => {
    if (activeTab === "products") setProducts(productsData);
  }, [activeTab]);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    setImgLoaded(false);
    setImgInfo(null);
  };

  const handleImageLoad = () => {
    const img = imgRef.current;
    if (!img) return;

    const containerWidth = img.clientWidth;
    const containerHeight = img.clientHeight;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    const imageRatio = naturalWidth / naturalHeight;
    const containerRatio = containerWidth / containerHeight;

    let renderedWidth, renderedHeight, offsetX = 0, offsetY = 0;

    if (imageRatio > containerRatio) {
      renderedWidth = containerWidth;
      renderedHeight = containerWidth / imageRatio;
      offsetY = (containerHeight - renderedHeight) / 2;
    } else {
      renderedHeight = containerHeight;
      renderedWidth = containerHeight * imageRatio;
      offsetX = (containerWidth - renderedWidth) / 2;
    }

    setImgInfo({
      naturalWidth,
      naturalHeight,
      renderedWidth,
      renderedHeight,
      offsetX,
      offsetY,
    });

    setImgLoaded(true);
  };

  const getScaledPosition = (coord) => {
    if (!imgInfo) return { left: 0, top: 0 };

    const scaleX = imgInfo.renderedWidth / imgInfo.naturalWidth;
    const scaleY = imgInfo.renderedHeight / imgInfo.naturalHeight;

    return {
      left: coord.x * scaleX + imgInfo.offsetX,
      top: coord.y * scaleY + imgInfo.offsetY,
    };
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
  <div className="flex mt-16">
    {/* Left Sidebar */}
    <aside className="w-24  flex flex-col py-4 bg-gray-200 shadow-2xl">
      {menuItems.map((item) => {
        let isDone = false;
        if (item.id === "templates") isDone = !!selectedTemplate;
        if (item.id === "products") isDone = selectedProducts.length > 0;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="relative flex flex-col items-center justify-center w-20 h-24 rounded-lg border-2 border-gray-400 p-2 mb-2"
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
    <aside className="w-96 p-4 h-160 flex flex-col overflow-y-auto bg-white border-l">
      {activeTab === "templates" && (
        <div className="grid grid-cols-2 gap-4">
          {Flyer_Prompts.map((template) => (
            <div
              key={template.id}
              className={`border rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105 ${
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

      {activeTab === "products" && (
        <div className="grid grid-cols-2 gap-6">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer bg-white"
            >
              <img
                src={product.imageUrl}
                alt={product.product_name}
                className="h-24 w-full object-cover rounded-t-xl"
              />
              <div className="text-center">
                <p className="font-semibold text-sm truncate">{product.product_name}</p>
                <p className="text-xs text-gray-500">{product.category_name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>

    {/* Canvas Area */}
   <main className="flex-1 flex h-160 items-center justify-center bg-white overflow-hidden">
  <div
    className="relative bg-gray-200 shadow-lg w-200 h-120 rounded-xl flex items-center justify-center [&::-webkit-scrollbar]:hidden overflow-hidden"
    style={{ scrollbarWidth: "none" }} // Firefox ke liye
  >
    {selectedTemplate ? (
      <>
        <img
          ref={imgRef}
          src={`https://supoassets.s3.ap-south-1.amazonaws.com/public/GoogleStudio/assets/Templates/flyer/v2/${encodeURIComponent(
            selectedTemplate.name
          )}.webp`}
          alt={selectedTemplate.name}
          className="w-full h-full object-contain rounded-md"  // ✅ use object-contain instead of cover
          draggable={false}
          onLoad={handleImageLoad}
        />

        {/* Edit Buttons */}
        {imgLoaded &&
          selectedTemplate.annotations &&
          Object.entries(selectedTemplate.annotations).map(([key, value]) => {
            const pos = getScaledPosition(value);
            return (
              <button
                key={key}
                style={{
                  position: "absolute",
                  left: `${pos.left}px`,
                  top: `${pos.top}px`,
                  transform: "translate(-50%, -50%)",
                }}
                className="bg-[#FC6C87] text-white p-1 rounded-full shadow-md cursor-pointer"
                onClick={() => console.log("Edit annotation:", key)}
              >
                <FaEdit className="w-3 h-3" />
              </button>
            );
          })}
      </>
    ) : (
      <div className="flex items-center justify-center w-full h-full">
        <span className="text-gray-400 text-lg font-semibold">
          No Template Selected
        </span>
      </div>
    )}
  </div>
</main>

  </div>
</div>

  );
}
