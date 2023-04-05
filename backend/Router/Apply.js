import express from "express";
import ApplyJob from "../controller/AppliedJobs.js";
import AuthRoles from "../middleware/authroles.js";

const router = express.Router();

/*
Employer: admin and superadmin
Employees: Doctors, Health care asssitance, nurse, pharmacist, pharmacy technician, social health care,
*/

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: The applications managing API
 */

/**
 * @swagger
 * /applications/apply:
 *   post:
 *     summary: Apply for a job
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - jobId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user applying for the job
 *               jobId:
 *                 type: string
 *                 description: The ID of the job the user is applying for
 *               user_note:
 *                 type: string
 *                 description: A note from the user for the job application
 *     responses:
 *       201:
 *         description: The application was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       400:
 *         description: An error occurred while creating the application
 */
router.post("/apply", ApplyJob.applyForJob);

/**
 * @swagger
 * /applications/{id}/edit:
 *   patch:
 *     summary: Edit an existing application
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The application ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_note:
 *                 type: string
 *                 description: Updated note from the user for the job application
 *               admin_note:
 *                 type: string
 *                 description: Updated note from the admin related to the job application
 *               status:
 *                 type: string
 *                 description: Updated status of the application (e.g., pending, accepted, rejected)
 *     responses:
 *       200:
 *         description: The application was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       400:
 *         description: Error occurred while updating the application
 */
router.patch("/:id/edit", ApplyJob.editApplication);

/**
 * @swagger
 * /applications/user/{userId}:
 *   get:
 *     summary: Get all applications for a specific user
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of applications for the specific user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 *       400:
 *         description: Error occurred while fetching applications
 */
router.get("/user/:userId", ApplyJob.getApplicationsByUser);

/**
 * @swagger
 * /applications/job/{jobId}:
 *   get:
 *     summary: Get all applications for a specific job
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         schema:
 *           type: string
 *         required: true
 *         description: The job ID
 *     responses:
 *       200:
 *         description: A list of applications for the specific job
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 *       400:
 *         description: Error occurred while fetching applications
 */
router.get("/job/:jobId", ApplyJob.getApplicationsByJob);

/**
 * @swagger
 * /applications/filtered:
 *   get:
 *     summary: Get all applications with application_date range, user_id, and job_id as parameters
 *     tags: [Applications]
 *     parameters:
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date-time
 *         description: The start of the application date range to filter by
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date-time
 *         description: The end of the application date range to filter by
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         description: The user ID to filter by
 *       - in: query
 *         name: job_id
 *         schema:
 *           type: string
 *         description: The job ID to filter by
 *     responses:
 *       200:
 *         description: A list of filtered applications based on the provided parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 *       400:
 *         description: Error occurred while fetching applications
 */

router.get("/filtered", ApplyJob.getFilteredApplications);
export default router;
