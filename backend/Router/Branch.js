import express from "express";
import branchController from "../controller/Branch.js";
import AuthRoles from "../middleware/authroles.js";

const router = express.Router();
// router
//   .route("/")
//   .post(
//     AuthRoles.Authenticate,
//     AuthRoles.authorizePermissions,
//     BranchRepo.createBranch
//   )
//   .get(BranchRepo.allBranch);
// router
//   .route("/:id")
//   .delete(AuthRoles.authorizePermissions, BranchRepo.deleteBranch)
//   .patch(
//     AuthRoles.Authenticate,
//     AuthRoles.authorizePermissions,
//     BranchRepo.updateBranch
//   );

/**
 * @swagger
 * /branches/add_branch:
 *   post:
 *     summary: Add a new branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Main Branch
 *               userId:
 *                 type: string
 *                 example: 60a1e7d8c7894a1d3c1b2c3d
 *               address:
 *                 type: string
 *                 example: 123 Main Street
 *               county:
 *                 type: string
 *                 example: California
 *     responses:
 *       200:
 *         description: The newly created branch
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Branch with this name and user already exists
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
 *                   example: Branch with this name and user already exists
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

router.post("/add_branch", branchController.addBranch);

/**
 * @swagger
 * /branches/get_all_branches:
 *   get:
 *     summary: Retrieve all branches
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: A list of branches
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
 *                     $ref: '#/components/schemas/Branch'
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
 *                   example: Server error
 */

router.get("/get_all_branches", branchController.getAllBranches);

/**
 * @swagger
 * /branches/get_branches:
 *   get:
 *     summary: Retrieve branches with filters
 *     tags: [Branches]
 *     parameters:
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: The user's name to filter branches
 *       - in: query
 *         name: branch
 *         schema:
 *           type: string
 *         description: The branch name to filter branches
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: The user ID to filter branches
 *     responses:
 *       200:
 *         description: A list of filtered branches
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
 *                     $ref: '#/components/schemas/Branch'
 *                 count:
 *                   type: integer
 *                   example: 5
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
 *                   example: Server error
 */
router.get("/get_branches", branchController.getBranches);

/**
 * @swagger
 * /branches/edit_branch/{id}:
 *   patch:
 *     summary: Update a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The branch ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Branch Name
 *               county:
 *                 type: string
 *                 example: New County
 *               address:
 *                 type: string
 *                 example: 456 New Street
 *     responses:
 *       200:
 *         description: The updated branch
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Branch'
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
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Server Error
 */
router.patch("/edit_branch/:id", branchController.editBranch);

export default router;
