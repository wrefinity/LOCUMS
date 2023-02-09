import express from "express";
import BranchRepo from "../controller/Branch.js";
import AuthRoles from "../middleware/authroles.js";

const router = express.Router();
router
  .route("/")
  .post(
    AuthRoles.Authenticate,
    AuthRoles.authorizePermissions,
    BranchRepo.createBranch
  )
  .get(BranchRepo.allBranch);
router
  .route("/:id")
  .delete(AuthRoles.authorizePermissions, BranchRepo.deleteBranch)
  .patch(
    AuthRoles.Authenticate,
    AuthRoles.authorizePermissions,
    BranchRepo.updateBranch
  );

export default router;
