"use client";
import React, { useState, useEffect } from "react";
import templatesData from "@/public/gandhijayanti.json";

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
      [type]: value, // ✅ type ke hisaab se field update hoga
    }));
  };
console.log("selected data,",formData);
  return (
    <div className="absolute inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 rounded-xl transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl p-6 w-[50%] h-[80%] transform transition-all duration-300 overflow-y-auto ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2">
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
              className={`px-4 py-2 border rounded-lg cursor-pointer transition 
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
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(formData); // ✅ pura formData bhejna
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-[#FC6C87] text-white hover:bg-pink-600 transition shadow-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
