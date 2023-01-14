import { NextApiRequest, NextApiResponse } from "next";
import { userService, UserService } from "../services/user.service";
import mongooseService from "../services/mongoose.service";
import Joi from "joi";
import { authService, AuthService } from "../services/auth.service";

const AddUserValidation = Joi.object({
  email: Joi.string().email().min(3).max(255).required(),
  password: Joi.string().min(8).required(),
});

class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    mongooseService;
  }

  login = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { error, value } = AddUserValidation.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });
      const user = await this.userService.getUserByEmail(value.email);
      if (!user)
        return res.status(400).json({ message: "Invalid email or password" });
      const isPasswordCorrect = await user.matchPassword(value.password);
      if (!isPasswordCorrect)
        return res.status(400).json({ message: "Invalid email or password" });
      const roleVal = await this.userService.getRole(value.email);
      const role = roleVal.role;
      if (role != "user") {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      const token = await this.authService.generateToken(user);
      if (!token)
        return res.status(400).json({ message: "Error generating token" });

      res.json({
        token,
      });
    } catch (e) {
      res.status(400).json({ message: "problem occured" + e });
    }
  };
  PsychiatristsLogin = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { error, value } = AddUserValidation.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });
      const user = await this.userService.getUserByEmail(value.email);
      if (!user)
        return res.status(400).json({ message: "Invalid email or password" });
      const isPasswordCorrect = await user.matchPassword(value.password);
      if (!isPasswordCorrect)
        return res.status(400).json({ message: "Invalid email or password" });
      const roleVal = await this.userService.getRole(value.email);
      const role = roleVal.role;
      if (role != "psychiatrists") {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      const token = await this.authService.generateToken(user);
      if (!token)
        return res.status(400).json({ message: "Error generating token" });

      res.json({
        token,
      });
    } catch (e) {
      res.status(400).json({ message: "problem occured" + e });
    }
  };
  adminLogin = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { error, value } = AddUserValidation.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });
      const user = await this.userService.getUserByEmail(value.email);
      if (!user)
        return res.status(400).json({ message: "Invalid email or password" });
      const isPasswordCorrect = await user.matchPassword(value.password);
      if (!isPasswordCorrect)
        return res.status(400).json({ message: "Invalid email or password" });
      const roleVal = await this.userService.getRole(value.email);
      const role = roleVal.role;
      if (role != "admin") {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      const token = await this.authService.generateToken(user);
      if (!token)
        return res.status(400).json({ message: "Error generating token" });

      res.json({
        token,
      });
    } catch (e) {
      res.status(400).json({ message: "problem occured" + e });
    }
  };
}

export const authController = new AuthController(userService, authService);
