const Mentor = require("../models/mentorModel");
const Session = require("../models/sessionModel");

exports.createMentor = async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);
    res.status(201).json(mentor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.softDeleteMentor = async (req, res) => {
  try {
    await Mentor.findByIdAndUpdate(req.params.id, { isActive: false });
    await Session.updateMany({ mentorId: req.params.id }, { isActive: false });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMentorsWithNoActiveSessions = async (req, res) => {
  try {
    const mentors = await Mentor.find({ isActive: true });

    const result = [];
    for (const mentor of mentors) {
      const sessionCount = await Session.countDocuments({ mentorId: mentor._id, isActive: true, isArchived: false });
      if (sessionCount === 0) {
        result.push(mentor);
      }
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
