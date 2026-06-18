const express = require('express');
const { analyzeGithub, getGithub } = require('../controllers/githubController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, analyzeGithub);
router.get('/', protect, getGithub);

module.exports = router;
