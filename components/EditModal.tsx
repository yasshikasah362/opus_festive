"use client";
import { ReactNode } from "react";

type EditModalProps = {
  title: string;
  options: string[];
  onSelect: (value: string) => void;
  onClose: () => void;
  children: ReactNode;
};

export default function EditModal({
  title,
  options,
  onSelect,
  onClose,
  children,
}: EditModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[600px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Dropdown */}
        <select
          className="border px-3 py-2 rounded w-full mb-4"
          onChange={(e) => onSelect(e.target.value)}
        >
          <option value="">Select Option</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {/* Content (Template + Editable) */}
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}
