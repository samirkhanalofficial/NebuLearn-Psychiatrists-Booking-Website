import { NextApiRequest, NextApiResponse } from "next";
import mongooseService from "../services/mongoose.service";
import Joi from "joi";
import {
  discussionService,
  DiscussionService,
} from "../services/discussion.service";

import { AuthService, authService } from "../services/auth.service";

const AddQueValidation = Joi.object({
  question: Joi.string().min(10).max(255).required(),
});
class DiscussionController {

  constructor(private discussionService: DiscussionService, private authService: AuthService) {
    mongooseService;
  }
  addQue = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // const { error, value } = AddQueValidation.validate(req.body);
      const token = req.headers.authorization;

      if (!token) { res.json({ message: "Invalid token" }) }
      const verified = (await this.authService.verifyToken(token!));
      const { error, value } = AddQueValidation.validate(req.body);
      if (!verified) res.json({ message: "faulty token" })
      const disQuestion = await this.discussionService.addQuestion();
      res.json(disQuestion);
    }
    catch (err) {
      res.json({
        message: err,
      });
    }

  }
}

export const discussionController = new DiscussionController(discussionService, authService);
