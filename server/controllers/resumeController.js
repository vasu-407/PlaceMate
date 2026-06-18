const fs = require('fs');
const ResumeAnalysis = require('../models/ResumeAnalysis');
const { analyzeResume } = require('../services/resumeService');
const { calcResumeScore } = require('../utils/scoreCalculators');

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a PDF resume' });
    }

    const existing = await ResumeAnalysis.findOne({ user: req.user._id });
    if (existing?.filePath && fs.existsSync(existing.filePath)) {
      fs.unlinkSync(existing.filePath);
    }

    const sectionsFound = await analyzeResume(req.file.path);
    const resumeScore = calcResumeScore(sectionsFound);

    const data = {
      user: req.user._id,
      fileName: req.file.originalname,
      filePath: req.file.path,
      uploadDate: new Date(),
      sectionsFound,
      resumeScore,
    };

    const resume = await ResumeAnalysis.findOneAndUpdate(
      { user: req.user._id },
      data,
      { new: true, upsert: true }
    );

    res.json(resume);
  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({ message: error.message });
  }
};

const getResume = async (req, res) => {
  try {
    const resume = await ResumeAnalysis.findOne({ user: req.user._id });
    res.json(resume || null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadResume, getResume };
