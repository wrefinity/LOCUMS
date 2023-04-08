import DutyRoster from "../model/DutyRoster.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import CustomError from "../error/index.js";
import {
  findAll,
  findOne,
  findAllWithParams,
  creator,
  updator,
} from "./ModelActions.js";

class DutyRosterRepo {
  createRoster = asyncHandler(async (req, res) => {
    const info = req.body;
    if (!info)
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    const userId = req.user._id;
    const created = await creator(DutyRoster, { info, userId });
    created && res.status(StatusCodes.CREATED).json(created);
  });

  // for admin consumptions
  allDuties = asyncHandler(async (req, res) => {
    const data = await findAll(DutyRoster);
    data && res.status(StatusCodes.OK).json(data);
  });

  // a specific user duty: say for instance the current duty
  specificUserDuty = asyncHandler(async () => {
    const { id } = req.params; // duty id
    const userId = req.user._id; // user on duty id
    if (!userId)
      throw new CustomError.UnauthenticatedError(
        "please authenticate your self"
      );
    const data = await findOne(DutyRoster, {
      userId,
      _id: id,
      isDeleted: false,
    });
    data && res.status(StatusCodes.Ok).json(data);
  });

  // a user all duty records
  userDuties = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if (userId)
      throw new CustomError.UnauthenticatedError("supply the current user id");
    const data = await findAllWithParams(DutyRoster, { userId });
    if (!data)
      throw new CustomError.NotFoundRequestError(
        `No User Duties with id : ${id}`
      );
    res.status(StatusCodes.OK).json(data);
  });

  updateDuty = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const { id, shiftId, jobId } = req.params;
    checkId(id);
    const match = await findOne(DutyRoster, {
      _id: id,
      isDeleted: false,
      jobId,
      shiftId,
    });
    if (!match)
      throw new CustomError.NotFoundRequestError(`No duty with id : ${id}`);
    const updated = await updator(DutyRoster, id, req.body);
    updated && res.status(StatusCodes.OK).json(updated);
  });
}

export default new DutyRosterRepo();
