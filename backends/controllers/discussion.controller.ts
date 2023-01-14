import { NextApiRequest, NextApiResponse } from "next";
import mongooseService from "../services/mongoose.service";
import Joi from "joi";
import {
  discussionService,
  DiscussionService,
} from "../services/discussion.service";

const AddQueValidation = Joi.object({
  question: Joi.string().min(10).max(255).required(),
});
class DiscussionController {
  constructor(private discussionService: DiscussionService) {
    mongooseService;
  }
  addQue = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
    } catch (e) {
      res.status(400).json({ message: "some problems occured" });
    }
  };
}
export const discussionController = new DiscussionController(discussionService);
