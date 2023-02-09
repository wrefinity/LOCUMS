import Category from "../model/Category.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import CustomError from "../error/index.js";
import { findAll, findOne, creator, updator } from "./ModelActions.js";

class CategoryRepo {
  createCategory = asyncHandler(async (req, res) => {
    const category = req.body;
    if (!category)
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    const data = await creator(Category, {
      ...category,
    });
    data && res.status(StatusCodes.CREATED).json(data);
  });

  updateCategory = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const { id } = req.params;
    checkId(id);
    const match = await findOne(Category, { _id: id, isDeleted: false });
    if (!match)
      throw new CustomError.NotFoundRequestError(`No Category with id : ${id}`);
    const updated = await updator(Category, id, req.body);
    updated && res.status(StatusCodes.OK).json(updated);
  });

  deleteCategory = asyncHandler(async (req, res) => {
    if (!req.body)
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    const { id } = req.params;
    checkId(id);
    const match = await findOne(Category, { _id: id, isDeleted: false });
    if (!match)
      throw new CustomError.NotFoundRequestError(`No Category with id : ${id}`);
    const deleted = await updator(Category, id, { isDeleted: false });
    deleted && res.status(StatusCodes.OK).json({ deleted });
  });

  allCategory = asyncHandler(async (req, res) => {
    const data = await findAll(Category);
    data && res.status(StatusCodes.OK).json(data);
  });

  singleCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const data = await findOne(Category, { _id: id, isDeleted: false });
    if (!data)
      throw new CustomError.NotFoundRequestError(`No Category with id : ${id}`);
    res.status(StatusCodes.OK).json(data);
  });
}

export default new CategoryRepo();
