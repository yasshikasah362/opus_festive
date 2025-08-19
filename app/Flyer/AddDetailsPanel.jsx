// app/Flyer/AddDetailsPanel.jsx
"use client";
export default function AddDetailsPanel({ details, setDetails }) {
  return (
    <div>
      <h2 className="font-semibold text-lg mb-4">Add Your Details</h2>
      <input
        type="text"
        placeholder="Name"
        value={details.name}
        onChange={(e) => setDetails({ ...details, name: e.target.value })}
        className="w-full border p-2 mb-2 rounded"
      />
      <input
        type="text"
        placeholder="Phone"
        value={details.phone}
        onChange={(e) => setDetails({ ...details, phone: e.target.value })}
        className="w-full border p-2 mb-2 rounded"
      />
    </div>
  );
}
