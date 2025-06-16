import express from 'express';
import patientRoutes from './routes/patientRoutes.js';
import invRouter from './routes/inVoiceRoutes.js';
import authRoutes from './routes/authRoutes.js';
import PrescriptionRoutes from './routes/prescription.js';
import qrRoute from './routes/QrRoute.js';
import swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express'
import swaggerOptions from './swaggerOption.js';
const specs = swaggerJSDoc(swaggerOptions);
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs));
app.use('/', patientRoutes); 
app.use('/', invRouter); 
app.use('/', authRoutes); 
app.use(PrescriptionRoutes);
app.use(qrRoute);

export default app;
