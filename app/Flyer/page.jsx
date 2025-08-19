"use client";
import { useState, useEffect } from "react";
import {
  FaRegImages,
  FaClock
  
  
} from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
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
    { id: "templates", icon: <FaRegImages size={20} />, label: "Select Template" },
    { id: "products", icon: <MdGridView size={20} />, label: "Select Product" },
    { id: "detail", icon: <MdNoteAdd size={20} />, label: "Add Detail" },
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
 

<aside className="cursor-pointer w-23    flex flex-col py-4 bg-gray-200  shadow-2xl ">
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
  className="relative cursor-pointer flex flex-col items-center justify-center w-20 ml-1.5 mt-1 h-25  rounded-lg border-gray-400 shadow-2xl border-2 p-2"
>
  {/* Status icon */}
  <span className="absolute top-2 left-1">
    {isDone ? (
      <FaCheckCircle className="text-green-500 w-5 h-5" />
    ) : (
      <FaExclamationCircle className="text-yellow-500 w-5 h-5" />
    )}
  </span>

  {/* Number */}
  <span className="absolute mt-3   left-2  transform -translate-y-1/2 font-bold text-sm text-gray-800">
    {index + 1}.
  </span>

  {/* Main icon */}
  <div className="text-3xl mb-2 ">
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
<aside className="w-100 cursor-pointer bg-gray-100 border-r-2 border-gray-200 shadow-xs p-3 flex  flex-col  overflow-x-hidden">
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
    className="relative bg-white shadow-lg rounded-xl overflow-hidden"
    style={{ width: "800px", height: "500px" }}
  >
    {selectedImage ? (
      <>
        {/* Template Image */}
        <img
          src={selectedImage}
          alt="Selected"
          className="w-full h-full object-cover"
          draggable={false}
        />

        {/* Editable Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Heading */}
          <h1
            contentEditable
            suppressContentEditableWarning={true}
            className="absolute top-20 left-20 text-3xl font-bold text-black cursor-text"
          >
            Sample Heading
          </h1>
          <MdEdit className="absolute top-20 left-10 w-5 h-5 text-black cursor-pointer" />

          {/* Subheading */}
          <h2
            contentEditable
            suppressContentEditableWarning={true}
            className="absolute top-32 left-20 text-xl text-gray-700 cursor-text"
          >
            Sample Subheading
          </h2>
          <MdEdit className="absolute top-32 left-10 w-5 h-5 text-black cursor-pointer" />

          {/* Any other text */}
          <p
            contentEditable
            suppressContentEditableWarning={true}
            className="absolute top-44 left-20 text-sm text-gray-600 cursor-text"
          >
            Additional details here...
          </p>
          <MdEdit className="absolute top-44 left-10 w-4 h-4 text-black cursor-pointer" />
        </div>
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
