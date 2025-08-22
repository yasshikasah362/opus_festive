import mongoose from "mongoose";

const FlyerSchema = new mongoose.Schema({
  settings: {
    aspect_ratio: String,
    theme: String,
    border_design: String,
    border_thickness: String,
    background_style: String,
    background_colors: String,
  },
  generatedPrompt: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Flyer || mongoose.model("Flyer", FlyerSchema);
