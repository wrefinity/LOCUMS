import express from "express";
import JobRepo from "../controller/Jobs.js";
import AuthenticateRoles from "../middleware/authroles.js";

const router = express.Router();
router
  .route("/job")
  .post(
    AuthenticateRoles.Authenticate,
    AuthenticateRoles.authorizePermissions,
    JobRepo.createJob
  )
  .get(AuthenticateRoles.Authenticate, JobRepo.allJob);
router
  .route("/:id")
  .get(JobRepo.singleJob)
  .delete(
    AuthenticateRoles.Authenticate,
    AuthenticateRoles.authorizePermissions,
    JobRepo.deleteJob
  )
  .patch(
    AuthenticateRoles.Authenticate,
    AuthenticateRoles.authorizePermissions,
    JobRepo.updateJob
  );

export default router;