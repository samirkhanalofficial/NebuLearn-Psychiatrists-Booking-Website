import { Rating } from "../models/ratings.model";
import { ratingRepository } from "../repositories/rating.repository";
import { createRatingType } from "../types/rating.type";

class RatingService {
  constructor() {}
  addRating = async (rating: createRatingType) => {
    return ratingRepository.addRating(rating);
  };
  updateRating = async (id: string, rating: createRatingType) => {
    return ratingRepository.updateRating(id, rating);
  };
  hasAlreadyRated = async (doctor: string, client: string) => {
    return ratingRepository.hasAlreadyRated(doctor, client);
  };
  getRatings = async (doctor: string) => {
    return ratingRepository.getRatings(doctor);
  };
}
const ratingService = new RatingService();
export { RatingService, ratingService };
