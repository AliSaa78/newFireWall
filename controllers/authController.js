import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
<<<<<<< HEAD
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
=======
import Blacklist from '../models/balcklist.js'


dotenv.config();

const secretKey = process.env.ACCESS_TOKEN_SECRET;

const authController = {

  // Register a new user
registerUser: async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if the username exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = new User({ username, password, role });
    await user.save();

    const token = jwt.sign({name: user.username, id: user._id, role: user.role }, secretKey, { expiresIn: '8h' });
    res.json({ token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).send('Error registering user');
  }
}

  ,
>>>>>>> ali_waleed

  // Login user and generate JWT
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(401).send('Invalid username or password');

<<<<<<< HEAD
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).send('Invalid username or password');

      const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: '8h' });
      
      console.log("Generated token:", token);
=======
      if (!bcrypt.compare(password, user.password)) 
      return res.status(401).send('Invalid username or password');

      const token = jwt.sign({name: user.username, id: user._id, role: user.role }, secretKey, { expiresIn: '8h' });
>>>>>>> ali_waleed
      res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(400).send('Error logging in');
    }
<<<<<<< HEAD
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
=======
  }, 

  // logout the user 
Logout: async (req, res) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(204); // No content

    // Extract the token from the header (assuming Bearer scheme)
    const accessToken = authHeader.split(' ')[1];

    // Check if that token is blacklisted
    const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken });

    // If true, send a no content response.
    if (checkIfBlacklisted) return res.sendStatus(204); 

    // Otherwise, blacklist the token
    const newBlacklist = new Blacklist({
      token: accessToken,
    });
    await newBlacklist.save();
 
    // note : the token should remove from local storge by the front end 
    // since local storage is managed entirely by the client's browser.

    // Send a success response
    res.status(200).json({ message: 'You are logged out!' });

  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
  res.end();
},
//fetch all the users
 fetchAllUsers: async(req,res,next)=>{
  try {
    const Users = await User.find({});
    res.json(Users);

  }
  catch(err){
    console.log(err);
    res.status(400).send("error during fetching");
  }

 },

 fetchSingleUser: async(req,res,next)=>{
  try{
   const user =await User.findById(req.params.id);
   res.json(user);
  }
  catch(err){
   console.log(err);
   res.status(400).send("error during fetching");
  }
   
 },


//update
updateUser:async(req,res,next)=>{
  try {
      const updatedInvoice = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!updatedInvoice) {
        return res.status(404).send(); // 404 Not Found if invoice not found
      }
      res.status(200).send(updatedInvoice); 
    } catch (error) {
      res.status(400).send(error);
    }

},

//delete
deleteUser:async(req,res,next)=>{
 try{
  const deletedUser=await User.findByIdAndDelete(req.params.id);
  res.json(deletedUser);
 }
 catch(err){
  console.log(err);
  res.status(400).send("error during deleting");
 }
},

getMe: async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
 
    const splitToken = authHeader.split(' ')[1];

    // The payload is the second part (index 1)
    const payloadBase64 = splitToken.split('.')[1];

    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
   
    const payload = JSON.parse(payloadJson);
    
    res.status(200).json(payload);

  } catch (error) {
    console.log(error);
    res.status(400).send('Error');
  }
}

  
};

export default authController;


>>>>>>> ali_waleed
