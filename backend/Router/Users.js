import express from "express";
import UserRepo from "../controller/Users.js";
import AuthRoles from "../middleware/authroles.js";
const router = express.Router();

// router
//checking id a user is loggedin
/**
 * @swagger
 * /users/loggedIn:
 *   get:
 *     summary: Check if the user is logged in
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Login status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: The login status of the user
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server Error
 */

router.get("/loggedIn", UserRepo.getLoggedIn);
//user login

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate a user or staff member
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user or staff member
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user or staff member
 *                 example: mypassword
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: JWT_TOKEN
 *       201:
 *         description: Account not verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Account not verified, please use contact admin
 *                 auth:
 *                   type: boolean
 *                   example: false
 *       400:
 *         description: Error while processing request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: ERROR_MESSAGE
 *                 auth:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Invalid credentials, user does not exist, or user account suspended
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: ERROR_MESSAGE
 *                 auth:
 *                   type: boolean
 *                   example: false
 */

router.post("/login", UserRepo.login_function);
//get specific user
router.get("/get_user", AuthRoles.authFunction, UserRepo.getUser);
//return users

/**
 * @swagger
 * /users/get_users:
 *   get:
 *     summary: Retrieve a list of users with optional filters
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *         description: Filter users by gender
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filter users by role
 *       - in: query
 *         name: occupation
 *         schema:
 *           type: string
 *         description: Filter users by occupation
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter users by email
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *         description: Filter users by phone
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: The status of the request
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 count:
 *                   type: integer
 *                   description: The total number of users
 *       500:
 *         description: Server Error
 */
router.get("/get_users", AuthRoles.authFunction, UserRepo.getUsers);

// create user account
/**
 * @swagger
 * /users/add_user:
 *   post:
 *     summary: Add a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Account created successfuly, login and continue profile setup!
 *       400:
 *         description: User already exists or server error
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
 *                   example: User Already Exists
 */
router.post("/add_user", UserRepo.addUser);

/**
 * @swagger
 * /users/edit_user/{id}:
 *   patch:
 *     summary: Update user information
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Problem with the update query
 *       500:
 *         description: Server error
 */
router.patch("/edit_user/:id", UserRepo.editUser);

export default router;
