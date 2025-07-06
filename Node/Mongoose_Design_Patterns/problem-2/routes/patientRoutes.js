const express = require("express");
const router = express.Router();
const patientCtrl = require("../controllers/patientController");

router.post("/", patientCtrl.createPatient);
router.delete("/:id", patientCtrl.deletePatient);
router.get("/:id/doctors", patientCtrl.getPatientDoctors);
router.get("/", patientCtrl.getMalePatients); 

module.exports = router;
