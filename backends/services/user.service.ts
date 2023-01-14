import { NextApiRequest, NextApiResponse } from "next";
import { userType } from "../types/user.type";
import {
  userRepository,
  UserRepository,
} from "../repositories/user.repository";

class UserService {
  constructor(private userRepository: UserRepository) {}

  addUser = async (user: userType) => {
    const userData = await this.userRepository.addUser(user);
    return userData;
  };
  getUserById = async (id: string) => {
    const user = await this.userRepository.getUserById(id);
    return user;
  };
  getUserByEmail = async (email: string) => {
    const user = await this.userRepository.getUserByEmail(email);
    return user;
  };
}

let userService = new UserService(userRepository);

export { userService, UserService };
