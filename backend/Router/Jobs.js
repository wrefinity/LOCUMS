import express from "express";
import JobRepo from "../controller/Jobs.js";
import AuthenticateRoles from "../middleware/authroles.js";
const router = express.Router();
// router
//   .route("/job")
//   .post(
//     AuthenticateRoles.Authenticate,
//     AuthenticateRoles.authorizePermissions,
//     JobRepo.createJob
//   )
//   .get(AuthenticateRoles.Authenticate, JobRepo.allJob);
// router
//   .route("/:id")
//   .get(JobRepo.singleJob)
//   .delete(
//     AuthenticateRoles.Authenticate,
//     AuthenticateRoles.authorizePermissions,
//     JobRepo.deleteJob
//   )
//   .patch(
//     AuthenticateRoles.Authenticate,
//     AuthenticateRoles.authorizePermissions,
//     JobRepo.updateJob
//   );

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get a single job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The job ID
 *     responses:
 *       200:
 *         description: The job details for the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server Error
 */

router.get("/:id", JobRepo.getJobById);

/**
 * @swagger
 * /edit_job/{id}:
 *   patch:
 *     summary: Update a job by its ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the job to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: The updated job
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Job'
 *       400:
 *         description: Problem with the update query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Problem with the update query
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Error message
 */
router.patch("/edit_job/:id", JobRepo.editJob);

/**
 * @swagger
 * /jobs/add_job:
 *   post:
 *     summary: Add a new job
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: The created job
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Job'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Server Error
 */
router.post("/add_job", JobRepo.addJob);

/**
 * @swagger
 * /jobs/get_jobs:
 *   get:
 *     summary: Retrieve a list of jobs based on specified filters
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *         description: Filter jobs by branch ID
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter jobs by category
 *       - in: query
 *         name: payFrequency
 *         schema:
 *           type: string
 *         description: Filter jobs by pay frequency
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter jobs by title (case-insensitive)
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter jobs by their active status
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter jobs by user ID
 *       - in: query
 *         name: current
 *         schema:
 *           type: integer
 *         description: The current page number for pagination (default is 1)
 *     responses:
 *       200:
 *         description: A list of jobs and the total count of jobs matching the filters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *                 count:
 *                   type: integer
 *                   example: 42
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Server Error
 */
router.get("/get_jobs", JobRepo.getJobs);

router.get("/grouped_data", JobRepo.getGroupedData);

router.get("/graph_data/:duration", JobRepo.getGraphData);

export default router;
