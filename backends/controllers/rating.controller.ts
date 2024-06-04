import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import { authService } from "../services/auth.service";
import { userService } from "../services/user.service";
import { userType } from "../types/user.type";
import { ratingService } from "../services/rating.service";
const addRatingValidation = Joi.object({
  doctor: Joi.string().max(255).required(),
  rating: Joi.number().required(),
  message: Joi.string().max(999),
});
class RatingController {
  constructor() {}
  addRating = async (req: NextApiRequest, res: NextApiResponse) => {
    const { error, value } = await addRatingValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const payload = await authService.verifyToken(req.headers.authorization!);
    if (!payload) {
      return res.status(400).json({ message: "Login error" });
    }

    const doctor = await userService.getUserById(value.doctor);
    if (!doctor) return res.status(400).json({ message: "No doctor found." });
    const hasReviewedBefore = await ratingService.hasAlreadyRated(
      value.doctor,
      payload.id
    );
    var rating;
    if (hasReviewedBefore) {
      rating = await ratingService.updateRating(hasReviewedBefore._id, {
        ...value,
        client: payload.id,
      });
    } else {
      rating = await ratingService.addRating({
        ...value,
        client: payload.id,
      });
    }

    if (!rating)
      return res.status(400).json({ rating: "Error adding meeting" });

    res.status(200).json({ rating });
  };
  getRatings = async (req: NextApiRequest, res: NextApiResponse) => {
    const doctorId = req.query.id ?? "";
    const ratings = await ratingService.getRatings(doctorId.toString());
    return res.status(200).json(ratings);
  };
}
const ratingController = new RatingController();
export { RatingController, ratingController };
