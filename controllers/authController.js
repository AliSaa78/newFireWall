import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import BlackList from '../models/blackList.js';
import CrudOperations from './CRUD.js';
dotenv.config();
const userCrud = new CrudOperations(User);
const secretKey = process.env.SECRET_TOKEN_ACCESS;


const authController = {

  // Register a new user
  registerUser: async (req, res) => {
    try {
      const { username, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword, role });
      await user.save();
      const token = jwt.sign({ username: user.username, id: user._id, role: user.role }, secretKey, { expiresIn: '8h' });
      res.json({ token });
    } catch (error) {
      console.log("Registration error:", error);
      res.status(400).send('Error registering user');
    }
  },

  // Login user and generate JWT
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(401).send('Invalid username or password');

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).send('Invalid username or password');

      const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: '8h' });
      
      console.log("Generated token:", token);
      res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(400).send('Error logging in');
    }
  },

    // Get current user data
    getMe: async (req, res) => {
      try {
        const token = req.headers.authorization?.split(' ')[1];
        console.log("getMe token :",token);
        if (!token) {
          return res.status(401).json({ message: 'Authorization token is missing' });
        }
  
        jwt.verify(token, secretKey, async (err, decodedToken) => {
          if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
          }
  
          const user = await User.findById(decodedToken.id).select('-password');
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
  
          res.status(200).json({ user });
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    },


 

  // Fetch all users
  fetchAllUsers: async (req, res) => {
    try {
       await userCrud.readAll(req,res);
    } catch (err) {
      console.log(err);
      res.status(400).send('Error fetching users');
    }
  },

  // Fetch single user
  fetchSingleUser: async (req, res) => {
    try {
       await userCrud.readById(req,res);
      
    } catch (err) {
      console.log(err);
      res.status(400).send('Error fetching user');
    }
  },

  // Update user
  updateUser: async (req, res) => {
    try {
        await userCrud.update(req,res);
    } catch (err) {
      console.log(err);
      res.status(400).send('Error updating user');
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    try {
      await userCrud.delete(req,res);;
     
    } catch (err) {
      console.log(err);
      res.status(400).send('Error deleting user');
    }
  },
 
  logout: async (req, res) => {
    try {
      const accesstoken = req.headers.authorization?.split(' ')[1];

      if (!accesstoken) {
        return res.status(401).json({ message: 'Authorization token is missing' });
      }

      const checkBlackListed = await BlackList.findOne({ token: accesstoken });

      if (checkBlackListed) {
        return res.sendStatus(204); // No Content, token is already blacklisted
      }

      jwt.verify(accesstoken, secretKey, async (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid or expired token' });
        } else {
          const blackListed = new BlackList({ token: accesstoken });
          await blackListed.save();
          return res.json({ message: "User logged out successfully" });
        }
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }


};

export default authController;
