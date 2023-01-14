import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import Meditation from '../models/meditation.model';
import { meditationType } from '../types/meditation.type';

class MeditationRepository {
    constructor() { }

    addMeds = async (med: meditationType) => {
        const medList = new Meditation(med);
        await medList.save();
        return medList;
    };
}
let meditationRepository = new MeditationRepository();

export { meditationRepository, MeditationRepository };