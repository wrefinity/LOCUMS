import Shift from "../model/Shift.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import CustomError from "../error/index.js";
import {
  findAll,
  findOne,
  creator,
  updator,
} from "./ModelActions.js";

class ShiftRepo {
  CreateShift = asyncHandler(async (req, res) => {
    const shift = req.body;
    if (!shift) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const data = await creator(Shift, {
      ...shift,
    });
    data && res.status(StatusCodes.CREATED).json({ data });
  });

  updateShift = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const { id } = req.params;
    checkId(id);
    const match = await findOne(Shift, { _id: id, isDeleted: false });
    if (!match) {
      throw new CustomError.NotFoundRequestError(`No Shift with id : ${id}`);
    }
    const updated = await updator(Shift, id, req.body);
    updated && res.status(StatusCodes.OK).json(updated);
  });

  deleteShift = asyncHandler(async (req, res) => {
    if (!req.body)
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    const { id } = req.params;
    checkId(id);
    const match = await findOne(Shift, { _id: id, isDeleted: false });
    if (!match)
      throw new CustomError.NotFoundRequestError(`No Shift with id : ${id}`);
    const deleted = await updator(Shift, id, { isDeleted: false });
    deleted && res.status(StatusCodes.OK).json(deleted);
  });

  allShift = asyncHandler(async (req, res) => {
    const data = await findAll(Shift);
    data && res.status(StatusCodes.OK).json(data);
  });

  singleShift = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const data = await findOne(Shift, { _id: id, isDeleted: false });
    if (!data)
      throw new CustomError.NotFoundRequestError(`No Shift with id : ${id}`);
    res.status(StatusCodes.OK).json(data);
  });
}

export default new ShiftRepo();
