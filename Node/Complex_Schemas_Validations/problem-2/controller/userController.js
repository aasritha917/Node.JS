const User = require("../model/userModel");

exports.addUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.addProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { profileName, url } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profiles.push({ profileName, url });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { profile } = req.query;

    let users;
    if (profile) {
      users = await User.find({ "profiles.profileName": profile });
    } else {
      users = await User.find();
    }

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.searchUser = async (req, res, next) => {
  try {
    const { name, profile } = req.query;
    const user = await User.findOne({ name });

    if (!user) return res.status(404).json({ message: "User not found" });

    const match = user.profiles.find((p) => p.profileName === profile);

    if (match) {
      return res.status(200).json({ user: user.name, profile: match });
    } else {
      return res.status(200).json({
        message: "User found, but profile not found",
        user
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { userId, profileName } = req.params;
    const { url } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = user.profiles.find((p) => p.profileName === profileName);
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    profile.url = url;
    await user.save();

    res.status(200).json({ message: "Profile updated", user });
  } catch (err) {
    next(err);
  }
};

exports.deleteProfile = async (req, res, next) => {
  try {
    const { userId, profileName } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profiles = user.profiles.filter((p) => p.profileName !== profileName);
    await user.save();

    res.status(200).json({ message: "Profile deleted", user });
  } catch (err) {
    next(err);
  }
};
