import { Rating } from "../models/ratings.model";
import { createRatingType } from "../types/rating.type";

class RatingRepository {
  constructor() {}
  addRating = async (rating: createRatingType) => {
    const ratingData = new Rating(rating);
    await ratingData.save();
    return ratingData;
  };
  updateRating = async (id: string, rating: createRatingType) => {
    const ratingData = Rating.findByIdAndUpdate(id, rating);
    return ratingData;
  };
  hasAlreadyRated = async (doctor: string, client: string) => {
    const ratingData = await Rating.findOne({
      doctor,
      client,
    });
    return ratingData;
  };
  getRatings = async (doctor: string) => {
    const ratings = await Rating.find({
      doctor,
    });
    return ratings;
  };
}
const ratingRepository = new RatingRepository();
export { RatingRepository, ratingRepository };
