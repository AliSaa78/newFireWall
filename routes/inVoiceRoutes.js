import express from 'express';
import invController from '../controllers/inVoicecontroller.js';

const router = express.Router();

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



