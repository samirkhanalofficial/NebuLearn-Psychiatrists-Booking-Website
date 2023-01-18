import { NextApiRequest, NextApiResponse } from "next";
import { userType } from "../types/user.type";
import {
  userRepository,
  UserRepository,
} from "../repositories/user.repository";
import Joi from "joi";

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
  addPsychiatristsImage = async (req: NextApiRequest, res: NextApiResponse) => {
    const addPsychiatristsImageValidation = Joi.object({
      image: Joi.string().required().min(5),
    });
    const id = req.query.psychiatristsId;
    if (!id)
      return res.status(400).json({ message: "psychiatristsId is required" });
    const { error, value } = addPsychiatristsImageValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const product = await this.userRepository.addPsychiatristsImage(
      id?.toString()!,
      value.image
    );
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
