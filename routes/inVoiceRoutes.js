import express from 'express';
import invController from '../controllers/inVoicecontroller.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: API for managing invoices
 */

/**
 * @swagger
 * /invoice:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     price:
 *                       type: number
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /allInvoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: List of all invoices
 */

/**
 * @swagger
 * /fetchInvoice/{id}:
 *   get:
 *     summary: Get a single invoice by ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Invoice details
 *       404:
 *         description: Invoice not found
 */

/**
 * @swagger
 * /invoice/{id}:
 *   put:
 *     summary: Update an invoice by ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     price:
 *                       type: number
 *     responses:
 *       200:
 *         description: Invoice updated
 *       404:
 *         description: Invoice not found
 */

/**
 * @swagger
 * /invoice/{id}:
 *   delete:
 *     summary: Delete an invoice by ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Invoice deleted
 *       404:
 *         description: Invoice not found
 */


// Create Invoice
router.post('/invoice', invController.createInvoice) ;

// Read All Invoices
router.get('/allInvoices', invController.readAll)

// Fetch Single Invoice
router.get('/fetchInvoice/:id', invController.readInvoice) 

// Update Invoice
router.put('/invoice/:id', invController.updateInvoice) 

// Delete Invoice
router.delete('/invoice/:id', invController.deleteInvoice);

export default router;



