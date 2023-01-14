import User from "../models/user.model";
import { userType } from "../types/user.type";

class UserRepository {
  constructor() {}

  addUser = async (user: userType) => {
    const userData = new User(user);
    await userData.save();
    return userData;
  };
  getUserById = async (id: string) => {
    const user = await User.findById(id);
    return user;
  };
  getUserByEmail = async (email: string) => {
    const user = await User.findOne({ email });
    return user;
  };
}
let userRepository = new UserRepository();

export { UserRepository, userRepository };