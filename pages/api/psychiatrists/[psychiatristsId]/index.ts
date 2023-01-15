import { userController } from "@/backends/controllers/user.controller";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") return userController.getPsychiatrists(req, res);
  else
    return res.status(400).json({
      message: "METHOD NOT ALLOWED",
    });
}
