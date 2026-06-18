const LeetCodeAnalysis = require('../models/LeetCodeAnalysis');
const GitHubAnalysis = require('../models/GitHubAnalysis');
const ResumeAnalysis = require('../models/ResumeAnalysis');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const { calcSkillsScore, calcProjectScore } = require('../utils/scoreCalculators');

const getRecommendations = async (userId) => {
  const recommendations = [];

  const leetcode = await LeetCodeAnalysis.findOne({ user: userId });
  const github = await GitHubAnalysis.findOne({ user: userId });
  const resume = await ResumeAnalysis.findOne({ user: userId });
  const skills = await Skill.find({ user: userId });
  const projects = await Project.find({ user: userId });

  const skillsScore = calcSkillsScore(skills.length);
  const projectScore = calcProjectScore(projects);

  if ((leetcode?.leetcodeScore || 0) < 50) {
    recommendations.push('Practice more medium and hard LeetCode problems.');
  }

  if ((github?.githubScore || 0) < 50) {
    recommendations.push('Create more repositories and improve GitHub activity.');
  }

  if ((resume?.resumeScore || 0) < 70) {
    recommendations.push('Improve resume structure and add missing sections.');
  }

  if (skillsScore < 60) {
    recommendations.push('Add more technical skills.');
  }

  if (projectScore < 60) {
    recommendations.push('Build more advanced projects.');
  }

  if (recommendations.length === 0) {
    recommendations.push('Great job! Keep maintaining your profile and continue learning.');
  }

  return recommendations;
};

module.exports = { getRecommendations };
