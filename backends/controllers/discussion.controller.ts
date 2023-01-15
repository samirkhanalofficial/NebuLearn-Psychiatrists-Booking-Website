import { NextApiRequest, NextApiResponse } from "next";
import mongooseService from "../services/mongoose.service";
import Joi, { string } from "joi";
import { questionType } from "../types/question.type";
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

      const updatedValue: questionType = { question: value.question, email: verified!.email }
      const disQuestion = await this.discussionService.addQuestion(updatedValue);
      res.json(disQuestion);
    }
    catch (err) {
      res.json({
        message: err,
      });
    }

  }

  deleteDiscussion = async (req: NextApiRequest, res: NextApiResponse) => {

    console.log("reaached herer");
    try {
      const token = req.headers.authorization;

      if (!token) { res.json({ message: "No Token" }) }
      const payload = (await this.authService.verifyToken(token!))!;
      if (!payload) { return res.status(400).json({ message: "Wrong Token" }) }
      if (!req.query.id) { return res.status(400).json({ message: "No Queries found" }) }
      const discussion = await this.discussionService.getDiscussionById(req.query?.id!.toString());
      if (!discussion) { return res.status(400).json({ message: "No discussion Found" }) }
      if (discussion.email != payload.email) { return res.status(400).json({ message: "No permission" }); }

      const newDiscussion = await this.discussionService.deleteDiscussionById(req.query?.id!.toString());
      return res.status(200).json(newDiscussion);
    } catch (e) {
      res.json({
        message: e
      })
    }






  }

}

export const discussionController = new DiscussionController(discussionService, authService);
