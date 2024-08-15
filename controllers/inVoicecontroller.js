import Invoice from '../models/inVoice.js';
import CrudOperations from './CRUD.js';
const inVoiceCrud = new CrudOperations({Invoice});
const invController = {

  // Create Invoice
  createInvoice: async (req, res) => {
    try {
      await inVoiceCrud.create(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error creating patient');
    }
  } ,

  // Read All Invoices
  readAll: async (req, res) => {
    try {
      await inVoiceCrud.readAll(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error creating patient');
    }
  },

  // Fetch Single Invoice
  readInvoice: async (req, res) => {
    try {
      await inVoiceCrud.readById(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error creating patient');
    }
  },

  // Update Invoice
  updateInvoice: async (req, res) => {
    try {
      await inVoiceCrud.update(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error creating patient');
    }
  },

  // Delete Invoice
  deleteInvoice: async (req, res) => {
    try {
      await inVoiceCrud.delete(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error creating patient');
    }
  }
};

export default invController;






