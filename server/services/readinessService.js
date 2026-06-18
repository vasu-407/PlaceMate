const User = require('../models/User');
const LeetCodeAnalysis = require('../models/LeetCodeAnalysis');
const GitHubAnalysis = require('../models/GitHubAnalysis');
const ResumeAnalysis = require('../models/ResumeAnalysis');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const ReadinessSnapshot = require('../models/ReadinessSnapshot');
const {
  calcSkillsScore,
  calcProjectScore,
  calcCgpaScore,
  calcReadinessScore,
  getReadinessLevel,
} = require('../utils/scoreCalculators');

const computeScores = async (userId) => {
  const user = await User.findById(userId);
  const leetcode = await LeetCodeAnalysis.findOne({ user: userId });
  const github = await GitHubAnalysis.findOne({ user: userId });
  const resume = await ResumeAnalysis.findOne({ user: userId });
  const skills = await Skill.find({ user: userId });
  const projects = await Project.find({ user: userId });

  const breakdown = {
    leetcode: leetcode?.leetcodeScore || 0,
    github: github?.githubScore || 0,
    projects: calcProjectScore(projects),
    skills: calcSkillsScore(skills.length),
    resume: resume?.resumeScore || 0,
    cgpa: calcCgpaScore(user?.cgpa),
  };

  const readinessScore = calcReadinessScore(breakdown);
  const level = getReadinessLevel(readinessScore);

  return { readinessScore, level, breakdown, projectScore: breakdown.projects, skillsScore: breakdown.skills };
};

const saveSnapshot = async (userId, data) => {
  await ReadinessSnapshot.create({
    user: userId,
    readinessScore: data.readinessScore,
    breakdown: data.breakdown,
    level: data.level,
  });
};

const getTrend = async (userId, limit = 10) => {
  return ReadinessSnapshot.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
};

module.exports = { computeScores, saveSnapshot, getTrend };
