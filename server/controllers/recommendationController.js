const { getRecommendations } = require('../services/recommendationService');

const fetchRecommendations = async (req, res) => {
  try {
    const recommendations = await getRecommendations(req.user._id);
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { fetchRecommendations };
