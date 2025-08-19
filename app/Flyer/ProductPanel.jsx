// app/Flyer/ProductPanel.jsx
"use client";
export default function ProductPanel() {
  const products = ["Sofa", "Chair", "Table"];
  return (
    <div>
      <h2 className="font-semibold text-lg mb-4">Select Products</h2>
      <ul className="space-y-2">
        {products.map((p, i) => (
          <li key={i} className="p-2 border rounded bg-gray-50">
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
