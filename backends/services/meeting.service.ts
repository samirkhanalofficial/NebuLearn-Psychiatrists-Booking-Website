import {
  meetingRepository,
  MeetingRepository,
} from "../repositories/meeting.repository";
import { MeetingType } from "../types/meeting.type";

class MeetingService {
  constructor(private readonly meetingRepository: MeetingRepository) {}
  addMeeting = async (meeting: MeetingType) => {
    const meetingData = await this.meetingRepository.addMeeting(meeting);
    return meetingData;
  };
  verifyMeeting = async (id: string) => {
    const meeting = await this.meetingRepository.verifyMeeting(id);
    return meeting;
  };
  getAllMeeting = async () => {
    const meeting = await this.meetingRepository.getAllMeeting();
    return meeting;
  };
  getMeetingById = async (id: string) => {
    const meeting = await this.meetingRepository.getMeetingById(id);
    return meeting;
  };
  getClientMeetings = async (id: string) => {
    const meetings = await this.meetingRepository.getClientMeetings(id);
    return meetings;
  };
  getDoctorMeetings = async (id: string) => {
    const meetings = await this.meetingRepository.getDoctorMeetings(id);
    return meetings;
  };
  addMedicine = async (id: string, medicine: string) => {
    const meetings = await this.meetingRepository.addMedicine(id, medicine);
    return meetings;
  };
  deleteMedicine = async (id: string, medicine: string) => {
    const meetings = await this.meetingRepository.deleteMedicine(id, medicine);
    return meetings;
  };
}
const meetingService = new MeetingService(meetingRepository);
export { MeetingService, meetingService };
