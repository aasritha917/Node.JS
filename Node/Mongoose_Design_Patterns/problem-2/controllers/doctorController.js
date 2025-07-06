const Doctor = require("../models/doctorModel");
const Consultation = require("../models/consultationModel");

exports.createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndUpdate(req.params.id, { isActive: false });
    await Consultation.updateMany({ doctorId: req.params.id }, { isActive: false });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDoctorPatients = async (req, res) => {
  try {
    const consultations = await Consultation.find({ doctorId: req.params.id, isActive: true })
      .populate("patientId", "name age gender")
      .sort({ consultedAt: -1 })
      .limit(10);

    const patients = consultations.map(c => c.patientId);
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getConsultationCount = async (req, res) => {
  try {
    const count = await Consultation.countDocuments({ doctorId: req.params.id, isActive: true });
    res.json({ totalConsultations: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
