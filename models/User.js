import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  image: String, // for Google image
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
