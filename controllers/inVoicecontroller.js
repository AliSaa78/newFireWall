import Invoice from '../models/inVoice.js';
<<<<<<< HEAD
import CrudOperations from './CRUD.js';
const inVoiceCrud = new CrudOperations({Invoice});
=======

>>>>>>> ali_waleed
const invController = {

  // Create Invoice
  createInvoice: async (req, res) => {
    try {
<<<<<<< HEAD
      await inVoiceCrud.create(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error creating patient');
    }
  } ,
=======
      const newInvoice = new Invoice(req.body);
      await newInvoice.save();
      res.status(201).send(newInvoice); // 201 Created for successful creation
    } catch (error) {
      res.status(400).send(error); // 400 Bad Request for errors
    }
  },
>>>>>>> ali_waleed

  // Read All Invoices
  readAll: async (req, res) => {
    try {
<<<<<<< HEAD
      await inVoiceCrud.readAll(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error creating patient');
=======
      const allInvoices = await Invoice.find({});
      res.status(200).send(allInvoices); // 200 OK for successful retrieval
    } catch (error) {
      res.status(400).send(error);
>>>>>>> ali_waleed
    }
  },

  // Fetch Single Invoice
  readInvoice: async (req, res) => {
    try {
<<<<<<< HEAD
      await inVoiceCrud.readById(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error creating patient');
=======
      const getInvoice = await Invoice.findById(req.params.id);
      if (!getInvoice) {
        return res.status(404).send(); // 404 Not Found if no invoice is found
      }
      res.status(200).send(getInvoice);
    } catch (error) {
      res.status(400).send(error);
>>>>>>> ali_waleed
    }
  },

  // Update Invoice
  updateInvoice: async (req, res) => {
    try {
<<<<<<< HEAD
      await inVoiceCrud.update(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error creating patient');
=======
      const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!updatedInvoice) {
        return res.status(404).send(); // 404 Not Found if invoice not found
      }
      res.status(200).send(updatedInvoice); 
    } catch (error) {
      res.status(400).send(error);
>>>>>>> ali_waleed
    }
  },

  // Delete Invoice
  deleteInvoice: async (req, res) => {
    try {
<<<<<<< HEAD
      await inVoiceCrud.delete(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error creating patient');
    }
  }
};
=======
      const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
      if (!deletedInvoice) {
        return res.status(404).send(); 
      }
      res.status(200).send(deletedInvoice);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
>>>>>>> ali_waleed

export default invController;






