const GitHubAnalysis = require('../models/GitHubAnalysis');
const { extractUsername, fetchGithubStats } = require('../services/githubService');
const { calcGithubScore } = require('../utils/scoreCalculators');

const analyzeGithub = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: 'GitHub URL is required' });
    }

    const username = extractUsername(url);
    const stats = await fetchGithubStats(username);

    const githubScore = calcGithubScore({
      repoCount: stats.repoCount,
      languages: stats.languages,
      stars: stats.stars,
      activityScore: stats.activityScore,
    });

    const data = {
      user: req.user._id,
      url,
      username,
      repoCount: stats.repoCount,
      stars: stats.stars,
      forks: stats.forks,
      languages: stats.languages,
      githubScore,
    };

    const github = await GitHubAnalysis.findOneAndUpdate(
      { user: req.user._id },
      data,
      { new: true, upsert: true }
    );

    res.json(github);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getGithub = async (req, res) => {
  try {
    const github = await GitHubAnalysis.findOne({ user: req.user._id });
    res.json(github || null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { analyzeGithub, getGithub };
