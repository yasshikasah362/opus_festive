"use client";
import { useRef, useEffect } from "react";
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

  return (
    <main className="flex-1 flex items-center justify-center overflow-hidden relative p-2">
      <div
        className="
          relative bg-gray-200 shadow-lg rounded-xl flex items-center justify-center
          w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] 
          max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%]
        "
      >
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
                      className="bg-[#FC6C87] text-white p-1 sm:p-2 rounded-full shadow-md cursor-pointer"
                      onClick={() => setActiveEdit(key)}
                    >
                      <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
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
            <span className="text-gray-400 text-base sm:text-lg font-semibold text-center">
              No Template Selected
            </span>
          </div>
        )}
      </div>
    </main>
  );
}
