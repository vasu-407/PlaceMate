const mongoose = require('mongoose');

const leetcodeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    url: { type: String, required: true },
    username: { type: String, required: true },
    easySolved: { type: Number, default: 0 },
    mediumSolved: { type: Number, default: 0 },
    hardSolved: { type: Number, default: 0 },
    totalSolved: { type: Number, default: 0 },
    leetcodePoints: { type: Number, default: 0 },
    leetcodeScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LeetCodeAnalysis', leetcodeSchema);
