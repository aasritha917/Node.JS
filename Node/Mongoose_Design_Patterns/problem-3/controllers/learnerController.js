const Learner = require("../models/learnerModel");
const Session = require("../models/sessionModel");

exports.createLearner = async (req, res) => {
  try {
    const learner = await Learner.create(req.body);
    res.status(201).json(learner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.softDeleteLearner = async (req, res) => {
  try {
    await Learner.findByIdAndUpdate(req.params.id, { isActive: false });
    await Session.updateMany(
      { learnerIds: req.params.id },
      { $pull: { learnerIds: req.params.id }, $push: { attendance: { learnerId: req.params.id, status: 'cancelled' } } }
    );
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActiveLearnersOverThreeSessions = async (req, res) => {
  try {
    const learners = await Learner.find({ isActive: true });

    const result = [];

    for (const learner of learners) {
      const count = await Session.countDocuments({ learnerIds: learner._id, isActive: true, isArchived: false });
      if (count > 3) result.push(learner);
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
