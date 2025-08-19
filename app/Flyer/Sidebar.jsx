// app/Flyer/Sidebar.jsx
"use client";
import { FaBox, FaImage, FaUser } from "react-icons/fa";

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "templates", label: "Templates", icon: <FaImage /> },
    { id: "products", label: "Products", icon: <FaBox /> },
    { id: "details", label: "Add Details", icon: <FaUser /> },
  ];

  return (
    <aside className="w-20 bg-white border-r flex flex-col items-center py-4 space-y-6">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center p-2 rounded-lg ${
            activeTab === item.id ? "bg-blue-100 text-blue-600" : "text-gray-600"
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="text-xs mt-1">{item.label}</span>
        </button>
      ))}
    </aside>
  );
}
