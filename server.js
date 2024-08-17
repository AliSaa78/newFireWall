<<<<<<< HEAD
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

=======
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

// Load environment variables
dotenv.config();
const port = process.env.PORT || 4000;

// Connect to MongoDB
  try {
  await mongoose.connect(process.env.DATABASE_URL);
} catch (error) {
  handleError(error);
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
>>>>>>> ali_waleed
