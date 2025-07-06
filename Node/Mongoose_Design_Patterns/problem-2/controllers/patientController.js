const Patient = require("../models/patientModel");
const Consultation = require("../models/consultationModel");

exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndUpdate(req.params.id, { isActive: false });
    await Consultation.updateMany({ patientId: req.params.id }, { isActive: false });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPatientDoctors = async (req, res) => {
  try {
    const consultations = await Consultation.find({ patientId: req.params.id, isActive: true })
      .populate("doctorId", "name specialization");
    
    const doctors = consultations.map(c => c.doctorId);
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMalePatients = async (req, res) => {
  try {
    const patients = await Patient.find({ gender: "Male", isActive: true });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
