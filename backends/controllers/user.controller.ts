import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import mongooseService from "../services/mongoose.service";
import { UserService, userService } from "../services/user.service";
import { userType } from "../types/user.type";
import bcrypt from "bcrypt";

// Define the password validation schema

const AddUserValidation = Joi.object({
  fullName: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().min(3).max(255).required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  age: Joi.number().min(15).max(99).required(),
});

class UserController {
  constructor(private userService: UserService) {
    mongooseService;
  }

  addUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { error, value } = AddUserValidation.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });

      bcrypt.hash(
        req.body.password,
        parseInt(process.env.SALT_ROUNDS!),
        async (err: any, hash: any) => {
          if (err) return res.status(400).json({ message: err.message });
          const newData: userType = {
            fullName: value.fullName,
            email: value.email,
            password: hash,
            age: value.age,
          };
          console.log(value.email);

          const userExists = await this.userService.getUserByEmail(value.email);
          if (userExists)
            return res.status(400).json({
              message:
                "This email has been already registered. Please login or try forget password.",
            });
          const user = await this.userService.addUser(newData);
          if (!user)
            return res.status(400).json({ message: "error creating user" });

          const userData = await this.userService.getUserById(user.id);
          res.json(userData);
        }
      );
    } catch (e) {
      res.status(400).json({ message: "some problems occured" });
    }
  };
  addPsychiatrists = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { error, value } = AddUserValidation.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });

      bcrypt.hash(
        req.body.password,
        parseInt(process.env.SALT_ROUNDS!),
        async (err: any, hash: any) => {
          if (err) return res.status(400).json({ message: err.message });
          const newData: userType = {
            fullName: value.fullName,
            email: value.email,
            password: hash,
            age: value.age,
          };
          console.log(value.email);

          const userExists = await this.userService.getUserByEmail(value.email);
          if (userExists)
            return res.status(400).json({
              message:
                "This email has been already registered. Please login or try forget password.",
            });
          const user = await this.userService.addUser(newData, "psychiatrists");
          if (!user)
            return res.status(400).json({ message: "error creating user" });

          const userData = await this.userService.getUserById(user.id);
          res.json(userData);
        }
      );
    } catch (e) {
      res.status(400).json({ message: "some problems occured" });
    }
  };
  addAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { error, value } = AddUserValidation.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });

      bcrypt.hash(
        req.body.password,
        parseInt(process.env.SALT_ROUNDS!),
        async (err: any, hash: any) => {
          if (err) return res.status(400).json({ message: err.message });
          const newData: userType = {
            fullName: value.fullName,
            email: value.email,
            password: hash,
            age: value.age,
          };
          console.log(value.email);

          const userExists = await this.userService.getUserByEmail(value.email);
          if (userExists)
            return res.status(400).json({
              message:
                "This email has been already registered. Please login or try forget password.",
            });
          const user = await this.userService.addUser(newData, "admin");
          if (!user)
            return res.status(400).json({ message: "error creating user" });

          const userData = await this.userService.getUserById(user.id);
          res.json(userData);
        }
      );
    } catch (e) {
      res.status(400).json({ message: "some problems occured" });
    }
  };
}

export const userController = new UserController(userService);
