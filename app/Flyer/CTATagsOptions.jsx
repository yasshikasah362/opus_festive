import { Flyer_CTA_Tags } from "./FlyerData";

export default function CTATagsOptions() {
  return (
    <div>
      <h3 className="font-semibold mb-2">Choose Heading</h3>
      <ul className="space-y-2">
        {Flyer_CTA_Tags.map((text, idx) => (
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
