import { NextApiRequest, NextApiResponse } from "next";
import mongooseService from "./mongoose.service";

class DiscussionService {
  constructor() {
    mongooseService;
  }
  addQuestion = async () => {
    // const medList = await this.meditationRepository.addMeds(med);
    // return medList;
  };
}
let discussionService = new DiscussionService();
export { discussionService, DiscussionService };
