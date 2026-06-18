const axios = require('axios');

const extractUsername = (url) => {
  const match = url.match(/github\.com\/([^/?#]+)/i);
  if (!match) {
    throw new Error('Invalid GitHub URL. Use format: https://github.com/username');
  }
  const username = match[1];
  if (['orgs', 'organizations', 'settings', 'login', 'signup'].includes(username.toLowerCase())) {
    throw new Error('Invalid GitHub username in URL');
  }
  return username;
};

const fetchGithubStats = async (username) => {
  const headers = {};
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  let userRes;
  try {
    userRes = await axios.get(`https://api.github.com/users/${username}`, { headers });
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('GitHub user not found');
    }
    throw new Error('Failed to fetch GitHub profile');
  }

  let repos = [];
  try {
    const reposRes = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      { headers }
    );
    repos = reposRes.data;
  } catch {
    repos = [];
  }

  const stars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
  const forks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);

  const languageSet = new Set();
  repos.forEach((repo) => {
    if (repo.language) languageSet.add(repo.language);
  });
  const languages = Array.from(languageSet);

  const sixMonthsAgo = Date.now() - 6 * 30 * 24 * 60 * 60 * 1000;
  const recentlyActive = repos.filter(
    (repo) => repo.pushed_at && new Date(repo.pushed_at).getTime() > sixMonthsAgo
  ).length;

  const activityScore =
    repos.length > 0 ? Math.min(100, Math.round((recentlyActive / repos.length) * 100)) : 0;

  return {
    repoCount: userRes.data.public_repos || repos.length,
    stars,
    forks,
    languages,
    activityScore,
  };
};

module.exports = { extractUsername, fetchGithubStats };
