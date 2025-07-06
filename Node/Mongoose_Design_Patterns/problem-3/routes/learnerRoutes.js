const express = require("express");
const router = express.Router();
const controller = require("../controllers/learnerController");

router.post("/", controller.createLearner);
router.delete("/:id", controller.softDeleteLearner);
router.get("/over-three", controller.getActiveLearnersOverThreeSessions);

module.exports = router;
