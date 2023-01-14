import { NextApiRequest, NextApiResponse } from "next";
import mongooseService from "./mongoose.service";

class DiscussionService {
  constructor() {
    mongooseService;
  }
}
let discussionService = new DiscussionService();
export { discussionService, DiscussionService };
