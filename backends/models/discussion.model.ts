import mongoose from "mongoose";
import bcrypt from "bcrypt";

const commentSchema = new mongoose.Schema({
    question: { type: "string", required: true },
    email: { type: 'string', required: true },

});
const discussionSchema = new mongoose.Schema({
    question: { type: "string", required: true },
    email: { type: 'string', required: true },
    comment: [commentSchema]
});


const Discussion = mongoose.models.Meditation || mongoose.model("Discussion", discussionSchema);
export default Discussion;
