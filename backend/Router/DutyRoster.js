import express from "express";
import DutyRepo from "../controller/DutyRoster.js";
import AuthRoles from "../middleware/authroles.js";

const router = express.Router();
/**
 * @swagger
 * definitions:
 *   Duties:
 *     properties:
 *       userId:
 *         type: ObjectId
 *       shiftId:
 *         type: ObjectId
 *       jobId:
 *         type: ObjectId
 *       clockin:
 *         type: Date
 *       clockout:
 *         type: Date
 *       break_time:
 *         type: Date
 *       break_resume:
 *         type: Date
 */

/**
 * @swagger
 * /api/duties:
 *   post:
 *     summary: Create a Duty post
 *     tags: [Duties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definition/Duties'
 *     responses:
 *       200:
 *         description: The duty was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definition/Duties'
 *       500:
 *         description: server error
 */
router
  .route("/")
  .post(
    AuthRoles.Authenticate,
    AuthRoles.authorizePermissions,
    DutyRepo.createRoster
  )
  .get(DutyRepo.allDuties);

/**
 * @swagger
 * /
 * */
router
  .route("/users/:id")
  .get(
    AuthRoles.Authenticate,
    AuthRoles.authorizePermissions,
    DutyRepo.specificUserDuty
  );
router
  .route("/user")
  .get(
    AuthRoles.Authenticate,
    AuthRoles.authorizePermissions,
    DutyRepo.userDuties
  );
router
  .route("/:id/:jobId/:shiftId")
  .patch(
    AuthRoles.Authenticate,
    AuthRoles.authorizePermissions,
    DutyRepo.updateDuty
  );

export default router;
