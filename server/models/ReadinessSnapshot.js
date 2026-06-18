const mongoose = require('mongoose');

const readinessSnapshotSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    readinessScore: { type: Number, default: 0 },
    breakdown: {
      leetcode: { type: Number, default: 0 },
      github: { type: Number, default: 0 },
      projects: { type: Number, default: 0 },
      skills: { type: Number, default: 0 },
      resume: { type: Number, default: 0 },
      cgpa: { type: Number, default: 0 },
    },
    level: { type: String, default: 'Beginner' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ReadinessSnapshot', readinessSnapshotSchema);
