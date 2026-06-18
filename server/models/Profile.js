const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    name: { type: String, default: '' },
    college: { type: String, default: '' },
    branch: { type: String, default: '' },
    cgpa: { type: Number, min: 0, max: 10, default: 0 },
    graduationYear: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
