const calcLeetcodeScore = (easy, medium, hard) => {
  const points = easy * 1 + medium * 3 + hard * 5;
  const maxPoints = 200;
  return Math.min(100, Math.round((points / maxPoints) * 100));
};

const calcSkillsScore = (count) => {
  if (count >= 11) return 100;
  if (count >= 7) return 80;
  if (count >= 4) return 60;
  if (count >= 1) return 30;
  return 0;
};

const calcProjectScore = (projects) => {
  const total = projects.reduce((sum, p) => {
    if (p.difficulty === 'Advanced') return sum + 30;
    if (p.difficulty === 'Intermediate') return sum + 20;
    return sum + 10;
  }, 0);
  return Math.min(100, total);
};

const calcCgpaScore = (cgpa) => {
  if (!cgpa && cgpa !== 0) return 0;
  return Math.min(100, Math.round((cgpa / 10) * 100));
};

const calcResumeScore = (sections) => {
  const keys = [
    'contact',
    'education',
    'skills',
    'projects',
    'github',
    'linkedin',
    'certifications',
  ];
  const found = keys.filter((k) => sections[k]).length;
  return Math.round(found * (100 / 7));
};

const calcGithubScore = ({ repoCount, languages, stars, activityScore }) => {
  const repoScore = Math.min(100, (repoCount / 20) * 100) * 0.4;
  const langScore = Math.min(100, (languages.length / 5) * 100) * 0.2;
  const starScore = Math.min(100, (stars / 50) * 100) * 0.2;
  const actScore = Math.min(100, activityScore || 0) * 0.2;
  return Math.round(repoScore + langScore + starScore + actScore);
};

const calcReadinessScore = (scores) => {
  const {
    leetcode = 0,
    github = 0,
    projects = 0,
    skills = 0,
    resume = 0,
    cgpa = 0,
  } = scores;

  return Math.round(
    leetcode * 0.3 +
      github * 0.25 +
      projects * 0.2 +
      skills * 0.1 +
      resume * 0.1 +
      cgpa * 0.05
  );
};

const getReadinessLevel = (score) => {
  if (score >= 81) return 'Industry Ready';
  if (score >= 61) return 'Placement Ready';
  if (score >= 41) return 'Improving';
  return 'Beginner';
};

module.exports = {
  calcLeetcodeScore,
  calcSkillsScore,
  calcProjectScore,
  calcCgpaScore,
  calcResumeScore,
  calcGithubScore,
  calcReadinessScore,
  getReadinessLevel,
};
