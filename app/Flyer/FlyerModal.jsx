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
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={() => setActiveEdit(null)} />

      {/* Modal */}
      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        

        <div className="space-y-2 mb-2 max-h-[60vh] overflow-y-auto">
          {modalContent.options.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedValue(opt)}
              className={`px-4 py-2 border rounded-lg cursor-pointer ${
                selectedValue === opt
                  ? "bg-pink-100 border-pink-500 text-pink-600 font-medium"
                  : "hover:bg-gray-100 border-gray-300 text-gray-700"
              }`}
            >
              {opt}
            </div>
          ))}

          
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setActiveEdit(null)}
            className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="cursor-pointer px-4 py-2 bg-[#FC6C87] text-white rounded-lg hover:bg-[#FF9A8B]"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>








  );
}
