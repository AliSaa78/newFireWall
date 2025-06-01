import express from 'express';
import authController from '../controllers/authController.js';
import authRolee from '../controllers/authRole.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and User Management
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: A list of all users
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /updateUsers/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /deletUsers/{id}:
 *   delete:
 *     summary: Delete a user by ID (admin only)
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted
 *       403:
 *         description: Forbidden - not an admin
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /getMe:
 *   get:
 *     summary: Get current logged-in user's profile
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User profile data
 */

/**
 * @swagger
 * /sendEmailToReset:
 *   post:
 *     summary: Send email to reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset email sent
 *       400:
 *         description: Email not found
 */

/**
 * @swagger
 * /resetPassword:
 *   post:
 *     summary: Reset user password (requires token)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 *       401:
 *         description: Unauthorized or invalid token
 */

// Register a new user
router.post('/signup', authController.registerUser);

// Login user
router.post('/login', authController.loginUser);

// logout user 
router.post('/logout',authController.Logout);

// Get all users
router.get('/users', authController.fetchAllUsers);

// Get a single user by ID
router.get('/user/:id', authController.fetchSingleUser);

// Update a user by ID
router.put('/updateUsers/:id', authController.updateUser);

// Delete a user by ID
router.delete('/deletUsers/:id', authController.protect, authRolee('admin'), authController.deleteUser);

// getMe Function
router.get('/getMe',authController.getMe);
router.post('/sendEmailToReset', authController.sendEmailToReset);
router.post('/resetPassword',authController.protect, authController.resetPassword );


export default router ;
