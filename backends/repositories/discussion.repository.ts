import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Discussion from "../models/discussion.model";
import { questionType } from "../types/question.type";
class DiscussionRepository {
    constructor() { }

    addQue = async (que: questionType) => {
        const queData = new Discussion(que);
        await queData.save();
        return queData;
    };

    getDiscussionById = async (id: string) => {
        const discussion = await Discussion.findById(id);
        return discussion;

    }
    deleteDiscussionById = async (id: string) => {
        const discussion = await Discussion.findByIdAndDelete(id);
        return discussion;

    }
    getAllDiscussion = async () => {
        const discussions = await Discussion.find({ limit: 20 });
        return discussions;

    }


}
let discussionRepository = new DiscussionRepository();

export { discussionRepository, DiscussionRepository };
