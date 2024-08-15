import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

// Register a new user
router.post('/signup', authController.registerUser);

// Login user and generate JWT
router.post('/login', authController.loginUser);

// Get all users
router.get('/users', authController.fetchAllUsers);

// Get a single user by ID
router.get('/user/:id', authController.fetchSingleUser);

// Update a user by ID
router.put('/updateUsers/:id', authController.updateUser);

// Delete a user by ID
router.delete('/deletUsers/:id', authController.deleteUser);

router.get('/me', authController.getMe);

//logout 
router.post('/logout',authController.logout);

export default router;
