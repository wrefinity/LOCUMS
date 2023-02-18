import Application from "../model/Application.js";
import checkId from "../utils/mongoIdCheck.js";
import StatusCodes from "http-status-codes";
import { updator } from "./ModelActions.js";

class ApplyRepo {
  addApplication = async (req, res) => {
    const userId = req.user._id;
    const apply = req.body.jobs;
    const checker = await Application.findOne({ userId });
    let applyDoc = null;
    if (!checker) {
      applyDoc = await Application.create({
        userId,
        jobs: apply,
      });
    } else {
      applyDoc = await Application.updateOne(
        { userId },
        { $push: { jobs: apply } }
      ).exec();
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: applyDoc._id
        ? "Job Registered Successfully"
        : "Registration failed",
      scholar: applyDoc,
    });
  };

  deleteUserJobs = async (res, req) => {
    const { applyId } = req.params;
    await updator(Application, applyId, { isDeleted: true });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "job deleted successfully",
    });
  };

  deleteApplicationJob = async (req, res) => {
    const { userId, jobId } = req.params;
    const jobx = await Application.findOne({ userId });
    const checkJob = jobx?.jobs?.filter((j) => j?.jobId == jobId)[0];
    if (checkJob) {
      const toUpdateData = { isDeleted: true };
      await Application.findOneAndUpdate(
        { userId, "jobs.jobId": jobId },
        {
          $set: { "jobs.$": toUpdateData },
        }
      );
      res.status(StatusCodes.OK).json({
        success: true,
        message: "Job deleted successfully",
      });
    } else {
      res.status(StatusCodes.OK).json({
        message: "Job not found",
      });
    }
  };

  // deleteApplicationJob = async (req, res) => {
  //   const { userId, jobId } = req.params;
  //   checkId(userId);
  //   checkId(jobId);
  //   const applyDoc = await Application.updateOne(
  //     { userId },
  //     {
  //       $pull: { jobId: { jobId } },
  //     }
  //   ).exec();

  //   res.status(StatusCodes.OK).json({
  //     success: true,
  //     jobs: applyDoc,
  //     message: "Job deleted",
  //   });
  // };
  getApply = async (req, res) => {
    const userId = req.user._id;
    checkId(userId);
    const applyDoc = await Application.findOne({ userId, isDeleted: false })
      .populate({ path: "categoryId", select: "name" })
      .populate("jobId");
    res.status(StatusCodes.OK).json({
      success: true,
      job: applyDoc,
    });
  };
  getAllApplication = async (_, res) => {
    const applyDoc = await Application.find({ isDeleted: false })
      .populate({ path: "categoryId", select: "name" })
      .populate("jobId");
    return res.status(StatusCodes.OK).json({
      jobs: applyDoc,
    });
  };
}
export default new ApplyRepo();
