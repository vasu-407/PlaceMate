const express = require('express');
const {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createSkill);
router.get('/', protect, getSkills);
router.put('/:id', protect, updateSkill);
router.delete('/:id', protect, deleteSkill);

module.exports = router;
