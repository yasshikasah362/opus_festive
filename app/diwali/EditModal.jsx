"use client";
import React, { useState, useEffect } from "react";
import templatesData from "@/public/diwali.json";

const EditModal = ({ isOpen, onClose, type, onSave }) => {
  const [formData, setFormData] = useState({
    headline: "",
    subtext: "",
    offer_tag: "",
    offer: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);

      // ✅ Extract options from JSON based on type
      let extracted = [];
      templatesData.forEach((t) => {
        if (type === "headline" && t.prompt_settings?.text_section?.headline) {
          extracted.push(t.prompt_settings.text_section.headline);
        }
        if (type === "subtext" && t.prompt_settings?.text_section?.subtext) {
          extracted.push(t.prompt_settings.text_section.subtext);
        }
        if (type === "offer_tag" && t.prompt_settings?.offer_tag?.text) {
          extracted.push(t.prompt_settings.offer_tag.text);
        }
        if (type === "offer" && t.prompt_settings?.call_to_action?.text) {
          extracted.push(t.prompt_settings.call_to_action.text);
        }
      });

      setOptions(extracted);
    } else {
      setTimeout(() => setShowModal(false), 200);
    }
  }, [isOpen, type]);

  if (!isOpen && !showModal) return null;

  const handleSelect = (value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: value, // ✅ Update dynamically based on type
    }));
  };

  console.log("selected data,", formData);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 sm:px-6">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl p-5 sm:p-6 w-full max-w-lg sm:max-w-xl lg:max-w-2xl transform transition-all duration-300 overflow-y-auto max-h-[60vh]
          ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
      >
        {/* Header */}
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">
          Edit{" "}
          {type === "headline"
            ? "Heading"
            : type === "subtext"
            ? "Subheading"
            : type === "offer"
            ? "Offer Text"
            : type === "offer_tag"
            ? "Offer Tag"
            : ""}
        </h2>

        {/* ✅ Options list */}
        <div className="space-y-2 mb-6">
          {options?.map((opt, index) => (
            <div
              key={index}
              onClick={() => handleSelect(opt)}
              className={`px-4 py-2 text-sm sm:text-base border rounded-lg cursor-pointer transition 
                ${
                  formData[type] === opt
                    ? "bg-pink-100 border-pink-500 text-pink-600 font-medium"
                    : "hover:bg-gray-100 border-gray-300 text-gray-700"
                }`}
            >
              {opt}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(formData);
              onClose();
            }}
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-[#FC6C87] text-white hover:bg-pink-600 transition shadow-md text-sm sm:text-base"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
