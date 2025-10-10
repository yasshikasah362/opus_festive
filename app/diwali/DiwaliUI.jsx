"use client";
import React, { useState, useEffect,useMemo } from "react";
import { FaRegImages, FaHeading, FaTag, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { MdNoteAdd, MdPhotoLibrary, MdGridView, MdSubtitles } from "react-icons/md";
import { RiPriceTag3Fill } from "react-icons/ri";
import EditModal from "./EditModal";
import { motion,AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";

const DiwaliUI = ({ username }) => {
  const [active, setActive] = useState("templates");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [savedData, setSavedData] = useState({});
  const [isTemplateSelected, setIsTemplateSelected] = useState(false);
  const [isProductSelected, setIsProductSelected] = useState(false);
  const [isDetailsConfirmed, setIsDetailsConfirmed] = useState(false);
  const [slideRight, setSlideRight] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openPanel = () => {
    setPanelOpen(true);
  };
const masonryBreakpoints = {
  default: 2,
  1100: 2,
  700: 1,
};

  useEffect(() => {
  if (selectedTemplate && active === "templates") {
    setPanelOpen(true);
  }
}, [selectedTemplate, active]);


  useEffect(() => {
    fetch("/diwali.json")
      .then((res) => res.json())
      .then((data) => setTemplates(data))
      .catch((err) => console.error("Error loading templates:", err));
  }, []);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  // 2️⃣ useEffect to open panel when template is selected
useEffect(() => {
  if (selectedTemplate && active === "templates") {
    setPanelOpen(true);
  }
}, [selectedTemplate, active]);


  let diwali = [
    { id: 1, img: "/diwali1.jpeg" },
    { id: 2, img: "/diwali2.jpeg" },
    { id: 3, img: "/diwali3.jpeg" },
    { id: 4, img: "/diwali4.jpeg" },
    { id: 5, img: "/diwali5.jpeg" },
    { id: 6, img: "/diwali6.jpeg" },
    { id: 7, img: "/diwali7.jpeg" },
    { id: 8, img: "/diwali8.jpeg" },
    { id: 9, img: "/diwali9.jpeg" },
    { id: 10, img: "/diwali10.jpeg" },
  ];

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

  const steps = [
    { key: "templates", icon: <FaRegImages size={22} />, label: "1. Templates", completed: isTemplateSelected, disabled: false },
    { key: "product", icon: <MdGridView size={22} />, label: "2. Products", completed: isProductSelected, disabled: !isTemplateSelected },
    { key: "details", icon: <MdNoteAdd size={22} />, label: "3. Details", completed: isDetailsConfirmed, disabled: !isProductSelected },
    { key: "gallery", icon: <MdPhotoLibrary size={22} />, label: "4. Result", completed: false, disabled: !isDetailsConfirmed },
  ];

  // Filtered templates based on search (at least 3 letters)
    // const filteredTemplates = useMemo(() => {
    //   if (searchQuery.length < 3) return Flyer;
    //   return Flyer_Prompts.filter((t) =>
    //     t.name.toLowerCase().includes(searchQuery.toLowerCase())
    //   );
    // }, [searchQuery]);
  
    // Filtered products based on search (at least 3 letters)
    const filteredProducts = useMemo(() => {
      if (searchQuery.length < 3) return products;
      return products.filter((p) =>
        p.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [searchQuery, products]);

  return (
  <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="h-12 sm:h-14 md:h-16 bg-gradient-to-r from-pink-600 to-orange-500 text-white flex items-center justify-center text-sm sm:text-base md:text-lg font-semibold shadow-md">
        Diwali Designer
      </div>

      {/* Mobile Selected Template Preview */}
      <div className="sm:hidden mb-2">
        {selectedTemplate ? (
          <div className="relative w-full max-w-full h-[220px] rounded-xl shadow-md overflow-hidden flex justify-center">
            <img
              src={diwali.find(d => d.id === selectedTemplate.id)?.img}
              alt={selectedTemplate.name}
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute top-7 left-2 flex flex-col gap-2 z-50">
              {[
                { icon: <FaHeading size={14} />, type: "headline" },
                { icon: <MdSubtitles size={14} />, type: "subtext" },
                { icon: <RiPriceTag3Fill size={14} />, type: "offer" },
                { icon: <FaTag size={14} />, type: "offer_tag" },
              ].map((btn, i) => {
                const isSaved = savedData[selectedTemplate?.id]?.[btn.type];
                return (
                  <button
                    key={i}
                    onClick={() => { setModalType(btn.type); setIsModalOpen(true); }}
                    className={`p-2 rounded-full shadow-md hover:scale-110 transition ${isSaved ? "bg-pink-600/70 text-white ring-2 ring-pink-600" : "bg-white text-black"}`}
                  >
                    {btn.icon}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="w-full h-[220px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-sm">
            No Template Selected
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col sm:flex-row overflow-visible">
        {/* Sidebar for Desktop */}
        <div className="hidden sm:flex w-20 md:w-32 flex-col p-4 bg-gray-100 border-r border-gray-200 shadow-xl space-y-4">
          {steps.map(item => {
            let enabled = item.key === "templates" ? true
                        : item.key === "product" ? isTemplateSelected
                        : item.key === "details" ? isProductSelected
                        : isDetailsConfirmed;
            return (
              <div
                key={item.key}
                onClick={() => enabled && setActive(item.key)}
                className={`cursor-pointer flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 relative group ${
                  active === item.key
                    ? "bg-gradient-to-tr from-pink-500 to-orange-400 text-white shadow-lg scale-105"
                    : enabled
                    ? "bg-white hover:shadow-md hover:scale-105 text-gray-700"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <div className="relative">
                  {item.icon}
                  {item.completed ? (
                    <FaCheckCircle className="absolute -top-1 -left-5 text-green-400 w-4 h-4" />
                  ) : (
                    <FaExclamationCircle className="absolute -top-1 -left-5 text-yellow-500 w-4 h-4" />
                  )}
                </div>
                <span className="font-medium text-center text-xs md:text-sm">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Canvas / Middle Preview (always visible) */}
        <motion.main
          animate={{ x: panelOpen ? "2rem" : 0 }}
          transition={{ type: "spring", stiffness: 20, damping: 20 }}
          className="flex-1 flex items-center justify-center overflow-hidden relative p-10"
        >
          <div className="hidden sm:flex flex-1 items-center justify-center relative overflow-hidden bg-gray-50 p-2 sm:p-4">
            {selectedTemplate ? (
              <div className="relative bg-white/80 backdrop-blur-md shadow-2xl w-full max-w-[640px] h-[500px] rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src={diwali.find(d => d.id === selectedTemplate.id)?.img}
                  alt={selectedTemplate.name}
                  className="w-full h-full object-cover rounded-md"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {["headline","subtext","offer","offer_tag"].map((type,i)=>(
                    <button
                      key={i}
                      onClick={()=>{setModalType(type); setIsModalOpen(true);}}
                      className={`p-2 rounded-full shadow-md hover:scale-110 transition ${savedData[selectedTemplate?.id]?.[type] ? "bg-pink-600/70 text-white ring-2 ring-pink-600" : "bg-white text-black"}`}
                    >
                      {type==="headline" && <FaHeading size={14} />}
                      {type==="subtext" && <MdSubtitles size={14} />}
                      {type==="offer" && <RiPriceTag3Fill size={14} />}
                      {type==="offer_tag" && <FaTag size={14} />}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="relative bg-gray-200 shadow-inner w-full max-w-[640px] h-[500px] rounded-xl flex items-center justify-center text-gray-500 text-sm">
                No Template Selected
              </div>
            )}
          </div>
        </motion.main>

        {/* Right Panel */}
        <AnimatePresence>
          {panelOpen && active === "templates" && selectedTemplate  && (
            <motion.aside
             key={selectedTemplate.id}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="fixed top-0 right-0 md:w-96 w-full h-full md:h-[40rem] p-4 flex flex-col overflow-y-auto bg-white border-l border-gray-100 shadow-xl z-50"
    >
              {(active === "templates" || active === "product") && (
                <div className="flex items-center justify-between mb-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    onClick={() => setPanelOpen(false)}
                    className="ml-3 text-xl font-bold text-gray-500 hover:text-gray-800 transition"
                  >
                    &times;
                  </button>
                </div>
              )}

              <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
                <div className="w-full sm:w-64 md:w-72 lg:w-80 bg-white border-r border-gray-200 p-3 sm:p-5 overflow-y-auto flex flex-col">
                  {active === "templates" && (
                    <div className="grid gap-3 sm:gap-4 grid-cols-2">
                      {templates.map((temp, index) => (
                        <div
                          key={temp.id}
                          onClick={() => {
                            setSelectedTemplate(temp);
                            setIsTemplateSelected(true);
                            setActive("templates");
                            setPanelOpen(true); // <-- panel opens automatically
                          }}
                          className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-md transition-all duration-300 ${selectedTemplate?.id === temp.id ? "ring-4 ring-pink-400 scale-105" : "hover:scale-105 hover:shadow-lg"}`}
                        >
                          <img
                            src={diwali[index]?.img}
                            alt={temp.name || `Template ${temp.id}`}
                            className="w-full h-24 sm:h-28 md:h-32 object-cover"
                          />
                          {selectedTemplate?.id === temp.id && (
                            <FaCheckCircle className="absolute top-2 left-2 text-green-400 text-lg drop-shadow-lg w-4 h-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {active === "product" && (
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {filteredProducts.map((prod, i) => {
                        const isSelected = selectedProduct?.product_name === prod.product_name;
                        return (
                          <div
                            key={i}
                            onClick={() => {
                              setSelectedProduct(prod);
                              setIsProductSelected(true);
                              setActive("products");
                              setPanelOpen(true);
                            }}
                            className={`relative border-2 rounded-2xl shadow-md flex flex-col items-center p-2 hover:shadow-lg transition cursor-pointer ${isSelected ? "ring-4 ring-pink-200 border-pink-300 scale-105" : "border-gray-300"}`}
                          >
                            {isSelected && <FaCheckCircle className="absolute top-1 left-1 text-green-500 text-sm drop-shadow-md" />}
                            <img src={prod.imageUrl} alt={prod.product_name} className="w-full h-20 sm:h-24 object-contain mb-2" />
                            <h4 className="font-medium text-xs sm:text-sm text-gray-800 text-center">{prod.product_name}</h4>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {active === "details" && (
                    <div className="space-y-3 mb-24">
                      <h3 className="text-base font-semibold mb-2">Add Details</h3>
                      <input type="text" placeholder="Enter Name" className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400 outline-none" />
                      <input type="text" placeholder="Enter Mobile Number" className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400 outline-none" />
                      <input type="text" placeholder="Enter Address" className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400 outline-none" />
                      <button onClick={() => setIsDetailsConfirmed(true)} className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white py-2 rounded-lg shadow-md hover:opacity-90 transition text-sm">Confirm and Generate</button>
                    </div>
                  )}

                  {active === "gallery" && (
                    <div>
                      <h3 className="text-base font-semibold mb-2">Gallery</h3>
                      <p className="text-sm text-gray-600">Gallery images yaha show hongi...</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>



      </div>

      {/* Mobile Bottom Navbar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around py-2">
        {steps.map(item => (
          <button
            key={item.key}
            onClick={() => !item.disabled && setActive(item.key)}
            className={`cursor-pointer flex flex-col items-center text-xs ${item.disabled ? "text-gray-300 cursor-not-allowed" : active === item.key ? "text-pink-600 font-semibold" : "text-gray-600"}`}
          >
            <div className="relative">
              {item.completed ? <FaCheckCircle className="absolute -top-1 -right-2 text-green-400 text-xs" /> : <FaExclamationCircle className="absolute -top-1 -right-2 text-yellow-500 text-xs" />}
            </div>
            {item.label}
          </button>
        ))}
      </div>

      {/* Edit Modal */}
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        options={getOptions()}
        onSave={(val) => {
          setSavedData(prev => ({ ...prev, [selectedTemplate.id]: { ...(prev[selectedTemplate.id] || {}), [modalType]: val }}));
          setIsModalOpen(false);
        }}
      />
    </div>

  );
};

export default DiwaliUI;