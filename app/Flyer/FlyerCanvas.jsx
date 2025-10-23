"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion"; // 🟣 Added for animation
import { FaHeading, FaTag } from "react-icons/fa";
import { MdSubtitles } from "react-icons/md";
import { RiPriceTag3Fill } from "react-icons/ri";
import FlyerModal from "./FlyerModal";
import {
  Flyer_Heading,
  Flyer_Subheading,
  Flyer_Offer_tags,
  Flyer_CTA_Tags,
  Flyer_Background_style,
  Flyer_Background_color,
} from "./FlyerData";

export default function FlyerCanvas({
  selectedTemplate,
  activeEdit,
  setActiveEdit,
  imgLoaded,
  setImgLoaded,
  getScaledPosition,
  flyerForm,
  setFlyerForm,
  panelOpen,
}) {
  const imgRef = useRef(null);
  const [confirmedEdits, setConfirmedEdits] = useState({});
  const [slideRight, setSlideRight] = useState(false); // 🟢 Added
  const [active, setActive] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (selectedTemplate) {
      setImgLoaded(false);
      setSlideRight(true); // 🟢 Slide canvas right when template selected
    }
  }, [selectedTemplate]);
   useEffect(() => {
    // Prevent animation flicker on first render
    setHasMounted(true);
  }, []);

  const handleImageLoad = () => {
    const img = imgRef.current;
    if (!img) return;
    const containerWidth = img.clientWidth;
    const containerHeight = img.clientHeight;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    const imageRatio = naturalWidth / naturalHeight;
    const containerRatio = containerWidth / containerHeight;
    let renderedWidth,
      renderedHeight,
      offsetX = 0,
      offsetY = 0;
    if (imageRatio > containerRatio) {
      renderedWidth = containerWidth;
      renderedHeight = containerWidth / imageRatio;
      offsetY = (containerHeight - renderedHeight) / 2;
    } else {
      renderedHeight = containerHeight;
      renderedWidth = containerHeight * imageRatio;
      offsetX = (containerWidth - renderedWidth) / 2;
    }
    setImgLoaded({
      naturalWidth,
      naturalHeight,
      renderedWidth,
      renderedHeight,
      offsetX,
      offsetY,
    });
  };

  const data = {
    Flyer_Heading,
    Flyer_Subheading,
    Flyer_Offer_tags,
    Flyer_CTA_Tags,
    Flyer_Background_style,
    Flyer_Background_color,
  };

  const iconPanel = [
    { key: "heading", label: "Heading", icon: <FaHeading size={14} /> },
    { key: "sub_heading", label: "Subheading", icon: <MdSubtitles size={14} /> },
    { key: "offer_text", label: "Offer", icon: <RiPriceTag3Fill size={14} /> },
    { key: "call_to_action", label: "CTA", icon: <FaTag size={14} /> },
  ];

  return (
   <motion.div
           className="flex-1 flex items-center justify-center relative overflow-hidden  p-1 sm:p-4 mb-19 "
           animate={{ marginLeft: active ? 72 : 0 }}
           transition={{ type: "tween", duration: 0.35 }}
         >
           {selectedTemplate ? (
             <div className="relative bg-white/80 backdrop-blur-md shadow-2xl w-full max-w-[640px] h-[500px] rounded-xl flex items-center justify-center overflow-hidden">
               <img
        ref={imgRef}
        src={`https://supoassets.s3.ap-south-1.amazonaws.com/public/GoogleStudio/assets/Templates/flyer/v2/${encodeURIComponent(
          selectedTemplate.name
        )}.webp`}
        alt={selectedTemplate.name}
        className="w-full h-full object-contain rounded-md"
        draggable={false}
        onLoad={handleImageLoad}
      />
               {/* Left Icon Panel (mirrors first layout) */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-4 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-md">
        {iconPanel.map((item) => {
          const isActive = activeEdit === item.key;
          const confirmed = confirmedEdits[item.key];
          const bgColor = confirmed || isActive ? "#FC6C87" : "#ffffff";
          const iconColor = confirmed || isActive ? "#ffffff" : "#000000";

          return (
            <button
              key={item.key}
              onClick={() => setActiveEdit(item.key)}
              title={`Edit ${item.label}`}
              style={{
                backgroundColor: bgColor,
                color: iconColor,
              }}
              className={`cursor-pointer w-9 h-9 flex items-center justify-center rounded-full shadow transition-all duration-200 hover:scale-105 ${
                isActive ? "ring-2 ring-[#FC6C87]" : ""
              }`}
            >
              {item.icon}
            </button>
          );
        })}
      </div>

      {/* Flyer Modal (same as old code) */}
      <FlyerModal
        activeEdit={activeEdit}
        setActiveEdit={setActiveEdit}
        data={data}
        flyerForm={flyerForm}
        setFlyerForm={setFlyerForm}
        onConfirmEdit={(key) =>
          setConfirmedEdits((prev) => ({ ...prev, [key]: true }))
        }
      />
    </div>             
           ) : (
             <div className="relative bg-gray-200 shadow-inner w-full max-w-[640px] h-[500px] rounded-xl flex items-center justify-center text-gray-500 text-sm">
            No Template Selected
             </div>
           )}
         </motion.div>

  );
}
