import { NextApiRequest, NextApiResponse } from "next";
import { discussionController } from "@/backends/controllers/discussion.controller";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "DELETE")
    return discussionController.deleteComment(req, res);
  else
    return res.status(400).json({
      message: "METHOD NOT ALLOWED",
    });
}
