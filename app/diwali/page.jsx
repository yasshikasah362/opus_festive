'use client'
import React, { useState, useEffect } from "react";
import { FaRegImages } from "react-icons/fa";
import { MdNoteAdd, MdPhotoLibrary,MdGridView } from "react-icons/md";
import { FaHeading, FaTag } from "react-icons/fa";
import { MdSubtitles } from "react-icons/md";
import { RiPriceTag3Fill } from "react-icons/ri";
import EditModal from "./EditModal"; // import modal

const Diwali = () => {
  const [active, setActive] = useState("templates");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [products, setProducts] = useState([]);
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [savedData, setSavedData] = useState({}); // yha save hoga


  // Fetch JSON from public folder
  useEffect(() => {
    fetch("/diwali.json")
      .then((res) => res.json())
      .then((data) => setTemplates(data))
      .catch((err) => console.error("Error loading templates:", err));
  }, []);

   // ✅ fetch products
      useEffect(() => {
        fetch("/products.json")
          .then(res => res.json())
          .then(data => setProducts(data))
          .catch(err => console.error("Error loading products:", err));
      }, []);

  let diwali=[
     { id: 1,  img: "/diwali1.jpeg" },
  { id: 2,  img: "/diwali2.jpeg" },
  { id: 3,  img: "/diwali3.jpeg" },
  { id: 4,  img: "/diwali4.jpeg" },
  { id: 5,  img: "/diwali5.jpeg" },
  { id: 6,  img: "/diwali6.jpeg" },
  { id: 7,  img: "/diwali7.jpeg" },
  { id: 8, img: "/diwali8.jpeg" },
  { id: 9,  img: "/diwali9.jpeg" },
  { id: 10,  img: "/diwali10.jpeg" },
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

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="h-16 bg-gray-800 text-white flex items-center justify-center">Navbar</div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-28 flex flex-col py-3 bg-gray-200 border-r-2 border-r-gray-100 shadow-2xl space-y-4 pl-2 pr-2">
          <div
            onClick={() => setActive("templates")}
            className={`cursor-pointer flex items-center gap-1 p-3 rounded-xl shadow-md transition-all duration-200 ${
              active === "templates" ? "bg-[#FC6C87] text-white shadow-lg scale-105" : "bg-white hover:shadow-lg hover:scale-105"
            }`}
          >
            <div className="flex flex-col items-center pb-2">
              <FaRegImages size={20} />
              <span className="font-semibold text-sm">Select</span>
              <span className="font-semibold text-sm">Templates</span>
            </div>
          </div>

           <div
            onClick={() => setActive("product")}
            className={`cursor-pointer flex items-center gap-3 p-3 rounded-xl shadow-md transition-all duration-200 ${
              active === "product" ? "bg-[#FC6C87] text-white shadow-lg scale-105" : "bg-white hover:shadow-lg hover:scale-105"
            }`}
          >
            <div className="flex flex-col items-center pb-2 ml-1">
              <MdGridView size={20} />
              <span className="font-semibold text-sm pt-2">Products</span>
            </div>
          </div>

          <div
            onClick={() => setActive("details")}
            className={`cursor-pointer flex items-center gap-1 p-3 rounded-xl shadow-md transition-all duration-200 ${
              active === "details" ? "bg-[#FC6C87] text-white shadow-lg scale-105" : "bg-white hover:shadow-lg hover:scale-105"
            }`}
          >
            <div className="flex flex-col items-center ml-2">
              <MdNoteAdd size={20} />
              <span className="font-semibold text-sm">Add</span>
              <span className="font-semibold text-sm">Details</span>
            </div>
          </div>

          <div
            onClick={() => setActive("gallery")}
            className={`cursor-pointer flex items-center gap-3 p-3 rounded-xl shadow-md transition-all duration-200 ${
              active === "gallery" ? "bg-[#FC6C87] text-white shadow-lg scale-105" : "bg-white hover:shadow-lg hover:scale-105"
            }`}
          >
            <div className="flex flex-col items-center pb-2 ml-1">
              <MdPhotoLibrary size={20} />
              <span className="font-semibold text-sm pt-2">Gallery</span>
            </div>
          </div>
        </div>

        {/* Middle Panel */}
        <div className="w-75 bg-white border-r-2 border-r-gray-200 p-4 overflow-auto">
        
  {active === "templates" && (
    <div className="grid gap-4">
      {templates.map((temp, index) => (
        <div
          key={temp.id}
          className={`cursor-pointer p-2 border rounded-lg shadow-md bg-white flex flex-col items-center gap-2 transform transition duration-300 hover:scale-105 hover:rotate-1 hover:shadow-2xl ${
            selectedTemplate?.id === temp.id ? "text-black" : ""
          }`}
          onClick={() => setSelectedTemplate(temp)}
        >
          {/* ✅ Image from diwali array */}
          <img
            src={diwali[index]?.img}   // <-- यही main fix है
            alt={templates[index]?.name || `Template ${temp.id}`}
            className="w-full h-40 object-cover rounded-md"
            draggable={false}
          />

          {/* ✅ Name from JSON */}
          <h5 className="font-semibold text-center">
            {templates[index]?.name}
          </h5>
        </div>
      ))}
    </div>
  )}



  {active === "product" && (
            <div>
              {/* <h3 className="text-lg font-semibold mb-3">Your Products</h3> */}
              <div className="grid grid-cols-2   gap-2">
                {products.map((prod, i) => (
                  <div key={i} className="bg-white border rounded-lg shadow-md  flex flex-col items-center">
                    <img 
                      src={prod.imageUrl} 
                      alt={prod.product_name} 
                      className="w-full h-20 object-contain "
                    />
                    <h4 className="font-semibold">{prod.product_name}</h4>
                    
                  </div>
                ))}
              </div>
            </div>
          )}








          {active === "details" && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Add Details</h3>
              <input type="text" placeholder="Enter Name" className="w-full border rounded px-3 py-2 mb-2" />
              <input type="text" placeholder="Enter Mobile Number" className="w-full border rounded px-3 py-2 mb-2" />
              <input type="text" placeholder="Enter Address" className="w-full border rounded px-3 py-2 mb-2" />
              <button className="w-full bg-[#FC6C87] text-white py-2 rounded-md">Confirm</button>
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
        <div className="flex-1 flex items-center justify-center relative overflow-hidden">
  {selectedTemplate ? (
    <div className="relative bg-gray-200 shadow-lg w-[500px] h-[500px] rounded-xl flex items-center justify-center">
      <img
        src={diwali.find((d) => d.id === selectedTemplate.id)?.img}
        alt={selectedTemplate.name}
        className="w-full h-full object-contain rounded-md"
      />

      {/* Vertical Icons */}
      <div className="absolute top-4 left-4 flex flex-col space-y-3 bg-white/70 p-2 rounded-lg shadow">
        <button
          onClick={() => {
            setModalType("headline");
            setIsModalOpen(true);
          }}
          className="p-2 hover:bg-gray-200 rounded-full"
        >
          <FaHeading size={20} />
        </button>
        <button
          onClick={() => {
            setModalType("subtext");
            setIsModalOpen(true);
          }}
          className="p-2 hover:bg-gray-200 rounded-full"
        >
          <MdSubtitles size={20} />
        </button>
        <button
          onClick={() => {
            setModalType("offer");
            setIsModalOpen(true);
          }}
          className="p-2 hover:bg-gray-200 rounded-full"
        >
          <RiPriceTag3Fill size={20} />
        </button>
        <button
          onClick={() => {
            setModalType("offer_tag");
            setIsModalOpen(true);
          }}
          className="p-2 hover:bg-gray-200 rounded-full"
        >
          <FaTag size={20} />
        </button>
      </div>

      {/* ✅ Modal (now inside same area) */}
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        options={getOptions()}
        onSave={(val) => setSavedData({ ...savedData, [modalType]: val })}
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

export default Diwali;
