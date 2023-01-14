import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import mongooseService from "../services/mongoose.service";
import { UserService, userService } from "../services/user.service";
import { userType } from "../types/user.type";
import bcrypt from "bcrypt";
import { AuthService, authService } from "../services/auth.service";

// Define the password validation schema

const AddUserValidation = Joi.object({
  fullName: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().min(3).max(255).required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  age: Joi.number().min(15).max(99).required(),
});

class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
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

  getList = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization;
      if (!token) res.json({ message: "Please log in first" });
      const verified = await this.authService.verifyToken(token!);
      if (!verified) res.json({ message: "not the valid user" });
      const role = verified!.role;
      const options = req.query.role;
      if ((options == "admin" || options == "user") && role != "admin") {
        return res.status(400).json({ message: "No permission" });
      }
      const getUser = await this.userService.getList(options!.toString());
      return res.status(200).json(getUser);
    } catch (e) {
      res.status(400).json({ message: "some problems occured" });
    }
  };

  deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        res.json({ message: "Please Login first" });
      }
      const verified = await this.authService.verifyToken(token!);
      if (!verified) {
        res.json({ message: "user not verified" });
      }
      const role = verified!.role;
      if (role == "admin") {
        if (!req.query.id) {
          return res.json({ message: "id needed" });
        } else {
          await this.userService.deleteUser(req.query.id.toString());
          res.json({ message: "success" });
        }
      } else {
        res.json({
          message: "you are not admin",
        });
      }
    } catch (e) {
      res.status(400).json({ message: e });
    }
  };
}

export const userController = new UserController(userService, authService);
