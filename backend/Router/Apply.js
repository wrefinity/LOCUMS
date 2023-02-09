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
    ApplyJob.getAllApplication
  );
router
  .route("/:applyId")
  .delete(AuthRoles.authorizePermissions, ApplyJob.deleteUserJobs);
router
  .route("/:userId/:postId")
  .patch(
    AuthRoles.Authenticate,
    AuthRoles.authorizePermissions,
    ApplyJob.deleteApplicationPost
  );

export default router;
