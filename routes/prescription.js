import express from 'express';
import prescriptionController from '../controllers/prescription.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Prescriptions
 *   description: API for managing prescriptions
 */

/**
 * @swagger
 * /newPrescription:
 *   post:
 *     summary: Create a new prescription
 *     tags: [Prescriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *               medications:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     dosage:
 *                       type: string
 *                     instructions:
 *                       type: string
 *     responses:
 *       201:
 *         description: Prescription created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /fetchAllPrescription:
 *   get:
 *     summary: Fetch all prescriptions
 *     tags: [Prescriptions]
 *     responses:
 *       200:
 *         description: List of all prescriptions
 */

/**
 * @swagger
 * /signlePrescription/{id}:
 *   get:
 *     summary: Fetch a single prescription by ID
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Prescription ID
 *     responses:
 *       200:
 *         description: Prescription details
 *       404:
 *         description: Prescription not found
 */

/**
 * @swagger
 * /updatePrescription/{id}:
 *   put:
 *     summary: Update a prescription by ID
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Prescription ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               medications:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     dosage:
 *                       type: string
 *                     instructions:
 *                       type: string
 *     responses:
 *       200:
 *         description: Prescription updated
 *       404:
 *         description: Prescription not found
 */

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete a prescription by ID
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Prescription ID
 *     responses:
 *       200:
 *         description: Prescription deleted
 *       404:
 *         description: Prescription not found
 */

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