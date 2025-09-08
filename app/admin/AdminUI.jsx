"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminUI() {
  const [formData, setFormData] = useState({
    backgroundName: "",
    category: "Sofa",
    tags: [],
    defaultPosition: "",
    baseUrl: "",
  });
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch items from MongoDB
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      const normalized = res.data.map(item => ({
        ...item,
        tags: Array.isArray(item.tags)
          ? item.tags
          : item.tags?.split(",").map(t => t.trim()) || []
      }));
      setItems(normalized);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: Array.isArray(formData.tags)
        ? formData.tags
        : formData.tags.split(",").map(t => t.trim()).filter(Boolean),
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/items/${editId}`, payload);
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/items", payload);
      }
      setFormData({
        backgroundName: "",
        category: "Sofa",
        tags: [],
        defaultPosition: "",
        baseUrl: "",
      });
      setIsModalOpen(false);
      fetchItems();
    } catch (err) {
      console.error("Error saving item:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item._id);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin UI</h1>

      <button
        onClick={() => {
          setEditId(null);
          setFormData({ backgroundName: "", category: "Sofa", tags: [], defaultPosition: "", baseUrl: "" });
          setIsModalOpen(true);
        }}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 mb-6"
      >
        Create Background
      </button>

      {/* Scrollable Table */}
      <div className="border-2 border-gray-200 rounded-lg overflow-y-auto h-[500px] p-4">
        <table className="w-full border-collapse border border-gray-300 rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Background Name</th>
              <th className="border px-4 py-2 text-left">Category</th>
              <th className="border px-4 py-2 text-left">Tags</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border px-4 py-2">{item.backgroundName}</td>
                <td className="border px-4 py-2">{item.category}</td>
                <td className="border px-4 py-2">{item.tags.join(", ")}</td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <button onClick={() => handleEdit(item)} className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 rounded shadow">Edit</button>
                  <button onClick={() => handleDelete(item._id)} className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded shadow">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[450px] p-6 relative">
            <h2 className="text-xl font-semibold mb-4">{editId ? "Edit Background" : "Create Background"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block mb-1">Background Name</label>
                <input type="text" value={formData.backgroundName} onChange={e => setFormData({ ...formData, backgroundName: e.target.value })} className="w-full border rounded-lg px-3 py-2" required />
              </div>

              <div className="mb-3">
                <label className="block mb-1">Category</label>
                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full border rounded-lg px-3 py-2">
                  <option>Sofa</option>
                  <option>TvUnit</option>
                  <option>Wardrobe</option>
                  <option>Recliner</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="block mb-1">Tags (comma separated)</label>
                <input type="text" value={formData.tags.join(", ")} onChange={e => setFormData({ ...formData, tags: e.target.value.split(",").map(t => t.trim()) })} placeholder="e.g. Small, Large, Modern" className="w-full border rounded-lg px-3 py-2" />
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{editId ? "Update" : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
