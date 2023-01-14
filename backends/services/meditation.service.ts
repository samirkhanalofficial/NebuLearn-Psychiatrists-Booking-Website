import { NextApiRequest, NextApiResponse } from "next";
import { meditationType } from "../types/meditation.type";
import {
  MeditationRepository,
  meditationRepository,
} from "../repositories/meditation.repository";
import { userRepository } from "../repositories/user.repository";

class MeditationService {
  constructor(private meditationRepository: MeditationRepository) {}

  addMed = async (med: meditationType) => {
    const medList = await this.meditationRepository.addMeds(med);
    return medList;
  };

  deleteMed = async (id: string) => {
    await this.meditationRepository.deleteMeds(id);
  };

  getList = async () => {
    const list = await this.meditationRepository.getList();
    return list;
  };
}

let meditationService = new MeditationService(meditationRepository);

export { meditationService, MeditationService };
