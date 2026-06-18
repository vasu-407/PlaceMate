const express = require('express');
const { fetchRecommendations } = require('../controllers/recommendationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, fetchRecommendations);

module.exports = router;
