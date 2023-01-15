// get all meeting
import { NextApiRequest, NextApiResponse } from "next";
import { meetingController } from "@/backends/controllers/meeting.controller";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") return meetingController.getAllMeeting(req, res);
  else
    return res.status(400).json({
      message: "METHOD NOT ALLOWED",
    });
}
