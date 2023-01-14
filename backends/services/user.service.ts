import { NextApiRequest, NextApiResponse } from "next";
import { userType } from "../types/user.type";
import {
  userRepository,
  UserRepository,
} from "../repositories/user.repository";

class UserService {
  constructor(private userRepository: UserRepository) {}

  addUser = async (user: userType, role?: string) => {
    const userData = await this.userRepository.addUser(user, role);
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
  getRole = async (email: string) => {
    const user = await this.userRepository.getRole(email);
    return user;
  };
  addPsychiatristsImage = async (id: string, image: string) => {
    const product = await this.userRepository.addPsychiatristsImage(id, image);
    return product;
  };
  getList = async (role: string) => {
    const list = await this.userRepository.getList(role);
    return list;
  };
  deleteUser = async (id: string) => {
    await this.userRepository.deleteUser(id);
  };
}

let userService = new UserService(userRepository);

export { userService, UserService };
