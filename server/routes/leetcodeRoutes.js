const express = require('express');
const { analyzeLeetcode, getLeetcode } = require('../controllers/leetcodeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, analyzeLeetcode);
router.get('/', protect, getLeetcode);

module.exports = router;
