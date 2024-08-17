import express from 'express';
import patientRoutes from './routes/patientRoutes.js';
import invRouter from './routes/inVoiceRoutes.js';
import authRoutes from './routes/authRoutes.js';
<<<<<<< HEAD
import cookieparser  from 'cookie-parser';
=======

>>>>>>> ali_waleed
const app = express();

// Middleware to parse JSON
app.use(express.json());
<<<<<<< HEAD
app.use(cookieparser());

app.use( patientRoutes); 
app.use( invRouter); 
app.use( authRoutes); 

export default app;
=======

app.use('/api', patientRoutes); 
app.use('/api', invRouter); 
app.use('/api', authRoutes); 


export default app;
>>>>>>> ali_waleed
