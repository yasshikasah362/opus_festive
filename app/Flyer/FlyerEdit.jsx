import { useState } from "react";


export default function FlyerEdit({ selectedTemplate, setSelectedTemplate }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const getScaledPosition = (currA) => {
    const img = document.querySelector(".flyer-image");
    if (!img || !img.naturalWidth || !img.naturalHeight) return { left: 0, top: 0 };

    const containerWidth = img.clientWidth;
    const containerHeight = img.clientHeight;

    const imageRatio = img.naturalWidth / img.naturalHeight;
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

    const scaleX = renderedWidth / img.naturalWidth;
    const scaleY = renderedHeight / img.naturalHeight;

    return {
      left: currA.x * scaleX + offsetX,
      top: currA.y * scaleY + offsetY,
    };
  };

  return (
    <div className="relative bg-white shadow-lg rounded-xl overflow-hidden flex items-center justify-center" style={{ width: "800px", height: "500px" }}>
      {selectedTemplate && (
        <button
          className="absolute top-4 right-4 bg-[#FC6C87] hover:bg-[#e96981] text-white px-3 py-2 rounded-full shadow-md flex items-center gap-1"
          onClick={() => console.log("Edit clicked", selectedTemplate)}
        >
          <span className="text-sm font-medium">Edit</span>
          <FaEdit className="w-4 h-4" />
        </button>
      )}

      {selectedTemplate ? (
        <div className="relative w-full h-full">
          <img
            src={`https://supoassets.s3.ap-south-1.amazonaws.com/public/GoogleStudio/assets/Templates/flyer/v2/${encodeURIComponent(selectedTemplate.name)}.webp`}
            alt={selectedTemplate.name}
            className="flyer-image w-full h-full object-cover rounded-md"
            draggable={false}
            onLoad={() => setImgLoaded(true)}
          />

          {imgLoaded && selectedTemplate.annotations &&
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
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <span className="text-gray-400 text-lg font-semibold">
            No Template Selected
          </span>
        </div>
      )}
    </div>
  );
}
