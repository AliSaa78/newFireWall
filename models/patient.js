import mongoose from 'mongoose';

const { Schema } = mongoose;

const PatientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    medicine: {
        type: String,
        required: true
    },
    cardNumber: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    historicalSurgeries: {
        type: String,
        required: true
    },
    memberShip: {
        type: Boolean, 
        required: true
    },
  
});

const Patient = mongoose.model('Patient', PatientSchema);
export default Patient;
