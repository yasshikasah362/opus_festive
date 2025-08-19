// app/Flyer/TemplatePanel.jsx
"use client";
export default function TemplatePanel({ setSelectedTemplate }) {
  const templates = [
    "https://via.placeholder.com/400x600?text=Template+1",
    "https://via.placeholder.com/400x600?text=Template+2",
  ];

  return (
    <div>
      <h2 className="font-semibold text-lg mb-4">Choose a Template</h2>
      <div className="grid grid-cols-2 gap-4">
        {templates.map((t, i) => (
          <img
            key={i}
            src={t}
            alt={`Template ${i + 1}`}
            className="cursor-pointer border rounded hover:shadow-md"
            onClick={() => setSelectedTemplate(t)}
          />
        ))}
      </div>
    </div>
  );
}
