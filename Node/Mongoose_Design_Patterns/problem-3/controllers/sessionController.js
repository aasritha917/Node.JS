const Session = require("../models/sessionModel");

exports.createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.archiveSession = async (req, res) => {
  try {
    await Session.findByIdAndUpdate(req.params.id, { isArchived: true });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSessionsByMentor = async (req, res) => {
  try {
    const sessions = await Session.find({ mentorId: req.params.id, isActive: true, isArchived: false });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSessionsByLearner = async (req, res) => {
  try {
    const sessions = await Session.find({ learnerIds: req.params.id, isActive: true, isArchived: false });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecentSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ isActive: true, isArchived: false })
      .sort({ time: -1 })
      .limit(5);
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLearnersForSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate("learnerIds", "name email");
    res.json(session.learnerIds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMentorLearnerCount = async (req, res) => {
  try {
    const sessions = await Session.find({ mentorId: req.params.id, isActive: true, isArchived: false });
    const learnerSet = new Set();
    sessions.forEach(session => {
      session.learnerIds.forEach(id => learnerSet.add(id.toString()));
    });
    res.json({ totalLearners: learnerSet.size });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMentorsOfLearner = async (req, res) => {
  try {
    const sessions = await Session.find({ learnerIds: req.params.id }).populate("mentorId", "name expertise");
    const mentors = sessions.map(s => s.mentorId);
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
