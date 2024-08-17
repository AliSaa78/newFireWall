import express from 'express';
import patientRoutes from './routes/patientRoutes.js';
import invRouter from './routes/inVoiceRoutes.js';
import authRoutes from './routes/authRoutes.js';
const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use('/api', patientRoutes); 
app.use('/api', invRouter); 
app.use('/api', authRoutes); 


export default app;
