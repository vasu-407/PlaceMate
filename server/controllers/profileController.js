const Profile = require('../models/Profile');
const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      profile = await Profile.create({
        user: req.user._id,
        name: req.user.fullName,
        college: req.user.college,
        branch: req.user.branch,
        cgpa: req.user.cgpa,
        graduationYear: req.user.graduationYear,
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, college, branch, cgpa, graduationYear } = req.body;

    let profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      profile = new Profile({ user: req.user._id });
    }

    if (name !== undefined) profile.name = name;
    if (college !== undefined) profile.college = college;
    if (branch !== undefined) profile.branch = branch;
    if (cgpa !== undefined) profile.cgpa = cgpa;
    if (graduationYear !== undefined) profile.graduationYear = graduationYear;

    await profile.save();

    await User.findByIdAndUpdate(req.user._id, {
      fullName: profile.name || req.user.fullName,
      college: profile.college,
      branch: profile.branch,
      cgpa: profile.cgpa,
      graduationYear: profile.graduationYear,
    });

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfile, updateProfile };
