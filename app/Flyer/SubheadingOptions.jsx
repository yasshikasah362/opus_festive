import { Flyer_Subheading } from "./FlyerData";

export default function SubheadingOptions() {
  return (
    <div>
      <h3 className="font-semibold mb-2">Choose Subheading</h3>
      <ul className="space-y-2">
        {Flyer_Subheading.map((text, idx) => (
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
