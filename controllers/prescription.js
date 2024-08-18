import Prescription from '../models/prescription.js';

const prescriptionController={
  
createPrescription:async(req,res)=>{
try{
  const newPrescription=  new Prescription(req.body);
  await newPrescription.save();
  res.status(201).json(newPrescription);
}
catch(err){
    console.log(err);
    res.status(400).send('error during create a prescription');
}

},

fetchAll:async(req,res)=>{
    try{
    const allPrescription = await Prescription.find({}); 
    res.status(201).json(allPrescription);
    }
    catch(err){
        console.log(err);
    res.status(400).send('error during fetching the prescriptions');
    }
},
fetchSinglePre:async(req,res)=>{
    try{
      const fetchOne = await Prescription.findById(req.params.id);
     res.status(200).json(fetchOne);
    }
    catch(err){
        console.log(err);
        res.status(400).send('error during fetching a prescription');
    }
},
updatePrescription: async (req, res) => {
  try {
    const updatedOne = await Prescription.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, // Return the updated document
      runValidators: true // Ensure the updated data is validated against the schema
    });

    if (!updatedOne) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json(updatedOne);
  } catch (err) {
    console.log(err);
    res.status(400).send('Error during updating a prescription');
  }
},

deletePrescription:async(req,res)=>{try {
    const deleteOne = await Prescription.findByIdAndDelete(req.params.id);
    if (!deleteOne) {
      return res.status(404).send();
    }
    res.status(200).json(deleteOne);
  } catch (error) {
    res.status(500).send(error);
  }
}



};

export default prescriptionController;