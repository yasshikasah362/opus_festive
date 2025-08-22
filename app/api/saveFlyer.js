import dbConnect from "@/lib/db";   // tumhari db connection file
import Flyer from "@/models/Flyer"; // tumhara flyer ka model

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();

    const { settings, generatedPrompt } = req.body;

    if (!settings || !generatedPrompt) {
      return res.status(400).json({ error: "Settings or prompt missing" });
    }

    // Save flyer to DB
    const flyer = new Flyer({
      settings,
      generatedPrompt,
      createdAt: new Date(),
    });

    await flyer.save();

    res.status(200).json({ message: "Flyer saved successfully!", flyer });
  } catch (error) {
    console.error("SaveFlyer API Error:", error);
    res.status(500).json({ error: "Failed to save flyer" });
  }
}
