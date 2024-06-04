import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  age: { type: Number, required: true },
  role: { type: String, required: true, default: "user" },
  image: { type: String, default: "" },
  price: { type: String, default: "0", required: true },
  nmcNumber: { type: String, default: "", required: false },
});

userSchema.methods.matchPassword = async function (password: string) {
  var user = await User.findOne({ email: this.email }).select("password");
  const isValidPassword = await bcrypt.compare(password, user.password);
  return isValidPassword;
};
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
