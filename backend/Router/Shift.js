import express from "express";
import ShiftRepo from "../controller/Shift.js";
import AuthRoles from "../middleware/authroles.js";

const router = express.Router();
router
  .route("/")
  .post(
    AuthRoles.Authenticate,
    AuthRoles.authorizePermissions,
    ShiftRepo.CreateShift
  )
  .get(ShiftRepo.allShift);
router
  .route("/:id")
  .delete(AuthRoles.authorizePermissions, ShiftRepo.deleteShift)
  .patch(
    AuthRoles.Authenticate,
    AuthRoles.authorizePermissions,
    ShiftRepo.updateShift
  );

export default router;
