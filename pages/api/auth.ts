import { NextApiRequest, NextApiResponse } from "next";
import { authController } from "../../backends/controllers/auth.controller";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") return authController.login(req, res);
  else
    return res.status(400).json({
      message: "METHOD NOT ALLOWED",
    });
}
