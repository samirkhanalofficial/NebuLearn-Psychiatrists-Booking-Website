import { NextApiRequest, NextApiResponse } from 'next';
import { medType } from '../types/med.type';
import { MedRepository,medRepository } from '../repositories/med.repository';
import { userRepository } from '../repositories/user.repository';

class MedService {
    constructor(private medRepository: MedRepository) {}

    addMed = async (med: medType) => {
        const medList = await this.medRepository.addMeds(med);
        return medList;
    };
    deleteTodo = async () => {
        
    };
  
}

let medService = new MedService(medRepository);

export { medService, MedService };