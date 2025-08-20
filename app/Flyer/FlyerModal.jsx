"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function FlyerModal({ activeEdit, setActiveEdit, data }) {
  if (!activeEdit) return null;

  const modalContent = {
    heading: { title: "Select Heading", options: data.Flyer_Heading },
    sub_heading: { title: "Select Subheading", options: data.Flyer_Subheading },
    offer_text: { title: "Select Offer Tag", options: data.Flyer_Offer_tags },
    call_to_action: { title: "Select Call To Action", options: data.Flyer_CTA_Tags },
    Flyer_Background_style: { title: "Select Background Style", options: data.Flyer_Background_style },
    Flyer_Background_color: { title: "Select Background Color", options: data.Flyer_Background_color },
  }[activeEdit];

  return (
    <AnimatePresence>
      {activeEdit && (
        <motion.div
          className="absolute  inset-0 flex items-center justify-center z-50   bg-opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >

          <main className="flex-1 flex h-160 pt-2 pb-2 items-center justify-center   relative">  
<motion.div
  className="bg-white rounded-2xl shadow-xl w-full h-full p-8 flex flex-col relative"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setActiveEdit(null)}
            >
              ✕
            </button>

            <h2 className="font-bold text-2xl mb-6">{modalContent.title}</h2>

            <div className="flex flex-col gap-4 overflow-y-auto flex-1">
              {modalContent.options.map((opt, idx) => (
                <button
                  key={idx}
                  className="w-full py-3 border rounded hover:bg-gray-100 transition text-lg"
                  onClick={() => console.log("Selected:", opt)}
                >
                  {opt}
                </button>
              ))}
            </div>

            <button
              className="mt-6 bg-[#FC6C87] text-white py-3 rounded hover:bg-[#FF9A8B] transition text-lg"
              onClick={() => setActiveEdit(null)}
            >
              Confirm
            </button>
          </motion.div>
          </main>


        </motion.div>
      )}
    </AnimatePresence>
  );
}
