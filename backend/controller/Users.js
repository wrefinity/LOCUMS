import bcrypt from "bcrypt";
import Authentication from "../middleware/authentication.js";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import asyncHandler from "express-async-handler";
import CustomError from "../error/index.js";
import User from "../model/Users.js";
import { findOne, updator } from "./ModelActions.js";
const maxAge = 3 * 60 * 60 * 24;

class UserRepo {
  deleteUsers = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const user = await findOne(User, { _id: id });
    if (!user)
      throw new CustomError.NotFoundRequestError(`No user with id ${id}`);
    await updator(User, id, { isDeleted: true });
    res.status(StatusCodes.OK).json({ message: "user deleted" });
  });

  // update a user
  updateUser = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const { id } = req.params;
    checkId(id);
    const user = await findOne(User, { _id: id });
    if (!user)
      throw new CustomError.NotFoundRequestError(`No user with id ${id}`);
    const updatedUser = await updator(User, id, req.body);
    res.status(StatusCodes.OK).json(updatedUser);
  });

  //getUsers
  getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({
      role: { $not: /^admin.*/ },
      isDeleted: false,
    }).select("-password");
    res.status(StatusCodes.OK).json(users);

    const { page } = req.query;
    const limit = 10;
    const startIndex = (Number(page) - 1) * limit;
    const total = await User.countDocuments({});
    const data = await User.find({
      role: { $not: /^admin.*/ },
      isDeleted: false,
    })
      .limit(limit)
      .skip(startIndex)
      .select("-password");
    data &&
      res.status(StatusCodes.OK).json({
        users: data,
        currentPage: Number(page),
        totalUsers: total,
        numberOfPages: Math.ceil(total / limit),
      });
  });

  //get singleUser
  getUser = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    checkId(userId);
    const user = await User.findOne({ _id: userId, isDeleted: false }).select(
      "-password"
    );
    if (!user) {
      throw new CustomError.NotFoundRequestError(`No user with id : ${userId}`);
    }
    res.status(StatusCodes.OK).json(user);
  });

  //login section
  login_post = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError.BadRequestError(
        "Please provide email and password"
      );
    }

    const user = await User.compareDetails(email, password);
    const token = Authentication.generateToken(user.role, {
      id: user._id,
      role: user.role,
    });

    res.cookie("authentication", token, {
      httpOnly: true,
      maxAge: 1000 * maxAge,
      secure: process.env.NODE_ENV === "production",
      signed: true,
    });
    res.status(StatusCodes.OK).json({ ...user, token });
  });

  //    registration sections
  regPost = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const existance = await User.findOne({ email });
    if (existance)
      throw new CustomError.BadRequestError("Email already exists");
    const user = await User.create({ ...req.body, password });
    user && res.status(StatusCodes.CREATED).json(user);
  });
  regCompany = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const existance = await User.findOne({ email });
    if (existance)
      throw new CustomError.BadRequestError("Email already exists");
    const user = await User.create({
      ...req.body,
      role: process.env.COMPANY_ROLE,
      password,
    });
    user && res.status(StatusCodes.CREATED).json(user);
  });

  // Change password section
  changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, id } = req.body;
    if (!oldPassword || !newPassword) {
      throw new CustomError.BadRequestError("Please provide both values");
    }

    const user = await User.findById(id);
    if (user) {
      const isPasswordCorrect = await user.comparePassword(oldPassword);
      if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError("Invalid Credentials");
      }
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
      res
        .status(StatusCodes.OK)
        .json({ message: "Success! Password Updated." });
    }
  });

  changeImage = asyncHandler(async (req, res) => {
    const { image } = req.body;
    const { id: userId } = req.user;
    checkId(userId);
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { image } },
      { new: true }
    );
    res.status(StatusCodes.OK).json(user);
  });
}
export default new UserRepo();
