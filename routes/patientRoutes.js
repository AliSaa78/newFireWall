import express from 'express';
import patientController from '../controllers/patientController.js';

const router = express.Router();

// Create a new patient
router.post('/patients', patientController.createPatient);

// Read all patients
router.get('/patients', patientController.readAllPatients);

<<<<<<< HEAD
// find a patient by ID
=======
// Read a patient by ID
>>>>>>> ali_waleed
router.get('/patients/:id', patientController.readPatientById);

// Update a patient by ID
router.put('/patients/:id', patientController.updatePatient);

// Delete a patient by ID
router.delete('/patients/:id', patientController.deletePatient);

export default router;
