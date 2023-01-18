import { userService } from "@/backends/services/user.service";
import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") return userService.addPsychiatristsImage(req, res);
  else res.status(400).json("METHOD NOT ALLOWED");
}

export default handler;
