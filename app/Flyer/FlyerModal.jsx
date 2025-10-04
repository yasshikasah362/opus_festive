"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function FlyerModal({
  activeEdit,
  setActiveEdit,
  data,
  flyerForm,
  setFlyerForm,
  onConfirmEdit, // ✅ new prop from parent
}) {
  if (!activeEdit) return null;

  const modalContent = {
    heading: { title: "Select Heading", options: data.Flyer_Heading },
    sub_heading: { title: "Select Subheading", options: data.Flyer_Subheading },
    offer_text: { title: "Select Offer Tag", options: data.Flyer_Offer_tags },
    call_to_action: {
      title: "Select Call To Action",
      options: data.Flyer_CTA_Tags,
    },
    Flyer_Background_style: {
      title: "Select Background Style",
      options: data.Flyer_Background_style,
    },
    Flyer_Background_color: {
      title: "Select Background Color",
      options: data.Flyer_Background_color,
    },
  }[activeEdit];

  const [selectedValue, setSelectedValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    if (!selectedValue) return;

    // ✅ Update flyerForm as before
    setFlyerForm((prev) => {
      const updatedFlyer = { ...prev.currFlyer };

      switch (activeEdit) {
        case "heading":
          updatedFlyer.prompt_settings.text_section.headline = selectedValue;
          break;
        case "sub_heading":
          updatedFlyer.prompt_settings.text_section.subtext = selectedValue;
          break;
        case "offer_text":
          updatedFlyer.prompt_settings.offer_tag.text = selectedValue;
          break;
        case "call_to_action":
          updatedFlyer.prompt_settings.call_to_action.text = selectedValue;
          break;
        case "Flyer_Background_style":
          updatedFlyer.prompt_settings.background_style = selectedValue;
          break;
        case "Flyer_Background_color":
          updatedFlyer.prompt_settings.background_colors = selectedValue;
          break;
      }

      return { ...prev, currFlyer: updatedFlyer };
    });

    // ✅ Tell parent which edit was confirmed
    if (onConfirmEdit) {
      onConfirmEdit(activeEdit);
    }

    setActiveEdit(null); // close modal
  };

  return (
    <AnimatePresence>
      {activeEdit && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-200 bg-opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <main className="flex-1 flex items-center justify-center relative px-2 sm:px-4">
            <motion.div
              className="
                bg-white rounded-2xl shadow-xl 
                w-full max-w-lg sm:max-w-xl md:max-w-2xl 
                max-h-[90vh] overflow-y-auto
                p-4 sm:p-6 md:p-8 flex flex-col relative
              "
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Close button */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setActiveEdit(null)}
              >
                ✕
              </button>

              <h2 className="font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-center sm:text-left">
                {modalContent.title}
              </h2>

              <div className="flex flex-col gap-3 sm:gap-4 overflow-y-auto flex-1">
                {modalContent.options.map((opt, idx) => (
                  <button
                    key={idx}
                    className={`w-full py-2 sm:py-3 px-3 border rounded-lg transition text-base sm:text-lg text-left
                      ${
                        selectedValue === opt
                          ? "bg-pink-100 border-pink-500 text-pink-600 font-medium"
                          : "hover:bg-gray-100 border-gray-300 text-gray-700"
                      }`}
                    onClick={() => setSelectedValue(opt)}
                  >
                    {opt}
                  </button>
                ))}

                {/* Editable input */}
                <input
                  type="text"
                  className="w-full border rounded-lg p-2 sm:p-3 text-base sm:text-lg mt-2"
                  placeholder="Or type your own..."
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                />
              </div>

              <button
                className="cursor-pointer mt-4 sm:mt-6 bg-[#FC6C87] text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-[#FF9A8B] transition text-base sm:text-lg"
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading ? "Generating..." : "Confirm"}
              </button>
            </motion.div>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
