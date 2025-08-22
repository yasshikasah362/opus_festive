"use client";
import { useState } from "react";

export default function AddDetailsModal({ isOpen, onClose, onGenerate }) {
  if (!isOpen) return null;

  // Flyer prompt suggestions
  const suggestions = [
    {
      id: 1,
      headline: "Elegant Comfort for Every Home",
      subtext: "Introducing our new handcrafted lounger series.",
      offer_tag: "Launch Offer 15% OFF",
      call_to_action: "Shop Now",
      prompt_settings: {
        aspect_ratio: "4:5",
        theme: "Soft White Minimal",
        border_design: "Thin rounded lines with soft corners",
        border_thickness: "2px",
        background_style: "Solid color",
        background_colors: "ivory or light beige",
        logo_placement: "Top-left",
        main_image_placement: "center",
        image_size: "60% of width",
        text_section: {
          headline: "Elegant Comfort for Every Home",
          font_style: "Serif, Thin weight",
          font_color: "Soft charcoal",
          position: "Top 30%, centered",
          subtext: "Introducing our new handcrafted lounger series."
        },
        offer_tag: {
          text: "Launch Offer 15% OFF",
          position: "top-right",
          style: "subtle circle badge"
        },
        call_to_action: {
          text: "Shop Now",
          style: "pill-shaped button, muted green",
          location: "bottom center"
        },
        optional: "add soft shadow",
        mood: "calm, clean, timeless"
      }
    },
    // Add more suggestions if needed
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-3/4 max-w-xl p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Select a Flyer Prompt</h2>
        <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
          {suggestions.map((s) => (
            <button
              key={s.id}
              onClick={() => onGenerate(s)}
              className="p-3 border rounded-lg hover:bg-gray-100 text-left"
            >
              <p className="font-semibold">{s.headline}</p>
              <p className="text-sm text-gray-500">{s.subtext}</p>
              <p className="text-xs text-gray-400 mt-1">Offer: {s.offer_tag}</p>
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}
