import { userType } from "./user.type";

export type RatingType = {
  doctor: userType;
  client: userType;
  rating: number;
  message: string;
};
export type createRatingType = {
  doctor: string;
  client: string;
  rating: number;
  message?: string;
};
