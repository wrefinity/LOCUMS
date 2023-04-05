import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
    await user.remove();
    res.status(StatusCodes.OK).json({ message: "user deleted" });
  });

  // update a user
  updateUser = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const { id: userId } = req.params;
    checkId(userId);
    const updatedUser = await updator(User, id, req.body);
    res.status(StatusCodes.OK).json(updatedUser);
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

  login_get = asyncHandler(async (req, res) => {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const role = process.env.ADMIN_ROLE;

    const userFind = await User.findOne({ email });
    if (!userFind) {
      // throw new CustomError.UnauthenticatedError("User Not Registered")
      const user = await User.create({
        email,
        password,
        role,
      });
    }
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

  // ----------------------

  addUser = async (req, res) => {
    const { email } = req.body;

    try {
      let user = await User.findOne({ email });

      //if user already exist
      if (user)
        return res
          .status(400)
          .send({ status: false, msg: "User Already Exist" });

      //creating new user
      let newUser = await new User(req.body);

      //Create salt and hash
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(req.body.password, salt);
      newUser.save();
      return res.status(200).send({
        status: true,
        msg: "Account created successfuly, login and continue profile setup!",
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: err });
    }
  };
  editUser = async (req, res) => {
    const { id } = req.params;
    let data = req.body;
    delete data.password;
    try {
      const user = await User.findByIdAndUpdate(id, data, { new: true });
      if (!user) {
        res
          .status(400)
          .send({ status: false, msg: "Problem with the update query" });
      }

      res.status(200).send({ status: true, data: user });
    } catch (err) {
      res.json({ msg: err });
    }
  };
  //another implementation
  login_function = async (req, res) => {
    const { email, password } = req.body;

    //Simple Validation
    if (!email || !password) {
      return res
        .status(401)
        .send({ msg: "Please enter all fields", auth: false });
    }

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(401)
          .send({ msg: "User Does Not Exist", auth: false });
      }

      if (user.status === "not verified") {
        return res.status(201).send({
          msg: "Account not verified, please use contact admin",
          auth: false,
        });
      } else if (user.status === "suspended") {
        return res
          .status(401)
          .send({ msg: "User account suspended", auth: false });
      }

      //Validating Password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res
            .status(401)
            .send({ msg: "Invalid Credentails", auth: false });
        }
        //isMatch is true
        jwt.sign(
          { id: user.id },
          process.env.jwtSecret,
          { expiresIn: 86400 },
          (err, token) => {
            if (err) throw err;

            res.status(200).send({ auth: true, token });
          }
        );
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: err, auth: false });
    }
  };

  //getUsers
  getUsers = asyncHandler(async (req, res) => {
    const { gender, role, occupation, email, phone } = req.query;
    let filters = { isDeleted: false };

    if (gender) {
      filters.gender = gender;
    }

    if (role) {
      filters.role = role;
    }

    if (occupation) {
      filters.occupation = occupation;
    }
    if (email) {
      // Filter by email
      filters.email = { $regex: email, $options: "i" };
    }
    if (phone) {
      // Filter branches by phone
      filters.phone = { $regex: phone, $options: "i" };
    }

    let current = (req.query.current || 1) - 1;
    let count = await User.countDocuments(filters);
    const users = await User.find(filters)
      .select("-password")
      .skip(current * 10)
      .limit(10);
    res.status(200).send({ status: true, data: users, count });
  });

  //get singleUser
  getUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    checkId(userId);
    const user = await User.findOne({ _id: userId, isDeleted: false }).select(
      "-password"
    );
    if (!user) {
      res
        .status(200)
        .json({ status: false, msg: `No user with id : ${userId}` });
    }
    res.status(StatusCodes.OK).json(user);
  });

  //get singleUser
  getLoggedIn = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    //check for token
    if (!token) {
      res.status(StatusCodes.OK).send(false);
    } else {
      jwt.verify(token, process.env.jwtSecret, function (err) {
        if (err) {
          res.status(200).send({ status: false });
        } else {
          res.status(200).send(true);
        }
      });
    }
  };
}
export default new UserRepo();
