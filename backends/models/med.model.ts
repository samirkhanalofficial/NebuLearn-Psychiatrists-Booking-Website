import mongoose from "mongoose";

const medSchema = new mongoose.Schema({
  medName: { type: String, required: true },
  expiryDate: { type: String, required: true },
});

const Medicine =
  mongoose.models.Medicine || mongoose.model("Medicine", medSchema);
export default Medicine;
