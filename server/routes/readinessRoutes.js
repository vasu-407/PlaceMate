const express = require('express');
const { getReadiness } = require('../controllers/readinessController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getReadiness);

module.exports = router;
