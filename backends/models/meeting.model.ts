import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema({
  client: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  clientAge: {
    type: Number,
    required: true,
  },
  medicines: {
    type: [String],
  },
  clientName: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  paid: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Meeting =
  mongoose.models.Meeting || mongoose.model("Meeting", MeetingSchema);
export { Meeting };
