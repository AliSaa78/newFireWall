import express from 'express';
import patientRoutes from './routes/patientRoutes.js';
import invRouter from './routes/inVoiceRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieparser  from 'cookie-parser';
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieparser());

app.use( patientRoutes); 
app.use( invRouter); 
app.use( authRoutes); 

export default app;