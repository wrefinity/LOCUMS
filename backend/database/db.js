import mongoose, { mongo } from "mongoose";
import User from "../model/Users.js";
import dotenv from "dotenv";
dotenv.config();

let Mongo = "";
{
  process.env.isProduction == "true"
    ? (Mongo = process.env.mongoURLProduction)
    : (Mongo = process.env.MONGO_URI);
}

export default async () => {
  await mongoose
    .connect(Mongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async (res) => {
      console.log("database connected");
      const admin = await User.findOne({ role: "admin" });
      if (!admin) {
        await User.create({
          fullname: process.env.FULL_NAME,
          email: process.env.ADMIN_EMAIL,
          role: process.env.ADMIN_ROLE,
          username: process.env.FULL_NAME,
          password: process.env.ADMIN_PASSWORD,
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

mongoose.set("strictQuery", false);
