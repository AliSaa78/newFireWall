import mongoose from 'mongoose';

const { Schema } = mongoose;

const prescriptionSchema = new Schema({
  patientName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  patientDisease: {
    type: String,
    required: true,
  },
  visitDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  medicines: [
    {
      name: {
        type: String,
        required: true,
      },
      dosage: {
        type: String,
        required: true,
      },
      doctorNote: {
        type: String,
        required: true,
      },
    },
  ],
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

export default Prescription;
