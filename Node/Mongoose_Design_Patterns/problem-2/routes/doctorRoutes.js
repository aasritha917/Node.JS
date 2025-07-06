const express = require("express");
const router = express.Router();
const doctorCtrl = require("../controllers/doctorController");

router.post("/", doctorCtrl.createDoctor);
router.delete("/:id", doctorCtrl.deleteDoctor);
router.get("/:id/patients", doctorCtrl.getDoctorPatients);
router.get("/:id/consultations/count", doctorCtrl.getConsultationCount);

module.exports = router;
