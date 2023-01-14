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
}
let userRepository = new UserRepository();

export { UserRepository, userRepository };
