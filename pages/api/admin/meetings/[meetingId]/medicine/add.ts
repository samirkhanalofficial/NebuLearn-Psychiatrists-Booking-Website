// add medicine
import { NextApiRequest, NextApiResponse } from "next";
import { meetingController } from "@/backends/controllers/meeting.controller";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") return meetingController.addMedicine(req, res);
  else
    return res.status(400).json({
      message: "METHOD NOT ALLOWED",
    });
}
