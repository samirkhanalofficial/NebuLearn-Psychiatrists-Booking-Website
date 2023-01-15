import mongoose from "mongoose";
import bcrypt from "bcrypt";

const discussionSchema = new mongoose.Schema({
  question: { type: "string", required: true },
  email: { type: "string", required: true },
  comment: [{ reply: String, email: String }],
});

const Discussion =
  mongoose.models.Discussion || mongoose.model("Discussion", discussionSchema);
export default Discussion;
