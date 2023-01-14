import mongoose from "mongoose";

class MongooseService {
  constructor() {
    mongoose.connect(process.env.MONGO_URL!, () => {
      console.log("database connected");
    });
    mongoose.set("strictQuery", false);
  }
}
const mongooseService = new MongooseService();
export default mongooseService;