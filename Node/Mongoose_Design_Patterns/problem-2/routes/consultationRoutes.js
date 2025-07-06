const express = require("express");
const router = express.Router();
const consultationCtrl = require("../controllers/consultationController");

router.post("/", consultationCtrl.createConsultation);
router.get("/recent", consultationCtrl.getRecentConsultations);

module.exports = router;
