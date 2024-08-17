import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

// Register a new user
router.post('/signup', authController.registerUser);

<<<<<<< HEAD
// Login user and generate JWT
router.post('/login', authController.loginUser);

=======
// Login user
router.post('/login', authController.loginUser);

// logout user 
router.post('/logout',authController.Logout);

>>>>>>> ali_waleed
// Get all users
router.get('/users', authController.fetchAllUsers);

// Get a single user by ID
router.get('/user/:id', authController.fetchSingleUser);

// Update a user by ID
router.put('/updateUsers/:id', authController.updateUser);

// Delete a user by ID
router.delete('/deletUsers/:id', authController.deleteUser);

<<<<<<< HEAD
router.get('/me', authController.getMe);

//logout 
router.post('/logout',authController.logout);
=======

// getMe Function
router.get('/getMe',authController.getMe);
>>>>>>> ali_waleed

export default router;
