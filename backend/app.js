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
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "UPDATE"],
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/public", express.static("./public"));
app.use(cookieParser(process.env.JWT_SECRET));
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Irish Locums API",
      description:
        "This is the server for the Irish Locums endpoints. This is strictly for development purposes.",
      contact: {
        name: "Hanis Hapsa, Ishak",
        url: "http://www.rougepay.com/support",
        email: "hapsahanis.hh@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5002/",
        description: "Development server",
      },
      {
        url: "https://rougapay.com/api",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "apiKey",
          name: "Authorization",
          scheme: "bearer",
          in: "header",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    host: "localhost:5000",
    basePath: "/",
    schemes: ["http", "https"],
  },
  apis: ["./Router/*.js", "./*.yaml"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

const PORT = process.env.PORT || 5002;
app.listen(PORT, console.log(`server running on port ${PORT}`));
