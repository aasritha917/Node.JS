const express = require("express");
const router = express.Router();
const controller = require("../controllers/mentorController");

router.post("/", controller.createMentor);
router.delete("/:id", controller.softDeleteMentor);
router.get("/no-sessions", controller.getMentorsWithNoActiveSessions);

module.exports = router;
