import { MeetingType } from "../types/meeting.type";
import { Meeting } from "@/backends/models/meeting.model";
class MeetingRepository {
  constructor() {}
  addMeeting = async (meeting: MeetingType) => {
    const meetingData = new Meeting(meeting);
    await meetingData.save();
    return meetingData;
  };
  verifyMeeting = async (id: string) => {
    const meeting = await Meeting.findByIdAndUpdate(id, { paid: true });
    return meeting;
  };
  getAllMeeting = async () => {
    const meeting = await Meeting.find({ paid: false });
    return meeting;
  };
  getMeetingById = async (id: string) => {
    const meeting = await Meeting.findById(id);
    return meeting;
  };
  getClientMeetings = async (id: string) => {
    const meetings = await Meeting.find({ client: id });
    return meetings;
  };
  getDoctorMeetings = async (id: string) => {
    const meetings = await Meeting.find({ doctor: id });
    return meetings;
  };
  addMedicine = async (id: string, medicine: string) => {
    const meetings = await Meeting.findById(id);
    const newMeetings = await Meeting.findByIdAndUpdate(id, {
      medicines: [...meetings.medicines, medicine],
    });
    return newMeetings;
  };
  deleteMedicine = async (id: string, medicine: string) => {
    const meeting = await Meeting.findById(id);
    const newMeeting = await Meeting.findByIdAndUpdate(id, {
      medicines: meeting.medicines.filter((m: any) => m != medicine),
    });
    return newMeeting;
  };
}
const meetingRepository = new MeetingRepository();
export { MeetingRepository, meetingRepository };
