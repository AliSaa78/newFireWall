import express from 'express';
import patientController from '../controllers/patientController.js';
import multer from 'multer';
const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });


// Create a new patient
router.post('/patients',upload.single('newPatientPic') ,patientController.createPatient);

// Read all patients
router.get('/patients', patientController.readAllPatients);

// Read a patient by ID
router.get('/patients/:id', patientController.readPatientById);

// Update a patient by ID
router.put('/patients/:id', patientController.updatePatient);

// Delete a patient by ID
router.delete('/patients/:id', patientController.deletePatient);

export default router;
