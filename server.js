import app from "./app.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();


// Connect to MongoDB
const DB =  mongoose.connect(process.env.db_connection).then(()=>{
  console.log("DataBase connectend !!!!!");
});


app.listen(3000 , () =>{
  console.log("Server Ok!!"); 
})

