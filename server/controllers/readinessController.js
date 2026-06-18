const { computeScores, saveSnapshot, getTrend } = require('../services/readinessService');

const getReadiness = async (req, res) => {
  try {
    const data = await computeScores(req.user._id);
    await saveSnapshot(req.user._id, data);
    const trend = await getTrend(req.user._id);

    res.json({
      readinessScore: data.readinessScore,
      level: data.level,
      breakdown: data.breakdown,
      projectScore: data.projectScore,
      skillsScore: data.skillsScore,
      trend: trend.reverse(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getReadiness };
