import mongoose from "mongoose";
import User from "../model/Users.js";

export default async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
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
