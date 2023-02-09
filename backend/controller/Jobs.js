import Job from "../model/Jobs.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import CustomError from "../error/index.js";
import { findAll, findOne, creator, updator } from "./ModelActions.js";

class JobRepo {
  createJob = asyncHandler(async (req, res) => {
    const job = req.body;
    if (!job) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const data = await creator(Job, {
      ...job,
      publishedDate: new Date().toISOString(),
    });
    data && res.status(StatusCodes.CREATED).json({ data });
  });

  updateJob = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const { id } = req.params;
    checkId(id);
    const match = await findOne(Job, { _id: id, isDeleted: false });
    if (!match)
      throw new CustomError.NotFoundRequestError(`No Job with id : ${id}`);
    const updated = await updator(Job, id, req.body);
    updated && res.status(StatusCodes.OK).json(updated);
  });

  deleteJob = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const { id } = req.params;
    checkId(id);
    const match = await findOne(Job, { _id: id, isDeleted: false });
    if (!match)
      throw new CustomError.NotFoundRequestError(`No Job with id : ${id}`);
    const deleted = await updator(Job, id, { isDeleted: false });
    deleted && res.status(StatusCodes.OK).json({ deleted });
  });

  allJob = asyncHandler(async (req, res) => {
    const data = await findAll(Job);
    data && res.status(StatusCodes.OK).json(data);
  });

  singleJob = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const data = await findOne(Job, { _id: id, isDeleted: false });
    if (!data)
      throw new CustomError.NotFoundRequestError(`No Job with id : ${id}`);
    res.status(StatusCodes.OK).json(data);
  });

  getJobBySearch = async (req, res) => {
    const { searchQuery } = req.query;
    const data = Job.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" }, isDeleted: false },
        { title: { $regex: searchQuery, $options: "i" }, isDeleted: false },
      ],
    });
    // const title = new RegExp(searchQuery, "i");
    // const data = await Job.find({ title });
    if (!data) {
      throw new CustomError.NotFoundRequestError(
        `No Job for the query ${searchQuery}`
      );
    }
    res.json({ jobs: data });
  };

  jobSearchByCompany = asyncHandler(async (req, res) => {
    const { searchQuery } = req.query;
    const data = Job.findOne({
      name: { $regex: searchQuery, $options: "i" },
      isDeleted: false,
    });
    if (!data) {
      throw new CustomError.NotFoundRequestError(
        `No Job for the query ${searchQuery}`
      );
    }
    res.json({ jobs: data });
  });
}

export default new JobRepo();
