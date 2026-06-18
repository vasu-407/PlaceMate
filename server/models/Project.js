const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    techStack: [{ type: String }],
    githubLink: { type: String, default: '' },
    liveLink: { type: String, default: '' },
    difficulty: {
      type: String,
      enum: ['Basic', 'Intermediate', 'Advanced'],
      default: 'Basic',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
