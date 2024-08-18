import express from 'express';
import patientRoutes from './routes/patientRoutes.js';
import invRouter from './routes/inVoiceRoutes.js';
import authRoutes from './routes/authRoutes.js';
import persRoutes from './routes/prescriptionRoutes.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use route handlers
app.use('/api', patientRoutes); 
app.use('/api', invRouter); 
app.use('/api', authRoutes); 
app.use('/api', persRoutes); 

// Default error handling middleware (optional)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

export default app;

