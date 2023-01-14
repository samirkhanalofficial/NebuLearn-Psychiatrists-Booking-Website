import User from "../models/user.model";
import { userType } from "../types/user.type";

class UserRepository {
  constructor() {}

  addUser = async (user: userType, role?: string) => {
    if (!role) {
      const userData = new User(user);
      await userData.save();
      return userData;
    } else {
      const userData = new User({ ...user, role });
      await userData.save();
      return userData;
    }
  };
  getUserById = async (id: string) => {
    const user = await User.findById(id);
    return user;
  };
  getUserByEmail = async (email: string) => {
    const user = await User.findOne({ email });
    return user;
  };
  getRole = async (email: string) => {
    const user = await User.findOne({ email }).select("role");
    return user;
  };
  addPsychiatristsImage = async (id: string, image: string) => {
    const psychiatrists = await User.findById(id);
    if (!psychiatrists) return null;
    if (psychiatrists.role != "psychiatrists") return null;
    await User.findByIdAndUpdate(id, { image });
    return psychiatrists;
  };
  getList = async (role: string) => {
    const user = await User.find({ role });
    return user;
  };
  deleteUser = async (id: string) => {
    await User.findOneAndDelete({ _id: id });
  };
}
let userRepository = new UserRepository();

export { UserRepository, userRepository };
