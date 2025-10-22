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

  useEffect(() => {
    if (selectedTemplate) {
      setImgLoaded(false);
      setSlideRight(true); // 🟢 Slide canvas right when template selected
    }
  }, [selectedTemplate]);

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
    <motion.main
      animate={{ x: panelOpen ? "2rem" : 0, }} // 🟢 Shift right when template selected
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      className="flex-1 flex items-center justify-center overflow-hidden relative p-10"
    >
      <div
        className="relative bg-gray-200 shadow-lg rounded-xl flex items-center justify-center
        w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[80vh]
        max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%]"
      >
        {selectedTemplate ? (
          <>
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

            {/* Left Icon Panel */}
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
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-gray-400 text-base sm:text-lg font-semibold text-center">
              No Template Selected
            </span>
          </div>
        )}
      </div>
    </motion.main>
  );
}
