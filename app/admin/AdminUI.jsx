"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminUI() {
  const [formData, setFormData] = useState({
    backgroundName: "",
    category: "Sofa",
    tags: "Small",
    defaultPosition: "",
    baseUrl: "",
  });

  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch saved data
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/items");
    setItems(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/items/${editId}`, formData);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/api/items", formData);
    }
    setFormData({
      backgroundName: "",
      category: "Sofa",
      tags: "Small",
      defaultPosition: "",
      baseUrl: "",
    });
    fetchItems();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems();
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item._id);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Item Form</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 mb-6"
      >
        <div className="mb-4">
          <label className="block mb-1">Background Name</label>
          <input
            type="text"
            value={formData.backgroundName}
            onChange={(e) =>
              setFormData({ ...formData, backgroundName: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          >
            <option>Sofa</option>
            <option>TvUnit</option>
            <option>Wardrobe</option>
            <option>Recliner</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Tags</label>
          <select
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option>Small</option>
            <option>Large</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Default Position (JSON)</label>
          <textarea
            value={formData.defaultPosition}
            onChange={(e) =>
              setFormData({ ...formData, defaultPosition: e.target.value })
            }
            placeholder='{"x":0,"y":0}'
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Base URL</label>
          <input
            type="text"
            value={formData.baseUrl}
            onChange={(e) =>
              setFormData({ ...formData, baseUrl: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {editId ? "Update" : "Save"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Saved Items</h2>
      <ul>
        {items.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <strong>{item.backgroundName}</strong> ({item.category}) -{" "}
              {item.tags}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-2 py-1 bg-yellow-400 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
