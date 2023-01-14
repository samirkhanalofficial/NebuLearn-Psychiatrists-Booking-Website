import { NextApiRequest, NextApiResponse } from "next";
import { meditationController } from "@/backends/controllers/meditation.controller";
import { userController } from "@/backends/controllers/user.controller";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "DELETE") return userController.deleteUser(req, res);
  else
    return res.status(400).json({
      message: "METHOD NOT ALLOWED",
    });
}
