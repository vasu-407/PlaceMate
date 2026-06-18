const axios = require('axios');

const extractUsername = (url) => {
  const match = url.match(/leetcode\.com\/u\/([^/?#]+)/i);
  if (!match) {
    throw new Error('Invalid LeetCode URL. Use format: https://leetcode.com/u/username/');
  }
  return match[1];
};

const fetchLeetcodeStats = async (username) => {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  const { data } = await axios.post(
    'https://leetcode.com/graphql',
    { query, variables: { username } },
    {
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com',
      },
    }
  );

  if (data.errors) {
    throw new Error(data.errors[0]?.message || 'Failed to fetch LeetCode data');
  }

  const stats = data?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;

  if (!stats) {
    throw new Error('LeetCode profile not found or is private');
  }

  const getCount = (difficulty) =>
    stats.find((s) => s.difficulty === difficulty)?.count || 0;

  const easySolved = getCount('Easy');
  const mediumSolved = getCount('Medium');
  const hardSolved = getCount('Hard');
  const totalSolved = getCount('All');

  return { easySolved, mediumSolved, hardSolved, totalSolved };
};

module.exports = { extractUsername, fetchLeetcodeStats };
