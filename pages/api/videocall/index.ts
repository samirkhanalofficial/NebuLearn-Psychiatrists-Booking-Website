import { authService } from "@/backends/services/auth.service";
import { meetingService } from "@/backends/services/meeting.service";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const videoCallValidation = Joi.object({
    id: Joi.string().max(500).min(8).required(),
  });
  if (req.method == "POST") {
    const { error, value } = await videoCallValidation.validate(req.body);
    if (error)
      return res.status(400).json({
        message: error.message,
      });

    const payload = await authService.verifyToken(
      req.headers.authorization?.toString()!
    );
    if (!payload)
      return res.status(400).json({
        message: "Authentication Error",
      });
    const meeting = await meetingService.getMeetingById(value.id);
    if (!meeting)
      return res.status(400).json({
        message: "No Meeting Found",
      });
    const myId = await payload.id;
    const partnerId = meeting.client == myId ? meeting.doctor : meeting.client;
    return res.json({
      partnerId,
      myId,
      meetingId: value.id,
      meeting,
      role:meeting.client == myId ? "client" : "doctor"
    });
  } else
    return res.status(400).json({
      message: "METHOD NOT ALLOWED",
    });
}
