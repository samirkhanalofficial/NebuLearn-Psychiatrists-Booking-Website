import { NextApiRequest, NextApiResponse } from "next";
import mongooseService from "./mongoose.service";
import { UserService, userService } from "./user.service";
import jwt from "jsonwebtoken";
import { payloadType } from "../types/payload.type";

class AuthService {
  constructor(private userService: UserService) {
    mongooseService;
  }
  generateToken = async (user: any) => {
    const payload: payloadType = {
      id: user.id,
      email: user.email,
      loginAt: Date(),
      role:user.role,
    };
    const token = await jwt.sign(payload, process.env.JWT_KEY!, {
      expiresIn: 360000,
    });
    return token;
  };
  verifyToken = async (token: string) => {
    try {
      const payload = await jwt.verify(token, process.env.JWT_KEY!);

      return payload as payloadType;
    } catch (e) {
      console.log("e:", e);
      return null;
    }
  };
}
let authService = new AuthService(userService);
export { authService, AuthService };
