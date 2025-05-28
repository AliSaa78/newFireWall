import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Blacklist from '../models/blackList.js'
import nodemailer from 'nodemailer';


dotenv.config();
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "81a724006977b2",
    pass: "202583f86cc6f7"
  }
});
let mailOptions = {
  from: 'alibarmej@gmail.com',         // Sender's email address
  to: 'aliabsoae@gmail.com',               // Recipient's email address
  subject: 'Test Email from Nodemailer',     // Subject line
  text: 'Hello, this is a test email!',      // Plain text body
  html: '<b>Hello, this is a test email!</b>' // HTML body (optional)
};


const secretKey = process.env.SECRET_TOKEN_ACCESS;

const authController = {

  // Register a new user
registerUser: async (req, res) => {
  try {
    const { username, password, role ,email} = req.body;

    // Check if the username exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = new User({ username, password, role, email });
    await user.save();

    const token = jwt.sign({name: user.username, id: user._id, role: user.role ,email:user.email}, secretKey, { expiresIn: '8h' });
    res.json({ token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).send('Error registering user');
  }
}

  ,

  // Login user and generate JWT
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(401).send('Invalid username or password');

      if (!bcrypt.compare(password, user.password)) 
      return res.status(401).send('Invalid username or password');

      const token = jwt.sign({name: user.username, id: user._id, role: user.role }, secretKey, { expiresIn: '8h' });
      res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(400).send('Error logging in');
    }
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
      res.status(200).json(updatedInvoice); 
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
},
protect: async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
      return res.status(403).json({ message: "Token is not provided" });
    }

    const token = authHeader.split(' ')[1]; // Extract the token after "Bearer "
    if (!token) {
      return res.status(403).json({ message: "Token is not provided" });
    }

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Token" });
      }
      console.log(decoded); // Check the decoded payload
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in protect middleware" });
  }
},

sendEmailToReset: async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists by email
    const user = await User.findOne({ email : email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    // Create JWT token
    const token = jwt.sign(
      { name: user.username, id: user._id, role: user.role },
      secretKey,
      { expiresIn: '15m' }
    );
    console.log(token);

    // Customize the email message with user information and reset link
    const resetLink = `https://localhost:4000/api/user/reset-password?token=${token}`;
    let mailOptions = {
      from: 'alibarmej@gmail.com', 
      to: email,
      subject: 'Password Reset Request',
      html: `<b>Hello ${user.username},</b><br>Click <a href="${resetLink}">here</a> to reset your password.`
    };

    // Send email using Mailtrap
    await transport.sendMail(mailOptions);

    // Send token in response if needed (though it's better to handle via email link)
    res.json({ message: 'Password reset email sent' });

  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Error sending password reset email' });
  }
},
resetPassword: async (req, res, next) => {
  try {
    // Assuming protect middleware sets req.user
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: 'New password is required' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error resetting password' });
  }
}


};

export default authController;


