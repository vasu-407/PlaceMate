const User = require('../models/User');
const Profile = require('../models/Profile');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, college, branch, cgpa, graduationYear } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Please provide full name, email, and password' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      college: college || '',
      branch: branch || '',
      cgpa: cgpa || 0,
      graduationYear: graduationYear || null,
    });

    await Profile.create({
      user: user._id,
      name: user.fullName,
      college: user.college,
      branch: user.branch,
      cgpa: user.cgpa,
      graduationYear: user.graduationYear,
    });

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      college: user.college,
      branch: user.branch,
      cgpa: user.cgpa,
      graduationYear: user.graduationYear,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        college: user.college,
        branch: user.branch,
        cgpa: user.cgpa,
        graduationYear: user.graduationYear,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  res.json({
    _id: req.user._id,
    fullName: req.user.fullName,
    email: req.user.email,
    college: req.user.college,
    branch: req.user.branch,
    cgpa: req.user.cgpa,
    graduationYear: req.user.graduationYear,
  });
};

module.exports = { registerUser, loginUser, getMe };
