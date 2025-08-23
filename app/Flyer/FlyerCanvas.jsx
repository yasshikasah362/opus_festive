"use client";
import { useRef, useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
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
}) {
  const imgRef = useRef(null);

  useEffect(() => {
    if (selectedTemplate) setImgLoaded(false);
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

  const ps = flyerForm?.currFlyer?.prompt_settings; // shortcut

  return (
    <main className="flex-1 flex h-160 items-center justify-center overflow-hidden relative">
      <div className="relative bg-gray-200 shadow-lg w-200 h-120 rounded-xl flex items-center justify-center">
        {selectedTemplate ? (
          <>
            {/* Template Image */}
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

            {/* ✅ Render direct from prompt_settings */}
            <p className="absolute top-[10%] left-1/2 transform -translate-x-1/2 text-2xl font-bold">
              {ps?.text_section?.headline || "Default Heading"}
            </p>

            <p className="absolute top-[20%] left-1/2 transform -translate-x-1/2 text-lg">
              {ps?.text_section?.subtext || "Default Subheading"}
            </p>

            <p className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 text-sm">
              {ps?.call_to_action?.text || "Call to Action"}
            </p>

            {/* Edit Buttons */}
            {imgLoaded &&
              selectedTemplate.annotations &&
              Object.entries(selectedTemplate.annotations).map(
                ([key, value]) => {
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
                      onClick={() => setActiveEdit(key)}
                    >
                      <FaEdit className="w-3 h-3" />
                    </button>
                  );
                }
              )}

            {/* Modal */}
            <FlyerModal
              activeEdit={activeEdit}
              setActiveEdit={setActiveEdit}
              data={data}
              flyerForm={flyerForm}
              setFlyerForm={setFlyerForm}
            />
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
  );
}
