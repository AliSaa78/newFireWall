import Patient from '../models/patient.js';
import CrudOperations from './CRUD.js';

const patientCrud = new CrudOperations(Patient); // Initialize with the Patient model

const patientController = {
  // Create a new patient
  createPatient: async (req, res) => {
    try {
      await patientCrud.create(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error creating patient');
    }
  },

  // Read all patients
  readAllPatients: async (req, res) => {
    try {
      await patientCrud.readAll(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error fetching patients');
    }
  },

  // Read a patient by ID
  readPatientById: async (req, res) => {
    try {
      await patientCrud.readById(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error fetching patient');
    }
  },

  // Update a patient by ID
  updatePatient: async (req, res) => {
    try {
      await patientCrud.update(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error updating patient');
    }
  },

  // Delete a patient by ID
  deletePatient: async (req, res) => {
    try {
      await patientCrud.delete(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error deleting patient');
    }
  }
};

export default patientController;
