import express from 'express';
import patientController from '../controllers/patientController.js';
import multer from 'multer';
import path from 'path';



const router = express.Router();

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
//     cb(null, true);
//   } else {
//     cb(new Error('Unsupported file type'), false);
//   }
// };


// Initialize multer
const upload = multer({ storage: storage ,
    limits: { fileSize: 1024 * 1024 * 2 }
});

// POST route to handle image upload and patient creation
router.post('/patients', upload.single('picture'), patientController.createPatient);

// Get the Qr image 
router.get('/generateQR/:id', patientController.createQr);

// Read all patients
router.get('/patients', patientController.readAllPatients);

// Read a patient by ID
router.get('/patients/:id', patientController.readPatientById);

// Update a patient by ID
router.put('/patients/:id', patientController.updatePatient);

// Delete a patient by ID
router.delete('/patients/:id', patientController.deletePatient);

export default router;
