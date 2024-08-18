import express from 'express';
import prescriptionController from '../controllers/prescription.js';

const router = express.Router();

//creating a new one 
router.post('/newPrescription',prescriptionController.createPrescription);

//fetching all the Prescription

router.get('/fetchAllPrescription',prescriptionController.fetchAll);

//fetch single one 

router.get('/signlePrescription/:id',prescriptionController.fetchSinglePre);

//update 

router.put('/updatePrescription/:id',prescriptionController.updatePrescription);

//delete

router.delete('/delete/:id',prescriptionController.deletePrescription);


export default router;