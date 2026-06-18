const mongoose = require('mongoose');

const githubSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    url: { type: String, required: true },
    username: { type: String, required: true },
    repoCount: { type: Number, default: 0 },
    stars: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
    languages: [{ type: String }],
    githubScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GitHubAnalysis', githubSchema);
