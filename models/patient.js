import mongoose from 'mongoose';

const { Schema } = mongoose;

const PatientSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },  // Store as a string
    description: { type: String, required: true },
    medicine: { type: String, required: true },
    cardNumber: { type: String, required: true },  // Store as a string
    gender: { type: String, required: true },
    address: { type: String, required: true },
    historicalSurgeries: { type: String, required: true },
    memberShip: { type: Boolean, required: true },
});

const Patient = mongoose.model('Patient', PatientSchema);
export default Patient;
