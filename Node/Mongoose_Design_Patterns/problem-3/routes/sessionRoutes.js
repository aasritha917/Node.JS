const express = require("express");
const router = express.Router();
const controller = require("../controllers/sessionController");

router.post("/", controller.createSession);
router.delete("/:id", controller.archiveSession);

router.get("/mentor/:id", controller.getSessionsByMentor);
router.get("/learner/:id", controller.getSessionsByLearner);
router.get("/recent", controller.getRecentSessions);
router.get("/:id/learners", controller.getLearnersForSession);
router.get("/mentor/:id/count", controller.getMentorLearnerCount);
router.get("/learner/:id/mentors", controller.getMentorsOfLearner);

module.exports = router;
