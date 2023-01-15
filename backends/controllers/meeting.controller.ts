import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import { authService, AuthService } from "../services/auth.service";
import { meetingService, MeetingService } from "../services/meeting.service";
import { userService, UserService } from "../services/user.service";
const addMeetingValidation = Joi.object({
  doctor: Joi.string().required(),
  date: Joi.string().required(),
  time: Joi.string().required(),
});
class MeetingController {
  constructor(
    private readonly meetingService: MeetingService,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}
  addMeeting = async (req: NextApiRequest, res: NextApiResponse) => {
    const { error, value } = await addMeetingValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const payload = await this.authService.verifyToken(
      req.headers.authorization!
    );
    if (!payload) {
      return res.status(400).json({ message: "Login error" });
    }
    const user = await this.userService.getUserByEmail(payload.email);
    // Sun Jan 15 2023 06:49:23 GMT+0545 (Nepal Time)'
    const meeting = await this.meetingService.addMeeting({
      clientAge: user.age,
      time: value.time,
      date: value.date,
      price: 400,
      client: payload.id,
      doctor: value.doctor,
    });
    if (!meeting)
      return res.status(400).json({ message: "Error adding meeting" });
    res.status(200).json(meeting);
  };

  verifyMeeting = async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = await this.authService.verifyToken(
      req.headers.authorization!
    );
    if (!payload) {
      return res.status(400).json({ message: "Login error" });
    }
    if (!req.query.meetingId) {
      return res.status(400).json({ message: "meetingId Required" });
    }
    if (payload.role != "admin") {
      return res.status(400).json({ message: "Permission Denied" });
    }
    const meeting = await this.meetingService.verifyMeeting(
      req.query?.meetingId.toString()!
    );
    if (!meeting)
      return res.status(400).json({ message: "Error verifying meeting" });
    res.status(200).json(meeting);
  };
  getAllMeeting = async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = await this.authService.verifyToken(
      req.headers.authorization!
    );
    if (!payload) {
      return res.status(400).json({ message: "Login error" });
    }
    if (payload.role != "admin") {
      return res.status(400).json({ message: "Permission Denied" });
    }
    const meetings = await this.meetingService.getAllMeeting();
    if (!meetings)
      return res.status(400).json({ message: "Error getting meetings" });
    res.status(200).json(meetings);
  };
  getClientMeetings = async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = await this.authService.verifyToken(
      req.headers.authorization!
    );
    if (!payload) {
      return res.status(400).json({ message: "Login error" });
    }
    if (payload.role != "user") {
      return res.status(400).json({ message: "Permission Denied" });
    }
    const meetings = await this.meetingService.getClientMeetings(payload.id);
    if (!meetings)
      return res.status(400).json({ message: "Error getting meetings" });
    res.status(200).json(meetings);
  };
  getDoctorMeetings = async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = await this.authService.verifyToken(
      req.headers.authorization!
    );
    if (!payload) {
      return res.status(400).json({ message: "Login error" });
    }
    console.log(payload);
    if (payload.role != "psychiatrists") {
      return res.status(400).json({ message: "Permission Denied" });
    }
    const meetings = await this.meetingService.getDoctorMeetings(payload.id);
    if (!meetings)
      return res.status(400).json({ message: "Error getting meetings" });
    res.status(200).json(meetings);
  };
  addMedicine = async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = await this.authService.verifyToken(
      req.headers.authorization!
    );
    if (!payload) {
      return res.status(400).json({ message: "Login error" });
    }
    if (payload.role != "psychiatrists") {
      return res.status(400).json({ message: "Permission Denied" });
    }
    if (!req.body.medicine) {
      return res.status(400).json({ message: "Medicine Name Required" });
    }
    if (!req.query.meetingId) {
      return res.status(400).json({ message: "meetingId Required" });
    }
    const meeting = await this.meetingService.getMeetingById(
      req.query?.meetingId!.toString()
    );
    if (!meeting) return res.status(400).json({ message: "meeting not found" });
    if (meeting.doctor != payload.id)
      return res.status(400).json({ message: "Invalid Permission" });
    const medicine = await this.meetingService.addMedicine(
      req.query.meetingId.toString(),
      req.body.medicine
    );
    res.status(200).json(medicine);
  };
  getMeetingById = async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = await this.authService.verifyToken(
      req.headers.authorization!
    );
    if (!payload) {
      return res.status(400).json({ message: "Login error" });
    }
    if (!req.query.meetingId) {
      return res.status(400).json({ message: "meetingId Required" });
    }
    const meeting = await this.meetingService.getMeetingById(
      req.query?.meetingId!.toString()
    );
    if (!meeting) return res.status(400).json({ message: "meeting not found" });
    if (meeting.doctor != payload.id && meeting.client != payload.id)
      return res.status(400).json({ message: "Invalid Permission" });
    res.status(200).json(meeting);
  };
  deleteMedicine = async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = await this.authService.verifyToken(
      req.headers.authorization!
    );
    if (!payload) {
      return res.status(400).json({ message: "Login error" });
    }
    if (payload.role != "psychiatrists") {
      return res.status(400).json({ message: "Permission Denied" });
    }
    if (!req.body.medicine) {
      return res.status(400).json({ message: "Medicine Name Required" });
    }
    if (!req.query.meetingId) {
      return res.status(400).json({ message: "meetingId Required" });
    }
    const meeting = await this.meetingService.getMeetingById(
      req.query?.meetingId!.toString()
    );
    if (!meeting) return res.status(400).json({ message: "meeting not found" });
    if (meeting.doctor != payload.id)
      return res.status(400).json({ message: "Invalid Permission" });
    const medicine = await this.meetingService.deleteMedicine(
      req.query.meetingId.toString(),
      req.body.medicine
    );
    res.status(200).json(medicine);
  };
}
const meetingController = new MeetingController(
  meetingService,
  authService,
  userService
);
export { MeetingController, meetingController };
