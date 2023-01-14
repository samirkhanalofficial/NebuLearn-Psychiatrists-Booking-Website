import { NextApiRequest, NextApiResponse } from "next";
import { meditationController } from "@/backends/controllers/meditation.controller";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") return meditationController.addMeditation(req, res);
    else
        return res.status(400).json({
            message: "METHOD NOT ALLOWED",
        });
}
