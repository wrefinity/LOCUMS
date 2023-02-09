import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// defined plugin
import dbConn from "./database/db.js";
import userRoute from "./Router/Users.js";
import branchRoute from "./Router/Branch.js";
import shiftRoute from "./Router/Shift.js";
import applyRoute from "./Router/Apply.js";
import jobsRoute from "./Router/Jobs.js";
import categoryRoute from "./Router/Categories.js";
// middleware error handler
import notFoundMiddleware from "./middleware/not_found.js";
import errorHandler from "./middleware/errorMiddleware.js";
const app = express();
dotenv.config();
app.set("trust proxy", 1);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "UPDATE"],
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/public", express.static("./public"));
app.use(cookieParser(process.env.JWT_SECRET));

dbConn();

//main routes for admin and users
app.use("/users", userRoute);
app.use("/applications", applyRoute);
app.use("/categories", categoryRoute);
app.use("/jobs", jobsRoute);
app.use("/shifts", shiftRoute);
app.use("/branches", branchRoute);

app.use(errorHandler);
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server running on port ${PORT}`));
