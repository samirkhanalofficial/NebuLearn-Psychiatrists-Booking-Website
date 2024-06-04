import { ref } from "joi";
import mongoose from "mongoose";
import User from "./user.model";

const RatingSchema = new mongoose.Schema({
  doctor: {
    type: String,
    ref: User,
    required: true,
  },
  client: {
    type: String,
    ref: User,
    required: true,
  },
  rating: { type: Number, required: true },
  message: {
    type: String,
    default: "",
    required: false,
  },
});

const Rating = mongoose.models.Rating || mongoose.model("Rating", RatingSchema);
export { Rating };
