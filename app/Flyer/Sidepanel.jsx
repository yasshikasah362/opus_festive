"use client";
import { useState } from "react";
import {Flyer_Prompts} from "./FlyerData";

export default function SidePanel({ onTemplateSelect }) {
  const [activeTab, setActiveTab] = useState("templates");

  return (
    <aside className="w-64 bg-white border-r p-4 flex flex-col">
      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setActiveTab("templates")}
          className={`px-3 py-1 rounded ${activeTab === "templates" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Templates
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`px-3 py-1 rounded ${activeTab === "products" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab("details")}
          className={`px-3 py-1 rounded ${activeTab === "details" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Add Details
        </button>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "templates" && (
          <div className="space-y-2">
            {Flyer_Prompts.map((template) => (
              <div
                key={template.id}
                className="cursor-pointer border rounded p-2 flex items-center space-x-2 hover:bg-gray-100"
                onClick={() => onTemplateSelect(template)}
              >
                <img src={template.thumbnail} alt={template.name} className="w-12 h-12 rounded" />
                <span>{template.name}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "products" && (
          <p className="text-gray-600">Product selection UI yaha aayega.</p>
        )}

        {activeTab === "details" && (
          <form className="space-y-2">
            <input type="text" placeholder="Title" className="w-full border p-2 rounded" />
            <textarea placeholder="Description" className="w-full border p-2 rounded" />
            <button type="button" className="bg-blue-500 text-white px-3 py-1 rounded">
              Add
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
