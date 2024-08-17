import Patient from '../models/patient.js';
<<<<<<< HEAD
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
=======

const patientController = {

  // Create a new patient
  createPatient: async (req, res) => {
    try {
      const patient = new Patient(req.body);
      await patient.save();
      res.status(201).send(patient);
    } catch (error) {
      res.status(400).send(error);
>>>>>>> ali_waleed
    }
  },

  // Read all patients
  readAllPatients: async (req, res) => {
    try {
<<<<<<< HEAD
      await patientCrud.readAll(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error fetching patients');
=======
      const patients = await Patient.find({});
      res.status(200).send(patients);
    } catch (error) {
      res.status(500).send(error);
>>>>>>> ali_waleed
    }
  },

  // Read a patient by ID
  readPatientById: async (req, res) => {
    try {
<<<<<<< HEAD
      await patientCrud.readById(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error fetching patient');
=======
      const patient = await Patient.findById(req.params.id);
      if (!patient) {
        return res.status(404).send();
      }
      res.status(200).send(patient);
    } catch (error) {
      res.status(500).send(error);
>>>>>>> ali_waleed
    }
  },

  // Update a patient by ID
  updatePatient: async (req, res) => {
    try {
<<<<<<< HEAD
      await patientCrud.update(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error updating patient');
=======
      const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!patient) {
        return res.status(404).send();
      }
      res.status(200).send(patient);
    } catch (error) {
      res.status(400).send(error);
>>>>>>> ali_waleed
    }
  },

  // Delete a patient by ID
  deletePatient: async (req, res) => {
    try {
<<<<<<< HEAD
      await patientCrud.delete(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error deleting patient');
=======
      const patient = await Patient.findByIdAndDelete(req.params.id);
      if (!patient) {
        return res.status(404).send();
      }
      res.status(200).send(patient);
    } catch (error) {
      res.status(500).send(error);
>>>>>>> ali_waleed
    }
  }
};

export default patientController;
