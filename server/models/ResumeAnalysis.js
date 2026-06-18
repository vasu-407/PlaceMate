const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    fileName: { type: String },
    filePath: { type: String },
    uploadDate: { type: Date, default: Date.now },
    sectionsFound: {
      contact: { type: Boolean, default: false },
      education: { type: Boolean, default: false },
      skills: { type: Boolean, default: false },
      projects: { type: Boolean, default: false },
      github: { type: Boolean, default: false },
      linkedin: { type: Boolean, default: false },
      certifications: { type: Boolean, default: false },
    },
    resumeScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ResumeAnalysis', resumeSchema);
