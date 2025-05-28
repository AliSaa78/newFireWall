import express from 'express';
import authController from '../controllers/authController.js';
import authRolee from '../controllers/authRole.js';

const router = express.Router();

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
