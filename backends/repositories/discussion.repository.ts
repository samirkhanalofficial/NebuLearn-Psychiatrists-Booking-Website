import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Discussion from "../models/discussion.model";
import { questionType } from "../types/question.type";
import { commentType } from "../types/comment.type";

class DiscussionRepository {
  constructor() {}

  addQue = async (que: questionType) => {
    const queData = new Discussion(que);
    await queData.save();
    return queData;
  };

  getDiscussionById = async (id: string) => {
    const discussion = await Discussion.findById(id);
    return discussion;
  };
  deleteDiscussionById = async (id: string) => {
    const discussion = await Discussion.findByIdAndDelete(id);
    return discussion;
  };
  getAllDiscussion = async () => {
    const discussions = await Discussion.find();
    return discussions;
  };
  addComment = async (email: string, id: string, comm: string) => {
    const oldDiscussions = await Discussion.findById(id);
    const update = await Discussion.findByIdAndUpdate(id, {
      comment: [...oldDiscussions.comment, { reply: comm, email }],
    });
    return update;
  };
  deleteComment = async (id: string, commentId: string) => {
    const oldDiscussions = await Discussion.findById(id);
    const newComments = await oldDiscussions.comment.filter(
      (c: any) => c.id != commentId
    );
    const update = await Discussion.findByIdAndUpdate(id, {
      comment: [...newComments],
    });
    return update;
  };
}
let discussionRepository = new DiscussionRepository();

export { discussionRepository, DiscussionRepository };
