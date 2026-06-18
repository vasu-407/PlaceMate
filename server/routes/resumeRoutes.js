const express = require('express');
const { uploadResume, getResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/', protect, upload.single('resume'), uploadResume);
router.get('/', protect, getResume);

module.exports = router;
