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

const AddCommentValidation = Joi.object({
  comment: Joi.string().min(10).max(255).required(),
});
class DiscussionController {
  constructor(
    private discussionService: DiscussionService,
    private authService: AuthService
  ) {
    mongooseService;
  }
  addQue = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        res.status(400).json({ message: "Invalid token" });
      }
      const verified = await this.authService.verifyToken(token!);
      const { error, value } = AddQueValidation.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });
      if (!verified) return res.status(400).json({ message: "faulty token" });

      const updatedValue: questionType = {
        question: value.question,
        email: verified!.email,
      };
      const disQuestion = await this.discussionService.addQuestion(
        updatedValue
      );
      res.json(disQuestion);
    } catch (err) {
      return res.status(400).json({
        message: err,
      });
    }
  };

  deleteDiscussion = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("reaached herer");
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(400).json({ message: "No Token" });
      }
      const payload = (await this.authService.verifyToken(token!))!;
      if (!payload) {
        return res.status(400).json({ message: "Wrong Token" });
      }
      if (!req.query.id) {
        return res.status(400).json({ message: "No Queries found" });
      }
      const discussion = await this.discussionService.getDiscussionById(
        req.query?.id!.toString()
      );
      if (!discussion) {
        return res.status(400).json({ message: "No discussion Found" });
      }
      if (discussion.email != payload.email) {
        return res.status(400).json({ message: "No permission" });
      }

      const newDiscussion = await this.discussionService.deleteDiscussionById(
        req.query?.id!.toString()
      );
      return res.status(200).json(newDiscussion);
    } catch (e) {
      res.status(400).json({
        message: e,
      });
    }
  };
  getAllDiscussion = async (req: NextApiRequest, res: NextApiResponse) => {
    const discussions = await this.discussionService.getAllDiscussion();
    return res.json(discussions);
  };
  getDiscussionById = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.query.postid)
      return res.status(400).json({ message: "discussion id is required" });
    const discussions = await this.discussionService.getDiscussionById(
      req.query?.postid!.toString()
    );
    return res.json(discussions);
  };
  addComment = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // const { error, value } = AddQueValidation.validate(req.body);
      const token = req.headers.authorization;

      if (!token) {
        res.status(400).json({ message: "Invalid token" });
      }
      const payload = await this.authService.verifyToken(token!);
      const { error, value } = AddCommentValidation.validate(req.body);
      if (error) return res.status(400).json({ message: "faulty token" });
      if (!payload) return res.status(400).json({ message: "faulty token" });
      const id = req.query.postid!.toString();
      const addComment = await this.discussionService.addComment(
        payload.email,
        id,
        value.comment
      );
      res.json(addComment);
    } catch (err) {
      return res.status(400).json({
        message: err,
      });
    }
  };

  deleteComment = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // const { error, value } = AddQueValidation.validate(req.body);
      const token = req.headers.authorization;

      if (!token) {
        return res.status(400).json({ message: "Invalid token" });
      }
      const payload = await this.authService.verifyToken(token!);
      if (!payload) return res.json({ message: "faulty token" });
      const discId = req.query?.postid!.toString();
      const commentId = req.query.commentid!.toString();
      const deleteComment = await this.discussionService.deleteComment(
        discId,
        commentId
      );
      return res.json(deleteComment);
    } catch (err) {
      return res.status(400).json({
        message: err,
      });
    }
  };
}

export const discussionController = new DiscussionController(
  discussionService,
  authService
);
