import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    title:{type: "string",required: true},
    link:{type: 'string',required: true}
});


const Meditation = mongoose.models.Meditation || mongoose.model("Meditation", userSchema);
export default Meditation;