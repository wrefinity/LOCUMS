import Application from "../model/Application.js";
import checkId from "../utils/mongoIdCheck.js";
import StatusCodes from "http-status-codes";

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
    await Application.deleteOne({ _id: applyId });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "job deleted successfully",
    });
  };

  deleteApplicationPost = async (req, res) => {
    const { userId, applyId } = req.params;
    checkId(userId);
    checkId(applyId);
    const applyDoc = await Application.updateOne(
      { userId },
      {
        $pull: { jobId: { applyId } },
      }
    ).exec();

    res.status(StatusCodes.OK).json({
      success: true,
      jobs: applyDoc,
      message: "Job deleted",
    });
  };
  getApply = async (req, res) => {
    const { userId } = req.params;
    checkId(userId);
    const applyDoc = await Application.findOne({ userId, isDeleted: false });
    res.status(StatusCodes.OK).json({
      success: true,
      job: applyDoc,
    });
  };
  getAllApplication = async (_, res) => {
    const applyDoc = await Application.find({ isDeleted: false });
    return res.status(StatusCodes.OK).json({
      jobs: applyDoc,
    });
  };
}
export default new ApplyRepo();
