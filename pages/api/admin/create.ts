import { NextApiRequest, NextApiResponse } from "next";
import { userController } from "@/backends/controllers/user.controller";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") return userController.addAdmin(req, res);
  else
    return res.status(400).json({
      message: "METHOD NOT ALLOWED",
    });
}
