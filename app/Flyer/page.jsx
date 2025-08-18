"use client";
import { useState, useEffect } from "react";
import {
  FaRegImages,
  FaClock
  
  
} from "react-icons/fa";
import { MdGridView  } from "react-icons/md";
import { MdNoteAdd } from "react-icons/md";  
import { FaCheckCircle } from "react-icons/fa";
 import { MdEdit, MdBrandingWatermark } from "react-icons/md";
import productsData from "../../public/products.json";


export default function Flyer() {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedImage, setSelectedImage] = useState(null);
  const [products, setProducts] = useState([]); // store products from JSON
  const [selectedProducts, setSelectedProducts] = useState([]);

  const menuItems = [
    { id: "templates", icon: <FaRegImages size={20} />, label: "Select Templates" },
    { id: "products", icon: <MdGridView size={20} />, label: "Select Products" },
    { id: "detail", icon: <MdNoteAdd size={20} />, label: "Add     Details" },
    // { id: "tags", icon: <MdBrandingWatermark size={20} />, label: "Tags" },
    // { id: "color", icon: <FaCloudUploadAlt size={20} />, label: "Color" },
  ];
  

  // Load products.json when tab changes to "products"
  useEffect(() => {
  if (activeTab === "products") {
    setProducts(productsData);
  }
}, [activeTab]);

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  return (
    <div className="h-screen  flex flex-col bg-gray-100">
     {/* MAIN CONTENT */}
     <div className="cursor-pointer flex  overflow-hidden  mt-16">
  {/* ICON MENU */}
 

<aside className="cursor-pointer w-23 bg-white border-r flex flex-col py-4 ">
  {menuItems.map((item, index) => {
    const isActive = activeTab === item.id;

    // ✅ Completion condition
    let isDone = false;
    if (item.id === "templates") {
      isDone = !!selectedImage;
    } else if (item.id === "products") {
      isDone = selectedProducts.length > 0;
    } else if (item.id === "addDetail") {
      isDone = detailsCompleted;
    }

    return (
      <button
  key={item.id}
  onClick={() => setActiveTab(item.id)}
  className="relative cursor-pointer flex flex-col items-center justify-center w-full h-28 bg-white rounded-lg hover:shadow-md transition duration-300 p-2"
>
  {/* Status icon */}
  <span className="absolute top-2 left-1">
    {isDone ? (
      <FaCheckCircle className="text-green-500 w-5 h-5" />
    ) : (
      <FaClock className="text-gray-400 w-5 h-5" />
    )}
  </span>

  {/* Number */}
  <span className="absolute   left-2 top-1/3.5 transform -translate-y-1/2 font-bold text-sm text-gray-800">
    {index + 1}.
  </span>

  {/* Main icon */}
  <div className="text-3xl  ">
    {item.icon}
  
    </div>

  {/* Label */}
  <span className="text-xs text-center  font-semibold  leading-tight w-full break-words whitespace-normal">
    {item.label}
  </span>
</button>

    );
  })}
</aside>





  {/* SIDEBAR CONTENT */}
<aside className="w-100 cursor-pointer bg-white border-r p-3 flex  flex-col  overflow-x-hidden">
  {activeTab === "templates" && (
    <>
      
      <div className="grid grid-cols-2 gap-x-3 gap-y-5  ">
        {Array.from({ length: 6 }).map((_, i) => {
          const src = `/images/flyer${i + 1}.jpg`;
          const isSelected = selectedImage === src;
          return (
            <div
  key={i}
  className={`border-white rounded-xl overflow-hidden   cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl ${
    isSelected ? " ring-[#FC6C87]" : ""
  } h-35 w-45`}  // 👈 yahan height aur width fix kari
  onClick={() => handleImageClick(src)}
>
              <img
  src={src}
  alt={`Template ${i + 1}`}
  className="w-full h-full object-cover rounded-md transition-transform hover:shadow-xl duration-300 transform hover:-rotate-1 hover:scale-105 hover:-translate-y-1"
  draggable={false}
/>

            </div>
          );
        })}
      </div>
    </>
  )}

 {activeTab === "products" && (
  <>
    {/* <h2 className="text-lg font-semibold mb-4">Products</h2> */}
    <div className="grid grid-cols-2 gap-10  mx-6">
  {products.length > 0 ? (
    products.map((product, idx) => (
      <div
        key={idx}
        className="group relative white-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-rotate-1 hover:scale-105 hover:-translate-y-1 cursor-pointer bg-white"
        style={{ perspective: "1000px", width: "160px" }}
      >
        <img
          src={product.imageUrl}
          alt={product.product_name}
          className="h-24 w-full object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-110"
        />
        <div className="text-center">
          <p className="font-semibold text-sm truncate mb-0">{product.product_name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{product.category_name}</p> 
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-400">Loading products...</p>
  )}
</div>

  </>
)}




</aside>



  {/* CANVAS AREA */}
<main className="flex-1 h-screen flex items-center justify-center bg-gray-50 overflow-auto">
<div
  className="relative bg-white white-border shadow-lg rounded-xl overflow-hidden flex items-center justify-center"
  style={{ width: "800px", height: "500px" }}
>
  {selectedImage ? (
    <>
      {/* Image - full fit, no gap */}
      <img
        src={selectedImage}
        alt="Selected"
        className="w-full h-full object-cover" 
        draggable={false}
      />

      {/* Edit Button (top-right corner) */}
      <button
        onClick={() => alert("Edit template clicked!")}
        className="absolute top-3 right-3 flex items-center gap-1 bg-[#FC6C87] text-white px-3 py-1.5 rounded-full shadow-lg hover:bg-[#e85a75] transition"
      >
        <MdEdit className="w-4 h-4" />
        <span className="text-sm">Edit</span>
      </button>
    </>
  ) : (
    <span className="text-gray-400">No Template Selected</span>
  )}
</div>


</main>






</div>
      
    </div>
  );
}
