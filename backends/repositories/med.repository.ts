import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import Medicine from '../models/med.model';
import { medType } from '../types/med.type';

class MedRepository {
    constructor() {}

    addMeds = async (med: medType) => {
        const medList = new Medicine(med);
        await medList.save();
        return medList;
    };
}
let medRepository = new MedRepository();

export { medRepository, MedRepository };