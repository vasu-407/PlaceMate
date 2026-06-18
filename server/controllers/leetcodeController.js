const LeetCodeAnalysis = require('../models/LeetCodeAnalysis');
const { extractUsername, fetchLeetcodeStats } = require('../services/leetcodeService');
const { calcLeetcodeScore } = require('../utils/scoreCalculators');

const analyzeLeetcode = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: 'LeetCode URL is required' });
    }

    const username = extractUsername(url);
    const stats = await fetchLeetcodeStats(username);

    const leetcodePoints =
      stats.easySolved * 1 + stats.mediumSolved * 3 + stats.hardSolved * 5;
    const leetcodeScore = calcLeetcodeScore(
      stats.easySolved,
      stats.mediumSolved,
      stats.hardSolved
    );

    const data = {
      user: req.user._id,
      url,
      username,
      easySolved: stats.easySolved,
      mediumSolved: stats.mediumSolved,
      hardSolved: stats.hardSolved,
      totalSolved: stats.totalSolved,
      leetcodePoints,
      leetcodeScore,
    };

    const leetcode = await LeetCodeAnalysis.findOneAndUpdate(
      { user: req.user._id },
      data,
      { new: true, upsert: true }
    );

    res.json(leetcode);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLeetcode = async (req, res) => {
  try {
    const leetcode = await LeetCodeAnalysis.findOne({ user: req.user._id });
    res.json(leetcode || null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { analyzeLeetcode, getLeetcode };
