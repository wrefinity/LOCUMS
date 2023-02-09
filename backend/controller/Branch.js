import Branch from "../model/Branch.js";
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
}

export default new BranchRepo();
