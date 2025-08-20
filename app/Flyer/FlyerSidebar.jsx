"use client";
import { FaRegImages, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { MdGridView, MdNoteAdd } from "react-icons/md";
import { Flyer_Prompts } from "./FlyerData"; // ✅ import templates list

export default function FlyerSidebar({
  activeTab,
  setActiveTab,
  selectedTemplate,
  handleTemplateClick,
  selectedProducts,
  products,
}) {
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
      <aside className="w-96 p-4 h-160 flex flex-col overflow-y-auto bg-white border-r-2 border-r-gray-200 ">
        {/* ✅ Templates tab */}
        {activeTab === "templates" && (
  <div className="grid grid-cols-2 gap-4">
    {Flyer_Prompts.map((template) => (
      <div
        key={template.id}
        className={`rounded-xl cursor-pointer border-2 border-gray-400 transition-transform duration-300 hover:scale-105 ${
          selectedTemplate?.id === template.id ? "ring-2 ring-[#FC6C87]" : ""
        }`}
        onClick={() => handleTemplateClick(template)} // ✅ call parent handler
      >
        <img
          src={`https://supoassets.s3.ap-south-1.amazonaws.com/public/GoogleStudio/assets/Templates/flyer/v2/${encodeURIComponent(template.name)}.webp`}
          alt={template.name}
          className="w-full h-40 object-cover rounded-md"
          draggable={false}
        />
      </div>
    ))}
  </div>
)}


        {/* ✅ Products tab */}
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
    </>
  );
}
