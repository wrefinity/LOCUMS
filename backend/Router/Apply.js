import express from "express";
import ApplyJob from "../controller/AppliedJobs.js";
import AuthRoles from "../middleware/authroles.js";

const router = express.Router();
/*
Employer: admin and superadmin
Employees: Doctors, Health care asssitance, nurse, pharmacist, pharmacy technician, social health care,
*/
router
  .route("/")
  .post(
    AuthRoles.Authenticate,
    AuthRoles.authorizePermissions,
    ApplyJob.addApplication
  )
  .get(
    AuthRoles.Authenticate,
    AuthRoles.authorizePermissions,
    ApplyJob.getApply
  );

router.route("/admin").get(AuthRoles.Authenticate, ApplyJob.getAllApplication);
router
  .route("/:applyId")
  .delete(AuthRoles.authorizePermissions, ApplyJob.deleteUserJobs);
router
  .route("/:userId/:jobId")
  .patch(
    AuthRoles.Authenticate,
    AuthRoles.authorizePermissions,
    ApplyJob.deleteApplicationJob
  );

export default router;
