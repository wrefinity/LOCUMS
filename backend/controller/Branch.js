import Branch from "../model/Branch.js";
import User from "../model/Users.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import CustomError from "../error/index.js";
import { findAll, findOne, creator, updator } from "./ModelActions.js";

class BranchRepo {
  createBranch = asyncHandler(async (req, res) => {
    const branch = req.body;
    if (!branch)
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    const data = await creator(Branch, {
      ...branch,
    });
    data && res.status(StatusCodes.CREATED).json(data);
  });

  updateBranch = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const { id } = req.params;
    checkId(id);
    const match = await findOne(Branch, { _id: id, isDeleted: false });
    if (!match)
      throw new CustomError.NotFoundRequestError(`No Branch with id : ${id}`);
    const updated = await updator(Branch, id, req.body);
    updated && res.status(StatusCodes.OK).json(updated);
  });

  deleteBranch = asyncHandler(async (req, res) => {
    if (!req.body)
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    const { id } = req.params;
    checkId(id);
    const match = await findOne(Branch, { _id: id, isDeleted: false });
    if (!match)
      throw new CustomError.NotFoundRequestError(`No Branch with id : ${id}`);
    const deleted = await updator(Branch, id, { isDeleted: false });
    deleted && res.status(StatusCodes.OK).json({ deleted });
  });

  allBranch = asyncHandler(async (req, res) => {
    const data = await findAll(Branch);
    data && res.status(StatusCodes.OK).json(data);
  });

  singleBranch = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const data = await findOne(Branch, { _id: id, isDeleted: false });
    if (!data)
      throw new CustomError.NotFoundRequestError(`No Branch with id : ${id}`);
    res.status(StatusCodes.OK).json(data);
  });

  // =====================

  addBranch = async (req, res) => {
    const { name, userId } = req.body;

    try {
      // Check if branch with the same name and userId already exists
      const existingBranch = await Branch.findOne({ name, userId });

      if (existingBranch) {
        return res.status(400).send({
          status: false,
          msg: "Branch with this name and user already exists",
        });
      }

      const newBranch = new Branch(req.body);
      const branch = await newBranch.save();
      res.status(200).send({ status: true, data: branch });
    } catch (err) {
      console.log(err);
      res.status(500).send({ status: false, msg: "Server Error" });
    }
  };

  getAllBranches = async (req, res) => {
    try {
      const branches = await Branch.find({ isDeleted: false });

      return res.status(200).send({ status: true, data: branches });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ status: false, msg: "Server error" });
    }
  };

  getBranches = async (req, res) => {
    const { user, branch, userId } = req.query;

    try {
      let filters = { isDeleted: false };

      if (userId) {
        filters.userId = userId;
      }

      if (user) {
        // Find the user by name using a regular expression to perform a partial match
        filters.userId = {
          $in: await User.find({
            fullname: { $regex: user, $options: "i" },
          }).select("_id"),
        };
      }

      if (branch) {
        // Filter branches by name
        filters.name = { $regex: branch, $options: "i" };
      }

      let current = (req.query.current || 1) - 1;
      let count = await Branch.countDocuments(filters);
      const branches = await Branch.find(filters)
        .populate({
          path: "userId",
          select: "fullname",
        })
        .skip(current * 10)
        .limit(10)
        .exec();

      return res.status(200).send({ status: true, data: branches, count });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ status: false, msg: "Server error" });
    }
  };

  editBranch = async (req, res) => {
    const { id } = req.params;
    const { name, county, address } = req.body;
    try {
      const branch = await Branch.findByIdAndUpdate(
        id,
        { name, county, address },
        { new: true }
      );
      if (!branch) {
        res
          .status(400)
          .send({ status: false, msg: "Problem with the update query" });
      }

      res.status(200).send({ status: true, data: branch });
    } catch (err) {
      console.log(err);
      res.json({ msg: err });
    }
  };
}

export default new BranchRepo();
