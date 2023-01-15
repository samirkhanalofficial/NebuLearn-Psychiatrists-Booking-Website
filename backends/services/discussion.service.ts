import { NextApiRequest, NextApiResponse } from "next";
import mongooseService from "./mongoose.service";
import { DiscussionRepository, discussionRepository } from "../repositories/discussion.repository";
import { questionType } from "../types/question.type";

class DiscussionService {
  constructor(private discussionRepository: DiscussionRepository) {
    mongooseService;
  }
  addQuestion = async (ques: questionType) => {
    const quesData = await this.discussionRepository.addQue(ques);
    return quesData;
  };


  getDiscussionById = async (id: string) => {
    const discussion = await this.discussionRepository.getDiscussionById(id);
    return discussion;

  }
  deleteDiscussionById = async (id: string) => {
    const discussion = await this.discussionRepository.deleteDiscussionById(id);
    return discussion;

  }
  getAllDiscussion = async () => {
    const discussions = await this.discussionRepository.getAllDiscussion();
    return discussions;

  }
}
let discussionService = new DiscussionService(discussionRepository);
export { discussionService, DiscussionService };
