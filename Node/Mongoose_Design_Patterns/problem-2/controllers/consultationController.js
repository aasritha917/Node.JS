const Consultation = require("../models/consultationModel");
const Doctor = require("../models/doctorModel");
const Patient = require("../models/patientModel");

exports.createConsultation = async (req, res) => {
  const { doctorId, patientId, notes } = req.body;
  try {
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);

    if (!doctor?.isActive || !patient?.isActive) {
      return res.status(400).json({ error: "Doctor or Patient is not active" });
    }

    const consultation = await Consultation.create({ doctorId, patientId, notes });
    res.status(201).json(consultation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecentConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({ isActive: true })
      .populate("doctorId", "name")
      .populate("patientId", "name")
      .sort({ consultedAt: -1 })
      .limit(5);
    res.json(consultations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
