import React from "react";

export default function Editable() {
  return (
    <div className="border p-4 rounded">
      <h3 className="text-lg font-semibold mb-2">Editable Section</h3>
      <textarea
        className="w-full border rounded p-2"
        placeholder="Type here..."
      ></textarea>
    </div>
  );
}
