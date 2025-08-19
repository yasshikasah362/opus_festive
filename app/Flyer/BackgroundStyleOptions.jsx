import { Flyer_Background_style } from "./FlyerData";

export default function BackgroundStyleOptions() {
  return (
    <div>
      <h3 className="font-semibold mb-2">Choose Subheading</h3>
      <ul className="space-y-2">
        {Flyer_Background_style.map((text, idx) => (
          <li
            key={idx}
            className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-blue-100"
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
