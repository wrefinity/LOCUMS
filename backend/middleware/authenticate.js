import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/Users.js";
import CustomError from "../error/index.js";

export const checkUser = asyncHandler((req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (authHeaders && authHeaders.startsWith("Bearer")) {
    try {
      let token = authHeaders.split(" ")[1];
      jwt.verify(
        String(token),
        process.env.JWT_SECRET,
        async (err, decoded) => {
          if (err) throw new CustomError.BadRequestError("Invalid Token");
          req.user = await User.findById(decoded.id).select("-password");
          next();
        }
      );
      next();
      // jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      //   if (err) throw new CustomError.BadRequestError("Invalid Token");
      //   req.user = user;
      //   next();
      // });
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  } else {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
});

export const verifyTokenAndRoles = (req, res, next) => {
  checkUser(req, res, () => {
    if (req.user) {
      next();
    } else {
      throw new CustomError.UnauthorizedError(
        "Not authorized to access this route"
      );
    }
  });
};

export const verifyTokenAndAdmin = asyncHandler((req, res, next) => {
  checkUser(req, res, () => {
    console.log("User printing");
    console.log(req.user);
    if (req.user.role === process.env.ADMIN_ROLE) {
      console.log("User Inserted");
      next();
    } else {
      throw new CustomError.UnauthorizedError(
        "Not authorized to access this route"
      );
    }
  });
});
